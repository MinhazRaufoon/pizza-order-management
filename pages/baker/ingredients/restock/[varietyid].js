import { useState } from 'react'
import { makeGetRequest } from '../../../../lib'
import styles from '../../../../styles/Restock.module.css'

export default function Restock({ variety, suppliers }) {
  const [supplierId, setSupplierId] = useState(suppliers[0].id)
  const [amount, setRestockAmount] = useState(1)

  return (
    <section className={styles.Restock}>
      <div className={styles.content}>
        <h1>
          Restock {variety.name} from {variety.region} ?
        </h1>

        <h5 style={{ textAlign: 'center' }}>
          <i>Each item costs {variety.price} €</i>
        </h5>

        <br />

        <div className={styles.field}>
          <label>Select a supplier:&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <select>
            {suppliers.map(({ id, name }) => (
              <option key={id} value={id} value={supplierId}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Select amount:&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <select value={amount}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        <button className={styles.restockButton}>Restock</button>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  const { varietyid } = context.query

  const variety = await makeGetRequest(
    `api/baker/ingredients/details-of?varietyid=${varietyid}`
  )

  const suppliers = await makeGetRequest(
    `api/baker/ingredients/suppliers-of?varietyid=${varietyid}`
  )

  return {
    props: {
      variety,
      suppliers,
    },
  }
}
