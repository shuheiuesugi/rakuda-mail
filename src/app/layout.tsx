import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAKUDAメール — AIメール自動生成 | ビジネスメールをワンクリック作成",
  description:
    "RAKUDAメールはAIがビジネスメールの返信を自動生成。Gmail連携、4段階トーン調整、テンプレート管理。月20通まで永年無料。120社以上が導入、92%が修正なしで送信。",
  icons: {
    icon: { url: "/rakuda-mail/favicon.svg", type: "image/svg+xml" },
  },
  openGraph: {
    title: "RAKUDAメール — AIメール自動生成",
    description:
      "AIがビジネスメールの返信を自動生成。Gmail連携、4段階トーン調整。月20通まで永年無料。",
    url: "https://shuheiuesugi.github.io/rakuda-mail/",
    siteName: "RAKUDAメール",
    locale: "ja_JP",
    type: "website",
    // TODO: Create og-image.png (1200x630) and place in public/
    images: [{ url: "https://shuheiuesugi.github.io/rakuda-mail/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAKUDAメール — AIメール自動生成",
    description:
      "AIがビジネスメールの返信を自動生成。月20通まで永年無料。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* Google Analytics 4 — TODO: Replace G-XXXXXXXXXX with actual Measurement ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        {/* Microsoft Clarity — Microsoft Clarity (w0q1kgxnan) */}
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/w0q1kgxnan";
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script");
          `}
        </Script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
