import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';

function CartoonBoy({ onLoaded }) {
  const ref = useRef();
  const { scene, animations } = useGLTF('/cartoon boy 3d model.glb');
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.keys(actions)[0];
      actions[firstAction].reset().fadeIn(0.5).play();
    }
    // Signal that 3D model is fully loaded and ready
    onLoaded?.();
  }, [actions, onLoaded]);

  useFrame((state) => {
    if (ref.current) {
      // Base floating height
      const floatY = Math.sin(state.clock.elapsedTime * 1.5) * 0.03 - 0.05;
      
      // Calculate target position (towards cursor)
      // state.pointer ranges from -1 to 1 across the canvas
      const targetX = state.pointer.x * 0.4;
      const targetY = floatY + (state.pointer.y * 0.2);

      // Smoothly interpolate current position to target position
      ref.current.position.x += (targetX - ref.current.position.x) * 0.02;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.02;
      
      // Slightly rotate towards cursor for depth
      const targetRotationY = -Math.PI / 2 + (state.pointer.x * 0.08);
      const targetRotationX = state.pointer.y * -0.04;
      
      ref.current.rotation.y += (targetRotationY - ref.current.rotation.y) * 0.02;
      ref.current.rotation.x += (targetRotationX - ref.current.rotation.x) * 0.02;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={2.8}
      position={[0, -1.0, 0]}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}

function LoadingFallback() {
  return (
    <mesh position={[0, -0.5, 0]}>
      <capsuleGeometry args={[0.5, 1, 4, 8]} />
      <meshStandardMaterial color="#7c3aed" wireframe />
    </mesh>
  );
}

export default function CartoonBoyModel({ onLoaded }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <pointLight position={[-3, 2, 4]} intensity={1} color="#a78bfa" />
      <Suspense fallback={<LoadingFallback />}>
        <CartoonBoy onLoaded={onLoaded} />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 2 + 0.05}
        minPolarAngle={Math.PI / 2 - 0.05}
        minAzimuthAngle={-Math.PI / 13}
        maxAzimuthAngle={Math.PI / 13}
      />
    </Canvas>
  );
}
