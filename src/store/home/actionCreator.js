import { INCREMENT, DECREMENT } from './actionTypes'
import { fromJS } from 'immutable';
//加一
export const incrementAction = {
    type: INCREMENT
}

//减一
export const decrementAction = {
    type: DECREMENT
}

//action creator
export const save = (path) => {
    return {
        type: "save",
        path: path
    }
}