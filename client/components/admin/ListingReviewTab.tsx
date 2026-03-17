import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Package,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Loader2,
  AlertTriangle,
} from "lucide-react";

interface ListingImage {
  id: string;
  url: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
}

interface ListingForReview {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  price: number;
  listing_type: string;
  status: string;
  created_at: string;
  seller_id: string;
  listing_images: ListingImage[];
  profiles: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

export default function ListingReviewTab() {
  const { user } = useAuth();
  const [listings, setListings] = useState<ListingForReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending_review" | "approved" | "rejected" | "all">("pending_review");

  useEffect(() => {
    fetchListings();
  }, [filter]);

  async function fetchListings() {
    setLoading(true);
    let query = supabase
      .from("listings")
      .select("*, listing_images(*), profiles!listings_seller_id_fkey(username, display_name, avatar_url)")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    } else {
      query = query.in("status", ["pending_review", "approved", "rejected"]);
    }

    const { data, error } = await query;

    if (!error && data) {
      setListings(data as ListingForReview[]);
    }
    setLoading(false);
  }

  async function handleApprove(listingId: string) {
    if (!user) return;
    setActionLoading(listingId);

    const { error } = await supabase
      .from("listings")
      .update({
        status: "approved",
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
        admin_notes: null,
      })
      .eq("id", listingId);

    if (!error) {
      setListings((prev) => prev.filter((l) => l.id !== listingId));
    }
    setActionLoading(null);
  }

  async function handleReject(listingId: string) {
    if (!user || !rejectNote.trim()) return;
    setActionLoading(listingId);

    const { error } = await supabase
      .from("listings")
      .update({
        status: "rejected",
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
        admin_notes: rejectNote.trim(),
      })
      .eq("id", listingId);

    if (!error) {
      setListings((prev) => prev.filter((l) => l.id !== listingId));
      setRejectingId(null);
      setRejectNote("");
    }
    setActionLoading(null);
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  const pendingCount = listings.filter((l) => l.status === "pending_review").length;

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex items-center gap-2">
        {(
          [
            { key: "pending_review", label: "Pending Review" },
            { key: "approved", label: "Approved" },
            { key: "rejected", label: "Rejected" },
            { key: "all", label: "All" },
          ] as const
        ).map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
              filter === f.key
                ? "bg-blue-500/20 text-blue-400"
                : "bg-white/[0.05] text-white/40 hover:text-white/60 hover:bg-white/[0.08]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="glass rounded-2xl p-12 text-center">
          <Loader2 className="w-6 h-6 text-white/20 mx-auto animate-spin" />
          <p className="text-sm text-white/30 mt-3">Loading listings...</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-400/30 mx-auto mb-3" />
          <p className="text-sm text-white/40">
            {filter === "pending_review"
              ? "No listings pending review. All caught up!"
              : `No ${filter === "all" ? "" : filter.replace("_", " ")} listings found.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((listing) => {
            const isExpanded = expandedId === listing.id;
            const isRejecting = rejectingId === listing.id;
            const isActioning = actionLoading === listing.id;
            const primaryImage = listing.listing_images?.find((i) => i.is_primary) || listing.listing_images?.[0];

            return (
              <div key={listing.id} className="glass rounded-xl overflow-hidden">
                {/* Main Row */}
                <div className="p-4 flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-white/[0.04]">
                    {primaryImage ? (
                      <img
                        src={primaryImage.url}
                        alt={primaryImage.alt_text}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-white/15" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-white truncate">{listing.title}</p>
                      <StatusBadge status={listing.status} />
                    </div>
                    <p className="text-xs text-white/30">
                      by {listing.profiles?.display_name || listing.profiles?.username || "Unknown"} ·{" "}
                      {listing.category} · {listing.condition} · {formatDate(listing.created_at)}
                    </p>
                    <p className="text-xs font-semibold text-white/60 mt-0.5">${listing.price.toFixed(2)}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : listing.id)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.05] text-white/40 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      {isExpanded ? "Hide" : "Details"}
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {listing.status === "pending_review" && (
                      <>
                        <button
                          onClick={() => handleApprove(listing.id)}
                          disabled={isActioning}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-all disabled:opacity-50"
                        >
                          {isActioning ? <Loader2 className="w-3 h-3 animate-spin" /> : "Approve"}
                        </button>
                        <button
                          onClick={() => setRejectingId(isRejecting ? null : listing.id)}
                          disabled={isActioning}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-all disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-white/[0.04]">
                    <div className="pt-4 space-y-4">
                      {/* Description */}
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-white/20 mb-1">Description</p>
                        <p className="text-sm text-white/60 leading-relaxed">
                          {listing.description || "No description provided."}
                        </p>
                      </div>

                      {/* Images Grid */}
                      {listing.listing_images?.length > 0 && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-white/20 mb-2">
                            Photos ({listing.listing_images.length})
                          </p>
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                            {listing.listing_images
                              .sort((a, b) => a.sort_order - b.sort_order)
                              .map((img) => (
                                <a
                                  key={img.id}
                                  href={img.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="aspect-square rounded-lg overflow-hidden bg-white/[0.04] hover:ring-2 hover:ring-blue-500/40 transition-all"
                                >
                                  <img src={img.url} alt={img.alt_text} className="w-full h-full object-cover" />
                                </a>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Listing Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <DetailItem label="Type" value={listing.listing_type === "auction" ? "Auction" : "Fixed Price"} />
                        <DetailItem label="Category" value={listing.category} />
                        <DetailItem label="Condition" value={listing.condition} />
                        <DetailItem label="Price" value={`$${listing.price.toFixed(2)}`} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Reject Form */}
                {isRejecting && (
                  <div className="px-4 pb-4 border-t border-white/[0.04]">
                    <div className="pt-4">
                      <p className="text-xs font-medium text-red-400 mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Rejection Reason
                      </p>
                      <textarea
                        value={rejectNote}
                        onChange={(e) => setRejectNote(e.target.value)}
                        placeholder="Explain why this listing is being rejected (the seller will see this)..."
                        rows={3}
                        className="w-full rounded-xl glass text-sm text-white placeholder:text-white/25 p-3 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all resize-none"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleReject(listing.id)}
                          disabled={!rejectNote.trim() || isActioning}
                          className="text-xs font-medium px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all disabled:opacity-50"
                        >
                          {isActioning ? <Loader2 className="w-3 h-3 animate-spin" /> : "Confirm Rejection"}
                        </button>
                        <button
                          onClick={() => {
                            setRejectingId(null);
                            setRejectNote("");
                          }}
                          className="text-xs font-medium px-4 py-2 rounded-lg bg-white/[0.05] text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string; bg: string }> = {
    pending_review: { label: "Pending Review", color: "text-amber-400", bg: "bg-amber-500/20" },
    approved: { label: "Approved", color: "text-emerald-400", bg: "bg-emerald-500/20" },
    rejected: { label: "Rejected", color: "text-red-400", bg: "bg-red-500/20" },
  };
  const c = config[status] || { label: status, color: "text-white/40", bg: "bg-white/10" };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.color}`}>
      {c.label}
    </span>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-lg p-2.5">
      <p className="text-[10px] text-white/20 mb-0.5">{label}</p>
      <p className="text-xs font-medium text-white/70">{value}</p>
    </div>
  );
}
