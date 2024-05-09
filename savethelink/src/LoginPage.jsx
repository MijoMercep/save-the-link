import React from "react";

function LoginPage({ setLoginEmail, setLoginPassword, login}){
  return(<>
      <h2>MainPage</h2>
      <div>
        <h3>Login</h3>
        
        <input placeholder="email" onChange={(event) => {setLoginEmail(event.target.value)}}></input>
        <input placeholder="password" onChange={(event) => {setLoginPassword(event.target.value)}}></input>
        
          
          <button onClick={login}>Login</button>
      </div></>
  );
  
  }
  
export default LoginPage;