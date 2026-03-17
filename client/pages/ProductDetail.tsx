import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getProductImage } from "@/data/productImages";
import { useListingById } from "@/hooks/useListings";
import {
  Shield,
  ShieldCheck,
  Clock,
  Eye,
  Heart,
  Star,
  Share2,
  ChevronRight,
  Truck,
  Lock,
  Award,
  MessageCircle,
  ArrowLeft,
  Users,
  Gavel,
  BadgeCheck,
} from "lucide-react";
import { useState, useMemo } from "react";

const productData: Record<string, {
  id: number; title: string; category: string; price: string; isAuction: boolean;
  timeLeft: string | null; watchers: number; condition: string; seller: string;
  verified: boolean; gradient: string; description: string;
  minBid?: string; bids?: number; rating: number; reviews: number;
}> = {
  "1": { id: 1, title: "Pokémon Graded Card Collection — PSA 10", category: "Trading Cards", price: "$8,500", isAuction: true, timeLeft: "2h 14m", watchers: 47, condition: "PSA 10", seller: "PokéVault", verified: true, gradient: "from-orange-500/20 to-red-500/10", description: "A premium collection of Pokémon cards professionally graded PSA 10 Gem Mint. Includes holographic and rare cards in sealed protective cases. Each card has been authenticated and verified for condition. A must-have for any serious Pokémon TCG collector.", minBid: "$8,750", bids: 23, rating: 4.9, reviews: 142 },
  "2": { id: 2, title: "Vintage Marvel Comic Book Lot — 12 Issues", category: "Comic Books", price: "$3,200", isAuction: false, timeLeft: null, watchers: 23, condition: "Near Mint", seller: "ComicKing", verified: true, gradient: "from-red-500/20 to-rose-500/10", description: "A curated lot of 12 vintage Marvel comic books featuring iconic superhero covers. Includes key issues from classic runs in near-mint condition. White pages throughout. Perfect for building a serious Marvel collection.", rating: 4.8, reviews: 89 },
  "3": { id: 3, title: "Nintendo Game Boy Color — Cherry Red", category: "Retro Games", price: "$420", isAuction: true, timeLeft: "5h 32m", watchers: 18, condition: "Excellent", seller: "RetroRealm", verified: true, gradient: "from-violet-500/20 to-purple-500/10", description: "Cherry Red Game Boy Color in excellent working condition. Clean battery contacts, sharp screen, and vibrant shell. Includes original battery cover. Tested with multiple games — works perfectly.", minBid: "$450", bids: 8, rating: 4.7, reviews: 56 },
  "4": { id: 4, title: "Antique Gold Pocket Watch — Victorian Era", category: "Vintage", price: "$12,800", isAuction: true, timeLeft: "12h 05m", watchers: 134, condition: "Excellent", seller: "TimelessVault", verified: true, gradient: "from-amber-500/20 to-yellow-500/10", description: "An exquisite Victorian-era gold pocket watch with Roman numeral dial. Intricate engraving on the case back. Movement has been serviced and keeps accurate time. Comes with original chain and presentation box. A stunning piece of horological history.", minBid: "$13,200", bids: 45, rating: 5.0, reviews: 203 },
  "5": { id: 5, title: "Limited Edition Mech Robot Figure #042", category: "Limited Editions", price: "$750", isAuction: false, timeLeft: null, watchers: 31, condition: "Sealed", seller: "FigureHQ", verified: true, gradient: "from-cyan-500/20 to-blue-500/10", description: "Limited edition mech robot collectible figure #042 of 500. Factory sealed in original packaging with certificate of authenticity. Premium metallic detailing with articulated joints and LED-lit base included.", rating: 4.6, reviews: 34 },
  "6": { id: 6, title: "Vintage Vinyl Record Crate — 25 Albums", category: "Vintage", price: "$1,400", isAuction: true, timeLeft: "1h 45m", watchers: 56, condition: "Good", seller: "WaxVault", verified: true, gradient: "from-emerald-500/20 to-teal-500/10", description: "A curated wooden crate of 25 vintage vinyl records spanning classic rock, jazz, and soul. Includes original sleeves and liner notes. Records have been cleaned and graded. A fantastic starter collection or addition to any vinyl enthusiast's library.", minBid: "$1,500", bids: 19, rating: 4.5, reviews: 28 },
};

