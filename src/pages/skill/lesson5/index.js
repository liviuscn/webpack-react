/**
 * UNSAFE_componentWillUpdate
 * 可能会在一次更新中被多次调用
 * 误解：componentDidUpdate 触发时，更新其他组件的 state 已经”太晚”了
 * 正解：React 可确保在用户看到更新的 UI 之前，刷新在 componentDidMount 和 componentDidUpdate 期间发生的任何 setState 调用
 * 调用外部方法不安全
 * 
 * 改进示例
 * 旧：调用外部回调 改进：使用componentDidUpdate代替
 * 旧：更新前读取 DOM 属性 改进：使用getSnapshotBeforeUpdate代替
 * 
 */

// Before
class ExampleComponentBefore extends React.Component {
    componentWillUpdate(nextProps, nextState) {
        if (this.state.someStatefulValue !== nextState.someStatefulValue) {
            nextProps.onChange(nextState.someStatefulValue);
        }
    }
}

// After
class ExampleComponentAfter extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.state.someStatefulValue !== prevState.someStatefulValue) {
            this.props.onChange(this.state.someStatefulValue);
        }
    }
}