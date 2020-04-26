import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {createStore, applyMiddleware,compose,combineReducers} from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk';
import createSagaMiddleWare from 'redux-saga';
import {watchAuth,watchBurgerBuilder,watchOrder} from './store/sagas/index'
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

const composeEnhancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;

const sagaMiddleware = createSagaMiddleWare();


const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order:orderReducer,
  auth:authReducer
})
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk,sagaMiddleware)
))

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrder)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
