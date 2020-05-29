import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.scss';
import CartItem from '../CartItem/CartItem';
import { connect } from 'react-redux';
import {
  removeItemFromCart,
  addItemQuantity,
  subItemQuantity,
} from '../../redux/actions';

const Cart = ({ total, cart, removeFromCart, addQuantity, subQuantity }) => {
  return (
    <div className="cart">
      <div className="container">
        <div className="cart__wrap">
          <h1>My order</h1>
          <div className="cart__list">
            {cart.map((item) => (
              <CartItem
                item={item}
                key={item.id}
                removeFromCart={removeFromCart}
                addQuantity={addQuantity}
                subQuantity={subQuantity}
              />
            ))}
          </div>
          <div className="cart__total">
            <span className="cart__totalTitle">Total: </span>
            <span className="cart__totalPrice">
              <span className="cart__totalPriceCurrency">$</span>
              <span className="cart__totalPriceValue">{total.toFixed(2)}</span>
            </span>
          </div>
          <div className="cart__actions">
            <Link to="/" className="cart__btnBack">
              Back to menu
            </Link>
            {total > 0 ? (
              <Link to="/order" className="cart__btnOrder">
                Order
              </Link>
            ) : (
              <button className="cart__btnOrder" disabled>
                Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    total: state.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) => dispatch(removeItemFromCart(id)),
    addQuantity: (id) => dispatch(addItemQuantity(id)),
    subQuantity: (id) => dispatch(subItemQuantity(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
