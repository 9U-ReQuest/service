import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 className="text-3xl font-bold" {...props} />,
    h2: (props) => <h2 className="text-2xl font-semibold mt-6" {...props} />,
    p: (props) => <p className="text-base leading-relaxed mt-4" {...props} />,
    ul: (props) => <ul className="list-disc list-inside mt-4" {...props} />,
    li: (props) => <li className="mt-2" {...props} />,
    a: (props) => <a className="underline" target="_blank" rel="noopener noreferrer" {...props} />,
    code: (props) => (
      <code className="bg-gray-100 text-sm font-mono rounded px-1 py-0.5" {...props} />
    ),
    pre: (props) => (
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto" {...props} />
    ),
    hr: (props) => <hr className="border-t-2 border-gray-300 my-6" {...props} />,
    blockquote: (props) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic" {...props} />
    ),
  };
}
