import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import 'bootstrap/dist/css/bootstrap.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

// FOR FONTAWESOME
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUsers,
  faAngleDoubleRight,
  faPlus,
  faTrashAlt,
  faArrowCircleLeft,
  faUserPlus,
  faPencilAlt,
  faUser,
  faBook,
  faLock,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUsers,
  faAngleDoubleRight,
  faPlus,
  faTrashAlt,
  faArrowCircleLeft,
  faUserPlus,
  faPencilAlt,
  faUser,
  faBook,
  faLock,
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
