import io from 'socket.io-client'

 const socket = io('ws://127.0.0.1:4000')

socket.emit('sendMsg', {name:'Bob'})

socket.on('receiveMsg', function(data){
    console.log('客户端接收到了数据',data);
    
})