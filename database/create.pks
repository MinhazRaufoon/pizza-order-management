create or replace function CreateCustomerTable() returns void
as $$
begin
  create table Customer (
    id char(6) primary key,
    fullname varchar(50),
    mobile char(11),
    totalOrders integer not null
  );
end;
$$ LANGUAGE plpgsql;


create or replace function CreatePizzaOrderTable() returns void
as $$
begin
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
    hasDelivered boolean not null default false,

    constraint verifyBaseSize check (baseSize in (10, 12, 14)),
    constraint fkCustomerId foreign key (customerId) references Customer(id)
  );
end;
$$ LANGUAGE plpgsql;


create or replace function CreateBakerTable() returns void
as $$
begin
  create table Baker(
    id char(6) primary key,
    fullname varchar(50),
    mobile char(11),
    salary numeric(5,2) not null default 0,
    totalIngredients integer not null
  );
end;
$$ LANGUAGE plpgsql;


create or replace function CreateIngredientTable() returns void
as $$
begin
  create table Ingredient(
    id char(6) primary key,
    name varchar(20),
    image varchar(100),
    shortImage varchar(100)
  );
end;
$$ LANGUAGE plpgsql;


create or replace function CreateIngredientVarietyTable() returns void
as $$
begin
  create table IngredientVariety(
    id char(6) primary key,
    ingredientId char(6),
    region varchar(20),
    price numeric(5,2) not null default 0,
    constraint fk_iid foreign key (ingredientId) references Ingredient(id)
  );
end;
$$ LANGUAGE plpgsql;


create or replace function CreateSupplierTable() returns void
as $$
begin
  create table Supplier(
    id char(6) primary key,
    fullname varchar(50),
    mobile char(11),
    address varchar(50),
    image varchar(100)
  );
end;
$$ LANGUAGE plpgsql;


create or replace function CreateContractsTable() returns void
as $$
begin
  create table Contracts(
    bakerId char(6),
    supplierId char(6),
    isHidden boolean not null default false,

    constraint fk_bid foreign key (bakerId) references Baker(id),
    constraint fk_sid foreign key (supplierId) references Supplier(id)
  );
end;
$$ language plpgsql;


create or replace function CreateProducesTable() returns void
as $$
begin
  create table Produces(
    supplierId char(6),
    ingredientVarietyId char(6),
    constraint fk_sid foreign key (supplierId) references Supplier(id),
    constraint fk_iid foreign key (ingredientVarietyId) references IngredientVariety(id)
  );
end;
$$ language plpgsql;


create or replace function CreateOwnsTable() returns void
as $$
begin
  create table Owns(
    bakerId char(6),
    ingredientVarietyId char(6),
    isHidden boolean not null default false,
    amount integer not null default 0,
    constraint fk_iid foreign key (ingredientVarietyId) references IngredientVariety(id),
    constraint fk_sid foreign key (bakerId) references Baker(id)
  );
end;
$$ language plpgsql;


create or replace function CreateContainsTable() returns void
as $$
begin
  create table Contains(
    orderNo char(10),
    ingredientVarietyId char(6),
    constraint fk_on foreign key (orderNo) references PizzaOrder(orderNo),
    constraint fk_iid foreign key (ingredientVarietyId) references IngredientVariety(id)
  );
end;
$$ language plpgsql;


create or replace function CreateRestocksTable() returns void
as $$
begin
  create table Restocks(
    bakerId char(6),
    supplierId char(6),
    ingredientVarietyId char(6),
    datetime timestamp,
    amount integer not null default 0,
    constraint fk_bid foreign key (bakerId) references Baker(id),
    constraint fk_sid foreign key (supplierId) references Supplier(id),
    constraint fk_iid foreign key (ingredientVarietyId) references IngredientVariety(id)
  );
end;
$$ language plpgsql;
