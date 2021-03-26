
/**
 * UNSAFE_componentWillMount
 * 误解：componentWillMount 和 componentWillUnmount 是成对出现的
 * 正解：只有调用了 componentDidMount 之后，React 才能保证稍后调用 componentWillUnmount 进行清理
 * 
 * 
 */

// Before
export default class ExampleComponent extends React.Component {
  componentWillMount() {
    this.setState({
      subscribedValue: this.props.dataSource.value,
    });
    // 这是不安全的，它会导致内存泄漏！
    this.props.dataSource.subscribe(
      this.handleSubscriptionChange
    );
  }

  componentWillUnmount() {
    this.props.dataSource.unsubscribe(
      this.handleSubscriptionChange
    );
  }

  handleSubscriptionChange = dataSource => {
    this.setState({
      subscribedValue: dataSource.value,
    });
  };
}