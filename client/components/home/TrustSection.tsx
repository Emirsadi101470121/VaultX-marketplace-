import MagicBento from "@/components/MagicBento";
import type { BentoCardProps } from "@/components/MagicBento";

const trustCards: BentoCardProps[] = [
  {
    color: "#060010",
    title: "Verified Sellers",
    description:
      "Every account undergoes a multi-step identity verification process before they can list or buy on TradeGo. We check government-issued IDs, validate email and phone, and cross-reference against known fraud databases to keep bad actors out.",
    label: "Trust",
  },
  {
    color: "#060010",
    title: "Escrow Payments",
    description:
      "When you purchase an item, your payment is held in a secure escrow account — not sent directly to the seller. Funds are only released once you confirm the item arrived as described, giving you full protection on every transaction.",
    label: "Security",
  },
  {
    color: "#060010",
    title: "Reputation Badges",
    description:
      "Our badge system rewards honest traders with visible trust indicators. Earn badges for verified sales, positive reviews, fast shipping, and community contributions. Higher badge tiers unlock premium features and increased buyer confidence. From Bronze to Diamond, each level signals your reliability to the community — making it easier to close deals and attract serious collectors.",
    label: "Community",
  },
  {
    color: "#060010",
    title: "Admin Moderation",
    description:
      "A dedicated moderation team reviews flagged listings, monitors suspicious activity, and enforces strict quality standards across the platform. Every listing is checked against our guidelines to ensure authenticity and fair pricing. Suspicious accounts are investigated within hours, counterfeit items are removed immediately, and repeat offenders are permanently banned to maintain marketplace integrity.",
    label: "Protection",
  },
  {
    color: "#060010",
    title: "Dispute Resolution",
    description:
      "If something goes wrong, our structured dispute process ensures fair outcomes. Submit evidence, communicate through our mediation system, and receive a resolution backed by clear marketplace policies — typically within 48 hours.",
    label: "Support",
  },
  {
    color: "#060010",
    title: "Fraud Detection",
    description:
      "Enterprise-grade AI monitors every transaction in real-time, flagging suspicious patterns, duplicate listings, and price manipulation. Our system catches threats before they reach you, maintaining a safe trading environment.",
    label: "Safety",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Built on <span className="text-gradient">Trust</span>
          </h2>
          <p className="text-white/45 text-lg">
            Every feature is designed to protect your trades and build a safer collector community.
          </p>
        </div>

        <MagicBento
          textAutoHide={false}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
          disableAnimations={false}
          cards={trustCards}
        />
      </div>
    </section>
  );
}
