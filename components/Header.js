import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const { pathname } = useRouter()

  return (
    <div className={styles.Header}>
      <Link href="/">
        <h2>Pizza Management</h2>
      </Link>

      {pathname.indexOf('/baker') !== -1 && (
        <>
          <Link href="/baker">
            <h2>&nbsp;&nbsp;&gt;&nbsp;Baker</h2>
          </Link>

          {pathname.indexOf('/recent') !== -1 && (
            <h2>&nbsp;&nbsp;&gt;&nbsp;Recent orders</h2>
          )}

          {pathname.indexOf('/ingredients') !== -1 && (
            <h2>
              &nbsp;&nbsp;&gt;&nbsp;My Ingredients
              {pathname.indexOf('/restock') !== -1 && (
                <>&nbsp;::&nbsp;Restock</>
              )}
            </h2>
          )}

          {pathname.indexOf('/suppliers') !== -1 && (
            <h2>
              &nbsp;&nbsp;&gt;&nbsp;My Suppliers
              {pathname.indexOf('/add') !== -1 && <>&nbsp;::&nbsp;Add New</>}
            </h2>
          )}
        </>
      )}

      {pathname.indexOf('/customer') !== -1 && (
        <Link href="/customer">
          <h2>&nbsp;&nbsp;&gt;&nbsp;Customer</h2>
        </Link>
      )}
    </div>
  )
}
