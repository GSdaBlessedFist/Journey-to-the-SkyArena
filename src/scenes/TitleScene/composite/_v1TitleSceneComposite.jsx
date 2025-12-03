'use client'
import React, { useEffect, useRef } from 'react'
import { useGLTF, PerspectiveCamera, useAnimations, Environment } from '@react-three/drei'
import Clouds from '../components/Clouds.jsx'
import Blimp from '../../sharedComponents/Blimp.jsx'
import { usePortfolio } from '../../../providers/PortfolioProvider'
import { LIGHTS } from '../../../lib/helpers/getTimeOfDay'
import p from '../../../lib/helpers/consoleHelper.js'

const SOURCE = 'TitleSceneComposite'
const srcColor = [34, 34]

export default function TitleSceneComposite(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Scene_title.glb')
  const { actions } = useAnimations(animations, group)

  const {state}= usePortfolio()
  const { timeOfDay } = state

  const envRef = useRef()

  // Logging
  p(SOURCE, 26, srcColor, timeOfDay, 'timeOfDay')

  // optional cleanup
  useEffect(() => {
    return () => envRef.current?.dispose?.()
  }, [timeOfDay])

  return (
    <group ref={group} {...props}>
      <group key={timeOfDay}>
        <Environment // forces re-mount when timeOfDay changes
          files={LIGHTS[timeOfDay].hdr}
          background
          ref={envRef}
        />
      </group>

      {/* Ambient light */}
      <ambientLight color={LIGHTS[timeOfDay].ambientColor} intensity={LIGHTS[timeOfDay].ambientIntensity} />

      {/* Scene objects */}
      <Clouds nodes={nodes} materials={materials} />
      <Blimp nodes={nodes} materials={materials} actions={actions} />
      <PerspectiveCamera
        name='SceneCamera'
        makeDefault={true}
        far={700}
        near={0.1}
        fov={19.157}
        position={[109.102, 16.724, -229.452]}
        rotation={[2.662, 1.001, -2.729]}
        userData={{ name: 'SceneCamera', prop: 1 }}
      />
    </group>
  )
}

useGLTF.preload('/models/Scene_title.glb')
