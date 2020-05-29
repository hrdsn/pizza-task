import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/actions';
import './Order.scss';

const Order = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <div className="order">
      <div className="container">
        <h1>Order</h1>
        <h2>Success! Thank you! Great to see you here 😉 🚀</h2>
        <Link to="/" className="order__btnBack">
          Back to menu
        </Link>
      </div>
    </div>
  );
};

export default Order;
