
import {combineReducers} from 'redux'
import { 
    AUTH_SUCCESS,
    ERROR_MSG,
    
} from "./action-types"

import {getRedirectTo} from "../utils/index"
const initUser = {
    username:"", // 用户名
    type:"",  // 用户类型
    msg:"",   // 错误提示信息
    redirectTo: null
}




// 产生user状态的reducer
function user(state = initUser, action) {
    switch (action.type){
        case AUTH_SUCCESS:  // data: user
            const {type, header} = action.data
            return { ...action.data, redirectTo: getRedirectTo(type, header) }

        case ERROR_MSG:     // data: msg
            return {...state, msg:action.data}

        default:
            return state
    }
}   










/*  对外暴露的状态的结构 */
export default combineReducers({
    user
})