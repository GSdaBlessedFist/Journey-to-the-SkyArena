'use client'
import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react'
import portfolioService from '../machines/portfolioService'
import p from '../lib/helpers/consoleHelper'

const SOURCE = 'PortfolioProvider.jsx'
const srcColor = [255, 45]

const PortfolioContext = createContext(null)

// --- Reducer ---
function portfolioReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FROM_MACHINE':
      return { ...state, ...action.payload }
    case 'SET_TIME_OF_DAY':
      return { ...state, timeOfDay: action.value }
    case 'SET_SCENE_NAME':
      return { ...state, sceneName: action.value }
    case 'SET_ON_CHAPTER':
      return { ...state, onChapter: action.value }
    default:
      return state
  }
}

export function PortfolioProvider({ children }) {
 const initialContext = portfolioService.getSnapshot().context
 const [state, dispatch] = useReducer(portfolioReducer, initialContext)

  // 🔹 Subscribe to machine context updates
  useEffect(() => {
    const subscription = portfolioService.subscribe(({ context, changed }) => {
      if (!changed) return
      dispatch({ type: 'UPDATE_FROM_MACHINE', payload: context })
    })

    return () => subscription.unsubscribe()
  }, [])

  //---------------actions---------------------
  const setTimeOfDay = (value) => {
    dispatch({ type: 'SET_TIME_OF_DAY', value })
    portfolioService.send({ type: 'SET_SKY_CONDITIONS', timeOfDay: value })
  }

  const goToScene = (sceneName) => {
    p(SOURCE, 48, srcColor, sceneName, 'Going to')
    dispatch({ type: 'SET_SCENE_NAME', value: sceneName })
    portfolioService.send({ type: 'ENTER_SCENE', sceneName })
  }

  // 🔹 Provide state + dispatch + send to components
  const value = useMemo(
    () => ({
      state,
      dispatch,
      send: portfolioService.send.bind(portfolioService),
      setTimeOfDay,
      goToScene,
    }),
    [state],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

// --- Hook ---
export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
