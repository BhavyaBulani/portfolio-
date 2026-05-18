import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { getDeviceCapability } from '../utils/deviceCapability';

// Use the Draco-compressed model (1.29MB vs 20.56MB original)
const MODEL_PATH = '/cartoon-boy-optimized.glb';

// Draco decoder hosted on CDN for fast loading
const DRACO_CDN = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

// Get device capability once at module level
const device = getDeviceCapability();

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

/**
 * Static SVG fallback for devices that can't run WebGL.
 * Lightweight, zero GPU cost, still looks intentional.
 */
function StaticFallback({ onLoaded }) {
  useEffect(() => {
    // Signal that we're "loaded" immediately so the preloader can proceed
    onLoaded?.();
  }, [onLoaded]);

  return (
    <div className="model-static-fallback">
      <svg viewBox="0 0 200 200" width="180" height="180" aria-label="Developer illustration">
        {/* Simple developer avatar silhouette */}
        <defs>
          <linearGradient id="fallbackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Head */}
        <circle cx="100" cy="65" r="30" fill="url(#fallbackGrad)" filter="url(#softGlow)" />
        {/* Body */}
        <path d="M60,110 Q100,95 140,110 L135,170 Q100,175 65,170 Z"
          fill="url(#fallbackGrad)" opacity="0.9" filter="url(#softGlow)" />
        {/* Laptop */}
        <rect x="70" y="130" width="60" height="35" rx="4"
          fill="none" stroke="#c4b5fd" strokeWidth="2.5" opacity="0.7" />
        <line x1="65" y1="165" x2="135" y2="165"
          stroke="#c4b5fd" strokeWidth="2" opacity="0.5" />
        {/* Code brackets */}
        <text x="85" y="153" fill="#e0d4ff" fontSize="14" fontFamily="monospace" opacity="0.8">&lt;/&gt;</text>
      </svg>
      <span className="fallback-label">👨‍💻</span>
    </div>
  );
}

export default function CartoonBoyModel({ onLoaded }) {
  const [isMidTier] = useState(() => device.tier === 'mid');

  // ★ KEY FIX: Don't even attempt WebGL on low-end devices
  if (!device.canRender3D) {
    return <StaticFallback onLoaded={onLoaded} />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        // ★ KEY FIX: Let WebGL fail gracefully on weak GPUs instead of crashing
        failIfMajorPerformanceCaveat: true,
        // On mid-tier: use lower precision for shaders
        ...(isMidTier && { precision: 'lowp' }),
      }}
      dpr={isMidTier ? [0.75, 1] : [1, 1.5]}  // Much lower pixel ratio on mid-tier
      performance={{ min: 0.3 }}                 // Aggressive throttling when idle
      frameloop={isMidTier ? 'demand' : 'always'} // Only render on changes on mid-tier
      // ★ KEY FIX: Handle WebGL context creation failure gracefully
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          console.warn('[CartoonBoyModel] WebGL context lost');
        });
      }}
    >
      {/* Fewer lights on mid-tier */}
      <ambientLight intensity={isMidTier ? 1.2 : 0.9} />
      <directionalLight position={[5, 10, 5]} intensity={isMidTier ? 1.2 : 1.8} />
      {!isMidTier && (
        <pointLight position={[-3, 2, 4]} intensity={0.8} color="#a78bfa" />
      )}
      <Suspense fallback={<LoadingFallback />}>
        <CartoonBoy onLoaded={onLoaded} isMobile={isMidTier} />
      </Suspense>
      {/* Disable OrbitControls on mid-tier — saves touch event overhead */}
      {!isMidTier && (
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

// ★ KEY FIX: Only preload the model if the device can actually render it
if (device.canRender3D) {
  useGLTF.preload(MODEL_PATH, DRACO_CDN);
}
