import { motion } from "motion/react";
import { MessageCircle, Mail } from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Live chat",
    href: "#",
  },
  {
    icon: Mail,
    title: "Email us",
    href: "mailto:contact@tradego.ca",
  },
];

export default function ContactSection() {
  return (
    <section className="w-full py-12 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Title and Subtitle */}
        <div className="mb-12 text-center lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Get in touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm tracking-tight text-white/40"
          >
            Select how you would like to contact us
          </motion.p>
        </div>

        {/* Contact Method Cards */}
        <div className="mx-auto flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-center">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="group flex w-full shrink-0 flex-col items-center justify-between rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:border-white/[0.15] hover:bg-white/[0.04] min-h-[260px] sm:w-[240px] sm:h-[240px] sm:min-h-0"
            >
              {/* Icon */}
              <div className="flex items-center justify-center mt-6 mb-6 sm:mt-0 sm:flex-1">
                <div className="relative">
                  {/* Background shape */}
                  <div className="absolute inset-0 -m-6 rounded-[28px] bg-blue-950/40 opacity-60" />
                  <div className="absolute inset-0 -m-3 rounded-3xl bg-blue-900/50 opacity-70" />

                  {/* Icon container */}
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-xl bg-blue-600 transition-transform group-hover:scale-110">
                    <method.icon
                      className="h-10 w-10 text-blue-200"
                      strokeWidth={0.5}
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center">
                <h3 className="text-base font-normal tracking-tight text-white">
                  {method.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
