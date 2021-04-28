import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import store from './redux/store/index';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
