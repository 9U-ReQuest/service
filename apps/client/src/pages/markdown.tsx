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

  useEffect(() => {
    function isSpace(code: number) {
      switch (code) {
        case 0x09:
        case 0x20:
          return true;
      }
      return false;
    }

    if (window) {
      window.isSpace = isSpace;
    }
  }, []);


  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (mdRef.current) {
      mdRef.current.innerHTML = result;
    }
  }, [source]);
  return <div ref={mdRef} className="markdown" />;
}

export default Markdown;
