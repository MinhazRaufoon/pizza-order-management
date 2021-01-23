import styles from '../styles/PizzaSizeInput.module.css'

export default function PizzaSizeInput({ className, size, ...rest }) {
  return (
    <div className={`${styles.PizzaSizeInput} ${className}`}>
      <img src="/images/pizza-base.png" alt="pizza base" {...rest} />
      <h3>{size}</h3>
    </div>
  )
}
