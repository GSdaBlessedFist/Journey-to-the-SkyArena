
// 2025-12-18 10:12
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

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

import p from '@/lib/imported_utilities/helpers/consoleHelper'
import { useDeltaLogger } from '@/lib/imported_utilities/hooks/useDeltaLogger'

const SOURCE = 'HangarSceneComposite'
const srcColor = [40, 56]

export default function HangarSceneComposite({ fadeVisible, setFadeVisible, fadeMidpointRef, ...props }) {
  const groupRef = useRef()
  const blimpRef = useRef()
  const { scene, nodes, materials, animations } = useGLTF('/models/Scene_hangar.glb')
  const { actions } = useAnimations(animations, groupRef)

  const cameraDirectorRef = useRef()
  const orchestratorRef = useRef()

  // DELTA LOGGING
  //const setWatch = useDeltaLogger({ fadeVisible }, [])

  const { camera } = useThree()

  const requestFade = (onMidpoint) => {
    fadeMidpointRef.current = onMidpoint
    setFadeVisible(true)
  }

  /////////////////////////////////////////////////
  // Hangar lights
  /////////////////////////////////////////////////
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

  //-----------------------------------------------------------------------
  //-----------------------------------------------------------------------
  //-----------------------------------------------------------------------

  // useEffect(() => {
  //   setWatch(['fadeVisible'])
  // }, [])

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
        requestFade={requestFade} // passed to orchestrator if needed
        fadeMidpointRef={fadeMidpointRef}
        setFadeVisible={setFadeVisible}
      />
    </group>
  )
}

useGLTF.preload('/models/Scene_hangar.glb')
