import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CONFIG, UI } from "../data/content";
import { GlassCard } from "./ui/GlassCard";
import { SectionTitle } from "./ui/SectionTitle";

interface TimeUnit {
  value: number;
  label: string;
}

function getTimeSince(date: Date): TimeUnit[] {
  const now = new Date();
  let diff = now.getTime() - date.getTime();
  if (diff < 0) diff = 0;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const years = Math.floor(days / 365);
  const remainingDays = days % 365;
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  const units: TimeUnit[] = [];
  if (years > 0) units.push({ value: years, label: UI.countdown.years });
  units.push(
    { value: remainingDays, label: UI.countdown.days },
    { value: remainingHours, label: UI.countdown.hours },
    { value: remainingMinutes, label: UI.countdown.minutes },
    { value: remainingSeconds, label: UI.countdown.seconds }
  );
  return units;
}

export function MeetCountdown() {
  const [units, setUnits] = useState<TimeUnit[]>(() =>
    getTimeSince(CONFIG.firstMetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setUnits(getTimeSince(CONFIG.firstMetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding relative max-w-5xl mx-auto">
      <SectionTitle
        title={UI.countdown.title(CONFIG.yearsOfLove)}
        subtitle={UI.countdown.subtitle}
      />
      <motion.div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {units.map((unit, i) => (
          <GlassCard
            key={unit.label}
            className="p-4 text-center sm:p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -4 }}
          >
            <motion.span
              key={unit.value}
              className="block font-display text-3xl font-bold text-gradient sm:text-4xl"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {String(unit.value).padStart(2, "0")}
            </motion.span>
            <span className="mt-1 block text-xs uppercase tracking-widest text-white/50 sm:text-sm">
              {unit.label}
            </span>
          </GlassCard>
        ))}
      </motion.div>
    </section>
  );
}
