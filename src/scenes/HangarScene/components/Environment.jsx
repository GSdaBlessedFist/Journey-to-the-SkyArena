import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'
import { useFrame } from '@react-three/fiber'

export default function Environment({ nodes, materials, actions, ...props }) {
  if (!nodes || !materials) {
    console.warn('[Environment] nodes or materials not provided')
    return null
  }
  const runwayLightsRef = useRef();

  useEffect(()=>{
    if(runwayLightsRef.current)console.log(runwayLightsRef.current)
  },[])
useFrame(({ clock }) => {
  const t = clock.getElapsedTime()
  runwayLightsRef.current.emissiveIntensity = Math.abs(Math.sin(t /2)) * 15 + 5.0;
  
})

  return (
    <group {...props}>
      <group name='COLLECTION_Environment' userData={{ name: 'COLLECTION_Environment' }}>
        <mesh
          name='ground'
          castShadow
          receiveShadow
          geometry={nodes.ground.geometry}
          material={materials.WHITE}
          scale={864.145}
          userData={{ name: 'ground' }}
        />
        <mesh
          name='hangar'
          castShadow
          receiveShadow
          geometry={nodes.hangar.geometry}
          material={materials.ImphenziaPixPal}
          scale={[-147.09, -73.197, -254.072]}
          userData={{ name: 'hangar' }}
        />
        <mesh
          name='hangar_floor'
          castShadow
          receiveShadow
          geometry={nodes.hangar_floor.geometry}
          material={materials.WHITE}
          position={[0, 0.001, 0]}
          scale={[-147.09, -73.197, -254.072]}
          userData={{ name: 'hangar_floor' }}
        />
        <group name='toolbox' position={[32.602, 0, -41.687]} userData={{ name: 'toolbox' }}>
          <mesh
            name='Cube009'
            castShadow
            receiveShadow
            geometry={nodes.Cube009.geometry}
            material={materials.toolbox_base}
          />
          <mesh
            name='Cube009_1'
            castShadow
            receiveShadow
            geometry={nodes.Cube009_1.geometry}
            material={materials.toolbox_handle}
          />
          <mesh
            name='Cube009_2'
            castShadow
            receiveShadow
            geometry={nodes.Cube009_2.geometry}
            material={nodes.Cube009_2.material}
          />
        </group>
        <group name='office' userData={{ name: 'office' }}>
          <mesh
            name='office_1'
            castShadow
            receiveShadow
            geometry={nodes.office_1.geometry}
            material={materials.BASIC_BLACKISH}
          />
          <mesh
            name='office_2'
            castShadow
            receiveShadow
            geometry={nodes.office_2.geometry}
            material={materials.WHITE}
          />
        </group>
        <mesh
          name='buildings'
          castShadow
          receiveShadow
          geometry={nodes.buildings.geometry}
          material={materials.WHITE}
          position={[-134.891, 0, -351.945]}
          scale={[49.27, 3.088, 84.826]}
          userData={{ name: 'buildings' }}
        />
        <mesh
          name='PressW_text'
          castShadow
          receiveShadow
          geometry={nodes.PressW_text.geometry}
          material={nodes.PressW_text.material}
          position={[9.013, 27.338, -188.116]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={12.763}
          userData={{ name: 'PressW_text' }}
        />
        <group
          name='safetyCones'
          position={[16.567, 0, -54.747]}
          scale={[0.609, 1.407, 0.609]}
          userData={{ name: 'safetyCones' }}
        >
          <mesh
            name='Cone006'
            castShadow
            receiveShadow
            geometry={nodes.Cone006.geometry}
            material={materials.safteyCone}
          />
          <mesh
            name='Cone006_1'
            castShadow
            receiveShadow
            geometry={nodes.Cone006_1.geometry}
            material={materials.safetyCone_bottom}
          />
          <mesh
            name='Cone006_2'
            castShadow
            receiveShadow
            geometry={nodes.Cone006_2.geometry}
            material={materials.safetyCone_stripe}
          />
        </group>
        <mesh
          name='crates'
          castShadow
          receiveShadow
          geometry={nodes.crates.geometry}
          material={materials.WHITE}
          position={[-43.782, 0.665, -69.868]}
          rotation={[0, 0.692, 0]}
          userData={{ name: 'crates' }}
        />
        <mesh
          name='runway_strip_lights'
          castShadow
          receiveShadow
          geometry={nodes.runway_strip_lights.geometry}
          position={[1.012, 0.091, -32.772]}
          rotation={[0, 0, -Math.PI / 2]}
          userData={{ name: 'runway_strip_lights' }}
        >
          <meshPhysicalMaterial ref={runwayLightsRef} emissive={0xffffff}  />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Scene_hangar.glb')