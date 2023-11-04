import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({solution}) {
    const {currentGuess , handlekey,press,guess,isCorrect,turn,usedKeys} = useWordle(solution)
    const [showModal,setShowModal] = useState(false);
    useEffect(()=>{
      window.addEventListener('keyup',handlekey)
      if(isCorrect){
        setTimeout(() => {
          setShowModal(true);
        }, 2000);
        window.addEventListener('keyup',handlekey)
      }
      if(turn>5){
        setTimeout(() => {
          setShowModal(true);
        }, 2000);
        window.addEventListener('keyup',handlekey)
      }
      


      return () => window.removeEventListener('keyup',handlekey)
    },[handlekey])


  return (
    <div>
    <Grid    guess = {guess}   currentGuess = {currentGuess} turn = {turn} />
    <Keypad usedKeys = {usedKeys} />
    {showModal && <Modal isCorrect={isCorrect} turn={turn} solution = {solution} />}
    </div>
    
  )
}
