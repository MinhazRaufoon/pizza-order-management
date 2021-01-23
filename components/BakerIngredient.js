import styles from '../styles/BakerIngredient.module.css'
import BuyButton from './BuyButton'
import CrossButton from './CrossButton'
import EditButton from './EditButton'
import HideButton from './HideButton'
import ShowButton from './ShowButton'
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
              <b>{model.name}&nbsp;</b>
              <label>Amount: {model.amount}</label>
              <label>Price: {model.price}</label>
              <br />
              <div className={styles.buttons}>
                <BuyButton />
                {isHidden ? <ShowButton /> : <HideButton />}
                <EditButton />
                <CrossButton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
