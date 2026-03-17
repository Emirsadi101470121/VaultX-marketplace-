import { Link } from "react-router-dom";
import { BookOpen, Layers, Zap, Gamepad2, Gem, Crown } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "../ScrollStack";
import GlowCard from "../GlowCard";

const categories = [
  {
    name: "Comic Books",
    icon: BookOpen,
    count: "2,340",
    description: "Rare first editions, graded slabs, and vintage issues from Marvel, DC, and indie publishers.",
    cardBg: "#1a0f2e",
    iconBg: "bg-gradient-to-br from-red-500 to-orange-500",
    glow: "255, 80, 50",
  },
  {
    name: "Trading Cards",
    icon: Layers,
    count: "5,120",
    description: "Sports cards, TCG singles, sealed product, and PSA-graded collectibles from every era.",
    cardBg: "#0f1a2e",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    glow: "60, 130, 255",
  },
  {
    name: "Pokémon",
    icon: Zap,
    count: "3,890",
    description: "Base Set holos, modern chase cards, sealed booster boxes, and Japanese exclusives.",
    cardBg: "#1a1a0f",
    iconBg: "bg-gradient-to-br from-yellow-500 to-amber-500",
    glow: "234, 179, 8",
  },
  {
    name: "Retro Games",
    icon: Gamepad2,
    count: "1,760",
    description: "CIB cartridges, sealed classics, limited-run physicals, and vintage console hardware.",
    cardBg: "#1a0f28",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    glow: "139, 92, 246",
  },
  {
    name: "Digital Goods",
    icon: Gem,
    count: "980",
    description: "Exclusive digital collectibles, in-game items, redeemable codes, and virtual assets.",
    cardBg: "#0f1a25",
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-500",
    glow: "6, 182, 212",
  },
  {
    name: "Limited Editions",
    icon: Crown,
    count: "640",
    description: "Numbered prints, artist proofs, convention exclusives, and one-of-a-kind collectibles.",
    cardBg: "#1f1a0f",
    iconBg: "bg-gradient-to-br from-amber-500 to-yellow-500",
    glow: "245, 158, 11",
  },
];

export default function CategoriesSection() {
  return (
    <section className="pt-20 lg:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Browse Categories
            </h2>
            <p className="text-white/45 text-lg max-w-md">
              Find exactly what you're collecting across our curated categories.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors shrink-0"
          >
            View All Categories →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollStack
            itemDistance={200}
            itemStackDistance={30}
            stackPosition="20%"
            scaleEndPosition="10%"
            baseScale={0.85}
            rotationAmount={0}
            blurAmount={0}
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <ScrollStackItem
                  key={cat.name}
                  itemClassName="!p-0 !shadow-none border-0"
                >
                  <GlowCard
                    glowColor={cat.glow}
                    particleCount={10}
                    enableParticles
                    enableBorderGlow
                    enableClickRipple
                    className="h-full w-full rounded-[40px] border border-white/[0.08] transition-colors duration-300"
                  >
                    <div style={{ backgroundColor: cat.cardBg }} className="h-full w-full rounded-[40px] p-8 sm:p-12">
                      <Link
                        to={`/marketplace?category=${encodeURIComponent(cat.name)}`}
                        className="flex items-center gap-6 h-full w-full group relative z-10"
                      >
                        <div className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${cat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
                            {cat.name}
                          </h3>
                          <p className="text-sm text-white/40 mb-2">{cat.count} items</p>
                          <p className="text-sm leading-relaxed text-white/55 max-w-lg hidden sm:block">
                            {cat.description}
                          </p>
                        </div>
                        <div className="shrink-0 text-white/20 group-hover:text-white/50 transition-colors">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </GlowCard>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
      </div>
    </section>
  );
}
