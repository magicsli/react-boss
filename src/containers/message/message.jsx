/* 消息页面路由容器组件 */

import React, { Component } from 'react'
import { connect } from "react-redux"
import { List, Badge } from "antd-mobile"

  const Item = List.Item;
  const Brief = Item.Brief;


 class Message extends Component {

  //  getLastMsgs = (chatMsgs, userid) => {  // 对消息列表进行分组排序
  //     let newChatMsgs = {};
  //     let lastMsge = [];
  //     chatMsgs.forEach( item => {

  //       if (item.to === userid && !item.read) {
  //         item.unReadCount = 1
  //       } else {
  //         item.unReadCount = 0
  //       }

  //         if(item.chat_id in newChatMsgs){
  //             newChatMsgs[item.chat_id].push(item);
  //            newChatMsgs[item.chat_id][0].unReadCount = newChatMsgs[item.chat_id][0].unReadCount * 1 + item.unReadCount
  //         }else{
  //           newChatMsgs[item.chat_id] = [item];
  //         }
  //     } )
  //     for( let k in newChatMsgs ){
  //       newChatMsgs[k].sort((user, user2) => user2.create_time - user.create_time)
  //       lastMsge.push(newChatMsgs[k][0]);
  //     }
  //    return lastMsge;
  //  }

   getLastMsgs = (chatMsgs, userid) => {
      const lastMsgObjs = {};
      chatMsgs.forEach( msg=> {

        msg.unReadCount = (msg.to === userid && !msg.read) ? 1 : 0;
        
        const chatId = msg.chat_id;
          let lastMsg = lastMsgObjs[chatId];
          if(!lastMsg) {
            lastMsgObjs[chatId] = msg
          }else{
            const unReadCount = lastMsg.unReadCount + msg.unReadCount
            if(msg.create_time > lastMsg.create_time){
              lastMsgObjs[chatId] = msg
            }

            lastMsgObjs[chatId].unReadCount = unReadCount
          }


      } )

      const lastMsgs = Object.values(lastMsgObjs)
      lastMsgs.sort( (m1, m2)=> m2.create_time - m1.create_time )
     return lastMsgs
    }

  render() {
    const {user} = this.props;
    const {users, chatMsgs} = this.props.chat;
    
    // 对chatMsgs 按 chat_id 进行分组, 排序
    const lastMsge = this.getLastMsgs(chatMsgs, user._id); 
  
    return (
      <List style ={{marginTop:50, marginBottom:50}}>

          {
          lastMsge.map( msg => {
            const targetId = msg.from === user._id ? msg.to : msg.from
         return (<Item
            key={msg._id} 
            extra={ <Badge text={msg.unReadCount} /> }
           thumb={require(`../../assets/avatar/${users[targetId].header || '头像1'}.jpg`)}
            arrow='horizontal' 
            onClick = { ()=>this.props.history.push(`/chat/${targetId}`) }
            >
            { users[msg.to === user._id ? msg.from : msg.to].username }
            <Brief>{msg.content}</Brief>
          </Item>)  } )
          }
            

          
        </List>
    )
  }
}
export default connect(
    state => ({user:state.user, chat:state.chat})
)(Message)
