import { Award } from "lucide-react";

export default function BadgeCenterContent() {
  return (
    <div className="flex flex-col items-center text-center pointer-events-none select-none">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-violet-500/20">
        <Award className="w-8 h-8 text-white" />
      </div>
      <h3 className="font-display text-xl font-bold text-white mb-1">
        Level Up
      </h3>
      <p className="text-white/40 text-sm max-w-[200px]">
        Trade, ship & collect to earn badges
      </p>
    </div>
  );
}
