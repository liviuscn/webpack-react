import * as types from './actionTypes'

//加一
export const increment = () => {
    return {
        type: types.INCREMENT
    }
}

//减一
export const decrement = () => {
    return {
        type: types.DECREMENT
    }
}

//action creator
export const save = (path) => {
    return {
        type: "save",
        path: path
    }
}