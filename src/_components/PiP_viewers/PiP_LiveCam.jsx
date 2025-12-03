// components/PiP_LiveCam.jsx
import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

export default function PiP_LiveCam({
  cameraRef,
  canvasRef,
  width = 300,
  height = 400,
  mode = 'html', // defaults to 'html'
}) {
  const { gl,scene } = useThree()
  const renderTarget = useRef(new THREE.WebGLRenderTarget(width, height))

  useEffect(() => {
    console.log('🟢 PiP_LiveCam mounted')
    console.log('cameraRef:', cameraRef?.current)
    console.log('canvasRef:', canvasRef?.current)
  }, [])

  useFrame(() => {
    const cam = cameraRef?.current
    if (!cam) return

    gl.setRenderTarget(renderTarget.current)
    gl.render(scene, cam) // assumes the current scene in gl
    gl.setRenderTarget(null)

    if (mode === 'html' && canvasRef?.current) {
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

  return null
}
