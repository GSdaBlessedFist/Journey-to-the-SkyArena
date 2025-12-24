//2025-12-18 09:44

import { PerspectiveCamera, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import p from '@/lib/imported_utilities/helpers/consoleHelper'

const SOURCE = 'Cameras.jsx'
const srcColor = [140, 76]

export default function Cameras({ cameraDirectorRef, ...props }) {
  const mainCamRef = useRef()
  const outside1CamRef = useRef()
  const outside2CamRef = useRef()
  const landingGearCamRef = useRef()
  const roamingCamRef = useRef()

  useEffect(() => {
    if (!cameraDirectorRef.current) return
    if (
      !mainCamRef.current ||
      !outside1CamRef.current ||
      !outside2CamRef.current ||
      !landingGearCamRef.current ||
      !roamingCamRef.current
    )
      return
    if (cameraDirectorRef.current) {
      if (mainCamRef.current) cameraDirectorRef.current.registerCamera('Main_camera', mainCamRef.current)
      if (outside1CamRef.current) cameraDirectorRef.current.registerCamera('outside1_camera_1', outside1CamRef.current)
      if (outside2CamRef.current) cameraDirectorRef.current.registerCamera('outside2_camera_1', outside2CamRef.current)
      if (landingGearCamRef.current) cameraDirectorRef.current.registerCamera('landingGear_camera_1', landingGearCamRef.current)
      if (roamingCamRef.current) cameraDirectorRef.current.registerCamera('ROAMING_CAM', roamingCamRef.current)
    }
  }, [cameraDirectorRef])

  return (
    <group {...props}>
      <group name='COLLECTION_Cameras' userData={{ name: 'COLLECTION_Cameras' }}>
        <PerspectiveCamera
          name='landingGear_camera_1'
          makeDefault={false}
          ref={landingGearCamRef}
          far={1000}
          near={0.1}
          fov={22.895}
          position={[6.375, 1.099, -42.73]}
          rotation={[Math.PI, 0.669, 3.077]}
          userData={{ name: 'landingGear_camera' }}
        />
        <PerspectiveCamera
          name='Main_camera'
          makeDefault={true}
          ref={mainCamRef}
          far={3048}
          near={0.1}
          fov={44.096}
          position={[37.252, 1.829, -38.411]}
          rotation={[0.526, 1.068, -0.471]}
          userData={{ name: 'Main_camera' }}
        />
        <PerspectiveCamera
          name='outside2_camera_1'
          makeDefault={false}
          ref={outside2CamRef}
          far={1000}
          near={0.1}
          fov={19.157}
          position={[-150.645, 2.286, -226.909]}
          rotation={[2.837, -1.156, 2.862]}
          userData={{ name: 'outside2_camera' }}
        />
        <PerspectiveCamera
          name='outside1_camera_1'
          makeDefault={false}
          ref={outside1CamRef}
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
          ref={roamingCamRef}
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
