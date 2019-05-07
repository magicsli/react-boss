export function getRedirectTo(type, header) { // 根据用户信息选择main的路由
    let path = '';
    console.log(type, header)
    if (type === 'dashen') {
        path = '/boss'
    } else {
        path = '/dashen'
    }

    if (!header) {  //没有值, 跳转到信息完善
        path = path === '/dashen' ? '/bossinfo' : '/dasheninfo'
    }


    return path;
}