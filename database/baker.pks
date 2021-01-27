create or replace function getMySuppliers(vBakerId char(6)) returns setof json
as $$
declare
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
    return next vMySupplier.supplier;
  end loop;
end;
$$ LANGUAGE plpgsql;


create or replace function getMyIngredients(vBakerId char(6)) returns setof json
as $$
declare
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
    return next getIngredient(vMyIngredient.ingredientId)::jsonb || json_build_object('varieties', vMyIngredient.varieties)::jsonb;
  end loop;
end;
$$ LANGUAGE plpgsql;

