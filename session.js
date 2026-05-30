// api/session.js — Persistance de session · Upstash Redis · Vercel serverless
const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const SESSION_TTL   = 60 * 60 * 24 * 90; // 90 jours

async function redis(command, ...args) {
  const res = await fetch(`${UPSTASH_URL}/${command}/${args.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Redis error');
  return json.result;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return res.status(500).json({ error: 'Session backend not configured' });
  }

  const { id } = req.method === 'GET' || req.method === 'DELETE'
    ? req.query
    : req.body;

  if (!id) return res.status(400).json({ error: 'Session id required' });

  // Clé Redis spécifique BC01 REDA
  const key = `lumio:reda-bc01:session:${id}`;

  try {
    if (req.method === 'GET') {
      const raw = await redis('GET', key);
      if (!raw) return res.status(404).json({ session: null });
      return res.status(200).json({ session: JSON.parse(raw) });
    }

    if (req.method === 'POST') {
      const { session } = req.body;
      if (!session) return res.status(400).json({ error: 'Session data required' });

      let existing = {};
      try {
        const raw = await redis('GET', key);
        if (raw) existing = JSON.parse(raw);
      } catch {}

      const merged = { ...existing, ...session, lastSaved: Date.now() };
      await redis('SET', key, JSON.stringify(merged), 'EX', SESSION_TTL);
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      await redis('DEL', key);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Session error:', error);
    return res.status(500).json({ error: 'Session error', detail: error.message });
  }
}
