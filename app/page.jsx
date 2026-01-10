'use client'

import * as THREE from 'three'
import { Html, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense, useRef, useState } from 'react'
import { LIGHTS, getTimeOfDay } from '../src/lib/helpers/getTimeOfDay'
import Skybox from '@/scenes/sharedComponents/Skybox'
import BloomComposer from '@/scenes/sharedComponents/postProcessingEffects/BloomComposer'
import { a, useSpring } from '@react-spring/three'
import { Leva } from 'leva'
import Overlay from '@/scenes/sharedComponents/overlays/Overlay'
import { useSelector } from '@xstate/react'
import { PortfolioActorContext } from '@/actors/PortfolioActorContext'
import p from '@/lib/imported_utilities/helpers/consoleHelper';

const SOURCE = 'page.js';
const srcColor = [95, 35];

const TitleSceneComposite = dynamic(() => import('../src/scenes/TitleScene/composite/TitleSceneComposite'), {
  ssr: false,
  loading: () => <Html>Loading Title Scene...</Html>,
})

const HangarSceneComposite = dynamic(() => import('../src/scenes/HangarScene/composite/HangarSceneComposite'), {
  ssr: false,
  loading: () => <Html>Loading Hangar...</Html>,
})

export default function Page() {
  const portfolioState = PortfolioActorContext.useSelector((state) => state)
  if (!portfolioState) return null // or a loading fallback

  const sceneName = portfolioState.context.sceneName
  const timeOfDay = portfolioState.context.timeOfDay || 'night'
  const currentLight = LIGHTS[timeOfDay] || getTimeOfDay().lightSetting


  p(SOURCE,42,srcColor,portfolioState,"portfolioState")

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
          {sceneName === 'hangar' && (
            <HangarSceneComposite/>
          )}
        </Suspense>
        {/* <BloomComposer/> */}
      </Canvas>
      <Overlay sceneName={sceneName} timeSetting={timeOfDay.toLowerCase()} />

      {/* Overlay UI */}
    </div>
  )
}
