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


function MainPage({logout, user}){
  const initialDates = [];

    const [selected, setSelected] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [css, setCss] = useState(`
    .my-today { 
      background-color: white;
      color: black;
    }
  `);
  const [rerender, setRerender] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [dateOutput, setDateOutput] = useState(new Map());
  const [initialDate, setInitialDate] = useState();
 
  const mapArray = [];

  
const getInitialDate = async()=>{
  try{const userDocRef = doc(collection(db, "users"), user.uid);
  const docSnapshot = await getDoc(userDocRef);
  
  let data = docSnapshot.data();
  console.log(data.mapField)
  const mapFieldEntries = Object.entries(data.mapField);
  const mapFieldMap = new Map(mapFieldEntries);
  setDateOutput(mapFieldMap);
  console.log(user);
  console.log(data)
  console.log(data.initialDate);
  setDates(data.initialDate)
  
  console.log()
  console.log(data.mapField);
}catch(error){console.log(user);}
  
}


useEffect(()=>{
  
  getInitialDate();
 console.log(dates);
}, [user]);



const HandleAdd = async () => {
  const userId = user.uid;
  let userDocRef = doc(collection(db, "users"), userId);
  console.log(dateOutput);
  const dateOutputObject = Object.fromEntries(dateOutput);
  console.log(dateOutputObject)
  console.log(Object.entries(dateOutputObject));
  let firestoreMap = new Map(Object.entries(dateOutputObject));
  
  console.log(firestoreMap);
  await setDoc(userDocRef, { initialDate: dates,
    mapField: dateOutputObject
   });
  console.log("Document written with ID: ", userDocRef.id);
  console.log(initialDate);
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
        font-size: 140%; 
        color: white;
        background-color: green;
      }
    `);
  }, [rerender]);
  
  const changeColor = () => {
    if(valueInput != ""){
      try{
        
        const formattedDate = selected.toDateString();
        const newMap = new Map(dateOutput);
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

  const valueOutput = () => {
    console.log(data.mapField)
    console.log(dateOutput);
   
   
    console.log(dates);
    
    console.log(dateOutput.get(selected.toDateString()));
    
    console.log(user?.email);
    console.log(user.uid)
    console.log(user);
    
    dates.forEach(element => {
      console.log(element);
    });
  };

    return(
        <>
        <div>

        <style>{css}</style>
        <p>User logged in: {user?.email}</p>
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
          <button onClick={changeColor}>Save</button>
        </div>
        <button onClick={valueOutput}>Ispis</button>
      </div>
      <div className="input-div">
        <textarea
          className="text-input"
          placeholder="Type your achievement..."
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        ></textarea>
        <p>Your message on: {selected?.toDateString()}</p>
        <p>{dateOutput.get(selected?.toDateString())}</p>
        <p>Current Streak: {summary(dates).currentStreak}</p>
        <p>Longest Streak: {summary(dates).longestStreak}</p>
        <button onClick={logout}>Logout</button>
      </div></>
    )
}

export default MainPage;