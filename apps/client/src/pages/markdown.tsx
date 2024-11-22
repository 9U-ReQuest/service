"use client";

import MarkdownIt from "markdown-it";
import { useEffect, useRef } from "react";

interface MarkdownProps {
  source?: string;
}

function Markdown({ source }: MarkdownProps) {
  const mdRef = useRef<HTMLDivElement>(null);
  const md = MarkdownIt();
  const result = md.render(source || "");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (mdRef.current) {
      mdRef.current.innerHTML = result;
    }
  }, [source]);
  return <div ref={mdRef} className="markdown" />;
}

export default Markdown;
