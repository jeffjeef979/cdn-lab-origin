// Endpoint (a): returns request headers in the body, with secrets redacted.
const SENSITIVE = /cookie|authorization|token|signature|forwarded$/i;

export default function handler(req, res) {
  const headers = {};
  for (const [k, v] of Object.entries(req.headers)) {
    headers[k] = SENSITIVE.test(k) ? '[redacted]' : v;
  }
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).send(JSON.stringify({
    endpoint: '/headers',
    method: req.method,
    url: req.url,
    servedAt: new Date().toISOString(),
    requestHeaders: headers,
  }, null, 2));
}
