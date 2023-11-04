import { useState } from "react"

const useWordle = (solution) => {

    
    const [history, setHistory] = useState([]);
    const [isCorrect , setisCorrect] = useState(false);
    const [turn , setTurn] = useState(0);
    const [currentGuess , setCurrentGuess] = useState('');
    const [guess, setGuess] = useState([...Array(6)]);
    const [press , setpress] = useState(false);
    const [usedKeys,setUsedKeys] = useState({})


 


    console.log(guess);
    const formatguess = () =>{
        setpress(true);
        let solutionArray  = [...solution]
        let formatedGuess = [...currentGuess].map((i)=>{
            return {key:i , color:'grey'};
        })

        formatedGuess.forEach((l,i)=>{
            if(solutionArray[i]===l.key){
                l.color = 'green';
                solutionArray[i] = null;
            }
        })
        formatedGuess.forEach((l,i)=>{
            if(solutionArray.includes(l.key)&& l.color!== 'green'){
                l.color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        })
        return formatedGuess;

        }



    const addnewGuess = (result) => {
        if(currentGuess===solution){
            setisCorrect(true);
        }
        setGuess((prev)=>{
            let newGuess = [...prev]
            newGuess[turn] = result;
            return newGuess;

        })
        setHistory((prevHistory)=>{
            return [...prevHistory,currentGuess]
        })
        setTurn((prevturn)=>{
            return prevturn+1;
        })
        setUsedKeys((i)=>{
            let newKeys = {...i}
            
            result.forEach((l)=>{
                const currentColor = newKeys[l.key]

                if(l.color==='green'){
                    newKeys[l.key] = 'green';
                    return 
                }
                 if(l.color==='yellow' && currentColor!=='green'){
                    newKeys[l.key] = 'yellow';
                    return
                 }
                 if(l.color==='grey'&& l.color!=='yellow' && l.color!=='green'){
                    newKeys[l.key] = 'grey'
                    return
                 }
            })
            return newKeys;
        })
        setCurrentGuess('');

    }


    const handlekey = (e) => {

        if(e.key==='Enter'){
            if(turn>5){
                alert("You used all your gueses");
                return;
            }
            if(history.includes(currentGuess))
            {
                alert("You already tried this word");
                return;
            }

            if(currentGuess.length!==5){
                alert("Word must be 5 chars long");
                return;

            }
           const result =  formatguess();
           addnewGuess(result);
           
        }

        if(e.key==='Backspace'){
            setCurrentGuess((prev)=>{
                return prev.slice(0,-1);
            })
            return;
        }
        // RegEx is used for checking the string pattern
        if(/^[A-Za-z]$/.test(e.key)){
            if(currentGuess.length<5){
                setCurrentGuess((prev)=>{
                    return prev + e.key;
                })
            }
        }

    }

    return {turn , currentGuess,isCorrect,handlekey, press,guess,usedKeys}
}

export default useWordle;
