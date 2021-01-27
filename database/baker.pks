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
  ingredientVaritiesCursor cursor for
    select ingredientId as id, json_agg(
      json_build_object(
        'id', ingredientVarietyId,
        'price', price,
        'region', region
      )
    ) as varieties
    from Owns join IngredientVariety on Owns.ingredientVarietyId = IngredientVariety.id  
    where bakerId = vBakerId
    group by ingredientId;
  
  vIngredientVarieties record;
  vIngredient Ingredient;

begin
  open ingredientVaritiesCursor;
  loop
    fetch from ingredientVaritiesCursor into vIngredientVarieties;
    exit when not found;

    select * into vIngredient
    from Ingredient where Ingredient.id = vIngredientVarieties.id;

    return next json_build_object(
      'id', vIngredientVarieties.id,
      'name', vIngredient.name,
      'image', vIngredient.image,
      'shortImage', vIngredient.shortImage,
      'varieties', vIngredientVarieties.varieties
    );
  end loop;
end;
$$ LANGUAGE plpgsql;
