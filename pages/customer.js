import CustomerIngredient from '../components/CustomerIngredient'
import PizzaSizeInput from '../components/PizzaSizeInput'
import usePizzaOrderForm from '../hooks/usePizzaOrderForm'
import { getAvailableIngredients } from '../lib'
import styles from '../styles/Customer.module.css'

const PIZZA_SIZES = [`10"`, `12"`, `14"`]

export default function Customer({ availableIngredients }) {
  const {
    getCurrentPizzaSize,
    isIngredientSelected,
    selectPizzaSize,
    selectPizzaIngredient,
    unselectPizzaIngredient,
  } = usePizzaOrderForm()

  return (
    <div className={styles.Customer}>
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
              return false
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
        </div>

        <h2>3. Confirm your order?</h2>
        <p>
          You will have a 28 inch pizza with cheese, bacon and tomato. Overall
          it costs 50€.
        </p>
        <input type="submit" value="Confirm My Order" />
      </form>

      <div className={styles.myLastOrder}></div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      availableIngredients: await getAvailableIngredients(),
    },
  }
}
