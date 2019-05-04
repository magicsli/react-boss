/* boss 信息完善界面 */ 
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'

import AvatarInit from "../../components/avatarInit/avatarInit"

 class BossInfo extends Component {

    state = {
        header:'',
        post:'',
        info:'',
        company:'',
        salary:''
    }

    setHeader = (header) => {
        this.setState({ header })
    }

    handleChange = (name, val) =>{
        this.setState({[name]:val})
    }

    save = () => {
        //this.props.updateUser(this.state)
    }

  render() {
    return (
        <div>
            <NavBar>老板信息完善</NavBar>
            <AvatarInit setHeader = {this.setHeader} />
            <InputItem onChange={ val=>{this.handleChange('post', val)} } placeholder="请输入招聘职位"> 招聘职位: </InputItem>
            <InputItem onChange={val => { this.handleChange('company', val) }} placeholder="请输入公司名称"> 公司名称: </InputItem>
            <InputItem onChange={val => { this.handleChange('salary', val) }} placeholder="请输入职位薪资"> 职位薪资: </InputItem>
            <TextareaItem
             onChange = {val => { this.handleChange('info', val) }} 
             rows={3} title="职位要求:" placeholder="请输入职位要求" />
            <Button onClick={this.save} type="primary">保&nbsp;&nbsp;&nbsp;&nbsp;存</Button>
        </div>
    )
  }
}

export default connect(
//  state => ({state : state}),
//  {}
)(BossInfo)