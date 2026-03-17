import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  Package,
  Gavel,
  Star,
  Clock,
  Eye,
  PlusCircle,
  ShieldCheck,
  Award,
  CheckCircle2,
  TrendingUp,
  Loader2,
  DollarSign,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import {
  StatCard,
  GlassPanel,
  SectionHeader,
  ActivityTimeline,
  BarChart,
  ProgressRing,
} from "./DashboardWidgets";

interface Listing {
  id: string;
  title: string;
  price: number;
  listing_type: string;
  status: string;
  views_count: number;
  watchers_count: number;
  created_at: string;
  admin_notes: string | null;
  listing_images: { url: string; is_primary: boolean }[];
}

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  pending_review: { label: "Review", color: "text-amber-400", bg: "bg-amber-500/15", dot: "bg-amber-400" },
  approved: { label: "Approved", color: "text-emerald-400", bg: "bg-emerald-500/15", dot: "bg-emerald-400" },
  active: { label: "Active", color: "text-blue-400", bg: "bg-blue-500/15", dot: "bg-blue-400" },
  sold: { label: "Sold", color: "text-violet-400", bg: "bg-violet-500/15", dot: "bg-violet-400" },
  ended: { label: "Ended", color: "text-white/40", bg: "bg-white/[0.06]", dot: "bg-white/30" },
  rejected: { label: "Rejected", color: "text-red-400", bg: "bg-red-500/15", dot: "bg-red-400" },
  flagged: { label: "Flagged", color: "text-orange-400", bg: "bg-orange-500/15", dot: "bg-orange-400" },
  draft: { label: "Draft", color: "text-white/40", bg: "bg-white/[0.06]", dot: "bg-white/30" },
};

type SellerTab = "overview" | "listings" | "reviews";

export default function SellerDashboardContent() {
  const [tab, setTab] = useState<SellerTab>("overview");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    setLoadingListings(true);
    supabase
      .from("listings")
      .select("id, title, price, listing_type, status, views_count, watchers_count, created_at, admin_notes, listing_images(url, is_primary)")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setListings(data || []);
        setLoadingListings(false);
      });
  }, [user]);

  const pendingCount = listings.filter((l) => l.status === "pending_review").length;
  const activeCount = listings.filter((l) => ["approved", "active"].includes(l.status)).length;
  const soldCount = listings.filter((l) => l.status === "sold").length;
  const totalRevenue = listings.filter((l) => l.status === "sold").reduce((sum, l) => sum + l.price, 0);
  const totalViews = listings.reduce((sum, l) => sum + (l.views_count || 0), 0);

  const tabs: { key: SellerTab; label: string; count?: number }[] = [
    { key: "overview", label: "Overview" },
    { key: "listings", label: "My Listings", count: listings.length },
    { key: "reviews", label: "Reviews" },
  ];

  return (
    <>
      {/* Tabs */}
      <div className="flex items-center gap-0.5 p-1 bg-white/[0.03] rounded-xl w-fit mb-8 border border-white/[0.04] overflow-x-auto max-w-full">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-[13px] font-medium rounded-lg whitespace-nowrap transition-all ${
              tab === t.key
                ? "text-white bg-white/[0.1] shadow-sm"
                : "text-white/30 hover:text-white/50"
            }`}
          >
            {t.label}
            {t.count !== undefined && (
              <span className={`ml-1.5 text-[10px] ${tab === t.key ? "text-white/50" : "text-white/20"}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <SellerOverview
          listings={listings}
          loading={loadingListings}
          pendingCount={pendingCount}
          activeCount={activeCount}
          soldCount={soldCount}
          totalRevenue={totalRevenue}
          totalViews={totalViews}
        />
      )}
      {tab === "listings" && <ListingsTab listings={listings} loading={loadingListings} />}
      {tab === "reviews" && <ReviewsTab />}
    </>
  );
}


function getListingImage(listing: Listing): string | null {
  const primary = listing.listing_images?.find((img) => img.is_primary);
  if (primary) return primary.url;
  if (listing.listing_images?.length > 0) return listing.listing_images[0].url;
  return null;
}

