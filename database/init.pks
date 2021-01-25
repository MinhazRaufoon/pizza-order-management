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

create or replace function CreatePizzaOrderTable() returns void
as $$
begin
  drop table PizzaOrder;
  create table PizzaOrder(
    orderNo char(10) not null primary key,
    customerId char(6),
    baseSize integer not null,
    deliveryHouseNo integer not null,
    deliveryStreet varchar(15) not null,
    deliveryPostcode integer not null,
    deliveryCity varchar(15) not null,
    datetime timestamp,
    totalCost numeric(5,2) not null default 0,
    hasDelivered boolean,
    constraint verifyBaseSize check (baseSize in (10, 12, 14)),
    constraint fkCustomerId foreign key (customerId) references Customer(id)
  );
end;
$$ LANGUAGE plpgsql;

create or replace function CreateBakerTable() returns void
as $$
begin
  drop table Baker;
  create table Baker(
    id char(6) primary key,
    fullname varchar(20),
    salary numeric(5,2) not null default 0,
    totalIngredients integer not null
  );
end;
$$ LANGUAGE plpgsql;

create or replace function CreateTables() returns void
as $$
begin
  select CreateCustomerTable();
  select CreatePizzaOrderTable();
  select CreateBakerTable();
end;
$$ LANGUAGE plpgsql;

create or replace function PopulateDatabase() returns void
as $$
begin
  insert into Customer values ('156722', 'James Kirk', '01682962010');
  insert into Baker values ('123456', 'Leonard McCoy', '01712880022');
end;
$$ LANGUAGE plpgsql;

create or replace function InitDatabase() returns void
as $$
begin
  select CreateTables();
  select PopulateDatabase();
end;
$$ LANGUAGE plpgsql;
