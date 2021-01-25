create or replace prodecure CreateCustomerTable()
as
begin
  create table CUSTOMER (
    id char(6) not null;
    fullname varchar(20);
    mobileNo char(8);
    totalOrders number;
  )
end;

create or replace prodecure CreateAllTables()
as
begin
  CreateCustomerTable();
end;

create or replace procedure InitDatabase() 
as
begin
  CreateAllTables();
end;