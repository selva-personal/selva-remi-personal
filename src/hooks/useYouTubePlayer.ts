import { useCallback, useEffect, useRef, useState } from "react";
import type { YTPlayer } from "../types/youtube";

const PLAYER_ELEMENT_ID = "youtube-background-player";

function loadYouTubeAPI(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();

  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };

    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const poll = setInterval(() => {
        if (window.YT?.Player) {
          clearInterval(poll);
          resolve();
        }
      }, 100);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });
}

export function useYouTubePlayer(videoId: string) {
  const playerRef = useRef<YTPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      await loadYouTubeAPI();
      if (cancelled || !window.YT?.Player) return;

      if (!document.getElementById(PLAYER_ELEMENT_ID)) return;

      playerRef.current = new window.YT.Player(PLAYER_ELEMENT_ID, {
        height: "0",
        width: "0",
        videoId,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return;
            event.target.mute();
            event.target.setVolume(50);
            setReady(true);
          },
          onStateChange: (event) => {
            const YT = window.YT!;
            setPlaying(event.data === YT.PlayerState.PLAYING);
          },
        },
      });
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [videoId]);

  const play = useCallback(() => {
    playerRef.current?.playVideo();
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo();
    setPlaying(false);
  }, []);

  const unmute = useCallback(() => {
    playerRef.current?.unMute();
    setMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (player.isMuted()) {
      player.unMute();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    playerRef.current?.setVolume(Math.round(volume * 100));
  }, []);

  const startPlayback = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.unMute();
    setMuted(false);
    player.playVideo();
    setPlaying(true);
  }, []);

  const tryAutoplayMuted = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.mute();
    setMuted(true);
    player.playVideo();
  }, []);

  return {
    ready,
    playing,
    muted,
    play,
    pause,
    unmute,
    toggleMute,
    setVolume,
    startPlayback,
    tryAutoplayMuted,
  };
}

export { PLAYER_ELEMENT_ID };
