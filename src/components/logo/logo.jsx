import React from "react" ;


import logo from "./logo.jpg"
import './logo.css'
export default function Logo (){
    return (
        <div className="logo-container">
            <img src={logo} alt="boss"className="logo-img" />
        </div>
    )
}
