import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getProductImage } from "@/data/productImages";
import {
  Gavel,
  Clock,
  Eye,
  Heart,
  Shield,
  Flame,
  Users,
  ChevronDown,
  Search,
} from "lucide-react";

const liveAuctions = [
  { id: 1, title: "Pokémon Graded Card Collection — PSA 10", category: "Trading Cards", currentBid: "$8,500", bids: 23, timeLeft: "2h 14m", watchers: 47, condition: "PSA 10", seller: "PokéVault", verified: true, gradient: "from-orange-500/20 to-red-500/10", hot: true },
  { id: 4, title: "Antique Gold Pocket Watch — Victorian Era", category: "Vintage", currentBid: "$12,800", bids: 45, timeLeft: "12h 05m", watchers: 134, condition: "Excellent", seller: "TimelessVault", verified: true, gradient: "from-amber-500/20 to-yellow-500/10", hot: true },
  { id: 6, title: "Vintage Vinyl Record Crate — 25 Albums", category: "Vintage", currentBid: "$1,400", bids: 19, timeLeft: "1h 45m", watchers: 56, condition: "Good", seller: "WaxVault", verified: true, gradient: "from-emerald-500/20 to-teal-500/10", hot: false },
  { id: 3, title: "Nintendo Game Boy Color — Cherry Red", category: "Retro Games", currentBid: "$420", bids: 8, timeLeft: "5h 32m", watchers: 18, condition: "Excellent", seller: "RetroRealm", verified: true, gradient: "from-violet-500/20 to-purple-500/10", hot: false },
  { id: 7, title: "Pikachu Collector's Edition Figurine — Sealed", category: "Limited Editions", currentBid: "$2,900", bids: 67, timeLeft: "22h 10m", watchers: 203, condition: "Mint", seller: "PokéVault", verified: true, gradient: "from-yellow-500/20 to-amber-500/10", hot: true },
  { id: 10, title: "Rare Antique Coin Collection — Gold & Silver", category: "Vintage", currentBid: "$18,500", bids: 31, timeLeft: "3h 22m", watchers: 89, condition: "Excellent", seller: "TimelessVault", verified: true, gradient: "from-amber-500/20 to-orange-500/10", hot: false },
  { id: 12, title: "Star Wars Clone Trooper Figure Set — Mint", category: "Limited Editions", currentBid: "$2,100", bids: 14, timeLeft: "8h 15m", watchers: 62, condition: "Near Mint", seller: "FigureHQ", verified: true, gradient: "from-rose-500/20 to-pink-500/10", hot: false },
  { id: 13, title: "Luxury Vintage Chronograph Watch — 1960s", category: "Vintage", currentBid: "$28,900", bids: 52, timeLeft: "18h 30m", watchers: 312, condition: "Excellent", seller: "TimelessVault", verified: true, gradient: "from-gray-500/20 to-slate-500/10", hot: true },
];

const endingSoon = liveAuctions
  .filter((a) => parseFloat(a.timeLeft) < 6)
  .sort((a, b) => parseFloat(a.timeLeft) - parseFloat(b.timeLeft));

const sortOptions = ["Ending Soon", "Most Bids", "Highest Bid", "Most Watchers", "Newest"];

export default function Auctions() {
  const [sort, setSort] = useState("Ending Soon");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = liveAuctions.filter(
    (a) => !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 mb-3">
            <Gavel className="w-4 h-4" />
            Live Auctions
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            Auction House
          </h1>
          <p className="text-white/45">
            {liveAuctions.length} live auctions from verified sellers. Bid with confidence.
          </p>
        </div>

        {/* Ending Soon Banner */}
        {endingSoon.length > 0 && (
          <div className="glass-strong rounded-2xl p-5 mb-8 border border-orange-500/15">
            <div className="flex items-center gap-2 text-sm font-semibold text-orange-400 mb-4">
              <Flame className="w-4 h-4" />
              Ending Soon — Don't Miss Out
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {endingSoon.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors group"
                >
                  <div className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${item.gradient} overflow-hidden group-hover:scale-105 transition-transform`}>
                    <img src={getProductImage(item.id)} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-white">{item.currentBid}</span>
                      <span className="text-[10px] text-orange-400 font-bold flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {item.timeLeft}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <input
              type="text"
              placeholder="Search auctions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl glass text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
            />
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 pl-4 pr-8 rounded-xl glass text-sm text-white/60 bg-transparent appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              {sortOptions.map((s) => (
                <option key={s} value={s} className="bg-[hsl(228,15%,12%)] text-white">{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
          </div>
        </div>

        {/* Auction Grid */}
        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <Gavel className="w-8 h-8 text-white/15 mx-auto mb-3" />
            <h3 className="font-display text-lg font-semibold text-white mb-2">No auctions found</h3>
            <p className="text-sm text-white/40">Try a different search term.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group glass rounded-2xl overflow-hidden card-hover relative"
              >
                {item.hot && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/90 text-white backdrop-blur-sm">
                    <Flame className="w-3 h-3" />
                    HOT
                  </div>
                )}

                <div className={`relative h-44 bg-gradient-to-br ${item.gradient} overflow-hidden`}>
                  <img
                    src={getProductImage(item.id)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute ${item.hot ? "top-3 right-3" : "top-3 left-3"}`}>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/90 text-white backdrop-blur-sm">
                      <Clock className="w-3 h-3" />
                      {item.timeLeft}
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-rose-400 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] text-white/60 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <Gavel className="w-3 h-3" />
                      {item.bids} bids
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-white/60 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <Eye className="w-3 h-3" />
                      {item.watchers}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-white/30">{item.condition}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Current Bid</p>
                      <p className="text-base font-bold text-white">{item.currentBid}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.verified && <Shield className="w-3.5 h-3.5 text-blue-400" />}
                      <span className="text-xs text-white/40">{item.seller}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
