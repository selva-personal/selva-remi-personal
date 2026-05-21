import { motion } from "framer-motion";
import { CONFIG, UI } from "../data/content";

export function BirthdayHero() {
  return (
    <section className="section-padding relative flex min-h-[70vh] flex-col items-center justify-center text-center">
      <motion.div
        className="flex w-full max-w-4xl flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute -inset-3 rounded-full bg-gradient-to-br from-pink-500/40 via-purple-500/30 to-pink-400/40 blur-xl"
            animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative h-44 w-44 overflow-hidden rounded-full border-2 border-white/20 shadow-2xl ring-4 ring-pink-500/20 sm:h-52 sm:w-52 md:h-56 md:w-56">
            <img
              src={CONFIG.heroPhoto}
              alt={`${CONFIG.herName} — the love of my life`}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <motion.span
            className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-lg shadow-lg sm:h-12 sm:w-12 sm:text-xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ❤️
          </motion.span>
        </motion.div>

        <motion.div
          className="mb-6 inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2 glow-pink"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="font-display text-3xl font-bold text-gradient sm:text-4xl">
            {CONFIG.yearsOfLove}
          </span>
          <span className="font-accent text-sm italic text-white/70 sm:text-base">
            {UI.hero.yearsLabel}
          </span>
        </motion.div>

        <motion.span
          className="mb-4 inline-block text-5xl sm:text-6xl"
          animate={{ rotate: [0, 10, -10, 0], y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🎂
        </motion.span>

        <h1 className="font-display text-4xl font-bold leading-tight text-gradient sm:text-5xl md:text-6xl lg:text-7xl">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {UI.hero.happyBirthday}
          </motion.span>
          <br />
          <motion.span
            className="inline-block bg-gradient-to-r from-pink-300 via-purple-300 to-pink-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {CONFIG.herName} 🎂❤️
          </motion.span>
        </h1>

        <motion.div
          className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-pink-400/60 to-transparent sm:w-48"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        <motion.p
          className="mt-6 font-accent text-xl italic text-white/60 sm:text-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          {UI.hero.subtitle(CONFIG.yearsOfLove, CONFIG.herName)}
        </motion.p>
      </motion.div>
    </section>
  );
}
