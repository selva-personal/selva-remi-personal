import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { UI } from "../data/content";
import { fireConfetti } from "../hooks/useConfetti";
import { SectionTitle } from "./ui/SectionTitle";

export function VirtualCake() {
  const [cut, setCut] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);

  const handleCut = () => {
    if (cut) return;
    setCut(true);
    setCandlesLit(false);
    fireConfetti("burst");
  };

  return (
    <section className="section-padding relative flex flex-col items-center">
      <SectionTitle title={UI.cake.title} subtitle={UI.cake.subtitle} />

      <motion.div
        className="relative cursor-pointer select-none"
        onClick={handleCut}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleCut()}
        aria-label="Cut the birthday cake"
      >
        {/* Candles */}
        <div className="mb-2 flex justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="flex flex-col items-center">
              <AnimatePresence>
                {candlesLit && (
                  <motion.div
                    className="mb-1 h-4 w-1 rounded-full bg-gradient-to-t from-yellow-300 to-orange-400"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                    style={{
                      boxShadow: "0 0 12px rgba(251,191,36,0.8)",
                    }}
                  />
                )}
              </AnimatePresence>
              <motion.div
                className="h-8 w-1.5 rounded-sm bg-gradient-to-b from-pink-200 to-pink-400"
                animate={cut ? { opacity: 0.5 } : {}}
              />
            </motion.div>
          ))}
        </div>

        {/* Cake layers */}
        <motion.div className="relative">
          <motion.div
            className="h-16 w-48 rounded-t-3xl bg-gradient-to-b from-pink-300 to-pink-500 shadow-lg sm:w-56 sm:h-20"
            style={{ boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.1)" }}
          />
          <motion.div
            className="h-12 w-52 -mt-1 rounded-lg bg-gradient-to-b from-purple-300 to-purple-500 sm:w-60 sm:h-14"
          />
          <motion.div
            className="h-10 w-56 -mt-1 rounded-b-2xl bg-gradient-to-b from-pink-400 to-pink-600 sm:w-64 sm:h-12"
          />

          {/* Frosting dots */}
          <motion.div className="absolute -top-2 left-1/2 flex -translate-x-1/2 gap-2">
            {["🍓", "✨", "🍓", "✨", "🍓"].map((e, i) => (
              <span key={i} className="text-sm">
                {e}
              </span>
            ))}
          </motion.div>

          {/* Cut animation */}
          <AnimatePresence>
            {cut && (
              <>
                <motion.div
                  className="absolute left-1/2 top-0 h-full w-0.5 bg-white/30"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="absolute left-0 top-1/4 h-1/2 w-1/2 origin-right"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -8, x: -4 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{
                    background: "linear-gradient(135deg, rgba(236,72,153,0.3), transparent)",
                    borderRadius: "0 0 0 50%",
                  }}
                />
                <motion.div
                  className="absolute right-0 top-1/4 h-1/2 w-1/2 origin-left"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 8, x: 4 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{
                    background: "linear-gradient(225deg, rgba(168,85,247,0.3), transparent)",
                    borderRadius: "0 0 50% 0",
                  }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="mt-6 text-center text-sm text-white/50"
          animate={{ opacity: cut ? 0.6 : 1 }}
        >
          {cut ? UI.cake.wishGranted : UI.cake.tapCut}
        </motion.p>
      </motion.div>
    </section>
  );
}
