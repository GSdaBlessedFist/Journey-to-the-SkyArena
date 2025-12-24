import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { usePortfolio } from '@/providers/PortfolioProvider'
import p from '@/lib/imported_utilities/helpers/consoleHelper'

const SOURCE = 'HangarMENU'
const srcColor = [140]

// WELCOME  SV021  Liftoff  CHAPTERS  
// CHAPTER 1 Star CHAPTER 2 Star CHAPTER 3 Star 
// CHAPTER 4 Star CHAPTER 5 Star

export default function HangarMenu({ nodes, materials, actions, onLiftoff }) {
  if (!nodes || !materials) {
    console.warn('[HangarMenu] nodes or materials not provided')
    return null
  }
  const { goToTitle, goToHangar, goToOutside, goToChapterOne, goToChapterTwo, goToChapterThree, goToFinalProjectDemo } =
    usePortfolio()

  //MENU ITEMS
  const menuItemWelcomeRef = useRef()
  const menuItemSV021Ref = useRef()
  const menuItemLiftoffRef = useRef()
  const menuItemStar_chap1Ref = useRef()
  const menuItemStar_chap2Ref = useRef()
  const menuItemStar_chap3Ref = useRef()
  const menuItemStar_chap4Ref = useRef()
  const menuItemStar_chap5Ref = useRef()

  

  return (
    <group name='COLLECTION_HangarMenu' userData={{ name: 'COLLECTION_HangarMenu' }}>
      <group
        name='menuItem_star_chap5'
        position={[26.768, 1.951, -51.571]}
        rotation={[Math.PI / 2, 0, -0.506]}
        scale={[5.145, 6.998, 5.145]}
        userData={{ name: 'menuItem_star_chap5' }}
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
        name='menuItem_welcome'
        position={[27.823, 4.61, -52.155]}
        rotation={[Math.PI / 2, 0, -0.506]}
        scale={[5.145, 6.998, 5.145]}
        userData={{ name: 'menuItem_welcome' }}
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
        name='menuItem_sv021'
        position={[27.764, 3.88, -52.122]}
        rotation={[Math.PI / 2, 0, -0.506]}
        scale={[5.145, 6.998, 5.145]}
        userData={{ name: 'menuItem_sv021' }}
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
        name='menuItem_liftoff'
        position={[27.869, 3.129, -52.18]}
        rotation={[Math.PI / 2, 0, -0.506]}
        scale={[5.145, 6.998, 5.145]}
        onClick={() => {
          p(SOURCE,128,srcColor,'Lift off pressed')
          onLiftoff?.()
        }}
        userData={{ name: 'menuItem_liftoff' }}
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
        name='menuItem_star_chap1'
        position={[28.666, 1.951, -52.622]}
        rotation={[Math.PI / 2, 0, -0.506]}
        scale={[5.145, 6.998, 5.145]}
        userData={{ name: 'menuItem_star_chap1' }}
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
        name='menuItem_star_chap2'
        position={[28.192, 1.951, -52.359]}
        rotation={[Math.PI / 2, 0, -0.506]}
        scale={[5.145, 6.998, 5.145]}
        userData={{ name: 'menuItem_star_chap2' }}
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
        name='menuItem_star_chap3'
        position={[27.717, 1.951, -52.097]}
        rotation={[Math.PI / 2, 0, -0.506]}
        scale={[5.145, 6.998, 5.145]}
        userData={{ name: 'menuItem_star_chap3' }}
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
        name='menuItem_star_chap4'
        position={[27.243, 1.951, -51.834]}
        rotation={[Math.PI / 2, 0, -0.506]}
        scale={[5.145, 6.998, 5.145]}
        userData={{ name: 'menuItem_star_chap4' }}
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
  )
}

useGLTF.preload('/models/Scene_hangar.glb')

