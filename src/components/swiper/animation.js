import bweenFunctions from './tween-functions'
import store from './store'

const getStyle = () => {
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
            left: width * (activeIndex + i),
            width: width,
        })
    }
    let styleArr2 = styleArr.map(o => Object.assign({}, o))
    if (activeIndex === 0) {
        styleArr2[number - 1].left = -width
    } else if (activeIndex === number - 1) {
        styleArr2[0].left = width * number
    }
    return styleArr2
}

//开始动画
const startAnimation = (width = 320, duration = 1000, frameTime = 17, number = 3, direction = 'left') => {

    let activeIndex = 0
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
            left: width * (activeIndex + i),
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
    let timer0, timer1, timer2
    const loop = () => {
        let beginPos = -width * activeIndex
        let endPos = direction === 'left' ? -width * (activeIndex + 1) : -width * (activeIndex - 1)

        const passedTime = performance.now() - now;

        let currX = bweenFunctions.easeOutCubic(passedTime, beginPos, endPos, duration)
        console.log(currX)
        if (!currX) currX = 0
        if (Math.abs(currX - beginPos) > width) {

            now = performance.now();
            direction === 'left' ? activeIndex++ : activeIndex--
            if (activeIndex > number - 1) {
                activeIndex = 0
            }
            if (activeIndex < 0) {
                activeIndex = number - 1
            }
            let styleArr2 = styleArr.map(o => Object.assign({}, o))
            if (activeIndex === 0) {
                styleArr2[number - 1].left = -width
            } else if (activeIndex === number - 1) {
                styleArr2[0].left = width * number
            }

            //停留3s后再执行
            store.dispatch({
                type: 'move',
                payload: {
                    disX: -width * activeIndex,
                    styleArr: styleArr2,
                    activeIndex: activeIndex
                }
            });
            timer2 = setTimeout(() => {
                //暂停3s
                now = performance.now();
                loop()
            }, 3000);
            //return clearTimeout(timer1)
            return window.cancelAnimationFrame(timer1)
        } else {
            console.log(currX)
            store.dispatch({
                type: 'move',
                payload: {
                    disX: currX
                }
            });
        }
        //  timer1 = setTimeout(loop, frameTime);
        timer1 = window.requestAnimationFrame(loop);
    }
    //loop()
    timer0 = setTimeout(() => {
        now = performance.now();
        timer1 = window.requestAnimationFrame(loop);
    }, 3000);

    return () => {
        clearTimeout(timer0)
        window.cancelAnimationFrame(timer1)
        clearTimeout(timer2)

    }
};

export default startAnimation