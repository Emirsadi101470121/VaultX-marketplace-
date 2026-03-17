import { Star, ShieldCheck } from "lucide-react";

const row1 = [
  {
    name: "Marcus Chen",
    role: "Pokémon Collector",
    avatar: "MC",
    avatarBg: "bg-blue-500",
    badge: "Verified Buyer",
    rating: 5,
    quote: "TradeGo's escrow system gave me the confidence to buy a $3,000 Charizard without worrying about fakes.",
  },
  {
    name: "Sarah Mitchell",
    role: "Comic Book Dealer",
    avatar: "SM",
    avatarBg: "bg-violet-500",
    badge: "Verified Seller",
    rating: 5,
    quote: "The verification badges and reputation system have tripled my sales. Buyers trust me because TradeGo backs up my credibility.",
  },
  {
    name: "Jake Torres",
    role: "Retro Gaming Enthusiast",
    avatar: "JT",
    avatarBg: "bg-emerald-500",
    badge: "Auction Pro",
    rating: 5,
    quote: "I sold a sealed copy of Earthbound for way more than I expected, and the whole process was seamless.",
  },
  {
    name: "Priya Sharma",
    role: "Sneaker Collector",
    avatar: "PS",
    avatarBg: "bg-pink-500",
    badge: "Trusted Buyer",
    rating: 5,
    quote: "Finally a platform where I can verify authenticity before paying. No more second-guessing if my kicks are legit.",
  },
  {
    name: "David Kim",
    role: "Vintage Watch Dealer",
    avatar: "DK",
    avatarBg: "bg-amber-500",
    badge: "High Volume",
    rating: 5,
    quote: "Moved my entire watch business to TradeGo. The escrow and grading system is exactly what the luxury market needed.",
  },
];

const row2 = [
  {
    name: "Elena Rossi",
    role: "Art Collector",
    avatar: "ER",
    avatarBg: "bg-rose-500",
    badge: "Elite Collector",
    rating: 5,
    quote: "The authentication process is world-class. I've acquired three original pieces with complete confidence in provenance.",
  },
  {
    name: "Tyler Brooks",
    role: "MTG Card Trader",
    avatar: "TB",
    avatarBg: "bg-cyan-500",
    badge: "Verified Seller",
    rating: 5,
    quote: "Sold over $50K in Magic cards this year alone. The grading integration and buyer protection make it effortless.",
  },
  {
    name: "Aisha Patel",
    role: "Stamp Collector",
    avatar: "AP",
    avatarBg: "bg-orange-500",
    badge: "Trusted Buyer",
    rating: 5,
    quote: "Such a niche hobby, but TradeGo connected me with sellers worldwide. Found stamps I've been hunting for decades.",
  },
  {
    name: "Ryan O'Connor",
    role: "Sports Memorabilia",
    avatar: "RO",
    avatarBg: "bg-green-500",
    badge: "Fast Shipper",
    rating: 5,
    quote: "Every transaction is smooth and secure. My buyers love the tracking and verification — repeat customers every time.",
  },
  {
    name: "Mei Lin",
    role: "Vinyl Record Collector",
    avatar: "ML",
    avatarBg: "bg-indigo-500",
    badge: "Verified Buyer",
    rating: 5,
    quote: "Found a mint condition first pressing of Abbey Road. The seller was verified, shipping was tracked — perfect experience.",
  },
];

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  avatarBg: string;
  badge: string;
  rating: number;
  quote: string;
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="w-[350px] shrink-0 mx-3 glass rounded-2xl p-6 border border-white/[0.06]">
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-sm text-white/60 leading-relaxed mb-5">
        "{t.quote}"
      </p>

      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full ${t.avatarBg} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}
        >
          {t.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-white/35">{t.role}</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 shrink-0">
          <ShieldCheck className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] font-medium text-blue-400">
            {t.badge}
          </span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  testimonials,
  direction,
}: {
  testimonials: Testimonial[];
  direction: "left" | "right";
}) {
  const items = [...testimonials, ...testimonials];

  return (
    <div className="group/marquee overflow-hidden">
      <div
        className={`flex w-max ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"} group-hover/marquee:[animation-play-state:paused]`}
      >
        {items.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="pt-10 pb-20 lg:pt-12 lg:pb-28 relative overflow-hidden">
      <style>{`
        @keyframes marquee-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-scroll-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-scroll-right 40s linear infinite;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-600/[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by <span className="text-gradient">Collectors</span>
          </h2>
          <p className="text-white/45 text-lg">
            Real feedback from our community of verified traders and
            enthusiasts.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <MarqueeRow testimonials={row1} direction="left" />
        <MarqueeRow testimonials={row2} direction="right" />
      </div>
    </section>
  );
}
