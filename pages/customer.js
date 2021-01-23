import styles from '../styles/Customer.module.css'

export default function Customer() {
  return (
    <div className={styles.Customer}>
      <form className={styles.orderForm}>
        <h1>Order a pizza</h1>
        <p>Customize your pizza and confirm</p>

        <h3>1. Choose your pizza size</h3>
        <div className={styles.pizzaSizePicker}>
          <p>Here lies the prices for the pizza bases</p>
        </div>

        <h3>2. Choose your favorite ingredients</h3>
        <div className={styles.ingredients}>
          <p>You can add and remove items</p>
        </div>

        <h3>3. Confirm your order?</h3>
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
