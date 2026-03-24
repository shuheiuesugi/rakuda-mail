import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RAKUDAメール — メール業務のコストを1/3に削減",
  description: "メール1通あたりのコストを¥75から¥2.5に。月額¥2,980で無制限。年払いなら2ヶ月分お得。",
  robots: { index: false, follow: false },
};

export default function CostLPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
