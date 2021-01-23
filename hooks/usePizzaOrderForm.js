import { useCallback, useReducer } from 'react'

const INITIAL_STATE = {
  size: null,
  ingredientMap: {},
  totalPrice: 0,
}

function reducePizzaOrder(state, action) {
  switch (action.type) {
    case 'ACTION_SELECT_PIZZA_SIZE':
      return {
        ...state,
        size: action.size,
      }

    case 'ACTION_SELECT_PIZZA_INGREDIENT':
      return {
        ...state,

        ingredientsMap: {
          ...state.ingredientMap,
          [action.name + action.rp ? action.rp : '']: true,
        },

        totalPrice: state.totalPrice + action.price,
      }

    case 'ACTION_UNSELECT_PIZZA_INGREDIENT':
      return {
        ...state,

        ingredientsMap: {
          ...state.ingredientMap,
          [action.name + action.rp ? action.rp : '']: false,
        },

        totalPrice: state.totalPrice - action.price,
      }
  }
  return state
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
    (name, rp, price) => {
      dispatch({
        type: 'ACTION_SELECT_PIZZA_INGREDIENT',
        name,
        rp,
        price,
      })
    },
    [dispatch]
  )

  const unselectPizzaIngredient = useCallback(
    (name, rp, price) => {
      dispatch({
        type: 'ACTION_UNSELECT_PIZZA_INGREDIENT',
        name,
        rp,
        price,
      })
    },
    [dispatch]
  )

  const isIngredientSelected = useCallback(
    (name, rp) => {
      return state.ingredientMap[name + rp ? rp : '']
    },
    [state]
  )

  const getCurrentPizzaSize = useCallback(() => {
    return state.size
  }, [state])

  return {
    getCurrentPizzaSize,
    isIngredientSelected,
    selectPizzaSize,
    selectPizzaIngredient,
    unselectPizzaIngredient,
  }
}
