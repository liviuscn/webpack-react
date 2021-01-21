import React, { Suspense, Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import ErrorBoundary from '@/utils/errorBoundary';
import Spinner from '@/components/spinner'
//tips:React.lazy 目前只支持默认导出（default exports）
import edf from '@/pages/edf'
// import scm from '@/pages/scm'

const apps = [...edf]

export default class RouteConfig extends Component {
    render() {
        return (
            <HashRouter>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            {
                                apps.map((item, index) => {
                                    return <Route key={index}  {...item} />
                                })
                            }
                            <Redirect to="/" />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </HashRouter>
        )
    }
}
