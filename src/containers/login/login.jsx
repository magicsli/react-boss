
/* 注册路由组件 */
import React, { Component } from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button,
  Toast
} from 'antd-mobile'

import {connect} from "react-redux"
import {Redirect} from 'react-router-dom'
import {login} from "../../redux/actions"

import bossPic from "./boss.png"


 class Login extends Component {

  state = {
    username: "",  // 用户名
    password: "",  // 密码
  }

  login = async () => {
    await this.props.login(this.state)
    const { msg } = this.props.user;
    if (msg) {
      this.failToast(msg)
    }
  }

  goRegister = () => {
    this.props.history.replace("/Register")
  }

  handleChange = (name, val) => {
    this.setState({ [name]: val });  //name这里需要变成变量
  }
 failToast = (msg)=> {
   Toast.fail(msg, 1);
}
  render() {
    const { msg, redirectTo} = this.props.user;
  
    return (
      redirectTo    // 如果redirectTo有值,就重定向到登录
        ? <Redirect to={redirectTo} />
        : <div>
          <NavBar className="title" style={{ letterSpacing: 3 }} >极简直聘</NavBar>
        <div>
          <img style={{width:"100%", margin:"0 0 16px 0"}} src={bossPic} alt=""/>
        </div>
        <WingBlank>
          <List>
             
            <WhiteSpace />
            <InputItem placeholder="请输入用户名" onChange={val => { this.handleChange("username", val) }}>用户名:</InputItem>   <WhiteSpace />
            <InputItem placeholder="请输入密码" onChange={val => { this.handleChange("password", val) }} type="password">密    码:</InputItem>   <WhiteSpace />
          
            <Button onClick={this.login} type="primary">登   录</Button>
            <Button onClick={this.goRegister} type="default">还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user:state.user}),
  {login}
)(Login)