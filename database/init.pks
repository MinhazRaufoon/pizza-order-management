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
  insert into Baker values ('666666', 'Jean-Luc Picard', '01712880022', 10.00, 0);

  insert into Supplier values ('666321', 'Wayne Enterprise', '01712882222', 'Chemnitz 09126', 'https://i.imgur.com/uLrNsH0.jpg');
  insert into Supplier values ('661321', 'Lost Pollos Hermanos', '01712885522', 'Dresden 09126', 'https://i.imgur.com/FircXQ5.png');
  insert into Supplier values ('532422', 'Overlook Hotel', '01532882222', 'Leipzig 09126', 'https://i.imgur.com/OKUp4P9.jpg');
  insert into Supplier values ('764534', 'Don Corleone Foundation', '01712833222', 'Zwichau 09126', 'https://i.imgur.com/1IhuO6n.jpg');
  insert into Supplier values ('524524', 'Forrest Gump GmbH', '01712882112', 'Berlin 09126', 'https://i.imgur.com/HkgIWAi.png');

  insert into Contracts values ('666666', '666321');
  insert into Contracts values ('666666', '661321');
  insert into Contracts values ('666666', '532422');
  insert into Contracts values ('666666', '764534');
  insert into Contracts values ('666666', '524524');

  insert into Ingredient values ('100001', 'Cheese', 'https://i.imgur.com/TlZ34Lr.jpg', 'https://i.imgur.com/PO6Se9f.png');
  insert into IngredientVariety values ('101001', '100001', 'Germany', 2.4);
  insert into IngredientVariety values ('101002', '100001', 'Italy', 3.5);
  insert into IngredientVariety values ('101003', '100001', 'USA', 1.2);

  insert into Ingredient values ('100002', 'Olive', 'https://i.imgur.com/ndai0kk.png', 'https://i.imgur.com/m20d1tq.png');
  insert into IngredientVariety values ('102001', '100002', 'Spain', 1.1);
  insert into IngredientVariety values ('102002', '100002', 'Italy', 3.1);
  insert into IngredientVariety values ('102003', '100002', 'Turky', 3.2);

  insert into Ingredient values ('100003', 'Sausage', 'https://i.imgur.com/WsEascF.jpg', 'https://i.imgur.com/rwn2Mjw.png');
  insert into IngredientVariety values ('103001', '100003', 'Spain', 4.1);
  insert into IngredientVariety values ('103002', '100003', 'Italy', 5.1);
  insert into IngredientVariety values ('103003', '100003', 'Turky', 1.2);

  insert into Ingredient values ('100004', 'Bacon', 'https://i.imgur.com/6aSgEqQ.png', 'https://i.imgur.com/AG1nF0w.png');
  insert into IngredientVariety values ('104001', '100004', 'Germany', 1.5);
  
  insert into Ingredient values ('100005', 'Pineapple', 'https://i.imgur.com/AyQ7CLP.jpg', 'https://i.imgur.com/M1FY3kb.png');
  insert into IngredientVariety values ('105001', '100005', 'Russia', 1.4);
  
  insert into Ingredient values ('100006', 'Mushroom', 'https://i.imgur.com/d6oFCTu.jpg', 'https://i.imgur.com/92FIwrX.png');
  insert into IngredientVariety values ('106001', '100006', 'Africa', 1.9);
  
  insert into Ingredient values ('100007', 'Onion', 'https://i.imgur.com/TpoJTaB.jpg', 'https://i.imgur.com/irHrLsG.png');
  insert into IngredientVariety values ('107001', '100007', 'Bangladesh', 0.5);
  
  insert into Ingredient values ('100008', 'Salami', 'https://i.imgur.com/RMr7423.jpg', 'https://i.imgur.com/jkR7Xfx.png');
  insert into IngredientVariety values ('108001', '100008', 'Italy', 2.3);
  insert into IngredientVariety values ('108002', '100008', 'UK', 1.1);
  insert into IngredientVariety values ('108003', '100008', 'USA', 1.7);

  insert into Ingredient values ('100009', 'Steak', 'https://i.imgur.com/Fb8sUtm.jpg', 'https://i.imgur.com/mq928Ug.png');
  insert into IngredientVariety values ('109001', '100009', 'Germany', 6.2);
  insert into IngredientVariety values ('109002', '100009', 'Italy', 4.5);
  insert into IngredientVariety values ('109003', '100009', 'Turky', 5.5);

  insert into Ingredient values ('100010', 'Pepper', 'https://i.imgur.com/jQ6x51q.jpg', 'https://i.imgur.com/WJD7HvK.png');
  insert into IngredientVariety values ('110003', '100010', 'Germany', 2.5);

  insert into Owns values ('666666', '101001', 'false', 3);
  insert into Owns values ('666666', '101003', 'false', 2);
  insert into Owns values ('666666', '101002', 'false', 5);
  insert into Owns values ('666666', '102001', 'false', 4);
  insert into Owns values ('666666', '102002', 'false', 3);
  insert into Owns values ('666666', '102003', 'false', 2);
  insert into Owns values ('666666', '103001', 'false', 5);
  insert into Owns values ('666666', '103002', 'false', 6);
  insert into Owns values ('666666', '103003', 'false', 3);
  insert into Owns values ('666666', '104001', 'false', 6);
  insert into Owns values ('666666', '105001', 'false', 7);
  insert into Owns values ('666666', '106001', 'false', 4);
  insert into Owns values ('666666', '107001', 'false', 8);
  insert into Owns values ('666666', '108001', 'false', 5);
  insert into Owns values ('666666', '108002', 'false', 4);
  insert into Owns values ('666666', '108003', 'false', 7);
  insert into Owns values ('666666', '109001', 'false', 5);
  insert into Owns values ('666666', '109002', 'false', 7);
  insert into Owns values ('666666', '109003', 'false', 8);
  insert into Owns values ('666666', '110003', 'false', 4);
end;
$$ LANGUAGE plpgsql;
