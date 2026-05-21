import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  strong?: boolean;
  className?: string;
}

export function GlassCard({
  children,
  strong = false,
  className = "",
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={`rounded-2xl ${strong ? "glass-strong" : "glass"} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
