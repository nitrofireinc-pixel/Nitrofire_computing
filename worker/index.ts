interface Fetcher {
  fetch: (input: Request) => Promise<Response>;
}

interface Env {
  ASSETS: Fetcher;
  // Service binding to the license Worker (rgbmatrixfx-license, or rgbmatrixfx-license-staging on staging).
  LICENSE?: Fetcher;
}

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

// The site is a static export. /software and /rgbmatrixfx are pages.
// Files under /software/ (screenshots, the social image) are assets.
// /api/checkout* (the Buy Pro popup) is forwarded to the license Worker, so the
// browser only ever talks to this origin.
const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/checkout" || url.pathname.startsWith("/api/checkout/")) {
      if (!env.LICENSE) {
        return json({ error: "Checkout isn't available right now. Please try again later.", code: "not_configured" }, 503);
      }
      const target = new URL(url.pathname + url.search, "https://license.internal");
      return env.LICENSE.fetch(new Request(target, request));
    }
    if (url.pathname.startsWith("/api/")) return json({ error: "not found" }, 404);
    return env.ASSETS.fetch(request);
  },
};

export default worker;
