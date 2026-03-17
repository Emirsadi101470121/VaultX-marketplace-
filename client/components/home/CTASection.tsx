import { Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-strong rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/[0.12] rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[300px] h-[300px] bg-violet-600/[0.08] rounded-full blur-[60px]" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs font-medium text-blue-400 mb-6">
              <Shield className="w-3.5 h-3.5" />
              Join 12,400+ Verified Traders
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-2xl mx-auto leading-tight">
              Start Trading with{" "}
              <span className="text-gradient">Confidence</span> Today
            </h2>

            <p className="text-white/45 text-lg mb-8 max-w-lg mx-auto">
              Whether you're buying your grail or selling your collection, TradeGo protects every transaction.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
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
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
