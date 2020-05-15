import * as types from './actionTypes'

import { fromJS } from 'immutable';
//加一
export const incrementAction = {
    type: types.INCREMENT
}

//减一
export const decrementAction = {
    type: types.DECREMENT
}

//action creator
export const save = (path) => {
    return {
        type: "save",
        path: path
    }
}