// Overlay.jsx

import TitlePlacard from "@/scenes/TitleScene/components/TitlePlacard"
import OnscreenInstruction from "../instructions/OnscreenInstruction"



export default function Overlay({ sceneName, timeSetting, fadeVisible }) {
  const className =
    sceneName === 'title' ? 'absolute inset-0 select-none' : 'absolute inset-0 select-none pointer-events-none'

  return (
    <>
      <div className={className}>
        {sceneName === 'title' && <TitlePlacard timeSetting={timeSetting} />}
        {sceneName === 'hangar' && <OnscreenInstruction sceneName={'hangar'} />}
      </div>

      {/* Camera fade overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'black',
          opacity: fadeVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
    </>
  )
}
