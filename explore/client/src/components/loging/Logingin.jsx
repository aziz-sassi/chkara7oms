import React from 'react';
import { useState,useEffect } from 'react';
import Content from './Content.jsx';
import Login from './login.jsx';



export default function Logingin(props) {
    const [view,setView]= useState("notLogged");
    const changeView = (option)=>{
     setView(option);
    }
    const renderstuff = ()=>{
        if (view === "notLogged") {
            return <Login changeView = {props.changeView}/>;
        }
        else if (view === "Match"){

            return <Content changeView = {props.changeView}/>;
        }
       
    }
    return (
        <div>
           
           
            {renderstuff()}
        </div>
    )
}
