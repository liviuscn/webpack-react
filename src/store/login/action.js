import * as types from './actionType'

//加n
export const increment = (payload) => {
    return {
        type: types.INCREMENT,
        payload
    }
}

//减一
export const decrement = (payload) => {
    return {
        type: types.DECREMENT,
        payload
    }
}

//异步加一
export const incrementAsync = (payload) => (dispatch, getState) => {
    //console.log(getState())
    setTimeout(() => {
        dispatch({
            type: types.INCREMENT,
            payload
        })
    }, 2000)
}