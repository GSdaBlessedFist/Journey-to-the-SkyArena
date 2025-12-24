'use client'
import React, { useEffect, useRef } from 'react'
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei'

import Clouds from '../components/Clouds.jsx'
// import Blimp from '../components/Blimp.jsx'
import Lights from '../components/Lights.jsx'

import { usePortfolio } from '../../../providers/PortfolioProvider'
import { LIGHTS } from '../../../lib/helpers/getTimeOfDay'
import p from '../../../lib/imported_utilities/helpers/consoleHelper'
import { Leva } from 'leva'

const SOURCE = 'TitleSceneComposite'
const srcColor = [34, 34]

export default function TitleSceneComposite(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/Scene_title.glb')
  const { state } = usePortfolio()
  const { timeOfDay } = state


  return (
    <group ref={group} {...props}>
      <Lights timeOfDay={timeOfDay} />

      {/* Scene assets */}
      <Clouds nodes={nodes} materials={materials} />
      {/* <Blimp nodes={nodes} materials={materials} /> */}
      
      {/* Camera */}
      <PerspectiveCamera
        name='SceneCamera'
        makeDefault={true}
        far={700}
        near={0.1}
        fov={19.157}
        position={[109.102, 16.724, -229.452]}
        rotation={[2.662, 1.001, -2.729]}
      />
    </group>
  )
}

useGLTF.preload('/models/Scene_title.glb')
