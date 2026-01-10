// 2026-01-07 03:38
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import { FadeActorContext } from '@/actors/FadeActorContext'
import { useInstructions } from '@/providers/InstructionsProvider'

const SOURCE = 'HangarOrchestrator.jsx'

const HangarOrchestrator = forwardRef(function HangarOrchestrator(
  { scene, actions, cameraDirectorRef, fadeMidpointRef },
  ref,
) {
  const { setInstructionsFor } = useInstructions()

  // -------------------------------
  // Global fade actor
  // -------------------------------
  const fadeActor = FadeActorContext.useActorRef()

  // -------------------------------
  // Local refs
  // -------------------------------
  const api = useRef({})
  const flashing = useRef(false)
  const runwayLightsRef = useRef(scene.getObjectByName('runway_strip_lights'))

  // -------------------------------
  // Orchestrator API
  // -------------------------------
  useEffect(() => {
    api.current.openHangarDoors = () => {
      const doorAction = actions?.['hangarDoors_OpeningAction']
      if (!doorAction) return

      doorAction.reset()
      doorAction.setLoop(THREE.LoopOnce)
      doorAction.clampWhenFinished = true
      doorAction.play()

      setTimeout(() => {
        api.current.showLaunchPrompt?.()
        api.current.runwayLightsFlash?.()
      }, 2000)
    }

    api.current.runwayLightsFlash = () => {
      flashing.current = true
    }

    api.current.moveBlimp = () => {
      const blimpMove = actions?.['BAKED_BlimpEmptyAction']
      if (!blimpMove) return

      blimpMove.reset()
      blimpMove.setLoop(THREE.LoopOnce)
      blimpMove.clampWhenFinished = true
      blimpMove.play()
    }

    api.current.showLaunchPrompt = () => {
      setInstructionsFor({
        domain: 'hangar',
        stage: 'blimpMove',
        fadeOut: false,
      })

      window.addEventListener('keydown', handleLaunchKey)
    }

    const handleLaunchKey = (e) => {
      if (e.key !== 'w' && e.key !== 'W') return

      api.current.moveBlimp?.()

      // -------------------------------
      // Fade → camera cut → fade in
      // -------------------------------
      setTimeout(()=>{
        fadeActor.send({
          type: 'START_FADE',
          fadeType: 'SHORT',
          onMidpoint: () => {
            cameraDirectorRef.current?.cutTo('outside2_camera_1')
          },
        })
      },2500)

      setInstructionsFor({
        domain: 'hangar',
        stage: 'blimpMove',
        fadeOut: true,
      })

      window.removeEventListener('keydown', handleLaunchKey)
    }
  }, [actions, cameraDirectorRef, fadeActor, setInstructionsFor])

  // -------------------------------
  // Runway light animation
  // -------------------------------
  useFrame(({ clock }) => {
    if (!flashing.current || !runwayLightsRef.current) return

    const t = clock.getElapsedTime()
    runwayLightsRef.current.emissiveIntensity = Math.abs(Math.sin(t / 2)) * 15 + 5
  })

  useImperativeHandle(ref, () => api.current)

  return null
})

export default HangarOrchestrator
