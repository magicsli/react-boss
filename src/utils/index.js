export function getRedirectTo(type, header) { // 根据用户信息选择main的路由
    let path = '';
    if (type === 'laoban') {
        path = '/boss'
    } else {
        path = '/dashen'
    }

    if (!header) {  //没有值, 跳转到信息完善
        path += 'info'
    }


    return path;
}