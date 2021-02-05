create or replace function getMySuppliers(vBakerId char(6)) returns setof json
as $$
declare
  -- Cursor to select each supplier info as json { supplier: { ... } }
  cursorMySupplier cursor for
    select 
      getSupplierById(supplierId)::jsonb || json_build_object('isHidden', isHidden)::jsonb
      as supplier
    from Contracts where Contracts.bakerId = vBakerId;
  
  vMySupplier record;

begin
  open cursorMySupplier;
  loop
    fetch from cursorMySupplier into vMySupplier;
    exit when not found;
    -- Extract each "supplier" object from the json and return as json
    return next vMySupplier.supplier;
  end loop;
end;
$$ LANGUAGE plpgsql;


create or replace function getMyIngredients(vBakerId char(6)) returns setof json
as $$
declare
  -- Cusor to select { char(6), json } as ingredient id and all the varieties as json array
  cursorMyIngredients cursor for 
    select 
      getIngredientIdByVarietyId(ingredientVarietyId) as ingredientId, 
      json_agg(
        getIngredientVarietyById(ingredientVarietyId)
      ) as varieties
    from Owns where bakerId = vBakerId group by ingredientId;
  
  vMyIngredient record;

begin
  open cursorMyIngredients;
  loop
    fetch from cursorMyIngredients into vMyIngredient;
    exit when not found;
    -- Append the ingredient info to the json
    return next getIngredient(vMyIngredient.ingredientId)::jsonb || json_build_object('varieties', vMyIngredient.varieties)::jsonb;
  end loop;
end;
$$ LANGUAGE plpgsql;


create or replace function getOrderedPizzaDescription(vOrderNo integer) returns text
as $$
declare
  cursorVarietyIds cursor for 
    select ingredientVarietyId
      from 
        Contains join IngredientVariety 
          on Contains.ingredientVarietyId = IngredientVariety.id
        where orderNo = vOrderNo;
  
  vVarietyId varchar(6);
  vIngredientData record;
  vOutput text;
begin
  vOutput = 'pizza with ';
  open cursorVarietyIds;
  loop
    fetch from cursorVarietyIds into vVarietyId;
    exit when not found;

    select name, region into vIngredientData
      from Ingredient join IngredientVariety
        on Ingredient.id = IngredientVariety.ingredientId
      where IngredientVariety.id = vVarietyId;

    vOutput = vOutput || ' ' || vIngredientData.name || ' (' || vIngredientData.region || '),';
  end loop;
  close cursorVarietyIds;
  return vOutput;
end;
$$ LANGUAGE plpgsql;


create or replace function getRecentOrders(vBakerId char(6)) returns setof json
as $$
declare
  vOrder record;
  vDeliveryAddress text;
  cursorRecentOrders cursor for 
    select *
    from Customer join PizzaOrder on Customer.id = PizzaOrder.customerId;
begin
  open cursorRecentOrders;
  loop
    fetch from cursorRecentOrders into vOrder;
    exit when not found;

    vDeliveryAddress = vOrder.deliveryHouseNo || ' ' || vOrder.deliveryStreet || ', ' || vOrder.deliveryPostcode || ' ' || vOrder.deliveryCity;

    return next json_build_object(
      'orderNo', vOrder.orderNo,
      'customerId', vOrder.customerId,
      'fullname', vOrder.fullname,
      'mobile', vOrder.mobile,
      'datetime', vOrder.datetime,
      'totalCost', vOrder.totalCost,
      'hasDelivered', vOrder.hasDelivered,
      'deliveryAddress', vDeliveryAddress,
      'pizzaDescription', vOrder.baseSize || ' inch ' || getOrderedPizzaDescription(vOrder.orderNo)
    );
  end loop;
end;
$$ language plpgsql;