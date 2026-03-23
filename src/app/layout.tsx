import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ラクダMail — AIメール自動生成",
  description: "ビジネスメールをAIでワンクリック作成。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
