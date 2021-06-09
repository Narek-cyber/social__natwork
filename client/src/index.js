import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootState from '../src/redux/reducers/root';

const thunkMiddleware = require("redux-thunk").default;

// const asyncDispatchMiddleware = store => next => action => {
//   let syncActivityFinished = false;
//   let actionQueue = [];

//   function flushQueue() {
//     actionQueue.forEach(a => store.dispatch(a)); // flush queue
//     actionQueue = [];
//   }

//   function asyncDispatch(asyncAction) {
//     actionQueue = actionQueue.concat([asyncAction]);

//     if (syncActivityFinished) {
//       flushQueue();
//     }
//   }

//   const actionWithAsyncDispatch =
//       Object.assign({}, action, { asyncDispatch });

//   next(actionWithAsyncDispatch);
//   syncActivityFinished = true;
//   flushQueue();
// };
let store = createStore(rootState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
