/**
 * UNSAFE_componentWillUpdate
 * 可能会在一次更新中被多次调用
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