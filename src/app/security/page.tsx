export default function SecurityPage() {
  return (
    <>
      {/* Header */}
      <header className="sub-header">
        <div className="sub-header-inner">
          <a href="./" className="sub-header-logo">
            <div className="sub-header-logo-icon">R</div>
            <div className="sub-header-logo-text">
              <span className="sub-header-logo-name">ラクダ<span>Mail</span></span>
              <span className="sub-header-logo-tagline">AIメール作成ツール</span>
            </div>
          </a>
        </div>
      </header>

      <main className="legal-page security-page">
        <div className="legal-content">
          <h1 className="legal-title">セキュリティ</h1>
          <p className="legal-updated">
            ラクダMail &#8212; AIメール作成ツール
          </p>
          <p className="legal-intro">
            ラクダMailは、お客様のデータを安全に保護するため、業界最高水準のセキュリティ対策を実施しています。メール本文は一切保存せず、プライバシーファーストの設計思想でサービスを構築しています。
          </p>

          <div className="security-grid">
            {/* Card 1 */}
            <div className="security-card">
              <div className="security-card-icon blue">&#128274;</div>
              <h3>ゼロデータ保存</h3>
              <p>
                メール本文はAI処理後に即時削除。サーバーに一切保存しません。生成ログも保持せず、お客様のメール内容を第三者が閲覧することは不可能です。
              </p>
            </div>

            {/* Card 2 */}
            <div className="security-card">
              <div className="security-card-icon green">&#128737;</div>
              <h3>SSL/TLS暗号化通信</h3>
              <p>
                すべての通信は256bit SSL/TLSで暗号化されています。ブラウザとサーバー間、サーバーとGmail API間のデータ転送はすべて保護されています。
              </p>
            </div>

            {/* Card 3 */}
            <div className="security-card">
              <div className="security-card-icon purple">&#128273;</div>
              <h3>Google OAuth 2.0認証</h3>
              <p>
                Googleの公式OAuth 2.0プロトコルを採用。ラクダMailがパスワードを保存することはありません。必要最小限のスコープのみ要求し、権限を最小化しています。
              </p>
            </div>

            {/* Card 4 */}
            <div className="security-card">
              <div className="security-card-icon amber">&#128203;</div>
              <h3>SOC2準拠</h3>
              <p>
                インフラストラクチャはSOC2 Type IIに準拠。セキュリティ、可用性、処理の整合性、機密性、プライバシーの5つの信頼原則に基づいて運用しています。
              </p>
            </div>

            {/* Card 5 */}
            <div className="security-card">
              <div className="security-card-icon pink">&#128269;</div>
              <h3>定期セキュリティ監査</h3>
              <p>
                外部のセキュリティ専門企業による定期的な脆弱性診断とペネトレーションテストを実施。発見された脆弱性は迅速に対応しています。
              </p>
            </div>

            {/* Card 6 */}
            <div className="security-card">
              <div className="security-card-icon navy">&#127760;</div>
              <h3>データリージョン管理</h3>
              <p>
                データ処理は日本国内のリージョンで実施。国際的なデータ保護規制（GDPR等）にも対応し、越境データ転送に関するコンプライアンスを確保しています。
              </p>
            </div>
          </div>

          <section className="security-bottom-section">
            <h2>セキュリティに関するお問い合わせ</h2>
            <p>
              セキュリティに関するご質問、脆弱性の報告については、以下までご連絡ください。
            </p>
            <p>
              メール：<a href="mailto:security@rakuda-mail.com">security@rakuda-mail.com</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
