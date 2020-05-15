import home from './home/reducer'
import login from './login/reducer'
/* 
使用combineReducers拆分reducer
reducer按照page拆分
执行reducer后，返回state,相应的state也按照page拆分
虽然拆分了，但是dispatch后，所有的reducer都会执行
*/
export default {
    home,
    login
}
// Immutable.Map();
/* 
combineReducers等同于合并为一个方法
function reducer(state = {
    home:{}
}, action) {
    return {
        home: home(state.home, action),
    }
}
*/ 