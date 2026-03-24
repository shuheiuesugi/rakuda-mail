import { FooterLogo } from "./BrandLogo";

export function Footer({ linkPrefix = "./" }: { linkPrefix?: string }) {
  return (
    <footer style={{ borderTop: "1px solid #E5E5E5", background: "#fff", padding: "40px 24px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <FooterLogo />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "32px" }}>
          <div>
            <h3 style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: "12px" }}>サポート</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" as const, gap: "8px" }}>
              <li><a href="mailto:info@rakuda-ai.com" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>info@rakuda-ai.com</a></li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: "12px" }}>リンク</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" as const, gap: "8px" }}>
              <li><a href={`${linkPrefix}terms`} style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>利用規約</a></li>
              <li><a href={`${linkPrefix}privacy`} style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>プライバシーポリシー</a></li>
              <li><a href={`${linkPrefix}tokushoho`} style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>特定商取引法</a></li>
              <li><a href={`${linkPrefix}security`} style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>セキュリティ</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "24px", textAlign: "center" as const, fontSize: "12px", color: "#9CA3AF" }}>
          &copy; 2026 Rakuda AI Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
