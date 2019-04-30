
import { reqResgister, 
         reqLogin,
         reqUpdata
} from "../api/index"

import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'    

// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})

// 授权提示信息的同步action
const errorMsg = (msg) =>({type:ERROR_MSG, data:msg})


// 注册异步action
export const register = ( user ) => {
    const {username, password, type, password2} = user;
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
    if (!password) return errorMsg("请设置密码");

    return async dispath => {
        // 发送请求
        const response = await reqLogin(user);
        const result = response.data;

        if (result.code === 0) {
             // 分发授权成功的action
            dispath(authSuccess(result.data))
        } else {
            // 分发授权失败的action
            dispath(errorMsg(result.msg))
        }

    }
}