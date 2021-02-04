import * as types from './actionTypes'

const initialState ={
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
//支持了reducer,先尽量不使用
export default (state = initialState, action) => {
    switch (action.type) {
        case types.INCREMENT:
            return state;
        case types.DECREMENT:
            return state;
        case 'merge':
            return state;
        case 'reset':
            return state;
        default:
            return state
    }
}