import React, { Component } from 'react';
import { Route, Redirect, useRouteMatch, Switch } from 'react-router-dom';
import scm from 'scm'
import skill from 'skill'
import NotFound from '@/components/NotFound'

// 路由守卫
export default class RouteConfig extends Component {
    state = {
        apps: []
    }
    componentDidMount() {
        Promise.all([scm,skill]).then((res) => {
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
        let { path: matchpath } = this.props;
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