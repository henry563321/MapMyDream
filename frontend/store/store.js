import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

const configureStore = (preloadState = {}) => (
  createStore(
    rootReducer,
    preloadState,
    applyMiddleware(thunk)
  )
);

export default configureStore;
