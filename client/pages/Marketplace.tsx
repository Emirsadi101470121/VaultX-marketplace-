import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getProductImage } from "@/data/productImages";
import { useListings, type Listing } from "@/hooks/useListings";
import {
  Search,
  SlidersHorizontal,
  Shield,
  Clock,
  Eye,
  Heart,
  ChevronDown,
  Grid3X3,
  LayoutList,
  X,
} from "lucide-react";

const categories = ["All", "Trading Cards", "Comic Books", "Retro Games", "Limited Editions", "Vintage"];
const conditions = ["All", "Mint", "Near Mint", "Excellent", "Good", "Fair"];
const sortOptions = ["Newest", "Ending Soon", "Price: Low → High", "Price: High → Low", "Most Popular"];

const allListings = [
  { id: 1, title: "Pokémon Graded Card Collection — PSA 10", category: "Trading Cards", price: "$8,500", isAuction: true, timeLeft: "2h 14m", watchers: 47, condition: "PSA 10", seller: "PokéVault", verified: true, gradient: "from-orange-500/20 to-red-500/10" },
  { id: 2, title: "Vintage Marvel Comic Book Lot — 12 Issues", category: "Comic Books", price: "$3,200", isAuction: false, timeLeft: null, watchers: 23, condition: "Near Mint", seller: "ComicKing", verified: true, gradient: "from-red-500/20 to-rose-500/10" },
  { id: 3, title: "Nintendo Game Boy Color — Cherry Red", category: "Retro Games", price: "$420", isAuction: true, timeLeft: "5h 32m", watchers: 18, condition: "Excellent", seller: "RetroRealm", verified: true, gradient: "from-violet-500/20 to-purple-500/10" },
  { id: 4, title: "Antique Gold Pocket Watch — Victorian Era", category: "Vintage", price: "$12,800", isAuction: true, timeLeft: "12h 05m", watchers: 134, condition: "Excellent", seller: "TimelessVault", verified: true, gradient: "from-amber-500/20 to-yellow-500/10" },
  { id: 5, title: "Limited Edition Mech Robot Figure #042", category: "Limited Editions", price: "$750", isAuction: false, timeLeft: null, watchers: 31, condition: "Sealed", seller: "FigureHQ", verified: true, gradient: "from-cyan-500/20 to-blue-500/10" },
  { id: 6, title: "Vintage Vinyl Record Crate — 25 Albums", category: "Vintage", price: "$1,400", isAuction: true, timeLeft: "1h 45m", watchers: 56, condition: "Good", seller: "WaxVault", verified: true, gradient: "from-emerald-500/20 to-teal-500/10" },
  { id: 7, title: "Pikachu Collector's Edition Figurine — Sealed", category: "Limited Editions", price: "$2,900", isAuction: true, timeLeft: "22h 10m", watchers: 203, condition: "Mint", seller: "PokéVault", verified: true, gradient: "from-yellow-500/20 to-amber-500/10" },
  { id: 8, title: "Vintage Hockey Trading Card Lot — PSA 8", category: "Trading Cards", price: "$4,200", isAuction: false, timeLeft: null, watchers: 41, condition: "PSA 8", seller: "CardMasters", verified: true, gradient: "from-blue-500/20 to-sky-500/10" },
  { id: 9, title: "Retro Gaming Controller Bundle — Sony & Sega", category: "Retro Games", price: "$580", isAuction: false, timeLeft: null, watchers: 15, condition: "Good", seller: "RetroRealm", verified: true, gradient: "from-gray-500/20 to-slate-500/10" },
  { id: 10, title: "Rare Antique Coin Collection — Gold & Silver", category: "Vintage", price: "$18,500", isAuction: true, timeLeft: "3h 22m", watchers: 89, condition: "Excellent", seller: "TimelessVault", verified: true, gradient: "from-amber-500/20 to-orange-500/10" },
  { id: 11, title: "Blue Dragon Collector's Statue — Limited Run", category: "Limited Editions", price: "$1,800", isAuction: false, timeLeft: null, watchers: 27, condition: "Mint", seller: "FigureHQ", verified: true, gradient: "from-indigo-500/20 to-violet-500/10" },
  { id: 12, title: "Star Wars Clone Trooper Figure Set — Mint", category: "Limited Editions", price: "$2,100", isAuction: true, timeLeft: "8h 15m", watchers: 62, condition: "Near Mint", seller: "FigureHQ", verified: true, gradient: "from-rose-500/20 to-pink-500/10" },
];

