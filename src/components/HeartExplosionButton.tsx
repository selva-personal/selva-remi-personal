import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { UI } from "../data/content";
import { fireHeartConfetti } from "../hooks/useConfetti";

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export function HeartExplosionButton() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const explode = useCallback(() => {
    fireHeartConfetti();
    const emojis = ["❤️", "💕", "💖", "💗", "💝", "✨"];
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1200);
  }, []);

  return (
    <section className="section-padding relative flex flex-col items-center">
      <motion.h2
        className="mb-8 font-display text-2xl font-bold text-gradient sm:text-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {UI.heart.title}
      </motion.h2>

      <div className="relative">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="pointer-events-none absolute left-1/2 top-1/2 text-2xl"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: 0,
              scale: 0.3,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {p.emoji}
          </motion.span>
        ))}

        <motion.button
          type="button"
          onClick={explode}
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 text-4xl shadow-2xl glow-pink sm:h-28 sm:w-28 sm:text-5xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 0 30px rgba(236,72,153,0.4)",
              "0 0 60px rgba(168,85,247,0.5)",
              "0 0 30px rgba(236,72,153,0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Explode hearts"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            ❤️
          </motion.span>
        </motion.button>
      </div>

      <p className="mt-6 text-sm text-white/40">{UI.heart.hint}</p>
    </section>
  );
}
