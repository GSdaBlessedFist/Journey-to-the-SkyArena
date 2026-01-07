// 2026-01-07 03:25
'use client'

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

import HangarOrchestrator from './HangarOrchestrator'
import Blimp from '../../sharedComponents/Blimp'
import Cameras from '../components/Cameras.jsx'
import Environment from '../components/Environment.jsx'
import HangarDoors from '../components/HangarDoors.jsx'
import HangarLights from '../components/HangarLights.jsx'
import HangarMenu from '../components/HangarMenu.jsx'
import CameraDirector from './CameraDirector'
import CameraFadePortal from '@/scenes/sharedComponents/overlays/CameraFadePortal'
import { useLevaControls } from '../../../providers/LevaProvider'

import { FadeActorContext } from '@/actors/FadeActorContext'

const SOURCE = 'HangarSceneComposite'

export default function HangarSceneComposite({ fadeMidpointRef, ...props }) {
  const groupRef = useRef()
  const blimpRef = useRef()
  const cameraDirectorRef = useRef()
  const orchestratorRef = useRef()

  const { scene, nodes, materials, animations } = useGLTF('/models/Scene_hangar.glb')

  const { actions } = useAnimations(animations, groupRef)

  // -------------------------------
  // Fade actor (global)
  // -------------------------------
  const fadeActor = FadeActorContext.useActorRef()
  const fadeState = FadeActorContext.useSelector((state) => state)

  // -------------------------------
  // Hangar lights
  // -------------------------------
  const { spotlightIntensity } = useLevaControls('Hangar lighting', {
    spotlightIntensity: { value: 2500, min: 0, max: 5000 },
  })

  useEffect(() => {
    if (!scene) return

    scene.traverse((obj) => {
      if (obj.isLight && obj.name.includes('hangar')) {
        obj.intensity = spotlightIntensity
      }
    })
  }, [scene, spotlightIntensity])

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Blimp placeholder */}
      <group name='BLIMPEMPTY_placeholder' position={[0.012, 0, -32.77]}>
        <Blimp ref={blimpRef} scale={1} />
      </group>

      {/* Core scene components */}
      <Cameras nodes={nodes} materials={materials} actions={actions} cameraDirectorRef={cameraDirectorRef} />

      <Environment nodes={nodes} materials={materials} actions={actions} />

      <HangarDoors nodes={nodes} materials={materials} actions={actions} />

      <HangarLights nodes={nodes} materials={materials} actions={actions} spotlightIntensity={spotlightIntensity} />

      <HangarMenu
        nodes={nodes}
        materials={materials}
        actions={actions}
        onLiftoff={() => orchestratorRef.current?.openHangarDoors?.()}
      />

      {/* Camera director */}
      <CameraDirector ref={cameraDirectorRef} />

      {/* Hangar orchestrator */}
      <HangarOrchestrator
        ref={orchestratorRef}
        cameraDirectorRef={cameraDirectorRef}
        scene={scene}
        nodes={nodes}
        materials={materials}
        actions={actions}
        fadeMidpointRef={fadeMidpointRef}
      />

      {/* Fade overlay */}
      <CameraFadePortal  />
    </group>
  )
}

useGLTF.preload('/models/Scene_hangar.glb')
