import CallbackPage from "@/pages/callback/callback-page";
import { Suspense } from "react";

export default function Callback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackPage />
    </Suspense>
  );
}
