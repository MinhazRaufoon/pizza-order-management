import styles from '../styles/Header.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <div className={styles.Header}>
      <Link href="/">
        <h1>Pizza Management</h1>
      </Link>
    </div>
  )
}
