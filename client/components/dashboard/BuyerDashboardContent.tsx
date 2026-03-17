import { Link } from "react-router-dom";
import { useState } from "react";
import { getProductImage } from "@/data/productImages";
import {
  Heart,
  ShoppingBag,
  Clock,
  Bell,
  Gavel,
  Package,
  Star,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import {
  StatCard,
  GlassPanel,
  SectionHeader,
  ActivityTimeline,
  BarChart,
} from "./DashboardWidgets";


const activeBids = [
  { id: 1, title: "Pokemon Graded Card Collection — PSA 10", yourBid: "$8,500", currentBid: "$8,750", timeLeft: "2h 14m", status: "outbid" },
  { id: 4, title: "Antique Gold Pocket Watch — Victorian Era", yourBid: "$12,800", currentBid: "$12,800", timeLeft: "12h 05m", status: "winning" },
  { id: 6, title: "Vintage Vinyl Record Crate — 25 Albums", yourBid: "$1,400", currentBid: "$1,500", timeLeft: "1h 45m", status: "outbid" },
  { id: 3, title: "Nintendo Game Boy Color — Cherry Red", yourBid: "$420", currentBid: "$420", timeLeft: "5h 32m", status: "winning" },
  { id: 10, title: "Rare Antique Coin Collection — Gold & Silver", yourBid: "$18,000", currentBid: "$18,500", timeLeft: "3h 22m", status: "outbid" },
];

const watchlist = [
  { id: 7, title: "Pikachu Collector's Edition Figurine", price: "$2,900", isAuction: true, timeLeft: "22h 10m" },
  { id: 2, title: "Vintage Marvel Comic Book Lot — 12 Issues", price: "$3,200", isAuction: false, timeLeft: null },
  { id: 12, title: "Star Wars Clone Trooper Figure Set", price: "$2,100", isAuction: true, timeLeft: "8h 15m" },
];

const purchaseHistory = [
  { id: 101, title: "Blastoise Base Set Holo", price: "$2,400", date: "Dec 12, 2024", status: "Delivered", seller: "PokeVault" },
  { id: 102, title: "SNES Console CIB", price: "$620", date: "Nov 28, 2024", status: "Delivered", seller: "RetroRealm" },
  { id: 103, title: "X-Men #1 CGC 8.5", price: "$8,500", date: "Nov 15, 2024", status: "In Transit", seller: "MarvelVault" },
];

const notifications = [
  { text: "You've been outbid on Charizard Base Set Holo", time: "5 min ago", type: "alert" },
  { text: "Pikachu Illustrator Promo Card ends in 24 hours", time: "1 hour ago", type: "info" },
  { text: "Your order X-Men #1 has shipped!", time: "3 hours ago", type: "success" },
  { text: "Price drop on Amazing Spider-Man #300", time: "1 day ago", type: "info" },
];

const recommendations = [
  { id: 5, title: "Limited Edition Cyberpunk Figure", price: "$750" },
  { id: 11, title: "Holographic Dragonite", price: "$1,800" },
  { id: 9, title: "SNES Console CIB", price: "$620" },
];

type DashTab = "overview" | "bids" | "watchlist" | "history";

export default function BuyerDashboardContent() {
  const [tab, setTab] = useState<DashTab>("overview");

  const tabs: { key: DashTab; label: string; count?: number }[] = [
    { key: "overview", label: "Overview" },
    { key: "bids", label: "Active Bids", count: activeBids.length },
    { key: "watchlist", label: "Watchlist", count: watchlist.length },
    { key: "history", label: "Purchases" },
  ];

  return (
    <>
      {/* Segmented tabs */}
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

      {tab === "overview" && <OverviewTab />}
      {tab === "bids" && <BidsTab />}
      {tab === "watchlist" && <WatchlistTab />}
      {tab === "history" && <HistoryTab />}
    </>
  );
}


function OverviewTab() {
  const stats = [
    {
      label: "Active Bids",
      value: "5",
      icon: Gavel,
      iconBg: "bg-violet-500/15",
      iconColor: "text-violet-400",
      change: "+2",
      changeType: "up" as const,
    },
    {
      label: "Watchlist",
      value: "12",
      icon: Heart,
      iconBg: "bg-rose-500/15",
      iconColor: "text-rose-400",
      change: "3 ending",
      changeType: "neutral" as const,
    },
    {
      label: "Purchases",
      value: "23",
      icon: ShoppingBag,
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-400",
      change: "+$4.8k",
      changeType: "up" as const,
    },
    {
      label: "Saved Items",
      value: "8",
      icon: Star,
      iconBg: "bg-amber-500/15",
      iconColor: "text-amber-400",
      change: "2 drops",
      changeType: "neutral" as const,
    },
  ];

  const activityItems = notifications.map((n, i) => ({
    id: i,
    title: n.text,
    subtitle: "",
    time: n.time,
    dotColor:
      n.type === "alert"
        ? "bg-orange-400"
        : n.type === "success"
        ? "bg-emerald-400"
        : "bg-blue-400",
  }));

  const spendingData = [18, 32, 24, 45, 28, 52, 38];
  const spendingLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const winningCount = activeBids.filter((b) => b.status === "winning").length;

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Left — 3 cols */}
        <div className="lg:col-span-3 space-y-5">
          {/* Active Bids */}
          <GlassPanel>
            <SectionHeader
              icon={Gavel}
              iconColor="text-violet-400"
              title="Active Bids"
              badge={`${winningCount} winning`}
              badgeColor="text-emerald-400 bg-emerald-500/10"
            />
            <div className="space-y-1">
              {/* Table header */}
              <div className="hidden sm:grid grid-cols-[1fr_90px_80px_70px] gap-3 px-3 py-2 text-[10px] text-white/20 uppercase tracking-wider font-semibold">
                <span>Item</span>
                <span>Your Bid</span>
                <span>Time Left</span>
                <span className="text-right">Status</span>
              </div>
              {activeBids.slice(0, 4).map((bid) => (
                <BidRow key={bid.id} bid={bid} />
              ))}
              {activeBids.length > 4 && (
                <button className="w-full text-center text-[11px] text-white/25 hover:text-white/40 py-3 transition-colors border-t border-white/[0.04] mt-1">
                  View all {activeBids.length} bids
                </button>
              )}
            </div>
          </GlassPanel>

          {/* Spending chart */}
          <GlassPanel>
            <SectionHeader
              icon={TrendingUp}
              iconColor="text-emerald-400"
              title="Spending"
              badge="Last 7 days"
            />
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-8 items-end">
              <BarChart data={spendingData} labels={spendingLabels} color="bg-emerald-500" height={90} />
              <div className="text-right pb-2 sm:pb-5">
                <p className="font-display text-2xl font-bold text-white">$4,820</p>
                <p className="text-[11px] text-emerald-400 font-medium mt-0.5">This month</p>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Right — 2 cols */}
        <div className="lg:col-span-2 space-y-5">
          {/* Notifications */}
          <GlassPanel>
            <SectionHeader
              icon={Bell}
              iconColor="text-blue-400"
              title="Notifications"
              badge={String(notifications.length)}
              badgeColor="text-blue-400 bg-blue-500/10"
            />
            <ActivityTimeline items={activityItems} />
          </GlassPanel>

          {/* Watchlist preview */}
          <GlassPanel>
            <SectionHeader
              icon={Heart}
              iconColor="text-rose-400"
              title="Watchlist"
              action={
                <span className="text-[11px] text-white/20 font-medium">
                  {watchlist.length} items
                </span>
              }
            />
            <div className="space-y-2">
              {watchlist.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors group"
                >
                  <div className="w-9 h-9 shrink-0 rounded-lg overflow-hidden border border-white/[0.06] bg-white/[0.03]">
                    <img
                      src={getProductImage(item.id)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-white/70 truncate group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[12px] font-semibold text-white/40">{item.price}</span>
                      {item.isAuction && item.timeLeft && (
                        <span className="flex items-center gap-0.5 text-[10px] text-violet-400/70">
                          <Clock className="w-2.5 h-2.5" />
                          {item.timeLeft}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-white/10 shrink-0 group-hover:text-white/30 transition-colors" />
                </Link>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-display font-semibold text-[13px] text-white">
              Recommended for You
            </h3>
          </div>
          <Link
            to="/marketplace"
            className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recommendations.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="group rounded-2xl bg-[hsl(228,16%,10%)] border border-white/[0.06] overflow-hidden hover:border-white/[0.1] transition-all duration-300"
            >
              <div className="relative h-36 bg-white/[0.02] overflow-hidden">
                <img
                  src={getProductImage(item.id)}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(228,16%,10%)] via-transparent to-transparent" />
              </div>
              <div className="p-4 -mt-4 relative">
                <p className="text-[13px] font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <p className="text-[14px] font-bold text-white/60">{item.price}</p>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/10 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


function BidRow({ bid }: { bid: (typeof activeBids)[0] }) {
  const isWinning = bid.status === "winning";

  return (
    <Link
      to={`/product/${bid.id}`}
      className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_90px_80px_70px] gap-2 sm:gap-3 items-center p-3 rounded-xl hover:bg-white/[0.03] transition-colors group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 shrink-0 rounded-lg overflow-hidden border border-white/[0.06] bg-white/[0.03]">
          <img src={getProductImage(bid.id)} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-white truncate group-hover:text-blue-400 transition-colors">
            {bid.title}
          </p>
          <div className="flex items-center gap-2 sm:hidden mt-0.5">
            <span className="text-[11px] font-semibold text-white/50">{bid.yourBid}</span>
            <span className="text-[11px] text-white/30 flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{bid.timeLeft}</span>
          </div>
        </div>
      </div>
      <div className="sm:hidden flex items-center justify-end">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
            isWinning
              ? "text-emerald-400 bg-emerald-500/10"
              : "text-orange-400 bg-orange-500/10"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isWinning ? "bg-emerald-400" : "bg-orange-400"}`} />
          {isWinning ? "Win" : "Outbid"}
        </span>
      </div>
      <p className="hidden sm:block text-[13px] font-semibold text-white/50">{bid.yourBid}</p>
      <div className="hidden sm:flex items-center gap-1.5 text-[12px] text-white/30">
        <Clock className="w-3 h-3" />
        {bid.timeLeft}
      </div>
      <div className="hidden sm:block text-right">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
            isWinning
              ? "text-emerald-400 bg-emerald-500/10"
              : "text-orange-400 bg-orange-500/10"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isWinning ? "bg-emerald-400" : "bg-orange-400"}`} />
          {isWinning ? "Win" : "Outbid"}
        </span>
      </div>
    </Link>
  );
}


