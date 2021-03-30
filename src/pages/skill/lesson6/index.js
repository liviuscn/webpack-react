
/**
 * static getDerivedStateFromProps
 * getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state
 * 组件实例化之后以及重新渲染之前调用
 * 可以返回一个对象来更新 state，或者返回 null 来表示新的 props 不需要任何 state 的更新
 * 与 componentDidUpdate 一起，这个新的生命周期涵盖过时的 componentWillReceiveProps 的所有用例
 * 创建组件以及每次组件由于 props 或 state 的改变而重新渲染时都会调用该生命周期
 */

