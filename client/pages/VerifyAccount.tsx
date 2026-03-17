import { Link } from "react-router-dom";
import { Shield, CheckCircle2, Upload, Fingerprint, Phone, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    id: "email",
    icon: Mail,
    title: "Email Verification",
    description: "Confirm your email address to get started.",
    status: "completed" as const,
  },
  {
    id: "phone",
    icon: Phone,
    title: "Phone Verification",
    description: "Add and verify your phone number for account security.",
    status: "current" as const,
  },
  {
    id: "identity",
    icon: Fingerprint,
    title: "Identity Verification",
    description: "Upload a government-issued ID to unlock full features.",
    status: "pending" as const,
  },
  {
    id: "docs",
    icon: Upload,
    title: "Seller Documents",
    description: "Optional: Provide address proof to become a verified seller.",
    status: "pending" as const,
  },
];

export default function VerifyAccount() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-blue-600/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-violet-600/[0.04] rounded-full blur-[80px]" />
      </div>

      <div className="w-full max-w-lg relative">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white">
              Trade<span className="text-gradient">Go</span>
            </span>
          </Link>
        </div>

        <h1 className="font-display text-2xl font-bold text-white mb-2">Verify Your Account</h1>
        <p className="text-sm text-white/40 mb-8">
          Complete verification to unlock all TradeGo features. Verified accounts get trust badges and priority support.
        </p>

        {/* Steps */}
        <div className="space-y-3 mb-8">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`glass rounded-xl p-4 flex items-center gap-4 transition-all ${
                step.status === "current" ? "ring-1 ring-blue-500/30 glow-border" : ""
              }`}
            >
              <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${
                step.status === "completed"
                  ? "bg-emerald-500/15"
                  : step.status === "current"
                  ? "bg-blue-500/15"
                  : "bg-white/[0.04]"
              }`}>
                {step.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <step.icon className={`w-5 h-5 ${
                    step.status === "current" ? "text-blue-400" : "text-white/20"
                  }`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={`text-sm font-semibold ${
                    step.status === "completed" ? "text-emerald-400" : step.status === "current" ? "text-white" : "text-white/35"
                  }`}>
                    {step.title}
                  </p>
                  {step.status === "completed" && (
                    <span className="text-[10px] font-bold text-emerald-400">DONE</span>
                  )}
                </div>
                <p className="text-xs text-white/30">{step.description}</p>
              </div>
              {step.status === "current" && (
                <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all shrink-0">
                  Verify
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Current Step Form */}
        <div className="glass-strong rounded-2xl p-6 mb-6">
          <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-400" />
            Phone Verification
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-white/50 mb-1.5 block">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
              />
            </div>
            <button className="w-full h-12 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-blue-600/20">
              Send Verification Code
            </button>
            <div>
              <label className="text-xs font-medium text-white/50 mb-1.5 block">Verification Code</label>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            Skip for now
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
