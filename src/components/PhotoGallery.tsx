import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GALLERY_PHOTOS, UI } from "../data/content";
import { SectionTitle } from "./ui/SectionTitle";

export function PhotoGallery() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const active = GALLERY_PHOTOS.find((p) => p.id === activeId);

  return (
    <section className="section-padding relative">
      <SectionTitle title={UI.gallery.title} subtitle={UI.gallery.subtitle} />

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5">
        {GALLERY_PHOTOS.map((photo, i) => {
          const isFeatured = photo.featured === true;
          return (
            <motion.button
              key={photo.id}
              type="button"
              className={`group relative overflow-hidden rounded-2xl glass focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                isFeatured
                  ? "col-span-2 row-span-2 min-h-[320px] md:min-h-[420px]"
                  : "aspect-[3/4]"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveId(photo.id)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading={i < 4 ? "eager" : "lazy"}
              />
              <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
              <p className="absolute bottom-0 left-0 right-0 p-3 text-left text-sm font-medium text-white sm:p-4 sm:text-base">
                {photo.caption}
              </p>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
            role="dialog"
            aria-modal
            aria-label="Photo preview"
          >
            <motion.div
              className="relative max-h-[90vh] max-w-md overflow-hidden rounded-2xl glass-strong sm:max-w-lg"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[75vh] w-full object-contain bg-black/20"
              />
              <p className="p-4 text-center font-accent text-lg italic text-white/85">
                {active.caption}
              </p>
              <button
                type="button"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80"
                onClick={() => setActiveId(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
