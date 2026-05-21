import { motion } from "framer-motion";
import { MEMORIES, UI } from "../data/content";
import { SectionTitle } from "./ui/SectionTitle";

export function MemoryTimeline() {
  return (
    <section className="section-padding relative max-w-3xl mx-auto">
      <SectionTitle title={UI.timeline.title} subtitle={UI.timeline.subtitle} />

      <motion.div className="relative space-y-10 sm:space-y-12">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-pink-500/60 via-purple-500/40 to-transparent sm:left-1/2" />

        {MEMORIES.map((memory, i) => (
          <motion.div
            key={memory.title}
            className={`relative flex ${i % 2 === 0 ? "sm:justify-start" : "sm:justify-end"}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <div className="absolute left-0 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg glow-pink sm:left-1/2 sm:-translate-x-1/2">
              <span className="h-2 w-2 rounded-full bg-white" />
            </div>

            <motion.div className="ml-12 w-full sm:ml-0 sm:w-[calc(50%-2rem)]">
              <TimelineCard memory={memory} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function TimelineCard({ memory }: { memory: (typeof MEMORIES)[0] }) {
  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <span className="font-display text-sm font-semibold text-pink-400">
        {memory.year}
      </span>
      <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
        {memory.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">
        {memory.description}
      </p>
    </div>
  );
}
