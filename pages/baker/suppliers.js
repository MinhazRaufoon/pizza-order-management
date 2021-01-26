import SupplierCard from '../../components/SupplierCard'
import { makeGetRequest } from '../../lib'
import styles from '../../styles/Suppliers.module.css'

export default function Suppliers({ suppliers }) {
  return (
    <section className={styles.Suppliers}>
      <div className={styles.filters}></div>

      <div className={styles.supplierList}>
        {suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} {...supplier} />
        ))}
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      suppliers: await makeGetRequest('api/suppliers'),
    },
  }
}
