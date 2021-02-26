import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import edf from 'edf'
import scm from 'scm'

//tips:React.lazy 目前只支持默认导出（default exports）
// 路由守卫
export default class RouteConfig extends Component {
    state = {
        apps: []
    }
    componentDidMount() {
        Promise.all([edf, scm]).then((res) => {
            let apps = []
            res.forEach((item) => {
                apps = [...apps, ...item]
            })
            this.setState({
                apps
            })
        })
    }

    render() {
        let pathname = this.props.location.pathname;
        let { apps } = this.state;
        if (apps.length === 0) {
            return null
        }
        if (apps.find(item => item.path === pathname)) {
            return <>
                {
                    apps.map((item, index) => {
                        return <Route key={index}  {...item} />
                    })
                }
            </>
        } else {
            return <Redirect to="/login" />
        }
    }
}