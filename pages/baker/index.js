import NavCard from '../../components/NavCard'
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
        href="/recent"
        poster="/images/recent-orders-nav-card.jpg"
      />

      <NavCard
        className={styles.card}
        title="Pizza ingredients"
        details={ingredientsSummary}
        actionLabel="Manage Ingredients"
        href="/ingredients"
        poster="/images/ingredients-nav-card.jpg"
      />

      <NavCard
        className={styles.card}
        title="Your suppliers"
        details={suppliersSummary}
        actionLabel="Manage your suppliers"
        href="/suppliers"
        poster="/images/supplier-nav-card.jpg"
      />
    </section>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      recentOrderSummary: [
        {
          type: 'Total orders',
          value: 30,
        },
        {
          type: 'Total delivered',
          value: 10,
        },
      ],

      ingredientsSummary: [
        {
          type: 'Total ingredients',
          value: 30,
        },
        {
          type: 'Total hidden',
          value: 10,
        },
      ],

      suppliersSummary: [
        {
          type: 'Total suppliers',
          value: 30,
        },
        {
          type: 'Suppliers hidden',
          value: 10,
        },
      ],
    },
  }
}
