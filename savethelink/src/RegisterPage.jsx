function SignUp({setRegisterEmail, setRegisterPassword, register, goToLogin, setUserName}){
  
    return(

        <div>

<div className="header">
      <h1>Don't break the chain!</h1>
<h2>Save the habit</h2>
<svg xmlns="http://www.w3.org/2000/svg" className="header-curve-login" viewBox="0 0 1440 320"><path fill="#CDE1FF" fill-opacity="1" d="M0,32L60,37.3C120,43,240,53,360,101.3C480,149,600,235,720,234.7C840,235,960,149,1080,138.7C1200,128,1320,192,1380,224L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
       </div>

       <div className="body-login" >
       <h1 className="login-header" style={{marginTop: "5%" }}>Register</h1>
       <div className="div-input"><input placeholder="Name" className="input-type" onChange={(event) => {setUserName(event.target.value)}}></input></div>
       <div className="div-input"><input placeholder="E-mail" onChange={(event) => {setRegisterEmail(event.target.value)}} className="input-type"></input></div>
       <div className="div-input"><input placeholder="Password" onChange={(event) => {setRegisterPassword(event.target.value)}} className="input-type"></input></div>
       <div className="div-login-btn"><button onClick={register} className="login-btn">Register</button></div>
        
       <div className="register-text" style={{marginTop: "-5%" }}><p>Already have an account? <a onClick={goToLogin} >Login</a></p></div>  
       </div>

      
          

        </div>

    );
}

export default SignUp;