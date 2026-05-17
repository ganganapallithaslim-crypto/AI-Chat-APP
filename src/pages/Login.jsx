//Login.jsx :
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

 const navigate = useNavigate();
 const [formData, setFormData] = useState({
 email: "",
 password: ""
 });

 function handleChange(e){
 const {name,value} = e.target;
 setFormData({...formData,[name]: value});
 };

 async function handleSubmit(e){
 e.preventDefault();
 try {
 const response = await fetch("http://localhost:5000/api/auth/login",
 {
 method: "POST",
 headers: {
 "Content-Type": "application/json"
 },
 body: JSON.stringify(formData)
 }
 );
 const data = await response.json();
 console.log(data);

// SUCCESS LOGIN
 if (data.success) {
// Store userid dynamically
 localStorage.setItem("userid",data.userId);
// Optional popup
 alert("Login Successful");
// Navigate to chat page
 navigate("/chat");
 } else {
 alert(data.message);
 }
 } catch (err) {
 console.log(err);
 alert("Login Error");
 }

 };

 return (

 <div className="container">
 <form className="form" onSubmit={handleSubmit} >
 <h2>Login</h2>
 <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} />

 <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} />

 <button type="submit">Login</button>
 </form>
 </div>
 );
};

export default Login;