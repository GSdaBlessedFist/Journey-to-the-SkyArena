import React, { useEffect, useRef } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import Clouds from '../components/Clouds.jsx'
import Blimp from '../../sharedComponents/Blimp.jsx'
import { usePortfolio } from '../../../providers/PortfolioProvider'
import { LIGHTS } from '../../../lib/helpers/getTimeOfDay'
import { a, useSpring } from '@react-spring/three'
import p from '../../../lib/helpers/consoleHelper'

const SOURCE = 'TitleSceneComposite'
const srcColor = [34, 34]

export default function TitleSceneComposite(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Scene_title.glb')
  const { state } = usePortfolio()
  const { timeOfDay } = state

  // smooth color + intensity interpolation
  const { ambientColor, ambientIntensity, dirColor, dirIntensity, bgColor } = LIGHTS[timeOfDay]
  const { color, intensity, background } = useSpring({
    color: ambientColor,
    intensity: ambientIntensity,
    background: bgColor ?? ambientColor,
    config: { mass: 1, tension: 120, friction: 20 },
  })

  useEffect(() => {
    p(SOURCE, 28, srcColor, timeOfDay, 'lighting mode')
  }, [timeOfDay])

  return (
    <a.group ref={group} {...props}>
      {/* background color reacts to spring */}
      <a.color attach='background' args={[background]} />

      {/* smooth ambient light */}
      <a.ambientLight color={color} intensity={intensity} />

      {/* single key directional light */}
      <directionalLight position={[100, 120, 50]} color={dirColor} intensity={dirIntensity} castShadow />

      <Clouds nodes={nodes} materials={materials} />
      <Blimp nodes={nodes} materials={materials} />

      <PerspectiveCamera
        name='SceneCamera'
        makeDefault
        far={700}
        near={0.1}
        fov={19.157}
        position={[109.102, 16.724, -229.452]}
        rotation={[2.662, 1.001, -2.729]}
      />
    </a.group>
  )
}

useGLTF.preload('/models/Scene_title.glb')
