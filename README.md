# SplatNet 3 Proxy

SplatNet 3 Proxy helps proxying SplatNet 3 requests via Cloudflare Workers.

## Usage

Proxy headers and payloads of supported domains from `https://splatnet3-proxy.<SUBDOMAIN>.workers.dev/url` to `url`.

### Supported domains

- https://accounts.nintendo.com/connect/1.0.0/api/session_token
- https://accounts.nintendo.com/connect/1.0.0/api/token
- https://api.accounts.nintendo.com/2.0.0/users/me
- https://api-lp1.znc.srv.nintendo.net/v3/Account/Login
- https://api-lp1.znc.srv.nintendo.net/v2/Game/GetWebServiceToken
- https://api.lp1.av5ja.srv.nintendo.net/api/bullet_tokens
- https://api.lp1.av5ja.srv.nintendo.net/api/graphql
- https://api.imink.app/f

## Deployment

Run the following command to deploy Cloudflare Workers. You are required to acquire a [Cloudflare](https://dash.cloudflare.com/) account and log into in [Wrangler](https://developers.cloudflare.com/workers/wrangler/) with `wrangler login` in advance.

```sh
wrangler publish
```

### Verify deployment

```sh
curl -X POST -H "Accept-Language: *" -H "Authorization: Bearer <BULLET_TOKEN>" -H "Content-Type: application/json" -H "X-Web-View-Ver: <SPLATNET_VERSION>" -d "{\"extensions\":{\"persistedQuery\":{\"sha256Hash\":\"<HASH>\",\"version\":1}}}" https://splatnet3-proxy.<SUBDOMAIN>.workers.dev/https://api.lp1.av5ja.srv.nintendo.net/api/graphql
```

## License

SplatNet 3 Proxy is licensed under [the MIT License](/LICENSE).