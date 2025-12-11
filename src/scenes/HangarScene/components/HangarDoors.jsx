import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import p from '@/lib/helpers/consoleHelper'
import { useThree } from '@react-three/fiber'

const SOURCE = 'HangarDoors off'
const srcColor = [240, 56]

export default function HangarDoors({ nodes, materials, actions, ...props }) {
  if (!nodes || !materials) {
    console.warn('[HangarDoors] nodes or materials not provided')
    return null
  }
  const { scene } = useThree()
  useEffect(()=>{
    p(SOURCE,15,srcColor,scene)
  },[])

  return (
    <group {...props}>
      <group name='COLLECTION_HangarDoors' userData={{ name: 'COLLECTION_HangarDoors' }}>
        <mesh
          name='hangar_door_L'
          castShadow
          receiveShadow
          geometry={nodes.hangar_door_L.geometry}
          material={materials.WHITE}
          position={[15.47, 0, -79.29]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-49.846, -61.268, -5.68]}
          userData={{ isAnimated: true, name: 'hangar_door_L' }}
        />
        <mesh
          name='hangar_door_R'
          castShadow
          receiveShadow
          geometry={nodes.hangar_door_R.geometry}
          material={materials.WHITE}
          position={[-14.916, 0, -79.29]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-49.846, -61.268, -5.68]}
          userData={{ isAnimated: true, name: 'hangar_door_R' }}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/Scene_hangar.glb')
