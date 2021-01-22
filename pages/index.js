import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import RolePicker from '../components/RolePicker'

export default function Home() {
  return (
    <section className={styles.Home}>
      <Head>
        <title>Pizza Order Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/baker">
        <RolePicker title="Pizza Baker" backgroundImage="/images/baker.png" />
      </Link>

      <Link href="/customer">
        <RolePicker
          title="Pizza Buyer"
          backgroundImage="/images/customer.png"
        />
      </Link>
    </section>
  )
}
