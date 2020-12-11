import React, { useEffect } from 'react';
import './App.css';
import Header from './Header'
import Home from './Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';

import { auth } from "./firebase"
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_51HQx30A6EAxeVbIrS6T8LuaPbNP4gCY3LRfCobQa2txZpvJtNN6XqGqpdHLx7X0eszTGMx30GptQ5GTT17VwubL200c91fjYov');

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    // will run once only when app component loads...

    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>>', authUser);

      if (authUser) {
        //the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user in logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>

        </Switch>

      </div>
    </Router>
  );
}

export default App;
