import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FLOATING_LOVE_MESSAGES } from "../../data/content";

export function FloatingLoveMessages({ active }: { active: boolean }) {
  const [message, setMessage] = useState<{ text: string; id: number; x: number } | null>(
    null
  );

  useEffect(() => {
    if (!active) return;

    const showMessage = () => {
      const text =
        FLOATING_LOVE_MESSAGES[Math.floor(Math.random() * FLOATING_LOVE_MESSAGES.length)];
      setMessage({
        text,
        id: Date.now(),
        x: 10 + Math.random() * 70,
      });
    };

    showMessage();
    const interval = setInterval(showMessage, 5000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {message && (
          <motion.div
            key={message.id}
            className="absolute bottom-24 max-w-[200px] rounded-2xl rounded-bl-sm glass px-4 py-2.5 text-sm text-white/90 shadow-lg sm:bottom-32 sm:max-w-[240px]"
            style={{ left: `${message.x}%` }}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mr-1.5 inline-block text-xs opacity-60">💬</span>
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