function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || { label: status, color: "text-white/40", bg: "bg-white/[0.06]" };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md ${config.bg} ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot || "bg-white/30"}`} />
      {config.label}
    </span>
  );
}

function formatTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}


function SellerOverview({
  listings,
  loading,
  pendingCount,
  activeCount,
  soldCount,
  totalRevenue,
  totalViews,
}: {
  listings: Listing[];
  loading: boolean;
  pendingCount: number;
  activeCount: number;
  soldCount: number;
  totalRevenue: number;
  totalViews: number;
}) {
  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-400",
      change: "+12%",
      changeType: "up" as const,
    },
    {
      label: "Active Listings",
      value: String(activeCount),
      icon: Package,
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-400",
      change: `${listings.length} total`,
      changeType: "neutral" as const,
    },
    {
      label: "Items Sold",
      value: String(soldCount),
      icon: BarChart3,
      iconBg: "bg-violet-500/15",
      iconColor: "text-violet-400",
      change: "+3",
      changeType: "up" as const,
    },
    {
      label: "Total Views",
      value: totalViews.toLocaleString(),
      icon: Eye,
      iconBg: "bg-amber-500/15",
      iconColor: "text-amber-400",
      change: "+24%",
      changeType: "up" as const,
    },
  ];

  const recentActivity = listings.slice(0, 5).map((l) => ({
    id: l.id,
    title:
      l.status === "sold"
        ? `Sold "${l.title}" for $${l.price}`
        : l.status === "pending_review"
        ? `"${l.title}" submitted for review`
        : l.status === "rejected"
        ? `"${l.title}" was rejected`
        : `Listed "${l.title}" at $${l.price}`,
    subtitle: l.listing_type === "auction" ? "Auction" : "Fixed price",
    time: formatTimeAgo(l.created_at),
    dotColor:
      l.status === "sold"
        ? "bg-emerald-400"
        : l.status === "pending_review"
        ? "bg-amber-400"
        : l.status === "rejected"
        ? "bg-red-400"
        : "bg-blue-400",
  }));

  const weeklyData = [8, 22, 15, 30, 18, 35, 26];
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const badges = [
    { name: "Verified Seller", earned: true, icon: ShieldCheck, color: "text-blue-400", ringColor: "hsl(217, 91%, 60%)", progress: 100, max: 100 },
    { name: "Fast Shipper", earned: true, icon: Clock, color: "text-emerald-400", ringColor: "hsl(160, 84%, 39%)", progress: 100, max: 100 },
    { name: "Top Rated", earned: true, icon: Star, color: "text-amber-400", ringColor: "hsl(38, 92%, 50%)", progress: 100, max: 100 },
    { name: "High Volume", earned: false, icon: TrendingUp, color: "text-violet-400", ringColor: "hsl(263, 70%, 50%)", progress: 87, max: 100 },
    { name: "Auction Pro", earned: false, icon: Gavel, color: "text-cyan-400", ringColor: "hsl(188, 78%, 41%)", progress: 42, max: 50 },
  ];

  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Left: listings + chart — 3 cols */}
        <div className="lg:col-span-3 space-y-5">
          {/* Recent Listings */}
          <GlassPanel>
            <SectionHeader
              icon={Package}
              iconColor="text-blue-400"
              title="Recent Listings"
              action={
                <Link
                  to="/seller/create-listing"
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Add New
                </Link>
              }
            />
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-5 h-5 animate-spin text-white/15" />
              </div>
            ) : listings.length === 0 ? (
              <EmptyListings />
            ) : (
              <div className="space-y-1">
                {/* Table header */}
                <div className="hidden sm:grid grid-cols-[1fr_80px_70px_50px] gap-3 px-3 py-2 text-[10px] text-white/20 uppercase tracking-wider font-semibold">
                  <span>Item</span>
                  <span>Status</span>
                  <span className="text-right">Price</span>
                  <span className="text-right">Views</span>
                </div>
                {listings.slice(0, 5).map((listing) => (
                  <ListingRow key={listing.id} listing={listing} />
                ))}
                {listings.length > 5 && (
                  <button
                    onClick={() => {}}
                    className="w-full text-center text-[11px] text-white/25 hover:text-white/40 py-3 transition-colors border-t border-white/[0.04] mt-1"
                  >
                    View all {listings.length} listings
                  </button>
                )}
              </div>
            )}
          </GlassPanel>

          {/* Weekly chart */}
          <GlassPanel>
            <SectionHeader
              icon={BarChart3}
              iconColor="text-violet-400"
              title="Views This Week"
              badge="Last 7 days"
            />
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-8 items-end">
              <BarChart data={weeklyData} labels={dayLabels} color="bg-violet-500" height={90} />
              <div className="text-right pb-2 sm:pb-5">
                <p className="font-display text-2xl font-bold text-white">{totalViews || 154}</p>
                <p className="text-[11px] text-emerald-400 font-medium mt-0.5">+24% vs last week</p>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Right sidebar — 2 cols */}
        <div className="lg:col-span-2 space-y-5">
          {/* Activity */}
          <GlassPanel>
            <SectionHeader
              icon={Clock}
              iconColor="text-white/40"
              title="Activity"
            />
            {recentActivity.length > 0 ? (
              <ActivityTimeline items={recentActivity} />
            ) : (
              <p className="text-[12px] text-white/20 text-center py-8">No recent activity</p>
            )}
          </GlassPanel>

          {/* Achievements */}
          <GlassPanel>
            <SectionHeader
              icon={Award}
              iconColor="text-amber-400"
              title="Achievements"
              badge={`${badges.filter((b) => b.earned).length}/${badges.length}`}
              badgeColor="text-amber-400 bg-amber-500/10"
            />
            <div className="space-y-3">
              {badges.map((badge) => (
                <div key={badge.name} className="flex items-center gap-3">
                  <ProgressRing
                    value={badge.progress}
                    max={badge.max}
                    size={36}
                    strokeWidth={2.5}
                    color={badge.ringColor}
                  >
                    <badge.icon className={`w-3.5 h-3.5 ${badge.earned ? badge.color : "text-white/20"}`} />
                  </ProgressRing>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[12px] font-medium ${badge.earned ? "text-white" : "text-white/35"}`}>
                      {badge.name}
                    </p>
                    <p className="text-[10px] text-white/20">
                      {badge.earned ? "Unlocked" : `${badge.progress}/${badge.max}`}
                    </p>
                  </div>
                  {badge.earned && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/60 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Pending review */}
      {pendingCount > 0 && (
        <GlassPanel>
          <SectionHeader
            icon={Clock}
            iconColor="text-amber-400"
            title="Pending Review"
            badge={String(pendingCount)}
            badgeColor="text-amber-400 bg-amber-500/10"
          />
          <div className="space-y-1">
            {listings
              .filter((l) => l.status === "pending_review")
              .map((listing) => (
                <ListingRow key={listing.id} listing={listing} />
              ))}
          </div>
        </GlassPanel>
      )}
    </div>
  );
}


