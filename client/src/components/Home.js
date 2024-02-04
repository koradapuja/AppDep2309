import React from 'react'
import TopNavigation from './TopNavigation'
import {useSelector}from  'react-redux'
function Home() {
  let storeObj = useSelector((store)=>{
return store
  });
console.log("inside home");
  console.log(storeObj);
  return (
    <div>
        <TopNavigation/>
       
        <h1>welcome   {storeObj.loginDetails.firstName}{storeObj.loginDetails.lastName}</h1>
<img src={`/${storeObj.loginDetails.profilePic}`}></img>
        </div>
  )
}

export default Home