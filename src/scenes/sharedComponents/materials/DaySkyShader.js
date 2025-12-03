// src/shaders/DaySkyShader.js
import { ShaderMaterial } from 'three'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

// GLSL: vertex shader
const vertexShader = `
varying vec3 vWorldDirection;

void main() {
  // Transform vertex position into world space direction
  vec4 worldPosition = modelMatrix * vec4(position, 0.0);
  vWorldDirection = normalize(worldPosition.xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// GLSL: fragment shader
const fragmentShader = `
varying vec3 vWorldDirection;
uniform vec3 colorBottom;
uniform vec3 colorTop;

void main() {
  // Normalize direction's Y component for vertical gradient (bottom → top)
  float t = (normalize(vWorldDirection).y + 1.0) / 2.0;
  vec3 color = mix(colorBottom, colorTop, t);
  gl_FragColor = vec4(color, 1.0);
}
`

const DaySkyShaderMaterial = shaderMaterial(
  {
    colorBottom: [0.50196, 0.72549, 1.0],
    colorTop: [0.97254902, 0.98431373, 1.0]
  },
  vertexShader,
  fragmentShader,
  (self) => {
    self.side = THREE.BackSide 
  }
)

extend({ DaySkyShaderMaterial })

export function DaySkyMaterial(props) {
  return <daySkyShaderMaterial attach="material" {...props} />
}

export default DaySkyShaderMaterial

