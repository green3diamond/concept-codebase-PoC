import React from 'react'
import { Mesh } from 'three'

export function Room() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
    </group>
  )
}

