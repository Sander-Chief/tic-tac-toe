import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';

const title = 'Tic-Tac-Toe';

ReactDOM.render(
  <App title={title} />, document.getElementById('app')
);

module.hot.accept();