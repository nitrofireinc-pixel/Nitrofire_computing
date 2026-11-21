"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop illustration of OnionFruitux: a looping off-to-on switch,
 * with the still image used as the poster and for reduced motion.
 */
export function OnionDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const reduce = media.matches;
      setReduceMotion(reduce);
      const video = videoRef.current;
      if (!video) return;
      if (reduce) {
        video.pause();
        video.removeAttribute("autoplay");
      }
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const still = (
    <img
      src="/software/onionfruitux/desktop-on.webp"
      alt="Illustration of a Linux desktop with the OnionFruitux window open, the switch on, and the exit country set to the United States."
      width={1440}
      height={900}
      className="h-auto w-full"
    />
  );

  if (reduceMotion) {
    return still;
  }

  return (
    <video
      ref={videoRef}
      className="h-auto w-full"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/software/onionfruitux/desktop-on.webp"
      width={1280}
      height={800}
      aria-label="Illustration of OnionFruitux on a Linux desktop. The switch turns from off, through connecting, to on."
    >
      <source src="/software/onionfruitux/desktop-switch.webm" type="video/webm" />
      <source src="/software/onionfruitux/desktop-switch.mp4" type="video/mp4" />
      <img
        src="/software/onionfruitux/desktop-switch.gif"
        alt="Illustration of OnionFruitux on a Linux desktop. The switch turns from off, through connecting, to on."
        width={800}
        height={500}
      />
    </video>
  );
}

export function OnionStill({ className }: { className?: string }) {
  return (
    <img
      src="/software/onionfruitux/desktop-on.webp"
      alt="Illustration of a Linux desktop with the OnionFruitux window open and the switch on."
      width={1440}
      height={900}
      className={className ?? "h-auto w-full"}
    />
  );
}
