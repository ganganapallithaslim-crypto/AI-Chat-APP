//Chat.jsx :
import React, { useState } from "react";

function Chat(){
 const [message, setMessage] = useState("");
 const [chat, setChat] = useState([]);

 async function sendMessage(){

 if (!message.trim()) return;

 const userMessage = {sender: "user",text: message};

 setChat((prev) => [...prev,userMessage]);

 try {
 const response = await fetch(
 "http://localhost:5000/api/chat",
 {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 userid:localStorage.getItem("userid")},
 body: JSON.stringify({message})
 }
 );
 const data = await response.json();
 const botMessage = {sender: "bot",text: data.reply};
 setChat((prev) => [...prev,botMessage]);

 } catch (err) {
 console.log(err);
 }
 setMessage("");
 };

 return (
 <div className="chatContainer">
 <div className="chatBox">
 <h2>AI Chat</h2>
 <div className="messages">
 {
 chat.map((msg, index) => (
 <div key={index} className={msg.sender === "user"?"user":"bot"}>
 {msg.text}
 </div>
 ))
 }
 </div>
 <div className="inputArea">
 <input type="text" placeholder="Ask something..."
 value={message} onChange={(e)=>setMessage(e.target.value)}/>

 <button onClick={sendMessage}>Send</button>
 </div>
 </div>
 </div>
 );
};
export default Chat;