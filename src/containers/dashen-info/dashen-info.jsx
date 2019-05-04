/* boss 信息完善界面 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'

import AvatarInit from "../../components/avatarInit/avatarInit"
class DashenInfo extends Component {
    state = {
        header: '',
        info: '',
        post: ''

    }

    setHeader = (header) => {
        this.setState({ header })
    }

    handleChange = (name, val) => {
        this.setState({ [name]: val })
    }

    save = () => {
        //this.props.updateUser(this.state)
    }

    render() {
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <AvatarInit setHeader = {this.setHeader}/>
                <InputItem onChange={val => { this.handleChange('post', val) }} placeholder="请输入求职岗位"> 求职岗位: </InputItem>
                <TextareaItem onChange={val => { this.handleChange('info', val) }} rows={3} title="个人介绍:"/>
                <Button onClick ={this.save} type="primary">保&nbsp;&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({ state: state }),
    {}
)(DashenInfo)