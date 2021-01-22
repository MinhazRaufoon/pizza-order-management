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
        <h1>Pizza Management</h1>
      </Link>

      {isBakerProfile && (
        <Link href="/baker">
          <h1>&nbsp;&nbsp;&gt;&nbsp;Baker</h1>
        </Link>
      )}

      {isCustomerProfile && (
        <Link href="/customer">
          <h1>&nbsp;&nbsp;&gt;&nbsp;Customer</h1>
        </Link>
      )}
    </div>
  )
}
