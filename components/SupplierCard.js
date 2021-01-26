import styles from '../styles/SupplierCard.module.css'
import BuyButton from './BuyButton'
import CrossButton from './CrossButton'
import EditButton from './EditButton'
import HideButton from './HideButton'
import ShowButton from './ShowButton'
import Poster from './Poster'

export default function SupplierCard(props) {
  const { id, fullname, mobile, address, image, isHidden } = props

  return (
    <div
      className={styles.SupplierCard}
      style={{ backgroundColor: isHidden ? 'lightgray' : '#fafafa' }}
    >
      <Poster className={styles.poster} imageUrl={image} />

      <div className={styles.details}>
        <h1>{fullname}</h1>
        <p>
          <b>ID:</b> {id}
        </p>
        <p>
          <b>Address:</b> {address}
        </p>
        <p>
          <b>Mobile:</b> {mobile}
        </p>

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
