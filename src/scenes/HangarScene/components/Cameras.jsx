import React from 'react'
import { PerspectiveCamera, useGLTF } from '@react-three/drei'

export default function Cameras({ nodes, materials, actions, ...props }) {
  if (!nodes || !materials) {
    console.warn('[Cameras] nodes or materials not provided')
    return null
  }

  return (
    <group {...props}>
      <group name='COLLECTION_Cameras' userData={{ name: 'COLLECTION_Cameras' }}>
        <PerspectiveCamera
          name='Main_camera'
          makeDefault={true}
          far={3048}
          near={0.1}
          fov={44.096}
          position={[37.252, 1.829, -38.411]}
          rotation={[0.526, 1.068, -0.471]}
          userData={{ name: 'Main_camera' }}
        />
        <PerspectiveCamera
          name='outside1_camera_1'
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={22.895}
          position={[63.001, 1.829, -188.116]}
          rotation={[2.993, 0.575, -3.06]}
          userData={{ name: 'outside1_camera' }}
        />
        <PerspectiveCamera
          name='ROAMING_CAM'
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={15.177}
          position={[200.342, 18.959, -323.989]}
          rotation={[3.098, 0.688, -3.114]}
          userData={{ name: 'ROAMING_CAM' }}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/Scene_hangar.glb')
