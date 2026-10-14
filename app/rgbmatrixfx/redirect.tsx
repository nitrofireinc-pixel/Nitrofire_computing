"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function RgbRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/software");
  }, [router]);

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-20 text-center">
      <p className="text-sm text-muted-foreground">
        RGBMatrixFX is on the{" "}
        <a href="/software" className="text-brand-blue hover:underline">
          software page
        </a>
        .
      </p>
    </div>
  );
}
