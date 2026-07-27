'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { D } from '@/data/descent';
import { F } from '@/data/gallery';

const CEIL = 299;
const PPM = 6;

const U = (id: string, w: number, q = 80) =>
  `https://images.unsplash.com/${id}?w=${w}&q=${q}`;

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

    let onParallaxMove: ((e: MouseEvent) => void) | null = null;

    // 3. Build Altimeter tape ticks & position immediately (zero delay)
    const tape = document.getElementById('tape');
    let setTape: any = null;

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

    // 5. Original WebGL Shader (Exact match to index.html)
    const heroEl = document.getElementById('hero') as HTMLElement;
    const GL = { descent: 0, mix: 0, vel: 0, reveal: 0 };
    let glReady = false;
    let stopGL = () => {};

    if (!RM && heroEl) {
      const cv = document.getElementById('glc') as HTMLCanvasElement;
      if (cv) {
        const gl = cv.getContext('webgl', {
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        });
        if (gl) {
          const OCT = MOBILE ? 3 : 5;
          const VS = `attribute vec2 p;varying vec2 vUv;void main(){vUv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
          const FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D uA, uB;
uniform vec2 uRes, uResA, uResB, uMouse;
uniform float uTime, uDescent, uMix, uVel, uReveal;

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
  float rs=uRes.x/uRes.y, ri=img.x/img.y;
  vec2 r=vec2(min(rs/ri,1.), min(ri/rs,1.));
  return uv*r+(1.-r)*.5;
}
vec3 samp(sampler2D t, vec2 uv, float ab){
  return vec3(texture2D(t,uv+vec2(ab,0.)).r, texture2D(t,uv).g, texture2D(t,uv-vec2(ab,0.)).b);
}

void main(){
  float d = uDescent;
  vec2 uv = vUv;

  // Ultra-subtle flight camera micro-vibration
  vec2 shake = vec2(noise(vec2(uTime*4.2, 1.0)), noise(vec2(2.5, uTime*3.8))) - 0.5;
  uv += shake * (0.0006 + abs(uVel)*0.002);

  // Smooth flight altitude camera zoom
  float zoom = 1.0 + 0.16 * (1.0 - d);
  vec2 g = (uv - 0.5) / zoom + 0.5;
  g += uMouse * vec2(0.016, 0.012) * (1.0 + d * 0.4);

  // Silky smooth ocean heat-wave distortion
  float mist = fbm(g * 2.6 + vec2(uTime * 0.015, -uTime * 0.012));
  g += (vec2(mist) - 0.5) * (0.002 + abs(uVel) * 0.005);

  float dn = fbm(g * 2.2 + uTime * 0.01);
  float m  = smoothstep(0.0, 1.0, uMix * 1.4 - 0.2 + (dn - 0.5) * 0.3);
  float edge = smoothstep(0.35, 1.0, distance(vUv, vec2(0.5)));
  float ab = (0.0008 + abs(uVel) * 0.006) * edge;

  // Sample photo texture A & B with crisp clarity
  vec3 A = samp(uA, cover(g + vec2(0.0, m * 0.02), uResA), ab);
  vec3 B = samp(uB, cover(g - vec2(0.0, (1.0 - m) * 0.02), uResB), ab);
  vec3 col = mix(A, B, m);

  // Soft natural golden sunlight bloom
  vec2 sunPos = (vUv - vec2(0.72, 0.24)) * vec2(uRes.x / uRes.y, 1.0);
  float sun = exp(-length(sunPos) * 2.8);
  col += vec3(0.18, 0.14, 0.08) * sun * 0.35;

  // Subtle vignette for border framing
  col *= 1.0 - edge * 0.16;
  col *= smoothstep(0.0, 0.4, uReveal + (1.0 - abs(vUv.y - 0.5) * 1.5));
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
                uMouse: u('uMouse'),
                uTime: u('uTime'),
                uDescent: u('uDescent'),
                uMix: u('uMix'),
                uVel: u('uVel'),
                uReveal: u('uReveal'),
              };
              gl.uniform1i(u('uA'), 0);
              gl.uniform1i(u('uB'), 1);

              let loaded = 0;
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
                  if (++loaded === 2) {
                    glReady = true;
                    heroEl.classList.add('gl-on');
                  }
                };
                im.onerror = () =>
                  console.warn('[skyscape] texture failed:', src);
                im.src = src;
              }
              texture(
                '/mauritius-coastal-drone-photography-skyscape.jpg',
                0,
                U_.uResA
              );
              texture(
                U('photo-1500534314209-a25ddb2bd429', 1800, 85),
                1,
                U_.uResB
              );

              const MAXPX = MOBILE ? 1.4e6 : 2.6e6;
              function size() {
                const w = heroEl.clientWidth,
                  h = heroEl.clientHeight;
                let dpr = Math.min(devicePixelRatio || 1, MOBILE ? 1.15 : 1.6);
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
                gl!.uniform1f(U_.uTime, (t - t0) / 1000);
                gl!.uniform2f(U_.uMouse, cx, cy);
                gl!.uniform1f(U_.uDescent, GL.descent);
                gl!.uniform1f(U_.uMix, GL.mix);
                gl!.uniform1f(U_.uVel, GL.vel);
                gl!.uniform1f(U_.uReveal, GL.reveal);
                gl!.drawArrays(gl!.TRIANGLES, 0, 3);
              })(t0);

              stopGL = () => {
                cancelAnimationFrame(animId);
                window.removeEventListener('resize', onResize);
                if (FINE) window.removeEventListener('mousemove', onMouseMove);
                if (obs) obs.disconnect();
              };
            }
          }
        }
      }
    }

    // 6. Lenis smooth scroll
    let lenis: Lenis | null = null;
    if (!RM) {
      lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 1,
        smoothWheel: true,
        touchMultiplier: 1.5,
        syncTouch: false,
      } as any);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t: number) => lenis!.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);

      let velTarget = 0;
      lenis.on('scroll', ({ velocity }: any) => {
        velTarget = Math.max(-1, Math.min(1, velocity / 55));
      });
      (function decay() {
        requestAnimationFrame(decay);
        velTarget *= 0.92;
        GL.vel += (velTarget - GL.vel) * 0.12;
      })();

      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          lenis!.scrollTo(a.getAttribute('href')!, { offset: -10, duration: 1.5 });
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

    const altDrone = document.getElementById('altDrone');

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
        onUpdate: (s: any) => {
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
          const stuck = s.scroll() > 40;
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

      if (beat1 && beat2) {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
        gsap.set([beat1, beat2], { autoAlpha: 0, y: 24 });
        if (heroMainGroup) gsap.set(heroMainGroup, { autoAlpha: 1, y: 0 });

        const heroTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end: MOBILE ? '+=140%' : '+=210%',
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        heroTl
          .to(GL, { descent: 1, duration: 1.15, ease: 'power1.inOut' }, 0)
          .to('.cue', { autoAlpha: 0, duration: 0.18 }, 0)
          .to(
            heroMainGroup || '.hero-in',
            { autoAlpha: 0, y: -30, duration: 0.45, ease: 'power2.inOut' },
            0.32
          )
          .to(beat1, { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out' }, 0.82)
          .to(beat1, { autoAlpha: 0, y: -30, duration: 0.3, ease: 'power2.in' }, 1.42)
          .to(GL, { mix: 1, duration: 0.95, ease: 'power1.inOut' }, 1.3)
          .to(beat2, { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out' }, 1.72)
          .to(beat2, { autoAlpha: 0, y: -26, duration: 0.3, ease: 'power2.in' }, 2.28)
          .to('.h-corner, .hud', { autoAlpha: 0, duration: 0.3 }, 2.2);
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

      gsap.utils.toArray<HTMLElement>('.plate img, .p-frame img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.plate, .p-frame'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
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
          gsap.set(validImgs, { scale: 1.14 });
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
            onUpdate: (s: any) => {
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
              { scale: 1.06, duration: seg * 0.9 },
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

      /* Horizontal Gallery */
      const htrack = document.getElementById('htrack')!;
      if (htrack) {
        if (!MOBILE) {
          const dist = () => htrack.scrollWidth - innerWidth;
          const hAnim = gsap.to(htrack, {
            x: () => -dist(),
            ease: 'none',
            scrollTrigger: {
              trigger: '.hgal',
              start: 'top top',
              end: () => '+=' + dist(),
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (s: any) => {
                gsap.set('#hBar', { scaleX: s.progress });
                const n = Math.min(
                  F.length,
                  Math.round(s.progress * (F.length - 1)) + 1
                );
                const hIdx = document.getElementById('hIdx');
                if (hIdx)
                  hIdx.textContent =
                    String(n).padStart(2, '0') + ' / ' + F.length;
              },
            },
          });

          gsap.utils.toArray<HTMLElement>('.shot').forEach((shot) => {
            const frameEl = shot.querySelector('.frame');
            const imgEl = shot.querySelector('img');
            const capEl = shot.querySelector('.cap');

            if (frameEl) {
              gsap.fromTo(
                frameEl,
                { clipPath: 'inset(0% 12% 0% 12%)' },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: shot,
                    containerAnimation: hAnim,
                    start: 'left 92%',
                    end: 'left 55%',
                    scrub: true,
                  },
                }
              );
            }
            if (imgEl) {
              gsap.fromTo(
                imgEl,
                { xPercent: -6 },
                {
                  xPercent: 6,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: shot,
                    containerAnimation: hAnim,
                    start: 'left right',
                    end: 'right left',
                    scrub: true,
                  },
                }
              );
            }
            if (capEl) {
              gsap.fromTo(
                capEl,
                { y: 18, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: shot,
                    containerAnimation: hAnim,
                    start: 'left 88%',
                    end: 'left 62%',
                    scrub: true,
                  },
                }
              );
            }
          });
        } else {
          gsap.utils.toArray<HTMLElement>('.shot').forEach((shot) => {
            const frameEl = shot.querySelector('.frame');
            const imgEl = shot.querySelector('img');

            if (frameEl) {
              gsap.fromTo(
                frameEl,
                { clipPath: 'inset(4% 6% 4% 6%)' },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 1.2,
                  ease: 'expo.out',
                  scrollTrigger: { trigger: shot, start: 'top 88%', once: true },
                }
              );
            }
            if (imgEl) {
              gsap.fromTo(
                imgEl,
                { yPercent: -6 },
                {
                  yPercent: 6,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: shot,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                }
              );
            }
          });
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

      ScrollTrigger.refresh();
      window.addEventListener('load', () => ScrollTrigger.refresh());
      if (document.fonts?.ready)
        document.fonts.ready.then(() => ScrollTrigger.refresh());
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
            scale: 1.03,
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
            scale: 1.16,
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

    // 9. Lightbox FLIP
    const lb = document.getElementById('lb');
    const lbBg = document.getElementById('lbBg');
    const lbImg = document.getElementById('lbImg') as HTMLImageElement;
    const lbT = document.getElementById('lbT');
    const lbL = document.getElementById('lbL');
    const lbTele = document.getElementById('lbTele');
    const lbCount = document.getElementById('lbCount');
    const lbStage = document.getElementById('lbStage');
    const htrackEl = document.getElementById('htrack');
    let li = 0,
      isOpen = false,
      lastFocus: Element | null = null;

    if (lb && lbImg && lbStage && htrackEl) {
      function fit(ar: number) {
        const s = lbStage!.getBoundingClientRect();
        let w = s.width,
          h = w / ar;
        if (h > s.height) {
          h = s.height;
          w = h * ar;
        }
        return {
          w,
          h,
          x: s.left + (s.width - w) / 2,
          y: s.top + (s.height - h) / 2,
        };
      }
      function setMeta(i: number) {
        const f = F[i];
        if (lbT) lbT.textContent = f.t;
        if (lbL) lbL.textContent = f.l;
        if (lbTele)
          lbTele.innerHTML = `${f.alt} m AGL &nbsp;·&nbsp; ${f.gps}<br>DJI Air 2S · 1" CMOS · 22 mm equiv.`;
        if (lbCount)
          lbCount.textContent =
            String(i + 1).padStart(2, '0') + ' / ' + F.length;
      }
      function openLB(i: number) {
        li = i;
        const f = F[i];
        const thumb = document.querySelector<HTMLImageElement>(
          `.shot[data-i="${i}"] img`
        );
        if (!thumb) return;
        const r = thumb.getBoundingClientRect();
        const ar =
          thumb.naturalWidth && thumb.naturalHeight
            ? thumb.naturalWidth / thumb.naturalHeight
            : 1.5;
        lbImg.src = U(f.img, 2000, 88);
        lbImg.alt = `${f.t} | aerial photograph, ${f.l}`;
        setMeta(i);
        lb!.classList.add('open');
        isOpen = true;
        lastFocus = document.activeElement;
        document.getElementById('lbX')?.focus();
        if (lenis) lenis.stop();
        const t = fit(ar);
        if (RM) {
          Object.assign(lbImg.style, {
            left: t.x + 'px',
            top: t.y + 'px',
            width: t.w + 'px',
            height: t.h + 'px',
          });
          if (lbBg) lbBg.style.opacity = '1';
          return;
        }
        gsap.set(lbImg, {
          left: t.x,
          top: t.y,
          width: t.w,
          height: t.h,
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
        });
        gsap.fromTo(
          lbImg,
          {
            x: r.left - t.x,
            y: r.top - t.y,
            scaleX: r.width / t.w,
            scaleY: r.height / t.h,
          },
          { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.95, ease: 'expo.inOut' }
        );
        if (lbBg) gsap.fromTo(lbBg, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        gsap.fromTo(
          '.lb-bar,.lb-foot',
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.25, ease: 'power3.out' }
        );
      }
      function closeLB() {
        if (!isOpen) return;
        isOpen = false;
        const thumb = document.querySelector<HTMLImageElement>(
          `.shot[data-i="${li}"] img`
        );
        const r = thumb
          ? thumb.getBoundingClientRect()
          : { left: 0, top: 0, width: 0, height: 0 };
        const t = {
          x: parseFloat(lbImg.style.left || '0'),
          y: parseFloat(lbImg.style.top || '0'),
          w: parseFloat(lbImg.style.width || '0'),
          h: parseFloat(lbImg.style.height || '0'),
        };
        if (lenis) lenis.start();
        if (RM) {
          lb!.classList.remove('open');
          if (lastFocus) (lastFocus as HTMLElement).focus();
          return;
        }
        gsap.to('.lb-bar,.lb-foot', { autoAlpha: 0, duration: 0.25 });
        if (lbBg) gsap.to(lbBg, { opacity: 0, duration: 0.6, delay: 0.15 });
        gsap.to(lbImg, {
          x: r.left - t.x,
          y: r.top - t.y,
          scaleX: r.width / t.w,
          scaleY: r.height / t.h,
          duration: 0.8,
          ease: 'expo.inOut',
          onComplete: () => {
            lb!.classList.remove('open');
            if (lastFocus) (lastFocus as HTMLElement).focus();
          },
        });
      }
      function step(d: number) {
        const n = (li + d + F.length) % F.length;
        li = n;
        setMeta(n);
        const f = F[n];
        if (RM) {
          lbImg.src = U(f.img, 2000, 88);
          return;
        }
        gsap.to(lbImg, {
          autoAlpha: 0,
          duration: 0.28,
          onComplete: () => {
            lbImg.src = U(f.img, 2000, 88);
            lbImg.onload = () => {
              const t = fit(lbImg.naturalWidth / lbImg.naturalHeight);
              gsap.set(lbImg, {
                left: t.x,
                top: t.y,
                width: t.w,
                height: t.h,
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
              });
              gsap.to(lbImg, { autoAlpha: 1, duration: 0.45, ease: 'power2.out' });
            };
          },
        });
      }
      htrackEl.addEventListener('click', (e) => {
        const s = (e.target as HTMLElement).closest('.shot') as HTMLElement;
        if (s) openLB(+s.dataset.i!);
      });
      document.getElementById('lbX')?.addEventListener('click', closeLB);
      document.getElementById('lbPrev')?.addEventListener('click', () => step(-1));
      document.getElementById('lbNext')?.addEventListener('click', () => step(1));
      if (lbBg) lbBg.addEventListener('click', closeLB);
      window.addEventListener('keydown', (e) => {
        if (!isOpen) return;
        if (e.key === 'Escape') closeLB();
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
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
      U('photo-1486870591958-9b9d0d1dda99', 1800, 85),
      U('photo-1500534314209-a25ddb2bd429', 1800, 85),
      ...D.slice(0, 3).map((d) => U(d.img, 1500)),
      ...F.slice(0, 3).map((f) => U(f.img, 1200)),
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
      const el = (t - t0) / 1000,
        real = done / urls.length,
        floor = Math.min(1, el / 2.4);
      const target = Math.min(
        real * 0.75 + floor * 0.25,
        real === 1 ? 1 : 0.94
      );
      shown += (target - shown) * 0.08;
      if (num) num.textContent = String(Math.round(shown * CEIL)).padStart(3, '0');
      if (bar) bar.style.transform = 'scaleX(' + shown + ')';
      if (status)
        status.textContent =
          stages[
            Math.min(stages.length - 1, Math.floor(shown * stages.length))
          ];
      if (sats)
        sats.textContent = shown > 0.4 ? 'GPS lock · 12 sat' : 'Acquiring GPS';
      if (shown > 0.985 || el > 7) {
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
          if (lenis) lenis.start();
          ScrollTrigger.refresh();
        },
      });
      tl.to(['.pre-drone-stage', num, status, sats, '.pre-tele-pills', '.pre-bar'], {
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
        .from(
          document.getElementById('heroMainGroup') || '.hero-main-group',
          {
            autoAlpha: 0,
            y: 28,
            duration: 1.1,
            ease: 'power3.out',
          },
          '-=.75'
        )
        .from(
          '.hud, .h-corner, .cue',
          { autoAlpha: 0, duration: 0.9, stagger: 0.06, ease: 'power2.out' },
          '-=.8'
        )
        .set(pre, { display: 'none' });
    }

    return () => {
      stopGL();
      window.removeEventListener('scroll', onScrollDronePitch);
      if (onParallaxMove) window.removeEventListener('mousemove', onParallaxMove);
      if (lenis) lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
