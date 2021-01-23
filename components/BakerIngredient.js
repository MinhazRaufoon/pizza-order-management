import { Fragment } from 'react'
import styles from '../styles/BakerIngredient.module.css'
import Poster from './Poster'

export default function BakerIngredient(props) {
  const { name, image, models, isHidden } = props
  return (
    <div className={styles.BakerIngredient}>
      <Poster className={styles.poster} imageUrl={image} />

      <div className={styles.details}>
        <h1>{name}</h1>

        <div className={styles.model}>
          {models.map((model, index) => (
            <div key={model.name || index} className={styles.modelInfo}>
              <b>{model.name}</b>
              <label>Amount: {model.amount}</label>
              <label>Price: {model.price}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
