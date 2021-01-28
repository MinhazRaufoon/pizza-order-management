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


drop trigger if exists increment_customer_total_orders on PizzaOrder;

create trigger increment_customer_total_orders
  after insert on PizzaOrder for each row
  execute procedure incrementCustomerTotalOrders();


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


drop trigger if exists calculate_total_cost on PizzaOrder;

create trigger calculate_total_cost
  after insert on Contains for each row
  execute procedure calculateTotalCost();
