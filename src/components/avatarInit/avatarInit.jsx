import React, { Component } from 'react'

import {List, Grid} from "antd-mobile"
import PropTypes from "prop-types"
 
export default class AvatarInit extends Component {

    static propTypes = {
      setHeader: PropTypes.func.isRequired
    }

  constructor(props){
    super(props)
    this.avatarList = [];
    for(let i = 0; i < 20; i++){
      this.avatarList.push({ 
       text: `头像${i + 1}`,
       icon: require(`../../assets/avatar/头像${i + 1}.jpg`)}) 
    }
  }

  state = {
    icon: null
  }



  handleClick = ({text, icon}) => {
       // 更新状态
    this.setState({icon})
       // 调用函数更新父组件状态
    this.props.setHeader(text)
  }

  render() {
    const {icon} = this.state;
    const listHeader = !icon ? '请选择头像' :(
      <div>
         已选择头像: <img alt="头像" src={icon} style={{height:'30px'}} />
      </div>
    )
    return (
      <List renderHeader = { ()=> listHeader}>
          <Grid data={this.avatarList} 
            columnNum={5}
             onClick = {this.handleClick} />
      </List>
    )
  }
}
