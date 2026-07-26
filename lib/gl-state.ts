/**
 * Shared GL state object — a plain mutable singleton.
 * HeroGL writes to it from the WebGL render loop.
 * ScrollAnimations drives it via GSAP tweens.
 * Both import this same object reference, so mutations are shared.
 */
export const GL = {
  descent: 0,
  mix: 0,
  vel: 0,
  reveal: 0,
};
