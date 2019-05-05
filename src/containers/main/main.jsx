import React, { Component } from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import Cookies from "js-cookie"
 
import BossInfo from "../boss-info/boss-info"
import DashenInfo from "../dashen-info/dashen-info"


 class Main extends Component {
  render() {
      const userid = Cookies.get('userid')
    if (!userid) {
      return <Redirect to={'/login'} />;
    }
    const {user} = this.props;
    if(!user._id){

      return null

    }else{

      const path = this.props.location.pathname
      if(path ==='/'){
          
      }
      
    }


  


    // 检测用户是否登录, 若没有就重定向到登录界面

    
    
    return (
      <div>
        <Switch>
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/dasheninfo" component={DashenInfo} />
        </Switch>
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user}),

)(Main)
