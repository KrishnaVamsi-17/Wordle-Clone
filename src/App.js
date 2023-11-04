import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

function App() {
  const [sol, setSol] = useState(null);
  useEffect(()=>{
    fetch("https://krishnavamsi-17.github.io/host_api/db.json")
    .then(res=>{
      return res.json();
    })
    .then(data=>{
        //console.log(data);
        const word = data.solutions;
       const randno = word[Math.floor(Math.random()*word.length)]
      // console.log(randno)
       setSol(randno.word);
    })
  },[setSol])
  return (
    <div className="App">
      <h1>Wordle (Lingo)</h1>
      {sol && <Wordle solution = {sol} />}
    </div>
  );
}

export default App;


