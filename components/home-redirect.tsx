"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-20 text-center">
      <p className="text-sm text-muted-foreground">
        RGBMatrixFX is on the{" "}
        <Link href="/" className="text-brand-blue hover:underline">
          home page
        </Link>
        .
      </p>
    </div>
  );
}
