import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useState } from "react";
import { getProductImage } from "@/data/productImages";
import {
  DollarSign,
  Package,
  TrendingUp,
  Gavel,
  Star,
  Clock,
  Eye,
  PlusCircle,
  ShieldCheck,
  Award,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
} from "lucide-react";

const stats = [
  { label: "Total Earnings", value: "$24,680", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10", change: "+12.4%", up: true },
  { label: "Active Listings", value: "14", icon: Package, color: "text-blue-400", bg: "bg-blue-500/10", change: "+3", up: true },
  { label: "Live Auctions", value: "6", icon: Gavel, color: "text-violet-400", bg: "bg-violet-500/10", change: "2 ending soon", up: true },
  { label: "Avg. Rating", value: "4.9", icon: Star, color: "text-amber-400", bg: "bg-amber-500/10", change: "+0.1", up: true },
];

const activeListings = [
  { id: 1, title: "Charizard Base Set Holo 1st Edition", price: "$12,500", views: 1240, watchers: 47, status: "auction", timeLeft: "2h 14m" },
  { id: 10, title: "Sealed Booster Box — Fossil Set", price: "$9,800", views: 890, watchers: 89, status: "auction", timeLeft: "3h 22m" },
  { id: 11, title: "Holographic Dragonite", price: "$1,800", views: 340, watchers: 27, status: "fixed", timeLeft: null },
  { id: 7, title: "Pikachu Illustrator Promo Card", price: "$45,000", views: 3200, watchers: 203, status: "auction", timeLeft: "22h 10m" },
  { id: 12, title: "Signed Stan Lee Funko Pop", price: "$2,100", views: 560, watchers: 62, status: "auction", timeLeft: "8h 15m" },
];

const pendingDeliveries = [
  { id: 201, title: "Venusaur Base Set Holo", buyer: "Alex R.", date: "Dec 18, 2024", price: "$890", status: "Ship Now" },
  { id: 202, title: "MTG Dual Land — Underground Sea", buyer: "Jamie L.", date: "Dec 17, 2024", price: "$3,200", status: "Shipped" },
];

const recentReviews = [
  { name: "Chris M.", rating: 5, text: "Perfect packaging, fast shipping. Exactly as described!" },
  { name: "Taylor S.", rating: 4, text: "Great item. Communication could be slightly faster." },
];

const badgeProgress = [
  { name: "Verified Seller", earned: true, icon: ShieldCheck, color: "text-blue-400" },
  { name: "Fast Shipper", earned: true, icon: Clock, color: "text-emerald-400" },
  { name: "Top Rated", earned: true, icon: Star, color: "text-amber-400" },
  { name: "High Volume", earned: false, progress: "87/100 sales", icon: TrendingUp, color: "text-violet-400" },
  { name: "Auction Pro", earned: false, progress: "42/50 auctions", icon: Gavel, color: "text-cyan-400" },
];

type SellerTab = "overview" | "listings" | "orders" | "reviews";

export default function SellerDashboard() {
  const [tab, setTab] = useState<SellerTab>("overview");

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">Seller Dashboard</h1>
            <p className="text-sm text-white/40">Manage your listings, auctions, and earnings.</p>
          </div>
          <Link
            to="/seller/create-listing"
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Create Listing
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-white/[0.06] mb-8 overflow-x-auto">
          {([
            { key: "overview", label: "Overview" },
            { key: "listings", label: `Listings (${activeListings.length})` },
            { key: "orders", label: `Orders (${pendingDeliveries.length})` },
            { key: "reviews", label: "Reviews" },
          ] as { key: SellerTab; label: string }[]).map((t) => (
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

        {tab === "overview" && <SellerOverview />}
        {tab === "listings" && <ListingsTab />}
        {tab === "orders" && <OrdersTab />}
        {tab === "reviews" && <ReviewsTab />}
      </div>
    </Layout>
  );
}

function SellerOverview() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/35 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Listings */}
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-400" />
              Active Listings
            </h3>
            <Link to="/seller/create-listing" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
              + New Listing
            </Link>
          </div>
          <div className="space-y-3">
            {activeListings.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-white/[0.04] overflow-hidden">
                  <img src={getProductImage(item.id)} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{item.title}</p>
                  <div className="flex items-center gap-3 text-xs text-white/30 mt-0.5">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{item.views}</span>
                    <span>{item.watchers} watchers</span>
                    {item.timeLeft && (
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.timeLeft}</span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-white">{item.price}</p>
                  <span className={`text-[10px] font-semibold ${
                    item.status === "auction" ? "text-violet-400" : "text-emerald-400"
                  }`}>
                    {item.status === "auction" ? "Auction" : "Fixed Price"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Badge Progress */}
        <div className="glass rounded-2xl p-5">
          <h3 className="font-display font-semibold text-white flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-amber-400" />
            Badge Progress
          </h3>
          <div className="space-y-3">
            {badgeProgress.map((badge) => (
              <div key={badge.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02]">
                <div className={`w-8 h-8 shrink-0 rounded-lg ${badge.earned ? "bg-white/[0.06]" : "bg-white/[0.03]"} flex items-center justify-center`}>
                  <badge.icon className={`w-4 h-4 ${badge.earned ? badge.color : "text-white/20"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium ${badge.earned ? "text-white" : "text-white/40"}`}>{badge.name}</p>
                  {badge.earned ? (
                    <p className="text-[10px] text-emerald-400">Earned</p>
                  ) : (
                    <p className="text-[10px] text-white/25">{badge.progress}</p>
                  )}
                </div>
                {badge.earned && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Deliveries */}
      <div className="glass rounded-2xl p-5">
        <h3 className="font-display font-semibold text-white flex items-center gap-2 mb-4">
          <AlertCircle className="w-4 h-4 text-orange-400" />
          Pending Deliveries
        </h3>
        {pendingDeliveries.length === 0 ? (
          <p className="text-sm text-white/30">No pending deliveries.</p>
        ) : (
          <div className="space-y-3">
            {pendingDeliveries.map((order) => (
              <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02]">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{order.title}</p>
                  <p className="text-xs text-white/30 mt-0.5">Buyer: {order.buyer} · {order.date}</p>
                </div>
                <p className="text-sm font-bold text-white shrink-0">{order.price}</p>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                  order.status === "Ship Now" ? "bg-orange-500/20 text-orange-400" : "bg-blue-500/20 text-blue-400"
                }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ListingsTab() {
  return (
    <div className="space-y-3">
      {activeListings.map((item) => (
        <div key={item.id} className="glass rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-white/[0.04] overflow-hidden">
            <img src={getProductImage(item.id)} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{item.title}</p>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-white/30">
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{item.views} views</span>
              <span>{item.watchers} watchers</span>
              {item.timeLeft && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.timeLeft}</span>}
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-bold text-white">{item.price}</p>
            <span className={`text-[10px] font-semibold ${item.status === "auction" ? "text-violet-400" : "text-emerald-400"}`}>
              {item.status === "auction" ? "Auction" : "Fixed Price"}
            </span>
          </div>
          <Link
            to={`/product/${item.id}`}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.05] text-white/50 hover:text-white hover:bg-white/[0.08] transition-all shrink-0"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}

function OrdersTab() {
  return (
    <div className="space-y-3">
      {pendingDeliveries.map((order) => (
        <div key={order.id} className="glass rounded-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-white/[0.04] flex items-center justify-center">
            <Package className="w-5 h-5 text-white/25" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">{order.title}</p>
            <p className="text-xs text-white/30 mt-0.5">Buyer: {order.buyer} · Sold on {order.date}</p>
          </div>
          <p className="text-sm font-bold text-white shrink-0">{order.price}</p>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full shrink-0 ${
            order.status === "Ship Now" ? "bg-orange-500/20 text-orange-400" : "bg-blue-500/20 text-blue-400"
          }`}>
            {order.status}
          </span>
        </div>
      ))}
      {pendingDeliveries.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <Package className="w-8 h-8 text-white/15 mx-auto mb-3" />
          <p className="text-sm text-white/40">No orders to display.</p>
        </div>
      )}
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="space-y-4 max-w-2xl">
      {recentReviews.map((review, i) => (
        <div key={i} className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                {review.name[0]}
              </div>
              <p className="text-sm font-medium text-white">{review.name}</p>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: review.rating }).map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">{review.text}</p>
        </div>
      ))}
    </div>
  );
}
