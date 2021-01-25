create or replace prodecure GetCustomerDetails(in vId CUSTOMER.id%TYPE) return CUSTOMER%ROWTYPE
as
declare
  vDetails CUSTOMER%ROWTYPE
begin
  select * into vDetails from CUSTOMER where id = vId
  return vDetails
end;

GetCustomerDetails("156722")
