// // 2026-01-07 00:11
// 'use client'

// import { createPortal } from 'react-dom'
// import { FadeActorContext } from '@/actors/FadeActorContext'
// import p from '@/lib/imported_utilities/helpers/consoleHelper'

// const SOURCE = 'CameraFadePortal.jsx'
// const srcColor = [25, 36]

// export default function CameraFadePortal() {
//   // -------------------------------
//   // Read fade state from global actor
//   // -------------------------------
//   const fadeState = FadeActorContext.useSelector((state) => state)
//   const { opacity, duration=5000 } = fadeState.context

//   if (typeof document === 'undefined') return null
//   if (!fadeState.matches('fading')) return null
  

//   const overlayRoot = document.getElementById('overlay-root')
//   if (!overlayRoot) return null

//   return createPortal(
//     <div
//       style={{
//         position: 'fixed',
//         inset: 0,
//         background: 'black',
//         opacity,
//         transition: `opacity ${duration}ms ease`,
//         pointerEvents: 'none',
//         zIndex: 9999,
//       }}
//     />,
//     overlayRoot,
//   )
// }


'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FadeActorContext } from '@/actors/FadeActorContext'

export default function CameraFadePortal() {
  const fadeState = FadeActorContext.useSelector((state) => state)
  const { opacity, duration = 2500 } = fadeState.context
  const overlayRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const overlayRoot = document.getElementById('overlay-root')
    if (!overlayRoot) return

    // Mount overlay div once
    const div = document.createElement('div')
    div.style.position = 'fixed'
    div.style.inset = '0'
    div.style.background = 'black'
    div.style.pointerEvents = 'none'
    div.style.zIndex = '9999'
    div.style.opacity = '0'
    div.style.transition = `opacity ${duration}ms ease`

    overlayRoot.appendChild(div)
    overlayRef.current = div
    setMounted(true)

    return () => {
      overlayRoot.removeChild(div)
    }
  }, [])

  // Update opacity whenever fadeState changes
  useEffect(() => {
    if (!overlayRef.current || !mounted) return
    overlayRef.current.style.transition = `opacity ${duration}ms ease`
    overlayRef.current.style.opacity = fadeState.matches('fading') || fadeState.matches('midpoint') ? opacity : 0
  }, [fadeState, opacity, duration, mounted])

  // Always return null to stay safe inside R3F
  return null
}
