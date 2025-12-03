import { RectAreaLight } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

const AreaLights = ({ lights, intensity = 2, color = '#FF00bb' }) => {
  useEffect(() => {
    //console.log(lights)
  }, [])

  return (
    <>
      {lights.map((light, index) => (
        <rectAreaLight
          key={index}
          position={light.position.toArray()}
          rotation={light.rotation.toArray()}
          width={Math.abs(light.scale.x) * 1.5}
          height={Math.abs(light.scale.y)}
          intensity={intensity}
          color={new THREE.Color(color)}
        />
      ))}
    </>
  )
}

export default AreaLights
