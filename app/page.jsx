'use client'

import * as THREE from 'three'
import { Html, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { usePortfolio } from '../src/providers/PortfolioProvider'
import { LIGHTS, getTimeOfDay } from '../src/lib/helpers/getTimeOfDay'
import Skybox from '@/scenes/sharedComponents/Skybox'
import { a, useSpring } from '@react-spring/three'
import { Leva } from 'leva'
import Overlay from '@/scenes/sharedComponents/Overlay'

const TitleSceneComposite = dynamic(() => import('../src/scenes/TitleScene/composite/TitleSceneComposite'), {
  ssr: false,
  loading: () => <Html>Loading Title Scene...</Html>,
})

const HangarSceneComposite = dynamic(() => import('../src/scenes/HangarScene/composite/HangarSceneComposite'), {
  ssr: false,
  loading: () => <Html>Loading Hangar...</Html>,
})

export default function Page() {
  const { state } = usePortfolio()
  if (!state) return null // or a loading fallback

  const sceneName = state.sceneName
  const timeOfDay = state.timeOfDay || 'night'
  const currentLight = LIGHTS[timeOfDay] || getTimeOfDay().lightSetting

  // 🔆 Use one spring object for all lighting-related values, including shader gradients
  const spring = useSpring({
    to: {
      bgBottom: currentLight.bgBottom,
      bgTop: currentLight.bgTop,
      ambientColor: currentLight.ambientColor,
      ambientIntensity: currentLight.ambientIntensity,
    },
    config: { mass: 1, tension: 120, friction: 20 },
  })

  return (
    <div className='h-screen w-full'>
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Skybox with animated gradient */}
          <Skybox lightSetting={{ label: timeOfDay }} spring={spring} />

          {/* Smooth ambient light transition */}
          <a.ambientLight
            color={spring.ambientColor.to((c) => new THREE.Color(c))}
            intensity={spring.ambientIntensity}
          />

          {/* Directional light with stable intensity */}
          <directionalLight position={[100, 120, 50]} color={'#ffffff'} intensity={0.8} castShadow />

          {/* Scenes */}
          {sceneName === 'title' && <TitleSceneComposite />}
          {sceneName === 'hangar' && <HangarSceneComposite />}
        </Suspense>
        
      </Canvas>
      <Overlay sceneName={sceneName} timeSetting={timeOfDay.toLowerCase()} />

      {/* Overlay UI */}

      <Leva
        collapsed={false}
        hidden={false}
        fill={false}
        style={{
          position: 'relative',
          top: 0,
          right: 0,
          zIndex: 9999, // ensures it renders above Overlay and Canvas
        }}
      />
    </div>
  )
}
