"use client"
import { createContext, useContext, useState } from 'react'

const InstructionContext = createContext(null)

export function InstructionProvider({ children }) {
  const [instruction, setInstruction] = useState(null)

  return <InstructionContext.Provider value={{ instruction, setInstruction }}>{children}</InstructionContext.Provider>
}

export function useInstruction() {
  return useContext(InstructionContext)
}
