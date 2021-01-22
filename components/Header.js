import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const { pathname } = useRouter()

  const isBakerProfile = pathname.indexOf('/baker') !== -1

  const isCustomerProfile = pathname.indexOf('/customer') !== -1

  return (
    <div className={styles.Header}>
      <Link href="/">
        <h2>Pizza Management</h2>
      </Link>

      {isBakerProfile && (
        <Link href="/baker">
          <h2>&nbsp;&nbsp;&gt;&nbsp;Baker</h2>
        </Link>
      )}

      {isCustomerProfile && (
        <Link href="/customer">
          <h2>&nbsp;&nbsp;&gt;&nbsp;Customer</h2>
        </Link>
      )}
    </div>
  )
}
