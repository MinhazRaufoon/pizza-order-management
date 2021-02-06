create or replace function getSupplierById(vSupplierId char(6)) returns json
as $$
declare
  vSupplier json;
begin
  select json_build_object(
    'id', id,
    'name', fullname,
    'address', address,
    'mobile', mobile,
    'image', image
  )
  as supplier into vSupplier from Supplier where id = vSupplierId;
  return vSupplier;
end;
$$ LANGUAGE plpgsql;


/* To get all the ingredients with varieties that a supplier produces */
create or replace function getSupplierProducts(vSupplierId char(6)) returns setof json
as $$
declare
  cursorMyIngredients cursor for 
    select 
      getIngredientIdByVarietyId(ingredientVarietyId) as ingredientId, 
      json_agg(
        getIngredientVarietyById(ingredientVarietyId)
      ) as varieties
    from Produces where supplierId = vSupplierId group by ingredientId;
  
  vMyIngredient record;

begin
  open cursorMyIngredients;
  loop
    fetch from cursorMyIngredients into vMyIngredient;
    exit when not found;
    return next getIngredient(vMyIngredient.ingredientId)::jsonb || json_build_object('varieties', vMyIngredient.varieties)::jsonb;
  end loop;
end;
$$ LANGUAGE plpgsql;


create or replace function hideOrShowSupplier(vBakerId char(6), vSupplierId char(6)) returns json
as $$
declare
  vIsHidden boolean;
  vNextState boolean;
begin
  select isHidden into vIsHidden 
    from Contracts
    where supplierId = vSupplierId and bakerId = vBakerId;
  
  if vIsHidden = true then
    vNextState = false;
  else
    vNextState = true;
  end if;

  update Contracts 
    set isHidden=vNextState
    where supplierId = vSupplierId and bakerId = vBakerId;
  
  return json_build_object(
    'success', true,
    'supplierId', vSupplierId,
    'state', vNextState
  );
end;
$$ LANGUAGE plpgsql;


create or replace function canProduce(vSupplierId char(6), vVarietyId char(6)) returns boolean
as $$
declare
  vCount integer;
begin
  select count(*) into vCount 
    from Produces where ingredientVarietyId = vVarietyId and supplierId = vSupplierId;
  
  if vCount > 0 then
    return true;
  else
    return false;
  end if;
end;
$$ language plpgsql;
