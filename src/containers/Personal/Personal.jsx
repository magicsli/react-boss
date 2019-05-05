import React, { Component } from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from "js-cookie"
 
import {resetUser} from "../../redux/actions"

const Item = List.Item
const Brief = Item.Brief
class Personal extends Component {


  logout = () => {
    Modal.alert('退出', '确认退出登录吗?',[
      {
        text:'取消',
        onPress: () => console.log('cancel')
      },
      {
        text: '确认',
        onPress: () => {
          Cookies.remove('userid')
          this.props.resetUser();
        }
      }
    ])
  }

  render() {
    const { username, type, header, company, post, salary, info} = this.props.user
    return (
      <div>
            <Result 
              img ={<img src={require(`../../assets/avatar/${header}.jpg`)} style={{width:50}} alt='header'/>}
              title = {username}
              message= {company}
            />
            <List renderHeader = {() => '相关信息'}>
                <Item multipleLine>
                    <Brief>职位: {post}</Brief>
                    <Brief>简介: {info}</Brief>
                    {salary ? <Brief>薪资: {salary}</Brief> : null}  
                </Item>
            </List>

        <Button style={{marginTop:'15px'}} onClick={this.logout} type="warning">退出登录</Button>
      </div>
    )
  }
}

export default connect (
  state => ({user:state.user}),
  { resetUser}
)(Personal)
