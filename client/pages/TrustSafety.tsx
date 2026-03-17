import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Shield,
  ShieldCheck,
  Lock,
  UserCheck,
  Wallet,
  Award,
  HeadphonesIcon,
  PackageCheck,
  Banknote,
  Scale,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Eye,
  Fingerprint,
  BadgeCheck,
} from "lucide-react";

const trustPillars = [
  {
    icon: UserCheck,
    title: "Identity Verification",
    description: "Every trader on TradeGo goes through a multi-step identity verification process. We confirm real identities so you always know who you're trading with.",
    details: [
      "Government ID verification",
      "Email and phone confirmation",
      "Address verification for sellers",
      "Ongoing account monitoring",
    ],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Lock,
    title: "Escrow-Protected Payments",
    description: "When a buyer makes a purchase, funds are held securely in escrow. The seller only receives payment after the buyer confirms receipt and satisfaction.",
    details: [
      "Funds held until delivery confirmed",
      "Automatic release after confirmation period",
      "Dispute window for any issues",
      "Full refund protection for buyers",
    ],
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    icon: Award,
    title: "Reputation System",
    description: "Our badge-based reputation system rewards honest traders and helps the community identify trustworthy partners at a glance.",
    details: [
      "Verified Seller and Trusted Buyer badges",
      "Transaction-based rating system",
      "Fast Shipper and High Volume recognition",
      "Auction Pro status for experienced auctioneers",
    ],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Admin Moderation",
    description: "A dedicated moderation team actively monitors the marketplace, reviews flagged listings, and takes action against policy violations.",
    details: [
      "24/7 listing monitoring",
      "Counterfeit detection protocols",
      "User report investigation",
      "Proactive fraud prevention",
    ],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
];

const transactionSteps = [
  {
    step: "01",
    icon: Eye,
    title: "Browse & Purchase",
    description: "Find the item you want. Click Buy Now or place a bid. Your payment method is charged and funds are held securely.",
    color: "text-blue-400",
  },
  {
    step: "02",
    icon: Lock,
    title: "Funds in Escrow",
    description: "Your payment is held in TradeGo escrow. The seller is notified to ship the item. Funds are never released prematurely.",
    color: "text-violet-400",
  },
  {
    step: "03",
    icon: PackageCheck,
    title: "Delivery & Inspection",
    description: "Receive the item and inspect it. You have a confirmation window to verify condition and authenticity.",
    color: "text-emerald-400",
  },
  {
    step: "04",
    icon: Banknote,
    title: "Funds Released",
    description: "Once you confirm receipt, funds are released to the seller. If there's an issue, open a dispute before the window closes.",
    color: "text-amber-400",
  },
];

const sellerStandards = [
  { icon: Fingerprint, text: "Complete identity verification before listing" },
  { icon: FileCheck, text: "Accurate item descriptions and condition grading" },
  { icon: PackageCheck, text: "Ship within stated handling time" },
  { icon: BadgeCheck, text: "Maintain a minimum 4.0 star rating" },
  { icon: Scale, text: "Respond to disputes within 48 hours" },
  { icon: AlertTriangle, text: "Zero tolerance for counterfeit items" },
];

const rules = [
  "No counterfeit, replica, or misrepresented items",
  "No price manipulation or shill bidding",
  "No harassment, threats, or abusive communication",
  "No circumventing TradeGo's transaction system",
  "Sellers must honor completed sales",
  "Buyers must confirm receipt or open disputes in time",
  "No multiple accounts to manipulate reputation",
  "Respect intellectual property and copyright",
];

export default function TrustSafety() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/[0.06] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-blue-400 mb-6">
            <Shield className="w-3.5 h-3.5" />
            Our Commitment to You
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Trust & Safety at <span className="text-gradient">TradeGo</span>
          </h1>
          <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
            TradeGo was built to solve the trust problem in peer-to-peer collectible trading.
            Every feature, from identity verification to escrow payments, exists to protect you.
          </p>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Four Pillars of <span className="text-gradient">Protection</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              Comprehensive safeguards that work together to keep every transaction secure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {trustPillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`glass rounded-2xl p-6 lg:p-8 border ${pillar.borderColor}`}
              >
                <div className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center mb-5`}>
                  <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-3">{pillar.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed mb-5">{pillar.description}</p>
                <ul className="space-y-2.5">
                  {pillar.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2.5 text-sm text-white/50">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${pillar.color}`} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transaction Flow */}
      <section className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-violet-600/[0.04] rounded-full blur-[100px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              How a Secure Transaction <span className="text-gradient">Works</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              From purchase to payout — your money is protected at every step.
            </p>
          </div>

          <div className="space-y-4">
            {transactionSteps.map((step, i) => (
              <div key={step.step} className="glass rounded-2xl p-6 flex items-start gap-5">
                <div className="hidden sm:flex w-12 h-12 shrink-0 rounded-xl bg-white/[0.04] items-center justify-center">
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-white/15 font-display">{step.step}</span>
                    <h3 className="font-display font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller Standards */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Seller <span className="text-gradient">Standards</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Every seller on TradeGo must meet and maintain our community standards. This ensures a consistently high-quality marketplace for all collectors.
              </p>
              <div className="space-y-3">
                {sellerStandards.map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-sm text-white/55">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Marketplace <span className="text-gradient">Rules</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                These rules apply to all users. Violations may result in warnings, temporary suspension, or permanent bans depending on severity.
              </p>
              <div className="space-y-2.5">
                {rules.map((rule, i) => (
                  <div key={i} className="flex items-start gap-3 glass rounded-lg p-3">
                    <span className="text-xs font-bold text-white/15 font-display mt-0.5 shrink-0 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-white/50">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dispute Resolution */}
      <section className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-blue-600/[0.04] rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="glass-strong rounded-2xl p-8 md:p-12 text-center">
            <HeadphonesIcon className="w-10 h-10 text-blue-400 mx-auto mb-5" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Need Help? We're Here.
            </h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed mb-8">
              If something goes wrong with a transaction, our dispute resolution team investigates
              thoroughly and fairly. Both buyers and sellers are heard before any decision.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Open a Dispute", desc: "Report an issue within your confirmation window" },
                { label: "We Investigate", desc: "Our team reviews evidence from both parties" },
                { label: "Fair Resolution", desc: "Refunds, replacements, or mediated outcomes" },
              ].map((step) => (
                <div key={step.label} className="glass rounded-xl p-4">
                  <p className="text-sm font-semibold text-white mb-1">{step.label}</p>
                  <p className="text-xs text-white/35">{step.desc}</p>
                </div>
              ))}
            </div>
            <Link
              to="/support"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all"
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
