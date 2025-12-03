// components/CameraFadePortal.jsx
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'

export default function CameraFadePortal({ triggerKey, onFadeComplete, color = 'black', duration = .5 }) {
  const overlayRef = useRef()

  useEffect(() => {
    if (!triggerKey || !overlayRef.current) return

    const overlay = overlayRef.current

    const fadeIn = gsap.to(overlay, {
      duration: duration,
      opacity: 1,
      onComplete: () => {
        onFadeComplete?.()
        gsap.to(overlay, {
          duration: duration + 0.25,
          opacity: 0,
        })
      },
    })

    return () => {
      fadeIn.kill()
      gsap.killTweensOf(overlay)
    }
  }, [triggerKey, onFadeComplete])



  return createPortal(
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: color,
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        // transition: 'opacity 0.3s ease',
      }}
    />,
    document.getElementById('overlay-root'),
  )
}
