import React from 'react'
import './login.css';

export default function Loginandsignupform(props) {
    return (
        <div>
            <div className="background-two link-container">

<a className="link-two" href="#" onClick = {()=>props.changeView("default")}>Login</a>
</div>
<div className="background-three link-container">
<a className="link-three" href="#" onClick = {()=>props.changeView("signup")}>Signup</a>
</div>
        </div>
    )
}
