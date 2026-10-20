// Light Halloween decoration. Rendered only when built with
// NEXT_PUBLIC_HOLIDAY_THEME=halloween; otherwise nothing ships.
// Decorative only: fixed, pointer-events:none, sits below the sticky header (z-40),
// menus and <dialog> popups (top layer).

function Web({ flip }: { flip?: boolean }) {
  // Corner web anchored at (0,0): radial strands + sagging spiral threads. Strokes only.
  const angles = [0, 15, 30, 45, 60, 75, 90];
  const rings = [30, 55, 82, 110, 140];
  const pt = (r: number, a: number) => {
    const t = (a * Math.PI) / 180;
    return [r * Math.cos(t), r * Math.sin(t)];
  };
  const rays = angles.map((a) => {
    const [x, y] = pt(170, a);
    return `M0 0L${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  const arcs = rings.map((r) => {
    let d = "";
    angles.forEach((a, i) => {
      const [x, y] = pt(r, a);
      if (i === 0) d += `M${x.toFixed(1)} ${y.toFixed(1)}`;
      else {
        const [cx, cy] = pt(r * 0.86, a - 7.5);
        d += `Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
    });
    return d;
  });
  return (
    <svg
      viewBox="0 0 170 170"
      className={`hw-web ${flip ? "hw-right" : "hw-left"}`}
      fill="none"
      aria-hidden="true"
    >
      <path d={[...rays, ...arcs].join("")} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="hw-strand" />
    </svg>
  );
}

export function HalloweenOverlay() {
  if (process.env.NEXT_PUBLIC_HOLIDAY_THEME !== "halloween") return null;
  return (
    <div className="hw-overlay" aria-hidden="true">
      <Web />
      <Web flip />
      <div className="hw-spider">
        <svg viewBox="0 0 24 90" fill="none" overflow="visible">
          <line x1="12" y1="0" x2="12" y2="72" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
            <path d="M9 76l-6-4M9 79l-7 0M9 81l-6 4M10 83l-4 5M15 76l6-4M15 79l7 0M15 81l6 4M14 83l4 5" />
          </g>
          <ellipse cx="12" cy="80" rx="3.6" ry="4.6" fill="currentColor" />
          <circle cx="12" cy="74.5" r="2.4" fill="currentColor" />
        </svg>
      </div>
      <div className="hw-bat">
        <svg viewBox="0 0 64 28" fill="currentColor">
          <path className="hw-wing-l" d="M32 12C27 5 18 3 2 8c5 2 7 6 6 10 4-3 8-2 10 2 3-4 8-5 12-2z" />
          <path className="hw-wing-r" d="M32 12c5-7 14-9 30-4-5 2-7 6-6 10-4-3-8-2-10 2-3-4-8-5-12-2z" />
          <path d="M28 10l1-5 2 4h2l2-4 1 5c1 4-1 9-4 10-3-1-5-6-4-10z" />
        </svg>
      </div>
    </div>
  );
}
