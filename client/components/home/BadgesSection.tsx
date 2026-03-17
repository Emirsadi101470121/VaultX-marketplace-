import { ShieldCheck, Star, Truck, TrendingUp, Gavel, Crown } from "lucide-react";
import OrbitImages from "@/components/ui/orbit-images";
import BadgeCenterContent from "./BadgeCenterContent";
import BadgeCard from "./BadgeCard";

const badges = [
  {
    icon: ShieldCheck,
    title: "Verified Seller",
    description: "Identity confirmed, account in good standing",
    gradient: "from-blue-400 to-blue-600",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    icon: Star,
    title: "Trusted Buyer",
    description: "Consistent positive reviews from sellers",
    gradient: "from-amber-400 to-amber-600",
    glowColor: "rgba(245, 158, 11, 0.15)",
  },
  {
    icon: Truck,
    title: "Fast Shipper",
    description: "Ships within 24 hours, reliable tracking",
    gradient: "from-emerald-400 to-emerald-600",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    icon: TrendingUp,
    title: "High Volume",
    description: "100+ successful transactions completed",
    gradient: "from-violet-400 to-violet-600",
    glowColor: "rgba(139, 92, 246, 0.15)",
  },
  {
    icon: Gavel,
    title: "Auction Pro",
    description: "Expert auctioneer with premium track record",
    gradient: "from-cyan-400 to-cyan-600",
    glowColor: "rgba(6, 182, 212, 0.15)",
  },
  {
    icon: Crown,
    title: "Elite Collector",
    description: "Top-tier collector with rare acquisitions",
    gradient: "from-pink-400 to-pink-600",
    glowColor: "rgba(236, 72, 153, 0.15)",
  },
];

export default function BadgesSection() {
  return (
    <section className="pt-16 pb-8 lg:pt-20 lg:pb-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/[0.06] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-0">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Earn Your <span className="text-gradient">Reputation</span>
          </h2>
          <p className="text-white/45 text-lg">
            Build trust in the community with verified badges that showcase your
            trading history.
          </p>
        </div>

        <div className="max-w-5xl mx-auto -mt-6">
          <OrbitImages
            shape="ellipse"
            radiusX={600}
            radiusY={220}
            rotation={-10}
            duration={40}
            itemSize={220}
            responsive
            direction="normal"
            fill
            showPath
            pathColor="rgba(139, 92, 246, 0.1)"
            pathWidth={1}
            paused={false}
            centerContent={<BadgeCenterContent />}
          >
            {badges.map((badge) => (
              <BadgeCard
                key={badge.title}
                icon={badge.icon}
                title={badge.title}
                description={badge.description}
                gradient={badge.gradient}
                glowColor={badge.glowColor}
              />
            ))}
          </OrbitImages>
        </div>
      </div>
    </section>
  );
}
