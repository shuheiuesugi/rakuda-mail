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
        {/* Google Tag Manager (GTM-P7H8BZV9) */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P7H8BZV9');`}
        </Script>
        {/* Microsoft Clarity (w0q1kgxnan) */}
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","w0q1kgxnan");`}
        </Script>
      </head>
      <body className="antialiased">
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P7H8BZV9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
