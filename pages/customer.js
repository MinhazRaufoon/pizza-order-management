import CustomerIngredient from '../components/CustomerIngredient'
import PizzaSizeInput from '../components/PizzaSizeInput'
import usePizzaOrderForm from '../hooks/usePizzaOrderForm'
import {
  getAvailableIngredients,
  getCustomerData,
  makeGetRequest,
} from '../lib'
import styles from '../styles/Customer.module.css'

const PIZZA_SIZES = [10, 12, 14]

export default function Customer({ availableIngredients }) {
  const {
    getCurrentPizzaSize,
    isIngredientSelected,
    selectPizzaSize,
    selectPizzaIngredient,
    unselectPizzaIngredient,
    getTotalCost,
    submit,
    getPizzaSize,
    isComplete,
    addDeliveryAddress,
    isOrderSuccessFul,
    hasError,
    message,
  } = usePizzaOrderForm()

  return (
    <section className={styles.Customer}>
      <div className={styles.orderForm}>
        {(hasError || isOrderSuccessFul) && (
          <div
            className={styles.responseCard}
            style={{ backgroundColor: hasError ? 'red' : 'green' }}
          >
            <p>{isOrderSuccessFul && 'Your order is successful!'}</p>
            <p>{hasError && message}</p>
          </div>
        )}
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

        {!!getPizzaSize() && (
          <>
            <h2>2. Choose your favorite ingredients</h2>

            <div className={styles.ingredients}>
              {availableIngredients.map(
                ({ varietyId, name, price, region, image }) => (
                  <CustomerIngredient
                    key={varietyId}
                    label={`${name} (${region})`}
                    price={price}
                    image={image}
                    isSelected={isIngredientSelected(varietyId)}
                    select={() => selectPizzaIngredient(varietyId, price)}
                    remove={() => unselectPizzaIngredient(varietyId, price)}
                  />
                )
              )}
              <hr />
              <h3 className={styles.totalPrice}>Total: {getTotalCost()} €</h3>
            </div>
          </>
        )}

        {getTotalCost() > 0 && (
          <>
            <h2>3. Provide your delivery address</h2>
            <input
              type="text"
              name="houseNo"
              placeholder="House No."
              onChange={addDeliveryAddress}
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              onChange={addDeliveryAddress}
            />
            <input
              type="text"
              name="postcode"
              placeholder="Post Code"
              onChange={addDeliveryAddress}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={addDeliveryAddress}
            />
          </>
        )}

        {isComplete() && (
          <form
            onSubmit={(e) => {
              submit()
              e.preventDefault()
            }}
          >
            <h2>4. Confirm your order?</h2>
            <input type="submit" value="Confirm My Order" />
          </form>
        )}
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  const availableIngredients = await makeGetRequest('api/customer/ingredients')
  return {
    props: {
      availableIngredients,
    },
  }
}
