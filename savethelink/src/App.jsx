import { useState, useEffect } from "react";
import { summary } from 'date-streaks';
import "./App.css";
import { format } from "date-fns";
import { Button, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./newStyle.css";

const today = new Date();
const todayDate = today.toDateString();
const initialDates = [];

function App() {
  const [selected, setSelected] = useState(new Date());
  const [dates, setDates] = useState(initialDates);
  const [css, setCss] = useState(`
    .my-today { 
      background-color: white;
      color: black;
    }
  `);
  const [rerender, setRerender] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [dateOutput, setDateOutput] = useState(new Map());
  const mapArray = [];

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
    
        
        setRerender((prev) => !prev);}
        catch(error){
          if(error instanceof TypeError){
            window.alert("Select a date");
          }    }
    }
    
    
  };

  const valueOutput = () => {
    console.log(valueInput);
    console.log(dateOutput);
    console.log(selected);
    console.log(today.setDate(today.getDate()+1))
    console.log(dates);
    console.log(selected?.toDateString());
    console.log(dateOutput.get(selected.toDateString()));
    console.log(dates.slice(-1));
    console.log(summary({ dates }))
    dates.forEach(element => {
      console.log(element);
    });
  };

  return (
    <>
      <div>
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
      </div>
    </>
  );
}

export default App;
