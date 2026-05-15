import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

// Use the Draco-compressed model (1.29MB vs 20.56MB original)
const MODEL_PATH = '/cartoon-boy-optimized.glb';

// Draco decoder hosted on CDN for fast loading
const DRACO_CDN = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

function CartoonBoy({ onLoaded }) {
  const ref = useRef();
  const { scene, animations } = useGLTF(MODEL_PATH, DRACO_CDN);
  const { actions } = useAnimations(animations, ref);
  const pointerRef = useRef({ x: 0, y: 0 });
  const frameSkip = useRef(0);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.keys(actions)[0];
      actions[firstAction].reset().fadeIn(0.5).play();
    }
    // Signal that 3D model is fully loaded and ready
    onLoaded?.();
  }, [actions, onLoaded]);

  // Cache pointer position from Three.js state — avoids reading every frame
  const { viewport } = useThree();

  useFrame((state) => {
    if (!ref.current) return;

    // Throttle: only update every 2nd frame for performance
    frameSkip.current++;
    if (frameSkip.current % 2 !== 0) return;

    // Use a higher lerp factor so it still feels smooth at half framerate
    const lerp = 0.04;

    // Base floating height
    const floatY = Math.sin(state.clock.elapsedTime * 1.5) * 0.03 - 0.05;

    // Calculate target position (towards cursor)
    const targetX = state.pointer.x * 0.4;
    const targetY = floatY + (state.pointer.y * 0.2);

    // Smoothly interpolate current position to target position
    ref.current.position.x += (targetX - ref.current.position.x) * lerp;
    ref.current.position.y += (targetY - ref.current.position.y) * lerp;

    // Slightly rotate towards cursor for depth
    const targetRotationY = -Math.PI / 2 + (state.pointer.x * 0.08);
    const targetRotationX = state.pointer.y * -0.04;

    ref.current.rotation.y += (targetRotationY - ref.current.rotation.y) * lerp;
    ref.current.rotation.x += (targetRotationX - ref.current.rotation.x) * lerp;
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
  // Detect if device prefers reduced motion
  const prefersReduced = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{
        antialias: false,       // Disable AA for performance (big GPU savings)
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
      }}
      dpr={[1, 1.5]}           // Cap pixel ratio (saves GPU on retina displays)
      performance={{ min: 0.5 }} // Allow R3F to throttle when tab not focused
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 5]} intensity={1.8} />
      <pointLight position={[-3, 2, 4]} intensity={0.8} color="#a78bfa" />
      {/* Removed Environment preset="city" — saves downloading an HDR map
          and heavy IBL computation. Simple lights above provide similar effect. */}
      <Suspense fallback={<LoadingFallback />}>
        <CartoonBoy onLoaded={onLoaded} />
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

// Preload with Draco decoder so model starts downloading immediately
useGLTF.preload(MODEL_PATH, DRACO_CDN);
