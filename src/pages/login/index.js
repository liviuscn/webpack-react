import React from 'react';
import { connect } from 'react-redux'
import NavBar from '@/components/navBar'
import styles from './login.less'
import List from '@/components/list'
import Swiper from '@/components/swiper'
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
    handleIncrement() {
        this.props.increment()
    }
    handleDecrement() {
        this.props.decrement()
    }
    render() {
        return (<div className={styles.root}>
            <NavBar>登录</NavBar>
            <Swiper>
                <div style={{ height: 300, backgroundColor: 'red' }}>0000000000000000</div>
                <div style={{ height: 300, backgroundColor: 'yellow' }}>111111111111111</div>
                <div style={{ height: 300, backgroundColor: 'blue' }}>222222222222222</div>
                <div style={{ height: 300, backgroundColor: 'black' }}>333333333333333</div>
            </Swiper>
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