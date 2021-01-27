import styles from '../styles/BakerIngredient.module.css'
import BuyButton from './BuyButton'
import CrossButton from './CrossButton'
import EditButton from './EditButton'
import HideButton from './HideButton'
import ShowButton from './ShowButton'
import Poster from './Poster'

export default function BakerIngredient(props) {
  const { name, image, shortImage, varieties, isHidden } = props

  return (
    <div
      className={styles.BakerIngredient}
      style={{ backgroundColor: isHidden ? 'lightgray' : '#fafafa' }}
    >
      <Poster className={styles.poster} imageUrl={image} />

      <div className={styles.details}>
        <h1>{name}</h1>
        {isHidden && <i>&nbsp;(Hidden to customers)</i>}

        <div className={styles.models}>
          {varieties.map(({ region, amount, price }) => (
            <div key={region} className={styles.modelInfo}>
              <Poster className={styles.modelPoster} imageUrl={shortImage} />
              <b>From {region}&nbsp;</b>
              <label>Amount: {amount}</label>
              <label>Price: {price}</label>
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
