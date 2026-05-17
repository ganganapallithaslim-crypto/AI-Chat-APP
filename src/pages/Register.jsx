//Register.jsx 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
 name: "",
 email: "",
 password: ""
 });

 function handleChange(e){
 const {name,value} = e.target;
 setFormData({...formData,[name]:value});
 };

 async function handleSubmit(e){
 e.preventDefault();
 try {
 const response = await fetch(
 "http://localhost:5000/api/auth/register",
 {
 method: "POST",
 headers: {
 "Content-Type": "application/json"
 },
 body: JSON.stringify(formData)
 }
 );
 const data = await response.json();
 alert(data.message);
 navigate("/login");
 } catch (err) {
 console.log(err);
 }

 };
 return (
 <div className="container">
 <form className="form" onSubmit={handleSubmit} >
 <h2>Register</h2>
 <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} />

 <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} />

 <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} />

 <button type="submit">Register</button>
 </form>
 </div>
 );
};

export default Register;