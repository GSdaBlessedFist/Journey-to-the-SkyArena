'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import p from '../lib/helpers/consoleHelper'
import instructionsMap from '@/scenes/sharedComponents/instructionsMap';

const SOURCE = 'InstructionsProvider.jsx '
const srcColor = [75, 45]

const InstructionsContext = createContext(null)

export function InstructionsProvider({ children }) {
  const [instructionsFor, setInstructionsFor] = useState('null')

  useEffect(() => {
    if (instructionsMap) console.log(instructionsMap)
      const instruction = Object.keys(instructionsMap).filter(i=>{return i})
    console.log('instruction: ', instruction)
  }, [instructionsFor])

    return (
      <InstructionsContext.Provider value={{ instructionsFor, setInstructionsFor }}>
        {children}
      </InstructionsContext.Provider>
    )
}

export function useInstructions() {
  return useContext(InstructionsContext)
}
