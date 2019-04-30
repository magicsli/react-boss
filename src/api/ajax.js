/* 发送ajax请求的模块 */ 

import axios from 'axios'
export default function ajax( url, data={}, type="GET" ){
    let paramStr = '';
    Object.keys(data).forEach((v)=>{
        paramStr += v + '=' + data[v] + '&'
    })
if(paramStr === ""){
    paramStr.substring(0, paramStr.length - 1)
}

   return (type === "GET" 
   ?  axios.get(url+'?'+paramStr)
   : axios.post(url, data)
   )
}