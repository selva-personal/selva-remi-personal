import { motion } from "framer-motion";
import { REASONS_I_LOVE_YOU, UI } from "../data/content";
import { GlassCard } from "./ui/GlassCard";
import { SectionTitle } from "./ui/SectionTitle";

export function ReasonsILoveYou() {
  return (
    <section className="section-padding relative max-w-6xl mx-auto">
      <SectionTitle title={UI.reasons.title} subtitle={UI.reasons.subtitle} />

      <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REASONS_I_LOVE_YOU.map((reason, i) => (
          <GlassCard
            key={reason.title}
            className="group cursor-default p-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.6 }}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 60px rgba(236,72,153,0.25)",
            }}
          >
            <motion.span
              className="text-4xl"
              whileHover={{ scale: 1.3, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {reason.emoji}
            </motion.span>
            <h3 className="mt-4 font-display text-lg font-semibold text-white group-hover:text-gradient-gold transition-colors">
              {reason.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              {reason.text}
            </p>
            <motion.div
              className="mt-4 h-0.5 w-0 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-500"
            />
          </GlassCard>
        ))}
      </motion.div>
    </section>
  );
}
