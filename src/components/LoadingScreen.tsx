import { motion } from "framer-motion";
import { useEffect } from "react";
import { CONFIG, UI } from "../data/content";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0612]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="flex h-24 w-24 items-center justify-center rounded-full glass-strong glow-pink sm:h-28 sm:w-28"
          animate={{
            boxShadow: [
              "0 0 40px rgba(236,72,153,0.3)",
              "0 0 80px rgba(168,85,247,0.5)",
              "0 0 40px rgba(236,72,153,0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span
            className="text-4xl sm:text-5xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.span>
        </motion.div>

        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-pink-400/30"
            animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      <motion.p
        className="mt-8 font-display text-xl text-gradient sm:text-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {UI.loading(CONFIG.yearsOfLove)}
      </motion.p>

      <motion.div
        className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/10 sm:w-56"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
