import styles from '../styles/SupplierCard.module.css'
import BuyButton from './BuyButton'
import CrossButton from './CrossButton'
import EditButton from './EditButton'
import HideButton from './HideButton'
import ShowButton from './ShowButton'
import Poster from './Poster'
import { Fragment } from 'react'

export default function SupplierCard(props) {
  const { id, fullname, mobile, products, address, image, isHidden } = props

  return (
    <div
      className={styles.SupplierCard}
      style={{ backgroundColor: isHidden ? 'lightgray' : '#fafafa' }}
    >
      <Poster className={styles.poster} imageUrl={image} />

      <div className={styles.details}>
        <h1>{fullname}</h1>
        <p>
          <b>ID</b>&nbsp;&nbsp;{id}
        </p>
        <p>
          <b>Address</b>&nbsp;&nbsp;{address}
        </p>
        <p>
          <b>Mobile</b>&nbsp;&nbsp;{mobile}
        </p>

        {isHidden && <p>&nbsp;(Hidden to me)</p>}

        <p>
          <b>Produces</b>
        </p>
        <div className={styles.products}>
          {products.map((product) => (
            <Fragment key={product.id}>
              {product.varieties.map((variety) => (
                <div className={styles.variety}>
                  <Poster
                    className={styles.productPoster}
                    imageUrl={product.shortImage}
                  />
                  <span>
                    &nbsp;&nbsp;{product.name} from {variety.region}&nbsp;
                  </span>
                </div>
              ))}
            </Fragment>
          ))}
        </div>

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
