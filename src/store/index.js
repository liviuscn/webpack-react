import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

let store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunk)
);
let { subscribe, dispatch, getState } = store;
let unsubscribe = subscribe(() => { console.log("store状态已改变：", getState()) });

dispatch({
    type: "increment"
})
dispatch({
    type: "increment"
})

// unsubscribe();//调用可解除监听
export default store;