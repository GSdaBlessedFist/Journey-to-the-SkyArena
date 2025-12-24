// 2025-12-18 09:32
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { useInstructions } from '@/providers/InstructionsProvider'
import p from '@/lib/imported_utilities/helpers/consoleHelper'
import CameraFadePortal from '@/scenes/sharedComponents/overlays/CameraFadePortal'
const SOURCE = 'HangarOrcestrator.jsx'
const srcColor = [240, 76]

const HangarOrchestrator = forwardRef(function HangarOrchestrator(
  { scene, nodes, materials, actions, cameraDirectorRef, requestFade, fadeMidpointRef, setFadeVisible },
  ref,
) {
  const { setInstructionsFor } = useInstructions()

  const api = useRef({})
  const runwayLightsRef = useRef(scene.getObjectByName('runway_strip_lights'))
  const flashing = useRef(false)

  // -------------------------------
  // Fade orchestration state
  // -------------------------------

  const domain = 'hangar'

  // -------------------------------
  // Orchestrator API
  // -------------------------------
  useEffect(() => {
    //---------------------------------------------
    // Hangar doors open
    //---------------------------------------------
    api.current.openHangarDoors = () => {
      const doorAction = actions?.['hangarDoors_OpeningAction']

      if (doorAction) {
        doorAction.reset()
        doorAction.setLoop(THREE.LoopOnce)
        doorAction.clampWhenFinished = true
        doorAction.play()
      }

      setTimeout(() => {
        api.current.showLaunchPrompt?.()
        api.current.runwayLightsFlash?.()
      }, 2000)
    }

    //---------------------------------------------
    // Runway lights
    //---------------------------------------------
    api.current.runwayLightsFlash = () => {
      flashing.current = true
    }

    //---------------------------------------------
    // Blimp movement
    //---------------------------------------------
    api.current.moveBlimp = () => {
      const blimpMove = actions?.['BAKED_BlimpEmptyAction']

      if (blimpMove) {
        blimpMove.reset()
        blimpMove.setLoop(THREE.LoopOnce)
        blimpMove.clampWhenFinished = true
        blimpMove.play()
      }
    }

    //---------------------------------------------
    // Launch prompt + input
    //---------------------------------------------
    api.current.showLaunchPrompt = () => {
      setInstructionsFor({ domain, stage: 'blimpMove', fadeOut: false })
      window.addEventListener('keydown', handleLaunchKey)
    }

    const handleLaunchKey = (e) => {
      if (e.key !== 'w' && e.key !== 'W') return

      // Start blimp motion
      api.current.moveBlimp?.()

      // Schedule cinematic beat → fade
      setTimeout(() => {
        requestFade(() => {
          cameraDirectorRef.current?.cutTo('outside1_camera_1')
          // After switch, fade out
          setTimeout(() => setFadeVisible(false), 2500)
        })
      }, 1750)

      setInstructionsFor({ domain, stage: 'blimpMove', fadeOut: true })
      window.removeEventListener('keydown', handleLaunchKey)
    }
  }, [actions, cameraDirectorRef, setInstructionsFor, requestFade, setFadeVisible])

  // -------------------------------
  // Runway light animation
  // -------------------------------
  useFrame(({ clock }) => {
    if (!flashing.current || !runwayLightsRef.current) return
    const t = clock.getElapsedTime()
    runwayLightsRef.current.emissiveIntensity = Math.abs(Math.sin(t / 2)) * 15 + 5
  })

  // -------------------------------
  // Expose orchestrator API
  // -------------------------------
  useImperativeHandle(ref, () => api.current)

  return null
})

export default HangarOrchestrator
