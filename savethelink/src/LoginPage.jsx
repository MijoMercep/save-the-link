import React from "react";
import "./App.css";
function LoginPage({ setLoginEmail, setLoginPassword, login, signup}){
  return(<>
      
      <div>
      <div className="header">
      <h1>Don't break the chain!</h1>
<h2>Save the habit</h2>
<svg xmlns="http://www.w3.org/2000/svg" className="header-curve-login" viewBox="0 0 1440 320"><path fill="#CDE1FF" fill-opacity="1" d="M0,32L60,37.3C120,43,240,53,360,101.3C480,149,600,235,720,234.7C840,235,960,149,1080,138.7C1200,128,1320,192,1380,224L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
       </div>

       
        <div className="body-login">
        
        <h1 className="login-header">Login</h1>
          <div className="div-input">
        <input placeholder="E-Mail" onChange={(event) => {setLoginEmail(event.target.value)}} className="input-type"></input>
        </div>
        <div className="div-input">
        <input placeholder="Password" type="password"onChange={(event) => {setLoginPassword(event.target.value)}} className="input-type"></input>
        </div>
       
        
          <div className="div-login-btn"><button onClick={login} className="login-btn">Login</button></div>
          <div className="register-text"><p>Don't have an account? <a onClick={signup}>Register</a></p></div>
          </div>
      </div></>
  );
  
  }
  
export default LoginPage;