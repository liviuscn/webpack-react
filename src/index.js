import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Switch,Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import ErrorBoundary from '@/utils/errorBoundary';
import Spinner from 'pdv/spinner'
import Router from '@/router';
import store from '@/store/store';
//测试DLL Mapped Mode 
// import beta from '@/assets/js/beta'
//测试DLL Scoped Mode
// import a from 'assets/src/assets/js/a'
// import b from 'assets/src/assets/js/b'
// import c from 'assets/src/assets/js/c'
// import d from 'assets/src/assets/js/d'

import '@/assets/style/global.less'

moment.locale('zh-cn');

// console.log(beta, 'beta');
// console.log(a, b, c, d, 'a,b,c,d');

const App = () => {
    return <Provider store={store}>
        <HashRouter>
            <ErrorBoundary>
                <Suspense fallback={<Spinner />}>
                    <ConfigProvider locale={zhCN}>
                        <Router/>
                    </ConfigProvider>
                </Suspense>
            </ErrorBoundary>
        </HashRouter>
    </Provider>
}

ReactDOM.render(
    <App />,
    document.getElementById('root'),
)