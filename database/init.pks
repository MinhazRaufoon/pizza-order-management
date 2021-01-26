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
    isHidden boolean not null default true,

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


create or replace function CreateTables() returns void
as $$
begin
  perform CreateCustomerTable();
  perform CreatePizzaOrderTable();
  perform CreateBakerTable();
  perform CreateIngredientTable();
  perform CreateIngredientVarietyTable();
  perform CreateSupplierTable();
  perform CreateContractsTable();
  perform CreateProducesTable();
  perform CreateOwnsTable();
  perform CreateContainsTable();
  perform CreateRestocksTable();
end;
$$ LANGUAGE plpgsql;


create or replace function DeleteTables() returns void
as $$
begin
  drop table Contracts cascade;
  drop table Produces cascade;
  drop table Owns cascade;
  drop table Contains cascade;
  drop table Restocks cascade;
  drop table IngredientVariety cascade;
  drop table Ingredient cascade;
  drop table Baker cascade;
  drop table PizzaOrder cascade;
  drop table Supplier cascade;
  drop table Customer cascade;
end;
$$ LANGUAGE plpgsql;


create or replace function PopulateDatabase() returns void
as $$
begin
  insert into Customer values ('156722', 'James T Kirk', '01682962010', 0);
  insert into Baker values ('331233', 'Jean-Luc Picard', '01712880022', 10.00, 0);

  insert into Supplier values ('666321', 'Wayne Enterprise', '01712882222', 'Chemnitz 09126', 'https://i.imgur.com/uLrNsH0.jpg');
  insert into Supplier values ('661321', 'Lost Pollos Hermanos', '01712885522', 'Dresden 09126', 'https://i.imgur.com/FircXQ5.png');
  insert into Supplier values ('532422', 'Overlook Hotel', '01532882222', 'Leipzig 09126', 'https://i.imgur.com/OKUp4P9.jpg');
  insert into Supplier values ('764534', 'Don Corleone Foundation', '01712833222', 'Zwichau 09126', 'https://i.imgur.com/1IhuO6n.jpg');
  insert into Supplier values ('524524', 'Forrest Gump GmbH', '01712882112', 'Berlin 09126', 'https://i.imgur.com/HkgIWAi.png');

  insert into Ingredient values ('100001', 'Cheese', 'https://i.imgur.com/TlZ34Lr.jpg');
  insert into Ingredient values ('100002', 'Olive', 'https://i.imgur.com/ndai0kk.png');
  insert into Ingredient values ('100003', 'Sausage', 'https://i.imgur.com/WsEascF.jpg');
  insert into Ingredient values ('100004', 'Bacon', 'https://i.imgur.com/6aSgEqQ.png');
  insert into Ingredient values ('100005', 'Pineapple', 'https://i.imgur.com/AyQ7CLP.jpg');
  insert into Ingredient values ('100006', 'Mushroom', 'https://i.imgur.com/d6oFCTu.jpg');
  insert into Ingredient values ('100007', 'Onion', 'https://i.imgur.com/TpoJTaB.jpg');
  insert into Ingredient values ('100008', 'Salami', 'https://i.imgur.com/RMr7423.jpg');
  
end;
$$ LANGUAGE plpgsql;
