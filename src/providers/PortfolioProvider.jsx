'use client'
import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react'
import portfolioService from '../machines/portfolioService'
import p from '../lib/imported_utilities/helpers/consoleHelper'

const SOURCE = 'PortfolioProvider.jsx off'
const srcColor = [255, 45]

const PortfolioContext = createContext(null)

// --- Reducer ---
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

// --- Provider ---
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

  // --- Actions ---
  const setTimeOfDay = (value) => {
    p(SOURCE, 40, srcColor, value, 'setTimeOfDay called')
    dispatch({ type: 'SET_TIME_OF_DAY', value })
    portfolioService.send({ type: 'SET_SKY_CONDITIONS', timeOfDay: value })
  }

  // Explicit scene navigation
  const goToTitle = () => {
    dispatch({ type: 'SET_SCENE_NAME', value: 'title' })
    portfolioService.send({ type: 'ENTER_SCENE', sceneName: 'title_screen' })
  }
  const goToHangar = () => {
    dispatch({ type: 'SET_SCENE_NAME', value: 'hangar' })
    portfolioService.send({ type: 'ENTER_SCENE', sceneName: 'idle' })
  }
  const goToOutside = () => {
    dispatch({ type: 'SET_SCENE_NAME', value: 'outside' })
    portfolioService.send({ type: 'ENTER_SCENE', sceneName: 'outside' })
  }
  const goToChapterOne = () => {
    dispatch({ type: 'SET_SCENE_NAME', value: 'chapter_one' })
    portfolioService.send({ type: 'ENTER_SCENE', sceneName: 'chapter_one' })
  }
  const goToChapterTwo = () => {
    dispatch({ type: 'SET_SCENE_NAME', value: 'chapter_two' })
    portfolioService.send({ type: 'ENTER_SCENE', sceneName: 'chapter_two' })
  }
  const goToChapterThree = () => {
    dispatch({ type: 'SET_SCENE_NAME', value: 'chapter_three' })
    portfolioService.send({ type: 'ENTER_SCENE', sceneName: 'chapter_three' })
  }
  const goToFinalProjectDemo = () => {
    dispatch({ type: 'SET_SCENE_NAME', value: 'final_project_demo' })
    portfolioService.send({ type: 'ENTER_SCENE', sceneName: 'final_project_demo' })
  }

  const value = useMemo(
    () => ({
      state,
      dispatch,
      send: portfolioService.send.bind(portfolioService),
      setTimeOfDay,
      goToTitle,
      goToHangar,
      goToOutside,
      goToChapterOne,
      goToChapterTwo,
      goToChapterThree,
      goToFinalProjectDemo,
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
