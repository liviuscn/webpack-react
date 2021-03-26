/**
 * getSnapshotBeforeUpdate
 * 更新之前（如：更新 DOM 之前）被调用。
 * 此生命周期的返回值将作为第三个参数传递给 componentDidUpdate。
 * （通常不需要，但在重新渲染过程中手动保留滚动位置等情况下非常有用。）
 * 与 componentDidUpdate 一起，这个新的生命周期涵盖过时的 componentWillUpdate 的所有用例。
 * 这个方法在发生变化 前立即 被调用
 * 
 * 
 */


 class Example extends React.Component {
    getSnapshotBeforeUpdate(prevProps, prevState) {
      // ...
    }
  }

