export const OPENROUTER_BASE_URL =
  process.env.NEXT_PUBLIC_CHAT_API_BASE_URL // Prefer Cloudflare Worker when provided
    ?? process.env.OPENROUTER_BASE_URL
    ?? "https://openrouter.ai/api/v1";

const referer = process.env.OPENROUTER_SITE_URL;
const title = process.env.OPENROUTER_APP_TITLE;

export const openRouterHeaders = () => {
  const h: Record<string,string> = {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  };
  if (referer) h["HTTP-Referer"] = referer;
  if (title) h["X-Title"] = title;
  return h;
};

export const defaultModel =
  process.env.OPENROUTER_DEFAULT_MODEL ?? "openai/gpt-4o-mini";

export type ORMessage =
  | { role: "system" | "user" | "assistant"; content: string | Array<{type:"text"; text:string} | {type:"image_url"; image_url:{url:string; detail?:string}}>; name?: string }
  | { role: "tool"; content: string; tool_call_id: string; name?: string };

export function buildOpenRouterBody({
  messages,
  profile = "general", // "general" | "code" | "uncensored"
  model,               // optional override
}: {
  messages: { role: "user"|"assistant"|"system"; content: unknown }[];
  profile?: "general" | "code" | "uncensored";
  model?: string;
}) {
  const env = (k: string) => process.env[k] || "";

  // If a model is explicitly passed, use it.
  if (model) {
    return { model, messages, stream: true };
  }

  // Otherwise fallback-route across free models for the chosen profile:
  const lists = {
    general: env("OPENROUTER_FREE_MODELS_GENERAL"),
    code: env("OPENROUTER_FREE_MODELS_CODE"),
    uncensored: env("OPENROUTER_FREE_MODELS_UNCENSORED"),
  };

  const models = (lists[profile] || lists.general)
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  return {
    // Either let OpenRouter use `model` (your default)…
    // model: env("OPENROUTER_DEFAULT_MODEL"),
    // …or use `models` + route:'fallback' to hop providers automatically:
    models,
    route: "fallback" as const,
    messages,
    stream: true,
  };
}
