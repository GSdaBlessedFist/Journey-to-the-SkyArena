// /src/scenes/HangarScene/composite/HangarOrchestrator.jsx

import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import * as THREE from "three";
import { useInstructions } from '@/providers/InstructionsProvider';
import p from '@/lib/helpers/consoleHelper'
import { useFrame } from '@react-three/fiber';

const SOURCE = 'HangarOrcestrator.jsx'
const srcColor = [240, 76]
/**
 * HangarOrchestrator:
 * This component exposes a set of scene-control functions
 * that can be called from other components (like HangarMenu).
 */

const HangarOrchestrator = forwardRef(function HangarOrchestrator({scene,nodes,materials,actions},ref){
  const {setInstructionsFor} = useInstructions();
  const api = useRef({})
  const runwayLightsRef = useRef(scene.getObjectByName('runway_strip_lights'))
  const domain = 'hangar';
  const flashing = useRef(false)

  // useEffect(()=>{
    

  // },[actions])

   useEffect(() => {
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
         api.current.runwayLightsFlash?.()
       }, 2000)
     }
     //---------------------------------------------
     // Runway lights
     //---------------------------------------------
     api.current.runwayLightsFlash = () =>{
      flashing.current = true
      p(SOURCE, 53, srcColor, scene.getObjectByName('runway_strip_lights'))
      

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
     api.current.showLaunchPrompt = () => {
       p(SOURCE, 66, srcColor, 'SHOW PROMPT')
       //setInstructionsFor([domain,"blimpMove"])
       setInstructionsFor({ domain, stage: 'blimpMove', fadeOut: false })

       window.addEventListener('keydown', handleLaunchKey)
     }
     const handleLaunchKey = (e) => {
       if (e.key === 'w' || e.key === 'W') {
         setTimeout(() => {
           api.current.moveBlimp?.()
         }, 1750)
         setInstructionsFor({ domain, stage: 'blimpMove', fadeOut: true })
         window.removeEventListener('keydown', handleLaunchKey)
       }
     }
     //---------------------------------------------
     //---------------------------------------------
     api.current.playCutscene = () => {}
   }, [setInstructionsFor])

  //Expose API upward
  useImperativeHandle(ref, () => api.current)

  useFrame(({ clock }) => {
    if (!flashing.current) return // ⬅ do nothing until activated

    const t = clock.getElapsedTime()
    runwayLightsRef.current.emissiveIntensity = Math.abs(Math.sin(t / 2)) * 15 + 5.0
    
  })

  return null
})

export default HangarOrchestrator;