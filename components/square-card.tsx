// Shared pieces of the Square card step (Buy Pro and Donate popups).
import { cn } from "cn";

/** Holds the space of Square's two-line card form (97px iframe + 45px message line) until it loads. */
export function CardSkeleton() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 animate-pulse overflow-hidden rounded-xl bg-[#111c2f] ring-1 ring-[#2a3344] ring-inset"
      >
        <div className="flex h-12 items-center px-3.5">
          <div className="h-2.5 w-28 rounded-full bg-[#2a3344]" />
        </div>
        <div className="grid h-12 grid-cols-3 items-center border-t border-[#2a3344] px-3.5">
          <div className="h-2.5 w-12 rounded-full bg-[#2a3344]" />
          <div className="h-2.5 w-10 rounded-full bg-[#2a3344]" />
          <div className="h-2.5 w-10 rounded-full bg-[#2a3344]" />
        </div>
      </div>
      <span className="sr-only" role="status">Loading card form…</span>
    </>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <p role="alert" className={cn("text-sm text-destructive", !message && "sr-only")}>
      {message}
    </p>
  );
}
