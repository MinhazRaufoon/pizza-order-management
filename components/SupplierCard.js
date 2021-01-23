import styles from '../styles/SupplierCard.module.css'
import BuyButton from './BuyButton'
import CrossButton from './CrossButton'
import EditButton from './EditButton'
import HideButton from './HideButton'
import ShowButton from './ShowButton'
import Poster from './Poster'

export default function SupplierCard(props) {
  const { id, name, address, image, isHidden } = props

  return (
    <div
      className={styles.SupplierCard}
      style={{ opacity: isHidden ? '0.6' : 'unset' }}
    >
      <Poster className={styles.poster} imageUrl={image} />

      <div className={styles.details}>
        <h1>{name}</h1>
        <p>ID: {id}</p>
        <p>{address}</p>

        {isHidden && <i>&nbsp;(Hidden to me)</i>}

        <div className={styles.buttons}>
          <BuyButton />
          {isHidden ? <ShowButton /> : <HideButton />}
          <EditButton />
          <CrossButton />
        </div>
      </div>
    </div>
  )
}
