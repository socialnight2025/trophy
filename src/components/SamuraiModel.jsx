import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

import treedmodel from "../assets/ronin_samurai_high_poly.glb";

// Preload the model for better performance
useGLTF.preload(treedmodel)

function SamuraiModel({ animationPhase }) {
  const groupRef = useRef()
  const position = useRef(new THREE.Vector3(0, -2, 0))
  const targetPosition = useRef(new THREE.Vector3(0, -2, 0))
  const rotation = useRef(-100)

  // Load the GLB model once
  const { scene } = useGLTF(treedmodel)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Rotation animation when phase is 'rotating'
    if (animationPhase === 'rotating') {
      rotation.current += delta * 2
      groupRef.current.rotation.y = rotation.current
    }

    // Set target position based on animation phase
    if (animationPhase === 'moved') {
      targetPosition.current.set(4, -0.5, 0)
    } else {
      targetPosition.current.set(0, -0.5, 0)
    }

    // Smoothly interpolate position towards target
    position.current.lerp(targetPosition.current, delta * 3)
    groupRef.current.position.copy(position.current)
  })

  return (
    <group ref={groupRef} scale={[5, 5, 5]}>
      {/* Clone the scene once to avoid mutating original GLTF scene */}
      <primitive object={scene.clone()} />
    </group>
  )
}

export default SamuraiModel
