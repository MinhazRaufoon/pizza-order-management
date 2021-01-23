import { Fragment } from 'react'
import styles from '../styles/BakerIngredient.module.css'
import Poster from './Poster'

export default function BakerIngredient(props) {
  const { name, image, models, isHidden } = props

  const hasManyModels = models.length > 1

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
              <br />
              {hasManyModels && (
                <div className={styles.buttons}>
                  <button>Restock</button>
                  <button>Remove</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {!hasManyModels && (
          <div className={styles.buttons}>
            <button>Restock</button>
            <button>Remove</button>
          </div>
        )}
      </div>
    </div>
  )
}
