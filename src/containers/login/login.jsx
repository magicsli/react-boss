
/* 注册路由组件 */
import React, { Component } from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'



import bossPic from "./boss.png"

const ListItem = List.Item;
export default class Login extends Component {

  state = {
    username: "",  // 用户名
    password: "",  // 密码
  }

  login = () => {

  }

  goRegister = () => {
    this.props.history.replace("/Register")
  }

  handleChange = (name, val) => {
    this.setState({ [name]: val });  //name这里需要变成变量
  }

  render() {
    return (
      <div>
        <NavBar className="title">BOSS直聘</NavBar>
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
