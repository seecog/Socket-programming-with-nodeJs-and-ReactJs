var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var router = express.Router();
var app = express();
var server = http.createServer(app);
var socketConn = socketIo(server);
//database connect start
var mongoose = require('mongoose');
var User = require('./models/user.model')
mongoose.connect("mongodb://localhost/company",()=>{
    console.log('Database connection established')
})
//database connect end

socketConn.on('connection',function(socket){
console.log('socket esatablished')

socket.on('hello',()=>{
    socket.emit('serverRes',{
        message : 'How are you ? '
    })
})
var i = 0;
setInterval(()=>{

//fetch from db
User.find({},(err,users)=>{
if(err){
    console.log('The error is ',err);
    return;
}
socket.emit('userlist',users);
})



i++;
},2000);

});



socketConn.on('disconnect',function(){
    console.log('Connection closed')
})

server.listen(3003,function(){
console.log('Server starts');
})
