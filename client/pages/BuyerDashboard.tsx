import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useState } from "react";
import { getProductImage } from "@/data/productImages";
import {
  Eye,
  Heart,
  ShoppingBag,
  Clock,
  Bell,
  ShieldCheck,
  Gavel,
  Package,
  Star,
  TrendingUp,
  MessageCircle,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const overviewCards = [
  { label: "Active Bids", value: "5", icon: Gavel, color: "text-violet-400", bg: "bg-violet-500/10", trend: "+2 this week" },
  { label: "Watchlist", value: "12", icon: Heart, color: "text-rose-400", bg: "bg-rose-500/10", trend: "3 ending soon" },
  { label: "Purchases", value: "23", icon: ShoppingBag, color: "text-emerald-400", bg: "bg-emerald-500/10", trend: "$4,820 total" },
  { label: "Saved Items", value: "8", icon: Star, color: "text-amber-400", bg: "bg-amber-500/10", trend: "2 price drops" },
];

const activeBids = [
  { id: 1, title: "Pokémon Graded Card Collection — PSA 10", yourBid: "$8,500", currentBid: "$8,750", timeLeft: "2h 14m", status: "outbid", gradient: "from-orange-500/20 to-red-500/10" },
  { id: 4, title: "Antique Gold Pocket Watch — Victorian Era", yourBid: "$12,800", currentBid: "$12,800", timeLeft: "12h 05m", status: "winning", gradient: "from-amber-500/20 to-yellow-500/10" },
  { id: 6, title: "Vintage Vinyl Record Crate — 25 Albums", yourBid: "$1,400", currentBid: "$1,500", timeLeft: "1h 45m", status: "outbid", gradient: "from-emerald-500/20 to-teal-500/10" },
  { id: 3, title: "Nintendo Game Boy Color — Cherry Red", yourBid: "$420", currentBid: "$420", timeLeft: "5h 32m", status: "winning", gradient: "from-violet-500/20 to-purple-500/10" },
  { id: 10, title: "Rare Antique Coin Collection — Gold & Silver", yourBid: "$18,000", currentBid: "$18,500", timeLeft: "3h 22m", status: "outbid", gradient: "from-amber-500/20 to-orange-500/10" },
];

const watchlist = [
  { id: 7, title: "Pikachu Collector's Edition Figurine", price: "$2,900", isAuction: true, timeLeft: "22h 10m", gradient: "from-yellow-500/20 to-amber-500/10" },
  { id: 2, title: "Vintage Marvel Comic Book Lot — 12 Issues", price: "$3,200", isAuction: false, timeLeft: null, gradient: "from-red-500/20 to-rose-500/10" },
  { id: 12, title: "Star Wars Clone Trooper Figure Set", price: "$2,100", isAuction: true, timeLeft: "8h 15m", gradient: "from-rose-500/20 to-pink-500/10" },
];

const purchaseHistory = [
  { id: 101, title: "Blastoise Base Set Holo", price: "$2,400", date: "Dec 12, 2024", status: "Delivered", seller: "PokéVault" },
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
  { id: 5, title: "Limited Edition Cyberpunk Figure", price: "$750", gradient: "from-cyan-500/20 to-blue-500/10" },
  { id: 11, title: "Holographic Dragonite", price: "$1,800", gradient: "from-indigo-500/20 to-violet-500/10" },
  { id: 9, title: "SNES Console CIB", price: "$620", gradient: "from-gray-500/20 to-slate-500/10" },
];

type DashTab = "overview" | "bids" | "watchlist" | "history";

export default function BuyerDashboard() {
  const [tab, setTab] = useState<DashTab>("overview");

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">Dashboard</h1>
            <p className="text-sm text-white/40">Welcome back, collector. Here's your activity overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">Account Verified</span>
            </div>
            <Link
              to="/marketplace"
              className="text-sm font-medium px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-white/[0.06] mb-8 overflow-x-auto">
          {([
            { key: "overview", label: "Overview" },
            { key: "bids", label: `Active Bids (${activeBids.length})` },
            { key: "watchlist", label: `Watchlist (${watchlist.length})` },
            { key: "history", label: "Purchase History" },
          ] as { key: DashTab; label: string }[]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                tab === t.key ? "text-white border-blue-500" : "text-white/40 border-transparent hover:text-white/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && <OverviewTab />}
        {tab === "bids" && <BidsTab />}
        {tab === "watchlist" && <WatchlistTab />}
        {tab === "history" && <HistoryTab />}
      </div>
    </Layout>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewCards.map((card) => (
          <div key={card.label} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
            <p className="font-display text-2xl font-bold text-white">{card.value}</p>
            <p className="text-xs text-white/35 mt-0.5">{card.label}</p>
            <p className="text-[10px] text-white/25 mt-1">{card.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Bids Preview */}
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white flex items-center gap-2">
              <Gavel className="w-4 h-4 text-violet-400" />
              Active Bids
            </h3>
            <span className="text-xs text-white/30">{activeBids.length} active</span>
          </div>
          <div className="space-y-3">
            {activeBids.slice(0, 3).map((bid) => (
              <Link
                key={bid.id}
                to={`/product/${bid.id}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <div className={`w-11 h-11 shrink-0 rounded-lg bg-gradient-to-br ${bid.gradient} overflow-hidden`}>
                  <img src={getProductImage(bid.id)} alt={bid.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{bid.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-white/30">Your bid: {bid.yourBid}</span>
                    <span className="text-xs text-white/20">·</span>
                    <span className="flex items-center gap-1 text-xs text-white/30">
                      <Clock className="w-3 h-3" />
                      {bid.timeLeft}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    bid.status === "winning" ? "bg-emerald-500/20 text-emerald-400" : "bg-orange-500/20 text-orange-400"
                  }`}>
                    {bid.status === "winning" ? "WINNING" : "OUTBID"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-400" />
              Notifications
            </h3>
          </div>
          <div className="space-y-3">
            {notifications.map((notif, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.02]">
                <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center mt-0.5 ${
                  notif.type === "alert" ? "bg-orange-500/15 text-orange-400" :
                  notif.type === "success" ? "bg-emerald-500/15 text-emerald-400" :
                  "bg-blue-500/15 text-blue-400"
                }`}>
                  {notif.type === "alert" ? <AlertCircle className="w-3 h-3" /> :
                   notif.type === "success" ? <CheckCircle2 className="w-3 h-3" /> :
                   <Bell className="w-3 h-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/55 leading-relaxed">{notif.text}</p>
                  <p className="text-[10px] text-white/20 mt-0.5">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Recommended for You
          </h3>
          <Link to="/marketplace" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendations.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="group glass rounded-xl p-4 flex items-center gap-3 card-hover"
            >
              <div className={`w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br ${item.gradient} overflow-hidden group-hover:scale-105 transition-transform`}>
                <img src={getProductImage(item.id)} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">{item.title}</p>
                <p className="text-sm font-bold text-white/60 mt-0.5">{item.price}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-white/15 shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function BidsTab() {
  return (
    <div className="space-y-3">
      {activeBids.map((bid) => (
        <Link
          key={bid.id}
          to={`/product/${bid.id}`}
          className="flex items-center gap-4 glass rounded-xl p-4 card-hover"
        >
          <div className={`w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br ${bid.gradient} overflow-hidden`}>
            <img src={getProductImage(bid.id)} alt={bid.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{bid.title}</p>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-white/35">
              <span>Your Bid: <span className="text-white/60 font-medium">{bid.yourBid}</span></span>
              <span>Current: <span className="text-white/60 font-medium">{bid.currentBid}</span></span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{bid.timeLeft}</span>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
            bid.status === "winning" ? "bg-emerald-500/20 text-emerald-400" : "bg-orange-500/20 text-orange-400"
          }`}>
            {bid.status === "winning" ? "WINNING" : "OUTBID"}
          </span>
        </Link>
      ))}
    </div>
  );
}

function WatchlistTab() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {watchlist.map((item) => (
        <Link
          key={item.id}
          to={`/product/${item.id}`}
          className="group glass rounded-2xl overflow-hidden card-hover"
        >
          <div className={`relative h-40 bg-gradient-to-br ${item.gradient} overflow-hidden`}>
            <img src={getProductImage(item.id)} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            {item.isAuction && item.timeLeft && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/90 text-white backdrop-blur-sm">
                <Clock className="w-3 h-3" />
                {item.timeLeft}
              </span>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">{item.title}</h3>
            <p className="text-base font-bold text-white">{item.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function HistoryTab() {
  return (
    <div className="space-y-3">
      {purchaseHistory.map((order) => (
        <div key={order.id} className="glass rounded-xl p-4 flex items-center gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-white/[0.04] flex items-center justify-center">
            <Package className="w-5 h-5 text-white/25" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{order.title}</p>
            <div className="flex flex-wrap items-center gap-3 mt-0.5 text-xs text-white/35">
              <span>{order.date}</span>
              <span>Seller: {order.seller}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-bold text-white">{order.price}</p>
            <span className={`text-[10px] font-semibold ${
              order.status === "Delivered" ? "text-emerald-400" : "text-blue-400"
            }`}>
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
