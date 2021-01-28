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

