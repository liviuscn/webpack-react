import * as types from './actionType'

export const handleIncrementPanes = (payload) => {
    return {
        type: types.INCREMENT_PANES,
        payload
    }
}

export const handleChangePane = (payload) => {
    return {
        type: types.CHANGE_PANE,
        payload
    }
}