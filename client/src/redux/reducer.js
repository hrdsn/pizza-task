import * as types from './types';

const initialState = {
  items: [],
  loading: false,
  error: null,
  cart: [],
  cartCount: 0,
  total: 0,
  itemsLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ITEMS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        itemsLoaded: true,
      };

    case types.FETCH_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };

    case types.ADD_TO_CART:
      const findAddItem = state.items.find(
        (item) => item.id === action.payload
      );
      const isInCart = state.cart.find((item) => item.id === action.payload);
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, selected: true } : item
        ),
        cart: !isInCart
          ? state.cart.concat(findAddItem)
          : state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
        cartCount: state.cartCount + 1,
        total: state.total + findAddItem.price,
      };

    case types.ADD_QUANTITY:
      const findAddQuantityItem = state.items.find(
        (item) => item.id === action.payload
      );
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        cartCount: state.cartCount + 1,
        total: state.total + findAddQuantityItem.price,
      };

    case types.SUB_QUANTITY:
      const findSubQuantityItem = state.items.find(
        (item) => item.id === action.payload
      );
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity !== 1 ? item.quantity - 1 : 1,
              }
            : item
        ),
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        cartCount: state.cartCount - 1,
        total: state.total - findSubQuantityItem.price,
      };

    case types.REMOVE_FROM_CART:
      const findRemoveItem = state.items.find(
        (item) => item.id === action.payload
      );
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: 1, selected: false }
            : item
        ),
        cartCount: state.cartCount - findRemoveItem.quantity,
        total: state.total - findRemoveItem.price * findRemoveItem.quantity,
      };
    case types.CLEAR_CART:
      return {
        ...state,
        items: [],
        cart: [],
        cartCount: 0,
        total: 0,
        itemsLoaded: false,
      };
    default:
      return state;
  }
};

export default reducer;

