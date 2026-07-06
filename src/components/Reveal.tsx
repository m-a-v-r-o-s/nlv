"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setShown(true), delay);
          io.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Comp = Tag as any;
  return (
    <Comp ref={ref as any} className={`reveal ${shown ? "in" : ""} ${className}`}>
      {children}
    </Comp>
  );
}
