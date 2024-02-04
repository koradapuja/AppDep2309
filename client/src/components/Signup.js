import React, { useState } from 'react'
import { useRef } from 'react';
import{Link} from "react-router-dom"
function Signup() {
    let[profilePicPath,setProfilePicPath]=useState("./images/profile pic.jpg");
    let profilePicInputRef=useRef();
    let firstNameInputRef=useRef();
    let lastNameInputRef=useRef();
    let emailInputRef=useRef();
    let passwordInputRef=useRef();
    let ageInputRef=useRef();
    
    let phoneNumberInputRef=useRef();

    let sendSignupDataToServerThurJson= async()=>{

let dataToSend={
    firstName:firstNameInputRef.current.value,
    lastNmae:lastNameInputRef.current.value,
    age:ageInputRef.current.value,
       email:emailInputRef.current.value,
    password:passwordInputRef.current.value,
    phoneNumber:phoneNumberInputRef.current.value,
}
let dataToSendInJSON=JSON.stringify(dataToSend);
let myHeader=new Headers();
myHeader.append("content-type", "application/json");


let reqOption={
    method:"POST",
    body:dataToSendInJSON,
    headers:myHeader,
};
let JSONData=await fetch("/signup",reqOption);
let JSOData= await JSONData.json();
console.log(JSOData);
    }
  let  sendSignupDataToServerThurURLE= async()=>{
    let dataToSend=new URLSearchParams();
    dataToSend.append("firstName",firstNameInputRef.current.value);
    dataToSend.append("lastName",lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
   
    dataToSend.append("phoneNumber",phoneNumberInputRef.current.value);
 
  let myHeader= new Headers()
  myHeader.append("content-type","application/x-www-form-urlencoded")
  let reqOption={
    method:"POST",
    body:dataToSend,
    headers:myHeader,
  }
  let JSONData=await fetch("/signup",reqOption);
  let JSOData= await JSONData.json();
  console.log(JSOData);
  }
  let  sendSignupDataToServerThurFD= async()=>{
    let dataToSend=new FormData();
for(let i=0;i<profilePicInputRef.current.files.length;i++){
    dataToSend.append("profilePic",profilePicInputRef.current.files[i])
}
    dataToSend.append("firstName",firstNameInputRef.current.value);
    dataToSend.append("lastName",lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
   
     dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
   
    dataToSend.append("phoneNumber",phoneNumberInputRef.current.value);
  let reqOption={
    method:"POST",
    body:dataToSend,
  }
  let JSONData=await fetch("/signup",reqOption);
  let JSOData= await JSONData.json();
  if(JSOData.status == "success"){
    alert(JSOData.msg);
  }else{
    alert(JSOData.msg);
  }
  console.log(JSOData);
  }


  return (
    <div>
        <form>
            <h1 style={{fontFamily:"serif"}}>Signup</h1>
            <div>
        <label>Profile Pic</label>
        <input  ref={profilePicInputRef} type="file" onChange={(eventObj)=>{
            let selectedImagePath =URL.createObjectURL(eventObj.target.files[0]);
             setProfilePicPath(selectedImagePath);
        }}></input>
    </div>
    <div>
    <img className='profilePic' src={profilePicPath}></img>
    </div>
    
    <div>
        <label>First Name</label>
        <input ref={firstNameInputRef}></input>
    </div>
    <div>
        <label>Last Name</label>
        <input ref={lastNameInputRef}></input>
    </div>
    <div>
        <label>Email</label>
        <input ref={emailInputRef}></input>
    </div>
    <div>
        <label>Password</label>
        <input ref={passwordInputRef}></input>
    </div>
    <div>
        <label>Age</label>
        <input ref={ageInputRef}></input>
    </div>
    
    
    <div>
        <label>Phone number</label>
        <input ref={phoneNumberInputRef}></input>
    </div>
    
<button type="button" onClick={()=>{
     sendSignupDataToServerThurFD();
}}> Signup</button>
        </form>
        <div>
            <Link to="/">Login</Link>
        </div>
    </div>
  )
}

export default Signup