function EmptyListings() {
  return (
    <div className="text-center py-14">
      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
        <Package className="w-5 h-5 text-white/15" />
      </div>
      <p className="text-[13px] text-white/30 mb-1">No listings yet</p>
      <p className="text-[11px] text-white/15 mb-5">Create your first listing to start selling</p>
      <Link
        to="/seller/create-listing"
        className="inline-flex items-center gap-2 text-[13px] font-semibold h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
      >
        <PlusCircle className="w-4 h-4" /> Create Listing
      </Link>
    </div>
  );
}


function ListingRow({ listing }: { listing: Listing }) {
  const imageUrl = getListingImage(listing);

  return (
    <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_80px_70px_50px] gap-2 sm:gap-3 items-center p-3 rounded-xl hover:bg-white/[0.03] transition-colors group">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 shrink-0 rounded-lg bg-white/[0.04] overflow-hidden border border-white/[0.06]">
          {imageUrl ? (
            <img src={imageUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-4 h-4 text-white/10" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-white truncate group-hover:text-blue-400 transition-colors">
            {listing.title}
          </p>
          <p className="text-[10px] text-white/20 mt-0.5">
            {listing.listing_type === "auction" ? "Auction" : "Fixed"} · {formatTimeAgo(listing.created_at)}
            <span className="sm:hidden"> · ${listing.price.toLocaleString()}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end sm:block">
        <StatusBadge status={listing.status} />
      </div>
      <p className="hidden sm:block text-[13px] font-semibold text-white/60 text-right">
        ${listing.price.toLocaleString()}
      </p>
      <p className="hidden sm:flex text-[12px] text-white/25 text-right items-center justify-end gap-1">
        <Eye className="w-3 h-3" />
        {listing.views_count || 0}
      </p>
    </div>
  );
}


function ListingsTab({ listings, loading }: { listings: Listing[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-5 h-5 animate-spin text-white/15" />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <GlassPanel>
        <EmptyListings />
      </GlassPanel>
    );
  }

  return (
    <GlassPanel>
      <div className="space-y-1">
        <div className="hidden sm:grid grid-cols-[1fr_80px_70px_50px] gap-3 px-3 py-2 text-[10px] text-white/20 uppercase tracking-wider font-semibold">
          <span>Item</span>
          <span>Status</span>
          <span className="text-right">Price</span>
          <span className="text-right">Views</span>
        </div>
        {listings.map((listing) => (
          <ListingRow key={listing.id} listing={listing} />
        ))}
      </div>
    </GlassPanel>
  );
}


function ReviewsTab() {
  const recentReviews = [
    { name: "Chris M.", rating: 5, text: "Perfect packaging, fast shipping. Exactly as described!", date: "2 days ago" },
    { name: "Taylor S.", rating: 4, text: "Great item. Communication could be slightly faster.", date: "1 week ago" },
  ];

  return (
    <div className="space-y-3 max-w-2xl">
      {recentReviews.map((review, i) => (
        <GlassPanel key={i}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/15 border border-white/[0.06] flex items-center justify-center text-[11px] font-bold text-blue-300">
              {review.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[13px] font-medium text-white">{review.name}</p>
                <span className="text-[10px] text-white/20">{review.date}</span>
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3 h-3 ${j < review.rating ? "fill-amber-400 text-amber-400" : "text-white/10"}`}
                  />
                ))}
              </div>
              <p className="text-[13px] text-white/40 leading-relaxed">{review.text}</p>
            </div>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}
