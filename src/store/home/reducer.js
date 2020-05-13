import { INCREMENT, DECREMENT } from './actionTypes'

const initialState = {
    count: 0
}

//支持了reducer,先尽量不使用
export default (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            };
        case DECREMENT:
            return {
                count: state.count - 1
            };
        default:
            return state
    }
}