
// 2025-12-18 10:22
import { Html } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import p from '@/lib/imported_utilities/helpers/consoleHelper'
import { createPortal } from 'react-dom'


const SOURCE = 'CameraFadePortal off'
const srcColor = [25,36]

const FADE_DURATION = 5000 // ms

export default function CameraFadePortal({ visible, onMidpoint }) {
  const midpointFired = useRef(false)

  useEffect(() => {
    if (visible && !midpointFired.current) {
      midpointFired.current = true
      const id = setTimeout(() => {
        onMidpoint?.()
      }, FADE_DURATION / 2)

      return () => clearTimeout(id)
    }

    if (!visible) {
      midpointFired.current = false
    }
  }, [visible, onMidpoint])

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'black',
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_DURATION}ms ease`,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />,
    document.body
  )
}
