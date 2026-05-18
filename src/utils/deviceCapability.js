/**
 * Device capability detection — centralized module.
 * Used across the app to gate heavy features (WebGL, animations, etc.)
 * on low-end devices to prevent crashes.
 */

let _cached = null;

export function getDeviceCapability() {
  if (_cached) return _cached;

  const ua = navigator.userAgent || '';
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  const cores = navigator.hardwareConcurrency || 2;
  const memory = navigator.deviceMemory || 4; // GB, defaults to 4 if unavailable

  // WebGL support check
  let webglSupported = false;
  let webglRenderer = '';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      webglSupported = true;
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        webglRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
      }
      // Lose context to free resources immediately
      const loseCtx = gl.getExtension('WEBGL_lose_context');
      if (loseCtx) loseCtx.loseContext();
    }
    canvas.remove();
  } catch (e) {
    webglSupported = false;
  }

  // Known weak GPU patterns (integrated, software renderers)
  const weakGpuPatterns = [
    /swiftshader/i, /llvmpipe/i, /softpipe/i, /software/i,
    /microsoft basic/i, /mesa/i, /google swiftshader/i,
    /intel.*hd.*[234]\d{2,3}/i, // Intel HD 2000-4600 series
    /mali-4/i, /adreno.*[123]\d{2}/i, // Old mobile GPUs
  ];
  const hasWeakGpu = weakGpuPatterns.some(p => p.test(webglRenderer));

  // Tier classification
  let tier;
  if (
    !webglSupported ||
    hasWeakGpu ||
    (cores <= 2 && memory <= 2) ||
    (isTouchDevice && memory <= 2)
  ) {
    tier = 'low';
  } else if (
    (isTouchDevice && isSmallScreen) ||
    (cores <= 4 && memory <= 4) ||
    hasWeakGpu
  ) {
    tier = 'mid';
  } else {
    tier = 'high';
  }

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;

  _cached = {
    tier,              // 'low' | 'mid' | 'high'
    cores,
    memory,
    isTouchDevice,
    isSmallScreen,
    webglSupported,
    webglRenderer,
    hasWeakGpu,
    prefersReducedMotion,
    // Convenience flags
    canRender3D: tier !== 'low' && webglSupported,
    shouldReduceAnimations: tier === 'low' || prefersReducedMotion,
    shouldReduceEffects: tier !== 'high',
  };

  if (process.env.NODE_ENV !== 'production') {
    console.log('[DeviceCapability]', _cached);
  }

  return _cached;
}
