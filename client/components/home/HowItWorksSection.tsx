import { UserCheck, ShoppingBag, PackageCheck, Banknote } from "lucide-react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Verify Your Account",
    description:
      "Quick identity verification to join a community of trusted collectors. Our streamlined KYC process ensures every member is authenticated, creating a safe environment where you can trade with confidence. Get verified in minutes and unlock full platform access.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <UserCheck className="w-16 h-16 opacity-80" />
      </div>
    ),
  },
  {
    title: "Buy, Sell, or Auction",
    description:
      "List items at fixed prices or create exciting auctions for rare finds. Set your own terms, upload high-resolution images, and reach thousands of verified collectors instantly. Whether you're offloading duplicates or hunting for grails, the marketplace adapts to your style.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600 text-white">
        <ShoppingBag className="w-16 h-16 opacity-80" />
      </div>
    ),
  },
  {
    title: "Confirm Delivery",
    description:
      "Buyer confirms receipt and condition. Both parties are protected throughout the entire transaction. Our escrow system holds funds securely until the buyer inspects the item and approves. No more worrying about scams or misrepresented goods.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <PackageCheck className="w-16 h-16 opacity-80" />
      </div>
    ),
  },
  {
    title: "Funds Released",
    description:
      "Seller receives payment after buyer confirmation. Safe, simple, and secure. Payouts are processed instantly to your preferred method — bank transfer, crypto, or platform credit. Every transaction is logged and transparent, giving both parties a complete audit trail.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <Banknote className="w-16 h-16 opacity-80" />
      </div>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section className="pt-20 pb-6 lg:pt-28 lg:pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-white/45 text-lg">
            Four simple steps to secure, verified collectible trading.
          </p>
        </div>

        <StickyScroll content={content} />
      </div>
    </section>
  );
}
