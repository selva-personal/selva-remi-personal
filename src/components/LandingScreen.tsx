import { motion } from "framer-motion";
import { CONFIG, UI } from "../data/content";
import { fireConfetti } from "../hooks/useConfetti";

interface LandingScreenProps {
  onOpen: () => void;
}

export function LandingScreen({ onOpen }: LandingScreenProps) {
  const handleOpen = () => {
    fireConfetti("burst");
    onOpen();
  };

  return (
    <motion.section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={CONFIG.landingPhoto}
          alt=""
          className="h-full w-full scale-110 object-cover object-center opacity-25 blur-[2px]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0612]/90 via-[#0a0612]/70 to-[#0a0612]/95" />
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.p
        className="relative font-display text-4xl font-bold text-gradient sm:text-6xl lg:text-7xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {UI.landing.greeting(CONFIG.herName)}
      </motion.p>

      <motion.p
        className="relative mt-4 font-display text-lg font-medium tracking-wide text-pink-300/90 sm:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
      >
        {UI.landing.yearsBadge(CONFIG.yearsOfLove)}
      </motion.p>

      <motion.p
        className="relative mt-4 max-w-md font-accent text-xl italic text-white/70 sm:mt-6 sm:text-2xl lg:max-w-lg lg:text-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {UI.landing.subtitle}
      </motion.p>

      <motion.div
        className="relative mt-12 sm:mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.button
          type="button"
          onClick={handleOpen}
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 px-10 py-4 text-lg font-medium text-white shadow-lg glow-pink sm:px-14 sm:py-5 sm:text-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">{UI.landing.button}</span>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-0 transition-opacity group-hover:opacity-100"
            layoutId="btn-shine"
          />
          <motion.span
            className="absolute -inset-1 rounded-full bg-pink-500/30 blur-xl"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>

      <motion.p
        className="relative mt-8 text-sm text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {UI.landing.hint}
      </motion.p>
    </motion.section>
  );
}
