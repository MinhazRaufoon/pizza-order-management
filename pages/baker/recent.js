import { Fragment } from 'react'
import { getRecentOrders } from '../../lib'
import styles from '../../styles/RecentOrders.module.css'

export default function RecentOrders({ orders }) {
  return (
    <section className={styles.RecentOrders}>
      <div className={styles.filters}>
        <h1>Add filters here for query demonstration</h1>
      </div>
      <div className={styles.table}>
        <b>SL</b>
        <b>Order No.</b>
        <b>Ingredients</b>
        <b>Size</b>
        <b>Address</b>
        <b>Phone</b>
        <b>Status</b>

        {orders.map((order, index) => {
          const { id, ingredients, size, address, phone, status } = order
          return (
            <Fragment key={id}>
              <span>{index}</span>
              <span>{id}</span>
              <span>{ingredients}</span>
              <span>{size}</span>
              <span>{address}</span>
              <span>{phone}</span>
              <span>{status ? 'Delivered' : 'Not delivered'}</span>
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      orders: await getRecentOrders(),
    },
  }
}
