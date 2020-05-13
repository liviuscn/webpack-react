import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import reducer from './reducer';

const middlewares = [thunk];
if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}
// let store = createStore(
//     combineReducers(reducer),
//     applyMiddleware(thunk)
// );
const store = compose(applyMiddleware(...middlewares))(createStore)(combineReducers(reducer));
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