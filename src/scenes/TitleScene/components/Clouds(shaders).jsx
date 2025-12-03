import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { CloudShaderMaterial } from '../../sharedComponents/materials/CloudMaterial'
import * as THREE from 'three'

export default function Clouds({ nodes, materials, actions, ...props }) {
  if (!nodes || !materials) {
    console.warn('[Clouds] nodes or materials not provided')
    return null
  }

  const matRef = useRef()

  useEffect(() => {
    console.log('CLOUDS', materials)
  })

  return (
    <group {...props}>
      <group name='COLLECTION_Clouds' userData={{ name: 'COLLECTION_Clouds' }}>
        <group name='cloud_foreground' position={[-43.321, 40.583, -94.093]} userData={{ name: 'cloud_foreground' }} />
        <mesh
          name='cloud_midground'
          castShadow
          receiveShadow
          geometry={nodes.cloud_midground.geometry}
          position={[0, 32.49, 95.438]}
          rotation={[-0.022, 0.272, 0.081]}
          userData={{ name: 'cloud_midground' }}
        >
          <cloudShaderMaterial
            ref={matRef}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            uOpacity={0.9}
            uTopColor={'#ffffff'}
            uBottomColor={'#b0c4ff'}
          />
        </mesh>
        <mesh
          name='cloud_background'
          castShadow
          receiveShadow
          geometry={nodes.cloud_background.geometry}
          position={[-207.323, 77.638, -97.142]}
          rotation={[-0.351, -0.068, -0.735]}
          scale={0.345}
          userData={{ name: 'cloud_background' }}
        >
          <cloudShaderMaterial
            ref={matRef}
            
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            uOpacity={0.59}
            uTopColor={'#ffffff'}
            uBottomColor={'#b0c4ff'}
          />
        </mesh>
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
