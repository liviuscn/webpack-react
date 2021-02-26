import * as types from './actionType'
import update from "immutability-helper";

const initialState = {
    count: 0,
    list: [
        {
            id: 1,
            name: 'a'
        },
        {
            id: 2,
            name: 'b'
        }
    ],
    page: 1
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.INCREMENT:
            return update(state, {
                count: { $set: state.count + action.payload }
            });
        case types.DECREMENT:
            return update(state, {
                count: { $set: state.count - 1 }
            });
        case 'merge':
            return state;
        case 'reset':
            return state;
        default:
            return state
    }
}