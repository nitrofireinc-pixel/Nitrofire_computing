interface Env {
  ASSETS: {
    fetch: (input: Request) => Promise<Response>;
  };
}

// The site is a static export. /software and /rgbmatrixfx are pages.
// Files under /software/ (screenshots, the social image) are assets.
const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
};

export default worker;
