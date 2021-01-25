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