const defaultProduct = productData["1"];

const relatedItems = [
  { id: 7, title: "Pikachu Collector's Edition Figurine", price: "$2,900", gradient: "from-yellow-500/20 to-amber-500/10", isAuction: true },
  { id: 10, title: "Rare Antique Coin Collection — Gold & Silver", price: "$18,500", gradient: "from-amber-500/20 to-orange-500/10", isAuction: true },
  { id: 11, title: "Blue Dragon Collector's Statue — Limited Run", price: "$1,800", gradient: "from-indigo-500/20 to-violet-500/10", isAuction: false },
];

function formatPrice(price: number) {
  return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function getTimeLeft(endsAt: string | null): string | null {
  if (!endsAt) return null;
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return "Ended";
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

export default function ProductDetail() {
  const { id } = useParams();
  const { data: dbListing } = useListingById(id);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  // Use DB listing if available, otherwise fall back to mock data
  const product = useMemo(() => {
    if (dbListing) {
      return {
        id: dbListing.id,
        title: dbListing.title,
        category: dbListing.category_name,
        price: formatPrice(dbListing.listing_type === "auction" && dbListing.current_bid ? dbListing.current_bid : dbListing.price),
        isAuction: dbListing.listing_type === "auction",
        timeLeft: getTimeLeft(dbListing.auction_ends_at),
        watchers: dbListing.watchers_count,
        condition: dbListing.condition,
        seller: dbListing.seller_display_name || dbListing.seller_username,
        verified: dbListing.seller_verified || dbListing.is_verified,
        gradient: "from-blue-500/20 to-violet-500/10",
        description: dbListing.description || "No description provided.",
        minBid: dbListing.price ? formatPrice(dbListing.price * 1.03) : undefined,
        bids: dbListing.bid_count,
        rating: 4.8,
        reviews: 0,
        imageUrl: dbListing.primary_image_url,
        isFromDb: true,
      };
    }
    const mock = productData[id || "1"] || defaultProduct;
    return { ...mock, id: String(mock.id), imageUrl: null as string | null, isFromDb: false };
  }, [dbListing, id]);

  const productImage = product.imageUrl || getProductImage(Number(product.id) || 1);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/30 mb-6">
          <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/marketplace" className="hover:text-white/60 transition-colors">Marketplace</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/50 truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-3">
            <div className={`relative rounded-2xl bg-gradient-to-br ${product.gradient} h-72 sm:h-96 lg:h-[480px] flex items-center justify-center glass-strong overflow-hidden`}>
              <img
                src={productImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {product.isAuction ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-violet-500/90 text-white backdrop-blur-sm">
                    <Clock className="w-3.5 h-3.5" />
                    {product.timeLeft} left
                  </span>
                ) : (
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/90 text-white backdrop-blur-sm">
                    BUY NOW
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-rose-400 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Eye className="w-3.5 h-3.5" />
                {product.watchers} watching
              </div>
            </div>

            {/* Tabs: Description / Reviews */}
            <div className="mt-8">
              <div className="flex items-center gap-1 border-b border-white/[0.06] mb-6">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "description"
                      ? "text-white border-blue-500"
                      : "text-white/40 border-transparent hover:text-white/60"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "reviews"
                      ? "text-white border-blue-500"
                      : "text-white/40 border-transparent hover:text-white/60"
                  }`}
                >
                  Reviews ({product.reviews})
                </button>
              </div>

              {activeTab === "description" ? (
                <div className="space-y-6">
                  <p className="text-sm text-white/55 leading-relaxed">{product.description}</p>

                  {/* Transaction Protection */}
                  <div className="glass rounded-xl p-5">
                    <h4 className="font-display font-semibold text-sm text-white mb-3 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-400" />
                      Transaction Protection
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { text: "Funds held in escrow until delivery confirmed", icon: Shield },
                        { text: "Verified seller with identity confirmation", icon: ShieldCheck },
                        { text: "Full refund if item not as described", icon: Lock },
                        { text: "24/7 dispute resolution support", icon: MessageCircle },
                      ].map((item) => (
                        <div key={item.text} className="flex items-start gap-2.5">
                          <item.icon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-white/45">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    { name: "Alex R.", date: "2 days ago", rating: 5, text: "Incredible card, exactly as described. Packaging was excellent and shipping was fast. Highly recommend this seller!" },
                    { name: "Jamie L.", date: "1 week ago", rating: 5, text: "TradeGo's escrow system made me feel confident buying such a high-value item. The seller was communicative and professional." },
                    { name: "Dana K.", date: "2 weeks ago", rating: 4, text: "Great item and smooth transaction. Took a day longer than expected for shipping, but the item was perfect." },
                  ].map((review) => (
                    <div key={review.name} className="glass rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                            {review.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{review.name}</p>
                            <p className="text-[10px] text-white/30">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Purchase Panel */}
          <div className="lg:col-span-2 space-y-5">
            {/* Main Panel */}
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-white/50">
                  {product.category}
                </span>
                <span className="text-xs text-white/30">{product.condition}</span>
              </div>

              <h1 className="font-display text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Price / Bid */}
              <div className="glass rounded-xl p-4 mb-5">
                {product.isAuction ? (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Current Bid</p>
                        <p className="text-2xl font-bold text-white">{product.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Time Left</p>
                        <p className="text-lg font-bold text-violet-400 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {product.timeLeft}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/35 mb-4 pb-3 border-b border-white/[0.06]">
                      <span className="flex items-center gap-1">
                        <Gavel className="w-3 h-3" />
                        {product.bids} bids
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {product.watchers} watchers
                      </span>
                    </div>
                    <div className="mb-3">
                      <label className="text-xs text-white/40 mb-1.5 block">Your Bid (min {product.minBid})</label>
                      <input
                        type="text"
                        placeholder={product.minBid}
                        className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      />
                    </div>
                    <button className="w-full h-12 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-blue-600/20">
                      Place Bid
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Price</p>
                      <p className="text-2xl font-bold text-white">{product.price}</p>
                    </div>
                    <button className="w-full h-12 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-blue-600/20 mb-3">
                      Buy Now
                    </button>
                    <button className="w-full h-12 rounded-xl font-semibold text-sm glass text-white/70 hover:text-white hover:bg-white/[0.08] transition-all">
                      Add to Watchlist
                    </button>
                  </>
                )}
              </div>

              {/* Shipping */}
              <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
                <Truck className="w-4 h-4 text-white/30" />
                <span>Estimated delivery: 3-5 business days</span>
              </div>

              {/* Trust indicators */}
              <div className="space-y-2.5">
                {[
                  { icon: Shield, text: "Protected by TradeGo Escrow", color: "text-blue-400" },
                  { icon: BadgeCheck, text: "Authenticity Verified", color: "text-emerald-400" },
                  { icon: Lock, text: "Secure Payment Processing", color: "text-violet-400" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-xs text-white/45">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seller Card */}
            <div className="glass rounded-2xl p-5">
              <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Seller</h4>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white">
                  {product.seller[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-white">{product.seller}</p>
                    {product.verified && (
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-white/50">{product.rating}</span>
                    </div>
                    <span className="text-xs text-white/25">·</span>
                    <span className="text-xs text-white/35">{product.reviews} reviews</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {["Verified Seller", "Fast Shipper", "Top Rated"].map((badge) => (
                  <span key={badge} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
                    {badge}
                  </span>
                ))}
              </div>

              <Link
                to={`/seller/${product.id}`}
                className="block text-center w-full h-10 rounded-xl text-xs font-medium glass text-white/50 hover:text-white hover:bg-white/[0.08] transition-all leading-10"
              >
                View Seller Profile
              </Link>
            </div>

            {/* Related Items */}
            <div>
              <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">You May Also Like</h4>
              <div className="space-y-3">
                {relatedItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="flex items-center gap-3 glass rounded-xl p-3 card-hover"
                  >
                    <div className={`w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br ${item.gradient} overflow-hidden`}>
                      <img
                        src={getProductImage(item.id)}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{item.title}</p>
                      <p className="text-xs text-white/35 mt-0.5">
                        {item.isAuction ? "Auction" : "Buy Now"}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-white shrink-0">{item.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
