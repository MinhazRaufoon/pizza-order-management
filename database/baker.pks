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


create or replace function getUncontractedSuppliers(vBakerId char(6)) returns setof json
as $$
declare
  cursorMySupplier cursor for
    select getSupplierById(id) as supplier
      from (
        with MyContracts as ( select * from Contracts where bakerId = vBakerId )
        select * from 
          MyContracts right join Supplier 
            on Supplier.id = MyContracts.supplierId
          where MyContracts.supplierId is null
      ) as UncontractedSuppliers;
  
  vSupplierToAdd record;

begin
  open cursorMySupplier;
  loop
    fetch from cursorMySupplier into vSupplierToAdd;
    exit when not found;
    -- Extract each "supplier" object from the json and return as json
    return next vSupplierToAdd.supplier;
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
        getIngredientVarietyById(ingredientVarietyId)::jsonb 
        || json_build_object('amount', amount)::jsonb
        || json_build_object('isHidden', isHidden)::jsonb
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


create or replace function getSummaryOfEverything(vBakerId char(6)) returns json
as $$
declare
  vTotalOrders integer;
  vTotalIngredientVarieties integer;
  vTotalIngredients integer;
  vTotalSuppliers integer;

begin
  select count(orderNo) 
    into vTotalOrders from PizzaOrder;

  select count(ingredientVarietyId) 
    into vTotalIngredientVarieties from Owns where bakerId = vBakerId;

  with IngredientNames as (
    select name
        from 
        (
          IngredientVariety join Owns 
          on Owns.ingredientVarietyId = IngredientVariety.id
        ) 
        join Ingredient on IngredientVariety.ingredientId = Ingredient.id
      where bakerId = vBakerId
      group by name
  ) select count(name) into vTotalIngredients from IngredientNames;
  
  select count(supplierId) 
    into vTotalSuppliers from Contracts where bakerId = vBakerId;
  
  return json_build_object(
    'totalOrders', vTotalOrders,
    'totalIngredientVarieties', vTotalIngredientVarieties,
    'totalIngredients', vTotalIngredients,
    'totalSuppliers', vTotalSuppliers
  );
end;
$$ language plpgsql;


/* To get the list of suppliers of a baker who can produce a particular ingredient variety. (Necessary for restock) */
create or replace function getSuppliersOfIngredientVariety(vbakerId char(6), vVarietyId char(6)) returns setof json
as $$
declare
  cursorSuppliers cursor for
    select * 
      from 
        (Produces join Supplier on Produces.supplierId = Supplier.id)
        join Contracts on Contracts.supplierId = Supplier.id
      where Produces.ingredientVarietyId = vVarietyId and bakerId = vBakerId and isHidden = false;
  
  vSupplier record;
begin
  open cursorSuppliers;
  loop
    fetch from cursorSuppliers into vSupplier;
    exit when not found;
    return next json_build_object(
      'id', vSupplier.id,
      'name', vSupplier.fullname
    );
  end loop;
end;
$$ language plpgsql;


create or replace function isValidSupplier(vBakerId char(6), vSupplierId char(6)) returns boolean
as $$
declare
  vRowCount integer;
begin
  select count(*) into vRowCount from Contracts
    where bakerId = vBakerId and supplierId = vSupplierId;
  if vRowCount > 0 then
    return true;
  else
    return false;
  end if;
end;
$$ language plpgsql;


create or replace function isSupplierHidden(vBakerId char(6), vSupplierId char(6)) returns boolean
as $$
declare
  vIsHidden boolean;
begin
  select isHidden into vIsHidden 
    from Contracts where bakerId = vBakerId and supplierId = vSupplierId;
  return vIsHidden;
end;
$$ language plpgsql;


create or replace function restock(vBakerId char(6), vSupplierId char(6), vVarietyId char(6), vAmount integer) returns json
as $$
declare
begin
  if getAmountOfIngredientVariety(vBakerId, vVarietyId) > 0 then
    raise exception using 
      errcode='P002',
      message='You can only restock out of stock ingredients';
  end if;

  if isValidSupplier(vBakerId, vSupplierId) = false then
    raise exception using 
      errcode='P002',
      message='You have no contract with this supplier';
  end if;

  if isSupplierHidden(vBakerId, vSupplierId) = true then
    raise exception using 
      errcode='P002',
      message='You cannot restock from a hidden supplier';
  end if;

  if canProduce(vVarietyId, vSupplierId) = true then
    raise exception using 
      errcode='P002',
      message='The chosen supplier cannot produce this ingredient variety';
  end if;

  insert into Restocks values(vBakerId, vSupplierId, vVarietyId, now(), vAmount);

  return json_build_object('success', true);

exception
  when sqlstate 'P0002' then
    return json_build_object('success', false, 'message', sqlerrm);
end;
$$ language plpgsql;


create or replace function addNewSupplier(vBakerId char(6), vSupplierId char(6)) returns json
as $$
begin
  insert into Contracts values(vBakerId, vSupplierId);
  return json_build_object(
    'success', true
  );
end;
$$ language plpgsql;


create or replace function deleteSupplier(vBakerId char(6), vSupplierId char(6)) returns json
as $$
begin
  delete from Contracts
   where bakerId = vBakerId and supplierId = vSupplierId;
  return json_build_object(
    'success', true
  );
end;
$$ language plpgsql;


create or replace function getNotOwnIngredients(vBakerId char(6)) returns setof json
as $$
declare
  vNotOwnIngredient record;

  cursorNotOwnIngredients cursor for
    select name, shortImage as image, IngredientVariety.id as id, region, price
    from 
      (select * from Owns where bakerId = vBakerId) as MyOwnedVarieties
      right join 
      (Ingredient join IngredientVariety on Ingredient.id = IngredientVariety.ingredientId)
      on ingredientVarietyId = IngredientVariety.id
    where MyOwnedVarieties.ingredientVarietyId is null;

begin
  open cursorNotOwnIngredients;
  loop
    fetch from cursorNotOwnIngredients into vNotOwnIngredient;
    exit when not found;
    
    return next json_build_object(
      'name', vNotOwnIngredient.name,
      'image', vNotOwnIngredient.image,
      'id', vNotOwnIngredient.id,
      'region', vNotOwnIngredient.region,
      'price', vNotOwnIngredient.price
    );
  end loop;
end;
$$ language plpgsql;


create or replace function addIngredientVariety(vBakerId char(6), vVarietyId char(6)) returns json
as $$
begin
  insert into Owns values(vBakerId, vVarietyId, false, 0);
  return json_build_object(
    'success', true
  );
end;
$$ language plpgsql;


create or replace function deleteIngredientVariety(vBakerId char(6), vVarietyId char(6)) returns json
as $$
begin
  delete from Owns
   where bakerId = vBakerId and ingredientVarietyId = vVarietyId;
  return json_build_object(
    'success', true
  );
end;
$$ language plpgsql;
