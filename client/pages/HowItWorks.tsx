import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  UserCheck,
  ShoppingBag,
  PackageCheck,
  Banknote,
  Shield,
  Lock,
  Gavel,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  Star,
  Award,
  HeadphonesIcon,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserCheck,
    title: "Create & Verify Your Account",
    description: "Sign up for free in seconds. Complete our quick verification process — confirm your email, phone, and identity. Verified accounts unlock full buying, selling, and auction features.",
    details: ["Email and phone verification", "Government ID confirmation for sellers", "Instant buyer access, seller access after verification"],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    step: "02",
    icon: ShoppingBag,
    title: "Buy, Sell, or Auction",
    description: "Browse the marketplace and find rare collectibles from verified sellers. Buy at fixed prices, place bids on live auctions, or list your own items for sale.",
    details: ["Fixed-price and auction listings", "Advanced search and category filters", "Watchlist and saved searches"],
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    step: "03",
    icon: PackageCheck,
    title: "Secure Delivery & Confirmation",
    description: "Sellers ship items with tracking. Buyers receive the item and have a confirmation window to inspect condition and authenticity before confirming receipt.",
    details: ["Tracked shipping required", "3-day inspection window", "Photo evidence for disputes"],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    step: "04",
    icon: Banknote,
    title: "Funds Released Securely",
    description: "Once the buyer confirms receipt, funds are automatically released to the seller. If there's an issue, our dispute team investigates and resolves fairly.",
    details: ["Automatic release after confirmation", "Full refund protection for buyers", "Seller payment guaranteed on valid sales"],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
];

const buyerBenefits = [
  { icon: Lock, text: "Funds held in escrow — never sent directly to sellers" },
  { icon: ShieldCheck, text: "All sellers are identity-verified" },
  { icon: PackageCheck, text: "Inspect items before funds release" },
  { icon: HeadphonesIcon, text: "24/7 dispute resolution support" },
];

const sellerBenefits = [
  { icon: DollarSign, text: "Payment guaranteed on confirmed deliveries" },
  { icon: Award, text: "Build reputation with badges and ratings" },
  { icon: Gavel, text: "Flexible pricing: fixed or auction" },
  { icon: Star, text: "Verified badge boosts buyer confidence" },
];

export default function HowItWorks() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/[0.06] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            How <span className="text-gradient">TradeGo</span> Works
          </h1>
          <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
            Four simple steps to secure, verified collectible trading. Every transaction is protected from start to finish.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={step.step}
                className={`glass rounded-2xl p-6 md:p-8 border ${step.borderColor}`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-start gap-4 md:w-1/3">
                    <div className={`w-12 h-12 shrink-0 rounded-xl ${step.bg} flex items-center justify-center`}>
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/15 font-display mb-1">STEP {step.step}</p>
                      <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-sm text-white/50 leading-relaxed mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2.5 text-sm text-white/40">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 ${step.color}`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Protection for <span className="text-gradient">Everyone</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              Whether you're buying or selling, TradeGo has your back.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6 border border-blue-500/15">
              <h3 className="font-display font-semibold text-lg text-white mb-5 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Buyer Protection
              </h3>
              <div className="space-y-3.5">
                {buyerBenefits.map((b) => (
                  <div key={b.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <b.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-sm text-white/55">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-emerald-500/15">
              <h3 className="font-display font-semibold text-lg text-white mb-5 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                Seller Protection
              </h3>
              <div className="space-y-3.5">
                {sellerBenefits.map((b) => (
                  <div key={b.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <b.icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-sm text-white/55">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-strong rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Start Trading?
            </h2>
            <p className="text-white/40 text-sm max-w-md mx-auto mb-8">
              Join thousands of verified collectors trading with confidence on TradeGo.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-blue-600/20"
              >
                Explore Marketplace
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/auth/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm glass text-white/70 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
