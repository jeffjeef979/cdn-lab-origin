// Endpoint (a): returns the incoming HTTP request headers in the response body.
// Marked no-store so the CDN never caches it: every request must reach the origin
// so you can see the headers the CDN adds on origin fetch (Via, X-Forwarded-For, etc.).
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).send(
    JSON.stringify(
      {
        endpoint: '/headers',
        method: req.method,
        url: req.url,
        servedAt: new Date().toISOString(),
        requestHeaders: req.headers,
      },
      null,
      2
    )
  );
}
