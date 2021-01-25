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