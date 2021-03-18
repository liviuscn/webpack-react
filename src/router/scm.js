import React, { Component } from 'react';
import { Route, Redirect, useRouteMatch, Switch } from 'react-router-dom';
import scm from 'scm'
import NotFound from '@/components/NotFound'
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
        let matchpath = this.props.path;
        console.log(matchpath, 'matchpath')
        let { apps } = this.state;
        if (apps.length === 0) {
            return null
        }
        return <Switch>
            {
                apps.map(({ name, path, exact = false, component }, index) => {
                    return <Route
                        key={index}
                        path={`${matchpath}${path}`}
                        exact={exact}
                        component={component}
                    />
                })
            }
                        <Route>
                <NotFound />
            </Route>
        </Switch>
    }
}