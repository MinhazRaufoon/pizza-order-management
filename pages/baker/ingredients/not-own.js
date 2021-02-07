import IngredientToAdd from '../../../components/IngredientToAdd'
import { makeGetRequest } from '../../../lib'
import styles from '../../../styles/NotOwnIngredients.module.css'

export default function NotOwnIngredients({ ingredients }) {
  return (
    <section className={styles.NotOwnIngredients}>
      {ingredients.map((ingredient) => {
        return <IngredientToAdd key={ingredient.id} {...ingredient} />
      })}
    </section>
  )
}

export async function getServerSideProps(context) {
  const ingredients = await makeGetRequest(
    'api/baker/ingredients/not-own?bakerid=666666'
  )
  return {
    props: {
      ingredients,
    },
  }
}
