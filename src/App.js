import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Security, SecureRoute, ImplicitCallback} from '@okta/okta-react';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Staff from './components/pages/Staff';
import Login from './components/auth/Login';

import './App.css';

function onAuthRequired({history}) {
  history.push ('/login');
}

const API_KEY = process.env.REACT_APP_OKTA_API_KEY;
const OKTA_URL = process.env.REACT_APP_OKTA_URL;

class App extends Component {
  render () {
    return (
      <Router>
        <Security
          issuer={OKTA_URL + "/oauth2/default"}
          clientId={API_KEY}
          redirectUri={window.location.origin + '/implicit/callback'}
          onAuthRequired={onAuthRequired}
          //pkce={true}
        >
          <div className="App">
            <Navbar />
            <div className="container">
              <Route path="/" exact={true} component={Home} />
              <SecureRoute path="/staff" exact={true} component={Staff} />
              <Route
                path="/login"
                render={() => <Login baseUrl={OKTA_URL} />}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;
