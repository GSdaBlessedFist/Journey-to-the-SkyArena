'use client'

import * as THREE from 'three'
import { Environment, Html, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { usePortfolio } from '../src/providers/PortfolioProvider'
import { getTimeOfDay } from '../src/lib/helpers/getTimeOfDay'
import { useControls,Leva } from 'leva'

import p from '@/lib/helpers/consoleHelper'
import Overlay from '@/scenes/Overlay'

const SOURCE = 'page.jsx off'
const srcColor = [130]

const TitleSceneComposite = dynamic(() => import('../src/scenes/TitleScene/composite/TitleSceneComposite'), {
  ssr: false,
  loading: () => <Html>Loading Title Scene...</Html>
})

const HangarSceneComposite = dynamic(() => import('../src/scenes/HangarScene/composite/HangarSceneComposite'), {
  ssr: false,
  loading: () => <Html>Loading Hangar...</Html>,
})

export default function Page() {
  const { state } = usePortfolio()
  const sceneName = state.sceneName
  const { label, lightSetting } = getTimeOfDay()

  
  useEffect(() => {
    p(SOURCE, 33, srcColor, `Good ${label}`)
    p(SOURCE, 34, srcColor, lightSetting, 'lightSettings')
    p(SOURCE,37,srcColor,sceneName,"sceneName ")
  }, [sceneName])

  return (
    <div className='h-screen w-full'>
      <Leva collapsed={false} />
      <Canvas style={{ backgroundColor: lightSetting.bgColor }} shadows>
        <Suspense fallback={null}>
          <Environment
            files={lightSetting.hdr ? lightSetting.hdr : undefined}
            preset={lightSetting.hdr ? undefined : lightSetting.preset}
          />

          <ambientLight color={lightSetting.ambientColor} intensity={lightSetting.ambientIntensity} />
          {/* -------------------SCENES------------------- */}
          {sceneName === 'title' && <TitleSceneComposite />}
          {sceneName === 'hangar' && <HangarSceneComposite />}
        </Suspense>
      </Canvas>
      {/* --- Overlay (HTML UI) --- */}
      <Overlay sceneName={sceneName} timeSetting={label.toLowerCase()} />
    </div>
  )
}


