'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import getNestedValue from '@/lib/helpers/getNestedValue';
import instructionsMap from '@/scenes/sharedComponents/instructions/instructionsMap';
import p from '../lib/helpers/consoleHelper'

const SOURCE = 'InstructionsProvider.jsx '
const srcColor = [75, 45]

const InstructionsContext = createContext(null)

export function InstructionsProvider({ children }) {
  const [instructionsFor, setInstructionsFor] = useState({})
  const [activeInstructionObj,setActiveInstructionObj] = useState({});

  useEffect(() => {
    if (!instructionsFor.domain || !instructionsFor.stage) return

    const found = instructionsMap[instructionsFor.domain]?.[instructionsFor.stage]

    setActiveInstructionObj({
      ...found,
      fadeOut: instructionsFor.fadeOut,
    })
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
