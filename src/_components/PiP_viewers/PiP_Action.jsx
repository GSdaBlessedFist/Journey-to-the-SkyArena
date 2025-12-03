import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useAnimations } from '@react-three/drei'
import { Html } from '@react-three/drei'

export default function PiP_Action({
  cameraRef,
  gltf,
  actionName,
  width = 300,
  height = 400,
  mode = 'html', // default
}) {
  const { gl } = useThree()
  const canvasRef = useRef(null)
  const renderTarget = useRef(new THREE.WebGLRenderTarget(width, height))
  const model = gltf?.scene?.clone(true)
  const sceneRef = useRef(new THREE.Scene())
  const { actions, mixer } = useAnimations(gltf?.animations || [], model)

  // Add model and play action
  useEffect(() => {
    if (!model) return
    sceneRef.current.add(model)

    const action = actions?.[actionName]
    if (action) {
      action.reset().fadeIn(0.3).play()
    }

    return () => sceneRef.current.remove(model)
  }, [model, actions, actionName])

  useFrame((_, delta) => {
    const cam = cameraRef?.current
    if (!cam) return

    gl.setRenderTarget(renderTarget.current)
    gl.render(sceneRef.current, cam)
    gl.setRenderTarget(null)

    mixer?.update(delta)

    // Push rendered pixels to canvas
    if (mode === 'html' && canvasRef.current) {
      const pixels = new Uint8Array(width * height * 4)
      gl.readRenderTargetPixels(renderTarget.current, 0, 0, width, height, pixels)

      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        const imageData = ctx.createImageData(width, height)
        imageData.data.set(pixels)
        ctx.putImageData(imageData, 0, 0)
      }
    }
  })

  if (mode === 'html') {
    return (
      <Html portal='#pip_layer-root' fullscreen>
        <div className='relative w-full h-full'>
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{
              position: 'absolute',
              left: 50,
              top: 50,
              width: `${width}px`,
              height: `${height}px`,
            }}
          />
        </div>
      </Html>
    )
  }

  return null
}
