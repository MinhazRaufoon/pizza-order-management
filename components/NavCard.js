import styles from '../styles/NavCard.module.css'
import Link from 'next/link'
import Poster from './Poster'

export default function NavCard(props) {
  const { className, title, details, poster, actionLabel, href } = props

  return (
    <div className={`${styles.NavCard} ${className}`}>
      <Poster className={styles.poster} imageUrl={poster} />
      <div className={styles.content}>
        <h1>{title}</h1>

        {details.map((detail) => (
          <label key={detail.type}>
            {detail.type}: {detail.value}
          </label>
        ))}

        <Link href={href}>
          <a>{actionLabel}</a>
        </Link>
      </div>
    </div>
  )
}
