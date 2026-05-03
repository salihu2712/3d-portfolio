"use client"

import { useRef, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF } from "@react-three/drei"
import type { Group } from "three"

interface ModelProps {
  path: string
  position: [number, number, number]
  scale: number
}

function Model({ path, position, scale }: ModelProps) {
  const modelRef = useRef<Group>(null)
  const { scene } = useGLTF(path)

  return (
    <group ref={modelRef} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

interface ModelViewerProps {
  modelPath?: string
  position?: [number, number, number]
  scale?: number
  cameraZ?: number
  cameraFov?: number
}

export function ModelViewer({
  modelPath = "/models/camera.glb",
  position = [0, -1, 0],
  scale = 2,
  cameraZ = 8,
  cameraFov = 45,
}: ModelViewerProps) {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 0, cameraZ], fov: cameraFov }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Model key={modelPath} path={modelPath} position={position} scale={scale} />
        </Suspense>
        <Environment preset="studio" />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI - 0.1}
        />
      </Canvas>
    </div>
  )
}