// Helper to format price
function formatPrice(price: number) {
  return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Helper to get time left string from auction end date
function getTimeLeft(endsAt: string | null): string | null {
  if (!endsAt) return null;
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return "Ended";
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

// Gradient map for categories
const categoryGradients: Record<string, string> = {
  "Trading Cards": "from-orange-500/20 to-red-500/10",
  "Comic Books": "from-red-500/20 to-rose-500/10",
  "Retro Games": "from-violet-500/20 to-purple-500/10",
  "Vintage Items": "from-amber-500/20 to-yellow-500/10",
  "Limited Editions": "from-cyan-500/20 to-blue-500/10",
  "Figurines": "from-emerald-500/20 to-teal-500/10",
  "Sports Memorabilia": "from-blue-500/20 to-sky-500/10",
  "Art & Prints": "from-indigo-500/20 to-violet-500/10",
};

// Normalize DB listings to the same shape as mock data
function dbToDisplayItem(item: Listing) {
  return {
    id: item.id,
    title: item.title,
    category: item.category_name,
    price: formatPrice(item.listing_type === "auction" && item.current_bid ? item.current_bid : item.price),
    isAuction: item.listing_type === "auction",
    timeLeft: getTimeLeft(item.auction_ends_at),
    watchers: item.watchers_count,
    condition: item.condition,
    seller: item.seller_display_name || item.seller_username,
    verified: item.seller_verified || item.is_verified,
    gradient: categoryGradients[item.category_name] || "from-gray-500/20 to-slate-500/10",
    imageUrl: item.primary_image_url,
    isFromDb: true as const,
  };
}

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [auctionFilter, setAuctionFilter] = useState<"all" | "auction" | "buynow">("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: dbListings } = useListings();

  // Merge DB listings with mock data (DB takes priority, mock fills in when DB is empty)
  const displayListings = useMemo(() => {
    const dbItems = (dbListings ?? []).map(dbToDisplayItem);
    // If we have real listings, show them. Otherwise fall back to mock data.
    if (dbItems.length > 0) return dbItems;
    return allListings.map((item) => ({ ...item, id: String(item.id), imageUrl: null as string | null, isFromDb: false as const }));
  }, [dbListings]);

  const filtered = displayListings.filter((item) => {
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCategory !== "All" && item.category !== selectedCategory) return false;
    if (auctionFilter === "auction" && !item.isAuction) return false;
    if (auctionFilter === "buynow" && item.isAuction) return false;
    if (verifiedOnly && !item.verified) return false;
    return true;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            Marketplace
          </h1>
          <p className="text-white/45">
            {filtered.length} verified listings from trusted sellers
          </p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30" />
            <input
              type="text"
              placeholder="Search collectibles, cards, games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl glass text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`h-12 px-4 rounded-xl glass text-sm font-medium flex items-center gap-2 transition-all ${
                showFilters ? "text-blue-400 ring-1 ring-blue-500/30" : "text-white/60 hover:text-white"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="h-12 pl-4 pr-8 rounded-xl glass text-sm text-white/60 bg-transparent appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                {sortOptions.map((s) => (
                  <option key={s} value={s} className="bg-[hsl(228,15%,12%)] text-white">
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center glass rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`h-12 px-3 transition-colors ${viewMode === "grid" ? "text-blue-400 bg-white/[0.06]" : "text-white/30 hover:text-white/50"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`h-12 px-3 transition-colors ${viewMode === "list" ? "text-blue-400 bg-white/[0.06]" : "text-white/30 hover:text-white/50"}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="glass rounded-2xl p-5 mb-6">
            <div className="flex flex-wrap gap-6">
              {/* Category */}
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2 block">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white"
                          : "bg-white/[0.05] text-white/50 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2 block">
                  Type
                </label>
                <div className="flex gap-2">
                  {[
                    { key: "all" as const, label: "All" },
                    { key: "auction" as const, label: "Auction" },
                    { key: "buynow" as const, label: "Buy Now" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setAuctionFilter(opt.key)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                        auctionFilter === opt.key
                          ? "bg-blue-600 text-white"
                          : "bg-white/[0.05] text-white/50 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified */}
              <div>
                <label className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2 block">
                  Seller
                </label>
                <button
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    verifiedOnly
                      ? "bg-blue-600 text-white"
                      : "bg-white/[0.05] text-white/50 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <Shield className="w-3 h-3" />
                  Verified Only
                </button>
              </div>
            </div>

            {/* Active filters indicator */}
            {(selectedCategory !== "All" || auctionFilter !== "all" || verifiedOnly) && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                <span className="text-xs text-white/30">Active:</span>
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                    {selectedCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("All")} />
                  </span>
                )}
                {auctionFilter !== "all" && (
                  <span className="inline-flex items-center gap-1 text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">
                    {auctionFilter === "auction" ? "Auction" : "Buy Now"}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setAuctionFilter("all")} />
                  </span>
                )}
                {verifiedOnly && (
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                    Verified
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setVerifiedOnly(false)} />
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <Search className="w-8 h-8 text-white/15 mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-white mb-2">No items found</h3>
            <p className="text-sm text-white/40 mb-4">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setAuctionFilter("all");
                setVerifiedOnly(false);
              }}
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "flex flex-col gap-3"
          }>
            {filtered.map((item) =>
              viewMode === "grid" ? (
                <GridCard key={item.id} item={item} />
              ) : (
                <ListCard key={item.id} item={item} />
              )
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

type DisplayItem = {
  id: string;
  title: string;
  category: string;
  price: string;
  isAuction: boolean;
  timeLeft: string | null;
  watchers: number;
  condition: string;
  seller: string;
  verified: boolean;
  gradient: string;
  imageUrl: string | null;
  isFromDb: boolean;
};

function GridCard({ item }: { item: DisplayItem }) {
  const imgSrc = item.imageUrl || getProductImage(Number(item.id) || 1);
  return (
    <Link
      to={`/product/${item.id}`}
      className="group glass rounded-2xl overflow-hidden card-hover"
    >
      <div className={`relative h-44 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}>
        <img
          src={imgSrc}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {item.isAuction ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/90 text-white backdrop-blur-sm">
              <Clock className="w-3 h-3" />
              {item.timeLeft}
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/90 text-white backdrop-blur-sm">
              BUY NOW
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-rose-400 transition-colors"
        >
          <Heart className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50">
            {item.category}
          </span>
          <span className="text-[10px] font-medium text-white/30">{item.condition}</span>
        </div>
        <h3 className="font-semibold text-sm text-white mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">
              {item.isAuction ? "Current Bid" : "Price"}
            </p>
            <p className="text-base font-bold text-white">{item.price}</p>
          </div>
          <div className="flex items-center gap-1.5">
            {item.verified && <Shield className="w-3.5 h-3.5 text-blue-400" />}
            <span className="text-xs text-white/40">{item.seller}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ListCard({ item }: { item: DisplayItem }) {
  const imgSrc = item.imageUrl || getProductImage(Number(item.id) || 1);
  return (
    <Link
      to={`/product/${item.id}`}
      className="group glass rounded-xl p-4 flex items-center gap-4 card-hover"
    >
      <div className={`w-20 h-20 shrink-0 rounded-xl bg-gradient-to-br ${item.gradient} overflow-hidden`}>
        <img
          src={imgSrc}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50">
            {item.category}
          </span>
          {item.isAuction ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-400">
              <Clock className="w-3 h-3" />
              {item.timeLeft}
            </span>
          ) : (
            <span className="text-[10px] font-bold text-emerald-400">BUY NOW</span>
          )}
        </div>
        <h3 className="font-semibold text-sm text-white truncate group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          {item.verified && <Shield className="w-3 h-3 text-blue-400" />}
          <span className="text-xs text-white/40">{item.seller}</span>
          <span className="text-xs text-white/20">·</span>
          <span className="text-xs text-white/30">{item.condition}</span>
          <span className="text-xs text-white/20">·</span>
          <span className="text-xs text-white/30 flex items-center gap-0.5">
            <Eye className="w-3 h-3" /> {item.watchers}
          </span>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">
          {item.isAuction ? "Current Bid" : "Price"}
        </p>
        <p className="text-lg font-bold text-white">{item.price}</p>
      </div>
      <button
        onClick={(e) => { e.preventDefault(); }}
        className="shrink-0 w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-rose-400 transition-colors"
      >
        <Heart className="w-4 h-4" />
      </button>
    </Link>
  );
}
