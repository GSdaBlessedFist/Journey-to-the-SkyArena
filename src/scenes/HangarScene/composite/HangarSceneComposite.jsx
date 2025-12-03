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
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import BlimpController from '../../../lib/controllers/BlimpController';
import p from '@/lib/helpers/consoleHelper'

const SOURCE = 'HangarSceneComposite'
const srcColor = [40, 56]

export default function HangarSceneComposite(props) {
  const { scene, nodes, materials, animations } = useGLTF('/models/Scene_hangar.glb')
  const group = useRef()
  const { actions } = useAnimations(animations, group)
  const pathRef = useRef()
  const emptyRef = useRef()
  const orchestratorRef = useRef()
  const blimpController = useRef(null)

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 136.71), // note how Y→Z
    new THREE.Vector3(0, 0, 5),
    new THREE.Vector3(0, 0, -275.22),
    new THREE.Vector3(-273.41, 0, -510.61),
  ])

  /////////////////////////////////////////////////////////////////////////
  // BLIMPERY
  /////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    blimpController.current = new BlimpController(curve)

    const onKeyDown = (e) => blimpController.current.handleKeyDown(e.code)
    const onKeyUp = (e) => blimpController.current.handleKeyUp(e.code)

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    const controller = blimpController.current
    controller.update(delta)

    emptyRef.current.position.copy(controller.position)
    emptyRef.current.quaternion.copy(controller.quaternion)
  })
  
  /////////////////////////////////////////////////
  // Hangar lights
  /////////////////////////////////////////////////
  const { spotlightIntensity } = useControls({
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

  return (
    <group ref={group} {...props} dispose={null}>
      <line>
        <bufferGeometry attach='geometry' setFromPoints={curve.getPoints(50)} />
        <lineBasicMaterial attach='material' color='yellow' />
      </line>
      <group name='PATHEMPTY' ref={emptyRef} position={[0.012, 0, -32.77]} userData={{ name: 'PATHEMPTY' }}>
        <Blimp scale={1} curve={curve} />
      </group>
      <group name='exitHangar_path' position={[0.012, 0, -34.311]} userData={{ name: 'exitHangar_path' }} />

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
          if (orchestratorRef.current?.startLiftoffSequence) {
            orchestratorRef.current.startLiftoffSequence()
          }
        }}
      />
      {/* <MotionGraphics nodes={nodes} materials={materials} actions={actions} /> */}

      <HangarOrchestrator ref={orchestratorRef} nodes={nodes} materials={materials} actions={actions} />
    </group>
  )
}

useGLTF.preload('/models/Scene_hangar.glb')
