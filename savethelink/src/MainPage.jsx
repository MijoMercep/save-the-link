import React from "react";
import { useState, useEffect } from "react";
import { summary } from 'date-streaks';
import "./App.css";
import { format } from "date-fns";
import { Button, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { onAuthStateChanged } from 'firebase/auth';
import "./newStyle.css";
import { collection, getDocs, addDoc, doc, setDoc, getDoc} from "firebase/firestore"; 
import {db} from "../../savethelink/src/firebase-config"


const today = new Date();
const todayDate = today.toDateString();


function MainPage({logout, user, userName}){
  const initialDates = [];
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [selected, setSelected] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [css, setCss] = useState(`
    .my-today { 
      background-color: black;
      color: black;
    }
  `);
  const [rerender, setRerender] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [dateOutput, setDateOutput] = useState(new Map());
  const [initialDate, setInitialDate] = useState();
  let userNameOutput;
  const mapArray = [];

  
const getInitialDate = async()=>{
  try{const userDocRef = doc(collection(db, "users"), user.uid);
  const docSnapshot = await getDoc(userDocRef);
  
  let data = docSnapshot.data();
  
  const mapFieldEntries = Object.entries(data.mapField);
  const mapFieldMap = new Map(mapFieldEntries);
  setDateOutput(mapFieldMap);
  
  setDates(data.initialDate)
  userNameOutput = data.userName;
 console.log(userNameOutput)
  
}catch(error){console.log(user);}
  
}


useEffect(()=>{
  
  getInitialDate();
 
}, [user]);



const HandleAdd = async () => {
  const userId = user.uid;
  let userDocRef = doc(collection(db, "users"), userId);
  
  const dateOutputObject = Object.fromEntries(dateOutput);
  
  
  
  
  
  await setDoc(userDocRef, { initialDate: dates,
    mapField: dateOutputObject,
    userName: userName
    
   });
   
} 


useEffect(() => {
  if (dates.length > 0) {
    HandleAdd();
  }
}, [dates, dateOutput]);


  useEffect(() => {
    setCss(`
      .my-today { 
        font-weight: bold;
        font-size: 120%; 
        color: black;
        
        text-decoration: line-through;
      }
    `);
  }, [rerender]);
  
  const changeColor = () => {
    if(valueInput != ""){
      try{
        
        const formattedDate = selected.toDateString();
        const newMap = new Map(dateOutput);
        console.log(newMap);
        newMap.set(selected?.toDateString(), valueInput);
        setDateOutput(newMap);
        mapArray.push(newMap);
        if (!dates.includes(formattedDate)) {
          const updatedDates = [...dates, formattedDate];
          setDates(updatedDates);
        }
        HandleAdd();
        
        setRerender((prev) => !prev);}
        catch(error){
          if(error instanceof TypeError){
            window.alert("Select a date");
          }    }

          
          
    }
    
    
  };

  
    
 

    return(
        <>
        <div className = "header">
          <h1>Don't break the chain!</h1>
<h2>Save the habit</h2>
        <svg className="header-curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#CDE1FF" fill-opacity="1" d="M0,224L80,218.7C160,213,320,203,480,213.3C640,224,800,256,960,245.3C1120,235,1280,181,1360,154.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        
        </div>
        <img className="header-profile" src="/images/profile-svg.svg" onMouseEnter={() => setProfileVisible(true)}></img>
        <div className={`profile-show ${isProfileVisible ? 'visible' : ''}`}
        onMouseLeave={() => setProfileVisible(false)}><p>User: {user.userName}</p>
        <button onClick={logout} className="logout-btn">Logout</button></div>
        <div className="body-container">
        
        <style>{css}</style>
        
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          modifiers={{
            myToday: (date) => dates.includes(date.toDateString()),
          }}
          modifiersClassNames={{
            myToday: "my-today",
          }}
        />
        <div className="button-div">
        <button onClick={changeColor} className="save-button">Save</button>
        </div>
        
      
      <div className="input-div">
        <textarea
          className="text-input"
          
          value={valueInput}
          placeholder={dateOutput.get(selected?.toDateString()) || "Type your achievement..."}
          onChange={(e) => setValueInput(e.target.value)}
        >

        </textarea>
        
      </div>
      <div className="body-container-output">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="footer-curve"><path fill="#CDE1FF" fill-opacity="1" d="M0,160L60,154.7C120,149,240,139,360,154.7C480,171,600,213,720,218.7C840,224,960,192,1080,186.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="footer-curve-2"><path fill="#232b2b" fill-opacity="1" d="M0,160L60,154.7C120,149,240,139,360,154.7C480,171,600,213,720,218.7C840,224,960,192,1080,186.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>

        <div className="body-footer">
          <div className="body-footer-current">
            <p>Current Streak:</p>
            <p> {summary(dates).currentStreak}</p>
          </div>
          
          <div className="body-footer-longest"><p>Longest Streak:</p>
          <p> {summary(dates).longestStreak}</p></div>
          <button onClick={logout}>Logout</button>
          <p className="description-text">Welcome to Don't Break the Chain, the ultimate tool to help you stay motivated and productive every day! Our web app is designed to encourage consistency and foster a sense of accomplishment by allowing you to log your daily achievements.</p>
          
          <p className="built-by-text">Built by <a className="name-text">Mijo</a> | <a href="https://github.com/MijoMercep">
          <img className="github-logo" src="/images/github.svg"></img></a></p>
          
          
          

        </div>
        
        </div></div></>
      
    )
}

export default MainPage;