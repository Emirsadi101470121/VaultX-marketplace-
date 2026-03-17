import { useNavigate, Link } from "react-router-dom";
import { Shield, ShoppingBag, Store, Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function RoleSelection() {
  const [selected, setSelected] = useState<"buyer" | "seller" | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading, updateRole } = useAuth();
  const navigate = useNavigate();

  async function handleContinue() {
    if (!selected) return;
    setLoading(true);
    await updateRole(selected);
    localStorage.setItem("tradego_role_selected", "true");
    localStorage.removeItem("tradego_needs_role");
    setLoading(false);
    navigate("/dashboard");
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-white/30" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/[0.06] rounded-full blur-[120px]" />
        </div>
        <div className="w-full max-w-sm relative text-center">
          <LogIn className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-white mb-2">Sign in first</h2>
          <p className="text-sm text-white/40 mb-6">Please sign in to choose your role and get started.</p>
          <Link to="/auth/signin" className="inline-flex h-12 px-8 rounded-xl font-semibold text-sm bg-white text-black hover:bg-white/90 transition-all items-center">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-600/[0.04] rounded-full blur-[80px]" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            How will you use TradeGo?
          </h1>
          <p className="text-sm text-white/40">
            Choose your starting mode. You can switch anytime from your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setSelected("buyer")}
            className={`relative rounded-2xl p-6 text-center transition-all border-2 ${
              selected === "buyer"
                ? "border-blue-500/50 bg-blue-500/10"
                : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.05]"
            }`}
          >
            <div className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${
              selected === "buyer" ? "bg-blue-500/20" : "bg-white/[0.06]"
            }`}>
              <ShoppingBag className={`w-7 h-7 ${selected === "buyer" ? "text-blue-400" : "text-white/40"}`} />
            </div>
            <h3 className={`font-display font-semibold text-lg mb-1.5 ${
              selected === "buyer" ? "text-blue-400" : "text-white"
            }`}>
              Buyer
            </h3>
            <p className="text-xs text-white/35 leading-relaxed">
              Browse, bid, and purchase collectibles from verified sellers.
            </p>
            {selected === "buyer" && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>

          <button
            onClick={() => setSelected("seller")}
            className={`relative rounded-2xl p-6 text-center transition-all border-2 ${
              selected === "seller"
                ? "border-violet-500/50 bg-violet-500/10"
                : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.05]"
            }`}
          >
            <div className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${
              selected === "seller" ? "bg-violet-500/20" : "bg-white/[0.06]"
            }`}>
              <Store className={`w-7 h-7 ${selected === "seller" ? "text-violet-400" : "text-white/40"}`} />
            </div>
            <h3 className={`font-display font-semibold text-lg mb-1.5 ${
              selected === "seller" ? "text-violet-400" : "text-white"
            }`}>
              Seller
            </h3>
            <p className="text-xs text-white/35 leading-relaxed">
              List items, manage auctions, and grow your collector business.
            </p>
            {selected === "seller" && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selected || loading}
          className="w-full h-12 rounded-xl font-semibold text-sm bg-white text-black hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Setting up..." : "Continue"}
        </button>

        <p className="text-xs text-white/25 text-center mt-4">
          You can switch between buyer and seller mode anytime from your dashboard.
        </p>
      </div>
    </div>
  );
}
