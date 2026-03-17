import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, Store, ArrowRightLeft, Loader2, LogIn, CalendarDays } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import BuyerDashboardContent from "@/components/dashboard/BuyerDashboardContent";
import SellerDashboardContent from "@/components/dashboard/SellerDashboardContent";

export default function Dashboard() {
  const { user, profile, loading, updateRole } = useAuth();
  const [switching, setSwitching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && !localStorage.getItem("tradego_role_selected")) {
      navigate("/auth/role-selection", { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-6 h-6 animate-spin text-white/30" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <LogIn className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-white mb-2">Sign in required</h2>
          <p className="text-sm text-white/40 mb-6">You need to be signed in to access your dashboard.</p>
          <Link to="/auth/signin?redirect=/dashboard" className="inline-flex h-12 px-8 rounded-xl font-semibold text-sm bg-white text-black hover:bg-white/90 transition-all items-center">
            Sign In
          </Link>
        </div>
      </Layout>
    );
  }

  const currentRole = profile?.role || "buyer";
  const isBuyer = currentRole === "buyer";

  async function handleToggle() {
    const newRole = isBuyer ? "seller" : "buyer";
    setSwitching(true);
    await updateRole(newRole);
    setSwitching(false);
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <Layout>
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[300px] -left-[200px] w-[600px] h-[600px] rounded-full bg-blue-600/[0.04] blur-[120px]" />
        <div className="absolute top-[200px] -right-[250px] w-[500px] h-[500px] rounded-full bg-violet-600/[0.04] blur-[120px]" />
        <div className="absolute -bottom-[200px] left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-600/[0.03] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <DashboardHeader
          isBuyer={isBuyer}
          switching={switching}
          onToggle={handleToggle}
          displayName={profile?.display_name}
          today={today}
        />
        {isBuyer ? <BuyerDashboardContent /> : <SellerDashboardContent />}
      </div>
    </Layout>
  );
}

function DashboardHeader({
  isBuyer,
  switching,
  onToggle,
  displayName,
  today,
}: {
  isBuyer: boolean;
  switching: boolean;
  onToggle: () => void;
  displayName: string | null;
  today: string;
}) {
  return (
    <div className="mb-10">
      {/* Top bar: date + actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-xs text-white/30">
          <CalendarDays className="w-3.5 h-3.5" />
          {today}
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggle}
            disabled={switching}
            className="flex items-center gap-2 h-9 px-3.5 rounded-lg bg-white/[0.05] border border-white/[0.06] text-xs font-medium text-white/50 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all disabled:opacity-50"
          >
            {switching ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ArrowRightLeft className="w-3.5 h-3.5" />
            )}
            {isBuyer ? (
              <>
                <Store className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Seller Mode</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Buyer Mode</span>
              </>
            )}
          </button>
          {!isBuyer && (
            <Link
              to="/seller/create-listing"
              className="h-9 px-4 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5"
            >
              + New Listing
            </Link>
          )}
          {isBuyer && (
            <Link
              to="/marketplace"
              className="h-9 px-4 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5"
            >
              Browse Market
            </Link>
          )}
        </div>
      </div>

      {/* Welcome heading */}
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {displayName ? (
            <>
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {displayName}
              </span>
            </>
          ) : (
            <>
              Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {isBuyer ? "Buyer" : "Seller"}
              </span>{" "}
              Dashboard
            </>
          )}
        </h1>
        <p className="text-sm text-white/35 mt-2">
          {isBuyer
            ? "Track your bids, watchlist, and purchase history."
            : "Manage your listings, track sales, and grow your store."}
        </p>
      </div>
    </div>
  );
}
