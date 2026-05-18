
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "매니저 선임 에이전트",
  description: "아마존식 내러티브 기반 신청서 자동 생성기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
