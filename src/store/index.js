import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import Immutable from 'Immutable'
const initialState = Immutable.Map();//会覆盖reducer中的状态
import reducer from './reducer';

const middlewares = [thunk];
if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

const store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunk)
)

let { subscribe, dispatch, getState } = store;
let unsubscribe = subscribe(() => { console.log("store状态已改变：", getState()) });

dispatch({
    type: "home_increment"
})
unsubscribe();//调用可解除监听
dispatch({
    type: "home_increment"
})
export default store;