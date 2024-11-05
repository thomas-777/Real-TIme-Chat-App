import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId } from "../socket/socket.js"
import { io } from "../socket/socket.js"
export const sendMessage = async (req,res)=>{
    try{
        const {message}=req.body
        const {id: receiverId}=req.params

        const senderId = req.user._id
    
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId, receiverId]}
        })

        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

       

        await conversation.save()
        await newMessage.save()
         //Socket
        const recieverSocketId=getReceiverSocketId(receiverId);
        if(recieverSocketId){
            //io.to.emit(recieverid) to send message to a specific socket
            io.to(recieverSocketId).emit("newMessage",newMessage);
        }
        res.status(201).json(newMessage)


    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in sending message",error)
    }
}

export const getMessages = async (req,res)=>{
    try{
        const {id:userToChatId}=req.params
        const senderId = req.user._id
        const conversation = await Conversation.findOne({
            participants: {$all: [senderId,userToChatId]}
        }).populate("messages")
        if(!conversation) return res.status(200).json([])

        res.status(200).json(conversation.messages)
    }
    catch(error){
        res.status(500).json({error:"Internal server error"})
        console.log("Error in get message")
    }
}