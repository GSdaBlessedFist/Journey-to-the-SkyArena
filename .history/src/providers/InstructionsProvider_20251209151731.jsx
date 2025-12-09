'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import p from '../lib/helpers/consoleHelper'
import instructionsMap from '@/scenes/sharedComponents/instructionsMap';

const SOURCE = 'InstructionsProvider.jsx '
const srcColor = [75, 45]

const InstructionsContext = createContext(null)

export function InstructionsProvider({ children }) {
  const [instructionsFor, setInstructionsFor] = useState([])

  useEffect(() => {
    const instruction  = instructionsMap.[instructionsFor[0]].[instructionsFor[1]];
    p(SOURCE,16,srcColor,instruction)
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
