import { useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface BadgeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  glowColor: string;
}

export default function BadgeCard({
  icon: Icon,
  title,
  description,
  gradient,
  glowColor,
}: BadgeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -25);
    setRotateY((x - 0.5) * 25);
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full cursor-pointer"
      style={{ perspective: "800px" }}
    >
      <style>{`
        @keyframes cube-spin {
          0% { transform: rotateY(0deg) rotateX(0deg); }
          25% { transform: rotateY(90deg) rotateX(15deg); }
          50% { transform: rotateY(180deg) rotateX(0deg); }
          75% { transform: rotateY(270deg) rotateX(-15deg); }
          100% { transform: rotateY(360deg) rotateX(0deg); }
        }
        .badge-cube {
          animation: cube-spin 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .badge-cube-face {
          backface-visibility: hidden;
        }
      `}</style>

      <div
        className="relative w-full h-full rounded-3xl overflow-hidden transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.05 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-[#0d0f1a]/90 backdrop-blur-xl border border-white/[0.1] rounded-3xl" />

        {/* Spotlight glow on hover */}
        <div
          className="absolute inset-0 rounded-3xl transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 60%)`,
          }}
        />

        {/* Border glow */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: `inset 0 0 30px ${glowColor}, 0 0 40px ${glowColor}`,
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col items-center text-center p-6 h-full justify-center gap-3"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* 3D spinning cube icon */}
          <div style={{ perspective: "200px" }} className="mb-1">
            <div
              className="badge-cube relative"
              style={{
                width: 56,
                height: 56,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front face */}
              <div
                className={`badge-cube-face absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl`}
                style={{ transform: "translateZ(28px)" }}
              >
                <Icon className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              {/* Back face */}
              <div
                className={`badge-cube-face absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl`}
                style={{ transform: "rotateY(180deg) translateZ(28px)" }}
              >
                <Icon className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              {/* Left face */}
              <div
                className={`badge-cube-face absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl`}
                style={{
                  transform: "rotateY(-90deg) translateZ(28px)",
                  opacity: 0.9,
                }}
              >
                <Icon className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              {/* Right face */}
              <div
                className={`badge-cube-face absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl`}
                style={{
                  transform: "rotateY(90deg) translateZ(28px)",
                  opacity: 0.9,
                }}
              >
                <Icon className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>

          <h3 className="font-display font-bold text-white text-base leading-tight">
            {title}
          </h3>
          <p className="text-xs text-white/50 leading-relaxed max-w-[160px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
