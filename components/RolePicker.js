import style from '../styles/RolePicker.module.css'

export default function RolePicker({ title, backgroundImage }) {
  return (
    <div
      className={style.RolePicker}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1>{title}</h1>
    </div>
  )
}
