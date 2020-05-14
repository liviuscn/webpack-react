import { INCREMENT, DECREMENT } from './actionTypes'
import Immutable from 'Immutable'
const initialState = Immutable.Map({
    count: 0
});
//支持了reducer,先尽量不使用
export default (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return state.set('count', state.get('count') + 1);
        case DECREMENT:
            return state.set('count', state.get('count') - 1);
        default:
            return state
    }
}