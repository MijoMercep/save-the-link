function SignUp({setRegisterEmail, setRegisterPassword, register}){
    return(

        <div>


        <h3>Register User</h3>
        <input placeholder="name"></input>
        <input placeholder="email" onChange={(event) => {setRegisterEmail(event.target.value)}}></input>
        <input placeholder="password" onChange={(event) => {setRegisterPassword(event.target.value)}}></input>
          <button onClick={register}>Register</button>
      
          

        </div>

    );
}

export default SignUp;