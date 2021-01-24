import CustomerIngredient from '../components/CustomerIngredient'
import PizzaSizeInput from '../components/PizzaSizeInput'
import usePizzaOrderForm from '../hooks/usePizzaOrderForm'
import { getAvailableIngredients } from '../lib'
import styles from '../styles/Customer.module.css'

const PIZZA_SIZES = [10, 12, 14]

export default function Customer({ availableIngredients }) {
  const {
    getCurrentPizzaSize,
    isIngredientSelected,
    selectPizzaSize,
    selectPizzaIngredient,
    unselectPizzaIngredient,
    getOrderSummary,
    getTotalCost,
  } = usePizzaOrderForm()

  return (
    <section className={styles.Customer}>
      <form className={styles.orderForm} onSubmit={(e) => e.preventDefault()}>
        <h1>Order a pizza</h1>

        <h2>1. Choose your pizza size</h2>

        <div className={styles.pizzaSizePicker}>
          {PIZZA_SIZES.map((size) => (
            <PizzaSizeInput
              key={size}
              className={styles.pizzaSizeInput}
              size={size}
              isSelected={getCurrentPizzaSize() === size}
              onClick={() => selectPizzaSize(size)}
            />
          ))}
        </div>

        <h2>2. Choose your favorite ingredients</h2>

        <div className={styles.ingredients}>
          {availableIngredients.map((ingredient) => {
            if (ingredient.models) {
              return ingredient.models.map((model) => (
                <CustomerIngredient
                  key={ingredient.name + model.name}
                  label={`${ingredient.name} (${model.name})`}
                  price={model.price}
                  image={model.icon}
                  isSelected={isIngredientSelected(ingredient.name, model.name)}
                  select={() =>
                    selectPizzaIngredient(
                      ingredient.name,
                      model.name,
                      model.price
                    )
                  }
                  remove={() =>
                    unselectPizzaIngredient(
                      ingredient.name,
                      model.name,
                      model.price
                    )
                  }
                />
              ))
            } else
              return (
                <CustomerIngredient
                  key={ingredient.name}
                  label={ingredient.name}
                  price={ingredient.price}
                  image={ingredient.icon}
                  isSelected={isIngredientSelected(ingredient.name)}
                  select={() =>
                    selectPizzaIngredient(
                      ingredient.name,
                      null,
                      ingredient.price
                    )
                  }
                  remove={() =>
                    unselectPizzaIngredient(
                      ingredient.name,
                      null,
                      ingredient.price
                    )
                  }
                />
              )
          })}
          <hr />
          <h3 className={styles.totalPrice}>Total: {getTotalCost()} €</h3>
        </div>

        <h2>3. Confirm your order?</h2>
        <p>{getOrderSummary()}</p>
        <input type="submit" value="Confirm My Order" />
      </form>
    </section>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      availableIngredients: await getAvailableIngredients(),
    },
  }
}
