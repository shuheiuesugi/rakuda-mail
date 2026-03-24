import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAKUDAメール — AIメール自動生成",
  description: "ビジネスメールをAIでワンクリック作成。",
  icons: {
    icon: { url: "/rakuda-mail/favicon.svg", type: "image/svg+xml" },
  },
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
