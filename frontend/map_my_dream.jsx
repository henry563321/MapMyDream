import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

import {signup, login, logout} from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.login = login;
  window.signup = signup;
  window.logout = logout;
  const root = document.getElementById('root');
  ReactDOM.render(<h1>Welcome to My Website</h1>, root);
});
