import React, { useState } from 'react';
import axios from 'axios';
import './login.css';


export default function Login(props) {

    const [ formData, setformData ] = useState({
        username : "",
        password : "",
      
    });
    const [isLoggedIn,setisLoggedIn] = useState("default");
    const [checkInfos , setcheckInfos] = useState("");

const handleChange = (e) => {

    setformData({...formData, [e.target.name ]: e.target.value})
    console.log(formData,e.target.value);
 


};
const logingInfos = () => {
  if (checkInfos === "not valid"){
    return <p className = "inputerr">please fill the inputs</p>

  }

}
const loggedinrenderer = () => {
if (isLoggedIn === "true"){
  return <p>authentication completed successfully click to   <button onClick={()=>props.changeView("Match")}>go forward</button></p>

}
else if(isLoggedIn === "false"){
return <p>authentication failed please try again</p>
}
}

const sendForm = ()=>{
  if (formData.username === ""|| formData.password==="") {
    setcheckInfos("not valid")

    
  }
  axios.post("/loginForm",formData)

  .then(response=>{
    console.log("hhhh",response.data);
    
  if (response.data==="Match") {
    setisLoggedIn("true")

    
  }
  else if (response.data==="notLogged"){
    setisLoggedIn("false")

  }
  })
  .catch(err=>{
    throw err
  })

}

    return (
      
      <div>
            <div className='bold-line'></div>
<div className='container'>
  <div className='window'>
    <div className='overlay'></div>
    <div className='content'>
      <div className='welcome'>Login</div>
      <div className='subtitle'>Login so you can use our futures</div>
      <div className='input-fields'>
        <input type='text' placeholder='Username' name="username" className='input-line full-width'  onChange={handleChange}/>
        <input type='password' placeholder='Password'  name="password" className='input-line full-width' onChange={handleChange}></input>
       


      </div>
      <div className='spacing'>or if you don't have an account <span className='highlight' onClick={()=>props.changeView("signup")}>Signup</span></div>
      {logingInfos()}
      {loggedinrenderer()}
      <div><button className='ghost-round full-width' onClick={()=>sendForm()}>Login</button></div>
    </div>
  </div>
</div>
        </div>
    )
}
