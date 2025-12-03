import * as THREE from 'three'

export default class BlimpController {
    constructor(curve) {
        this.curve = curve

        this.progress = 0
        this.velocity = 0

        this.maxSpeed = 0.02
        this.acceleration = 0.00005
        this.deceleration = 0.97

        this.keys = { forward: false }

        this.position = new THREE.Vector3()
        this.quaternion = new THREE.Quaternion()
    }

    handleKeyDown(code) {
        if (code === 'KeyW') this.keys.forward = true
    }

    handleKeyUp(code) {
        if (code === 'KeyW') this.keys.forward = false
    }

    update(delta) {
        // 1. velocity
        if (this.keys.forward) {
            this.velocity += delta * this.acceleration
            this.velocity = Math.min(this.velocity, this.maxSpeed)
        } else {
            this.velocity *= this.deceleration
        }

        // 2. progress
        this.progress = Math.min(this.progress + this.velocity, 1)

        // 3. sample the curve
        const point = this.curve.getPointAt(this.progress)
        const tangent = this.curve.getTangentAt(this.progress)

        this.position.copy(point)

        const target = point.clone().add(tangent)
        const lookAtMatrix = new THREE.Matrix4()
        lookAtMatrix.lookAt(point, target, new THREE.Vector3(0, 1, 0))
        this.quaternion.setFromRotationMatrix(lookAtMatrix)
    }
}
