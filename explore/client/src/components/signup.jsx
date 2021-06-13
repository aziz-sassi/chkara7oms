import React from 'react';
import { useState,useEffect } from 'react';
import './signup.css';
import axios from 'axios';

export default function Signup(props) {

  const [signupdata,setsignupdata] = useState({
    username : "",
    password : "",
    about : "",
  });
  const [userexist,setuserexist] = useState("default");
  const [checkInfos , setcheckInfos] = useState("");



  const renderextrastuff = () => {
    if (userexist === "true" || checkInfos === "not valid"){
      return <p className="authtext">something went wrong please try again</p>
    
    }
    else if(userexist === "false"){
      {props.changeView("Match")}}
    }
    
  

  const handleChange = (e) => {
    setsignupdata({...signupdata,[e.target.name] : e.target.value})
    console.log(signupdata,e.target.value);

  }

  const sendForm = () =>{
    if (signupdata.username ===""||signupdata.password ===""||signupdata.about==="") {
     return setcheckInfos("not valid");
    }

    axios.post("/createAccount",signupdata)

    .then(response =>{
      console.log("new user was created successfully")
      if (response.data==="new created") {
        setuserexist("false")
      }
      else if (response.data==="user already exist"){
        setuserexist("true")

      }
    })
    .catch(err =>{
      console.log("whyyyyy");
      console.log(err)
    })

  }

  return (
        <div>
            <div className='bold-line'></div>
<div className='container'>
  <div className='window'>
    <div className='overlay'></div>
    <div className='content'>
      <div className='welcome'>Hello There!</div>
      <div className='subtitle'>We're almost done. Before using our services you need to create an account.</div>
      <div className='input-fields'>
        <input type='text' placeholder='Username' name = 'username' className='input-line full-width' onChange={handleChange}></input>
        <input type='password' placeholder='Password' name="password" className='input-line full-width'onChange={handleChange}></input>
        <input type='email' placeholder='about' name = 'about' className='input-line full-width'onChange={handleChange}></input>


      </div>
      <div className='spacing'>have account?  <span className='highlight' onClick={()=>props.changeView("default")} >Login</span></div>
      {renderextrastuff()}
      <div><button className='ghost-round full-width' onClick = {()=>sendForm()}>Create Account</button></div>
    </div>
  </div>
</div>
        </div>
    )
}