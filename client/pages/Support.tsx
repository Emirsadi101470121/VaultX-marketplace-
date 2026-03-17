import { useState } from "react";
import Layout from "@/components/Layout";
import {
  HeadphonesIcon,
  Shield,
  Lock,
  Search,
  Bot,
  Send,
  AlertTriangle,
  CheckCircle2,
  Scale,
} from "lucide-react";
import FAQSection from "@/components/support/FAQSection";
import ContactSection from "@/components/support/ContactSection";

const disputeSteps = [
  {
    icon: AlertTriangle,
    title: "Report the Issue",
    description: "Open a dispute from your purchase history within the confirmation window. Describe the issue and upload any evidence (photos, screenshots).",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: Search,
    title: "Investigation",
    description: "Our team reviews evidence from both the buyer and seller. We may reach out for additional information or clarification.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Scale,
    title: "Resolution",
    description: "Based on our review, we issue a fair resolution. This could be a full refund, partial refund, item return, or other mediated outcome.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: CheckCircle2,
    title: "Case Closed",
    description: "Both parties are notified of the decision. Funds are released or returned accordingly. You can appeal within 7 days if you disagree.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];


export default function Support() {
  const [aiMessage, setAiMessage] = useState("");

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-14 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/[0.06] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-blue-400 mb-6">
            <HeadphonesIcon className="w-3.5 h-3.5" />
            We're Here to Help
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Support & <span className="text-gradient">Dispute Resolution</span>
          </h1>
          <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
            Every transaction on TradeGo is protected. If something goes wrong, our team is ready to help resolve it fairly.
          </p>
        </div>
      </section>

      {/* Get in Touch */}
      <ContactSection />

      {/* Dispute Resolution Process */}
      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              How Disputes Are <span className="text-gradient">Resolved</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              A fair and transparent process that protects both buyers and sellers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {disputeSteps.map((step, i) => (
              <div key={step.title} className="glass rounded-2xl p-5 relative">
                {i < disputeSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 right-0 translate-x-1/2 w-8 h-px bg-gradient-to-r from-white/10 to-transparent z-10" />
                )}
                <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center mb-4`}>
                  <step.icon className={`w-5 h-5 ${step.color}`} />
                </div>
                <p className="text-[10px] font-bold text-white/15 mb-1">STEP {i + 1}</p>
                <h3 className="font-display font-semibold text-sm text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/35 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Secure Transactions Work */}
      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-strong rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-blue-400" />
              <h2 className="font-display text-xl font-bold text-white">How Secure Transactions Work</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">For Buyers</h3>
                <ul className="space-y-3">
                  {[
                    "Your payment is held in escrow — never sent directly to the seller",
                    "You have a confirmation window to inspect the item after delivery",
                    "Open a dispute if the item isn't as described",
                    "Full refund protection on all verified transactions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">For Sellers</h3>
                <ul className="space-y-3">
                  {[
                    "Payment is guaranteed once buyer confirms delivery",
                    "Protection against false claims with evidence-based review",
                    "Seller ratings and badges build buyer trust",
                    "Disputes are investigated fairly — both sides are heard",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - New tabbed accordion design */}
      <FAQSection />

      {/* AI Assistant Preview */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-strong rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white">TradeGo AI Assistant</h3>
                <p className="text-xs text-emerald-400">Online — Instant Responses</p>
              </div>
            </div>

            <div className="glass rounded-xl p-4 mb-4 min-h-[120px]">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="glass rounded-xl rounded-tl-none p-3 max-w-md">
                  <p className="text-sm text-white/60 leading-relaxed">
                    Hi! I'm the TradeGo AI Assistant. I can help you with questions about transactions, disputes, verification, and more. How can I help you today?
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Ask a question about TradeGo..."
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                className="flex-1 h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
              />
              <button className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white">
                <Send className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[10px] text-white/20 mt-3 text-center">
              AI responses are for guidance only. For complex issues, contact our human support team.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
