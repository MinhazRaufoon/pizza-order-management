import BakerIngredient from '../../components/BakerIngredient'
import { getIngredients } from '../../lib'
import styles from '../../styles/Ingredients.module.css'

export default function Ingredients({ ingredients }) {
  return (
    <section className={styles.Ingredients}>
      <div className={styles.filters}>
        <h1>Your filters here</h1>
      </div>

      <div className={styles.ingredientsList}>
        {ingredients.map((ingredient) => (
          <BakerIngredient key={ingredient.name} {...ingredient} />
        ))}
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  const ingredients = await getIngredients()
  return {
    props: {
      ingredients,
    },
  }
}
