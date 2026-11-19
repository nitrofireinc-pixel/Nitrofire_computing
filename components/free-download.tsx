"use client";

import type { ComponentProps } from "react";
import {
  hasDownloadDonateBeenSeen,
  requestDownloadDonateCard,
  startFreeDownload,
} from "@/lib/donate";
import { donateEnabled, rgb } from "@/lib/site";

/**
 * Free RGBMatrixFX download link. When donations are enabled and the thank-you
 * card has not been dismissed, the releases page opens in a new tab and the
 * card appears. Otherwise this is a normal same-tab link.
 */
export function FreeDownloadLink({
  href = rgb.releases,
  onClick,
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || !donateEnabled || hasDownloadDonateBeenSeen()) return;
        event.preventDefault();
        startFreeDownload(href);
        requestDownloadDonateCard();
      }}
      {...props}
    />
  );
}
