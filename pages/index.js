import Head from 'next/head'
import styles from '../styles/Home.module.css'
import RolePicker from '../components/RolePicker'

export default function Home() {
  return (
    <section className={styles.Home}>
      <Head>
        <title>Pizza Order Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RolePicker
        title="Pizza Baker"
        href="/baker"
        backgroundImage="https://i.imgur.com/1JfJjbJ.png"
      />

      <RolePicker
        title="Pizza Buyer"
        href="/customer"
        backgroundImage="https://i.imgur.com/RhttbuZ.png"
      />
    </section>
  )
}
