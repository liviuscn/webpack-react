import React from 'react';
import { connect } from 'react-redux'
import NavBar from '@/components/navBar'
import styles from './login.less'
import List from '@/components/list'
import { toJS } from '@/utils/to-js'

import { increment, decrement } from '@/store/login/actionCreator'

const List2 = toJS(List)
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: props.list
        }
        this.handleIncrement = this.handleIncrement.bind(this)
        this.handleDecrement = this.handleDecrement.bind(this)
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    componentWillUnMount() {

    }
    handleIncrement() {
        this.props.increment()
    }
    handleDecrement() {
        this.props.decrement()
    }
    render() {
        return (<div className={styles.root}>
            <NavBar>登录</NavBar>
            <div>
                {this.props.count}
                <List2 dataSource={this.props.list} />
                <button onClick={this.handleIncrement}>+</button>
                <button onClick={this.handleDecrement}>-</button>
            </div>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        count: state.getIn(['login', 'count']),
        list: state.getIn(['login', 'list'])
    }
}

export default connect(mapStateToProps, { increment, decrement })(Login)