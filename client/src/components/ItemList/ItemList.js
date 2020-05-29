import React, { useEffect } from 'react';
import Item from '../Item/Item';
import { connect, useDispatch } from 'react-redux';
import {
  addItemToCart,
  removeItemFromCart,
  addItemQuantity,
  subItemQuantity,
  fetchItems,
} from '../../redux/actions';

const ItemList = ({
  items,
  loading,
  itemsLoaded,
  addToCart,
  removeFromCart,
  addQuantity,
  subQuantity,
}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    if(!itemsLoaded) {
      dispatch(fetchItems())
    }
  }, []);


  return (
    <div className="itemList">
      <div className="container">
        {!loading &&
          <div>
            <h1>Pizza</h1>
            <div className="row">
              {items.map((item) => (
                <Item
                  item={item}
                  key={item.id}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  addQuantity={addQuantity}
                  subQuantity={subQuantity}
                />
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    loading: state.loading,
    itemsLoaded: state.itemsLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addItemToCart(id)),
    removeFromCart: (id) => dispatch(removeItemFromCart(id)),
    addQuantity: (id) => dispatch(addItemQuantity(id)),
    subQuantity: (id) => dispatch(subItemQuantity(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
