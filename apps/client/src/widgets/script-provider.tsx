import { GoogleAnalytics } from "@next/third-parties/google";

export default function ScriptProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleAnalytics gaId="G-NQ66NY0NXH" />
      {children}
    </>
  );
}
