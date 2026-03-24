import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ラクダMail — パソコンが使えれば大丈夫。AIがメールを書いてくれる",
  description: "専門知識は不要。メールを選んでボタンを押すだけ。AIが丁寧なビジネスメールを自動で作ってくれます。",
  robots: { index: false, follow: false },
};

export default function EasyLPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
