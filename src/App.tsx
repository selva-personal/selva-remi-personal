import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BackgroundEffects } from "./components/effects/BackgroundEffects";
import { FloatingLoveMessages } from "./components/effects/FloatingLoveMessages";
import { LandingScreen } from "./components/LandingScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { MainContent } from "./components/MainContent";
import { MusicPlayer } from "./components/MusicPlayer";

type AppPhase = "loading" | "landing" | "main";

export default function App() {
  const [phase, setPhase] = useState<AppPhase>("loading");
  const [musicStarted, setMusicStarted] = useState(false);

  const showMusic = phase === "landing" || phase === "main";

  return (
    <motion.div className="relative min-h-screen">
      <BackgroundEffects />

      {showMusic && (
        <MusicPlayer autoPlay startNow={musicStarted} />
      )}

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <LoadingScreen key="loading" onComplete={() => setPhase("landing")} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === "landing" && (
          <LandingScreen
            key="landing"
            onOpen={() => {
              setMusicStarted(true);
              setPhase("main");
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "main" && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <MainContent />
            <FloatingLoveMessages active />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
