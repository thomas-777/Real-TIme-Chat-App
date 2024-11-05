import { Server } from "socket.io";
import http from "http";
import express from "express";

const app=express();

const server =http.createServer(app);
const io =new Server(server,{
    cors:{
        origin:"http://localhost:5001",
    }
})

export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}
const userSocketMap={};
io.on("connection",(socket)=>{
    console.log("a user connected")
    const userId=socket.handshake.query.userId;
    console.log(socket.id)
    
    if(userId!="undefined"){
        userSocketMap[userId]=socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    //socket.on listens for events. can be used in both client and server
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

export {app,io,server};