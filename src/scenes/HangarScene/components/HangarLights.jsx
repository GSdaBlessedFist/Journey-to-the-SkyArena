import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function HangarLights({ nodes, materials, actions, spotlightIntensity }) {
  if (!nodes || !materials) {
    console.warn('[HangarLights] nodes or materials not provided')
    return null
  }

  return (
    <group >
      <group name='COLLECTION_HangarLights' userData={{ name: 'COLLECTION_HangarLights' }}>
        <spotLight
          intensity={spotlightIntensity}
          angle={Math.PI / 6}
          penumbra={0.5}
          decay={2}
          position={[-30.618, 43.524, -59.83]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: 'hangar_SpotLight_front_R' }}
          target={nodes.hangar_SpotLight_front_R.target}
        >
          <primitive object={nodes.hangar_SpotLight_front_R.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          intensity={spotlightIntensity}
          angle={Math.PI / 6}
          penumbra={0.5}
          decay={2}
          position={[-0.182, 43.53, -59.826]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: 'hangar_SpotLight_front_Mid' }}
          target={nodes.hangar_SpotLight_front_Mid.target}
        >
          <primitive object={nodes.hangar_SpotLight_front_Mid.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          intensity={spotlightIntensity}
          angle={Math.PI / 6}
          penumbra={0.5}
          decay={2}
          position={[31.247, 43.53, -59.826]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: 'hangar_SpotLight_front_L' }}
          target={nodes.hangar_SpotLight_front_L.target}
        >
          <primitive object={nodes.hangar_SpotLight_front_L.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          intensity={spotlightIntensity}
          angle={Math.PI / 6}
          penumbra={0.5}
          decay={2}
          position={[-30.617, 43.53, 0.088]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: 'hangar_SpotLight_middle_R' }}
          target={nodes.hangar_SpotLight_middle_R.target}
        >
          <primitive object={nodes.hangar_SpotLight_middle_R.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          intensity={spotlightIntensity}
          angle={Math.PI / 6}
          penumbra={0.5}
          decay={2}
          position={[-0.182, -0.088, 43.53]}
          userData={{ name: 'hangar_SpotLight_middle_Mid' }}
          target={nodes.hangar_SpotLight_middle_Mid.target}
        >
          <primitive object={nodes.hangar_SpotLight_middle_Mid.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          intensity={spotlightIntensity}
          angle={Math.PI / 6}
          penumbra={0.5}
          decay={2}
          position={[31.247, 43.53, 0.088]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: 'hangar_SpotLight_middle_L' }}
          target={nodes.hangar_SpotLight_middle_L.target}
        >
          <primitive object={nodes.hangar_SpotLight_middle_L.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          intensity={spotlightIntensity}
          angle={Math.PI / 6}
          penumbra={0.5}
          decay={2}
          position={[-30.617, 43.53, 60.242]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: 'hangar_SpotLight_back_R' }}
          target={nodes.hangar_SpotLight_back_R.target}
        >
          <primitive object={nodes.hangar_SpotLight_back_R.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          intensity={spotlightIntensity}
          angle={Math.PI / 6}
          penumbra={0.5}
          decay={2}
          position={[-0.182, 43.53, 60.242]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: 'hangar_SpotLight_back_Mid' }}
          target={nodes.hangar_SpotLight_back_Mid.target}
        >
          <primitive object={nodes.hangar_SpotLight_back_Mid.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          intensity={spotlightIntensity}
          angle={Math.PI / 6}
          penumbra={0.5}
          decay={2}
          position={[31.247, 43.53, 60.242]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ name: 'hangar_SpotLight_back_L' }}
          target={nodes.hangar_SpotLight_back_L.target}
        >
          <primitive object={nodes.hangar_SpotLight_back_L.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          intensity={spotlightIntensity}
          angle={0.27}
          penumbra={0.5}
          decay={2}
          position={[19.792, 8.093, -45.949]}
          rotation={[-0.729, -0.826, -0.581]}
          userData={{ name: 'MenuSpotLight_left' }}
          target={nodes.MenuSpotLight_left.target}
        >
          <primitive object={nodes.MenuSpotLight_left.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          intensity={spotlightIntensity}
          angle={0.408}
          penumbra={0.528}
          decay={2}
          position={[28.437, 0.761, -32.294]}
          rotation={[0.426, 0.738, -0.296]}
          userData={{ name: 'MidshipHighlight' }}
          target={nodes.MidshipHighlight.target}
        >
          <primitive object={nodes.MidshipHighlight.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          intensity={spotlightIntensity}
          angle={0.449}
          penumbra={0.493}
          decay={2}
          position={[17.087, 6.651, -37.628]}
          rotation={[-0.556, -0.397, -0.236]}
          userData={{ name: 'hangar_Spotlight_pushTractor' }}
          target={nodes.hangar_Spotlight_pushTractor.target}
        >
          <primitive object={nodes.hangar_Spotlight_pushTractor.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          intensity={spotlightIntensity}
          angle={0.27}
          penumbra={0.492}
          decay={2}
          position={[36.593, 8.093, -53.164]}
          rotation={[-1.912, 1.04, 1.961]}
          userData={{ name: 'MenuSpotLight_right' }}
          target={nodes.MenuSpotLight_right.target}
        >
          <primitive object={nodes.MenuSpotLight_right.target} position={[0, 0, -1]} />
        </spotLight>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Scene_hangar.glb')
