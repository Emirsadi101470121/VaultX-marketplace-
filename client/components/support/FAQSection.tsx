import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const categories = [
  { id: "buying", label: "Buying" },
  { id: "selling", label: "Selling" },
  { id: "escrow", label: "Escrow & Payments" },
  { id: "disputes", label: "Disputes" },
];

const faqsByCategory: Record<string, { title: string; faqs: { question: string; answer: string }[] }> = {
  buying: {
    title: "Buying",
    faqs: [
      {
        question: "How do I place a bid on an item?",
        answer:
          "Navigate to the listing you're interested in and click the 'Place Bid' button. Enter your maximum bid amount — TradeGo will automatically bid on your behalf up to that limit. You'll receive notifications if you're outbid.",
      },
      {
        question: "What happens after I win an auction?",
        answer:
          "Once you win, your payment is placed into escrow. The seller ships the item, and you have a confirmation window (typically 3 days) to inspect it. Once you confirm satisfaction, funds are released to the seller.",
      },
      {
        question: "Can I make a direct purchase without bidding?",
        answer:
          "Yes! Many listings include a 'Buy Now' option at a fixed price. Simply click 'Buy Now', complete the checkout, and your payment enters escrow while the seller prepares your order for shipping.",
      },
    ],
  },
  selling: {
    title: "Selling",
    faqs: [
      {
        question: "How do I list an item for sale?",
        answer:
          "Go to your dashboard and click 'Create Listing'. Upload clear photos, write a detailed description, set your starting price or Buy Now price, and choose your auction duration. Verified sellers get priority placement in search results.",
      },
      {
        question: "What fees does TradeGo charge sellers?",
        answer:
          "TradeGo charges a small transaction fee on completed sales to cover escrow protection, fraud prevention, and platform maintenance. The exact fee percentage is displayed before you publish your listing so there are no surprises.",
      },
      {
        question: "How do I become a verified seller?",
        answer:
          "Go to your account settings and start the verification process. You'll need to provide a government-issued ID, verify your email and phone, and confirm your address. Verification typically takes 1-2 business days.",
      },
    ],
  },
  escrow: {
    title: "Escrow & Payments",
    faqs: [
      {
        question: "How does escrow protection work?",
        answer:
          "When you make a purchase, your payment is held securely by TradeGo — never sent directly to the seller. The seller ships the item, and once you confirm receipt and satisfaction, funds are released. If there's an issue, you can open a dispute.",
      },
      {
        question: "When do sellers receive their payment?",
        answer:
          "Sellers receive payment once the buyer confirms the item was received in the described condition, or when the confirmation window expires without a dispute. Funds are typically transferred within 1-2 business days after release.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "TradeGo accepts major credit and debit cards, bank transfers, and select digital payment methods. All transactions are encrypted and PCI-compliant to ensure your financial information stays secure.",
      },
    ],
  },
  disputes: {
    title: "Disputes",
    faqs: [
      {
        question: "What if my item arrives damaged or not as described?",
        answer:
          "Open a dispute within the confirmation window (typically 3 days after delivery). Our team will review evidence from both parties and issue a fair resolution — which may include a full refund, partial refund, or return.",
      },
      {
        question: "How long does dispute resolution take?",
        answer:
          "Most disputes are resolved within 3-5 business days. Complex cases involving authentication or high-value items may take up to 10 business days. You'll receive updates at every step of the process.",
      },
      {
        question: "Can I cancel a purchase after payment?",
        answer:
          "You can request cancellation before the seller ships. Once shipped, cancellation becomes a dispute process. Auction wins are binding — failure to pay may result in account restrictions.",
      },
    ],
  },
};

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("buying");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const currentCategory = faqsByCategory[selectedCategory];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setOpenIndex(null);
  };

  return (
    <section className="w-full flex flex-col">
      {/* Top Section - Title & Categories */}
      <div className="w-full py-12 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-blue-600/20 to-violet-600/20">
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-8"
          >
            Questions about TradeGo?
          </motion.h1>

          {/* Category Tabs */}
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <button
                  onClick={() => handleCategoryChange(category.id)}
                  className={`cursor-pointer px-6 sm:px-8 py-4 transition-all font-medium tracking-tight text-sm sm:text-base ${
                    selectedCategory === category.id
                      ? "rounded-full border-2 border-dashed border-white/60 text-white rotate-[-6deg]"
                      : "rounded-md border border-white/20 text-white/60 hover:text-white hover:border-white/40"
                  }`}
                >
                  {category.label}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Category Title & FAQs */}
      <div className="flex-1 bg-[hsl(228,16%,6%)] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-16">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 xl:gap-20">
            {/* Left Column - Category Title */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <motion.h2
                key={selectedCategory}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl font-medium text-white"
              >
                {currentCategory.title}
              </motion.h2>
            </div>

            {/* Right Column - FAQ Accordion */}
            <div className="flex flex-col">
              <div key={selectedCategory} className="space-y-0">
                {currentCategory.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-white/[0.08]"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full py-6 sm:py-8 flex items-start justify-between gap-4 text-left group"
                    >
                      <span className="text-base sm:text-lg font-medium text-white/80 group-hover:text-white transition-colors duration-200 flex-1">
                        {faq.question}
                      </span>
                      <div className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center mt-0.5">
                        {openIndex === index ? (
                          <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" />
                        ) : (
                          <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white/40" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: {
                              duration: 0.3,
                              ease: [0.4, 0, 0.2, 1],
                            },
                            opacity: { duration: 0.2, ease: "easeInOut" },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 sm:pb-8 pr-8">
                            <p className="text-sm sm:text-base text-white/40 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
