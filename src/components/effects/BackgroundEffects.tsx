import { motion } from "framer-motion";
import { useMemo } from "react";

function Star({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={style}
      animate={{
        opacity: [0.2, 0.9, 0.2],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 2 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function FloatingHeart({ style, delay }: { style: React.CSSProperties; delay: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute select-none text-lg opacity-40 sm:text-2xl"
      style={style}
      animate={{
        y: [0, -120, -240],
        x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
        opacity: [0, 0.7, 0],
        rotate: [0, 15, -10],
      }}
      transition={{
        duration: 8 + Math.random() * 6,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    >
      {["❤️", "💕", "💖", "✨", "🌸"][Math.floor(Math.random() * 5)]}
    </motion.span>
  );
}

export function BackgroundEffects() {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 2,
      })),
    []
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        bottom: `${-10 - Math.random() * 20}%`,
        delay: i * 1.2,
      })),
    []
  );

  return (
    <motion.div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(168,85,247,0.25)_0%,transparent_50%)]" />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(236,72,153,0.2)_0%,transparent_50%)]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />

      {stars.map((s) => (
        <Star
          key={s.id}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {hearts.map((h) => (
        <FloatingHeart
          key={h.id}
          style={{ left: h.left, bottom: h.bottom }}
          delay={h.delay}
        />
      ))}
    </motion.div>
  );
}
