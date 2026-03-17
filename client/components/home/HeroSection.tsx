import { Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";
import GridScan from "@/components/GridScan";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[480px] sm:min-h-[600px] lg:min-h-[700px]">
      <div className="absolute inset-0 z-0">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-[2] pointer-events-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 lg:pt-32 lg:pb-36">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-blue-400 mb-6">
            <Shield className="w-3.5 h-3.5" />
            Protected by Escrow-Style Transactions
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Trade Collectibles{" "}
            <span className="text-gradient">With Confidence</span>
          </h1>

          <p className="text-lg lg:text-xl text-white/50 leading-relaxed mb-10 max-w-xl">
            The verified marketplace for collectors. Buy, sell, and auction rare items with
            protected transactions, verified sellers, and reputation-backed trust.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12 pointer-events-auto">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30"
            >
              Explore Marketplace
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/auth/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm glass text-white/80 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              Start Selling
            </Link>
          </div>

          {/* Trust stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["bg-blue-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500"].map((bg, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-background flex items-center justify-center text-[10px] font-bold text-white`}>
                    {["A", "M", "K", "J"][i]}
                  </div>
                ))}
              </div>
              <span className="text-white/50">
                <span className="text-white font-semibold">12,400+</span> verified traders
              </span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-white/50">
                <span className="text-white font-semibold">$2.4M+</span> secured transactions
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
