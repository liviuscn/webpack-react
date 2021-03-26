
/**
 * UNSAFE_componentWillMount
 * 1、内存泄漏
 * 2、setState
 * 
 * 误解：componentWillMount 和 componentWillUnmount 是成对出现的
 * 正解：只有调用了 componentDidMount 之后，React 才能保证稍后调用 componentWillUnmount 进行清理
 * 
 * 
 * 改进示例：
 * 旧：初始化 state 改进：移到构造函数或属性的初始化器内
 * 旧：获取外部数据 改进：改用componentDidMount
 * 旧：添加事件监听器（或订阅） 改进：改用componentDidMount
 */

// Before
export default class ExampleComponentBefore extends React.Component {
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