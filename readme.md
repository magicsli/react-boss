## 项目描述

+ 1,  此项目为一个前后台分离的SPA, 包括前端和后端应用
+ 2,  功能列表: 
  + 注册 / 登录  -- 完成
  + 求职者 / hr  列表  -- 完成
  + 实时聊天   -- 测试中
  + 等其他模块
+ 采用技术 
  + 前端: react 全家桶 ... 
  + 后端: `node + express + mongodb + socketIO` 等
+ 特点:  react的特点该有的都有,优秀的React优点不必多说. 
 开发中吐槽:**好个偷头头= =, redux写的痛不欲生, 到处是小bug**


## 开发一记
+ 遇到的几个个bug:

    - 路由跳转错误, **初步判断**: 由于设计路由时, 未考虑老板用户需跳入的是大神列表, 路径需要进行多层的判断;导致各种登录时老板看到的是老板列表, 注册后**路由跳转错误**等路由错误问题   -- **已解决**
        - 解决: 对路由跳转控制的函数进行重写, 重新设计路由的跳转逻辑. 


    - 在首次登陆,聊天时, 发送一条消息, 页面会渲染出两条. 刷新后恢复正常, **初步判断**: 应该是chat.jsx文件中某些功能出了问题     -- **已解决**
        - 解决: 该问题源头在于redux传递了**两个相同的消息数据**, reducer将其保存在了state中,造成消息重复的问题:
            - 解决办法: 使用一个简单的**数组去重** `[...new Set( chatMsgs )]` 解决了此功能的缺陷


    - 在实现未读消息的功能时, 无法获取后台提供的read数据, **初步判断**: 应该后台接口在开发时,对read属性忘了传递     -- **已解决**
        - 解决: 经过确认,在编写后台时,对于消息存储的接口未保存`read:false`(未读消息) 这条属性, 导致获取消息列表时,无法拿到`read`属性
            - 解决办法: 在消息存入时,对新增的消息**增加**一个`read:false` (消息未读属性)

    - 在对未读消息的总数读取时, 理应将未读的状态修改为已读, 但是在刷新后,未读消息又会重新刷新,且消息栏未读总数没有发生任何变化. **初步判断**: 应该是向后台传递数据时,为能成功修改`read`属性, 导致数据出错     -- **已解决**
        - 解决: 对应开发时传递的没有`read`属性的测试消息进行删除, 重新建立数据库集合, 消息正常发送. 
    
    
## 上线遇到的问题
   + 无法启动后台项目, 前端正常显示,但是后台无法使用. 控制台显示接口未打开. 
      - 后台文件实例我放在 server.rar文件中, 希望各位大佬指教 
    
