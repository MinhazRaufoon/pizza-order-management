import styles from '../styles/SupplierCard.module.css'
import CrossButton from './CrossButton'
import EditButton from './EditButton'
import HideButton from './HideButton'
import ShowButton from './ShowButton'
import Poster from './Poster'
import { Fragment, useCallback } from 'react'
import { makePostRequest } from '../lib'

export function toggleSupplierVisibility(bakerId, supplierId) {
  return makePostRequest('api/baker/suppliers/hide-or-show', {
    bakerId,
    supplierId,
  })
}

export default function SupplierCard(props) {
  const { id, name, mobile, products, address, image, isHidden } = props

  const hideOrShow = useCallback(async () => {
    await toggleSupplierVisibility('666666', id)
    if (window.confirm(`${name} is made ${isHidden ? 'visible' : 'hidden'}`)) {
      window.location.reload()
    }
  }, [id, name, isHidden])

  return (
    <div
      className={styles.SupplierCard}
      style={{
        backgroundColor: isHidden ? 'lightgray' : '#fafafa',
        color: isHidden ? 'gray' : 'inherit',
      }}
    >
      <Poster className={styles.poster} imageUrl={image} />

      <div className={styles.details}>
        <h1>
          {id} - {name}
        </h1>
        <p>
          <b>Contact:</b>
          &nbsp;&nbsp;{address}
          &nbsp;&nbsp;({mobile})
        </p>

        {isHidden && <p style={{ color: 'red' }}>&nbsp;(Hidden to me)</p>}

        <p>
          <b>Produces:</b>
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
          {isHidden ? (
            <ShowButton onClick={hideOrShow} />
          ) : (
            <HideButton onClick={hideOrShow} />
          )}
          <EditButton />
          <CrossButton />
        </div>
      </div>
    </div>
  )
}
