/* 显示指定用户列表的ui组件 */

import React, { Component } from 'react'
import PropTypes from "prop-types"
import { WingBlank, WhiteSpace, Card, SearchBar, Toast} from "antd-mobile"
import QueueAnim from 'rc-queue-anim'
import {withRouter} from "react-router-dom"

const { Header, Body} = Card;

 var likeSort = []

 class UserList extends Component {

    static propTypes = {
        userList : PropTypes.array.isRequired,
   
    }
    state = {
      likePort: '',
      search: false
    }

   handleSort = (val) => {
     const { userList } = this.props;
     const likePort = val;
     this.setState({ likePort: val })

     clearTimeout(this.sortKey)

    this.sortKey = setTimeout(() => {
      likeSort = userList.filter(user => {
        if (user.post && user.post.indexOf(likePort) !== -1) {
          return true
        }
        return false;
      })
        this.setState({ likePort: val })
    }, 300);

   
     

   }

   componentWillUnmount(){
     clearTimeout(this.sortKey)
     likeSort = [ ] 
   }

   render() {
     const userList = this.state.search || likeSort.length ? likeSort : this.props.userList;


    
    return (
        <WingBlank style = { { paddingBottom:'60px', paddingTop:50 }}>

        <SearchBar value={this.state.likePort}
         onChange={value => { this.handleSort(value) } }
         onFocus={() => { this.setState({ search: true }) }}
         onBlur={() => { if (likeSort.length === 0) { Toast.offline('未找到您期望的目标', 1, () => this.setState({ likePort: '', search: false }))  } }}
         placeholder="请输入职位名称" maxLength={8} />

        <QueueAnim type="right">
          {userList.map((user, k) => {
            return (<div key={k} >
              <WhiteSpace />
              <Card onClick={() => { this.props.history.push(`/chat/${user._id}`) }}>
                <Header thumb={require(`../../assets/avatar/${user.header || '头像1'}.jpg`)}
                  extra={user.username}
                />
                <Body>
                  <div>职位: {user.post || '这个人很懒, 什么都没留下'}</div>
                  {user.company ? <div style={{ marginTop: '6px', lineHeight: '18px', fontSize: '14px' }}>公司: {user.company}</div> : null}
                  {user.salary ? <div style={{ marginTop: '6px', lineHeight: '18px', fontSize: '14px' }}>月薪: {user.salary}</div> : null}
                  {user.info ? <div style={{ marginTop: '6px', lineHeight: '18px', fontSize: '14px' }}>描述: {user.info}</div> : null}
                </Body>


              </Card>
            </div>)
          })}
        </QueueAnim>
           
          
        </WingBlank>
    )
  }
}

export default withRouter ( UserList )