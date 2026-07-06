import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "@/lib/assistant";
import type { Lang } from "@/lib/i18n";

// The Anthropic SDK needs the Node runtime (not edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant"; content: string };

const MAX_TURNS = 12; // keep the context (and cost) bounded
const MAX_CHARS = 2000; // per message

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    // Graceful "offline" — the widget shows a friendly fallback.
    return new Response("offline", { status: 503 });
  }

  let body: { messages?: Msg[]; lang?: Lang };
  try {
    body = await req.json();
  } catch {
    return new Response("bad request", { status: 400 });
  }

  const lang: Lang = body.lang === "en" ? "en" : "el";
  const messages: Msg[] = (body.messages ?? [])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim() !== ""
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response("bad request", { status: 400 });
  }

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = client.messages.stream({
          model: "claude-haiku-4-5",
          max_tokens: 1024,
          system: systemPrompt(lang),
          messages,
        });

        for await (const event of anthropicStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("assistant error", err);
        controller.enqueue(
          encoder.encode(
            lang === "el"
              ? "\n\nΣυγγνώμη, κάτι πήγε στραβά. Κάλεσέ μας στο " +
                  "211 42 42 203."
              : "\n\nSorry, something went wrong. Call us at 211 42 42 203."
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
