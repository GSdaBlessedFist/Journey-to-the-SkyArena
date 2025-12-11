import React, { useEffect, useRef } from 'react'
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import p from '@/lib/helpers/consoleHelper'
import { useFrame } from '@react-three/fiber'

const SOURCE = 'Blimp.jsx off'
const srcColor = [165, 45]

export default function Blimp({scale = 1 }) {
  const blimpRef = useRef()
  const { scene, nodes, materials, animations } = useGLTF('/models/Blimp.glb')
  const { actions } = useAnimations(animations, blimpRef)

  useEffect(()=>{
    p(SOURCE,16,srcColor,actions)
    const propellersSpin = actions?.['propellersAction'];
    propellersSpin.reset();
    propellersSpin.play();
  },[])

  return (
    <group dispose={null}>
      <group
        ref={blimpRef}
        scale={scale}
        rotation={[0, Math.PI, 0]}
        name='Scene_Collection'
        userData={{ name: 'Scene Collection' }}
      >
        <group name='BLIMP'>
          <group name='blimpSelectorEMPTY' rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              name='gondala_actual'
              castShadow
              receiveShadow
              geometry={nodes.gondala_actual.geometry}
              material={materials.ImphenziaPixPal}
              position={[20.299, 31.201, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <mesh
                name='landingGear_backDoor'
                castShadow
                receiveShadow
                geometry={nodes.landingGear_backDoor.geometry}
                material={materials.ImphenziaPixPal}
                position={[-19.015, 1.859, -32.245]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={[1, 1, 0]}
              />
              <mesh
                name='landingGear_frontDoor'
                castShadow
                receiveShadow
                geometry={nodes.landingGear_frontDoor.geometry}
                material={materials.ImphenziaPixPal}
                position={[0.152, 1.817, 3.839]}
                scale={[11.598, 5.56, 0.085]}
              />
              <group name='gondalaEMPTY' position={[-20.299, 4.567, -31.201]} rotation={[Math.PI, 0, Math.PI]} />
              <mesh
                name='ammoBox'
                castShadow
                receiveShadow
                geometry={nodes.ammoBox.geometry}
                material={materials.ImphenziaPixPal}
                position={[-17.588, 4.256, -30.92]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={[1, 1, 2.771]}
              />
              <group name='balloon' position={[-20.299, 0, -31.201]} rotation={[Math.PI, 0, Math.PI]}>
                <mesh
                  name='balloon_1'
                  castShadow
                  receiveShadow
                  geometry={nodes.balloon_1.geometry}
                  material={materials.ImphenziaPixPal}
                />
                <mesh
                  name='balloon_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.balloon_2.geometry}
                  material={materials.blimpBand}
                />
              </group>
              <mesh
                name='balloonFins'
                castShadow
                receiveShadow
                geometry={nodes.balloonFins.geometry}
                material={materials.ImphenziaPixPal}
                position={[-20.299, 0, -31.201]}
                rotation={[Math.PI, 0, Math.PI]}
              >
                <group name='propellerSpinEMPTY' position={[-0.002, 14.441, 25.248]}>
                  <mesh
                    name='propellers'
                    castShadow
                    receiveShadow
                    geometry={nodes.propellers.geometry}
                    material={materials.ImphenziaPixPal}
                    position={[0.002, -14.441, -25.248]}
                  />
                </group>
                <group
                  name='balloonEmpty'
                  position={[0, 15.136, -1.202]}
                  rotation={[0, 0, Math.PI]}
                  scale={[-9.327, -9.327, -10.5]}
                />
                <group name='finEMPTY' position={[0, 14.441, 23.14]} scale={3.038} />
                <mesh
                  name='fin_bottom_rudder'
                  castShadow
                  receiveShadow
                  geometry={nodes.fin_bottom_rudder.geometry}
                  material={materials.ImphenziaPixPal}
                />
                <mesh
                  name='fin_left_rudder'
                  castShadow
                  receiveShadow
                  geometry={nodes.fin_left_rudder.geometry}
                  material={materials.ImphenziaPixPal}
                  position={[6.549, 14.441, 21.027]}
                  rotation={[Math.PI, 0, -Math.PI / 2]}
                  scale={[11.598, 5.56, 4.407]}
                />
                <mesh
                  name='fin_right_rudder'
                  castShadow
                  receiveShadow
                  geometry={nodes.fin_right_rudder.geometry}
                  material={materials.ImphenziaPixPal}
                />
                <mesh
                  name='fin_top_rudder'
                  castShadow
                  receiveShadow
                  geometry={nodes.fin_top_rudder.geometry}
                  material={materials.ImphenziaPixPal}
                />
              </mesh>
              <mesh
                name='gondalaBalloonSeparator'
                castShadow
                receiveShadow
                geometry={nodes.gondalaBalloonSeparator.geometry}
                material={materials.ImphenziaPixPal}
                position={[-20.299, 5.801, -32.784]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={[10.034, 4.962, 4.962]}
              />
            </mesh>
          </group>
          <group name='WINGS'>
            <group
              name='wingHousingEmpty'
              position={[2.712, 4.847, 0.281]}
              rotation={[Math.PI, 0, Math.PI]}
              scale={1.541}
            >
              <mesh
                name='wingHousing'
                castShadow
                receiveShadow
                geometry={nodes.wingHousing.geometry}
                material={materials.ImphenziaPixPal}
                position={[0, -0.879, 0]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={[1.593, 1.29, 3.724]}
              >
                <group
                  name='wingBaseEmpty'
                  position={[-1.97, 0, 0]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={[0.407, 0.503, 0.174]}
                >
                  <mesh
                    name='wingBase'
                    castShadow
                    receiveShadow
                    geometry={nodes.wingBase.geometry}
                    material={materials.ImphenziaPixPal}
                    position={[-1.064, 0, 0]}
                    rotation={[Math.PI, 0, Math.PI]}
                    scale={[2.455, 1.988, 5.738]}
                  >
                    <mesh
                      name='innerTurbineCase'
                      castShadow
                      receiveShadow
                      geometry={nodes.innerTurbineCase.geometry}
                      material={materials.ImphenziaPixPal}
                      position={[0.556, -0.295, 0.01]}
                      rotation={[-Math.PI, 0, -Math.PI]}
                      scale={[0.407, 0.503, 0.174]}
                    >
                      <group name='innerTurbineSpin_Empty' position={[0, 0, -1.398]} scale={0.381}>
                        <group name='turbine_hub' position={[0, 0, 2.289]} scale={2.621}>
                          <mesh
                            name='turbine_hub_1'
                            castShadow
                            receiveShadow
                            geometry={nodes.turbine_hub_1.geometry}
                            material={materials.ImphenziaPixPal}
                          />
                          <mesh
                            name='turbine_hub_2'
                            castShadow
                            receiveShadow
                            geometry={nodes.turbine_hub_2.geometry}
                            material={materials.turbineStripes}
                          />
                        </group>
                      </group>
                    </mesh>
                    <mesh
                      name='outerTurbineCase'
                      castShadow
                      receiveShadow
                      geometry={nodes.outerTurbineCase.geometry}
                      material={materials.ImphenziaPixPal}
                      position={[1.216, -0.295, 0.01]}
                      rotation={[-Math.PI, 0, -Math.PI]}
                      scale={[0.407, 0.503, 0.174]}
                    >
                      <group name='outerTurbineSpin_Empty' position={[0, 0, -1.398]} scale={0.381}>
                        <group name='turbine_hub001' position={[0, 0, 2.289]} scale={2.621}>
                          <mesh
                            name='turbine_hub001_1'
                            castShadow
                            receiveShadow
                            geometry={nodes.turbine_hub001_1.geometry}
                            material={materials.ImphenziaPixPal}
                          />
                          <mesh
                            name='turbine_hub001_2'
                            castShadow
                            receiveShadow
                            geometry={nodes.turbine_hub001_2.geometry}
                            material={materials.turbineStripes}
                          />
                        </group>
                      </group>
                    </mesh>
                  </mesh>
                </group>
                <mesh
                  name='wingHousingDoor'
                  castShadow
                  receiveShadow
                  geometry={nodes.wingHousingDoor.geometry}
                  material={materials.ImphenziaPixPal}
                  position={[0.279, 0.186, 0]}
                  rotation={[Math.PI, 0, -2.903]}
                  scale={[0.413, 0.498, 0.174]}
                />
              </mesh>
            </group>
            <group
              name='wingHousingEmpty_R'
              position={[-2.712, 4.847, 0.281]}
              rotation={[0, 0, Math.PI]}
              scale={-1.541}
            >
              <group
                name='wingHousing_R'
                position={[0, -0.879, 0]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={[1.593, 1.29, 3.724]}
              >
                <mesh
                  name='wingHousing_R_1'
                  castShadow
                  receiveShadow
                  geometry={nodes.wingHousing_R_1.geometry}
                  material={materials.ImphenziaPixPal}
                />
                <mesh
                  name='wingHousing_R_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.wingHousing_R_2.geometry}
                  material={nodes.wingHousing_R_2.material}
                />
                <group
                  name='wingBaseEmpty_R'
                  position={[-1.97, 0, 0]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={[0.407, 0.503, 0.174]}
                >
                  <mesh
                    name='wingBase_R'
                    castShadow
                    receiveShadow
                    geometry={nodes.wingBase_R.geometry}
                    material={materials.ImphenziaPixPal}
                    position={[-1.064, 0, 0]}
                    rotation={[Math.PI, 0, Math.PI]}
                    scale={[2.455, 1.988, 5.738]}
                  >
                    <mesh
                      name='innerTurbineCase001'
                      castShadow
                      receiveShadow
                      geometry={nodes.innerTurbineCase001.geometry}
                      material={materials.ImphenziaPixPal}
                      position={[0.556, -0.295, 0.01]}
                      rotation={[-Math.PI, 0, -Math.PI]}
                      scale={[0.407, 0.503, 0.174]}
                    >
                      <group name='innerTurbineSpin_Empty001' position={[0, 0, -1.398]} scale={0.381}>
                        <group name='turbine_hub002' position={[0, 0, 2.289]} scale={2.621}>
                          <mesh
                            name='turbine_hub002_1'
                            castShadow
                            receiveShadow
                            geometry={nodes.turbine_hub002_1.geometry}
                            material={materials.ImphenziaPixPal}
                          />
                          <mesh
                            name='turbine_hub002_2'
                            castShadow
                            receiveShadow
                            geometry={nodes.turbine_hub002_2.geometry}
                            material={materials.turbineStripes}
                          />
                        </group>
                      </group>
                    </mesh>
                    <mesh
                      name='outerTurbineCase001'
                      castShadow
                      receiveShadow
                      geometry={nodes.outerTurbineCase001.geometry}
                      material={materials.ImphenziaPixPal}
                      position={[1.216, -0.295, 0.01]}
                      rotation={[-Math.PI, 0, -Math.PI]}
                      scale={[0.407, 0.503, 0.174]}
                    >
                      <group name='outerTurbineSpin_Empty001' position={[0, 0, -1.398]} scale={0.381}>
                        <group name='turbine_hub003' position={[0, 0, 2.289]} scale={2.621}>
                          <mesh
                            name='turbine_hub003_1'
                            castShadow
                            receiveShadow
                            geometry={nodes.turbine_hub003_1.geometry}
                            material={materials.ImphenziaPixPal}
                          />
                          <mesh
                            name='turbine_hub003_2'
                            castShadow
                            receiveShadow
                            geometry={nodes.turbine_hub003_2.geometry}
                            material={materials.turbineStripes}
                          />
                        </group>
                      </group>
                    </mesh>
                  </mesh>
                </group>
                <group
                  name='wingHousingDoor_R'
                  position={[0.279, 0.186, 0]}
                  rotation={[Math.PI, 0, -2.903]}
                  scale={[0.413, 0.498, 0.174]}
                >
                  <mesh
                    name='wingHousingDoor001'
                    castShadow
                    receiveShadow
                    geometry={nodes.wingHousingDoor001.geometry}
                    material={materials.ImphenziaPixPal}
                  />
                  <mesh
                    name='wingHousingDoor001_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.wingHousingDoor001_1.geometry}
                    material={nodes.wingHousingDoor001_1.material}
                  />
                </group>
              </group>
            </group>
          </group>
          <group name='LANDING_GEAR'>
            <group name='landingGear_frontEMPTY' position={[-0.002, 2.249, 3.582]} scale={0.639}>
              <mesh
                name='landingGear_front'
                castShadow
                receiveShadow
                geometry={nodes.landingGear_front.geometry}
                material={materials.ImphenziaPixPal}
                position={[-32.012, -3.52, -54.448]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={1.565}
              />
            </group>
            <group name='landingGear_backEMPTY' position={[1.386, 2.195, -1.864]} rotation={[Math.PI, 0, Math.PI]}>
              <mesh
                name='landingGear_loweringBlock_back'
                castShadow
                receiveShadow
                geometry={nodes.landingGear_loweringBlock_back.geometry}
                material={materials.ImphenziaPixPal}
                position={[1.415, -0.097, -0.094]}
                scale={[4.122, 1.897, 1]}
              >
                <mesh
                  name='landingGear_back_rotator_L'
                  castShadow
                  receiveShadow
                  geometry={nodes.landingGear_back_rotator_L.geometry}
                  material={materials.ImphenziaPixPal}
                  position={[-0.431, -0.305, 0.091]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                  scale={[0.243, 1, 0.527]}
                >
                  <group
                    name='landingGear_back_leg_L_Empty'
                    position={[0.534, 0.006, 1.176]}
                    rotation={[-Math.PI / 2, 0, -2.518]}
                    scale={-1}
                  >
                    <mesh
                      name='landingGear_back_leg_L'
                      castShadow
                      receiveShadow
                      geometry={nodes.landingGear_back_leg_L.geometry}
                      material={nodes.landingGear_back_leg_L.material}
                      position={[-2.862, 3.421, -0.001]}
                      rotation={[0, 0, 2.518]}
                      scale={-1}
                    />
                  </group>
                </mesh>
                <mesh
                  name='landingGear_back_rotator_R'
                  castShadow
                  receiveShadow
                  geometry={nodes.landingGear_back_rotator_R.geometry}
                  material={materials.ImphenziaPixPal}
                  position={[0.397, -0.305, 0.091]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                  scale={[0.243, 1, 0.527]}
                >
                  <group
                    name='landingGear_back_leg_R_Empty'
                    position={[-0.537, 0.006, 1.181]}
                    rotation={[Math.PI / 2, 0, -2.518]}
                  >
                    <mesh
                      name='landingGear_back_leg_R'
                      castShadow
                      receiveShadow
                      geometry={nodes.landingGear_back_leg_R.geometry}
                      material={materials.ImphenziaPixPal}
                      position={[0.201, 1.219, -0.001]}
                      rotation={[-Math.PI, 0, -2.518]}
                    />
                  </group>
                </mesh>
                <group
                  name='landingGear_back_rotator_R001'
                  position={[0.397, -0.305, 0.091]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                  scale={[0.243, 1, 0.527]}
                />
              </mesh>
            </group>
            <mesh
              name='backWheel_L'
              castShadow
              receiveShadow
              geometry={nodes.backWheel_L.geometry}
              material={materials.ImphenziaPixPal}
              rotation={[Math.PI, 0, Math.PI]}
            />
            <mesh
              name='landingGear_back_rotator_R003'
              castShadow
              receiveShadow
              geometry={nodes.landingGear_back_rotator_R003.geometry}
              material={materials.ImphenziaPixPal}
              position={[-2.637, 0.377, -1.855]}
              rotation={[Math.PI, 0, Math.PI]}
            />
            <mesh
              name='landingGear_front001'
              castShadow
              receiveShadow
              geometry={nodes.landingGear_front001.geometry}
              material={materials.ImphenziaPixPal}
              rotation={[-Math.PI, 0, -Math.PI]}
            />
          </group>
          <group name='TURRET'>
            <group
              name='turretBody_CONTROLLER'
              position={[0, 4.65, -1.313]}
              rotation={[0.931, 0, Math.PI]}
              scale={1.252}
            >
              <mesh
                name='turretBody'
                castShadow
                receiveShadow
                geometry={nodes.turretBody.geometry}
                material={materials.ImphenziaPixPal}
                position={[0, 0.337, 3.646]}
                rotation={[-2.115, 0, 0]}
                scale={0.799}
              >
                <group
                  name='allBarrelsEmpty'
                  position={[-0.001, 2.263, 5.053]}
                  rotation={[0.55, 0, 0]}
                  scale={[2.221, 2.313, 1.004]}
                >
                  <group
                    name='barrell_1Empty'
                    position={[-0.072, 0.064, -0.024]}
                    rotation={[0.032, 0, 0]}
                    scale={[0.45, 0.433, 0.996]}
                  >
                    <mesh
                      name='turret_barrel_1'
                      castShadow
                      receiveShadow
                      geometry={nodes.turret_barrel_1.geometry}
                      material={materials.ImphenziaPixPal}
                      position={[0, -0.031, -2.385]}
                      rotation={[-0.574, 0, 0]}
                    />
                  </group>
                  <group
                    name='barrell_2Empty'
                    position={[0.072, 0.058, -0.026]}
                    rotation={[0.032, 0, 0]}
                    scale={[0.45, 0.433, 0.996]}
                  >
                    <mesh
                      name='turret_barrell_2'
                      castShadow
                      receiveShadow
                      geometry={nodes.turret_barrell_2.geometry}
                      material={materials.ImphenziaPixPal}
                      position={[0.003, -0.006, -2.029]}
                      rotation={[-0.297, 0, 0]}
                    />
                  </group>
                  <group
                    name='barrell_3Empty'
                    position={[0.073, -0.079, -0.027]}
                    rotation={[0.032, 0, 0]}
                    scale={[0.45, 0.433, 0.996]}
                  >
                    <mesh
                      name='turret_barrell_3002'
                      castShadow
                      receiveShadow
                      geometry={nodes.turret_barrell_3002.geometry}
                      material={materials.ImphenziaPixPal}
                      position={[-0.161, -0.009, -2.368]}
                      rotation={[-0.559, 0, 0]}
                    />
                  </group>
                  <group
                    name='barrell_4Empty'
                    position={[-0.072, -0.079, -0.029]}
                    rotation={[0.032, 0, 0]}
                    scale={[0.45, 0.433, 0.996]}
                  >
                    <mesh
                      name='turret_barrell_3001'
                      castShadow
                      receiveShadow
                      geometry={nodes.turret_barrell_3001.geometry}
                      material={materials.ImphenziaPixPal}
                      position={[0.161, -0.009, -2.366]}
                      rotation={[-0.559, 0, 0]}
                    />
                  </group>
                  <group
                    name='barrell1_bulletEmitter'
                    position={[-0.072, 0.066, -0.438]}
                    rotation={[1.57, 0, 0]}
                    scale={[0.199, 0.441, 0.191]}
                  />
                  <group
                    name='barrell1_emitter_PosEmpty'
                    position={[-0.072, 0.066, -0.438]}
                    rotation={[1.553, 0, 0]}
                    scale={[0.45, 0.996, 0.432]}
                  />
                  <group
                    name='barrell2_emitter_PosEmpty'
                    position={[0.074, 0.066, -0.438]}
                    rotation={[1.553, 0, 0]}
                    scale={[0.45, 0.996, 0.432]}
                  />
                  <group
                    name='barrell3_emitter_PosEmpty'
                    position={[0.074, -0.073, -0.441]}
                    rotation={[1.553, 0, 0]}
                    scale={[0.45, 0.996, 0.432]}
                  />
                  <group
                    name='barrell4_emitter_PosEmpty'
                    position={[-0.072, -0.073, -0.441]}
                    rotation={[1.553, 0, 0]}
                    scale={[0.45, 0.996, 0.432]}
                  />
                </group>
              </mesh>
            </group>
            <group name='turretDoor_Empty' position={[0, 2.224, -3.918]} rotation={[Math.PI, 0, -Math.PI / 2]} />
            <group name='turretDoor_R_Empty' position={[0, 2.481, -4.239]} rotation={[-Math.PI, 0, Math.PI / 2]} />
            <group name='TurretTargetEMPTY' position={[0, 0.325, -7.123]} rotation={[Math.PI, 0, Math.PI]} />
            <mesh
              name='bullet'
              castShadow
              receiveShadow
              geometry={nodes.bullet.geometry}
              material={materials.bullet}
              position={[2.701, 4.39, 0.21]}
              rotation={[-1.555, -0.001, -0.056]}
              scale={[0.311, 0.401, 0.311]}
            />
          </group>
          <group name='LIGHTS'>
            <group
              name='landingGear_front_wheel_Empty'
              position={[0.007, 0.39, 3.915]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[1, 0.294, 0.294]}
            />
            <group
              name='landingGear_back_L_wheel_Empty'
              position={[2.812, 0.382, -1.856]}
              rotation={[Math.PI, 0, Math.PI]}
              scale={[1, 0.381, 0.381]}
            />
            <group
              name='landingGear_back_R_wheel_Empty'
              position={[-2.75, 0.377, -1.855]}
              rotation={[Math.PI, 0, Math.PI]}
              scale={[1, 0.409, 0.409]}
            />
            <mesh
              name='balloon_partyLights'
              castShadow
              receiveShadow
              geometry={nodes.balloon_partyLights.geometry}
              material={materials.partyLights}
            />
            <mesh
              name='balloonRudder_T_partyLight'
              castShadow
              receiveShadow
              geometry={nodes.balloonRudder_T_partyLight.geometry}
              material={materials.partyLights}
              position={[0.005, 21.073, -21.105]}
              scale={[11.598, 5.56, 4.407]}
            />
            <mesh
              name='balloonRudder_R_partyLight'
              castShadow
              receiveShadow
              geometry={nodes.balloonRudder_R_partyLight.geometry}
              material={materials.partyLights}
              position={[-6.709, 14.441, -21.163]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[11.598, 5.56, 4.407]}
            />
            <mesh
              name='balloonRudder_B_partyLight'
              castShadow
              receiveShadow
              geometry={nodes.balloonRudder_B_partyLight.geometry}
              material={materials.partyLights}
              position={[0.005, 20.995, -21.027]}
              scale={[11.598, 5.56, 4.407]}
            />
            <mesh
              name='balloonRudder_L_partyLight'
              castShadow
              receiveShadow
              geometry={nodes.balloonRudder_L_partyLight.geometry}
              material={materials.partyLights}
            />
            <mesh
              name='balloonPropeller_partyLights'
              castShadow
              receiveShadow
              geometry={nodes.balloonPropeller_partyLights.geometry}
              material={materials.partyLights}
            />
            <mesh
              name='insideTurbineStripeLight'
              castShadow
              receiveShadow
              geometry={nodes.insideTurbineStripeLight.geometry}
              material={materials.partyLights}
              position={[1.924, 2.905, 0.762]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              name='insideTurbineStripeLight001'
              castShadow
              receiveShadow
              geometry={nodes.insideTurbineStripeLight001.geometry}
              material={materials.partyLights}
              position={[0.305, 2.905, 0.762]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              name='insideTurbineStripeLight002'
              castShadow
              receiveShadow
              geometry={nodes.insideTurbineStripeLight002.geometry}
              material={materials.partyLights}
              position={[-0.305, 2.905, 0.762]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
            <mesh
              name='insideTurbineStripeLight003'
              castShadow
              receiveShadow
              geometry={nodes.insideTurbineStripeLight003.geometry}
              material={materials.partyLights}
              position={[-1.924, 2.905, 0.762]}
              rotation={[Math.PI / 2, 0, Math.PI]}
            />
          </group>
          <PerspectiveCamera
            name='Camera_1'
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={21.631}
            position={[23.786, 7.869, 31.186]}
            rotation={[-0.067, 0.578, 0.037]}
          />
          <PerspectiveCamera
            name='RoamingCAMERA'
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={22.895}
            position={[3.57, -2.607, 13.24]}
            rotation={[0.476, 0.377, -0.187]}
          />
          <mesh
            name='gondala_turretDoor_R'
            castShadow
            receiveShadow
            geometry={nodes.gondala_turretDoor_R.geometry}
            material={materials.ImphenziaPixPal}
            position={[0, 3.217, 3.683]}
            scale={[11.598, 5.56, 4.407]}
          />
          <mesh
            name='gondala_turretDoor'
            castShadow
            receiveShadow
            geometry={nodes.gondala_turretDoor.geometry}
            material={materials.ImphenziaPixPal}
            position={[0, 3.217, 3.683]}
            scale={[11.598, 5.56, 4.407]}
          />
          <mesh
            name='insideLight_aft'
            castShadow
            receiveShadow
            geometry={nodes.insideLight_aft.geometry}
            material={materials.insideEmissiveLighting}
            position={[-0.006, 2.098, -2.209]}
            rotation={[Math.PI / 2, 0, Math.PI]}
            scale={[6.758, 0.35, 0.151]}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Blimp.glb')
