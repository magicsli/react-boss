
import {combineReducers} from 'redux'
import { 
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG
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
            const {type, header} = action.data
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
            return action.data

        default:
            return state
          
    }
}

// 产生聊天状态的reducer
function chat(state=initChat, action){

    switch (action.type){
        case RECEIVE_MSG_LIST:     // data: {users, chatMsgs}
            const {users, chatMsgs} = action.data;
           
            return { users, chatMsgs, unReadCount:0 } ;

        case RECEIVE_MSG: // data: chatMsg
            const chatMsg = action.data
            return { users:state.users,
                     chatMsgs:[...state.chatMsgs, chatMsg], 
                     unReadCount: 0 };
       

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