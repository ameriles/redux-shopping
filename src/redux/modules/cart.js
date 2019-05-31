// action types
const ADD_TO_CART = 'cart/ADD_TO_CART'

// initial state
const initialState = {
  items: []
}

// reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.product]
      }
    default:
      return state
  }
}

// action creators
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product
})

