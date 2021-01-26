import styles from '../styles/PizzaSizeInput.module.css'

export default function PizzaSizeInput(props) {
  const { className, size, isSelected, ...rest } = props

  return (
    <div
      className={`${styles.PizzaSizeInput} ${className} ${
        isSelected ? styles.active : ''
      }`}
    >
      <img src="https://i.imgur.com/MXhCRTa.png" alt="pizza base" {...rest} />
      <h3>{size}"</h3>
    </div>
  )
}
