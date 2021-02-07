import { useCallback } from 'react'
import { makePostRequest } from '../lib'
import styles from '../styles/IngredientToAdd.module.css'
import Poster from './Poster'

export default function IngredientToAdd({ id, name, price, region, image }) {
  const add = useCallback(async () => {
    const { success } = await makePostRequest('api/baker/ingredients/add', {
      bakerId: '666666',
      varietyId: id,
    })
    if (success) {
      window.confirm(`Successfully added ${name} from ${region}`)
    } else {
      window.confirm(`Failed to add ${name} from ${region}`)
    }
    window.location.reload()
  }, [id])

  return (
    <div className={styles.IngredientToAdd}>
      <Poster className={styles.thumb} imageUrl={image} />
      <h4>
        {name} from {region}
      </h4>
      <h4>{price} €</h4>
      <button onClick={add}>Add</button>
    </div>
  )
}
