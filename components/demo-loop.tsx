"use client";

import { useEffect, useRef } from "react";

export function DemoLoop() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.pause();
      video.removeAttribute("autoplay");
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="h-auto w-full rounded-xl ring-1 ring-[#44d62c]/25"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/software/demo-poster.webp"
      width={720}
      height={270}
      aria-label="RGBMatrixFX Flame effect, looping preview"
    >
      <source src="/software/demo.webm" type="video/webm" />
      <source src="/software/demo.mp4" type="video/mp4" />
    </video>
  );
}
