"use client";

// Opens the floating assistant from anywhere (nav links, CTAs) via a window event.
export function AssistantNavButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("stefanidis:assistant-open"))}
      className={className}
    >
      {label}
    </button>
  );
}
