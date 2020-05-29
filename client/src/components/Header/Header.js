import React from 'react';
import { Link   } from 'react-router-dom';
import './Header.scss';
import { connect } from 'react-redux';

const Header = ({ cartCount }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrap">
          <div className="header__logo">
            <Link to="/" className="header__logoLink">
              🍕 Pizza task
            </Link>
          </div>
          <div className="header__cart">
            <Link to="/cart" className="header__cartLink">
              <span>My order</span>
              {cartCount > 0 && (
                <span className="header__cartShow">
                  <span className="header__cartLinkLine"></span>
                  <span className="header__cartLinkCount">{cartCount}</span>
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    cartCount: state.cartCount,
  };
};

export default connect(mapStateToProps, null)(Header);
