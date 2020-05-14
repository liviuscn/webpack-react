import { INCREMENT, DECREMENT } from './actionTypes'
import Immutable, { fromJS } from 'Immutable'
const initialState = Immutable.fromJS({
    count: 0,
    list: [],
    page: 1
});
//支持了reducer,先尽量不使用
export default (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return state.merge({
                count: state.get('count') + 1,
                list: fromJS([2, 3, 4]),
                page: 1
            });
        case DECREMENT:
            return state.set('count', state.get('count') - 1);
        default:
            return state
    }
}