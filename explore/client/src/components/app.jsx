import React, { Component }  from 'react';
import { useState,useEffect } from 'react';
import Signup from './signup.jsx';
import Logingin from './loging/Logingin.jsx';
import './app.css';
import Content from './loging/Content.jsx'
import Particles from 'react-particles-js';
import Loginandsignupform from './loging/loginandsignupform.jsx';




export default function App() {

  const [view,setView] = useState("default");

  const changeView = (option) =>{
setView(option);
  }

  const renderView = () =>{
    if (view==="signup") {
      return <div><Loginandsignupform changeView = {changeView}/> <Signup changeView = {changeView}/></div>
    }
    else if (view==="Match"){
      return <Content/>

    }
    return<div> <Loginandsignupform changeView = {changeView}/> ,<Logingin changeView = {changeView}/></div>

  }



  return (
    
    <div>

      


{renderView()}
<Particles className="animation"
        params={{
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 1000,
              }
            },
          },
        }}
        
      />
   
    </div>
  )
}
