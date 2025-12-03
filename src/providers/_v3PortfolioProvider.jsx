'use client'
import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react'
import portfolioService from '../machines/portfolioService'
import p from '../lib/helpers/consoleHelper'

const SOURCE = 'PortfolioProvider.jsx'
const srcColor = [255, 45]

const PortfolioContext = createContext(null)

function portfolioReducer(state, action) {
  p(SOURCE, 15, srcColor, action, 'portfolioReducer called')
  switch (action.type) {
    case 'UPDATE_FROM_MACHINE':
      return { ...state, ...action.payload }
    case 'SET_TIME_OF_DAY':
      return { ...state, timeOfDay: action.value }
    case 'SET_SCENE_NAME':
      return { ...state, sceneName: action.value }
    default:
      return state
  }
}

export function PortfolioProvider({ children }) {
  const initialContext = portfolioService.getSnapshot()?.context || {}
  p(SOURCE, 25, srcColor, initialContext, 'initialContext')
  const [state, dispatch] = useReducer(portfolioReducer, initialContext)

  // Subscribe to machine updates
  useEffect(() => {
    const subscription = portfolioService.subscribe((snapshot) => {
      p(SOURCE, 30, srcColor, snapshot, 'Machine snapshot')
      if (!snapshot.changed) return
      dispatch({ type: 'UPDATE_FROM_MACHINE', payload: snapshot.context })
    })
    return () => subscription.unsubscribe()
  }, [])

  const setTimeOfDay = (value) => {
    p(SOURCE, 40, srcColor, value, 'setTimeOfDay called')
    dispatch({ type: 'SET_TIME_OF_DAY', value })
    portfolioService.send({ type: 'SET_SKY_CONDITIONS', timeOfDay: value })
  }

  const goToScene = (sceneName) => {
    p(SOURCE, 50, srcColor, sceneName, 'goToScene called')
    dispatch({ type: 'SET_SCENE_NAME', value: sceneName })
    portfolioService.send({ type: 'ENTER_SCENE', sceneName: sceneName })
  }

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

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
