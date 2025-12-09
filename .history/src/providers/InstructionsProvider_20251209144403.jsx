'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import {instructionsMap} from '../scenes/sharedComponents/instructionsMap';
import p from '../lib/helpers/consoleHelper'

const SOURCE = 'InstructionsProvider.jsx '
const srcColor = [75, 45]

const InstructionsContext = createContext(null)

export function InstructionsProvider({ children }) {
  const [instructionsFor, setInstructionsFor] = useState('null')

  useEffect(()=>{
    if (instructionsMap) console.log('HERE')
  },[])
    return (
      <InstructionsContext.Provider value={{ instructionsFor, setInstructionsFor }}>
        {children}
      </InstructionsContext.Provider>
    )
}

export function useInstructions() {
  return useContext(InstructionsContext)
}
