import React, { Component } from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import Cookies from "js-cookie"
import { NavBar }  from 'antd-mobile'


import BossInfo from "../boss-info/boss-info"
import DashenInfo from "../dashen-info/dashen-info"
import {getRedirectTo} from "../../utils/index"
import {getUser} from "../../redux/actions"
import Dashen from '../dashen/dashen'
import Boss from '../boss/boss'
import Message from '../message/message'
import Personal from '../Personal/Personal'
import NotFound from "../../components/not-found/NotFound"
import NavFooter from "../../components/nav-footer/nav-footer"


 class Main extends Component {

  navList =[
    {
      path: '/dashen',
      component: Boss,
      title: '大神列表',
      icon: 'dashen',
      text: '大神'
    },
    {
      path: '/boss',
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板'
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息'
    },
    {
      path: '/personal',
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人中心'
    },

  ]



  componentDidMount() {
    const userid = Cookies.get('userid');
    const{_id} = this.props.user
    if(userid && !_id){
       // console.log('发送ajax请求获取user')
      this.props.getUser()
    }
  }
  

  render() {
      const userid = Cookies.get('userid')
    if (!userid) {
      return <Redirect to={'/login'} />;
    }
    const {user} = this.props;

    if(!user._id){
      return null
    }else{
      let path = this.props.location.pathname
      if(path ==='/'){
        path = getRedirectTo(user.type, user.header);
        return <Redirect to={path}/>
      }
    }
    const {navList} = this;
    const path = this.props.location.pathname;
    const currentNav = navList.find( (nav)=> nav.path === path )
    if(currentNav) {
      // 决定哪个路由需要隐藏
      if(user.type === 'laoban'){
        // 隐藏数组的老板对象
        navList[1].hide = true;
      
      }else{
        // 隐藏数组中的大神对象
        navList[0].hide = true;
      }
    }

    return (
      <div>
        {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}

        <Switch>
          {
            navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component} />)
          }

          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/dasheninfo" component={DashenInfo} />
         
        

          <Route  component={NotFound} />
          </Switch>
        {currentNav ? <NavFooter navList = {navList} /> : null}
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user}),
  { getUser }
)(Main)
