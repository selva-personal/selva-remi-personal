import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CONFIG, UI } from "../data/content";
import { PLAYER_ELEMENT_ID, useYouTubePlayer } from "../hooks/useYouTubePlayer";

interface MusicPlayerProps {
  /** Try muted autoplay when player is ready */
  autoPlay?: boolean;
  /** Unmute and play (use after user taps Open Surprise) */
  startNow?: boolean;
}

export function MusicPlayer({ autoPlay = false, startNow = false }: MusicPlayerProps) {
  const [volume, setVolumeState] = useState(0.5);
  const {
    ready,
    playing,
    muted,
    play,
    pause,
    toggleMute,
    unmute,
    setVolume,
    startPlayback,
    tryAutoplayMuted,
  } = useYouTubePlayer(CONFIG.youtubeVideoId);

  useEffect(() => {
    if (ready && autoPlay) {
      tryAutoplayMuted();
    }
  }, [ready, autoPlay, tryAutoplayMuted]);

  useEffect(() => {
    if (ready && startNow) {
      startPlayback();
    }
  }, [ready, startNow, startPlayback]);

  const togglePlay = () => {
    if (playing) pause();
    else play();
  };

  const handleVolume = (v: number) => {
    setVolumeState(v);
    setVolume(v);
    if (v > 0 && muted) unmute();
  };

  return (
    <>
      {/* Hidden YouTube player — audio only */}
      <div
        id={PLAYER_ELEMENT_ID}
        className="pointer-events-none fixed -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      />

      <motion.div
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-2xl glass-strong px-3 py-2.5 sm:bottom-6 sm:right-6 sm:gap-3 sm:px-4 sm:py-3"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.button
          type="button"
          onClick={togglePlay}
          disabled={!ready}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-md disabled:opacity-50 sm:h-11 sm:w-11"
          whileHover={{ scale: ready ? 1.08 : 1 }}
          whileTap={{ scale: ready ? 0.95 : 1 }}
          aria-label={playing ? "Pause music" : "Play music"}
        >
          {playing ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>

        <motion.div
          className="hidden sm:block"
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { duration: 4, repeat: Infinity, ease: "linear" } : {}}
        >
          <span className="text-lg">🎵</span>
        </motion.div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={toggleMute}
            disabled={!ready}
            className="text-white/60 hover:text-white transition-colors disabled:opacity-50"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => handleVolume(parseFloat(e.target.value))}
            className="h-1 w-16 cursor-pointer accent-pink-500"
            aria-label="Volume"
            disabled={!ready}
          />
        </div>

        {!ready && (
          <span className="text-[10px] text-white/40 sm:text-xs">{UI.music.loading}</span>
        )}
      </motion.div>
    </>
  );
}
