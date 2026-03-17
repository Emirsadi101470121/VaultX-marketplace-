import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

const DEFAULT_GLOW_COLOR = '132, 0, 255';
const DEFAULT_PARTICLE_COUNT = 10;

const createParticle = (x: number, y: number, color: string): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'glow-particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  particleCount?: number;
  enableParticles?: boolean;
  enableBorderGlow?: boolean;
  enableClickRipple?: boolean;
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = DEFAULT_GLOW_COLOR,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableParticles = true,
  enableBorderGlow = true,
  enableClickRipple = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(p => {
      gsap.to(p, {
        scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)',
        onComplete: () => p.parentNode?.removeChild(p)
      });
    });
    particlesRef.current = [];
  }, []);

  const spawnParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const tid = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const p = createParticle(Math.random() * width, Math.random() * height, glowColor);
        cardRef.current.appendChild(p);
        particlesRef.current.push(p);

        gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(p, {
          x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360, duration: 2 + Math.random() * 2,
          ease: 'none', repeat: -1, yoyo: true
        });
        gsap.to(p, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, i * 80);
      timeoutsRef.current.push(tid);
    }
  }, [particleCount, glowColor]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onEnter = () => {
      isHoveredRef.current = true;
      if (enableParticles) spawnParticles();
    };

    const onLeave = () => {
      isHoveredRef.current = false;
      clearParticles();
    };

    const onMove = (e: MouseEvent) => {
      if (!enableBorderGlow) return;
      const rect = el.getBoundingClientRect();
      const rx = ((e.clientX - rect.left) / rect.width) * 100;
      const ry = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--glow-x', `${rx}%`);
      el.style.setProperty('--glow-y', `${ry}%`);
      el.style.setProperty('--glow-intensity', '1');
    };

    const onClick = (e: MouseEvent) => {
      if (!enableClickRipple) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxD = Math.max(
        Math.hypot(x, y), Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height)
      );
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position:absolute; width:${maxD * 2}px; height:${maxD * 2}px; border-radius:50%;
        background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.2) 30%,transparent 70%);
        left:${x - maxD}px; top:${y - maxD}px; pointer-events:none; z-index:1000;
      `;
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, {
        scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove()
      });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('click', onClick);

    return () => {
      isHoveredRef.current = false;
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('click', onClick);
      clearParticles();
    };
  }, [spawnParticles, clearParticles, enableParticles, enableBorderGlow, enableClickRipple, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`glow-card relative overflow-hidden ${enableBorderGlow ? 'glow-card--border' : ''} ${className}`}
      style={{
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-intensity': '0',
        '--glow-radius': '200px',
        '--glow-color': glowColor,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default GlowCard;

// Inject styles once
const styleId = 'glow-card-styles';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    .glow-card--border::after {
      content: '';
      position: absolute;
      inset: 0;
      padding: 6px;
      background: radial-gradient(
        var(--glow-radius) circle at var(--glow-x) var(--glow-y),
        rgba(var(--glow-color), calc(var(--glow-intensity) * 0.8)) 0%,
        rgba(var(--glow-color), calc(var(--glow-intensity) * 0.4)) 30%,
        transparent 60%
      );
      border-radius: inherit;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      pointer-events: none;
      opacity: 1;
      transition: opacity 0.3s ease;
      z-index: 1;
    }
    .glow-card--border:hover {
      box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(var(--glow-color), 0.2);
    }
    .glow-particle::before {
      content: '';
      position: absolute;
      top: -2px; left: -2px; right: -2px; bottom: -2px;
      background: rgba(var(--glow-color), 0.2);
      border-radius: 50%;
      z-index: -1;
    }
  `;
  document.head.appendChild(style);
}
