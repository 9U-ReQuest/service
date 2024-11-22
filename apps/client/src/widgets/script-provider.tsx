import { GoogleAnalytics } from "@next/third-parties/google";
import KakaoScript from "./ui/kakao-script";

export default function ScriptProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleAnalytics gaId="G-NQ66NY0NXH" />
      <KakaoScript />
      {children}
    </>
  );
}
