import { useState, useEffect } from "react";
import { summary } from 'date-streaks';
import "./App.css";
import { format } from "date-fns";
import { Button, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./newStyle.css";
import SignUp from "./RegisterPage";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "./firebase-config";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";


function App() {
  
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const[user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

}, [])
  const register = async () => {
    try{
      const user =  await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(user);
      navigate("main");
    }
    catch (error)
    {console.log(error.message)}
    
  }
  const login = async () => {
    try{
      const user =  await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user);
      navigate("main");
     console.log(registerEmail);
     
     }
      
      catch(error){
       console.log(registerEmail);
       console.log(error.message);
      }
  }
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  }
  

  

  return (
    <>
    <Routes>
      
    <Route path='/signup' element={<SignUp setRegisterEmail={setRegisterEmail}
    setRegisterPassword={setRegisterPassword}
  register={register}></SignUp>}/>
  <Route path="/" element={<LoginPage setLoginEmail={setLoginEmail}
        setLoginPassword={setLoginPassword}
        
        login={login}></LoginPage>}></Route>
<Route path="/main" element={<MainPage logout={logout} user={user}></MainPage>}></Route>
      
     </Routes>
    </>
  );
}

export default App;
