import reducer from './reducer'

const createStore = (reducer, initialState) => {
    let listeners = [];
    let state = initialState
    const getState = () => state
    const subscribe = listener => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(item => item !== listener)
        }
    }
    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }
    dispatch({});
    return {
        getState,
        subscribe,
        dispatch
    };
}

const store = createStore(reducer);

export default store