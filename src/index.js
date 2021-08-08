import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react'
import { Clients } from '../src/stores/Clients'

let clients = new Clients()

const stores = {
  clients
}

ReactDOM.render(<Provider {...stores}> <App /> </Provider>, document.getElementById('root'));

reportWebVitals();
