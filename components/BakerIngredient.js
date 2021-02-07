import styles from '../styles/BakerIngredient.module.css'
import BuyButton from './BuyButton'
import CrossButton from './CrossButton'
import HideButton from './HideButton'
import ShowButton from './ShowButton'
import Poster from './Poster'
import { useCallback } from 'react'
import Link from 'next/link'
import { makePostRequest } from '../lib'

export function toggleIngredientVisibility(bakerId, ingredientVarietyId) {
  return makePostRequest('api/baker/ingredients/hide-or-show', {
    bakerId,
    ingredientVarietyId,
  })
}

export default function BakerIngredient(props) {
  const { name, image, shortImage, varieties } = props

  const hideOrShow = useCallback(
    async (varietyId, region, isHidden) => {
      await toggleIngredientVisibility('666666', varietyId)
      if (
        window.confirm(
          `${name} from ${region} is made ${isHidden ? 'visible' : 'hidden'}`
        )
      ) {
        window.location.reload()
      }
    },
    [name]
  )

  const deleteIngredientVariety = useCallback(
    async (bakerId, varietyId, region) => {
      if (window.confirm(`${name} from ${region} will be deleted. Continue?`)) {
        const { success } = await makePostRequest(
          'api/baker/ingredients/delete',
          {
            bakerId,
            varietyId,
          }
        )
        if (success) {
          window.alert(`Successfully deleted ${name} from ${region}`)
        } else {
          window.alert(`Failed to delete ${name} from ${region}`)
        }
        window.location.reload()
      }
    },
    [name]
  )

  return (
    <div className={styles.BakerIngredient}>
      <Poster className={styles.poster} imageUrl={image} />

      <div className={styles.details}>
        <h1>{name}</h1>

        <div className={styles.models}>
          {varieties.map(({ id, region, amount, price, isHidden }) => (
            <div key={region} className={styles.modelInfo}>
              <Poster className={styles.modelPoster} imageUrl={shortImage} />

              <b>
                From {region}
                {isHidden && <i style={{ color: 'blue' }}>&nbsp;(Hidden)</i>}
              </b>

              {amount > 0 && <label>Amount: {amount}</label>}

              {amount === 0 && <b style={{ color: 'red' }}>Out of stock</b>}

              <label>Price: {price} €</label>
              <br />

              <div className={styles.buttons}>
                {amount === 0 && (
                  <Link href={`ingredients/restock/${id}`}>
                    <BuyButton />
                  </Link>
                )}

                {isHidden ? (
                  <ShowButton
                    onClick={() => hideOrShow(id, region, isHidden)}
                  />
                ) : (
                  <HideButton
                    onClick={() => hideOrShow(id, region, isHidden)}
                  />
                )}

                <CrossButton
                  onClick={() => deleteIngredientVariety('666666', id, region)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
