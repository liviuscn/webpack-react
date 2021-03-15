const dt = 1000 / 60;
const raf = window.requestAnimationFrame
let preTime = 0
    , initialState = {
        currX: -250,
        currV: 0,
    }
const cal = (t, b, _c, d) => {
    var c = _c - b;
    return c * t / d + b;
}
const update = () => {
    const currTime = performance.now();
    const deltaTime = currTime - preTime;
    const steps = deltaTime / dt;

    const multiObj = (obj, k) => {
        return Object.keys(obj).reduce((res, key) => {
            return { ...res, [key]: obj[key] * k }
        }, {})
    };

    const getCurrState = (prevState, steps) => {
        if (steps < 1) {
            return multiObj(cal(prevState), steps)
        }

        return getCurrState(cal(prevState), steps - 1)
    };

    console.log(getCurrState(initialState, steps))

    raf(update);
}
export default update
// update()