import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import { Provider} from "react-redux"

import "./assets/css/index.css"
import store from './redux/store'

import * as serviceWorker from './serviceWorker'
import Main from './containers/main/main'
import Login from './containers/login/login'
import Register from './containers/register/register'
import './text/socket_test'
ReactDOM.render(
    <Provider store = {store}>
        <HashRouter>
            <Switch>    
                <Route path="/Login" component={Login}></Route>
                <Route path="/Register" component={Register}></Route>
                <Route component={Main}></Route> { /* 默认组件,不能放在第一个,否则获取不到其他路由组件 */ }
            </Switch>
        </HashRouter>
    </Provider>
 ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 