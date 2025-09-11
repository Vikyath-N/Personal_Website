export interface Env {
  OPENROUTER_API_KEY: string;
  OPENROUTER_DEFAULT_MODEL?: string;
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1';
// Static portfolio data bundled into the Worker at build time
// Using relative imports so wrangler/esbuild packs the JSON
// These files live in the Next project and are source-of-truth
// for Vikyath's portfolio content.
// eslint-disable-next-line @typescript-eslint/no-var-requires
// @ts-ignore - esbuild will inline JSON
import resumeData from './ai-portfolio/content/resume.json';
// @ts-ignore - esbuild will inline JSON
import projectsData from './ai-portfolio/content/projects.json';

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
        let messages = body.messages as
          | { role: 'system' | 'user' | 'assistant'; content: string }[]
          | undefined;

        // Build rich context from bundled JSON when only a question is provided
        if (!messages && body.question) {
          const context = `
About Vikyath Naradasi:

EDUCATION:
${(resumeData as any).education
  .map((edu: any) => `- ${edu.degree} from ${edu.school} (${edu.years})\n  ${edu.details.join('\n  ')}`)
  .join('\n')}

EXPERIENCE:
${(resumeData as any).experience
  .map((exp: any) => `- ${exp.role} at ${exp.company} (${exp.years})\n  ${exp.bullets.join('\n  ')}`)
  .join('\n')}

SKILLS:
${Object.entries((resumeData as any).skills)
  .map(([category, skills]) => `${(category as string).toUpperCase()}: ${(skills as string[]).join(', ')}`)
  .join('\n')}

PROJECTS:
${(projectsData as any)
  .map(
    (p: any) =>
      `- ${p.name || p.title} (${p.year ?? ''}): ${(p.summary || p.description?.[0] || '').toString()}\n  Technologies: ${(p.stack || p.skills || []).join(', ')}\n  Tags: ${(p.tags || []).join(', ')}`
  )
  .join('\n')}
`;

          messages = [
            {
              role: 'system',
              content: `You are Vikyath's portfolio assistant. You ONLY answer questions about Vikyath Naradasi's background, skills, experience, and projects.

CRITICAL RULES:
- ONLY answer questions directly related to Vikyath's portfolio, work, education, skills, or projects
- If asked about anything else (jokes, general topics, cooking, entertainment, etc.), politely decline and redirect to portfolio topics
- Do NOT provide answers to non-portfolio questions, even if you know the answer
- Always redirect back to Vikyath's portfolio content

Use the following information to answer questions accurately and conversationally:

${context}

Guidelines:
- Be friendly and professional
- Answer based only on the provided information
- If you don't have specific information about Vikyath, say so politely
- Keep responses concise but informative
- You can elaborate on technical details when asked
- If asked about contact or availability, suggest they can reach out through the website
- For any non-portfolio questions, respond with: "I'm here to help you learn about Vikyath's background, skills, experience, and projects. I don't have information about [topic]. What would you like to know about Vikyath's work instead?"`,
            },
            { role: 'user', content: body.question },
          ];
        }
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
        const answer =
          json?.choices?.[0]?.message?.content ??
          json?.choices?.[0]?.delta?.content ??
          '';
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


