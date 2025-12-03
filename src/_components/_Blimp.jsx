import { useSpring, animated, useSpringValue } from '@react-spring/three'
import { Line, useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import p from '../lib/helpers/consoleHelper'
//p(sourceName: any, line: any, hue: number, data: any, variableName?: string)
const SOURCE = 'Blimp '
const srcColor = '213'

export default function Blimp({ setStage,stage }) {
  const groupRef = useRef()
  const { scene, nodes, materials, animations } = useGLTF('/scene_hangar.glb')

  const { actions, clips, name } = useAnimations(animations, groupRef)

  useEffect(() => {
    actions['propellersAction']?.reset().play()
  }, [actions])

  useEffect(() => {
    if(stage == "exitHangar"){
      console.log(stage)
      if(actions){
        actions['blimpActions'].reset().play()
      }
      
    }
  }, [stage])

  return (
    <>
      <group ref={groupRef} name='BLIMP' userData={{ name: 'BLIMP' }}>
        <group name='PATHEMPTY' position={[0.012, 0, -32.77]} userData={{ name: 'PATHEMPTY' }} />
        <group name='exitHangar_path' position={[0.012, 0, -34.311]} userData={{ name: 'exitHangar_path' }} />
        <mesh name='balloon' castShadow envMapIntensity={0} receiveShadow geometry={nodes.balloon.geometry} material={materials.WHITE} position={[0.353, 13.134, -27.252]} userData={{ name: 'balloon' }} >
          <mesh name='landingGear' castShadow envMapIntensity={0} receiveShadow geometry={nodes.landingGear.geometry} material={nodes.landingGear.material} position={[-0.011, -13.032, 29.005]} userData={{ name: 'landingGear' }} />
          <group name='propellers' position={[-0.011, 0.532, 19.561]} userData={{ name: 'propellers' }}>
            <mesh name='propellers_1' castShadow envMapIntensity={0} receiveShadow geometry={nodes.propellers_1.geometry} material={materials.WHITE} />
            <mesh name='propellers_2' castShadow envMapIntensity={0} receiveShadow geometry={nodes.propellers_2.geometry} material={materials.propellor} />
          </group>
        </mesh>
      </group>
    </>
  )
}