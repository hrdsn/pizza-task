import * as types from './types';

// items
export function fetchItems() {
  return (dispatch) => {
    dispatch(fetchItemsBegin());
    return fetch('http://localhost:5000/items')
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchItemsSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchItemsFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchItemsBegin = () => ({
  type: types.FETCH_ITEMS_BEGIN,
});

export const fetchItemsSuccess = (items) => ({
  type: types.FETCH_ITEMS_SUCCESS,
  payload: { items },
});

export const fetchItemsFailure = (error) => ({
  type: types.FETCH_ITEMS_FAILURE,
  payload: { error },
});

// cart actions
export const addItemToCart = (id) => {
  return {
    type: types.ADD_TO_CART,
    payload: id,
  };
};

export const removeItemFromCart = (item) => {
  return {
    type: types.REMOVE_FROM_CART,
    payload: item,
  };
};

export const addItemQuantity = (id) => {
  return {
    type: types.ADD_QUANTITY,
    payload: id,
  };
};

export const subItemQuantity = (id) => {
  return {
    type: types.SUB_QUANTITY,
    payload: id,
  };
};

export const clearCart = () => {
  return {
    type: types.CLEAR_CART,
  };
};
