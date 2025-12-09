// /src/scenes/HangarScene/composite/HangarOrchestrator.jsx

import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import * as THREE from "three";
import p from '@/lib/helpers/consoleHelper'

const SOURCE = 'HangarOrcestrator.jsx'
const srcColor = [240, 76]
/**
 * HangarOrchestrator:
 * This component exposes a set of scene-control functions
 * that can be called from other components (like HangarMenu).
 */

const HangarOrchestrator = forwardRef(function HangarOrchestrator({nodes,materials,actions},ref){
  const api = useRef({})

  // useEffect(()=>{
  //   p(SOURCE, 19, srcColor, actions)
  // },[actions])

  //---------------------------------------------
  // Hangar doors open
  //---------------------------------------------
  api.current.openHangarDoors = () => {
    p(SOURCE, 19, srcColor, 'Liftoff sequence started')

    //Hangar door animation
    const doorAction = actions?.['hangarDoors_OpeningAction']
    if (doorAction) {
      doorAction.reset()
      doorAction.setLoop(THREE.LoopOnce)
      doorAction.clampWhenFinished = true
      doorAction.play()
      p(SOURCE, 29, srcColor, 'Doors opening')
    } else {
      console.warn('[HangarOrchestrator :31] No door action found')
    }

    setTimeout(() => {
      api.current.showLaunchPrompt?.()
    }, 1500)
  }
  //---------------------------------------------
  // Blimp move
  //---------------------------------------------
  api.current.moveBlimp = () => {
    p(SOURCE, 35, srcColor, 'Blimp moving out')

    //Blimp path follow animation
    const blimpMove = actions?.['BAKED_BlimpEmptyAction']
    if (blimpMove) {
      blimpMove.reset()
      blimpMove.setLoop(THREE.LoopOnce)
      blimpMove.clampWhenFinished = true
      blimpMove.play()
      p(SOURCE, 47, srcColor, 'Blimp heading out')
    } else {
      console.warn('[HangarOrchestrator :31] No blimp action found')
    }
  }
  //---------------------------------------------
  // Show Launch prompt
  //---------------------------------------------
  api.current.showLaunchPrompt = () =>{
    
  }

  api.current.playCutscene = () => {}

  //Expose API upward
  useImperativeHandle(ref, () => api.current)

  return null
})

export default HangarOrchestrator;