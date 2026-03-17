import Layout from "@/components/Layout";
import { useState } from "react";
import ListingReviewTab from "@/components/admin/ListingReviewTab";
import {
  ShieldCheck,
  Flag,
  AlertTriangle,
  Users,
  Package,
  BarChart3,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Search,
  Award,
  TrendingUp,
  MessageCircle,
  ChevronRight,
  Filter,
} from "lucide-react";

const stats = [
  { label: "Pending Verifications", value: "24", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Flagged Listings", value: "8", icon: Flag, color: "text-orange-400", bg: "bg-orange-500/10" },
  { label: "Open Disputes", value: "5", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
  { label: "Active Listings", value: "1,247", icon: Package, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Verified Users", value: "12,438", icon: ShieldCheck, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "Monthly Volume", value: "$342K", icon: TrendingUp, color: "text-cyan-400", bg: "bg-cyan-500/10" },
];

const verificationQueue = [
  { id: "U-4821", name: "Jordan Blake", email: "jordan.b@email.com", type: "Seller", submitted: "2 hours ago", docs: "ID + Address", status: "pending" },
  { id: "U-4820", name: "Mia Chen", email: "mia.c@email.com", type: "Seller", submitted: "4 hours ago", docs: "ID + Phone", status: "pending" },
  { id: "U-4819", name: "Carlos Ruiz", email: "carlos.r@email.com", type: "Buyer", submitted: "6 hours ago", docs: "ID", status: "pending" },
  { id: "U-4818", name: "Aisha Patel", email: "aisha.p@email.com", type: "Seller", submitted: "8 hours ago", docs: "ID + Address + Phone", status: "pending" },
  { id: "U-4817", name: "Luke Harrison", email: "luke.h@email.com", type: "Buyer", submitted: "1 day ago", docs: "ID", status: "pending" },
];

const flaggedListings = [
  { id: "L-9012", title: "Charizard 1st Ed — RARE", seller: "newuser42", reason: "Suspected counterfeit", reports: 3, flaggedAt: "1 hour ago" },
  { id: "L-9008", title: "Sealed Booster Box — Base Set", seller: "quickflip99", reason: "Price manipulation", reports: 2, flaggedAt: "3 hours ago" },
  { id: "L-8994", title: "PSA 10 Pikachu Illustrator", seller: "cardking", reason: "Misleading photos", reports: 5, flaggedAt: "6 hours ago" },
  { id: "L-8991", title: "Signed Marvel Omnibus", seller: "comicdeals", reason: "Authenticity doubts", reports: 1, flaggedAt: "12 hours ago" },
];

const disputes = [
  { id: "D-301", buyer: "Alex R.", seller: "RetroRealm", item: "SNES Console CIB", amount: "$620", reason: "Item not as described", status: "Under Review", opened: "1 day ago" },
  { id: "D-298", buyer: "Jamie L.", seller: "CardMasters", item: "MTG Dual Land", amount: "$3,200", reason: "Item not received", status: "Awaiting Evidence", opened: "2 days ago" },
  { id: "D-295", buyer: "Taylor S.", seller: "FigureHQ", item: "Funko Pop Exclusive", amount: "$180", reason: "Damaged in shipping", status: "Under Review", opened: "3 days ago" },
];

const fraudReview = [
  { id: "FR-88", user: "suspicious_trader", type: "Multiple accounts", severity: "High", detected: "2 hours ago" },
  { id: "FR-87", user: "quickflip99", type: "Shill bidding", severity: "Medium", detected: "5 hours ago" },
];

type AdminTab = "overview" | "listings" | "verifications" | "flagged" | "disputes" | "fraud" | "badges";

export default function Admin() {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">Admin Panel</h1>
            <p className="text-sm text-white/40">Moderate users, listings, disputes, and platform health.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <input
              type="text"
              placeholder="Search users, listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl glass text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-white/[0.06] mb-8 overflow-x-auto">
          {([
            { key: "overview", label: "Overview" },
            { key: "listings", label: "Listing Review" },
            { key: "verifications", label: `Verifications (${verificationQueue.length})` },
            { key: "flagged", label: `Flagged (${flaggedListings.length})` },
            { key: "disputes", label: `Disputes (${disputes.length})` },
            { key: "fraud", label: `Fraud (${fraudReview.length})` },
            { key: "badges", label: "Badges" },
          ] as { key: AdminTab; label: string }[]).map((t) => (
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
        {tab === "listings" && <ListingReviewTab />}
        {tab === "verifications" && <VerificationsTab />}
        {tab === "flagged" && <FlaggedTab />}
        {tab === "disputes" && <DisputesTab />}
        {tab === "fraud" && <FraudTab />}
        {tab === "badges" && <BadgesTab />}
      </div>
    </Layout>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-4 text-center">
            <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
            </div>
            <p className="font-display text-xl font-bold text-white">{stat.value}</p>
            <p className="text-[10px] text-white/30 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Verification Queue Preview */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              Verification Queue
            </h3>
            <span className="text-xs text-white/25">{verificationQueue.length} pending</span>
          </div>
          <div className="space-y-2">
            {verificationQueue.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
                <div className="w-9 h-9 shrink-0 rounded-full bg-blue-500/15 flex items-center justify-center text-xs font-bold text-blue-400">
                  {user.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-white/30">{user.type} · {user.submitted}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/25 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center text-red-400 hover:bg-red-500/25 transition-colors">
                    <XCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagged Listings Preview */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white flex items-center gap-2">
              <Flag className="w-4 h-4 text-orange-400" />
              Flagged Listings
            </h3>
            <span className="text-xs text-white/25">{flaggedListings.length} pending</span>
          </div>
          <div className="space-y-2">
            {flaggedListings.slice(0, 3).map((listing) => (
              <div key={listing.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-orange-500/15 flex items-center justify-center">
                  <Flag className="w-4 h-4 text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{listing.title}</p>
                  <p className="text-[10px] text-white/30">{listing.reason} · {listing.reports} reports</p>
                </div>
                <button className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/[0.05] text-white/40 hover:text-white hover:bg-white/[0.08] transition-all shrink-0">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Open Disputes Preview */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Open Disputes
            </h3>
            <span className="text-xs text-white/25">{disputes.length} active</span>
          </div>
          <div className="space-y-2">
            {disputes.slice(0, 3).map((dispute) => (
              <div key={dispute.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-red-500/15 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{dispute.item}</p>
                  <p className="text-[10px] text-white/30">{dispute.reason} · {dispute.amount}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  dispute.status === "Under Review" ? "bg-blue-500/20 text-blue-400" : "bg-orange-500/20 text-orange-400"
                }`}>
                  {dispute.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Preview */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Marketplace Analytics
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "New Users (7d)", value: "284" },
              { label: "Completed Sales (7d)", value: "1,092" },
              { label: "Avg. Sale Price", value: "$487" },
              { label: "Dispute Rate", value: "0.4%" },
              { label: "Auction Fill Rate", value: "78%" },
              { label: "Repeat Buyers", value: "62%" },
            ].map((metric) => (
              <div key={metric.label} className="glass rounded-lg p-3 text-center">
                <p className="font-display text-base font-bold text-white">{metric.value}</p>
                <p className="text-[10px] text-white/30 mt-0.5">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VerificationsTab() {
  return (
    <div className="space-y-3">
      {verificationQueue.map((user) => (
        <div key={user.id} className="glass rounded-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 shrink-0 rounded-full bg-blue-500/15 flex items-center justify-center text-sm font-bold text-blue-400">
            {user.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold text-white">{user.name}</p>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-white/40">{user.type}</span>
            </div>
            <p className="text-xs text-white/30">{user.email} · Submitted {user.submitted}</p>
            <p className="text-[10px] text-white/20 mt-0.5">Documents: {user.docs}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.05] text-white/40 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-1">
              <Eye className="w-3 h-3" />
              View
            </button>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-all">
              Approve
            </button>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-all">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function FlaggedTab() {
  return (
    <div className="space-y-3">
      {flaggedListings.map((listing) => (
        <div key={listing.id} className="glass rounded-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 shrink-0 rounded-lg bg-orange-500/15 flex items-center justify-center">
            <Flag className="w-5 h-5 text-orange-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{listing.title}</p>
            <p className="text-xs text-white/30 mt-0.5">
              Seller: {listing.seller} · {listing.reports} report{listing.reports > 1 ? "s" : ""} · {listing.flaggedAt}
            </p>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 mt-1 inline-block">
              {listing.reason}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.05] text-white/40 hover:text-white hover:bg-white/[0.08] transition-all">
              Review
            </button>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-all">
              Remove
            </button>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-all">
              Clear
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function DisputesTab() {
  return (
    <div className="space-y-3">
      {disputes.map((dispute) => (
        <div key={dispute.id} className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-white/25">{dispute.id}</span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                dispute.status === "Under Review" ? "bg-blue-500/20 text-blue-400" : "bg-orange-500/20 text-orange-400"
              }`}>
                {dispute.status}
              </span>
            </div>
            <span className="text-xs text-white/25 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {dispute.opened}
            </span>
          </div>
          <p className="text-sm font-semibold text-white mb-1">{dispute.item}</p>
          <p className="text-xs text-white/40 mb-3">{dispute.reason}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-white/30">
              <span>Buyer: <span className="text-white/50">{dispute.buyer}</span></span>
              <span>Seller: <span className="text-white/50">{dispute.seller}</span></span>
              <span>Amount: <span className="text-white/60 font-semibold">{dispute.amount}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.05] text-white/40 hover:text-white hover:bg-white/[0.08] transition-all">
                View Details
              </button>
              <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 transition-all">
                Resolve
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FraudTab() {
  return (
    <div className="space-y-3">
      {fraudReview.map((item) => (
        <div key={item.id} className="glass rounded-xl p-5 flex items-center gap-4">
          <div className={`w-11 h-11 shrink-0 rounded-lg flex items-center justify-center ${
            item.severity === "High" ? "bg-red-500/15" : "bg-orange-500/15"
          }`}>
            <AlertTriangle className={`w-5 h-5 ${
              item.severity === "High" ? "text-red-400" : "text-orange-400"
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold text-white">{item.user}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                item.severity === "High" ? "bg-red-500/20 text-red-400" : "bg-orange-500/20 text-orange-400"
              }`}>
                {item.severity}
              </span>
            </div>
            <p className="text-xs text-white/30">{item.type} · Detected {item.detected}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.05] text-white/40 hover:text-white hover:bg-white/[0.08] transition-all">
              Investigate
            </button>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-all">
              Suspend
            </button>
          </div>
        </div>
      ))}
      {fraudReview.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <ShieldCheck className="w-8 h-8 text-emerald-400/30 mx-auto mb-3" />
          <p className="text-sm text-white/40">No fraud cases to review. All clear!</p>
        </div>
      )}
    </div>
  );
}

function BadgesTab() {
  const badgeRequests = [
    { user: "PokéVault", badge: "High Volume Trader", progress: "87/100 sales", status: "In Progress" },
    { user: "ComicKing", badge: "Auction Pro", progress: "48/50 auctions", status: "In Progress" },
    { user: "RetroRealm", badge: "Fast Shipper", progress: "Meets criteria", status: "Ready for Review" },
  ];

  return (
    <div className="space-y-3">
      {badgeRequests.map((req) => (
        <div key={`${req.user}-${req.badge}`} className="glass rounded-xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 shrink-0 rounded-lg bg-amber-500/15 flex items-center justify-center">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">{req.user}</p>
            <p className="text-xs text-white/30 mt-0.5">
              Requesting: <span className="text-white/50">{req.badge}</span> · {req.progress}
            </p>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
            req.status === "Ready for Review" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
          }`}>
            {req.status}
          </span>
          {req.status === "Ready for Review" && (
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-all shrink-0">
              Grant
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
