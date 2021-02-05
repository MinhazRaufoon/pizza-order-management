import { useMemo } from 'react'
import SupplierCard from '../../components/SupplierCard'
import { makeGetRequest } from '../../lib'
import styles from '../../styles/Suppliers.module.css'

export default function Suppliers({ suppliers }) {
  const hiddenCount = useMemo(() => {
    return suppliers.reduce(
      (total, supplier) => total + (supplier.isHidden ? 1 : 0),
      0
    )
  }, [suppliers])

  return (
    <section className={styles.Suppliers}>
      <div className={styles.filters}>
        <h1>Here are my ingredient suppliers</h1>
        <h3>
          Total ({suppliers.length}), Hidden ({hiddenCount})
        </h3>
      </div>

      <div className={styles.supplierList}>
        {suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} {...supplier} />
        ))}
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  const suppliers = await makeGetRequest('api/baker/suppliers')

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
