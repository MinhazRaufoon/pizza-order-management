import NavCard from '../../components/NavCard'
import {
  getRecentOrderSummary,
  getIngredientsSummary,
  getSuppliersSummary,
} from '../../lib'
import styles from '../../styles/Baker.module.css'

export default function Baker(props) {
  const { recentOrderSummary, suppliersSummary, ingredientsSummary } = props
  console.log(recentOrderSummary)
  return (
    <section className={styles.Baker}>
      <NavCard
        className={styles.card}
        title="Recent orders"
        details={recentOrderSummary}
        actionLabel="View all orders"
        href="/baker/recent"
        poster="https://i.imgur.com/QCDFaom.jpg"
      />

      <NavCard
        className={styles.card}
        title="Pizza ingredients"
        details={ingredientsSummary}
        actionLabel="Manage Ingredients"
        href="/baker/ingredients"
        poster="https://i.imgur.com/0EJJlau.jpg"
      />

      <NavCard
        className={styles.card}
        title="Your suppliers"
        details={suppliersSummary}
        actionLabel="Manage your suppliers"
        href="/baker/suppliers"
        poster="https://i.imgur.com/sikmb8g.jpg"
      />
    </section>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      recentOrderSummary: await getRecentOrderSummary(),

      ingredientsSummary: await getIngredientsSummary(),

      suppliersSummary: await getSuppliersSummary(),
    },
  }
}
