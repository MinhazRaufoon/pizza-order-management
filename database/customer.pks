create or replace function getAvailableIngredients() returns setof json
as $$
declare
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
  foreach vVarietyId in array vVarietyIdList loop
    vAmount := getAmountOfIngredientVariety('666666', vVarietyId);
    if vAmount = 0 then
      raise exception using
        errcode='P0002',
        message='Some ingredients are out of stock',
        hint='Please refresh te page';
    end if;
  end loop;

  insert into 
    PizzaOrder(customerId, baseSize, deliveryHouseNo, deliveryStreet, deliveryPostcode, deliveryCity, datetime, totalCost, hasDelivered)
    values(vCustomerId, vPizzaSize, vDeliveryHouseNo, vDeliveryStreet, vDeliveryPostcode, vDeliveryCity, now(), 0, true)
    returning orderNo into vOrderNo;  
  
  foreach vVarietyId in array vVarietyIdList loop
    insert into Contains values(vOrderNo, vVarietyId);
  end loop;

  return json_build_object('success', true);
exception
  when sqlstate 'P0002' then
    return json_build_object('error', true, 'reason', 'Some ingredients are out of stock');
end;
$$ language plpgsql
