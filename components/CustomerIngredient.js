import styles from '../styles/CustomerIngredient.module.css'

export default function CustomerIngredient(props) {
  const { isSelected, label, image, price, select, remove, ...rest } = props

  return (
    <div
      className={`${styles.CustomerIngredient} ${
        isSelected ? styles.checked : ''
      }`}
      {...rest}
    >
      <img className={styles.icon} src={image} />
      <b>{label}</b>
      <span>{price} €</span>
      <button onClick={isSelected ? remove : select}>
        {isSelected ? 'Remove' : 'Add'}
      </button>
    </div>
  )
}
