/**
 * 
 * UNSAFE_componentWillReceiveProps
 * 经常被误用，会产生问题。因此，该方法将被废弃。
 * 可能在一次更新中被多次调用
 * 
 * 改进示例
 * 旧：基于 props 更新 state 改进：改用getDerivedStateFromProps
 * 旧：props 更新的副作用 改进：使用componentDidUpdate代替
 * 旧：props 更新时获取外部数据 改进：使用getDerivedStateFromProps + componentDidUpdate代替
 * 
 */

// Before
class ExampleComponentBefore extends React.Component {
    state = {
        isScrollingDown: false,
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.currentRow !== nextProps.currentRow) {
            this.setState({
                isScrollingDown: nextProps.currentRow > this.props.currentRow,
            });
        }
    }
}

// After
class ExampleComponentAfter extends React.Component {
    // 在构造函数中初始化 state，
    // 或者使用属性初始化器。
    state = {
      isScrollingDown: false,
      lastRow: null,
    };
  
    static getDerivedStateFromProps(props, state) {
      if (props.currentRow !== state.lastRow) {
        return {
          isScrollingDown: props.currentRow > state.lastRow,
          lastRow: props.currentRow,
        };
      }
  
      // 返回 null 表示无需更新 state。
      return null;
    }
  }

  /*

在上面的示例中，你可能会注意到 props.currentRow 在 state 中的镜像（state.lastRow）。这使得 getDerivedStateFromProps 能够像在 componentWillReceiveProps 中相同的方式访问上一个 props 的值。

你可能想知道为什么我们不将上一个 props 作为参数传递给 getDerivedStateFromProps。我们在设计 API 时考虑过这个方案，但最终决定不采用它，原因有两个：

prevProps 参数在第一次调用 getDerivedStateFromProps（实例化之后）时为 null，需要在每次访问 prevProps 时添加 if-not-null 检查。
在 React 的未来版本中，不传递上一个 props 给这个方法是为了释放内存。（如果 React 无需传递上一个 props 给生命周期，那么它就无需保存上一个 props 对象在内存中。）
  */