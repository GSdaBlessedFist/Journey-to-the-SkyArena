import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function MotionGraphics({ nodes, materials, actions, ...props }) {
  if (!nodes || !materials) {
    console.warn('[MotionGraphics] nodes or materials not provided')
    return null
  }

  return (
    <group {...props}>
      <group name='COLLECTION_MotionGraphics' userData={{ name: 'COLLECTION_MotionGraphics' }}>
        <mesh
          name='Plane'
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={nodes.Plane.material}
          position={[-96.795, 2.413, -181.444]}
          rotation={[1.571, -0.037, -1.556]}
          scale={[68.327, 25.897, 9.602]}
          userData={{ name: 'Plane' }}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/Scene_hangar.glb')
