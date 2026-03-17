"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface Product {
  title: string;
  link: string;
  thumbnail: string;
  price?: string;
  description?: string;
  category?: string;
  condition?: string;
}

export const HeroParallax = ({
  products,
  header,
}: {
  products: Product[];
  header?: React.ReactNode;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-clip antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-row {
          display: flex;
          width: max-content;
        }
        .marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .marquee-right {
          animation: marquee-right 30s linear infinite;
        }
        .marquee-wrapper:hover .marquee-row {
          animation-play-state: paused;
        }
      `}</style>

      {header}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <MarqueeRow products={firstRow} direction="left" className="mb-10" />
        <MarqueeRow products={secondRow} direction="right" className="mb-10" />
        <MarqueeRow products={thirdRow} direction="left" />
      </motion.div>
    </div>
  );
};

const MarqueeRow = ({
  products,
  direction,
  className,
}: {
  products: Product[];
  direction: "left" | "right";
  className?: string;
}) => {
  // Duplicate items for seamless loop
  const items = [...products, ...products];

  return (
    <div className={cn("marquee-wrapper overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-row",
          direction === "left" ? "marquee-left" : "marquee-right"
        )}
      >
        {items.map((product, i) => (
          <ProductCard product={product} key={`${product.title}-${i}`} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group/product h-64 w-[22rem] relative shrink-0 mx-5 rounded-xl overflow-hidden cursor-pointer">
      <a href={product.link} className="block h-full w-full">
        <img
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-110"
          alt={product.title}
        />
      </a>

      {/* Hover overlay with product details */}
      <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

      <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover/product:opacity-100 transition-all duration-300 translate-y-4 group-hover/product:translate-y-0 pointer-events-none">
        {product.category && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 mb-1">
            {product.category}
          </span>
        )}
        <h2 className="text-white font-semibold text-sm leading-tight mb-1">
          {product.title}
        </h2>
        {product.description && (
          <p className="text-white/60 text-xs leading-relaxed line-clamp-2 mb-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          {product.price && (
            <span className="text-lg font-bold text-white">{product.price}</span>
          )}
          {product.condition && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-medium">
              {product.condition}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroParallax;
