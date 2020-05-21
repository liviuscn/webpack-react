
const initialState = {
    disX: 0,
    styleArr: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'move':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}