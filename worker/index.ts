interface Env {
  ASSETS: {
    fetch: (input: Request) => Promise<Response>;
  };
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (path === "/rgbmatrixfx" || path === "/software") {
      url.pathname = "/";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
