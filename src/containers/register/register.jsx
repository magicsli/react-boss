
/* 注册路由组件 */
import React, { Component } from 'react'
import {NavBar,
       WingBlank,
       List,
       InputItem,
       WhiteSpace,
       Radio,
       Button
      } from 'antd-mobile'

   import Logo from "../../components/logo/logo" 



const ListItem = List.Item;
export default class Register extends Component {

    state = {
      username:"",  // 用户名
      password:"",  // 密码
      password2:"", // 确认密码
      type:"dashen"       // 用户类型
    }

    register = ()=>{

    }

    goLogin = () =>{
    this.props.history.replace("/login")
    }

    handleChange = (name, val) =>{
        this.setState({[name]:val});  //name这里需要变成变量
    }

  render() {
    const {type} = this.state
    return (
      <div>
          <NavBar className="title">BOSS直聘</NavBar>
          <Logo />
          <WingBlank>
            <List>
              <WhiteSpace />
            <InputItem placeholder="请输入用户名" onChange={val =>{this.handleChange("username", val)}}>用户名:</InputItem>   <WhiteSpace />
            <InputItem placeholder="请输入密码" onChange={val => { this.handleChange("password", val )}} type="password">密    码:</InputItem>   <WhiteSpace />
            <InputItem  placeholder="请输入确认密码" onChange={val => { this.handleChange("password2",val) }} type="password">确认密码:</InputItem>   <WhiteSpace />
              <ListItem>
                <span>您的身份:</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio checked={ type==='dashen'} onClick={()=>this.handleChange('type','dashen')}>大神牛人</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio checked={type === 'laoban'} onClick={()=>this.handleChange('type', 'laoban')}>HR老板</Radio>
              </ListItem>
                 <Button onClick={this.register} type="primary">注册</Button>
                 <Button onClick={this.goLogin} type="default">已有账户</Button>
            </List>
          </WingBlank> 
      </div>
    )
  }
}
