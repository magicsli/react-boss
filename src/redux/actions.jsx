
import { reqResgister, 
         reqLogin,
         reqUpdata,
         reqUser,
         reqUserList
} from "../api/index"

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST
} from './action-types'    


// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})

// 授权提示信息的同步action
const errorMsg = (msg) =>({type:ERROR_MSG, data:msg})

// 接收用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data:user})

// 接收重置用户的同步action
 export const resetUser = (msg) => ({ type: RESET_USER, data:msg })


// 注册异步action
export const register = ( user ) => {
    const {username, password, password2} = user;
    // 表单前台验证
    if(!username) return errorMsg("用户名必须指定");
    if(!password || !password2) return errorMsg("请设置密码")
    if(password !== password2){
        return errorMsg("俩次密码不一致")
    }


      return async dispath => {
          // 发送请求
       const response =  await reqResgister(user);
       const result = response.data;

       if(result.code === 0){
            // 分发授权成功的action
            dispath(authSuccess(result.data))
        }else{
            // 分发授权失败的action
            dispath(errorMsg(result.msg))
        }

      }  
}

// 登录
export const login = (user) => {
    const { username, password  } = user;
    if (!username) return errorMsg("用户名必须指定");
    if (!password) return errorMsg("请输入密码");

    return async dispath => {
        // 发送请求
        const response = await reqLogin(user);
        const result = response.data;

        if (result.code === 0) {
             // 分发授权成功的action
            dispath(authSuccess(result.user))
        } else {
            // 分发授权失败的action
            dispath(errorMsg(result.msg))
        }

    }
}

// 更新状态
export const update = (user) => {
    return async dispath => {
       const response = await  reqUpdata(user);
        const result = response.data;
        if(result.code == 0){ // 更新成功

            dispath(receiveUser(result.data))    
        }else{ // 更新失败
            dispath(resetUser(result.msg))
        }
        
    }
}

// 获取用户异步action
export const getUser = () => {
    return async dispath => {
        const response = await reqUser();
        const result = response.data;
        if(result.code == 0){
            dispath(receiveUser(result.data))
        }else{
            dispath(resetUser(result.msg))
        }
    }
}

// 接收用户列表的同步action
export const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })

// 获取用户列表的异步action
export const getUserList = (type) => {

    return async dispath => {
        const response = await reqUserList(type);
        if(response.data.code == 0){
            return dispath(receiveUserList(response.data.data))
        }
    }
}