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

