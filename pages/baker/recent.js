import { Fragment } from 'react'
import { makeGetRequest } from '../../lib'
import styles from '../../styles/RecentOrders.module.css'

export default function RecentOrders({ orders }) {
  return (
    <section className={styles.RecentOrders}>
      <div className={styles.filters}>
        <h1>Order History of All Time</h1>
      </div>
      <div className={styles.table}>
        <b>Order No.</b>
        <b>Date</b>
        <b>Description</b>
        <b>Address</b>
        <b>Phone</b>
        <b>Status</b>

        {orders.map((order) => {
          const {
            orderNo,
            pizzaDescription,
            deliveryAddress,
            mobile,
            hasDelivered,
            datetime,
          } = order
          return (
            <Fragment key={orderNo}>
              <span>{orderNo}</span>
              <span>{new Date(datetime).toLocaleString()}</span>
              <span>{pizzaDescription}</span>
              <span>{deliveryAddress}</span>
              <span>{mobile}</span>
              <span>{hasDelivered ? 'Delivered' : 'Not delivered'}</span>
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
      orders: await makeGetRequest('api/baker/recent-orders?bakerid=666666'),
    },
  }
}
