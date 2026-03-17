import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Timeline } from "@/components/ui/timeline";
import ProfileCard from "@/components/ui/ProfileCard";
import {
  Shield,
  ShieldCheck,
  Lock,
  Award,
  Users,
  Heart,
  Target,
  Zap,
  Globe,
  ArrowRight,
  Rocket,
  Eye,
  Bot,
  Gavel,
  CheckCircle2,
  Star,
  TrendingUp,
  Package,
} from "lucide-react";

const timelineData = [
  {
    title: "Nov 2025",
    content: (
      <div>
        <h4 className="text-lg md:text-2xl font-semibold text-white mb-3">
          The Idea Was Born
        </h4>
        <p className="text-sm md:text-base text-white/40 leading-relaxed mb-6 max-w-xl">
          After losing $2,400 to a counterfeit Pokémon card on a peer-to-peer platform, our
          founder decided enough was enough. The collectibles market needed a platform built on
          trust — not just good intentions.
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          <MilestoneCard icon={Target} label="Problem identified" color="text-rose-400" bg="bg-rose-500/10" />
          <MilestoneCard icon={Users} label="Team of 2 started" color="text-blue-400" bg="bg-blue-500/10" />
        </div>
      </div>
    ),
  },
  {
    title: "Dec 2025",
    content: (
      <div>
        <h4 className="text-lg md:text-2xl font-semibold text-white mb-3">
          Building the Foundation
        </h4>
        <p className="text-sm md:text-base text-white/40 leading-relaxed mb-6 max-w-xl">
          We designed and built the core platform from scratch — identity verification,
          escrow-protected payments, and a reputation system that rewards honest trading.
          Every architectural decision centered on one thing: making fraud impossible.
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          <MilestoneCard icon={ShieldCheck} label="ID verification built" color="text-blue-400" bg="bg-blue-500/10" />
          <MilestoneCard icon={Lock} label="Escrow system live" color="text-violet-400" bg="bg-violet-500/10" />
          <MilestoneCard icon={Award} label="Reputation engine" color="text-amber-400" bg="bg-amber-500/10" />
          <MilestoneCard icon={Eye} label="Listing moderation" color="text-cyan-400" bg="bg-cyan-500/10" />
        </div>
      </div>
    ),
  },
  {
    title: "Jan 2026",
    content: (
      <div>
        <h4 className="text-lg md:text-2xl font-semibold text-white mb-3">
          Private Beta Launch
        </h4>
        <p className="text-sm md:text-base text-white/40 leading-relaxed mb-6 max-w-xl">
          We invited 200 collectors from Pokémon, comic book, and retro gaming communities
          to test TradeGo. The feedback was overwhelming — people had been waiting for
          something like this. We iterated fast and fixed what mattered.
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          <MilestoneCard icon={Users} label="200 beta testers" color="text-emerald-400" bg="bg-emerald-500/10" />
          <MilestoneCard icon={Package} label="1,400+ listings created" color="text-blue-400" bg="bg-blue-500/10" />
          <MilestoneCard icon={Star} label="4.8 avg satisfaction" color="text-amber-400" bg="bg-amber-500/10" />
          <MilestoneCard icon={Shield} label="0 fraud incidents" color="text-emerald-400" bg="bg-emerald-500/10" />
        </div>
      </div>
    ),
  },
  {
    title: "Feb 2026",
    content: (
      <div>
        <h4 className="text-lg md:text-2xl font-semibold text-white mb-3">
          Auctions & AI Support
        </h4>
        <p className="text-sm md:text-base text-white/40 leading-relaxed mb-6 max-w-xl">
          We launched our real-time auction system with live bidding, automated sniping
          protection, and transparent bid history. Alongside it, our AI-powered support
          assistant went live — handling 80% of user questions instantly.
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          <MilestoneCard icon={Gavel} label="Live auctions launched" color="text-violet-400" bg="bg-violet-500/10" />
          <MilestoneCard icon={Bot} label="AI support assistant" color="text-cyan-400" bg="bg-cyan-500/10" />
          <MilestoneCard icon={TrendingUp} label="$240K+ traded" color="text-emerald-400" bg="bg-emerald-500/10" />
          <MilestoneCard icon={CheckCircle2} label="99.2% satisfaction" color="text-blue-400" bg="bg-blue-500/10" />
        </div>
      </div>
    ),
  },
  {
    title: "Mar 2026",
    content: (
      <div>
        <h4 className="text-lg md:text-2xl font-semibold text-white mb-3">
          Public Launch & Beyond
        </h4>
        <p className="text-sm md:text-base text-white/40 leading-relaxed mb-6 max-w-xl">
          TradeGo is now open to everyone. With thousands of verified traders, a growing
          catalog of collectibles across categories, and the safest trading infrastructure
          in the market — we're just getting started.
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          <MilestoneCard icon={Globe} label="Open to public" color="text-blue-400" bg="bg-blue-500/10" />
          <MilestoneCard icon={Rocket} label="Mobile app in progress" color="text-violet-400" bg="bg-violet-500/10" />
          <MilestoneCard icon={Users} label="12,400+ traders" color="text-emerald-400" bg="bg-emerald-500/10" />
          <MilestoneCard icon={Heart} label="Community growing" color="text-rose-400" bg="bg-rose-500/10" />
        </div>
      </div>
    ),
  },
];

