import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useAnimations } from '@react-three/drei'
import { cloneElement } from 'react'

//@ USAGE line: 80

export default function PiPRender({
  mode = 'texture',
  cameraRef,
  scene = null,
  targetObj = null,
  gltf = null,
  actionName = null,
  canvasRef = null,
  width = 300,
  height = 400,
}) {
  const { gl } = useThree()
  const renderTarget = useRef(new THREE.WebGLRenderTarget(width, height))
  const model = gltf?.scene.clone(true)
  const sceneRef = useRef(scene || new THREE.Scene())
  const { actions, mixer } = useAnimations(gltf?.animations || [], model)

  //ACTIONS
  useEffect(() => {
    if (!model) return

    sceneRef.current.add(model)
    const action = actionName && actions?.[actionName]
    if (action) {
      action.reset().fadeIn(0.3).play()
    }

    return () => {
      sceneRef.current.remove(model)
    }
  }, [model, actions, actionName])

  //AS TEXTURE
  useEffect(() => {
    if (mode === 'texture' && targetObj?.material) {
      targetObj.material.map = renderTarget.current.texture
      targetObj.material.needsUpdate = true
    }
  }, [mode, targetObj])

  useEffect(() => {
    console.log('%c🟢 PiPRender mounted!', 'color:lime')
    console.log('cameraRef:', cameraRef?.current)
    console.log('canvasRef:', canvasRef?.current)
  }, [])

  useFrame((_, delta) => {
    const cam = cameraRef?.current
    if (!cam || !sceneRef.current) return

    gl.setRenderTarget(renderTarget.current)
    gl.render(sceneRef.current, cam)
    gl.setRenderTarget(null)

    mixer?.update(delta)

    // Optional canvas buffer copy
    if (mode === 'html' && canvasRef?.current) {
      const pixels = new Uint8Array(width * height * 4)
      gl.readRenderTargetPixels(renderTarget.current, 0, 0, width, height, pixels)

      const ctx = canvasRef?.getContext('2d')
      if (ctx) {
        const imageData = ctx.createImageData(width, height)
        imageData.data.set(pixels)
        ctx.putImageData(imageData, 0, 0)
      }
    }
    
  })

  return null
}







/*
===========================================
PiPRender — Picture-in-Picture Renderer
===========================================

Renders a secondary camera view either:
  ➤ Onto a 3D object's material in your scene (mode = 'texture')
  ➤ Into a canvas inside an HTML <div> (mode = 'html')

-------------------------------------------
EXAMPLE 1: 3D Material Texture (TV screen)
-------------------------------------------
<PiPRender
  mode="texture"
  cameraRef={cameraRef}         // THREE.PerspectiveCamera ref
  scene={someScene}             // Optional: Scene to render from
  targetObj={monitorMesh}       // Mesh to apply render texture
  gltf={gltf}                   // Optional: GLTF scene w/ animations
  actionName="Idle"             // Optional: Animation to play
  width={512}
  height={512}
/>

-------------------------------------------
EXAMPLE 2: HTML Canvas inside a styled <div>
-------------------------------------------
<Html portal="#overlay-root">
  <div className="absolute top-10 right-10 w-[300px] h-[200px] shadow-xl">
    <canvas ref={pipCanvasRef} className="w-full h-full" />
    <div className="absolute bottom-2 left-2 text-white text-sm">Camera 2</div>
  </div>
</Html>

<PiPRender
  mode="html"
  cameraRef={cameraRef}
  scene={scene}
  gltf={gltf}
  actionName="Fly"
  width={300}
  height={200}
  canvasRef={pipCanvasRef}
/>

-------------------------------------------
EXAMPLE 3: Self-contained character preview
-------------------------------------------
<Html portal="#overlay-root">
  <div className="absolute bottom-4 left-4 w-[250px] h-[250px]">
    <canvas ref={avatarCanvasRef} className="w-full h-full rounded-lg" />
  </div>
</Html>

<PiPRender
  mode="html"
  cameraRef={avatarCameraRef}
  gltf={avatarGLTF}
  actionName="Wave"
  width={250}
  height={250}
  canvasRef={avatarCanvasRef}
/>

-------------------------------------------
SUPPORTED PROPS:
-------------------------------------------
- mode:         'texture' | 'html'         // Rendering mode
- cameraRef:    ref to PerspectiveCamera  // Required
- scene:        THREE.Scene               // Optional, or derived from gltf
- targetObj:    Mesh                      // Required for 'texture' mode
- gltf:         { scene, animations }     // Optional, for animation support
- actionName:   string                    // Optional, animation to play
- canvasRef:    ref to <canvas> element   // Required for 'html' mode
- width/height: number                    // Optional render resolution

*/

