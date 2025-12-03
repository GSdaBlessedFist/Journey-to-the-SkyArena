import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

function normalizeSpotlightIntensities(scene, scaleFactor = 1) {
    scene.traverse((object) => {
        if (object.name.startsWith('SpotLight')) {
            if (object.isLight) {
                // Adjust light intensity
                //object.intensity *= scaleFactor;
                object.intensity = 1
                console.log(`Normalized ${object.name} intensity to`, object.intensity);
            }

            console.log(object.intensity)
            // Optional: if you want to catch SpotLight targets too (they’re usually Object3Ds)
            // if (object.userData && object.userData.name?.startsWith('SpotLight')) {
            //     console.log(`Found SpotLight related object:`, object);
            // }
        }
    });
}

export default normalizeSpotlightIntensities;