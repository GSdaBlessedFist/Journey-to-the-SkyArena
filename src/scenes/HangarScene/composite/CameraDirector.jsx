// CameraDirector.jsx
// 2025-12-18 09:41

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import p from '@/lib/imported_utilities/helpers/consoleHelper'

const SOURCE = 'CameraDirector'
const srcColor = [80, 56]

const CameraDirector = forwardRef(function CameraDirector(_, ref) {
  const { set, camera: activeCamera } = useThree()
  const cameras = useRef({})
  const fadeCallbackRef = useRef(null)

  const registerCamera = (name, camera) => {
    cameras.current[name] = camera
  }

  const cutTo = (name) => {
    const target = cameras.current[name]
    if (!target) {
      console.warn(`[CameraDirector] No camera registered as "${name}"`)
      return
    }

    set({ camera: target })
  }

 

  useImperativeHandle(ref, () => ({
    registerCamera,
    cutTo
  }))

  return null
})

export default CameraDirector
