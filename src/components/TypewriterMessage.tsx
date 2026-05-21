import { motion } from "framer-motion";
import { TYPEWRITER_MESSAGE, UI } from "../data/content";
import { useTypewriter } from "../hooks/useTypewriter";
import { GlassCard } from "./ui/GlassCard";
import { SectionTitle } from "./ui/SectionTitle";

export function TypewriterMessage() {
  const { displayed, done } = useTypewriter(TYPEWRITER_MESSAGE, 35, 300);

  return (
    <section className="section-padding relative max-w-4xl mx-auto">
      <SectionTitle title={UI.letter.title} subtitle={UI.letter.subtitle} />
      <GlassCard
        className="p-6 sm:p-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-accent text-lg leading-relaxed text-white/85 sm:text-xl sm:leading-loose">
          {displayed}
          {!done && (
            <motion.span
              className="ml-0.5 inline-block h-5 w-0.5 bg-pink-400 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </p>
      </GlassCard>
    </section>
  );
}
