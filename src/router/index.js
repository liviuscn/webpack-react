import React, { Suspense, Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import ErrorBoundary from '@/utils/errorBoundary';
import Spinner from '@/components/spinner'
//tips:React.lazy 目前只支持默认导出（default exports）
import edf from '@/pages/edf'
import scm from '@/pages/scm'

const apps = [...edf]

let arr = ['edf']
const requireComponent = require.context(
    // 其组件目录的相对路径
    '@/pages/scm',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /.js$/
)

console.log(requireComponent.keys())


export default class RouteConfig extends Component {
    render() {
        return (
            <HashRouter>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            {
                                apps.map(({ component, ...item }, index) => {
                                    return <Route key={index} component={React.lazy(() => import(/* webpackChunkName: "[request][index]" */`@/pages/${component}`))} {...item} />
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
