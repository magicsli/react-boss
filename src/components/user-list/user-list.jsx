/* 显示指定用户列表的ui组件 */

import React, { Component } from 'react'
import PropTypes from "prop-types"
import { WingBlank, WhiteSpace, Card} from "antd-mobile"

const { Header, Body} = Card

export default class UserList extends Component {

    static propTypes = {
        userList : PropTypes.array.isRequired
    }

  render() {
    const {userList} = this.props;
    userList.reverse();
    return (
        <WingBlank style = { { paddingBottom:'60px', paddingTop:50 }}>
            {userList.map((user, k ) => {
              return (<div key = {k} >
                        <WhiteSpace/>
                        <Card>
                            <Header thumb={require(`../../assets/avatar/${user.header || '头像1'}.jpg`)}
                                    extra={user.username}
                            />
                            <Body>
                             <div>职位: {user.post || '这个人很懒, 什么都没留下'  }</div>
                             {user.company ? <div style={{marginTop:'6px', lineHeight:'18px', fontSize:'14px'}}>公司: {user.company}</div>: null}
                             {user.salary ? <div style={{marginTop:'6px', lineHeight:'18px', fontSize:'14px'}}>月薪: {user.salary}</div> : null}
                             {user.info ? <div style={{marginTop:'6px', lineHeight:'18px', fontSize:'14px'}}>描述: {user.info}</div> : null}
                            </Body>            


                        </Card>
                    </div>)
          })}
          
        </WingBlank>
    )
  }
}