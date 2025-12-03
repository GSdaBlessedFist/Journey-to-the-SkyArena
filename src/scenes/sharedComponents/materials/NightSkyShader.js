// src/shaders/NightSkyShader.js
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { forwardRef } from 'react'
import * as THREE from 'three'

// Vertex shader: same as DaySky
const vertexShader = `
varying vec3 vWorldDirection;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 0.0);
  vWorldDirection = normalize(worldPosition.xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// Fragment shader: blends bottom (midnight blue) → top (black)
const fragmentShader = `
varying vec3 vWorldDirection;
uniform vec3 colorBottom;
uniform vec3 colorTop;

void main() {
  
  //float t = pow((normalize(vWorldDirection).y + 1.0) / 2.0, 5.0);

  float t = (normalize(vWorldDirection).y + 1.0) / 2.0;
  vec3 color = mix(colorBottom, colorTop, t);
  gl_FragColor = vec4(color, 1.0);
}
`

// Night gradient: deeper tones for skybox
const NightSkyShaderMaterial = shaderMaterial(
  {
    colorBottom: new THREE.Color(0.0627, 0.1373, 0.4784),
    colorTop: new THREE.Color(1.0, 1.0, 1.0),
  },
  vertexShader,
  fragmentShader,
  (self) => {
    self.side = THREE.BackSide  // ✅ sets the actual instance's side
  }
)


extend({ NightSkyShaderMaterial })

// export function NightSkyMaterial(props) {
//   return <nightSkyShaderMaterial attach="material" {...props} />
// }
export const NightSkyMaterial = forwardRef((props, ref) => {
  return <nightSkyShaderMaterial ref={ref} attach="material" {...props} />
})
export default NightSkyShaderMaterial


