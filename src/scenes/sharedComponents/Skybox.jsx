import React, { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import {DaySkyMaterial} from './materials/DaySkyShader'
import {NightSkyMaterial} from './materials/NightSkyShader'
import * as THREE from "three"


export default function Skybox({ lightSetting, spring }) {
  const meshRef = useRef()
  const materialRef = useRef()

  
  useFrame(() => {
    if (!materialRef.current) return

    const updateColor = (uniform, value) => {
      const color = new THREE.Color()
      if (Array.isArray(value)) {
        color.setRGB(value[0], value[1], value[2])
      } else {
        color.set(value) // handles hex string or color name
      }
      uniform.value.copy(color)
    }

    updateColor(materialRef.current.uniforms.colorBottom, spring.bgBottom.get())
    updateColor(materialRef.current.uniforms.colorTop, spring.bgTop.get())
  })

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 64, 64]} />
      {lightSetting.label === 'day' ? (
        <DaySkyMaterial ref={materialRef} />
      ) : (
        <NightSkyMaterial ref={materialRef}  />
      )}
    </mesh>
  )
}
