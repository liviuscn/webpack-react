import { INCREMENT, DECREMENT } from './actionTypes'
import Immutable from 'Immutable'
const initialState = Immutable.fromJS({
    count: 0,
    list: []
});
//支持了reducer,先尽量不使用
export default (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return state.merge({
                'count': state.get('count') + 1,
                'list': [2, 3, 4]
            });
        case DECREMENT:
            return state.set('count', state.get('count') - 1);
        default:
            return state
    }
}