import React from 'react';
import { connect } from 'react-redux'
import NavBar from '@/components/navBar'
import styles from './login.less'

class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div className={styles.root}>
            <NavBar>登录</NavBar>
            <div>
                {this.props.count}
            </div>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        count: state.getIn(['home', 'count'])
    }
}

export default connect(mapStateToProps)(Login)