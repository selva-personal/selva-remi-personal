import confetti from "canvas-confetti";

const romanticColors = ["#ec4899", "#f472b6", "#c084fc", "#e9d5ff", "#fce7f3", "#fbbf24"];

export function fireConfetti(intensity: "light" | "burst" = "burst") {
  const count = intensity === "burst" ? 120 : 60;
  const defaults = {
    origin: { y: 0.65 },
    colors: romanticColors,
    disableForReducedMotion: true,
  };

  confetti({
    ...defaults,
    particleCount: count,
    spread: 70,
    startVelocity: 45,
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count / 2),
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.65 },
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count / 2),
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.65 },
  });
}

export function fireHeartConfetti() {
  const scalar = 2;
  const heart = confetti.shapeFromText({ text: "❤️", scalar });
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.5,
    decay: 0.92,
    startVelocity: 25,
    shapes: [heart],
    scalar,
    colors: romanticColors,
    disableForReducedMotion: true,
  };

  confetti({ ...defaults, particleCount: 25, origin: { x: 0.5, y: 0.5 } });
}

export function fireFireworks(duration = 3000) {
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.5 },
      colors: romanticColors,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.5 },
      colors: romanticColors,
      disableForReducedMotion: true,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}
