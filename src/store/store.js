import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import reducer from './reducer';

const middlewares = [thunk];
if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(combineReducers(reducer));
let { subscribe, dispatch, getState } = store;
let a = getState().getIn(['login', 'list']).toObject()

console.log(a)
let unsubscribe = subscribe(() => { console.log("store状态已改变：", getState().toJS()) });

// setInterval(() => {
//     dispatch({
//         type: "home_increment"
//     })
// }, 1000);

//unsubscribe();//调用可解除监听

export default store;