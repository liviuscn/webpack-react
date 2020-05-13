import React, { Suspense, Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import ErrorBoundary from '@/utils/errorBoundary';
import Spinner from '@/components/spinner'
//tips:React.lazy 目前只支持默认导出（default exports）

const Home = React.lazy(() => import("@/pages/home"));
const Register = React.lazy(() => import("@/pages/register"));
const Login = React.lazy(() => import("@/pages/login"));
const User = React.lazy(() => import("@/pages/user"));

export default class RouteConfig extends Component {
    render() {
        return (
            <HashRouter>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                            <Route path="/user" component={User} />
                            <Redirect to="/" />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </HashRouter>
        )
    }
}
