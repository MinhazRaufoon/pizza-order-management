import style from '../styles/RolePicker.module.css'
import Link from 'next/link'

export default function RolePicker({ title, backgroundImage, href }) {
  return (
    <Link href={href}>
      <a
        className={style.RolePicker}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1>{title}</h1>
      </a>
    </Link>
  )
}
