'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { D } from '@/data/descent';
import { F } from '@/data/gallery';
import { trackEvent } from '@/lib/analytics';

interface ScrollTriggerInstance {
  progress: number;
  scroll?: () => number;
}

const CEIL = 299;
const PPM = 6;

export default function SkyscapeEngine() {
  useEffect(() => {
    // 1. Scroll restoration
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const FINE = matchMedia('(pointer:fine)').matches;
    const MOBILE = matchMedia('(max-width:900px)').matches;

    // 2. Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ force3D: true });
    ScrollTrigger.config({ ignoreMobileResize: true });

    // -----------------------------------------------------------------
    // DIGITAL ASSET PROTECTION & SECURITY GUARD ENGINE
    // -----------------------------------------------------------------
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'IMG' ||
          target.tagName === 'CANVAS' ||
          target.tagName === 'VIDEO' ||
          target.closest('.gallery-card') ||
          target.closest('.descent-card') ||
          target.closest('.hero') ||
          target.closest('.shot') ||
          target.closest('.p-frame'))
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'IMG' || target.tagName === 'CANVAS')) {
        e.preventDefault();
        return false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 key
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I / Cmd+Option+I / Ctrl+Shift+J / Ctrl+Shift+C (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U / Cmd+Option+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
      }
      // Ctrl+S / Cmd+S (Save Page As)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    document.addEventListener('dragstart', handleDragStart, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });

    let onParallaxMove: ((e: MouseEvent) => void) | null = null;

    // 3. Build Altimeter tape ticks & position immediately (zero delay)
    const tape = document.getElementById('tape');
    let setTape: ReturnType<typeof gsap.quickSetter> | null = null;

    if (tape) {
      if (!tape.dataset.built) {
        tape.dataset.built = '1';
        tape.innerHTML = '';
        const frag = document.createDocumentFragment();
        for (let m = 0; m <= CEIL; m += 10) {
          const y = (CEIL - m) * PPM;
          const t = document.createElement('div');
          t.className = 'tick ' + (m % 50 === 0 ? 'major' : 'minor');
          t.style.top = y + 'px';
          frag.appendChild(t);
          if (m % 50 === 0) {
            const l = document.createElement('div');
            l.className = 'tick-lab';
            l.style.top = y + 'px';
            l.textContent = String(m);
            frag.appendChild(l);
          }
        }
        const names: Record<string, string> = {
          about: 'Pilot',
          descent: 'Descent',
          work: 'Work',
          contact: 'Touchdown',
        };
        document.querySelectorAll('[data-alt]').forEach((s) => {
          const el = s as HTMLElement;
          const m = +el.dataset.alt!;
          const n =
            names[el.id] ||
            (el.classList.contains('log')
              ? 'Log'
              : el.classList.contains('plate')
              ? 'Plate'
              : el.classList.contains('interlude')
              ? 'Approach'
              : '');
          if (!n) return;
          const mk = document.createElement('div');
          mk.className = 'tape-mark';
          mk.style.top = (CEIL - m) * PPM + 'px';
          mk.textContent = n + ' · ' + m + 'M';
          frag.appendChild(mk);
        });
        tape.style.height = CEIL * PPM + 'px';
        tape.appendChild(frag);
      }

      setTape = gsap.quickSetter(tape, 'y', 'px');
      setTape(window.innerHeight / 2);
    }

    // 4. Character splitter
    function split(el: HTMLElement | null): HTMLElement[] {
      if (!el || el.dataset.done) return Array.from(el?.querySelectorAll('.c') || []);
      const tmp = document.createElement('div');
      tmp.innerHTML = el.innerHTML;
      const out = document.createElement('span');
      out.style.display = 'block';
      const chars: HTMLElement[] = [];
      (function walk(src: Node, dest: HTMLElement, ital: boolean) {
        src.childNodes.forEach((n) => {
          if (n.nodeType === 3) {
            n.textContent!.split(/(\s+)/).forEach((tok) => {
              if (tok === '') return;
              if (/^\s+$/.test(tok)) {
                dest.appendChild(document.createTextNode(' '));
                return;
              }
              const w = document.createElement('span');
              w.className = 'w';
              [...tok].forEach((ch) => {
                const c = document.createElement('span');
                c.className = 'c';
                c.textContent = ch;
                if (ital) c.style.cssText = 'font-style:italic;color:var(--haze)';
                w.appendChild(c);
                chars.push(c);
              });
              dest.appendChild(w);
            });
          } else if (n.nodeType === 1) {
            const child = n as HTMLElement;
            if (child.tagName === 'BR') {
              dest.appendChild(document.createElement('br'));
              return;
            }
            walk(child, dest, ital || child.tagName === 'EM');
          }
        });
      })(tmp, out, false);
      el.innerHTML = '';
      el.appendChild(out);
      el.dataset.done = '1';
      return chars;
    }

    const d1El = document.querySelector<HTMLElement>('.d1');
    if (d1El && !d1El.dataset.done) {
      if (!RM) {
        split(d1El);
      } else {
        d1El.dataset.done = '1';
      }
    }

    // 5. Original WebGL Shader
    const GL = { descent: 0, mix: 0, vel: 0, reveal: 1, opticsMode: 0, targetOpticsMode: 0 };

    // Interactive Alt Drone Icon Click Handler
    const altDrone = document.getElementById('altDrone');
    const altDroneImg = document.getElementById('altDroneImg');

    if (altDrone && altDroneImg) {
      altDrone.addEventListener('click', () => {
        gsap.to(altDroneImg, {
          rotate: '+=360',
          scale: 1.25,
          duration: 0.6,
          ease: 'back.out(1.7)',
          onComplete: () => {
            gsap.to(altDroneImg, { scale: 1, duration: 0.3 });
          },
        });
      });
    }

    // 4. WebGL Engine
    const cv = document.getElementById('glc') as HTMLCanvasElement | null;
    const heroEl = document.getElementById('hero');
    let glReady = false;
    let stopGL = () => {};

    if (cv && heroEl) {
      const gl = cv.getContext('webgl', {
        alpha: true,
        antialias: false,
        depth: false,
        powerPreference: 'high-performance',
      });

      if (gl) {
        const VS = `
attribute vec2 p;
varying vec2 vUv;
void main(){
  vUv = (p + 1.0) * 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

        const OCT = MOBILE ? '2' : '3';
        const FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D uA, uB, uC, uD, uE;
uniform vec2 uRes, uResA, uResB, uResC, uResD, uResE, uMouse;
uniform float uTime, uDescent, uMix, uVel, uReveal, uOpticsMode;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y);
}
float fbm(vec2 p){
  float v=0., a=.5;
  for(int i=0;i<${OCT};i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=.5; }
  return v;
}
vec2 cover(vec2 uv, vec2 img){
  vec2 res = max(img, vec2(1.0));
  float rs = uRes.x / max(uRes.y, 1.0);
  float ri = res.x / res.y;
  vec2 r = vec2(min(rs / ri, 1.0), min(ri / rs, 1.0));
  vec2 st = uv * r + (1.0 - r) * 0.5;
  return clamp(st, 0.005, 0.995);
}
vec3 samp(sampler2D t, vec2 uv, float ab){
  vec2 stR = clamp(uv + vec2(ab, 0.0), vec2(0.005), vec2(0.995));
  vec2 stG = clamp(uv, vec2(0.005), vec2(0.995));
  vec2 stB = clamp(uv - vec2(ab, 0.0), vec2(0.005), vec2(0.995));
  return vec3(texture2D(t, stR).r, texture2D(t, stG).g, texture2D(t, stB).b);
}

// Military-Grade FLIR Thermal Infrared Heatmap Shader
vec3 applyFLIR(vec3 color) {
  float lum = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 navy = vec3(0.02, 0.05, 0.18);
  vec3 indigo = vec3(0.22, 0.04, 0.45);
  vec3 magenta = vec3(0.75, 0.10, 0.52);
  vec3 amber = vec3(0.96, 0.50, 0.06);
  vec3 yellow = vec3(0.98, 0.94, 0.35);
  vec3 white = vec3(1.0, 1.0, 0.95);

  vec3 therm;
  if (lum < 0.20) {
    therm = mix(navy, indigo, lum * 5.0);
  } else if (lum < 0.40) {
    therm = mix(indigo, magenta, (lum - 0.20) * 5.0);
  } else if (lum < 0.65) {
    therm = mix(magenta, amber, (lum - 0.40) * 4.0);
  } else if (lum < 0.85) {
    therm = mix(amber, yellow, (lum - 0.65) * 5.0);
  } else {
    therm = mix(yellow, white, (lum - 0.85) * 6.66);
  }
  return therm;
}

// B&W Inverse Infrared Reconnaissance Shader (Black Hot Tactical Optics)
vec3 applyBWNegative(vec3 color) {
  float lum = dot(color, vec3(0.299, 0.587, 0.114));
  float negLum = smoothstep(0.04, 0.96, 1.0 - lum);
  vec3 darkMetal = vec3(0.04, 0.06, 0.09);
  vec3 brightSilver = vec3(0.92, 0.95, 0.98);
  return mix(darkMetal, brightSilver, negLum);
}

void main(){
  float d = uDescent;
  vec2 uv = vUv;

  // Flight camera micro-vibration
  vec2 shake = vec2(noise(vec2(uTime*4.2, 1.0)), noise(vec2(2.5, uTime*3.8))) - 0.5;
  uv += shake * (0.0004 + abs(uVel)*0.0015);

  // Default uncompressed aspect ratio zoom — 1.00 fits full landscape photograph without cropping
  float zoom = 1.00;
  vec2 g = (uv - 0.5) / zoom + 0.5;
  g += uMouse * vec2(0.012, 0.010) * (1.0 + d * 0.3);

  // Organic wave liquid transition displacement (scaled safely)
  float mist = fbm(g * 2.5 + vec2(uTime * 0.012, -uTime * 0.010));
  g += (vec2(mist) - 0.5) * (0.0015 + abs(uVel) * 0.004);

  // Clamp g safely before cover aspect ratio transformation
  g = clamp(g, vec2(0.001), vec2(0.999));

  float m = clamp(uMix, 0.0, 4.0);

  float edge = smoothstep(0.35, 1.0, distance(vUv, vec2(0.5)));
  float ab = (0.0006 + abs(uVel) * 0.004) * edge;

  // 5-Stage Scrollytelling Blending Sequence (Lazy texture fetches for max mobile FPS)
  vec3 col;
  if (m < 1.0) {
    vec2 gA = (g - 0.5) * 0.88 + 0.5;
    vec3 A = samp(uA, cover(gA, uResA), ab);
    vec3 B = samp(uB, cover(g, uResB), ab);
    col = mix(A, B, smoothstep(0.0, 1.0, m));
  } else if (m < 2.0) {
    vec3 B = samp(uB, cover(g, uResB), ab);
    vec3 C = samp(uC, cover(g, uResC), ab);
    col = mix(B, C, smoothstep(1.0, 2.0, m));
  } else if (m < 3.0) {
    vec3 C = samp(uC, cover(g, uResC), ab);
    vec3 D = samp(uD, cover(g, uResD), ab);
    col = mix(C, D, smoothstep(2.0, 3.0, m));
  } else {
    vec3 D = samp(uD, cover(g, uResD), ab);
    vec2 gE = (g - 0.5) * 0.84 + 0.5;
    vec3 E = samp(uE, cover(gE, uResE), ab);
    col = mix(D, E, smoothstep(3.0, 4.0, m));
  }

  // Golden hour sunlight bloom
  vec2 sunPos = (vUv - vec2(0.72, 0.24)) * vec2(uRes.x / uRes.y, 1.0);
  float sun = exp(-length(sunPos) * 2.8);
  col += vec3(0.16, 0.12, 0.07) * sun * 0.35;

  col *= 1.0 - edge * 0.14;
  col *= smoothstep(0.0, 0.4, uReveal + (1.0 - abs(vUv.y - 0.5) * 1.5));

  // Apply Tactical Optics Modes (RGB -> FLIR -> NEGATIVE IR)
  if (uOpticsMode > 0.01) {
    vec3 flirCol = applyFLIR(col);
    vec3 negCol = applyBWNegative(col);
    if (uOpticsMode <= 1.0) {
      col = mix(col, flirCol, uOpticsMode);
    } else {
      float negW = clamp(uOpticsMode - 1.0, 0.0, 1.0);
      col = mix(flirCol, negCol, negW);
    }
  }

  gl_FragColor = vec4(col, 1.0);
}`;

        function sh(t: number, src: string) {
          const o = gl!.createShader(t)!;
          gl!.shaderSource(o, src);
          gl!.compileShader(o);
          if (!gl!.getShaderParameter(o, gl!.COMPILE_STATUS)) {
            console.warn('[skyscape] shader:', gl!.getShaderInfoLog(o));
            return null;
          }
          return o;
        }
        const vs = sh(gl.VERTEX_SHADER, VS);
        const fs = sh(gl.FRAGMENT_SHADER, FS);
        if (vs && fs) {
          const pr = gl.createProgram()!;
          gl.attachShader(pr, vs);
          gl.attachShader(pr, fs);
          gl.linkProgram(pr);
          if (gl.getProgramParameter(pr, gl.LINK_STATUS)) {
            gl.useProgram(pr);
            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array([-1, -1, 3, -1, -1, 3]),
              gl.STATIC_DRAW
            );
            const loc = gl.getAttribLocation(pr, 'p');
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

            const u = (n: string) => gl!.getUniformLocation(pr, n);
            const U_ = {
              uRes: u('uRes'),
              uResA: u('uResA'),
              uResB: u('uResB'),
              uResC: u('uResC'),
              uResD: u('uResD'),
              uResE: u('uResE'),
              uMouse: u('uMouse'),
              uTime: u('uTime'),
              uDescent: u('uDescent'),
              uMix: u('uMix'),
              uVel: u('uVel'),
              uReveal: u('uReveal'),
              uOpticsMode: u('uOpticsMode'),
            };
            gl.uniform1i(u('uA'), 0);
            gl.uniform1i(u('uB'), 1);
            gl.uniform1i(u('uC'), 2);
            gl.uniform1i(u('uD'), 3);
            gl.uniform1i(u('uE'), 4);

            let loaded = 0;
            function checkLoaded() {
              if (++loaded >= 5) {
                glReady = true;
                heroEl?.classList.add('gl-on');
              }
            }

            function texture(
              src: string,
              unit: number,
              resU: WebGLUniformLocation | null
            ) {
              const t = gl!.createTexture();
              const im = new Image();
              im.crossOrigin = 'anonymous';
              im.onload = () => {
                gl!.activeTexture(gl!.TEXTURE0 + unit);
                gl!.bindTexture(gl!.TEXTURE_2D, t);
                gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, true);
                gl!.texImage2D(
                  gl!.TEXTURE_2D,
                  0,
                  gl!.RGB,
                  gl!.RGB,
                  gl!.UNSIGNED_BYTE,
                  im
                );
                gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
                gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
                gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
                gl!.uniform2f(resU, im.width, im.height);
                checkLoaded();
              };
              im.onerror = () => {
                console.warn('[skyscape] texture failed:', src);
                checkLoaded();
              };
              im.src = src;
            }
            texture(
              '/mauritius-coastal-drone-photography-skyscape.jpg',
              0,
              U_.uResA
            );
            texture(
              '/images/coastal-highway-drone-photography-skyscape.png',
              1,
              U_.uResB
            );
            texture(
              '/images/ijen-crater-volcano-aerial-skyscape.png',
              2,
              U_.uResC
            );
            texture(
              '/images/manipal-end-point-aerial-skyscape.png',
              3,
              U_.uResD
            );
            texture(
              '/images/angels-billabong-nusa-penida-skyscape.png',
              4,
              U_.uResE
            );

            const MAXPX = MOBILE ? 0.65e6 : 2.6e6;
            function size() {
              if (!heroEl || !cv) return;
              const w = heroEl.clientWidth,
                h = heroEl.clientHeight;
              let dpr = Math.min(devicePixelRatio || 1, MOBILE ? 1.0 : 1.6);
              const over = (w * h * dpr * dpr) / MAXPX;
              if (over > 1) dpr /= Math.sqrt(over);
              cv.width = Math.round(w * dpr);
              cv.height = Math.round(h * dpr);
              cv.style.width = w + 'px';
              cv.style.height = h + 'px';
              gl!.viewport(0, 0, cv.width, cv.height);
              gl!.uniform2f(U_.uRes, cv.width, cv.height);
            }
            size();
            let szT: ReturnType<typeof setTimeout>;
            const onResize = () => {
              clearTimeout(szT);
              szT = setTimeout(size, 120);
            };
            window.addEventListener('resize', onResize);

            let onScreen = true;
            let obs: IntersectionObserver | null = null;
            if ('IntersectionObserver' in window) {
              obs = new IntersectionObserver(
                ([e]) => {
                  onScreen = e.isIntersecting;
                },
                { rootMargin: '15% 0px' }
              );
              obs.observe(heroEl);
            }

            let mx = 0,
              my = 0,
              cx = 0,
              cy = 0;
            const t0 = performance.now();
            const onMouseMove = (e: MouseEvent) => {
              mx = (e.clientX / innerWidth - 0.5) * 2;
              my = (e.clientY / innerHeight - 0.5) * 2;
            };
            const onOpticsChange = (e: Event) => {
              const customEv = e as CustomEvent<{ mode: number }>;
              if (typeof customEv.detail?.mode === 'number') {
                GL.targetOpticsMode = customEv.detail.mode;
              }
            };
            window.addEventListener('skyscape:optics', onOpticsChange);

            if (FINE)
              window.addEventListener('mousemove', onMouseMove, {
                passive: true,
              });

            let animId: number;
            (function frame(t: number) {
              animId = requestAnimationFrame(frame);
              if (!glReady || !onScreen || document.hidden) return;
              cx += (mx - cx) * 0.05;
              cy += (my - cy) * 0.05;
              GL.opticsMode += (GL.targetOpticsMode - GL.opticsMode) * 0.08;

              gl!.uniform1f(U_.uTime, (t - t0) / 1000);
              gl!.uniform2f(U_.uMouse, cx, cy);
              gl!.uniform1f(U_.uDescent, GL.descent);
              gl!.uniform1f(U_.uMix, GL.mix);
              gl!.uniform1f(U_.uVel, GL.vel);
              gl!.uniform1f(U_.uReveal, GL.reveal);
              gl!.uniform1f(U_.uOpticsMode, GL.opticsMode);
              gl!.drawArrays(gl!.TRIANGLES, 0, 3);
            })(t0);

              stopGL = () => {
                cancelAnimationFrame(animId);
                window.removeEventListener('resize', onResize);
                if (FINE) window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('skyscape:optics', onOpticsChange);
                if (obs) obs.disconnect();
              };
            }
          }
        }
      }

    // 6. Lenis smooth scroll with luxury inertial momentum
    let lenis: Lenis | null = null;
    if (!RM) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });

      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      const updateLenis = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      lenis.on('scroll', ({ velocity }: { velocity: number }) => {
        const targetV = Math.max(-1, Math.min(1, velocity / 50));
        GL.vel += (targetV - GL.vel) * 0.14;
      });

      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const target = a.getAttribute('href');
          if (target && target.length > 1 && target !== '#') {
            const targetEl = document.querySelector<HTMLElement>(target);
            if (targetEl) {
              e.preventDefault();
              if (lenis) {
                lenis.scrollTo(targetEl, { offset: -10, duration: 1.4 });
              }
            }
          }
        });
      });
    } else {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    // 7. Page altitude & GSAP triggers
    const head = document.getElementById('head');
    const earthshift = document.getElementById('earthshift');
    const hudAlt = document.getElementById('hudAlt');
    const altVal = document.getElementById('altVal');
    const altState = document.getElementById('altState');
    const altRail = document.getElementById('altRail');
    const chipVal = document.getElementById('chipVal');

    const setEarth = earthshift ? gsap.quickSetter(earthshift, 'opacity') : null;

    const updateAltitude = (p: number) => {
      const a = Math.round(CEIL * (1 - p));
      if (setTape) setTape(window.innerHeight / 2 - CEIL * p * PPM);
      if (setEarth) setEarth(Math.max(0, (p - 0.55) / 0.45));
      if (altVal) altVal.textContent = String(a);
      if (chipVal) chipVal.textContent = a + ' M';
      if (hudAlt) hudAlt.textContent = (CEIL * (1 - p)).toFixed(1) + ' m AGL';

      const st =
        a <= 4
          ? 'LANDED · MOTORS OFF'
          : p < 0.02
          ? 'AGL · HOVER'
          : 'AGL · DESCENT';
      if (altState) altState.textContent = st;
      if (altRail) altRail.classList.toggle('landed', a <= 4);
      if (head) head.classList.toggle('scrolled', window.scrollY > 40);
    };

    // Altimeter Drone Scroll Pitch Reaction
    let droneTimer: ReturnType<typeof setTimeout> | null = null;
    let lastY = window.scrollY;

    const onScrollDronePitch = () => {
      if (!altDrone) return;
      const curY = window.scrollY;
      const diff = curY - lastY;
      lastY = curY;
      const speed = Math.abs(diff);

      if (speed > 1.2) {
        if (diff > 0) {
          altDrone.classList.add('descending');
          altDrone.classList.remove('ascending');
        } else {
          altDrone.classList.add('ascending');
          altDrone.classList.remove('descending');
        }
      }

      if (droneTimer) clearTimeout(droneTimer);
      droneTimer = setTimeout(() => {
        if (altDrone) {
          altDrone.classList.remove('descending', 'ascending');
        }
      }, 140);
    };

    window.addEventListener('scroll', onScrollDronePitch, { passive: true });

    // Immediate initial altitude positioning on load
    updateAltitude(0);

    if (!RM) {
      let lastAlt = -1,
        lastState = '',
        lastStuck: boolean | null = null;

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (s: ScrollTriggerInstance) => {
          const p = s.progress,
            a = Math.round(CEIL * (1 - p));
          if (setTape) setTape(window.innerHeight / 2 - CEIL * p * PPM);
          if (setEarth) setEarth(Math.max(0, (p - 0.55) / 0.45));
          if (a !== lastAlt) {
            lastAlt = a;
            if (altVal) altVal.textContent = String(a);
            if (chipVal) chipVal.textContent = a + ' M';
            if (hudAlt) hudAlt.textContent = (CEIL * (1 - p)).toFixed(1) + ' m AGL';
            const st =
              a <= 4
                ? 'LANDED'
                : p < 0.02
                ? 'HOVER'
                : 'DESCENT';
            if (st !== lastState) {
              lastState = st;
              if (altState) altState.textContent = st;
              if (altRail) altRail.classList.toggle('landed', a <= 4);
            }
          }
          const stuck = (s.scroll ? s.scroll() : window.scrollY) > 40;
          if (stuck !== lastStuck) {
            lastStuck = stuck;
            if (head) head.classList.toggle('scrolled', stuck);
          }
        },
      });

      /* Hero Cinema */
      const heroMainGroup = document.getElementById('heroMainGroup');
      const beat1 = document.getElementById('beat1');
      const beat2 = document.getElementById('beat2');
      const beat3 = document.getElementById('beat3');
      const beat4 = document.getElementById('beat4');

      if (beat1 && beat2) {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
        gsap.set([beat1, beat2, beat3, beat4, heroMainGroup].filter(Boolean), { autoAlpha: 0, y: 24 });
        gsap.set(['.hud', '.h-corner', '.cue', '.hero-birds-layer'], { autoAlpha: 1, y: 0 });

        const heroTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end: MOBILE ? '+=220%' : '+=290%',
            pin: true,
            pinSpacing: true,
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });

        heroTl
          .to(GL, { descent: 1, duration: 3.4, ease: 'power1.inOut' }, 0)
          .to('.cue', { autoAlpha: 0, duration: 0.2 }, 0)
          .to('.hero-birds-layer', { autoAlpha: 0.25, y: -60, scale: 1.05, duration: 2.8, ease: 'power1.inOut' }, 0)
          // 1. Text smoothly fades IN after scrolling 25m AGL (299m -> 274m AGL)
          .to(
            heroMainGroup || '.hero-in',
            { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out' },
            0.06
          )
          // 2. Text smoothly fades OUT as descent proceeds towards Beat 1
          .to(
            heroMainGroup || '.hero-in',
            { autoAlpha: 0, y: -24, duration: 0.25, ease: 'power2.in' },
            0.36
          )
          // Beat 1 (245 m AGL): Kelingking Beach (Nusa Penida, Bali)
          .to(GL, { mix: 1.0, duration: 0.85, ease: 'power1.inOut' }, 0.4)
          .to(beat1, { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out' }, 0.55)
          .to(beat1, { autoAlpha: 0, y: -30, duration: 0.3, ease: 'power2.in' }, 1.15)
          // Beat 2 (198 m AGL): Mount Ijen Acid Caldera (East Java)
          .to(GL, { mix: 2.0, duration: 0.85, ease: 'power1.inOut' }, 1.15)
          .to(beat2, { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out' }, 1.3)
          .to(beat2, { autoAlpha: 0, y: -26, duration: 0.3, ease: 'power2.in' }, 1.9);

        if (beat3) {
          // Beat 3 (142 m AGL): Manipal End Point Estuary & Plateau
          heroTl
            .to(GL, { mix: 3.0, duration: 0.85, ease: 'power1.inOut' }, 1.9)
            .to(beat3, { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out' }, 2.05)
            .to(beat3, { autoAlpha: 0, y: -26, duration: 0.3, ease: 'power2.in' }, 2.65);
        }

        if (beat4) {
          // Beat 4 (88 m AGL): Angel's Billabong Tidal Pool Precipice
          heroTl
            .to(GL, { mix: 4.0, duration: 0.85, ease: 'power1.inOut' }, 2.65)
            .to(beat4, { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out' }, 2.8)
            .to(beat4, { autoAlpha: 0, y: -26, duration: 0.3, ease: 'power2.in' }, 3.35);
        }

        heroTl.to('.h-corner, .hud', { autoAlpha: 0, duration: 0.3 }, 3.2);

        // Smooth Parallax Glide of Hero WebGL Canvas as user scrolls into About section
        const glc = document.getElementById('glc');
        if (glc) {
          gsap.to(glc, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: '#about',
              start: 'top 95%',
              end: 'bottom top',
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      /* Reveals */
      gsap.utils.toArray<HTMLElement>('[data-anim="fade"]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }
        );
      });

      /* Parallax.js Pointer Gyro Engine */
      if (FINE) {
        const parallaxNodes = Array.from(
          document.querySelectorAll<HTMLElement>('[data-depth]')
        );

        if (parallaxNodes.length > 0) {
          const setters = parallaxNodes.map((el) => {
            const depthX = parseFloat(
              el.dataset.depthX || el.dataset.depth || '0.1'
            );
            const depthY = parseFloat(
              el.dataset.depthY || el.dataset.depth || '0.1'
            );
            const maxPx = parseFloat(el.dataset.maxPx || '24');

            return {
              depthX,
              depthY,
              maxPx,
              setX: gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power2.out' }),
              setY: gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power2.out' }),
            };
          });

          onParallaxMove = (e: MouseEvent) => {
            const px = (e.clientX / window.innerWidth - 0.5) * 2;
            const py = (e.clientY / window.innerHeight - 0.5) * 2;

            setters.forEach(({ depthX, depthY, maxPx, setX, setY }) => {
              setX(px * depthX * maxPx);
              setY(py * depthY * maxPx);
            });
          };

          window.addEventListener('mousemove', onParallaxMove, {
            passive: true,
          });
        }
      }

      gsap.utils.toArray<HTMLElement>('[data-split]:not(.d1)').forEach((el) => {
        const c = split(el);
        if (!c.length) return;
        gsap.fromTo(
          c,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: { each: 0.013 },
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-anim="soft"]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          }
        );
      });


      gsap.utils.toArray<HTMLElement>('.p-frame img, .contact-pilot-frame img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.p-frame, .contact-pilot-frame'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      /* Flight Log Counters */
      gsap.utils.toArray<HTMLElement>('#logGrid [data-num]').forEach((el, i) => {
        const target = parseFloat(el.dataset.num!);
        const dec = el.dataset.dec ? +el.dataset.dec : 0;
        const o = { v: 0 };
        const cell = el.closest('.log-cell') as HTMLElement;
        const unit = cell?.querySelector('sup, u');

        gsap.to(o, {
          v: target,
          ease: 'power3.out',
          duration: 1.6,
          delay: i * 0.06,
          onUpdate: () => {
            el.textContent = dec
              ? o.v.toFixed(dec)
              : Math.round(o.v).toLocaleString('en-IN');
          },
          scrollTrigger: { trigger: '#logGrid', start: 'top 86%', once: true },
        });

        gsap.fromTo(
          cell,
          { y: 32, autoAlpha: 0, scale: 0.96 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1.0,
            ease: 'expo.out',
            delay: i * 0.06,
            scrollTrigger: { trigger: '#logGrid', start: 'top 86%', once: true },
          }
        );

        if (unit) {
          gsap.fromTo(
            unit,
            { autoAlpha: 0, scale: 0.5, y: -4 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: 'back.out(1.7)',
              delay: 0.75 + i * 0.06,
              scrollTrigger: { trigger: '#logGrid', start: 'top 86%', once: true },
            }
          );
        }
      });

      /* Scrollytelling Descent */
      const frames = gsap.utils.toArray<HTMLElement>('.sc-frame');
      const steps = gsap.utils.toArray<HTMLElement>('.sc-step');
      const ticks = gsap.utils.toArray<HTMLElement>('#scRail i');
      const altEl = document.getElementById('scAlt')!;

      if (frames.length && steps.length) {
        gsap.set(steps.slice(1), { autoAlpha: 0, y: 26 });
        gsap.set(frames.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
        const validImgs = frames.map((f) => f.querySelector('img')).filter(Boolean);
        if (validImgs.length) {
          gsap.set(validImgs, { scale: 1 });
        }
        const firstImg = frames[0]?.querySelector('img');
        if (firstImg) {
          gsap.set(firstImg, { scale: 1 });
        }

        const seg = 1;
        const altO = { a: D[0].a };

        const descTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '.sc',
            start: 'top top',
            end: '+=' + (D.length - 1) * 90 + '%',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (s: ScrollTriggerInstance) => {
              const idx = Math.min(
                D.length - 1,
                Math.round(s.progress * (D.length - 1))
              );
              ticks.forEach((t, i) => t.classList.toggle('on', i <= idx));
            },
          },
        });

        for (let i = 1; i < D.length; i++) {
          const at = (i - 1) * seg;
          const fr = frames[i];
          const prevFr = frames[i - 1];
          const st = steps[i];
          const prevSt = steps[i - 1];
          descTl
            .to(
              prevSt,
              { autoAlpha: 0, y: -26, duration: seg * 0.34, ease: 'power2.in' },
              at
            )
            .to(
              fr,
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: seg * 0.78,
                ease: 'power2.inOut',
              },
              at + seg * 0.1
            )
            .to(
              fr.querySelector('img'),
              { scale: 1, duration: seg * 0.9, ease: 'power2.out' },
              at + seg * 0.1
            )
            .to(
              prevFr.querySelector('img'),
              { scale: 1, duration: seg * 0.9 },
              at + seg * 0.1
            )
            .to(
              st,
              { autoAlpha: 1, y: 0, duration: seg * 0.4, ease: 'power2.out' },
              at + seg * 0.5
            )
            .to(
              altO,
              {
                a: D[i].a,
                duration: seg * 0.8,
                onUpdate: () => {
                  if (altEl) altEl.textContent = String(Math.round(altO.a));
                },
              },
              at + seg * 0.1
            );
        }
      }

      /* Interlude focus blur */
      const interludeEl = document.querySelector<HTMLElement>('.interlude');
      const interludeDisplay = document.querySelector<HTMLElement>('.interlude .display');
      if (interludeEl && interludeDisplay) {
        gsap.fromTo(
          interludeDisplay,
          { filter: 'blur(9px)', scale: 0.96, autoAlpha: 0.25 },
          {
            filter: 'blur(0px)',
            scale: 1,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: interludeEl,
              start: 'top 80%',
              end: 'center 55%',
              scrub: true,
            },
          }
        );
      }

      /* Featured Plate Parallax (registered after pinned .sc and .hgal sections) */
      gsap.utils.toArray<HTMLElement>('.plate img').forEach((img) => {
        const parentPlate = img.closest('.plate') || img.parentElement;
        gsap.fromTo(
          img,
          { yPercent: -14, scale: 1.0 },
          {
            yPercent: 14,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: parentPlate,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      window.addEventListener('load', () => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
      document.querySelectorAll<HTMLImageElement>('.plate img').forEach((img) => {
        if (img.complete) {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        } else {
          img.addEventListener('load', () => {
            ScrollTrigger.sort();
            ScrollTrigger.refresh();
          }, { once: true });
        }
      });
      if (document.fonts?.ready)
        document.fonts.ready.then(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });
      let rzT: ReturnType<typeof setTimeout>;
      window.addEventListener('resize', () => {
        clearTimeout(rzT);
        rzT = setTimeout(() => ScrollTrigger.refresh(), 200);
      });
    } else {
      /* Fallback altimeter for reduced motion */
      const upd = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
        updateAltitude(p);
        GL.descent = Math.min(1, scrollY / innerHeight);
      };
      window.addEventListener('scroll', upd, { passive: true });
      window.addEventListener('resize', upd);
      upd();
    }

    // 8. Gallery Shot & Magnetic Button Hover Effects
    if (FINE && !RM) {
      document.querySelectorAll<HTMLElement>('.shot').forEach((s) => {
        s.addEventListener('mouseenter', () => {
          gsap.to(s.querySelector('.reticle'), {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'expo.out',
          });
          gsap.to(s.querySelector<HTMLElement>('img'), {
            scale: 1.02,
            duration: 1.1,
            ease: 'expo.out',
          });
        });
        s.addEventListener('mouseleave', () => {
          gsap.to(s.querySelector('.reticle'), {
            opacity: 0,
            scale: 1.04,
            duration: 0.4,
          });
          gsap.to(s.querySelector<HTMLElement>('img'), {
            scale: 1.0,
            duration: 1.1,
            ease: 'expo.out',
          });
        });
      });

      document.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
        const mx2 = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
        const my2 = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
        el.addEventListener('mousemove', (e) => {
          const r = el.getBoundingClientRect();
          mx2((e.clientX - (r.left + r.width / 2)) * 0.25);
          my2((e.clientY - (r.top + r.height / 2)) * 0.4);
        });
        el.addEventListener('mouseleave', () => {
          mx2(0);
          my2(0);
        });
      });
    }

    // 10. Preloader Ticker Loop (Navbar & Altimeter remain permanently visible)
    if (!RM) document.body.style.overflow = 'hidden';
    const pre = document.getElementById('pre')!;
    const num = document.getElementById('preNum')!;
    const bar = document.getElementById('preBar')!;
    const status = document.getElementById('preStatus')!;
    const sats = document.getElementById('preSats')!;
    const curtain = document.getElementById('curtain')!;
    const urls = [
      '/mauritius-coastal-drone-photography-skyscape.jpg',
      '/birds.svg',
    ];
    let done = 0,
      shown = 0;
    const stages = [
      'Motors armed',
      'Climbing',
      'Levelling off',
      'Gimbal to nadir',
      'Holding 299 m',
    ];
    urls.forEach((u) => {
      const i = new Image();
      i.onload = i.onerror = () => {
        done++;
      };
      i.src = u;
    });
    const t0 = performance.now();
    let tickFrame: number;
    (function tick(t) {
      tickFrame = requestAnimationFrame(tick);
      const el = (t - t0) / 1000;
      const real = urls.length > 0 ? done / urls.length : 1;
      const floor = Math.min(1, el / 1.1);
      const target = Math.min(1, real * 0.4 + floor * 0.6);
      shown += (target - shown) * 0.16;
      if (num) num.textContent = String(Math.round(shown * CEIL)).padStart(3, '0');
      if (bar) bar.style.transform = 'scaleX(' + shown + ')';
      if (status)
        status.textContent =
          stages[
            Math.min(stages.length - 1, Math.floor(shown * stages.length))
          ];
      if (sats)
        sats.textContent = shown > 0.4 ? 'GPS LOCK · 18 SATS' : 'ACQUIRING GPS';

      // Dynamic real-time live flight telemetry fluctuations
      const pEl = document.getElementById('hudPitch');
      const rEl = document.getElementById('hudRoll');
      const vsEl = document.getElementById('hudVS');
      const wEl = document.getElementById('hudWind');
      const latEl = document.getElementById('hudLatency');

      if (pEl) pEl.textContent = `${(-15.4 + Math.sin(t * 0.008) * 0.5).toFixed(1)}°`;
      if (rEl) rEl.textContent = `${(0.8 + Math.cos(t * 0.006) * 0.4 >= 0 ? '+' : '')}${(0.8 + Math.cos(t * 0.006) * 0.4).toFixed(1)}°`;
      if (vsEl) vsEl.textContent = `${(1.8 + Math.sin(t * 0.005) * 0.3).toFixed(1)} m/s`;
      if (wEl) wEl.textContent = `${(3.2 + Math.cos(t * 0.004) * 0.2).toFixed(1)} m/s ↘`;
      if (latEl) latEl.textContent = `${Math.floor(12 + Math.sin(t * 0.01) * 2)} ms`;

      if (shown > 0.985 || el > 1.6) {
        cancelAnimationFrame(tickFrame);
        launch();
        return;
      }
    })(t0);

    function launch() {
      if (num) num.textContent = '299';
      if (bar) bar.style.transform = 'scaleX(1)';
      if (RM) {
        if (pre) pre.style.display = 'none';
        if (curtain) curtain.style.display = 'none';
        GL.reveal = 1;
        document.body.style.overflow = '';
        return;
      }
      if (lenis) lenis.stop();
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          window.scrollTo(0, 0);
          if (lenis) {
            lenis.scrollTo(0, { immediate: true });
            lenis.start();
          }
          ScrollTrigger.refresh();
        },
      });
      tl.to(['.pre-drone-stage', num, status, sats, '.pre-center-tele', '.pre-bar'], {
        autoAlpha: 0,
        y: -14,
        scale: 0.95,
        duration: 0.55,
        stagger: 0.03,
        ease: 'power2.in',
      })
        .to(pre, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=.1')
        .to(
          curtain,
          { scaleY: 0, transformOrigin: 'top', duration: 1.1, ease: 'expo.inOut' },
          '<'
        )
        .to(GL, { reveal: 1, duration: 1.6, ease: 'power2.out' }, '<.2')
        .set(['.hud', '.h-corner', '.cue', '.hero-birds-layer'], { autoAlpha: 1, y: 0 })
        .set('#heroMainGroup', { autoAlpha: 0, y: 24 })
        .set(pre, { display: 'none' });
    }

    return () => {
      stopGL();
      window.removeEventListener('scroll', onScrollDronePitch);
      if (onParallaxMove) window.removeEventListener('mousemove', onParallaxMove);
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('dragstart', handleDragStart, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      if (lenis) lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
