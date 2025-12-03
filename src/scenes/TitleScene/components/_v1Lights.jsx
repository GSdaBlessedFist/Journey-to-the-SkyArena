
import React, { useEffect, useRef } from 'react'
import { Leva, useControls } from 'leva'
import { useGLTF, LightHelper, OrbitControls } from '@react-three/drei'
import { LIGHTS } from '@/lib/helpers/getTimeOfDay'
import p from '../../../lib/helpers/consoleHelper'

const SOURCE = 'Title_Lights'
const srcColor = [24, 44]

export default function Lights({ nodes, materials, actions, timeOfDay, ...props }) {
  const mainLightRef = useRef()
  //-------------------------------------------------------
  const mainLightConfig = LIGHTS[timeOfDay]?.sceneTitle?.mainLight || {}

  const { color, intensity, x, y, z } = useControls(`Main Light (${timeOfDay})`, {
    color: {
      value: mainLightConfig.color || '#ffffff',
    },
    intensity: {
      value: mainLightConfig.intensity ?? 1,
      min: 0,
      max: 10000,
      step: 100,
    },
    x: { value: -290.728, min: -500, max: 500, step: 1 },
    y: { value: 376.085, min: -200, max: 500, step: 1 },
    z: { value: -57.241, min: -500, max: 500, step: 1 },
  })

  useEffect(() => {
    p(SOURCE, 31,srcColor,color,"color")
  }, [])


  if (!nodes || !materials) {
    console.warn('[Lights] nodes or materials not provided')
    return null
  }

  return (
    <group {...props}>
      <group name='COLLECTION_Lights' userData={{ name: 'COLLECTION_Lights' }}>
        <directionalLight
          intensity={2000.977}
          decay={2}
          position={[47.382, 108.131, -141.66]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: 'mainBlimp_Spotlight' }}
          target={nodes.mainBlimp_Spotlight.target}
        >
          <primitive object={nodes.mainBlimp_Spotlight.target} position={[0, 0, -1]} />
        </directionalLight>
        <spotLight
          ref={mainLightRef}
          name='mainLight'
          color={color}
          intensity={intensity}
          angle={1.042}
          penumbra={1}
          decay={2}
          position={[x, y, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: 'Spot' }}
          target={nodes.Spot.target}
        >
          <primitive object={nodes.Spot.target} position={[0, 0, -1]} />
        </spotLight>
        <LightHelper light={mainLightRef} args={[0xff0000]} />
      </group>
      
    </group>
  )
}

useGLTF.preload('/models/Scene_title.glb')
