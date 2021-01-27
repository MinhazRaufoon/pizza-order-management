import { useCallback, useReducer } from 'react'

const INITIAL_STATE = {
  size: null,
  ingredientsMap: {},
  totalPrice: 0,
}

function reducePizzaOrder(state, action) {
  console.log(action.type)

  let newState = state

  switch (action.type) {
    case 'ACTION_SELECT_PIZZA_SIZE':
      newState = {
        ...state,
        size: action.size,
      }
      break

    case 'ACTION_SELECT_PIZZA_INGREDIENT':
      newState = {
        ...state,

        ingredientsMap: {
          ...state.ingredientsMap,
          [action.id]: true,
        },

        totalPrice: state.totalPrice + action.price,
      }
      break

    case 'ACTION_UNSELECT_PIZZA_INGREDIENT':
      newState = {
        ...state,
        totalPrice: state.totalPrice - action.price,
      }
      delete newState.ingredientsMap[action.id]
      break
  }

  console.log(newState)

  return newState
}

export default function usePizzaOrderForm() {
  const [state, dispatch] = useReducer(reducePizzaOrder, INITIAL_STATE)

  const selectPizzaSize = useCallback(
    (size) => {
      dispatch({
        type: 'ACTION_SELECT_PIZZA_SIZE',
        size,
      })
    },
    [dispatch]
  )

  const selectPizzaIngredient = useCallback(
    (id, price) => {
      dispatch({
        type: 'ACTION_SELECT_PIZZA_INGREDIENT',
        id,
        price,
      })
    },
    [dispatch]
  )

  const unselectPizzaIngredient = useCallback(
    (id, price) => {
      dispatch({
        type: 'ACTION_UNSELECT_PIZZA_INGREDIENT',
        id,
        price,
      })
    },
    [dispatch]
  )

  const isIngredientSelected = useCallback(
    (id) => {
      return state.ingredientsMap[id]
    },
    [state]
  )

  const getCurrentPizzaSize = useCallback(() => {
    return state.size
  }, [state])

  const getOrderSummary = useCallback(() => {
    const { size, totalPrice, ingredientsMap } = state
    const totalIngredientsSelected = Object.keys(ingredientsMap).length
    if (!size || totalIngredientsSelected === 0) {
      return false
    }
    const ingredientsInfo = Object.keys(ingredientsMap).join(' + ')
    return `You will have a ${size}" pizza with ${ingredientsInfo}. Overall it costs ${totalPrice} €.`
  }, [state])

  const getTotalCost = useCallback(() => {
    return state.totalPrice
  }, [state])

  return {
    getOrderSummary,
    getTotalCost,
    getCurrentPizzaSize,
    isIngredientSelected,
    selectPizzaSize,
    selectPizzaIngredient,
    unselectPizzaIngredient,
  }
}
