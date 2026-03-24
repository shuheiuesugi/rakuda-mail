export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <header className="sub-header">
        <div className="sub-header-inner">
          <a href="./" className="sub-header-logo">
            <svg className="header-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 40" style={{ height: 20, width: "auto" }}>
              <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32"
                    stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif"
                    fontSize="22" fontWeight="300" fill="currentColor" letterSpacing="3">RAKUDAメール</text>
            </svg>
          </a>
        </div>
      </header>

      <main className="legal-page">
        <div className="legal-content">
          <h1 className="legal-title">プライバシーポリシー</h1>
          <p className="legal-updated">最終更新日：2026年3月24日</p>

          <p className="legal-intro">
            ラクダMail（以下「本サービス」）は、ユーザーのプライバシーを最重要視しています。本プライバシーポリシーは、本サービスにおける個人情報の収集、利用、管理について説明するものです。
          </p>

          <section className="legal-section">
            <h2>1. 収集する情報</h2>
            <p>本サービスでは、以下の情報を収集します。</p>
            <ul>
              <li><strong>アカウント情報：</strong>氏名、メールアドレス、Googleアカウント情報</li>
              <li><strong>利用情報：</strong>メール生成回数、トーン選択履歴、利用時間帯等の統計データ</li>
              <li><strong>デバイス情報：</strong>ブラウザの種類、OS、IPアドレス、アクセスログ</li>
              <li><strong>決済情報：</strong>有料プランご利用時のクレジットカード情報（決済代行会社が安全に管理）</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>2. メールデータの取り扱い</h2>
            <p>ラクダMailでは、ユーザーのプライバシーを保護するため、以下のポリシーを厳守しています。</p>
            <ul>
              <li>メール本文はAI処理後に<strong>即時削除</strong>され、サーバーに一切保存しません。</li>
              <li>AIの学習データとしてメール内容を使用することはありません。</li>
              <li>Gmail APIを通じてアクセスするデータは、メール返信の生成にのみ使用します。</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. 情報の利用目的</h2>
            <p>収集した情報は、以下の目的で利用します。</p>
            <ul>
              <li>本サービスの提供、維持、改善</li>
              <li>ユーザーサポートの提供</li>
              <li>サービスに関するお知らせ、アップデート情報の送信</li>
              <li>利用統計の作成およびサービスの品質向上</li>
              <li>不正利用の検出および防止</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. 情報の第三者提供</h2>
            <p>以下の場合を除き、ユーザーの個人情報を第三者に提供することはありません。</p>
            <ul>
              <li>ユーザーの同意がある場合</li>
              <li>法令に基づく開示要求がある場合</li>
              <li>サービス提供に必要な業務委託先（決済代行、クラウドインフラ等）への提供</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. セキュリティ対策</h2>
            <p>本サービスでは、以下のセキュリティ対策を実施しています。</p>
            <ul>
              <li>全通信のSSL/TLS暗号化（256bit）</li>
              <li>Google公式OAuth 2.0認証の採用</li>
              <li>SOC2準拠のインフラストラクチャ</li>
              <li>定期的なセキュリティ監査および脆弱性診断</li>
              <li>アクセスログの監視と異常検知</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Cookieの使用</h2>
            <p>
              本サービスでは、ユーザー体験の向上および利用状況の分析のためにCookieを使用します。ブラウザの設定によりCookieを無効にすることが可能ですが、一部の機能が制限される場合があります。
            </p>
          </section>

          <section className="legal-section">
            <h2>7. ユーザーの権利</h2>
            <p>ユーザーは、以下の権利を有しています。</p>
            <ul>
              <li>自己の個人情報の開示、訂正、削除を請求する権利</li>
              <li>個人情報の利用停止を請求する権利</li>
              <li>アカウントの削除を請求する権利</li>
            </ul>
            <p>上記の請求については、本サービス内の設定画面、またはメール（support@rakuda-mail.com）にてお申し出ください。</p>
          </section>

          <section className="legal-section">
            <h2>8. ポリシーの変更</h2>
            <p>
              本プライバシーポリシーは、法令の変更やサービス内容の変更に伴い、予告なく改定される場合があります。重要な変更がある場合は、本サービス上でお知らせいたします。
            </p>
          </section>

          <section className="legal-section">
            <h2>9. お問い合わせ</h2>
            <p>プライバシーに関するご質問・ご相談は、以下までご連絡ください。</p>
            <ul>
              <li>メール：<a href="mailto:privacy@rakuda-mail.com">privacy@rakuda-mail.com</a></li>
              <li>運営：ラクダMail運営事務局</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
