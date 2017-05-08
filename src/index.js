
require('antd/dist/antd.less');
require('bootstrap/less/bootstrap.less');


require('./styles/less/index.less');
require('bootstrap/dist/js/npm');


import 'core-js/fn/object/assign';
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, hashHistory  } from 'react-router';
// import logger from 'bragi-browser';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import reducers from './reducers/index';
import sagas from './sagas/index';
import routes from './routes.jsx';
import global from './common/global';


//////////////////////
// Store

const middlewares = [createSagaMiddleware(sagas)];

//FIXME for test
if (module.hot) {
  const createLogger = require(`redux-logger`);
  const logger = createLogger();
  middlewares.push(logger);
}

const initialState = {};
const enhancer = compose(
  applyMiddleware(...middlewares)
);

const store = createStore(combineReducers({
  ...reducers, routing
}), initialState, enhancer);

global.store = store;

//////////////////////
// Render
const history = syncHistoryWithStore(hashHistory, store);

const rootEl =document.getElementById('app');

window.$=$;
ReactDom.render( 
    <Provider store={store}>
      <Router routes={routes} history={history}/>
    </Provider>
     , rootEl);
