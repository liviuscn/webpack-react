import React from 'react'

//错误边界
export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        console.error(error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }
    
    render() {
        const { children } = this.props;
        const { errorInfo, error } = this.state;

        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            if (errorInfo) {
                return (
                    <div>
                        <h2>{"执行异常"}</h2>
                        <details style={{ whiteSpace: 'pre-wrap' }}>
                            {error && error.toString()}
                            <br />
                            {errorInfo.componentStack}
                        </details>
                    </div>
                );
            }
            return <h1>Something went wrong.</h1>;
        }
        return children;
    }
}