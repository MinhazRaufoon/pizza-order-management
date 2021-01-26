create or replace function getSuppliers(vBakerId char(6)) returns setof json
as $$
declare
  supplierCursor cursor for 
    select id, fullname, mobile, address, image, isHidden 
    from Supplier join Contracts on Supplier.id = Contracts.supplierId
    where bakerId = vBakerId;
  vSupplier Supplier;
begin
  open supplierCursor;
  loop
    fetch from supplierCursor into vSupplier;
    exit when not found;
    return next row_to_json(vSupplier);
  end loop;
end;
$$ LANGUAGE plpgsql;


create or replace function getIngredients(vBakerId char(6)) returns setof json
as $$
declare
  ingredientCursor cursor for 
    with OwnIngredientVariety as (
      select * from Owns join IngredientVariety on Owns.ingredientVarietyId = IngredientVariety.id
    )
    select * from Ingredient join OwnIngredientVariety on Ingredient.id = OwnIngredientVariety.ingredientId
    where bakerId = vBakerId;
  
$$ LANGUAGE plpgsql;
