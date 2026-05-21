import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ROMANTIC_QUOTES, UI } from "../data/content";
import { GlassCard } from "./ui/GlassCard";
import { SectionTitle } from "./ui/SectionTitle";

export function QuotesCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % ROMANTIC_QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const quote = ROMANTIC_QUOTES[index];

  return (
    <section className="section-padding relative max-w-3xl mx-auto">
      <SectionTitle title={UI.quotes.title} />
      <GlassCard strong className="relative min-h-[180px] p-8 sm:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="font-display text-xl italic leading-relaxed text-gradient-gold sm:text-2xl lg:text-3xl">
              &ldquo;{quote.text}&rdquo;
            </p>
            <p className="mt-6 font-accent text-lg text-white/50">— {quote.author}</p>
          </motion.div>
        </AnimatePresence>

        <motion.div className="mt-8 flex justify-center gap-2">
          {ROMANTIC_QUOTES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-pink-400" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </motion.div>
      </GlassCard>
    </section>
  );
}
