import * as types from './types';

const initialState = {
  /*
  items: [
    {
      id: '1',
      title: 'Pepperoni Fresh with tomatoes',
      description: 'Spicy pepperoni, tomato sauce, mozzarella, tomatoes',
      image: '/img/01_292x292.jpeg',
      image_thumb: '/img/01_146x146.jpeg',
      price: 9.0,
      quantity: 1,
      selected: false,
    },
    {
      id: '2',
      title: 'Spanish chorizo sausages',
      description: 'Spicy chorizo, mozzarella, tomatoes, chipotle sauce',
      image: '/img/02_292x292.jpeg',
      image_thumb: '/img/02_146x146.jpeg',
      price: 13.5,
      quantity: 1,
      selected: false,
    },
    {
      id: '3',
      title: 'Cheesy',
      description: 'Tomato sauce, mozzarella',
      image: '/img/03_292x292.jpeg',
      image_thumb: '/img/03_146x146.jpeg',
      price: 9.0,
      quantity: 1,
      selected: false,
    },
    {
      id: '4',
      title: 'Ham and cheese',
      description: 'Ham, mozzarella, cream sauce',
      image: '/img/04_292x292.jpeg',
      image_thumb: '/img/04_146x146.jpeg',
      price: 11.0,
      quantity: 1,
      selected: false,
    },
    {
      id: '5',
      title: 'Sweet and sour chicken',
      description: 'Chicken, tomato sauce, mozzarella, sweet and sour sauce',
      image: '/img/05_292x292.jpeg',
      image_thumb: '/img/05_146x146.jpeg',
      price: 11.0,
      quantity: 1,
      selected: false,
    },
    {
      id: '6',
      title: 'Cheeseburger pizza',
      description:
        'Meat sauce Bolognese, mozzarella, red onion, pickles, tomatoes, Burger sauce',
      image: '/img/06_292x292.jpeg',
      image_thumb: '/img/06_146x146.jpeg',
      price: 13.0,
      quantity: 1,
      selected: false,
    },
    {
      id: '7',
      title: 'Crazy pepperoni',
      description:
        'Chicken, spicy pepperoni, tomato sauce, mozzarella, sweet and sour sauce',
      image: '/img/07_292x292.jpeg',
      image_thumb: '/img/07_146x146.jpeg',
      price: 13.0,
      quantity: 1,
      selected: false,
    },
    {
      id: '8',
      title: 'Asian shrimp',
      description:
        'Mushrooms, mozzarella, prawns, sweet and sour sauce, black sesame',
      image: '/img/08_292x292.jpeg',
      image_thumb: '/img/08_146x146.jpeg',
      price: 13.0,
      quantity: 1,
      selected: false,
    },
    {
      id: '9',
      title: 'Pepperoni',
      description: 'Spicy pepperoni, tomato sauce, mozzarella',
      image: '/img/09_292x292.jpeg',
      image_thumb: '/img/09_146x146.jpeg',
      price: 13.0,
      quantity: 1,
      selected: false,
    },
    {
      id: '10',
      title: 'Four cheeses',
      description:
        'Cheese blue cheese, mozzarella cheese, mixture of cheddar and Parmesan, cream sauce',
      image: '/img/10_292x292.jpeg',
      image_thumb: '/img/10_146x146.jpeg',
      price: 14.0,
      quantity: 1,
      selected: false,
    },
    {
      id: '11',
      title: 'Margarita',
      description: 'Italian herbs, tomato sauce, mozzarella, tomatoes',
      image: '/img/11_292x292.jpeg',
      image_thumb: '/img/11_146x146.jpeg',
      price: 13.5,
      quantity: 1,
      selected: false,
    },
    {
      id: '12',
      title: 'Meaty',
      description:
        'Chicken, ham, spicy pepperoni, tomato sauce, spicy chorizo, mozzarella',
      image: '/img/12_292x292.jpeg',
      image_thumb: '/img/12_146x146.jpeg',
      price: 14.0,
      quantity: 1,
      selected: false,
    },
  ],
  */
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

