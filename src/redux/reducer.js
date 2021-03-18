import { combineReducers } from 'redux';
import home from './home/reducer'
import login from './login/reducer'
import portal from './portal/reducer'
/* 
使用combineReducers拆分reducer
reducer按照page拆分
执行reducer后，返回state,相应的state也按照page拆分
虽然拆分了，但是dispatch后，所有的reducer都会执行
*/
export default combineReducers({
    home,
    login,
    portal
})
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
/**
 * redux全局管理state
 * 遇到组件之间共享状态
 * 需要缓存当前页面的数据（比如从详情页返回，依然保持当前的检索条件）
 */