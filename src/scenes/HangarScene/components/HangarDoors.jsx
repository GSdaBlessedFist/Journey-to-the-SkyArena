import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import p from '@/lib/imported_utilities/helpers/consoleHelper'
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
        <group name='hangar_door_R' userData={{ name: 'hangar_door_R' }}>
          <mesh
            name='hangar_door_R_1'
            castShadow
            receiveShadow
            geometry={nodes.hangar_door_R_1.geometry}
            material={materials.WHITE}
            userData={{ isAnimated: true }}
          />
          <mesh
            name='hangar_door_R_2'
            castShadow
            receiveShadow
            geometry={nodes.hangar_door_R_2.geometry}
            material={materials.hangarDoors_beams}
            userData={{ isAnimated: true }}
          />
        </group>
        <group name='hangar_door_L' userData={{ name: 'hangar_door_L' }}>
          <mesh
            name='hangar_door_R002'
            castShadow
            receiveShadow
            geometry={nodes.hangar_door_R002.geometry}
            material={materials.WHITE}
            userData={{ isAnimated: true }}
          />
          <mesh
            name='hangar_door_R002_1'
            castShadow
            receiveShadow
            geometry={nodes.hangar_door_R002_1.geometry}
            material={materials.hangarDoors_beams}
            userData={{ isAnimated: true }}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Scene_hangar.glb')
