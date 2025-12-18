// 2025-12-18 10:41
import { Leva, useControls } from 'leva'

/**
 * Owns the Leva panel.
 * This should be mounted once, near the root of your app or scene.
 */
export function LevaProvider({ children }) {
  return (
    <>
      <Leva collapsed={false}
        hidden={false}
        fill={false}
        style={{
          position: 'relative',
          top: 0,
          right: 0,
          zIndex: 9999}} />
      {children}
    </>
  )
}

export function useLevaControls(folder, config) {
  return useControls(folder, config)
}
