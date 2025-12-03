import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

//-----------------------------------------------
// Custom shader for soft, faded clouds
//-----------------------------------------------
const CloudShaderMaterial = shaderMaterial(
  {
    uColor: new THREE.Color(0xffffff),
    uOpacity: 0.85,
    uTopColor: new THREE.Color(0xffffff),
    uBottomColor: new THREE.Color(0xcce0ff),
  },
  // Vertex Shader
  `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform vec3 uColor;
  uniform vec3 uTopColor;
  uniform vec3 uBottomColor;
  uniform float uOpacity;
  varying vec3 vPos;

  void main() {
    // simple vertical gradient based on height
    float heightFactor = smoothstep(-50.0, 50.0, vPos.x);
    vec3 gradient = mix(uBottomColor, uTopColor, heightFactor);

    // radial fade for soft edges
    float alpha = 1.0 - smoothstep(0.0, 150.0, length(vPos.yz));
    alpha *= uOpacity;

    gl_FragColor = vec4(gradient, alpha);
  }
  `,
)

extend({ CloudShaderMaterial })
export { CloudShaderMaterial }
