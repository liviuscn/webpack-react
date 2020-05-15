import * as types from './actionTypes'
import Immutable, { fromJS } from 'Immutable'

const initialState = Immutable.fromJS({
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
});
//支持了reducer,先尽量不使用
export default (state = initialState, action) => {
    switch (action.type) {
        case types.INCREMENT:
            return state.update('count', x => x+1);
        case types.DECREMENT:
            return state.update('count', x => x-1);
        case 'merge':
            return state.merge(fromJS({ list2: [] }));
        case 'reset':
            return state.set('count', 0);
        default:
            return state
    }
}