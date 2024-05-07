import { useState, useEffect } from 'react'

import './App.css'
import { format } from 'date-fns';
import { Button, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
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
  useEffect(() => {
    setCss(`
      .my-today { 
        font-weight: bold;
        font-size: 140%; 
        color: white;
        background-color: green;
      }
    `);console.log(dates);
  }, [rerender]); 

  const changeColor = () => {
    
    if(selected.toDateString() == todayDate && valueInput != ""){
      const updatedDates = [...dates, selected];
      setDates(updatedDates);
      setRerender(prev => !prev); 
    }
    
    
  };
const valueOutput = () => {
  console.log(valueInput);
}
  return (
    <>
      <div>
        <style>{css}</style>
        <DayPicker
          mode="single"
          selected={dates}
          onSelect={setSelected}
          modifiersClassNames={{
            
            selected: 'my-today',
          }}
        />
        <div className='button-div'><button onClick={changeColor}>Save</button></div>
        <button onClick={valueOutput}>Ispis</button>
      </div>
      <div className='input-div'>
        <textarea className='text-input' placeholder='Type your achievement...' value={valueInput} onChange={e => setValueInput(e.target.value)}></textarea>

      </div>
    </>
  );
}

export default App;
