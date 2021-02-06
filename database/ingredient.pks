create or replace function getIngredientVarietyById(vVarietyId char(6)) returns json
as $$
declare
  vVariety json;
begin
  select json_build_object(
    'id', id,
    'region', region,
    'price', price
  )
  as variety into vVariety from IngredientVariety where id = vVarietyId;
  return vVariety;
end;
$$ LANGUAGE plpgsql;


create or replace function getIngredientVarieties(vIngredientId char(6)) returns json
as $$
declare
  jVarietyList json;
begin
  select json_agg(getIngredientVarietyById(id)) 
  as varieties into jVarietyList from IngredientVariety where ingredientId = vIngredientId;
  return jVarietyList;
end;
$$ LANGUAGE plpgsql;


create or replace function getIngredient(vIngredientId char(6)) returns json
as $$
declare
  jIngredientInfo json;
begin
  select json_build_object(
    'id', id, 
    'name', name, 
    'image', image,
    'shortImage', shortImage
  )
  as ingredient into jIngredientInfo from Ingredient where id = vIngredientId;
  return jIngredientInfo;
end;
$$ LANGUAGE plpgsql;


create or replace function getIngredientWithVarieties(vIngredientId char(6)) returns json
as $$
declare
  jIngredientInfo json;
begin
  select json_build_object(
    'id', id, 
    'name', name, 
    'image', image,
    'shortImage', shortImage,
    'varieties', getIngredientVarieties(vIngredientId)
  )
  as ingredient into jIngredientInfo from Ingredient where id = vIngredientId;
  return jIngredientInfo;
end;
$$ LANGUAGE plpgsql;


create or replace function getIngredientIdByVarietyId(vVarietyId char(6)) returns char(6)
as $$
declare
  vIngredientId char(6);

begin
  select ingredientId into vIngredientId from IngredientVariety where id = vVarietyId;
  return vIngredientId;
end;
$$ LANGUAGE plpgsql;


create or replace function getIngredientByVarietyId(vVarietyId char(6)) returns json
as $$
declare
  vIngredientId char(6);

begin
  vIngredientId := getIngredientIdByVarietyId(vVarietyId);
  return getIngredient(vIngredientId);
end;
$$ LANGUAGE plpgsql;


create or replace function getAmountOfIngredientVariety(vBakerId char(6), vVarietyId char(6)) returns integer
as $$
declare
  vAmount integer;
begin
  select amount into vAmount
  from Owns where bakerId = vBakerId and ingredientVarietyId = vVarietyId;
  return vAmount;
end;
$$ language plpgsql;


create or replace function getPriceOfIngredientVariety(vVarietyId char(6)) returns numeric(5,2)
as $$
declare
  vPrice numeric(5,2);
begin
  select price into vPrice
  from IngredientVariety where id = vVarietyId;
  return vPrice;
end;
$$ language plpgsql;

create or replace function hideOrShowIngredient(vBakerId char(6), vVarietyId char(6)) returns json
as $$
declare
  vIsHidden boolean;
  vNextState boolean;
begin
  select isHidden into vIsHidden 
    from Owns where ingredientVarietyId = vVarietyId and bakerId = vBakerId;

  if vIsHidden = true then
    vNextState = false;
  else
    vNextState = true;
  end if;

  update Owns 
    set isHidden=vNextState where ingredientVarietyId = vVarietyId and bakerId = vBakerId;
  
  return json_build_object(
    'success', true,
    'ingredientVarietyId', vVarietyId,
    'state', vNextState
  );
end;
$$ language plpgsql;
