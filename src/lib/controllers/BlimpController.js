import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import React, { useEffect, useRef } from "react"

export default function BlimpController({ scene, blimpRef, groupRef, actions, mixer }) {
    const keys = React.useRef({ w: false, s: false })
    const playbackSpeed = React.useRef(0)
    const currentTime = React.useRef(0)

    // keyboard listeners
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'w' || e.key === 'W') keys.current.w = true
            if (e.key === 's' || e.key === 'S') keys.current.s = true
        }
        const handleKeyUp = (e) => {
            if (e.key === 'w' || e.key === 'W') keys.current.w = false
            if (e.key === 's' || e.key === 'S') keys.current.s = false
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    useEffect(() => {
        const clip = actions["BAKED_BlimpEmptyAction"]?.getClip()
        if (clip) {
            console.log("CLIP DURATION:", clip.duration)
        }
    }, [actions])
    useFrame((state, delta) => {
        if (!actions || !groupRef.current) return

        const animAction = actions['BAKED_BlimpEmptyAction']
        if (!animAction) return

        switch (scene) {
            case 'HangarScene': {
                // ---------------------------------------------------
                // 1. Acceleration & damping
                // ---------------------------------------------------
                const accel = 3.0
                const damping = 2.5

                if (keys.current.w) playbackSpeed.current += accel * delta
                if (keys.current.s) playbackSpeed.current -= accel * delta
                if (!keys.current.w && !keys.current.s)
                    playbackSpeed.current *= Math.exp(-damping * delta)

                playbackSpeed.current = Math.min(
                    Math.max(playbackSpeed.current, -4),
                    4
                )

                // ---------------------------------------------------
                // 2. Advance baked animation time
                // ---------------------------------------------------
                const duration = animAction.getClip().duration

                const speedScale = 10  // try 5, we can tune
                currentTime.current += delta * playbackSpeed.current * speedScale
                // currentTime.current =
                //     ((currentTime.current % duration) + duration) % duration

                // prevent moving behind the start of the baked animation
                if (currentTime.current < 0) {
                    currentTime.current = 0
                    playbackSpeed.current = Math.max(playbackSpeed.current, 0)   // remove negative motion
                }
                else if (currentTime.current > duration) {
                    currentTime.current = duration
                    playbackSpeed.current = Math.min(playbackSpeed.current, 0)
                }

                animAction.time = currentTime.current
                animAction.paused = true
                mixer.setTime(currentTime.current)

                // ---------------------------------------------------
                // 3. Apply local forward offset
                // ---------------------------------------------------
                const forward = new THREE.Vector3(0, 0, -1)  // adjust axis if needed
                forward.applyQuaternion(groupRef.current.quaternion)
                forward.multiplyScalar(playbackSpeed.current * delta)

                groupRef.current.position.add(forward)

                break
            }

            case 'ChapterOneScene': {
                // RESERVED FOR LATER
                break
            }
        }
    })
    



    return null
}

