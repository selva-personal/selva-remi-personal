import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SECRET_MESSAGE, UI } from "../data/content";
import { fireConfetti } from "../hooks/useConfetti";

export function SecretMessage() {
  const [revealed, setRevealed] = useState(false);
  const [clicks, setClicks] = useState(0);

  const handleSecretClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 3 && !revealed) {
      setRevealed(true);
      fireConfetti("light");
    }
  };

  return (
    <section className="section-padding relative flex flex-col items-center">
      <motion.button
        type="button"
        onClick={handleSecretClick}
        className="group relative rounded-full border border-dashed border-white/20 px-6 py-3 text-sm text-white/30 transition-all hover:border-pink-400/40 hover:text-white/50"
        whileHover={{ scale: 1.02 }}
      >
        <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-pink-400/60 whitespace-nowrap">
          {clicks > 0 ? UI.secret.tapsLeft(3 - clicks) : "?"}
        </span>
        {UI.secret.hint}
      </motion.button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            className="mt-8 max-w-lg rounded-2xl glass-strong p-8 text-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <span className="text-3xl">🔐</span>
            <p className="mt-4 font-accent text-lg leading-relaxed text-pink-100/90 italic">
              {SECRET_MESSAGE}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
