'use client'

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { useMemo, useRef, useEffect } from "react"
import * as THREE from "three"
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'


function Network({ count = 400, connections = 3 }) {
  const points = useRef<THREE.Points>(null!)
  const lines = useRef<THREE.LineSegments>(null!)

  const [positions, indices] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const indices = new Uint16Array(count * connections * 2)

    for (let i = 0; i < count; i++) {
      // すべての軸で同じ範囲（-25 から +25）を使用
      positions[i * 3] = (Math.random() - 0.5) * 50     // x軸
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50 // y軸
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50 // z軸

      for (let j = 0; j < connections; j++) {
        const connectedPoint = Math.floor(Math.random() * count)
        indices[i * connections * 2 + j * 2] = i
        indices[i * connections * 2 + j * 2 + 1] = connectedPoint
      }
    }

    return [positions, indices]
  }, [count, connections])

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.02
    points.current.rotation.x = Math.sin(time) * 0.8
    points.current.rotation.y = Math.cos(time) * 0.2
    lines.current.rotation.x = Math.sin(time) * 0.8
    lines.current.rotation.y = Math.cos(time) * 0.2
  })

  return (
    <group>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.3} color="#8080ff" sizeAttenuation transparent />
      </points>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            count={indices.length}
            array={indices}
            itemSize={1}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#96A6FF" 
          transparent 
          opacity={0.4}
          linewidth={1}
        />
      </lineSegments>
    </group>
  )
}

export default function NeuralNetwork3D() {
  const controlsRef = useRef<OrbitControlsImpl>(null!)
  const hasScrolledRef = useRef(false)

  useEffect(() => {
    // スクロールイベントを監視して、トップに戻ったらフラグをリセット
    const handleScroll = () => {
      if (window.scrollY === 0) {
        hasScrolledRef.current = false
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <Network />
        <OrbitControls 
          ref={controlsRef}
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
          onChange={() => {
            if (controlsRef.current && !hasScrolledRef.current && 
                controlsRef.current.getPolarAngle() >= Math.PI / 1.5) {
              hasScrolledRef.current = true
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}