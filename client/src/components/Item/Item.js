import React from 'react';
import './Item.scss';

const Item = ({ item, addToCart, removeFromCart, addQuantity, subQuantity }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="item">
        <div className="item__top">
          <div className="item__image">
            <figure>
              <img src={item.image} alt={item.title} />
            </figure>
          </div>
          <div className="item__title">{item.title}</div>
          <div className="item__description">{item.description}</div>
        </div>
        <div className="item__bottom">
          <div className="item__price">
            <span className="item__priceCurrency">$</span>
            <span className="item__priceValue">{item.price.toFixed(2)}</span>
          </div>
          <div className="item__action">
            {!item.selected ? (
              <button
                type="button"
                className="item__btn"
                onClick={() => addToCart(item.id)}
              >
                Add to cart
              </button>
            ) : (
              <div className="cartСontrol">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
