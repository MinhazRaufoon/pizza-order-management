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

  const getTotalCost = useCallback(() => {
    return state.totalPrice
  }, [state])

  const getPizzaSize = useCallback(() => {
    return state.size
  }, [state])

  return {
    getPizzaSize,
    getTotalCost,
    getCurrentPizzaSize,
    isIngredientSelected,
    selectPizzaSize,
    selectPizzaIngredient,
    unselectPizzaIngredient,
  }
}
