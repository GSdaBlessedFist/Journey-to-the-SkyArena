// /src/scenes/HangarScene/composite/HangarOrchestrator.jsx

import { useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from "three";
import p from '@/lib/helpers/consoleHelper'

const SOURCE = 'HangarOrcestrator.jsx'
const srcColor = [240, 76]
/**
 * HangarOrchestrator:
 * This component exposes a set of scene-control functions
 * that can be called from other components (like HangarMenu).
 */

const HangarOrchestrator = forwardRef(function HangarOrchestrator({nodes,materials,actions},ref){
  const api = useRef({});


  api.current.startLiftoffSequence = ()=>{
    p(SOURCE, 19, srcColor, "Liftoff sequence started");

    //Hangar door animation
    const doorAction = actions?.['hangarDoors_OpeningAction'];
    if(doorAction){
      doorAction.reset();
      doorAction.setLoop(THREE.LoopOnce);
      doorAction.clampWhenFinished = true;
      doorAction.play();
      p(SOURCE,29,srcColor,"Doors opening")
    }else{
      console.warn('[HangarOrchestrator :31] No door action found')
    }
  }
  api.current.moveBlimp = () => {//  <-------------HERE
    // Ensure we have a reference to the blimp controller
    if (!blimpControllerRef?.current) return

    const controller = blimpControllerRef.current

    // Animate the blimp automatically along the curve
    const moveStep = (delta) => {
      controller.keys.forward = true // simulate holding forward
      controller.update(delta)

      // Stop when we reach the end
      if (controller.progress < 1) {
        requestAnimationFrame(() => moveStep(0.016)) // ~60fps
      } else {
        controller.keys.forward = false
      }
    }

    moveStep(0.016)
  }

  api.current.playCutscene = () => {}

  //Expose API upward
  useImperativeHandle(ref,()=>api.current)

  return null
})

export default HangarOrchestrator;