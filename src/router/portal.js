import React, { Component } from 'react';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';
import scm from 'scm'

//tips:React.lazy 目前只支持默认导出（default exports）
// 路由守卫
export default class RouteConfig extends Component {
    state = {
        apps: []
    }
    componentDidMount() {
        Promise.all([scm]).then((res) => {
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
        let { url } = useRouteMatch();
        console.log(url, 'url')
        let pathname = this.props.location.pathname;
        let { apps } = this.state;
        if (apps.length === 0) {
            return null
        }
        return <>
            {
                apps.map(({ name, path, exact = false, component }, index) => {
                    return <Route
                        key={index}
                        path={`${url}/${path}`}
                        exact={exact}
                        component={component}
                    />
                })
            }
        </>
    }
}