function MilestoneCard({
  icon: Icon,
  label,
  color,
  bg,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-[hsl(228,16%,10%)] border border-white/[0.06] p-3">
      <div className={`w-8 h-8 shrink-0 rounded-lg ${bg} flex items-center justify-center`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <span className="text-[12px] font-medium text-white/60 leading-tight">{label}</span>
    </div>
  );
}

const values = [
  {
    icon: Shield,
    title: "Trust First",
    description: "Every feature starts with one question: does this make trading safer?",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built for collectors, by people who understand the thrill of the hunt.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Target,
    title: "Fair for Everyone",
    description: "Buyers and sellers get equal protection. Always.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Always Improving",
    description: "From AI support to smarter fraud detection — we never stop building.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];


const stats = [
  { value: "12,400+", label: "Verified Traders" },
  { value: "$2.4M+", label: "Transaction Volume" },
  { value: "99.2%", label: "Satisfaction Rate" },
  { value: "0.3%", label: "Dispute Rate" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[140px]" />
          <div className="absolute top-[100px] right-0 w-[400px] h-[400px] bg-violet-600/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] font-medium text-white/40 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Building the future of safe trading
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Making Collectible{" "}
            <br className="hidden sm:block" />
            Trading{" "}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Safe for Everyone
            </span>
          </h1>

          <p className="text-white/35 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            TradeGo was born from a simple idea: collectors deserve a marketplace they can
            trust. No scams, no fakes, no uncertainty — just verified people trading
            verified items.
          </p>

          {/* Stats inline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-[hsl(228,16%,10%)] border border-white/[0.06] py-4 px-3"
              >
                <p className="font-display text-xl font-bold text-white">{s.value}</p>
                <p className="text-[10px] text-white/25 mt-0.5 uppercase tracking-wider font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto mb-10 md:mb-0 md:px-8 lg:px-10">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-3">
              Our Journey
            </h2>
            <p className="text-sm md:text-base text-white/35 max-w-md">
              From a frustrated collector's idea to the safest marketplace for trading
              collectibles. Here's how we got here.
            </p>
          </div>
          <Timeline data={timelineData} />
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              What We Stand For
            </h2>
            <p className="text-sm text-white/30 max-w-md mx-auto">
              The principles behind every line of code and every decision we make.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-[hsl(228,16%,10%)] border border-white/[0.06] p-6 hover:border-white/[0.1] transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${v.bg} flex items-center justify-center mb-4`}>
                  <v.icon className={`w-[18px] h-[18px] ${v.color}`} />
                </div>
                <h3 className="font-display font-semibold text-white text-[15px] mb-1.5">
                  {v.title}
                </h3>
                <p className="text-[13px] text-white/35 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Meet the Team
            </h2>
            <p className="text-sm text-white/30 max-w-md mx-auto">
              The people building the future of safe collectible trading.
            </p>
          </div>

          {/* Founder - Featured */}
          <div className="flex flex-col items-center gap-10 mb-20">
            <ProfileCard
              name="Emir Sadi"
              title="CEO"
              handle="emirsadi"
              status="Building TradeGo"
              contactText="Contact"
              avatarUrl="https://cdn.builder.io/api/v1/image/assets%2Fa690401014014da79951d27470284029%2Fa73489b06bb249c08934eb0a8e31efca?format=webp&width=800&height=1200"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              behindGlowColor="rgba(125, 130, 255, 0.5)"
              behindGlowEnabled={true}
              innerGradient="linear-gradient(145deg, #1a1040cc 0%, #3b82f644 100%)"
              onContactClick={() => window.location.href = 'mailto:contact@tradego.ca'}
            />

            <div className="text-center max-w-lg">
              <p className="text-sm text-white/35 leading-relaxed">
                After experiencing firsthand the risks of peer-to-peer collectible trading,
                Emir set out to build the safest marketplace for collectors worldwide.
                TradeGo is the result of that mission.
              </p>
            </div>
          </div>

          {/* Team Members */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <TeamMemberCard
              name="Berhan Erdogan"
              title="CTO"
              initials="BE"
              gradientFrom="from-violet-500"
              gradientTo="to-indigo-600"
              description="Leading the technical architecture and engineering vision behind TradeGo's platform."
            />
            <TeamMemberCard
              name="Steven Kolenko"
              title="Lead Software Engineer"
              initials="SK"
              gradientFrom="from-emerald-500"
              gradientTo="to-cyan-600"
              description="Driving core platform development and building the systems that power secure trading."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-[hsl(228,16%,10%)] border border-white/[0.06] p-8 md:p-14 text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-600/[0.06] rounded-full blur-[80px] pointer-events-none" />

            <div className="relative">
              <Globe className="w-9 h-9 text-blue-400 mx-auto mb-5" />
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Join the Community
              </h2>
              <p className="text-[13px] text-white/30 max-w-sm mx-auto mb-8">
                Whether you're a seasoned collector or just getting started, TradeGo is the
                safest place to trade.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/auth/signup"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  Create Free Account
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/marketplace"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-semibold text-sm bg-white/[0.05] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all"
                >
                  Browse Marketplace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function TeamMemberCard({
  name,
  title,
  initials,
  gradientFrom,
  gradientTo,
  description,
}: {
  name: string;
  title: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-[hsl(228,16%,10%)] border border-white/[0.06] p-6 hover:border-white/[0.1] transition-all duration-300 text-center">
      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center mx-auto mb-5`}>
        <span className="text-2xl font-bold text-white">{initials}</span>
      </div>
      <h3 className="font-display text-lg font-semibold text-white mb-1">{name}</h3>
      <p className="text-sm text-blue-400 font-medium mb-3">{title}</p>
      <p className="text-[13px] text-white/35 leading-relaxed">{description}</p>
    </div>
  );
}
