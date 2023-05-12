const SUPPORTED_DOMAINS = [
  "https://accounts.nintendo.com/connect/1.0.0/api/session_token",
  "https://accounts.nintendo.com/connect/1.0.0/api/token",
  "https://api.accounts.nintendo.com/2.0.0/users/me",
  "https://api-lp1.znc.srv.nintendo.net/v3/Account/Login",
  "https://api-lp1.znc.srv.nintendo.net/v2/Game/GetWebServiceToken",
  "https://api.lp1.av5ja.srv.nintendo.net/api/bullet_tokens",
  "https://api.lp1.av5ja.srv.nintendo.net/api/graphql",
  "https://api.imink.app/f",
];

export default {
  async fetch(request: Request): Promise<Response> {
    const url = request.url;
    const path = url.split("/").slice(3).join("/");
    if (SUPPORTED_DOMAINS.includes(path)) {
      const method = request.method;
      const headers = new Map(request.headers);
      if (headers.has("X-Forwarded-Host")) {
        headers.set("Host", headers.get("X-Forwarded-Host")!);
      }
      return fetch(path, {
        method,
        headers,
        body:
          method !== "GET" && method !== "HEAD"
            ? await request.text()
            : undefined,
      });
    }
    return new Response(`Domain "${path}" unsupported`, {
      status: 404,
    });
  },
};
