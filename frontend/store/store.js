import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

const configureStore = (preloadState = {}) => (
  createStore(
    rootReducer,
    preloadState,
    applyMiddleware(thunk, logger)
  )
);

export default configureStore;
