import { useCallback, useState } from 'react'
import { makeGetRequest, makePostRequest } from '../../../../lib'
import styles from '../../../../styles/Restock.module.css'
import { useRouter } from 'next/router'

export default function Restock({ variety, suppliers }) {
  const [supplierId, setSupplierId] = useState(suppliers[0].id)
  const [amount, setRestockAmount] = useState(1)

  const { back } = useRouter()

  const restock = useCallback(async () => {
    const { success, message } = await makePostRequest(
      'api/baker/ingredients/restock',
      {
        supplierId,
        amount,
        varietyId: variety.id,
      }
    )
    if (success) {
      window.confirm('Restocking successful!')
      back()
      back()
    } else {
      window.alert(`Restock request denied! Reason: ${message}`)
    }
  }, [supplierId, amount])

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

          <select
            onChange={(e) => setSupplierId(e.target.value)}
            value={supplierId}
          >
            {suppliers.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Select amount:&nbsp;&nbsp;&nbsp;&nbsp;</label>

          <select
            value={amount}
            onChange={(e) => setRestockAmount(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        <button className={styles.restockButton} onClick={restock}>
          Restock
        </button>
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
