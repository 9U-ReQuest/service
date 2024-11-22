"use client";

import Script from "next/script";

export default function KakaoScript() {
  const handleKakaoInit = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string);
  };
  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.3/kakao.min.js"
      integrity="sha384-kLbo2SvoNtOFiniJ1EQ9o2iDA8i3xp+O6Cns+L5cd4RsOJfl+43z5pvieT2ayq3C"
      crossOrigin="anonymous"
      onLoad={handleKakaoInit}
    />
  );
}
