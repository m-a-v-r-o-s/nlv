"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { type Lang, pick } from "@/lib/i18n";
import { claudeIconPath } from "@/lib/claudeIcon";
import { site } from "@/lib/site";

type Msg = { role: "user" | "assistant"; content: string };

export function Assistant({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: pick(
        lang,
        `Γεια! Είμαι ο AI βοηθός της ${site.name}. Ρώτα με για τα διαθέσιμα αυτοκίνητα ή για την εισαγωγή αυτοκινήτου.`,
        `Hi! I’m the ${site.name} AI assistant. Ask me about the cars we have, or about importing one.`
      ),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pulse, setPulse] = useState(false);
  const [raised, setRaised] = useState(false);
  const [lift, setLift] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  // Nav links / CTAs elsewhere open the assistant by dispatching this event.
  useEffect(() => {
    const openIt = () => setOpen(true);
    window.addEventListener("stefanidis:assistant-open", openIt);
    return () => window.removeEventListener("stefanidis:assistant-open", openIt);
  }, []);

  // Pulse the launcher until it's opened once (persisted).
  useEffect(() => {
    setPulse(localStorage.getItem("stefanidis:assistant-seen") !== "1");
  }, []);
  useEffect(() => {
    if (open) {
      setPulse(false);
      try {
        localStorage.setItem("stefanidis:assistant-seen", "1");
      } catch {}
    }
  }, [open]);

  // Keep the bubble clear of the brand logos while they're on screen.
  //
  // This deliberately does NOT run off a scroll handler. Measuring the ticker
  // on every scroll event meant a React re-render plus a layout of a fixed
  // element per frame, so the bubble trailed the scroll instead of moving with
  // it, and mobile URL-bar collapse (which changes window.innerHeight mid
  // scroll) made it stutter. An IntersectionObserver fires only when the
  // ticker crosses the halfway line, so the position flips once and the move
  // is a single compositor-only transform transition.
  useEffect(() => {
    const ticker = document.getElementById("brand-ticker");
    if (!ticker) {
      setRaised(false);
      return;
    }

    // Base resting offset is bottom-4 (16px). Clearing the ticker means
    // travelling its height plus a 12px gap, less the 16px already applied.
    const measure = () =>
      setLift(Math.max(0, ticker.getBoundingClientRect().height - 4));
    measure();

    // Shrinking the root's top edge to 50% makes `isIntersecting` mean
    // "the ticker overlaps the bottom half of the viewport".
    const io = new IntersectionObserver(
      ([entry]) => setRaised(entry.isIntersecting),
      { rootMargin: "-50% 0px 0px 0px" }
    );
    io.observe(ticker);

    const ro = new ResizeObserver(measure);
    ro.observe(ticker);

    return () => {
      io.disconnect();
      ro.disconnect();
    };
    // Re-attach on navigation: the assistant lives in the layout and doesn't
    // remount, but the ticker only exists on the homepage.
  }, [pathname]);

  const suggestions = pick(
    lang,
    [
      "Πώς λειτουργεί η εισαγωγή;",
      "Πόσο είναι το τέλος ταξινόμησης;",
      "Τι αυτοκίνητα έχετε;",
    ],
    [
      "How does importing work?",
      "How much is the registration tax?",
      "What cars do you have?",
    ]
  );

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setInput("");
    const next = [...messages, { role: "user" as const, content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });

      if (!res.ok || !res.body) {
        const offline = pick(
          lang,
          `Ο βοηθός είναι προσωρινά εκτός λειτουργίας. Κάλεσέ μας στο ${site.phone} ή στείλε email στο ${site.email}.`,
          `The assistant is temporarily offline. Call us at ${site.phone} or email ${site.email}.`
        );
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: offline };
          return copy;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: pick(
            lang,
            `Κάτι πήγε στραβά. Δοκίμασε ξανά ή κάλεσέ μας στο ${site.phone}.`,
            `Something went wrong. Try again or call us at ${site.phone}.`
          ),
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher. Position moves via transform, never `bottom`: transform is
          compositor-only, so the lift can't cause a layout pass mid-scroll. */}
      <div
        className="fixed bottom-4 right-4 z-overlay transition-transform duration-500 ease-lux motion-reduce:transition-none"
        style={{ transform: `translate3d(0, -${raised ? lift : 0}px, 0)` }}
      >
        {!open && pulse && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-gold/30 motion-safe:animate-ping"
          />
        )}
        {/* No shadow: on an ink surface, elevation reads through lightness, and
            a soft halo around a gold pill is the "glow card" tell. */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={pick(lang, "AI βοηθός", "AI assistant")}
          className={`relative flex h-14 items-center rounded-full bg-gold text-ink transition-colors duration-200 ease-lux hover:bg-goldsoft ${
            open ? "w-14 justify-center" : "gap-2.5 pl-4 pr-5"
          }`}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <>
              <ClaudeLogo className="h-7 w-7 fill-current" />
              <span className="font-mono text-[12px] font-semibold uppercase tracking-wider">
                {pick(lang, "Ρώτησέ μας", "Ask us")}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-20 right-4 z-overlay flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden border border-line bg-carbon transition-transform duration-500 ease-lux motion-reduce:transition-none"
          style={{ transform: `translate3d(0, -${raised ? lift : 0}px, 0)` }}
        >
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold">
              <ClaudeLogo className="h-5 w-5 fill-current" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-[15px] text-bone">
                {pick(lang, "Ρώτησέ μας", "Ask us")}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-faint">
                {pick(lang, "AI βοηθός", "AI assistant")}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={pick(lang, "Κλείσιμο", "Close")}
              className="ml-auto text-mute transition-colors hover:text-bone"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-gold text-ink"
                    : "mr-auto border border-line bg-smoke text-bone"
                }`}
              >
                {m.content ||
                  (busy && i === messages.length - 1 ? (
                    <span className="inline-flex gap-1">
                      <Dot /> <Dot /> <Dot />
                    </span>
                  ) : (
                    ""
                  ))}
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="border border-line px-3 py-1.5 text-[12px] text-mute transition-colors hover:border-gold hover:text-gold"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t border-line p-3"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder={pick(lang, "Γράψε το μήνυμά σου…", "Type your message…")}
              className="max-h-28 flex-1 resize-none rounded-xl border border-line bg-ink px-3 py-2 text-[14px] text-bone placeholder:text-faint focus-visible:border-gold"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label={pick(lang, "Αποστολή", "Send")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold text-ink transition-opacity disabled:opacity-40"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M3 20.5v-6l8-2-8-2v-6l19 8-19 8Z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function Dot() {
  return (
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mute" />
  );
}

function ClaudeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={claudeIconPath} />
    </svg>
  );
}
