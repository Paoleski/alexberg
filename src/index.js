import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import userReducer from './reducers/userReducer'

const store = createStore(userReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
