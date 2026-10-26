'use client';
import { useEffect, useRef } from 'react';

// Animated background: drifting glass orbs (CSS) + connected particle network (canvas)
export default function Background() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const x = c.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0, P = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(70, (w * h) / 15000));
      P = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.6,
      }));
    };

    const tick = () => {
      x.clearRect(0, 0, w, h);
      for (const p of P) {
        if (!reduce) { p.x += p.vx; p.y += p.vy; }
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        x.beginPath();
        x.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        x.fillStyle = 'rgba(255,255,255,.55)';
        x.fill();
      }
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            x.strokeStyle = `rgba(255,255,255,${(1 - d / 130) * 0.2})`;
            x.lineWidth = 1;
            x.beginPath();
            x.moveTo(P[i].x, P[i].y);
            x.lineTo(P[j].x, P[j].y);
            x.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="bg" aria-hidden="true">
      <i className="o o1" />
      <i className="o o2" />
      <i className="o o3" />
      <canvas ref={ref} />
    </div>
  );
}
