import PizzaSizeInput from '../components/PizzaSizeInput'
import styles from '../styles/Customer.module.css'

export default function Customer() {
  return (
    <div className={styles.Customer}>
      <form className={styles.orderForm}>
        <h1>Order a pizza</h1>

        <h2>1. Choose your pizza size</h2>
        <div className={styles.pizzaSizePicker}>
          <PizzaSizeInput className={styles.pizzaSizeInput} size={`10"`} />
          <PizzaSizeInput className={styles.pizzaSizeInput} size={`12"`} />
          <PizzaSizeInput className={styles.pizzaSizeInput} size={`14"`} />
        </div>

        <h2>2. Choose your favorite ingredients</h2>
        <div className={styles.ingredients}>
          <p>You can add and remove items</p>
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
