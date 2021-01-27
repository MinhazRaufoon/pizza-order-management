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