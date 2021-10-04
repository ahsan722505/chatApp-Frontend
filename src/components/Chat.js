import styles from "./Chat.module.css"
import Message from "./Message";
import { Fragment } from "react";
import { useRef,useState,useEffect } from "react";
import { io } from "socket.io-client";
let socket;
const Chat=(props)=>{
    const dummyEl=useRef();
    
    
    useEffect(()=>{
        socket=io("https://fierce-chamber-02811.herokuapp.com/");
        
        socket.emit("new-user",props.username)
        socket.on("new-user-joined",name=>{
            setChats(state=>{
                return [...state , { name : null , message : `${name} has joined the chat` , position : "flex-start"}]
            })
        })
        socket.on("left",name=>{
            setChats(state=>{
                return [...state , { name : null , message : `${name} has left the chat` , position : "flex-start"}]
            })
        })
        socket.on("receive-message",data=>{
            setChats(state=>{
                return [...state , { name : data.name , message : data.message , position : "flex-start"}]
            })
        })
        
        

    },[])
    
    const [chats,setChats]=useState([]);
    const [message,setMessage]=useState("");
    useEffect(()=>{
        dummyEl.current.scrollIntoView({ behavior: "smooth" })
    },[chats])
    
    const submitHandler=(e)=>{
        e.preventDefault();
        if(message.trim().length === 0 ) return;
        setChats(state=>{
            return [...state,{name : "you" , message : `${message}` , position : "flex-end"}]
        })
        
        
        socket.emit("send-message",{name : props.username , message : message})
        setMessage("")

    }
    return(
        <Fragment>

        
        <div className={styles.messagesCont}>
            {chats.map(chat=> <Message name={chat.name} message={chat.message} position={chat.position}/> )}
            <div ref={dummyEl}></div>
        </div>
        <form className={styles.send} onSubmit={submitHandler} >
            <input type="text" onChange={(e)=> setMessage(e.target.value)} placeholder="Enter Message" value={message}/>
            <button type="submit">Send</button>

        </form>
        </Fragment>
    )

}
export default Chat;