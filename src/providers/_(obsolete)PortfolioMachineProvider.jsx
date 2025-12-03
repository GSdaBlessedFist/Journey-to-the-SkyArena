// src/providers/PortfolioMachineProvider.jsx
"use client"
import { createContext, useContext, useEffect } from 'react'
import { useActorRef, useSelector } from '@xstate/react'
import { portfolioService } from '../machines/portfolioService'
import p from '../lib/helpers/consoleHelper.js'

const SOURCE = 'PortfolioMachineProvider.jsx'
const srcColor = [220, 80]
const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {

  return <PortfolioContext.Provider value={portfolioService}>
    {children}
  </PortfolioContext.Provider>
}

export function usePortfolioMachine() {
  return useContext(PortfolioContext)
}
