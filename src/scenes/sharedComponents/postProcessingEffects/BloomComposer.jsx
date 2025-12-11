import * as THREE from "three"
import { useThree, useFrame } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { useRef, useEffect } from 'react'

export default function BloomComposer() {
  const composer = useRef()
  const { scene, camera, gl, size } = useThree()

  useEffect(() => {
    composer.current = new EffectComposer(gl)
    composer.current.addPass(new RenderPass(scene, camera))

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      .21, // intensity
      0.414, // radius
      0.12, // threshold
    )
    composer.current.addPass(bloomPass)
  }, [gl, scene, camera, size])

  useFrame(() => composer.current && composer.current.render(), 1)

  return null
}
