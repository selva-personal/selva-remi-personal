import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { CONFIG, FINAL_CLOSING_LINE, FINAL_MESSAGE, UI } from "../data/content";
import { fireFireworks } from "../hooks/useConfetti";

function FallingElement({ style, emoji, delay }: { style: React.CSSProperties; emoji: string; delay: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute text-xl sm:text-2xl"
      style={style}
      initial={{ y: -50, opacity: 0, rotate: 0 }}
      animate={{
        y: ["0vh", "110vh"],
        opacity: [0, 1, 1, 0],
        rotate: [0, 180, 360],
        x: [0, 30, -20, 10],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    >
      {emoji}
    </motion.span>
  );
}

export function FinalSurprise() {
  const elements = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        emoji: ["🌹", "❤️", "💕", "🌸", "💖"][Math.floor(Math.random() * 5)],
        delay: Math.random() * 8,
      })),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => fireFireworks(4000), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
      {elements.map((el) => (
        <FallingElement
          key={el.id}
          style={{ left: el.left, top: -20 }}
          emoji={el.emoji}
          delay={el.delay}
        />
      ))}

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.2)_0%,transparent_70%)]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl"
      >
        <motion.span
          className="text-6xl sm:text-7xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💝
        </motion.span>

        <motion.h2
          className="mt-8 font-display text-3xl font-bold text-gradient sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {UI.finale.title}
        </motion.h2>

        <motion.p
          className="mt-8 font-accent text-lg leading-relaxed text-white/75 sm:text-xl sm:leading-loose"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {FINAL_MESSAGE}
        </motion.p>

        <motion.p
          className="mt-12 font-display text-2xl font-bold sm:text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-gradient">{FINAL_CLOSING_LINE}</span>
        </motion.p>

        <motion.div
          className="mt-16 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8 }}
        >
          {UI.finale.tags(CONFIG.yearsOfLove).map((word, i) => (
            <motion.span
              key={word}
              className="rounded-full glass px-4 py-2 text-sm text-white/70 sm:px-5 sm:text-base"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
