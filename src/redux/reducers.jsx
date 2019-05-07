
import {combineReducers} from 'redux'
import { 
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSGREAD
} from "./action-types"

import {getRedirectTo} from "../utils/index"
const initUser = {
    username:"", // 用户名
    type:"",  // 用户类型
    msg:"",   // 错误提示信息
    redirectTo: null
}
const initUserList = []
const initChat = {
 users:{},        // 所有用户信息的对象, 属性名: userID, 属性值: {username. header}
 chatMsgs:[],     // 当前用户所有相关msg的数组
 unReadCount:0    // 未读消息量
}


// 产生user状态的reducer
function user(state = initUser, action) {
    switch (action.type){
        case AUTH_SUCCESS:  // data: user
            const {type, header} = action.data;
          
            return { ...action.data, redirectTo: getRedirectTo(type, header) }

        case ERROR_MSG:     // data: msg
            return {...state, msg:action.data}

        case RECEIVE_USER:     // data: data
            return  action.data 

        case RESET_USER:     // data: msg
            return { ...initUser, msg: action.data }

        default:
            return state
    }
}   

// 产生新的userlist的reducer
function userList(state = initUserList, action){

    switch (action.type) {

        case RECEIVE_USER_LIST:
            return action.data.reverse()

        default:
            return state
          
    }
}

// 产生聊天状态的reducer
function chat(state=initChat, action){

    switch (action.type){
        case RECEIVE_MSG_LIST:     // data: {users, chatMsgs, userid}
            const {users, chatMsgs, userid} = action.data;
            console.log(userid)
            return { users, chatMsgs, unReadCount: chatMsgs.reduce((sum, msg) => sum + (!msg.read && msg.to === userid ? 1 : 0) , 0) } ;

        case RECEIVE_MSG: // data: {chatMsg,userid }
            const { chatMsg} = action.data
            console.log(action.data.userid)
            return { users:state.users,
                     chatMsgs: [...new Set([...state.chatMsgs, chatMsg])] , 
                     unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0) };
       
        case MSGREAD:
                const { count , from, to} = action.data
                    console.log(count)
                return{
                        users: state.users,
                        chatMsgs: state.chatMsgs.map( msg=>{
                            if(msg.from === from && msg.to === to && !msg.read){
                                return {...msg, read: true}
                            }
                            return msg
                        } ),
                            unReadCount: state.unReadCount - count
                        };
                

        default:
            return state;
    }

}






/*  对外暴露的状态的结构 */
export default combineReducers({
    user,
    userList,
    chat
})

// user: {}    userList: []    chat: {}