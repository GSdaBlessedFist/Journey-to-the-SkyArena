'use client'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei'
import HangarOrchestrator from './HangarOrchestrator'
import Blimp from '../../sharedComponents/Blimp'

import Cameras from '../components/Cameras.jsx'
import Environment from '../components/Environment.jsx'
import HangarDoors from '../components/HangarDoors.jsx'
import HangarLights from '../components/HangarLights.jsx'
import HangarMenu from '../components/HangarMenu.jsx'
import MotionGraphics from '../components/MotionGraphics.jsx'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import p from '@/lib/helpers/consoleHelper'
import BlimpController from '@/lib/controllers/BlimpController'

const SOURCE = 'HangarSceneComposite'
const srcColor = [40, 56]

export default function HangarSceneComposite(props) {
  const groupRef = useRef()
  const blimpRef = useRef()
  const { scene, nodes, materials, animations } = useGLTF('/models/Scene_hangar.glb')
  const { actions, mixer } = useAnimations(animations, groupRef)
  
  
  const orchestratorRef = useRef()
  

  const { camera } = useThree()

  
  const { spotlightIntensity, offsetX, offsetY, offsetZ } = useControls({
    spotlightIntensity: { value: 2500, min: 0, max: 5000 },
    // offsetX: { value: 0, min: -150, max: 150, step: 0.1 },
    // offsetY: { value: 5, min: -50, max: 50, step: 0.1 },
    // offsetZ: { value: 10, min: -150, max: 150, step: 0.1 },
  })


  
  /////////////////////////////////////////////////
  // Hangar lights
  /////////////////////////////////////////////////
  
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

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group name='BLIMPEMPTY_placeholder' position={[0.012, 0, -32.77]}>
        <Blimp ref={blimpRef} scale={1} />
      </group>

      {/* Core scene components */}
      <Cameras nodes={nodes} materials={materials} actions={actions} />
      <Environment nodes={nodes} materials={materials} actions={actions} />
      <HangarDoors nodes={nodes} materials={materials} actions={actions} />
      <HangarLights nodes={nodes} materials={materials} actions={actions} spotlightIntensity={spotlightIntensity} />
      <HangarMenu
        nodes={nodes}
        materials={materials}
        actions={actions}
        onLiftoff={() => {
          if (orchestratorRef.current?.openHangarDoors) {
            orchestratorRef.current.openHangarDoors()
          }
        }}
      />
      {/* <MotionGraphics nodes={nodes} materials={materials} actions={actions} /> */}

      <HangarOrchestrator ref={orchestratorRef} scene={scene} nodes={nodes} materials={materials} actions={actions} />
    </group>
  )
}

useGLTF.preload('/models/Scene_hangar.glb')
