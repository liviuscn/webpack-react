import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Router from '@/router';
import store from '@/store/store';
import '@/assets/style/global.less'

const modules = ['edf', 'scm']

ReactDOM.render(
    //绑定redux、热加载
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root'),
)