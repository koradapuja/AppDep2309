import React, { useEffect } from 'react'
import { useRef } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
function Login() {
  let dispatch = useDispatch();
    let navigate=useNavigate();
    let emailInputRef=useRef();
    let passwordInputRef=useRef();

useEffect(()=>{
if(localStorage.getItem("token")){
   validateLoginonLoad();
}
},[])


 let  validateLoginonLoad= async()=>{
  let dataToSend=new FormData();
   dataToSend.append("token", localStorage.getItem("token"));
 let reqOption={
   method:"POST",
   body:dataToSend,
}
   let JSONData = await fetch("/validateToken",reqOption);
  let JSOData= await JSONData.json();
 console.log(JSOData);
 if(JSOData.status == "failure"){
  alert(JSOData.msg);
 }else{
    dispatch({ type:"login", data:JSOData.data});
 navigate("/home");
 }
 } ;
  let  sendLoginDataToServerThurFD= async()=>{
    let dataToSend=new FormData();
      dataToSend.append("email",emailInputRef.current.value);
     dataToSend.append("password",passwordInputRef.current.value);
    let reqOption={
      method:"POST",
      body:dataToSend,
    }
     let JSONData=await fetch("/login",reqOption);
    let JSOData= await JSONData.json();
   console.log(JSOData);
  if(JSOData.status == "failure"){
    alert(JSOData.msg);
  }else{
    localStorage.setItem("token",JSOData.data.token);
    dispatch({type:"login",data:JSOData.data});
   navigate("/home");
  }
    }
  return (
    <div>
        <form>
            <h1 style={{fontFamily:"serif"}}>Login</h1>
            
    
    <div>
        <label>Email</label>
        <input ref={emailInputRef}></input>
    </div>
    <div>
        <label>Password</label>
        <input ref={passwordInputRef}></input>
    </div>
<button type="button" onClick={()=>{
     sendLoginDataToServerThurFD()
}}> login</button>
        </form>
        <div>
            <Link to="/signup">Signup</Link>
        </div>
    </div>
  )
}

export default Login