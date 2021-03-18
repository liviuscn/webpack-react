import React from 'react';
import { Layout, Form, Input } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as actions from '@/redux/login/action'
const { Header, Content, Footer } = Layout;

import './index.less';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: props.list
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    componentWillUnMount() {

    }

    handleSubmit(e) {
        //登录
        e.preventDefault()
    }

    render() {
        const { count, actions, decrement, increment, incrementAsync } = this.props;
        return (<Layout className="login-container">
            <Header>登录</Header>
            <Content>
                <Form>
                    <div className="item">
                        <Input placeholder='账号' />
                    </div>
                    <div className="item">
                        <Input placeholder='密码' />
                    </div>
                    {/* <button type="submit" onClick={this.handleSubmit}>登录</button> */}
                    <div>
                        <div> 数量：{count}</div>
                        <button onClick={() => increment(5)}>+</button>
                        <button onClick={decrement}>-</button>
                        <button onClick={() => incrementAsync(5)}>+</button>
                    </div>
                </Form>
            </Content>
            <Footer>@1988</Footer>
        </Layout>)
    }
}

function mapStateToProps(state) {
    return {
        count: state.login.count,
        list: state.login.list
    }
}

function mapDispatchToProps(dispatch) {
    // return {
    //     increment: () => dispatch(actions.increment()),
    //     decrement: () => dispatch(actions.decrement())
    // }
    // return {
    //     actions:bindActionCreators(actions,dispatch)
    // }
    return bindActionCreators({
        increment: actions.increment,
        decrement: actions.decrement,
        incrementAsync: actions.incrementAsync
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)