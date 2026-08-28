import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const FloatingNodes = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} scale={1.5}>
        <MeshDistortMaterial 
          color="#D2FF00" /* acid color from the design system */
          attach="material" 
          distort={0.4} 
          speed={2} 
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </Sphere>
    </Float>
  );
};

const LabScene = () => {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative pointer-events-auto cursor-grab active:cursor-grabbing z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#D2FF00" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#F2F2F2" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <FloatingNodes />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default LabScene;
