import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger'
import reducer from '@/redux/reducer';

const middlewares = [thunk];
if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);

let { subscribe, dispatch, getState } = store;

let unsubscribe = subscribe(() => {
    console.log("store状态已改变：", getState());
    // setInterval(() => {
    //     dispatch({
    //         type: "home_increment"
    //     })
    // }, 1000);
    //unsubscribe();//调用可解除监听
})
export default store;