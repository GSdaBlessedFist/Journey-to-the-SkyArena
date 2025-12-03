import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Lights({ nodes, materials, actions, ...props }) {
  if (!nodes || !materials) {
    console.warn('[Lights] nodes or materials not provided')
    return null
  }

  return (
    <group {...props}>
      <group name='COLLECTION_Lights'>
        <directionalLight
          intensity={2000.977}
          decay={2}
          position={[47.382, 108.131, -141.66]}
          rotation={[-Math.PI / 2, 0, 0]}
          target={nodes.mainBlimp_Spotlight.target}
        >
          <primitive object={nodes.mainBlimp_Spotlight.target} position={[0, 0, -1]} />
        </directionalLight>
        <spotLight
          intensity={605015.802}
          angle={Math.PI / 2}
          penumbra={1}
          decay={2}
          rotation={[-Math.PI / 2, 0, 0]}
          target={nodes.mainLight.target}
        >
          <primitive object={nodes.mainLight.target} position={[0, 0, -1]} />
        </spotLight>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Scene_title.glb')
