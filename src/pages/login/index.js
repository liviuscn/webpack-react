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
    open_new_window(link) {
        try {
            window.open('javascript:window.name;', '<script>location.replace("' + link + '")</script>');
        } catch (e) {
            window.open(link);
            // window.open(link, '', 'height=500,width=611,scrollbars=yes,status =yes')
        }
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
            <div>
                <div className={styles.item}>
                    <input placeholder='账号' />
                </div>
                <div className={styles.item}>
                    <input placeholder='密码' />
                </div>
                <button onClick={this.handleSubmit}>登录</button>
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