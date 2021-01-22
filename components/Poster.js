import styles from '../styles/Poster.module.css'

export default function Poster({ imageUrl, className }) {
  return (
    <div
      className={`${styles.Poster} ${className}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      &nbsp;
    </div>
  )
}
