import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { CloudShaderMaterial } from '../../sharedComponents/materials/CloudMaterial'
import * as THREE from 'three'

export default function Clouds({ nodes, materials, actions, ...props }) {
  if (!nodes || !materials) {
    console.warn('[Clouds] nodes or materials not provided')
    return null
  }
  

  return (
    <group {...props}>
      <group name='COLLECTION_Clouds' userData={{ name: 'COLLECTION_Clouds' }}>
        <group name='cloud_foreground' position={[-43.321, 40.583, -94.093]} userData={{ name: 'cloud_foreground' }} />
        <mesh
          name='cloud_midground'
          castShadow
          receiveShadow
          geometry={nodes.cloud_midground.geometry}
          material={materials['Clouds.001']}
          position={[0, 32.49, 95.438]}
          rotation={[-0.022, 0.272, 0.081]}
          userData={{ name: 'cloud_midground' }}
        />
        <mesh
          name='cloud_background'
          castShadow
          receiveShadow
          geometry={nodes.cloud_background.geometry}
          material={materials['Clouds.001']}
          position={[-207.323, 77.638, -97.142]}
          rotation={[-0.351, -0.068, -0.735]}
          scale={0.345}
          userData={{ name: 'cloud_background' }}
        />
        <mesh
          name='clouds_wayBackground'
          castShadow
          receiveShadow
          geometry={nodes.clouds_wayBackground.geometry}
          material={materials['Clouds.001']}
          position={[-81.458, 0, -12.801]}
          userData={{ name: 'clouds_wayBackground' }}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/Scene_title.glb')
