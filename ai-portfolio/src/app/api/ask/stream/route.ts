import { OPENROUTER_BASE_URL, openRouterHeaders, defaultModel, type ORMessage } from "@/lib/openrouter";
import resumeData from "../../../../../content/resume.json";
import projectsData from "../../../../../content/projects.json";

export const runtime = "nodejs";

type Body = {
  messages?: ORMessage[];
  question?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  top_k?: number;
  tools?: unknown[];
  tool_choice?: unknown;
  provider?: Record<string, unknown>;
  user?: string;
};

export async function POST(req: Request) {
  const init = (await req.json()) as Body;
  const { question, model, ...rest } = init;
  let messages = init.messages;

  if (!messages && question) {
    // Create context from resume and projects data
    const context = `
About Vikyath Naradasi:

EDUCATION:
${resumeData.education.map(edu =>
  `- ${edu.degree} from ${edu.school} (${edu.years})\n  ${edu.details.join('\n  ')}`
).join('\n')}

EXPERIENCE:
${resumeData.experience.map(exp =>
  `- ${exp.role} at ${exp.company} (${exp.years})\n  ${exp.bullets.join('\n  ')}`
).join('\n')}

SKILLS:
${Object.entries(resumeData.skills).map(([category, skills]) =>
  `${category.toUpperCase()}: ${(skills as string[]).join(', ')}`
).join('\n')}

PROJECTS:
${projectsData.map(project =>
  `- ${project.title} (${project.year}): ${project.summary}\n  Technologies: ${project.stack.join(', ')}\n  Tags: ${project.tags.join(', ')}`
).join('\n')}
    `;

    messages = [
      {
        role: "system",
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
- For any non-portfolio questions, respond with: "I'm here to help you learn about Vikyath's background, skills, experience, and projects. I don't have information about [topic]. What would you like to know about Vikyath's work instead?"`
      },
      { role: "user", content: question }
    ];
  }
  if (!messages || !messages.length) {
    return new Response("messages or question required", { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const upstream = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: openRouterHeaders(),
    body: JSON.stringify({
      model: model ?? defaultModel,
      messages,
      stream: true,
      ...rest,
    }),
    // important—no caching for streams
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text();
    return new Response(text || "OpenRouter stream error", { status: upstream.status, headers: { "Cache-Control": "no-store" } });
  }

  // Pass-through SSE stream
  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
