const initialState = {
    count: 0
}
//支持了reducer,先尽量不使用
export default (state = initialState, action) => {
    switch (action.type) {
        case 'increment':
            return {
                count: state.count + 1
            };
        case 'decrement':
            return {
                count: state.count - 1
            };
        default:
            return state
    }
}