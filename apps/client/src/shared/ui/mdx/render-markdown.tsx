import { useMDXComponents } from "@/shared/ui/mdx/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

interface RenderMarkdownProps {
  source: string;
}

export default async function RenderMarkdown({ source }: RenderMarkdownProps) {
  return <MDXRemote source={source} components={useMDXComponents({})} />;
}
