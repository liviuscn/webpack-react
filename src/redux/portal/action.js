import * as types from './actionType'

export const actions = (payload) => {
    return {
        type: types.INCREMENT_PANES,
        payload
    }
}