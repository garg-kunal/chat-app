const express=require('express');
const socketIO=require('socket.io');
const cors=require('cors');
const http=require('http');
var port=4000 || process.env.PORT

const app=express();
app.use(cors());

const server=http.createServer(app);
var a=['Code','New']

const io=socketIO(server);
app.get('/',(req,res)=>{
    res.send(a);
})
io.on("connection",(socket)=>{
    // console.log("new User Connected");

    // socket.emit("new",{
    //     from:"Admin",
    //     message:"Welcome To Chat App"
    // })
    socket.broadcast.emit("newUser",{
        from:"Admin",
        message:"New User Connected"
    })
    socket.on('newMessage',(data,callback)=>{
        console.log(data)
        io.emit('message',{
            message:data.message,
            id:data.id
        })
        callback("Message Send From Server");
    })


    socket.on('disconnect',()=>{
        console.log("User Disconnected")
    })

})

app.get('/',(req,res)=>{
    res.send("Heelo from server");
})

server.listen(port,()=>{
    console.log("Server is running at "+port);
})




