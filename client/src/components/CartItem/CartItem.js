import React from 'react';
import './CartItem.scss';

const CartItem = ({ item, removeFromCart, addQuantity, subQuantity }) => {
  return (
    <div className="cartItem">
      <div className="cartItem__image">
        <img src={item.image_thumb} alt={item.title} />
      </div>
      <div className="cartItem__body">
        <div className="cartItem__title">{item.title}</div>
        <div className="cartItem__meta">
          <div className="cartСontrol cartСontrol_cart">
            <button
              type="button"
              className="cartСontrol__btn"
              onClick={() => {
                item.quantity === 1
                  ? removeFromCart(item.id)
                  : subQuantity(item.id);
              }}
            >
              -
            </button>
            <div className="cartСontrol__count">{item.quantity}</div>
            <button
              type="button"
              className="cartСontrol__btn"
              onClick={() => addQuantity(item.id)}
            >
              +
            </button>
          </div>
          <div className="cartItem__price">
            <span className="cartItem__priceCurrency">$</span>
            <span className="cartItem_priceValue">
              {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
          <div className="cartItem__action">
            <button
              type="button"
              className="cartItem__btnRemove"
              onClick={() => removeFromCart(item.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
