import { Link } from "react-router-dom";
import { ArrowRight, Globe as GlobeIcon } from "lucide-react";
import { World } from "@/components/ui/globe";
import { globeConfig, arcData } from "./globeData";

export default function GlobalTradingSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs font-medium text-blue-400 mb-6">
              <GlobeIcon className="w-3.5 h-3.5" />
              Trade Across 190+ Countries
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-xl leading-tight">
              Your Collection,{" "}
              <span className="text-gradient">Global Reach</span>
              <br />
              One Account Away
            </h2>

            <p className="text-white/45 text-lg mb-8 max-w-lg">
              Create your free account and instantly connect with collectors,
              buyers, and sellers worldwide. No borders, no limits — just
              seamless global trading at your fingertips.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <Link
                to="/auth/signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm glass text-white/80 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>

          {/* Globe */}
          <div className="flex-1 relative w-full min-h-[280px] sm:min-h-[400px] lg:min-h-[500px]">
            <div className="absolute inset-0">
              <World globeConfig={globeConfig} data={arcData} />
            </div>
            {/* Glow effect behind globe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/[0.08] rounded-full blur-[100px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
