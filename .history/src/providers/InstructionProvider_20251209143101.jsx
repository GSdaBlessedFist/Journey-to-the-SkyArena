'use client'
import { createContext, useContext, useState } from 'react'

const InstructionsContext = createContext(null)

export function InstructionsProvider({ children }) {
  const [instructionsFor, setInstructionsFor] = useState('null')

  return (
    <InstructionsContext.Provider value={{ instructionsFor, setInstructionsFor }}>
      {children}
    </InstructionsContext.Provider>
  )
}

export function useInstructions() {
  return useContext(InstructionsContext)
}
