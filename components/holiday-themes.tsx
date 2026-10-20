"use client";
// Non-Halloween holiday themes. Selected at build time by NEXT_PUBLIC_HOLIDAY_THEME
// ('halloween' is handled by HalloweenOverlay; unset = nothing). Client-only mount.
import { useEffect } from "react";
import { mountHolidayTheme } from "@/lib/holiday-themes";

export function HolidayThemes() {
  const key = (process.env.NEXT_PUBLIC_HOLIDAY_THEME || "").trim().toLowerCase();
  useEffect(() => {
    if (!key || key === "halloween") return;
    const cleanup = mountHolidayTheme(key);
    return () => cleanup?.();
  }, [key]);
  return null;
}