function BidsTab() {
  return (
    <GlassPanel>
      <div className="space-y-1">
        <div className="hidden sm:grid grid-cols-[1fr_90px_80px_70px] gap-3 px-3 py-2 text-[10px] text-white/20 uppercase tracking-wider font-semibold">
          <span>Item</span>
          <span>Your Bid</span>
          <span>Time Left</span>
          <span className="text-right">Status</span>
        </div>
        {activeBids.map((bid) => (
          <BidRow key={bid.id} bid={bid} />
        ))}
      </div>
    </GlassPanel>
  );
}


function WatchlistTab() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {watchlist.map((item) => (
        <Link
          key={item.id}
          to={`/product/${item.id}`}
          className="group rounded-2xl bg-[hsl(228,16%,10%)] border border-white/[0.06] overflow-hidden hover:border-white/[0.1] transition-all duration-300"
        >
          <div className="relative h-40 bg-white/[0.02] overflow-hidden">
            <img
              src={getProductImage(item.id)}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(228,16%,10%)] via-transparent to-transparent" />
            {item.isAuction && item.timeLeft && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-violet-500/80 text-white backdrop-blur-sm">
                <Clock className="w-3 h-3" />
                {item.timeLeft}
              </span>
            )}
          </div>
          <div className="p-4 -mt-3 relative">
            <h3 className="font-semibold text-[13px] text-white mb-1.5 line-clamp-1 group-hover:text-blue-400 transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-bold text-white/60">{item.price}</p>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/10 group-hover:text-blue-400 transition-colors" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}


function HistoryTab() {
  return (
    <GlassPanel>
      <div className="space-y-1">
        <div className="hidden sm:grid grid-cols-[1fr_90px_80px_80px] gap-3 px-3 py-2 text-[10px] text-white/20 uppercase tracking-wider font-semibold">
          <span>Item</span>
          <span>Date</span>
          <span className="text-right">Price</span>
          <span className="text-right">Status</span>
        </div>
        {purchaseHistory.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_90px_80px_80px] gap-2 sm:gap-3 items-center p-3 rounded-xl hover:bg-white/[0.03] transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 shrink-0 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <Package className="w-4 h-4 text-white/15" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white truncate">{order.title}</p>
                <p className="text-[10px] text-white/20 mt-0.5">by {order.seller} <span className="sm:hidden">· {order.date}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-end sm:hidden">
              <span className="text-[12px] font-semibold text-white/50">{order.price}</span>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  order.status === "Delivered"
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-blue-400 bg-blue-500/10"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${order.status === "Delivered" ? "bg-emerald-400" : "bg-blue-400"}`} />
                {order.status === "Delivered" ? "Delivered" : "Transit"}
              </span>
            </div>
            <p className="hidden sm:block text-[12px] text-white/30">{order.date}</p>
            <p className="hidden sm:block text-[13px] font-semibold text-white/60 text-right">{order.price}</p>
            <div className="hidden sm:block text-right">
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  order.status === "Delivered"
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-blue-400 bg-blue-500/10"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${order.status === "Delivered" ? "bg-emerald-400" : "bg-blue-400"}`} />
                {order.status === "Delivered" ? "Delivered" : "Transit"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
