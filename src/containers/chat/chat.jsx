import React, { Component } from 'react'
import {connect} from 'react-redux'
import {List, NavBar, InputItem, Grid, Icon} from "antd-mobile"
import {sendMsg} from "../../redux/actions"


const {Item} = List
class Chat extends Component {

    state = {
        content : '',
        isShow:false
    }

   
    componentWillMount() {
        const emojis = [
            '😬', '😂', '😃', '😅', '🙂', '😠',
            '🙃', '😍', '😋', '😜', '😔', '😕',
            '🙁', '😖', '😫', '😱', '😯', '😟',
            '😰', '🤤', '😥', '💪', '👋', '👍',
            '👎', '👵', '👴', '👳‍', '🧕', '👮‍', 
            '👩‍🚒', '👷‍️', '⚽','🏀','🏈','⚾','🎾',
            '🏐','🏉','🎱','🏓','🏸','🥅','🤾‍',
            '️🤸‍','🤸‍','️🤼‍','🤼‍','🏋','️🏋','🚣‍',
            '🚴‍','️🚵‍','️🏅','🧗‍','️🏌️‍','️🧘‍','️🧖‍',
            '️🏄‍','️🏊‍'
        ]
        this.emojis = emojis.map( emojis => ({text:emojis}) )

        
    }
    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    

    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    

    toggleShow = ()=>{
        const isShow = !this.state.isShow;
        this.setState({ isShow })
        if(isShow){
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0);
        }
    }

    handleSend = ()=>{
        // 发送信息
        const  from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim();
      
        if(content){
            this.props.sendMsg( {from, to, content} )
            
        }
        this.setState({ content: '', isShow: false })
    }
  render() {
      const {user} = this.props;
      const {users, chatMsgs} = this.props.chat
      // 计算当前的聊天的chatid
      const meId = user._id
      if(!users[meId]){  // 如果没有获取数据, 不做任何显示
          return null
      }
      const targetId = this.props.match.params.userid;
      const chatId = [meId, targetId].sort().join('_')
      // 对 chatMsgs 进行过滤 
     const msgs =  chatMsgs.filter(msg=> msg.chat_id === chatId)
      const targetHeader = users[targetId].header
      const targetAvatar = require(`../../assets/avatar/${targetHeader || '头像1'}.jpg`) 
     return (
      <div id = 'chat-page'>
             <NavBar icon={<Icon onClick={ ()=>{this.props.history.goBack()} } type='left'></Icon>} className="sticky-header">{users[targetId].username}</NavBar>
             <List style={{ padding:'50px 0'}}>

                {
                    msgs.map((msg,index)=>{
                        if(meId === msg.to){
                            return <Item key={index} thumb={targetAvatar} > {msg.content}</Item>
                        }else{
                            return (<Item key={index} className='chat-me' extra='我' >
                                {msg.content}
                                   </Item>)
                        }
                    })

                }
          
            </List>
            <div className='am-tab-bar'>
                <InputItem
                    onFocus = {()=>{this.setState({isShow:false})}}
                    value = {this.state.content}
                    onChange={content => this.setState({content})} placeholder='请输入'
                    extra={
                    <span>
                         <span onClick={ this.toggleShow }>🙂</span>
                        <span onClick={this.handleSend}>发送</span>
                    </span>
                 }> 
                 </InputItem>
                 {this.state.isShow ? (<Grid
                     data={this.emojis}
                     columnNum={8}
                     carouselMaxRow={4}
                     isCarousel={true}
                     onClick={(item) => {
                         this.setState({ content: this.state.content + item.text })
                     }}
                 />) : null}
            </div>
           
      </div>
    )
  }
}

export default connect(
    state => ({ user:state.user, chat:state.chat }),
    { sendMsg }
)(Chat)