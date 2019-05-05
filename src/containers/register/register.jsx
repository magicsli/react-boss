
/* 注册路由组件 */
import React, { Component } from 'react'
import {NavBar,
       WingBlank,
       List,
       InputItem,
       WhiteSpace,
       Radio,
       Button,
       Toast
      } from 'antd-mobile'
import {connect} from "react-redux"
import {Redirect} from 'react-router-dom'

  import {register} from "../../redux/actions"
   import Logo from "../../components/logo/logo" 



const ListItem = List.Item;
class Register extends Component {

    state = {
      username:"",  // 用户名
      password:"",  // 密码
      password2:"", // 确认密码
      type:"dashen"       // 用户类型
    }

    register = async ()=>{
      await this.props.register(this.state);
      const { msg } = this.props.user;
      if (msg) {
        this.failToast(msg)
      }
    }

    goLogin = () =>{
    this.props.history.replace("/login");
      
    }

    handleChange = (name, val) =>{
        this.setState({[name]:val});  //name这里需要变成变量
    }
  failToast = (msg) => {
    Toast.fail(msg, 1);
  }

  render() {
    const {type} = this.state;
    const { msg, redirectTo} = this.props.user;
   
    return (
      redirectTo    // 如果redirectTo有值,就重定向到登录
      ? <Redirect to={redirectTo} />
      :<div>
          <NavBar className="title">BOSS直聘</NavBar>
          <Logo />
          <WingBlank>
            <List>
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

export default connect(
  state => ({user: state.user}),
  {register}
)(Register)