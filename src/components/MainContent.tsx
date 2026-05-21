import { motion } from "framer-motion";
import { BirthdayHero } from "./BirthdayHero";
import { FinalSurprise } from "./FinalSurprise";
import { HeartExplosionButton } from "./HeartExplosionButton";
import { MeetCountdown } from "./MeetCountdown";
import { MemoryTimeline } from "./MemoryTimeline";
import { OpenWhenLetters } from "./OpenWhenLetters";
import { PhotoGallery } from "./PhotoGallery";
import { QuotesCarousel } from "./QuotesCarousel";
import { ReasonsILoveYou } from "./ReasonsILoveYou";
import { SecretMessage } from "./SecretMessage";
import { TypewriterMessage } from "./TypewriterMessage";
import { VirtualCake } from "./VirtualCake";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export function MainContent() {
  return (
    <motion.main
      className="relative z-10"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <BirthdayHero />
      <TypewriterMessage />
      <QuotesCarousel />
      <MeetCountdown />
      <PhotoGallery />
      <MemoryTimeline />
      <ReasonsILoveYou />
      <OpenWhenLetters />
      <VirtualCake />
      <HeartExplosionButton />
      <SecretMessage />
      <FinalSurprise />
    </motion.main>
  );
}
