// Overlay.jsx
import TitlePlacard from '../scenes/TitleScene/components/TitlePlacard'
import OnscreenInstruction from './sharedComponents/OnscreenInstruction'


export default function Overlay({ sceneName, timeSetting }) {
  const className =
    (sceneName === 'title') ?
     'absolute inset-0 select-none' :
     'absolute inset-0 select-none pointer-events-none'
  return (
    <>
      <div className={className}>
        {sceneName === 'title' && <TitlePlacard timeSetting={timeSetting} />}
        {sceneName === 'hangar' && <OnscreenInstruction sceneName={'hangar'} />}
      </div>
    </>
  )
}
