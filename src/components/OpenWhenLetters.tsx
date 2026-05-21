import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { OPEN_WHEN_LETTERS, UI } from "../data/content";
import { GlassCard } from "./ui/GlassCard";
import { SectionTitle } from "./ui/SectionTitle";

export function OpenWhenLetters() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding relative max-w-5xl mx-auto">
      <SectionTitle title={UI.openWhen.title} subtitle={UI.openWhen.subtitle} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OPEN_WHEN_LETTERS.map((letter, i) => (
          <motion.button
            key={letter.subtitle}
            type="button"
            className="text-left"
            initial={{ opacity: 0, rotateY: -20 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setOpenIndex(i)}
          >
            <GlassCard
              className="group p-6 transition-all hover:border-pink-400/30"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-3xl">{letter.emoji}</span>
              <p className="mt-3 text-xs uppercase tracking-widest text-pink-400/80">
                {letter.label}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-white">
                {letter.subtitle}
              </h3>
              <p className="mt-3 text-sm text-white/40 group-hover:text-white/60 transition-colors">
                {UI.openWhen.tapOpen}
              </p>
            </GlassCard>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              className="max-w-md rounded-2xl glass-strong p-8 text-center"
              initial={{ scale: 0.8, rotateX: 20 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-5xl">{OPEN_WHEN_LETTERS[openIndex].emoji}</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-gradient">
                {OPEN_WHEN_LETTERS[openIndex].subtitle}
              </h3>
              <p className="mt-6 font-accent text-lg leading-relaxed text-white/80">
                {OPEN_WHEN_LETTERS[openIndex].message}
              </p>
              <button
                type="button"
                className="mt-8 rounded-full bg-white/10 px-6 py-2 text-sm text-white/70 hover:bg-white/20 transition-colors"
                onClick={() => setOpenIndex(null)}
              >
                {UI.openWhen.seal}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
