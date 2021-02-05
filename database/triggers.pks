create or replace function incrementCustomerTotalOrders()
returns trigger 
as $$
begin
  update Customer 
  set totalOrders = totalOrders + 1
  where id = NEW.customerId;

  return NEW;
end;
$$ language plpgsql;


create trigger increment_customer_total_orders
  after insert on PizzaOrder for each row
  execute procedure incrementCustomerTotalOrders();


create or replace function reduceCustomerTotalOrders()
returns trigger 
as $$
begin
  update Customer 
  set totalOrders = totalOrders - 1
  where id = OLD.customerId;

  return OLD;
end;
$$ language plpgsql;


create trigger reduce_customer_total_orders
  before delete on PizzaOrder for each row
  execute procedure reduceCustomerTotalOrders();


create or replace function calculateTotalCost()
returns trigger 
as $$
begin
  update PizzaOrder
  set totalCost = totalCost + getPriceOfIngredientVariety(NEW.ingredientVarietyId)
  where orderNo = NEW.orderNo;

  return NEW;
end;
$$ language plpgsql;

create trigger calculate_total_cost
  after insert on Contains for each row
  execute procedure calculateTotalCost();
