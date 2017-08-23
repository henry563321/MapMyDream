import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

import {createDream, showDream, deleteDream} from './util/dream_util';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.createDream = createDream;
  window.showDream = showDream;
  window.deleteDream = deleteDream;

  window.getState = store.getState;
  window.dispatch = store.dispatch;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
