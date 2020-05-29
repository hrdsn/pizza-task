import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ItemList from './components/ItemList/ItemList';
import Cart from './components//Cart/Cart';
import Order from './components/Order/Order';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="container">
          <Switch>
            <Route exact path="/" component={ItemList} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/order" component={Order} />
          </Switch>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
