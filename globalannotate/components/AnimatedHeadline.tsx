"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AnimatedHeadline({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: delay },
    },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={cn("inline-block", className)}
    >
      {words.map((w, idx) => (
        <span key={idx} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={word} className="inline-block will-change-transform">
            {w}
            {idx < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
