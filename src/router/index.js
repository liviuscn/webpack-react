import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import edf from 'edf'
import scm from 'scm'
import por from 'por'

//tips:React.lazy 目前只支持默认导出（default exports）
// 路由守卫
export default class RouteConfig extends Component {
    render() {
        let pathname = this.props.location.pathname;
        let apps = [...edf, ...scm, ...por];
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