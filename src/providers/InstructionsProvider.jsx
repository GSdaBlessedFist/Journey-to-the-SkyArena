'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import p from '../lib/helpers/consoleHelper'
import getNestedValue from '@/lib/helpers/getNestedValue';
import instructionsMap from '@/scenes/sharedComponents/instructionsMap';

const SOURCE = 'InstructionsProvider.jsx '
const srcColor = [75, 45]

const InstructionsContext = createContext(null)

export function InstructionsProvider({ children }) {
  const [instructionsFor, setInstructionsFor] = useState([])
  const [activeInstructionObj,setActiveInstructionObj] = useState();

  useEffect(() => {
    
   setActiveInstructionObj(instructionsMap?.[instructionsFor[0]]?.[instructionsFor[1]])
  }, [instructionsFor])

  const values = {
    setInstructionsFor,
    activeInstructionObj,// {instructions,styles}
  }

    return (
      <InstructionsContext.Provider value={values}>
        {children}
      </InstructionsContext.Provider>
    )
}

export function useInstructions() {
  return useContext(InstructionsContext)
}
