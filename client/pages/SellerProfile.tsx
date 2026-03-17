import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getProductImage } from "@/data/productImages";
import {
  ShieldCheck,
  Star,
  Truck,
  TrendingUp,
  Gavel,
  Clock,
  Eye,
  MapPin,
  Calendar,
  MessageCircle,
  Award,
  Package,
} from "lucide-react";
import { useState } from "react";

const sellerData = {
  name: "PokéVault",
  avatar: "PV",
  rating: 4.9,
  reviews: 142,
  verified: true,
  joined: "Mar 2023",
  location: "Los Angeles, CA",
  responseTime: "< 2 hours",
  completedTx: 387,
  categories: ["Pokémon", "Trading Cards", "Limited Editions"],
  badges: [
    { name: "Verified Seller", icon: ShieldCheck, color: "text-blue-400", bg: "bg-blue-500/10" },
    { name: "Fast Shipper", icon: Truck, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { name: "Top Rated", icon: Star, color: "text-amber-400", bg: "bg-amber-500/10" },
    { name: "High Volume", icon: TrendingUp, color: "text-violet-400", bg: "bg-violet-500/10" },
    { name: "Auction Pro", icon: Gavel, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  ],
};

const activeListings = [
  { id: 1, title: "Charizard Base Set Holo 1st Edition", price: "$12,500", isAuction: true, timeLeft: "2h 14m", watchers: 47, gradient: "from-orange-500/20 to-red-500/10" },
  { id: 10, title: "Sealed Booster Box — Fossil Set", price: "$9,800", isAuction: true, timeLeft: "3h 22m", watchers: 89, gradient: "from-amber-500/20 to-orange-500/10" },
  { id: 11, title: "Holographic Dragonite — Team Rocket", price: "$1,800", isAuction: false, timeLeft: null, watchers: 27, gradient: "from-indigo-500/20 to-violet-500/10" },
  { id: 7, title: "Pikachu Illustrator Promo Card", price: "$45,000", isAuction: true, timeLeft: "22h 10m", watchers: 203, gradient: "from-yellow-500/20 to-amber-500/10" },
];

const reviews = [
  { name: "Alex R.", rating: 5, date: "2 days ago", text: "Amazing seller! Card was exactly as described, shipping was lightning fast. Will definitely buy again." },
  { name: "Jamie L.", rating: 5, date: "1 week ago", text: "Best packaging I've ever received for a high-value card. PokéVault takes protection seriously." },
  { name: "Chris M.", rating: 4, date: "2 weeks ago", text: "Great card, smooth transaction. Minor delay in shipping but communication was excellent." },
  { name: "Taylor S.", rating: 5, date: "3 weeks ago", text: "Purchased a rare sealed booster box. Authentic, mint condition, and arrived safely. Highly recommend!" },
];

export default function SellerProfile() {
  const [tab, setTab] = useState<"listings" | "reviews">("listings");

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Profile Header */}
        <div className="glass-strong rounded-2xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-600/20">
              {sellerData.avatar}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2.5 mb-2">
                <h1 className="font-display text-2xl font-bold text-white">{sellerData.name}</h1>
                {sellerData.verified && (
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-semibold">Verified</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/40">
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-white font-semibold">{sellerData.rating}</span>
                  <span>({sellerData.reviews} reviews)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {sellerData.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined {sellerData.joined}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Responds {sellerData.responseTime}
                </span>
              </div>
            </div>

            <button className="glass px-5 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Contact Seller
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/[0.06]">
            {sellerData.badges.map((badge) => (
              <div
                key={badge.name}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${badge.bg}`}
              >
                <badge.icon className={`w-3.5 h-3.5 ${badge.color}`} />
                <span className={`text-xs font-medium ${badge.color}`}>{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Completed Sales", value: sellerData.completedTx.toLocaleString(), icon: Package },
            { label: "Average Rating", value: sellerData.rating.toString(), icon: Star },
            { label: "Active Listings", value: activeListings.length.toString(), icon: Award },
            { label: "Response Time", value: sellerData.responseTime, icon: Clock },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <stat.icon className="w-5 h-5 text-white/20 mx-auto mb-2" />
              <p className="font-display text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/35 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs text-white/30">Sells in:</span>
          {sellerData.categories.map((cat) => (
            <Link
              key={cat}
              to={`/marketplace?category=${encodeURIComponent(cat)}`}
              className="text-xs font-medium px-3 py-1 rounded-full bg-white/[0.05] text-white/50 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-white/[0.06] mb-6">
          <button
            onClick={() => setTab("listings")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === "listings" ? "text-white border-blue-500" : "text-white/40 border-transparent hover:text-white/60"
            }`}
          >
            Active Listings ({activeListings.length})
          </button>
          <button
            onClick={() => setTab("reviews")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === "reviews" ? "text-white border-blue-500" : "text-white/40 border-transparent hover:text-white/60"
            }`}
          >
            Reviews ({sellerData.reviews})
          </button>
        </div>

        {tab === "listings" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeListings.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group glass rounded-2xl overflow-hidden card-hover"
              >
                <div className={`relative h-40 bg-gradient-to-br ${item.gradient} overflow-hidden`}>
                  <img src={getProductImage(item.id)} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-3 left-3">
                    {item.isAuction ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/90 text-white backdrop-blur-sm">
                        <Clock className="w-3 h-3" />
                        {item.timeLeft}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/90 text-white backdrop-blur-sm">BUY NOW</span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] text-white/70 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    <Eye className="w-3 h-3" />
                    {item.watchers}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-base font-bold text-white">{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl">
            {reviews.map((review) => (
              <div key={review.name} className="glass rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{review.name}</p>
                      <p className="text-[10px] text-white/30">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
