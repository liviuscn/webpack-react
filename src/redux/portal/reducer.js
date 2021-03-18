import * as types from './actionType'
import update from "immutability-helper";

const initialState = {
    panes: [{
        title: '工作台',
        content: '工作台',
        key: 'home',
        closable: false
    },]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.INCREMENT_PANES:
            return update(state, {
                panes: { $set: action.payload }
            });
        default:
            return state
    }
}