/* 包含多个接口请求的函数模块 */
/* 函数返回值为promise */ 

import ajax from './ajax'

// 注册接口
export const reqResgister = ( user ) => ajax('/register', user, "POST");

// 登录接口
export const reqLogin = ({ username, password }) => ajax('/login', { username, password } , 'POST')

// 更新用户接口
export const reqUpdata = ( user ) => ajax('/updata', user, "POST")

// 