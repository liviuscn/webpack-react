import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Router from '@/router';
import store from '@/store/store';
//DLL Mapped Mode 
import beta from '@/assets/js/beta'
//DLL Scoped Mode
import a from 'assets/src/assets/js/a'
import b from 'assets/src/assets/js/b'
import c from 'assets/src/assets/js/c'
import d from 'assets/src/assets/js/d'

import '@/assets/style/global.less'
import '@/assets/style/global.css'

console.log(beta,'beta');
console.log(a,b,c,d,'a,b,c,d');

ReactDOM.render(
    //绑定redux、热加载
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root'),
)