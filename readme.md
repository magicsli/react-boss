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
+ 我的个人网站地址 <a href="https://www.magicsli.com">项目地址</a>

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
      
   + 由于在上线时，并未将前后台文件进行整合，且没有对服务器开启相对应的配置`server {listen 80; ***}`。所有后台项目无法正常运行，
      - 通过查阅各个博客文章，终于是成功将项目上线我的个人服务器www.magicsli.com服务器带宽不大,会有些
    
   + 由于这个项目是一个spa页面, 所以体积会比较大, 加上一些原因, 页面在加载时会出现长时间加载的问题. 非常影响用户体验;
      - 解决方案:  采用H5 中的web离线缓存技术 (`application  cache`)
      - 解决过程:  在用户进行第一次访问的时候, 将那些不需要重复请求的数据文件进行缓存, 通过保存在用户浏览器中, 这样, 用户再需要这些文件数据时就可以从缓存中获取, 极大的提升了页面加载速度, 减轻了服务器的压力.  **具体过程记录在我的myNote笔记库中**
      
   + 发现几个application cache 的问题, 
      - 1, 缓存文件无法进行控制, 我们只能更新
      - 2, 引用 `manifest` 属性的html也会被缓存, 但这往往不是我们想要的, 
      - 3, 此api在web标准中已被废弃
      - 4, 在iOS 7 下与 history back 具有冲突问题
      - 5, 缓存文件路径不易维护, 如果一个缓存路径错误会造成整个缓存错误而退档
      - 6, 运营商经常会对流量大的网站进行流量广告劫持, ( 就是往页面中插广告 ). 如果不慎缓存了广告...
      - **总结:**
           - app cache 用途感觉多用于游戏这类对文件没有大幅更新的项目, 风险较大, 而且我们也有web storage这类缓存技术, 
           - 这个技术就是一把双刃剑, 用好了, 页面性能至少提升50%. 当然这个也是需要付出较大风险

  + 解决了webSocket报400错误的问题
      - 由于我们需要通过websocket进行长连接时需要对连接进行升级, 升级到websocket, 所以服务器必须对其请求进行相应的配置,如果请求头中带了申请websocket的升级请求,则需要开启反应 修改如下 :    ( 原博客地址: https://www.cnblogs.com/duanweishi/p/9286461.html )
      
      其中最重要的是下面这三行

          1proxy_http_version 1.1;
          2proxy_set_header Upgrade $http_upgrade;
          3proxy_set_header Connection "upgrade";
          其中第一行是告诉nginx使用HTTP/1.1通信协议，这是websoket必须要使用的协议。

          第二行和第三行告诉nginx，当它想要使用WebSocket时，响应http升级请求。
      
  
