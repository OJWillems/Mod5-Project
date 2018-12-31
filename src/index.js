import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Redux imports:
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'semantic-ui-css/semantic.min.css'


let store = createStore(reducer, composeWithDevTools())

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path ="/" component={App} />
      </Switch>
    </Router>
  </Provider>

  ), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
