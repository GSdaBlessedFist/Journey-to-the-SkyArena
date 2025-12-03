import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useGraph, useThree } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, useAnimations, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useSpring, animated } from '@react-spring/three'
import { useMachine } from '@xstate/react'
import portfolioMachine from '../machines/portfolioMachine'
import { useControls } from 'leva'
import Blimp from './Blimp'
import p from '../lib/helpers/consoleHelper'
import gsap from 'gsap'
import CameraFadePortal from './CameraFadePortal'
import PiP_LiveCam from './PiP_viewers/PiP_LiveCam'

//p(sourceName: any, line: any, hue: number, data: any, variableName?: string)
const SOURCE = 'HangarScene '
const srcColor = '130'

export default function HangarScene() {
  const groupRef = useRef()
  const { scene: gltfScene, nodes, materials, animations } = useGLTF('/scene_hangar.glb')
  const { scene: threeScene } = useThree()
  const { actions, mixer, names } = useAnimations(animations, groupRef)
  const [state, send] = useMachine(portfolioMachine)
  const { set } = useThree()

  //CAMERAS
  const cameraRef = useRef()
  const landingGearCamRef = useRef()
  const outsideCam1Ref = useRef()
  const outsideCam2Ref = useRef()
  const [activeCamera, setActiveCamera] = useState('intro')
  const [fadeTriggerKey, setFadeTriggerKey] = useState(null)
  const [nextCamera, setNextCamera] = useState(null)
  const isFading = useRef(false)

  //RENDERING
  const outside2CanvasRef = useRef()
  const landingGearCanvasRef = useRef(null)
  const [landingGearCanvasReady, setLandingGearCanvasReady] = useState(false)

  //MENU ITEMS
  const menuItemWelcomeRef = useRef()
  const menuItemSV021Ref = useRef()
  const menuItemLiftoffRef = useRef()
  const menuItemStar_chap1Ref = useRef()
  const menuItemStar_chap2Ref = useRef()
  const menuItemStar_chap3Ref = useRef()
  const menuItemStar_chap4Ref = useRef()
  const menuItemStar_chap5Ref = useRef()

  //ENVIRONMENT
  const pushTractorRef = useRef()
  const hangarDoorLeftRef = useRef()
  const hangarDoorRightRef = useRef()
  const [hangarDoorOpen, setHangarDoorOpen] = useState(false)

  const [stage, setStage] = useState('hangar')
  const alternateCamObjectRef = useRef() //for now it's the 'levaPanel'
  //will be transitional swipe panel texture
  const transitionToChapScreenTargetRef = useRef()

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// LEVA///////////////////////////////////////////////

  const { spotlightIntensity } = useControls({
    spotlightIntensity: { value: 500, min: 0, max: 75000 },
  })

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////FUNCTIONS///////////////////////////////////////////

  // const { rotX, rotY, rotZ } = useControls('Plane Rotation', {
  //   rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  //   rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  //   rotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  // })
  /////////////////FUNCTIONS/////////////////////
  function handleClick(e) {
    const clickedElement = e.object.parent.name
    switch (clickedElement) {
      case 'menuItem_welcome':
        break
      case 'menuItem_sv021':
        break
      case 'menuItem_liftoff':
        console.log('LIFT')
        const leftDoor = actions['hangar_door_LAction']
        const rightDoor = actions['hangar_door_RAction']

        leftDoor.reset().setLoop(THREE.LoopOnce, 1)
        leftDoor.clampWhenFinished = true
        leftDoor.play()

        rightDoor.reset().setLoop(THREE.LoopOnce, 1)
        rightDoor.clampWhenFinished = true
        rightDoor.play()

        // Track finished clips
        let finishedCount = 0
        const onFinished = (e) => {
          if (e.action === leftDoor || e.action === rightDoor) {
            finishedCount++
            if (finishedCount === 2) {
              console.log('Both door animations finished')
              setHangarDoorOpen(true)
              leftDoor._mixer.removeEventListener('finished', onFinished)
            }
          }
        }

        // Add listener once
        leftDoor._mixer.addEventListener('finished', onFinished)
        break
      case 'menuItem_star_chap5':
        break
      case 'menuItem_star_chap4':
        break
      case 'menuItem_star_chap3':
        break
      case 'menuItem_star_chap2':
        break
      case 'menuItem_star_chap1':
        break
    }
    p(SOURCE, 38, srcColor, clickedElement, 'clickedElement')
  }

  function fadeToCamera(cameraName) {
    if (isFading.current || nextCamera === cameraName || activeCamera === cameraName) return // skip if already active or transitioning
    setNextCamera(cameraName)
    setFadeTriggerKey(Date.now())
    isFading.current = true
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    //threeScene.background = backgroundColor
  }, [])

  // Hangar lights
  useEffect(() => {
    if (!gltfScene) return
    gltfScene.traverse((obj) => {
      if (obj.isLight && obj.name.includes('hangar')) {
        obj.intensity = spotlightIntensity
      }
    })
  }, [gltfScene, spotlightIntensity])

  //hangarDoorOpen
  useEffect(() => {
    if (hangarDoorOpen) {
      setStage('exitHangar')
      console.log('🚀 Blimp stage updated: exitHangar')

      // setTimeout(() => {
      //   fadeToCamera('outside1') // this replaces setActiveCamera
      // }, 6000)
    }
  }, [hangarDoorOpen])

  // LandingGearUp
  useEffect(() => {
    // if (hangarDoorOpen.left && hangarDoorOpen.right) {
    //   const action = actions['landingGearSketchAction']
    //   if (action) {
    //     action.reset()
    //     action.setLoop(THREE.LoopOnce, 1)
    //     action.clampWhenFinished = true
    //     action.play()
    //   }
    // }
  }, [hangarDoorOpen])

  // triggerFade
  //FRAME WORK FOR TIME SET UP
  //possible adjustment of camera:outside1 needed
  useEffect(() => {
    if (stage === 'exitHangar') {
      const timer = setTimeout(() => {
        fadeToCamera('outside1')
      }, 7500)

      return () => clearTimeout(timer) // cleanup on unmount or re-run
    }
  }, [stage])

  //activeCamera
  useEffect(() => {
    if (activeCamera === 'outside1') {
      const timer = setTimeout(() => {
        fadeToCamera('outside2')
      }, 5500)

      return () => clearTimeout(timer)
    }
  }, [activeCamera])

  //checkCanvasReady
  useEffect(() => {
    const checkCanvasReady = () => {
      if (landingGearCanvasRef.current && landingGearCamRef.current) {
        console.log('✅ Canvas + Camera Ready')
        setLandingGearCanvasReady(true)
        return true
      }
      return false
    }

    if (checkCanvasReady()) console.log('HERE')
    // if (checkCanvasReady()) return

    const interval = setInterval(() => {
      if (checkCanvasReady()) clearInterval(interval)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    console.log('landingGearCanvasRef', landingGearCanvasRef.current)
    console.log('landingGearCamRef', landingGearCamRef.current)
  }, [])

  return (
    <>
      <group ref={groupRef} dispose={null}>
        <group name='Scene'>
          <group name='Scene_Collection' userData={{ name: 'Scene Collection' }}>
            <group name='Environment' userData={{ name: 'Environment' }}>
              <group name='safety_cones' userData={{ name: 'safety_cones' }}>
                <group
                  name='safetyCone'
                  position={[16.567, 0, -54.747]}
                  scale={[0.609, 1.407, 0.609]}
                  userData={{ name: 'safetyCone' }}
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
                <group
                  name='safetyCone001'
                  position={[19.019, 0, -61.094]}
                  scale={[0.609, 1.407, 0.609]}
                  userData={{ name: 'safetyCone.001' }}
                >
                  <mesh
                    name='Cone012'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone012.geometry}
                    material={materials.safteyCone}
                  />
                  <mesh
                    name='Cone012_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone012_1.geometry}
                    material={materials.safetyCone_bottom}
                  />
                  <mesh
                    name='Cone012_2'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone012_2.geometry}
                    material={materials.safetyCone_stripe}
                  />
                </group>
                <group
                  name='safetyCone002'
                  position={[21.609, 0, -67.275]}
                  scale={[0.609, 1.407, 0.609]}
                  userData={{ name: 'safetyCone.002' }}
                >
                  <mesh
                    name='Cone013'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone013.geometry}
                    material={materials.safteyCone}
                  />
                  <mesh
                    name='Cone013_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone013_1.geometry}
                    material={materials.safetyCone_bottom}
                  />
                  <mesh
                    name='Cone013_2'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone013_2.geometry}
                    material={materials.safetyCone_stripe}
                  />
                </group>
                <group
                  name='safetyCone003'
                  position={[-17.351, 0, -54.607]}
                  scale={[0.609, 1.407, 0.609]}
                  userData={{ name: 'safetyCone.003' }}
                >
                  <mesh
                    name='Cone016'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone016.geometry}
                    material={materials.safteyCone}
                  />
                  <mesh
                    name='Cone016_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone016_1.geometry}
                    material={materials.safetyCone_bottom}
                  />
                  <mesh
                    name='Cone016_2'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone016_2.geometry}
                    material={materials.safetyCone_stripe}
                  />
                </group>
                <group
                  name='safetyCone004'
                  position={[23.683, 0, -73.484]}
                  scale={[0.609, 1.407, 0.609]}
                  userData={{ name: 'safetyCone.004' }}
                >
                  <mesh
                    name='Cone015'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone015.geometry}
                    material={materials.safteyCone}
                  />
                  <mesh
                    name='Cone015_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone015_1.geometry}
                    material={materials.safetyCone_bottom}
                  />
                  <mesh
                    name='Cone015_2'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone015_2.geometry}
                    material={materials.safetyCone_stripe}
                  />
                </group>
                <group
                  name='safetyCone005'
                  position={[-20.266, 0, -60.729]}
                  scale={[0.609, 1.407, 0.609]}
                  userData={{ name: 'safetyCone.005' }}
                >
                  <mesh
                    name='Cone017'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone017.geometry}
                    material={materials.safteyCone}
                  />
                  <mesh
                    name='Cone017_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone017_1.geometry}
                    material={materials.safetyCone_bottom}
                  />
                  <mesh
                    name='Cone017_2'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone017_2.geometry}
                    material={materials.safetyCone_stripe}
                  />
                </group>
                <group
                  name='safetyCone006'
                  position={[-23.473, 0, -66.196]}
                  scale={[0.609, 1.407, 0.609]}
                  userData={{ name: 'safetyCone.006' }}
                >
                  <mesh
                    name='Cone018'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone018.geometry}
                    material={materials.safteyCone}
                  />
                  <mesh
                    name='Cone018_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone018_1.geometry}
                    material={materials.safetyCone_bottom}
                  />
                  <mesh
                    name='Cone018_2'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone018_2.geometry}
                    material={materials.safetyCone_stripe}
                  />
                </group>
                <group
                  name='safetyCone007'
                  position={[-26.242, 0, -71.006]}
                  scale={[0.609, 1.407, 0.609]}
                  userData={{ name: 'safetyCone.007' }}
                >
                  <mesh
                    name='Cone019'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone019.geometry}
                    material={materials.safteyCone}
                  />
                  <mesh
                    name='Cone019_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone019_1.geometry}
                    material={materials.safetyCone_bottom}
                  />
                  <mesh
                    name='Cone019_2'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone019_2.geometry}
                    material={materials.safetyCone_stripe}
                  />
                </group>
                <group
                  name='safetyCone008'
                  position={[17.827, 0, -57.758]}
                  scale={[0.609, 1.407, 0.609]}
                  userData={{ name: 'safetyCone.008' }}
                >
                  <mesh
                    name='Cone020'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone020.geometry}
                    material={materials.safteyCone}
                  />
                  <mesh
                    name='Cone020_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone020_1.geometry}
                    material={materials.safetyCone_bottom}
                  />
                  <mesh
                    name='Cone020_2'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone020_2.geometry}
                    material={materials.safetyCone_stripe}
                  />
                </group>
                <group
                  name='safetyCone009'
                  position={[20.417, 0, -63.999]}
                  scale={[0.609, 1.407, 0.609]}
                  userData={{ name: 'safetyCone.009' }}
                >
                  <mesh
                    name='Cone021'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone021.geometry}
                    material={materials.safteyCone}
                  />
                  <mesh
                    name='Cone021_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone021_1.geometry}
                    material={materials.safetyCone_bottom}
                  />
                  <mesh
                    name='Cone021_2'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone021_2.geometry}
                    material={materials.safetyCone_stripe}
                  />
                </group>
                <group
                  name='safetyCone010'
                  position={[22.611, 0, -70.505]}
                  scale={[0.609, 1.407, 0.609]}
                  userData={{ name: 'safetyCone.010' }}
                >
                  <mesh
                    name='Cone022'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone022.geometry}
                    material={materials.safteyCone}
                  />
                  <mesh
                    name='Cone022_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone022_1.geometry}
                    material={materials.safetyCone_bottom}
                  />
                  <mesh
                    name='Cone022_2'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone022_2.geometry}
                    material={materials.safetyCone_stripe}
                  />
                </group>
              </group>
              <group name='NonHangar_Lights' userData={{ name: 'NonHangar_Lights' }}>
                <group
                  name='emergencyLightOuter'
                  position={[21.97, 2.502, -42.209]}
                  scale={-0.145}
                  userData={{ name: 'emergencyLightOuter' }}
                >
                  <mesh
                    name='Sphere'
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere.geometry}
                    material={materials.BASIC_BLACKISH}
                  />
                  <mesh
                    name='Sphere_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere_1.geometry}
                    material={materials.pushTractor_glass}
                  />
                </group>
                <mesh
                  name='emergencyBulb'
                  castShadow
                  receiveShadow
                  geometry={nodes.emergencyBulb.geometry}
                  material={materials.pushTractor_emergencyBulb}
                  position={[21.97, 2.502, -42.209]}
                  scale={0.112}
                  userData={{ name: 'emergencyBulb' }}
                />
              </group>
              <group name='randomBoxes' userData={{ name: 'randomBoxes' }}>
                <mesh
                  name='crate'
                  castShadow
                  receiveShadow
                  geometry={nodes.crate.geometry}
                  material={materials.WHITE}
                  position={[-19.154, 0, -24.565]}
                  rotation={[0, -0.657, 0]}
                  userData={{ name: 'crate' }}
                />
                <mesh
                  name='crate001'
                  castShadow
                  receiveShadow
                  geometry={nodes.crate001.geometry}
                  material={materials.WHITE}
                  position={[-43.872, 0.665, -68.051]}
                  rotation={[0, -0.703, 0]}
                  userData={{ name: 'crate.001' }}
                />
                <mesh
                  name='crate002'
                  castShadow
                  receiveShadow
                  geometry={nodes.crate002.geometry}
                  material={materials.WHITE}
                  position={[-43.782, 0.665, -69.868]}
                  rotation={[0, 0.692, 0]}
                  userData={{ name: 'crate.002' }}
                />
              </group>
              <mesh
                name='hangar_door_L'
                castShadow
                receiveShadow
                geometry={nodes.hangar_door_L.geometry}
                material={materials.WHITE}
                position={[15.47, 0, -79.29]}
                rotation={[-Math.PI, 0, 0]}
                scale={[-49.846, -61.268, -5.68]}
                userData={{ isAnimated: true, name: 'hangar_door_L' }}
              />
              <mesh
                name='hangar_door_R'
                castShadow
                receiveShadow
                geometry={nodes.hangar_door_R.geometry}
                material={materials.WHITE}
                position={[-14.916, 0, -79.29]}
                rotation={[-Math.PI, 0, 0]}
                scale={[-49.846, -61.268, -5.68]}
                userData={{ isAnimated: true, name: 'hangar_door_R' }}
              />
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
                material={materials.WHITE}
                scale={[-147.09, -73.197, -254.072]}
                userData={{ name: 'hangar' }}
              />
              <mesh
                name='human_6ft_block'
                castShadow
                receiveShadow
                geometry={nodes.human_6ft_block.geometry}
                material={nodes.human_6ft_block.material}
                position={[-34.674, 0, -53.878]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[0.875, 3.013, 0.5]}
                userData={{ name: 'human_6ft_block' }}
              />
              <mesh
                name='hangar_floor'
                castShadow
                receiveShadow
                geometry={nodes.hangar_floor.geometry}
                material={materials.WHITE}
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
                name='building1'
                castShadow
                receiveShadow
                geometry={nodes.building1.geometry}
                material={materials.WHITE}
                position={[-147.476, 0, -241.915]}
                rotation={[Math.PI, -1.569, Math.PI]}
                scale={[49.27, 0.542, 84.826]}
                userData={{ name: 'building1' }}
              />
              <mesh
                name='building2'
                castShadow
                receiveShadow
                geometry={nodes.building2.geometry}
                material={materials.WHITE}
                position={[-147.476, 0, -289.619]}
                rotation={[Math.PI, -1.569, Math.PI]}
                scale={[49.27, 0.542, 84.826]}
                userData={{ name: 'building2' }}
              />
              <mesh
                name='tall_building'
                castShadow
                receiveShadow
                geometry={nodes.tall_building.geometry}
                material={materials.WHITE}
                position={[-134.891, 0, -351.945]}
                scale={[49.27, 3.088, 84.826]}
                userData={{ name: 'tall_building' }}
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
            </group>
            <group name='hangarLights' userData={{ name: 'hangarLights' }}>
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
                intensity={0}
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
                intensity={0}
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
                intensity={0}
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
                intensity={0}
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
            <group name='EMPTYs' userData={{ name: 'EMPTYs' }}>
              <group
                name='blimpEMPTY'
                position={[0.008, 0, -32.354]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={47.674}
                userData={{ name: 'blimpEMPTY' }}
              />
              <group
                name='cameraPositionEMPTY'
                position={[37.252, 1.829, -38.411]}
                rotation={[1.677, -0.22, -1.115]}
                userData={{ name: 'cameraPositionEMPTY' }}
              />
              <group
                name='menuPositionEMPTY'
                position={[27.753, 3.2, -51.426]}
                rotation={[0, 0.532, 0]}
                userData={{ name: 'menuPositionEMPTY' }}
              />
              <group
                name='blimp_FocalEMPTY'
                position={[8.837, 9.666, -51.914]}
                userData={{ name: 'blimp_FocalEMPTY' }}
              />
              <group
                name='doorsControlEMPTY'
                position={[26.762, 0, -154.832]}
                scale={9.414}
                userData={{ name: 'doorsControlEMPTY' }}
              />
              <group
                name='propellerCenterEMPTY'
                position={[0, 13.564, -14.999]}
                userData={{ name: 'propellerCenterEMPTY' }}
              />
              <group
                name='landingGear_closeupCamShotEMPTY'
                position={[6.668, 1.048, -40.893]}
                rotation={[Math.PI, 0.669, 3.077]}
                userData={{ name: 'landingGear_closeupCamShotEMPTY' }}
              />
              <group
                name='transitionToChapScreenEMPTY'
                position={[37.252, 1.829, -186.93]}
                userData={{ name: 'transitionToChapScreenEMPTY' }}
              />
              <group
                name='outside_pressKeyText'
                position={[9.013, 27.338, -188.116]}
                scale={12.924}
                userData={{ name: 'outside_pressKeyText' }}
              />
            </group>
            <group name='hangar_menu' userData={{ name: 'hangar_menu' }}>
              <group
                ref={menuItemStar_chap5Ref}
                name='menuItem_star_chap5'
                position={[26.768, 1.951, -51.571]}
                rotation={[Math.PI / 2, 0, -0.506]}
                scale={[5.145, 6.998, 5.145]}
                userData={{ name: 'menuItem_star_chap5' }}
                onClick={handleClick}
              >
                <mesh
                  name='menuItem_star_chap5_1'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap5_1.geometry}
                  material={materials.menuItem_front}
                />
                <mesh
                  name='menuItem_star_chap5_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap5_2.geometry}
                  material={materials.menuItem_side}
                />
                <mesh
                  name='menuItem_star_chap5_3'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap5_3.geometry}
                  material={materials.menuItem_bevel}
                />
              </group>
              <group
                ref={menuItemWelcomeRef}
                name='menuItem_welcome'
                position={[27.823, 4.61, -52.155]}
                rotation={[Math.PI / 2, 0, -0.506]}
                scale={[5.145, 6.998, 5.145]}
                userData={{ name: 'menuItem_welcome' }}
                onClick={handleClick}
              >
                <mesh
                  name='menuItem_welcome_1'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_welcome_1.geometry}
                  material={materials.menuItem_front}
                />
                <mesh
                  name='menuItem_welcome_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_welcome_2.geometry}
                  material={materials.menuItem_side}
                />
                <mesh
                  name='menuItem_welcome_3'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_welcome_3.geometry}
                  material={materials.menuItem_bevel}
                />
              </group>
              <group
                ref={menuItemSV021Ref}
                name='menuItem_sv021'
                position={[27.764, 3.88, -52.122]}
                rotation={[Math.PI / 2, 0, -0.506]}
                scale={[5.145, 6.998, 5.145]}
                userData={{ name: 'menuItem_sv021' }}
                onClick={handleClick}
              >
                <mesh
                  name='menuItem_sv021_1'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_sv021_1.geometry}
                  material={materials.menuItem_front}
                />
                <mesh
                  name='menuItem_sv021_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_sv021_2.geometry}
                  material={materials.menuItem_side}
                />
                <mesh
                  name='menuItem_sv021_3'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_sv021_3.geometry}
                  material={materials.menuItem_bevel}
                />
              </group>
              <group
                ref={menuItemLiftoffRef}
                name='menuItem_liftoff'
                position={[27.869, 3.129, -52.18]}
                rotation={[Math.PI / 2, 0, -0.506]}
                scale={[5.145, 6.998, 5.145]}
                userData={{ name: 'menuItem_liftoff' }}
                onClick={handleClick}
              >
                <mesh
                  name='menuItem_liftoff_1'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_liftoff_1.geometry}
                  material={materials.menuItem_front}
                />
                <mesh
                  name='menuItem_liftoff_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_liftoff_2.geometry}
                  material={materials.menuItem_side}
                />
                <mesh
                  name='menuItem_liftoff_3'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_liftoff_3.geometry}
                  material={materials.menuItem_bevel}
                />
              </group>
              <group
                ref={menuItemStar_chap1Ref}
                name='menuItem_star_chap1'
                position={[28.666, 1.951, -52.622]}
                rotation={[Math.PI / 2, 0, -0.506]}
                scale={[5.145, 6.998, 5.145]}
                userData={{ name: 'menuItem_star_chap1' }}
                onClick={handleClick}
              >
                <mesh
                  name='menuItem_star_chap1_1'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap1_1.geometry}
                  material={materials.menuItem_front}
                />
                <mesh
                  name='menuItem_star_chap1_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap1_2.geometry}
                  material={materials.menuItem_side}
                />
                <mesh
                  name='menuItem_star_chap1_3'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap1_3.geometry}
                  material={materials.menuItem_bevel}
                />
              </group>
              <group
                ref={menuItemStar_chap2Ref}
                name='menuItem_star_chap2'
                position={[28.192, 1.951, -52.359]}
                rotation={[Math.PI / 2, 0, -0.506]}
                scale={[5.145, 6.998, 5.145]}
                userData={{ name: 'menuItem_star_chap2' }}
                onClick={handleClick}
              >
                <mesh
                  name='menuItem_star_chap2_1'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap2_1.geometry}
                  material={materials.menuItem_front}
                />
                <mesh
                  name='menuItem_star_chap2_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap2_2.geometry}
                  material={materials.menuItem_side}
                />
                <mesh
                  name='menuItem_star_chap2_3'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap2_3.geometry}
                  material={materials.menuItem_bevel}
                />
              </group>
              <group
                ref={menuItemStar_chap3Ref}
                name='menuItem_star_chap3'
                position={[27.717, 1.951, -52.097]}
                rotation={[Math.PI / 2, 0, -0.506]}
                scale={[5.145, 6.998, 5.145]}
                userData={{ name: 'menuItem_star_chap3' }}
                onClick={handleClick}
              >
                <mesh
                  name='menuItem_star_chap3_1'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap3_1.geometry}
                  material={materials.menuItem_front}
                />
                <mesh
                  name='menuItem_star_chap3_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap3_2.geometry}
                  material={materials.menuItem_side}
                />
                <mesh
                  name='menuItem_star_chap3_3'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap3_3.geometry}
                  material={materials.menuItem_bevel}
                />
              </group>
              <group
                ref={menuItemStar_chap4Ref}
                name='menuItem_star_chap4'
                position={[27.243, 1.951, -51.834]}
                rotation={[Math.PI / 2, 0, -0.506]}
                scale={[5.145, 6.998, 5.145]}
                userData={{ name: 'menuItem_star_chap4' }}
                onClick={handleClick}
              >
                <mesh
                  name='menuItem_star_chap4_1'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap4_1.geometry}
                  material={materials.menuItem_front}
                />
                <mesh
                  name='menuItem_star_chap4_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap4_2.geometry}
                  material={materials.menuItem_side}
                />
                <mesh
                  name='menuItem_star_chap4_3'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_star_chap4_3.geometry}
                  material={materials.menuItem_bevel}
                />
              </group>
              <group
                name='menuItem_chapters'
                position={[26.432, 1.666, -51.384]}
                rotation={[Math.PI / 2, 0, -0.506]}
                scale={[5.145, 6.998, 5.145]}
                userData={{ name: 'menuItem_chapters' }}
              >
                <mesh
                  name='menuItem_chapters_1'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_chapters_1.geometry}
                  material={materials.menuItem_front}
                />
                <mesh
                  name='menuItem_chapters_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_chapters_2.geometry}
                  material={materials.menuItem_side}
                />
                <mesh
                  name='menuItem_chapters_3'
                  castShadow
                  receiveShadow
                  geometry={nodes.menuItem_chapters_3.geometry}
                  material={materials.menuItem_bevel}
                />
              </group>
            </group>
            <Blimp setStage={setStage} stage={stage} />
            <group name='CAMERAS' userData={{ name: 'CAMERAS' }}>
              <PerspectiveCamera
                ref={landingGearCamRef}
                name='landingGear_camera_1'
                makeDefault={activeCamera === 'landingGear'}
                far={1000}
                near={0.1}
                fov={22.895}
                position={[6.717, 1.099, -40.977]}
                rotation={[Math.PI, 0.669, 3.077]}
                userData={{ name: 'landingGear_camera' }}
              />
              <PerspectiveCamera
                ref={cameraRef}
                name='Main_camera'
                makeDefault={activeCamera === 'intro'}
                far={3048}
                near={0.1}
                fov={44.096}
                position={[37.252, 1.829, -38.411]}
                rotation={[0.526, 1.068, -0.471]}
                userData={{ name: 'Main_camera' }}
              />
              <PerspectiveCamera
                ref={outsideCam2Ref}
                name='outside2_camera_1'
                makeDefault={activeCamera === 'outside2'}
                far={1000}
                near={0.1}
                fov={19.157}
                position={[-150.645, 2.286, -226.909]}
                rotation={[2.837, -1.156, 2.862]}
                userData={{ name: 'outside2_camera' }}
              />
              <PerspectiveCamera
                ref={outsideCam1Ref}
                name='outside1_camera_1'
                makeDefault={activeCamera === 'outside1'}
                far={1000}
                near={0.1}
                fov={22.895}
                position={[63.001, 1.829, -188.116]}
                rotation={[2.993, 0.575, -3.06]}
                userData={{ name: 'outside1_camera' }}
              />
            </group>
            <group name='PUSHTRACTOR' userData={{ name: 'PUSHTRACTOR' }}>
              <group name='pushTractor' position={[0, 0.076, 4.583]} userData={{ name: 'pushTractor' }}>
                <mesh
                  name='tractorBody'
                  castShadow
                  receiveShadow
                  geometry={nodes.tractorBody.geometry}
                  material={materials.pushTractor_glass}
                />
                <mesh
                  name='tractorBody_1'
                  castShadow
                  receiveShadow
                  geometry={nodes.tractorBody_1.geometry}
                  material={materials.pushTractor_tireBlack}
                />
                <mesh
                  name='tractorBody_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.tractorBody_2.geometry}
                  material={materials.WHITE}
                />
                <mesh
                  name='tractorBody_3'
                  castShadow
                  receiveShadow
                  geometry={nodes.tractorBody_3.geometry}
                  material={materials.pushTractor_tireMainColor}
                />
                <mesh
                  name='displayPanel_holder'
                  castShadow
                  receiveShadow
                  geometry={nodes.displayPanel_holder.geometry}
                  material={materials.WHITE}
                  position={[20.977, 1.498, -49.48]}
                  scale={[1, 1, 3.783]}
                  userData={{ name: 'displayPanel_holder' }}
                >
                  <mesh
                    name='LevaPanel'
                    castShadow
                    receiveShadow
                    geometry={nodes.LevaPanel.geometry}
                    material={materials.WHITE}
                    position={[0, 0.179, -0.001]}
                    scale={[0.389, 0.391, 0.346]}
                    userData={{ isAnimated: true, name: 'LevaPanel' }}
                  />
                </mesh>
                <group name='pushTractor_leftWheel' userData={{ name: 'pushTractor_leftWheel' }}>
                  <mesh
                    name='Cube011'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011.geometry}
                    material={materials.pushTractor_tireBlack}
                  />
                  <mesh
                    name='Cube011_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011_1.geometry}
                    material={materials.pushTractor_tireMainColor}
                  />
                </group>
                <group name='pushTractor_rightWheel' userData={{ name: 'pushTractor_rightWheel' }}>
                  <mesh
                    name='Cube012'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube012.geometry}
                    material={materials.pushTractor_tireBlack}
                  />
                  <mesh
                    name='Cube012_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube012_1.geometry}
                    material={materials.pushTractor_tireMainColor}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
      <mesh ref={transitionToChapScreenTargetRef} position={[37.252, 20, -186.93]} rotation={[0, 1.55, 0]}>
        <planeGeometry args={[50, 35]} />
        <meshStandardMaterial color='lightblue' side={THREE.DoubleSide} />
      </mesh>
      <Html portal='#overlay-root' fullscreen>
        <CameraFadePortal
          triggerKey={fadeTriggerKey}
          onFadeComplete={() => {
            if (nextCamera) setActiveCamera(nextCamera)
            setNextCamera(null)
            isFading.current = false
          }}
        />
      </Html>

      {/* <Html portal='#pip_layer-root' fullscreen center>
        <div className='relative w-full h-full'>
          <canvas
            ref={landingGearCanvasRef}
            style={{
              position: 'fixed',
              left: x,
              top: y,
              width: `${width}px`,
              height: `${height}px`,
              pointerEvents: 'auto',
              zIndex: 1000,
            }}
          />
        </div>
      </Html>

      {landingGearCanvasReady && activeCamera === 'outside2' && (
        <PiP_LiveCam cameraRef={landingGearCamRef} canvasRef={landingGearCanvasRef} width={300} height={400} />
      )} */}
    </>
  )
}





useGLTF.preload('/scene_hangar.glb')



