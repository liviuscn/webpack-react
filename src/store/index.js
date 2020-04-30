import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

let store = createStore(
    combineReducers({ reducer}),
    applyMiddleware(thunk)
);

export default store;