import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

// Use the Draco-compressed model (1.29MB vs 20.56MB original)
const MODEL_PATH = '/cartoon-boy-optimized.glb';

// Draco decoder hosted on CDN for fast loading
const DRACO_CDN = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

// Detect if device is low-end (mobile / weak GPU)
function detectLowEnd() {
  if (typeof window === 'undefined') return false;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  const lowCores = (navigator.hardwareConcurrency || 4) <= 4;
  const lowMemory = (navigator.deviceMemory || 8) <= 4;
  return (isTouchDevice && isSmallScreen) || (lowCores && lowMemory);
}

function CartoonBoy({ onLoaded, isMobile }) {
  const ref = useRef();
  const { scene, animations } = useGLTF(MODEL_PATH, DRACO_CDN);
  const { actions } = useAnimations(animations, ref);
  const frameSkip = useRef(0);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.keys(actions)[0];
      actions[firstAction].reset().fadeIn(0.5).play();
    }
    onLoaded?.();
  }, [actions, onLoaded]);

  useFrame((state) => {
    if (!ref.current) return;

    // On mobile: skip cursor tracking entirely (no mouse), just do gentle float
    // On desktop: throttle to every 2nd frame
    frameSkip.current++;
    
    if (isMobile) {
      // Only update every 4th frame on mobile — gentle float only
      if (frameSkip.current % 4 !== 0) return;
      const floatY = Math.sin(state.clock.elapsedTime * 1.0) * 0.02 - 0.05;
      ref.current.position.y += (floatY - ref.current.position.y) * 0.03;
      return;
    }

    // Desktop: every 2nd frame with cursor tracking
    if (frameSkip.current % 2 !== 0) return;
    const lerp = 0.04;

    const floatY = Math.sin(state.clock.elapsedTime * 1.5) * 0.03 - 0.05;
    const targetX = state.pointer.x * 0.4;
    const targetY = floatY + (state.pointer.y * 0.2);

    ref.current.position.x += (targetX - ref.current.position.x) * lerp;
    ref.current.position.y += (targetY - ref.current.position.y) * lerp;

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
  const [isMobile] = useState(() => detectLowEnd());

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
        // On mobile: use even lower precision for shaders
        ...(isMobile && { precision: 'lowp' }),
      }}
      dpr={isMobile ? [0.75, 1] : [1, 1.5]}  // Much lower pixel ratio on mobile
      performance={{ min: 0.3 }}                // Aggressive throttling when idle
      frameloop={isMobile ? 'demand' : 'always'} // Only render on changes on mobile
    >
      {/* Fewer lights on mobile */}
      <ambientLight intensity={isMobile ? 1.2 : 0.9} />
      <directionalLight position={[5, 10, 5]} intensity={isMobile ? 1.2 : 1.8} />
      {!isMobile && (
        <pointLight position={[-3, 2, 4]} intensity={0.8} color="#a78bfa" />
      )}
      <Suspense fallback={<LoadingFallback />}>
        <CartoonBoy onLoaded={onLoaded} isMobile={isMobile} />
      </Suspense>
      {/* Disable OrbitControls on mobile — saves touch event overhead */}
      {!isMobile && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2 + 0.05}
          minPolarAngle={Math.PI / 2 - 0.05}
          minAzimuthAngle={-Math.PI / 13}
          maxAzimuthAngle={Math.PI / 13}
        />
      )}
    </Canvas>
  );
}

// Preload with Draco decoder so model starts downloading immediately
useGLTF.preload(MODEL_PATH, DRACO_CDN);
