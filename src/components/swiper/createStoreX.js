import bweenFunctions from './tween-functions'



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

const initialState = {
    disX: 0,
    styleArr: []
}

const reducer = (state = initialState, action) => {
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

const store = createStore(reducer);

//开始动画
const startAnimation = (width = 320, duration = 1000, frameTime = 17, number = 3, direction = 'left') => {

    let currIndex = 0
    let now = performance.now();
    const styleArr = []
    for (let i = 0; i < number; i++) {
        styleArr.push({
            position: 'absolute',
            top: 0,
            display: 'inline-block',
            listStyleType: 'none',
            verticalAlign: 'top',
            height: 'auto',
            boxSizing: 'border-box',
            margin: 'auto 0px',
            left: width * (currIndex + i),
            width: width,
        })
    }
    let styleArr2 = styleArr.map(o => Object.assign({}, o))
    styleArr2[number - 1].left = -width
    store.dispatch({
        type: 'move',
        payload: {
            styleArr: styleArr2
        }
    });
    let timer
    const loop = () => {
        let beginPos = -width * currIndex
        let endPos = direction === 'left' ? -width * (currIndex + 1) : -width * (currIndex - 1)

        const passedTime = performance.now() - now;

        let currX = bweenFunctions.easeOutCubic(passedTime, beginPos, endPos, duration)
        console.log(currX)
        if (!currX) currX = 0
        if (Math.abs(currX - beginPos) > width) {

            now = performance.now();
            direction === 'left' ? currIndex++ : currIndex--
            if (currIndex > number - 1) {
                currIndex = 0
            }
            if (currIndex < 0) {
                currIndex = number - 1
            }
            let styleArr2 = styleArr.map(o => Object.assign({}, o))
            if (currIndex === 0) {
                styleArr2[number - 1].left = -width
            } else if (currIndex === number - 1) {
                styleArr2[0].left = width * number
            }

            //停留3s后再执行
            store.dispatch({
                type: 'move',
                payload: {
                    disX: -width * currIndex,
                    styleArr: styleArr2,
                    activeIndex: currIndex
                }
            });
            setTimeout(() => {
                //暂停3s
                now = performance.now();
                loop()
            }, 2000);
            return clearTimeout(timer)
        } else {
            console.log(currX)
            store.dispatch({
                type: 'move',
                payload: {
                    disX: currX
                }
            });
        }
      //  timer = setTimeout(loop, frameTime);
         timer = window.requestAnimationFrame(loop);
    }
    //loop()
    timer = window.requestAnimationFrame(loop);
    return () => {
         window.cancelAnimationFrame(timer)
       // clearTimeout(timer)
    }
};

export {
    store,
    startAnimation
};
