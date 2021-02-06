import BakerIngredient from '../../../components/BakerIngredient'
import { makeGetRequest } from '../../../lib'
import styles from '../../../styles/Ingredients.module.css'

export default function Ingredients({ ingredients }) {
  return (
    <section className={styles.Ingredients}>
      <div className={styles.filters}></div>

      <div className={styles.ingredientsList}>
        {ingredients.map((ingredient) => (
          <BakerIngredient key={ingredient.name} {...ingredient} />
        ))}
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      ingredients: await makeGetRequest('api/baker/ingredients'),
    },
  }
}
