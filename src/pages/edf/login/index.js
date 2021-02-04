import React from 'react';
import { connect } from 'react-redux'
import NavBar from '@/components/navBar'
import styles from './login.less'
import { increment, decrement } from '@/store/login/actionCreator'
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: props.list
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {
        //  let url = 'https://etax.shanghai.chinatax.gov.cn/wszx-web/bszm/apps/views/beforeLogin/indexBefore/pageIndex.html'
        // this.open_new_window(url)
    }

    componentDidUpdate() {

    }

    componentWillUnMount() {

    }

    handleSubmit() {
        //登录
    }

    render() {
        return (<div className={styles.root}>
            <NavBar>登录</NavBar>
            <form>
                <div className={styles.item}>
                    <input placeholder='账号' required oninvalid="console.log('invalid input')" />
                </div>
                <div className={styles.item}>
                    <input placeholder='密码' required oninvalid="console.log('invalid input')" />
                </div>
                <button type="submit" onClick={this.handleSubmit}>登录</button>
            </form>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        count: state.login.count,
        list: state.login.list
    }
}

function mapDispatchToProps(params) {

}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, ownProps, stateProps, dispatchProps)
}

const options = {
    pure: true,
    withRef: true,
}
export default connect(mapStateToProps, { increment, decrement })(Login)