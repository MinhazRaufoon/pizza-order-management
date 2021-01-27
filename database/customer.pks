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