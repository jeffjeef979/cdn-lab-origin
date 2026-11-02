# CDN Lab Origin

Origin web server for the BytePlus CDN Product Architect homework lab, deployed on Vercel (Hobby, free).

| Path | Requirement | Caching intent |
|---|---|---|
| `/headers` | (a) returns request headers in the body | `no-store`, always hits origin |
| `/hello` | (b) custom serverless code (Node.js) | `no-store`, dynamic HTML |
| `/static/edge.png` | (c) image embedded in `/hello` | cached at CDN edge via caching rule |

## Deploy
1. Push this folder to a new GitHub repo.
2. vercel.com → Add New → Project → import the repo → Deploy (no settings needed).
3. Test: `curl https://<project>.vercel.app/headers`

## Note on cache behaviour
Vercel serves static files with `Cache-Control: public, max-age=0, must-revalidate`.
So with BytePlus default settings (honour origin), the image is **not** cached ("before").
Adding a BytePlus caching rule for `/static/*` overrides this and the image becomes a HIT ("after").
