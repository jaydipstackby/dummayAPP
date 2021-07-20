import React,{useState} from 'react'
import { Select } from './Components/Democomponents'

function App() {
const [state, setstate] = useState([])

  const options = [
    { label: "chocolate", value: 'chocolate', id: 1, color: "#000000" },
    { label: "strawberry", value: 'strawberry', id: 2, color: "#FFEB3B" },
    { label: "vanilla", value: 'vanilla', id: 3, color: "#FD823E" },
    { label: "Banana", value: 'Banana', id: 4, color: "#8BC34A" },
    { label: "Mango", value: 'Mango', id: 5, color: "#FFEB3B" },
  ];

  const collaboratorOptions = [
    { label: "chocolate", value: 'chocolate', id: 1, profileImage: "" },
    { label: "strawberry", value: 'strawberry', id: 2, profileImage: "" },
    { label: "vanilla", value: 'vanilla', id: 3, profileImage: "" },
    { label: "Banana", value: 'Banana', id: 4, profileImage: "" },
    { label: "Mango", value: 'Mango', id: 5, profileImage: "" },
  ];

  const handleChange = (e) => {
    console.log(e);
  }

  return (
    <div style={{margin: "50px"}}>
      <Select
        value={state}
        onChange={handleChange}
        option={options}
        type='select'
        inputPlaceholder="select option"
        isOpenOption={false}
        colorDisable={false}
         disableColorCode="white"
      />   

 {/* <Select
          value={state}
          onChange={handleChange}
          option={options}
          type ='multiSelect'
          inputPlaceholder="select option"
          isOpenOption={false}
          colorDisable={false}
          disableColorCode="white"
         /> */}

    </div>
  )
}

export default App


