import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import edf from 'edf'
import NotFound from '@/pages/edf/notFound'
//tips:React.lazy 目前只支持默认导出（default exports）
// 路由守卫
export default class RouteConfig extends Component {
    state = {
        apps: []
    }
    componentDidMount() {
        Promise.all([edf]).then((res) => {
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
      
        let { apps } = this.state;
        if (apps.length === 0) {
            return null
        }
        return <Switch>
            {
                apps.map(({ name, path, exact = false, component }, index) => {
                    return <Route path={path} exact={exact} component={component} key={index} />
                })
            }
            <Route>
                <NotFound />
            </Route>
        </Switch>
    }
}