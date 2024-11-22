import FullWidthAndCenter from "@/shared/ui/wrapper/full-width-center";
import MaxWidth from "@/shared/ui/wrapper/max-width";
import Footer from "@/widgets/layout/footer/footer";
import DefaultHeader from "@/widgets/layout/header/default-header";
import { Provider } from "@/widgets/provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sfPro = localFont({
  src: [
    {
      path: "./fonts/SF-Pro-Display-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/SF-Pro-Display-Heavy.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/SF-Pro-Display-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/SF-Pro-Display-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/SF-Pro-Display-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SF-Pro-Display-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SF-Pro-Display-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/SF-Pro-Display-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/SF-Pro-Display-Ultralight.woff2",
      weight: "100",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "ReQuest",
  description: "IT업계 취업을 위한 AI과제 전형 도우미. ReQuest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sfPro.className} antialiased`}>
        <Provider>
          <FullWidthAndCenter>
            <DefaultHeader />
            <MaxWidth>
              {children}
              <Footer />
            </MaxWidth>
          </FullWidthAndCenter>
        </Provider>
      </body>
    </html>
  );
}
