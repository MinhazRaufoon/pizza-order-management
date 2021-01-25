create or replace function CreateCustomerTable() returns void
as $$
begin
  drop table Customer;
  create table Customer (
    id char(6) primary key,
    fullname varchar(20),
    mobileNo char(11),
    totalOrders integer not null
  );
end;
$$ LANGUAGE plpgsql;