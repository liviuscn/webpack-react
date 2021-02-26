import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import NavBar from '@/components/navBar'
import styles from './login.less'
import * as actions from '@/redux/login/action'
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
        console.log("login page mount")
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
        const { count,actions, decrement, increment,incrementAsync } = this.props;
        return (<div className={styles.root}>
            <NavBar>登录</NavBar>
            <form>
                <div className={styles.item}>
                    <input placeholder='账号'/>
                </div>
                <div className={styles.item}>
                    <input placeholder='密码'/>
                </div>
                {/* <button type="submit" onClick={this.handleSubmit}>登录</button> */}
                <div>
                    <div> 数量：{count}</div>
                    <button onClick={()=>increment(5)}>+</button>
                    <button onClick={decrement}>-</button>
                    <button onClick={()=>incrementAsync(5)}>+</button>  
                </div>
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

function mapDispatchToProps(dispatch) {
    // return {
    //     increment: () => dispatch(actions.increment()),
    //     decrement: () => dispatch(actions.decrement())
    // }
    // return {
    //     actions:bindActionCreators(actions,dispatch)
    // }
    return bindActionCreators({
            increment:actions.increment,
            decrement:actions.decrement,
            incrementAsync:actions.incrementAsync
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)