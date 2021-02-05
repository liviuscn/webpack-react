import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Switch } from 'react-router-dom';
import ErrorBoundary from '@/utils/errorBoundary';
import Spinner from '@/components/spinner'
import Router from '@/router';
import store from '@/store/store';
//DLL Mapped Mode 
import beta from '@/assets/js/beta'
//DLL Scoped Mode
import a from 'assets/src/assets/js/a'
import b from 'assets/src/assets/js/b'
import c from 'assets/src/assets/js/c'
import d from 'assets/src/assets/js/d'
import styles from  '@/assets/style/global.less'

console.log(beta, 'beta');
console.log(a, b, c, d, 'a,b,c,d');

ReactDOM.render(
    //绑定redux、热加载
    <Provider store={store} className={styles.root}>
        <HashRouter>
            <ErrorBoundary>
                <Suspense fallback={<Spinner />}>
                    <Switch>
                        <Router />
                    </Switch>
                </Suspense>
            </ErrorBoundary>
        </HashRouter>
    </Provider>,
    document.getElementById('root'),
)