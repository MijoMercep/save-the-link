import React from "react";
import "./App.css";
function LoginPage({ setLoginEmail, setLoginPassword, login, signup}){
  return(<>
      <h2>MainPage</h2>
      <div>
      <div className="body-container-output" >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="footer-curve"><path fill="#CDE1FF" fill-opacity="1" d="M0,160L60,154.7C120,149,240,139,360,154.7C480,171,600,213,720,218.7C840,224,960,192,1080,186.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="footer-curve-2"><path fill="#232b2b" fill-opacity="1" d="M0,160L60,154.7C120,149,240,139,360,154.7C480,171,600,213,720,218.7C840,224,960,192,1080,186.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
       </div>
        <h3>Login</h3>
        
        <input placeholder="email" onChange={(event) => {setLoginEmail(event.target.value)}}></input>
        <input placeholder="password" onChange={(event) => {setLoginPassword(event.target.value)}}></input>
        
          
          <button onClick={login}>Login</button>
          <button onClick={signup}>Sign Up</button>
      </div></>
  );
  
  }
  
export default LoginPage;