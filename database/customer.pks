/* To get all the ingredient varieties that are available to customer for order  */
create or replace function getAvailableIngredients() returns setof json
as $$
declare
  -- Cursor that selects ingredients that are not hidden or not out of stock
  cursorAvailableVariety cursor for 
    select ingredientvarietyid, name, region, price, name, shortImage as image
    from 
      (Owns join IngredientVariety on IngredientVariety.id = Owns.ingredientVarietyId)
      join Ingredient on Ingredient.id = IngredientVariety.ingredientId
    where isHidden = false and amount > 0;
  
  vAvailable record;

begin
  open cursorAvailableVariety;
  loop
    fetch from cursorAvailableVariety into vAvailable;
    exit when not found;
    -- Build each returned ingredient as json
    return next json_build_object(
      'varietyId', vAvailable.ingredientvarietyid,
      'region', vAvailable.region,
      'price', vAvailable.price,
      'image', vAvailable.image,
      'name', vAvailable.name
    );
  end loop;
end;
$$ LANGUAGE plpgsql;


/* To create a pizza order completely and handle cases when an order is not successful */
create or replace function createPizzaOrder(
  vCustomerId char(6), 
  vPizzaSize integer, 
  vVarietyIdList char(6) [],
  vDeliveryHouseNo varchar(10),
  vDeliveryStreet varchar(30),
  vDeliveryPostcode varchar(10),
  vDeliveryCity varchar(20)
) 
returns json
as $$
declare
  vOrderNo integer;
  vVarietyId varchar(6);
  vAmount integer;
begin
  -- Add the order and get the generated orderNo
  insert into 
    PizzaOrder(customerId, baseSize, deliveryHouseNo, deliveryStreet, deliveryPostcode, deliveryCity, datetime, totalCost, hasDelivered)
    values(vCustomerId, vPizzaSize, vDeliveryHouseNo, vDeliveryStreet, vDeliveryPostcode, vDeliveryCity, now(), 0, true)
    returning orderNo into vOrderNo;  
  
  -- Decrement the amount of all ingredient varieties
  foreach vVarietyId in array vVarietyIdList loop
    -- If any ingredient variety is out of stock, throw Exception
    vAmount := getAmountOfIngredientVariety('666666', vVarietyId);
    if vAmount = 0 then
      raise exception using
        errcode='P0002',
        message='Some ingredients are out of stock. Please refresh the page.',
        hint='Please refresh te page';
    end if;

    -- Decrement amount of each ingredient variety
    update Owns set amount = amount - 1 where ingredientVarietyId = vVarietyId and bakerId = '666666';
  end loop;

  -- Add ingredient varieties to the order
  foreach vVarietyId in array vVarietyIdList loop
    insert into Contains values(vOrderNo, vVarietyId);
  end loop;

  return json_build_object('success', true);

exception
  when sqlstate 'P0002' then
    -- Delete the order
    delete from PizzaOrder where orderNo = vOrderNo;
    delete from Contains where orderNo = vOrderNo;
    return json_build_object('error', true, 'reason', 'Some ingredients are out of stock. Please refresh the page.');
end;
$$ language plpgsql
