import styles from '../styles/SupplierCard.module.css'
import Poster from './Poster'
import { Fragment, useCallback } from 'react'
import { makePostRequest } from '../lib'

export default function SupplierCardForAdd(props) {
  const { id, name, products, image } = props

  const addSupplier = useCallback(async () => {
    const { success, message } = await makePostRequest(
      'api/baker/suppliers/add',
      {
        bakerId: '666666',
        supplierId: id,
      }
    )
    if (success) {
      window.confirm('Successfully added')
    } else {
      window.confirm('Failed!!! Reason: ' + message)
    }

    window.location.reload()
  }, [id])

  return (
    <div className={styles.SupplierCard}>
      <Poster className={styles.poster} imageUrl={image} />

      <div className={styles.details}>
        <h1>
          {id} - {name}
        </h1>
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

        <button
          onClick={addSupplier}
          style={{
            backgroundColor: 'crimson',
            color: 'white',
            fontWeight: 'bold',
            padding: '0.5rem',
            width: '100px',
            fontSize: '1rem',
          }}
        >
          Add
        </button>
      </div>
    </div>
  )
}
