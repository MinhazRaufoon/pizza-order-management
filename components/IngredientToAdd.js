import styles from '../styles/IngredientToAdd.module.css'
import Poster from './Poster'

export default function IngredientToAdd({ id, name, price, region, image }) {
  return (
    <div className={styles.IngredientToAdd}>
      <Poster className={styles.thumb} imageUrl={image} />
      <h4>
        {name} from {region}
      </h4>
      <h4>{price} €</h4>
      <button>Add</button>
    </div>
  )
}
