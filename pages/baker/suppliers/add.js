import SupplierCard from '../../../components/SupplierCard'
import SupplierCardForAdd from '../../../components/SupplierCardForAdd'
import { makeGetRequest } from '../../../lib'
import styles from '../../../styles/SupplierAdditionForm.module.css'

export default function SupplierAdditionForm({ suppliers }) {
  return (
    <section className={styles.SupplierAdditionForm}>
      <div className={styles.filters}>
        <h1>Available suppliers for me</h1>
      </div>

      <div className={styles.supplierList}>
        {suppliers.map((supplier) => (
          <SupplierCardForAdd key={supplier.id} {...supplier} />
        ))}
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  const suppliers = await makeGetRequest('api/baker/suppliers/add')

  const productsList = await Promise.all(
    suppliers.map((supplier) => {
      return makeGetRequest(
        `api/baker/suppliers/products?supplierId=${supplier.id}`
      )
    })
  )

  return {
    props: {
      suppliers: suppliers.map((supplier, index) => ({
        ...supplier,
        products: productsList[index],
      })),
    },
  }
}
