import { type LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";


interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  change,
  changeType = "neutral",
}: StatCardProps) {
  return (
    <div className="relative rounded-2xl bg-[hsl(228,16%,10%)] border border-white/[0.06] p-5 overflow-hidden group hover:border-white/[0.1] transition-all duration-300">
      {/* Inner corner glow */}
      <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${iconBg} opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500`} />

      <div className="relative flex items-start justify-between mb-5">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-[18px] h-[18px] ${iconColor}`} />
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-[11px] font-semibold ${
              changeType === "up"
                ? "text-emerald-400"
                : changeType === "down"
                ? "text-red-400"
                : "text-white/30"
            }`}
          >
            {changeType === "up" && <TrendingUp className="w-3 h-3" />}
            {changeType === "down" && <TrendingDown className="w-3 h-3" />}
            {changeType === "neutral" && <Minus className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      <p className="font-display text-[28px] font-bold text-white leading-none tracking-tight">
        {value}
      </p>
      <p className="text-[11px] text-white/30 mt-2 font-medium tracking-wide">
        {label}
      </p>
    </div>
  );
}


interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  noPad?: boolean;
}

export function GlassPanel({ children, className = "", noPad }: GlassPanelProps) {
  return (
    <div
      className={`rounded-2xl bg-[hsl(228,16%,10%)] border border-white/[0.06] overflow-hidden ${
        noPad ? "" : "p-5"
      } ${className}`}
    >
      {children}
    </div>
  );
}


interface SectionHeaderProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  action?: React.ReactNode;
}

export function SectionHeader({
  icon: Icon,
  iconColor,
  title,
  badge,
  badgeColor = "text-white/30 bg-white/[0.05]",
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2.5">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <h3 className="font-display font-semibold text-[13px] text-white">
          {title}
        </h3>
        {badge && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      {action}
    </div>
  );
}


interface TimelineItem {
  id: string | number;
  title: string;
  subtitle: string;
  time: string;
  dotColor: string;
}

export function ActivityTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent" />

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3.5 relative">
            <div className={`w-[11px] h-[11px] rounded-full ${item.dotColor} mt-1 shrink-0 ring-[3px] ring-[hsl(228,16%,10%)]`} />
            <div className="flex-1 min-w-0 -mt-0.5">
              <p className="text-[12px] text-white/70 leading-relaxed line-clamp-2">
                {item.title}
              </p>
              {item.subtitle && (
                <p className="text-[11px] text-white/25 mt-0.5">{item.subtitle}</p>
              )}
              <p className="text-[10px] text-white/15 mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export function BarChart({
  data,
  labels,
  color,
  height = 80,
}: {
  data: number[];
  labels?: string[];
  color: string;
  height?: number;
}) {
  const max = Math.max(...data, 1);

  return (
    <div className="flex items-end gap-2 justify-between" style={{ height }}>
      {data.map((val, i) => {
        const barH = Math.max((val / max) * 100, 6);
        const isMax = val === max;
        return (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
            <div
              className={`w-full max-w-[14px] rounded-md transition-all duration-300 ${color} ${
                isMax ? "opacity-100" : "opacity-40"
              }`}
              style={{ height: `${barH}%` }}
            />
            {labels && (
              <span className="text-[9px] text-white/20 font-medium">
                {labels[i]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}


export function ProgressRing({
  value,
  max,
  size = 44,
  strokeWidth = 3,
  color,
  children,
}: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(228 12% 17%)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
