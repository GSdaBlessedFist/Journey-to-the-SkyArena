import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import p from '../lib/helpers/consoleHelper'

const SOURCE = 'CameraFade'
const srcColor = '185'

export function CameraFade({ triggerKey, onFadeComplete,color = 'black' }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (triggerKey && overlayRef.current) {
      const overlay = overlayRef.current

      // Fade in
      gsap.to(overlay, {
        duration: 1,
        opacity: 1,
        onComplete: () => {
          onFadeComplete?.()

          // Fade out
          gsap.to(overlay, {
            duration: 1,
            opacity: 0,
          })
        },
      })
    }
  }, [triggerKey, onFadeComplete])

  return (
    <div
      ref={overlayRef}
      className='fade-overlay'
      style={{
        position: 'fixed', // ⬅ important for viewport anchoring
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: color,
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'none', // ⬅ disables R3F's transform injection
      }}
    />
  )
}
