import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import{Link} from "react-router-dom"
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';
function EditProfile() {
    let[profilePicPath,setProfilePicPath]=useState("./images/profile pic.jpg");
    let profilePicInputRef=useRef();
    let firstNameInputRef=useRef();
    let lastNameInputRef=useRef();
    let emailInputRef=useRef();
    let passwordInputRef=useRef();
    let ageInputRef=useRef();
    
    let phoneNumberInputRef=useRef();
let storeObj=useSelector((store)=>{return store})
   

useEffect(()=>{
  firstNameInputRef.current.value=storeObj.loginDetails.firstName;
  lastNameInputRef.current.value=storeObj.loginDetails.lastName;
  ageInputRef.current.value=storeObj.loginDetails.age;
  emailInputRef.current.value=storeObj.loginDetails.email;
  // passwordInputRef.current.value=storeObj.loginDetails.password;
  phoneNumberInputRef.current.value=storeObj.loginDetails.phoneNumber;
  setProfilePicPath(`/${storeObj.loginDetails.profilePic}`);
},[])
  let  sendUpdateDataToServerThurFD= async()=>{
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
    method:"PUT",
    body:dataToSend,
  }
  let JSONData=await fetch("/updateProfile",reqOption);
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
        <TopNavigation/> 
        <form>
            <h1 style={{fontFamily:"serif"}}>Edit Profile</h1>
            <div>
        <label>Profile pic</label>
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
        <input ref={emailInputRef} readOnly></input>
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
     sendUpdateDataToServerThurFD()
}}> Update Profile</button>
        </form>
       
    </div>
  )
}

export default EditProfile