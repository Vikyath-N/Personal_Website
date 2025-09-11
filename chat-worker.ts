export interface Env {
  OPENROUTER_API_KEY: string;
  OPENROUTER_DEFAULT_MODEL?: string;
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '*';

    const buildCors = (extra: HeadersInit = {}) => {
      return {
        'Access-Control-Allow-Origin': origin,
        'Vary': 'Origin',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-requested-with',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        ...extra,
      } as HeadersInit;
    };

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: buildCors() });
    }
    // Map /api/ask/ to OpenRouter chat completions
    if (url.pathname === '/api/ask/' || url.pathname === '/api/ask') {
      try {
        const body = await request.json().catch(() => ({}));
        const messages = body.messages ?? [
          { role: 'system', content: 'You are Vikyath\'s portfolio assistant.' },
          { role: 'user', content: body.question ?? '' },
        ];
        const model = body.model ?? env.OPENROUTER_DEFAULT_MODEL ?? 'openai/gpt-4o-mini';

        const upstream = await fetch(`${OPENROUTER_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://vikyath.me',
            'X-Title': 'Vikyath Portfolio',
          },
          body: JSON.stringify({ model, messages, stream: false }),
        });
        const text = await upstream.text();
        if (!upstream.ok) {
          return new Response(text || 'OpenRouter error', { status: upstream.status, headers: buildCors({ 'Cache-Control': 'no-store', 'Content-Type': 'application/json' }) });
        }
        const json = JSON.parse(text);
        const answer = json?.choices?.[0]?.message?.content ?? '';
        return Response.json({ answer, raw: json }, { headers: buildCors({ 'Cache-Control': 'no-store' }) });
      } catch (e: any) {
        return Response.json({ error: e?.message ?? 'internal error' }, { status: 500, headers: buildCors({ 'Cache-Control': 'no-store' }) });
      }
    }

    // Basic health check
    if (url.pathname === '/' || url.pathname === '/health') {
      return Response.json({ ok: true }, { headers: buildCors() });
    }

    return new Response('Not Found', { status: 404, headers: buildCors() });
  }
};


