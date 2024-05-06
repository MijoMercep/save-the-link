import { useState } from 'react'

import './App.css'
import { format } from 'date-fns';
import { Button, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import "./newStyle.css";





function App() {
  const [selected, setSelected] = useState(new Date())
  const [css, setCss] = useState(`
  .my-today { 
    
    background-color: white;
    color: black;

  }
`);

const changeColor = () => {
  setCss(`
    .my-today { 
      font-weight: bold;
      font-size: 140%; 
      color: white;
      background-color: green;
    }
  `);
};
  
  return (
    <>
    <style>{css}</style>
      <DayPicker
      
      mode="single"
      selected={selected}
      
      onSelect={setSelected}
      
      
      modifiersClassNames={{ today : "my-today"  }}
      
      
    />
    
    <button onClick={changeColor}>Save</button>
    </>
  )
}

export default App
