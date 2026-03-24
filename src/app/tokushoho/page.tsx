export default function TokushohoPage() {
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
          <h1 className="legal-title">特定商取引法に基づく表記</h1>
          <p className="legal-updated">最終更新日：2026年3月24日</p>

          <div className="legal-table-wrapper">
            <table className="legal-table">
              <tbody>
                <tr>
                  <th>販売業者</th>
                  <td>ラクダMail運営事務局</td>
                </tr>
                <tr>
                  <th>運営統括責任者</th>
                  <td>代表者名（請求により遅滞なく開示）</td>
                </tr>
                <tr>
                  <th>所在地</th>
                  <td>請求により遅滞なく開示いたします</td>
                </tr>
                <tr>
                  <th>電話番号</th>
                  <td>請求により遅滞なく開示いたします</td>
                </tr>
                <tr>
                  <th>メールアドレス</th>
                  <td><a href="mailto:support@rakuda-mail.com">support@rakuda-mail.com</a></td>
                </tr>
                <tr>
                  <th>販売URL</th>
                  <td><a href="https://shuheiuesugi.github.io/rakuda-mail/">https://shuheiuesugi.github.io/rakuda-mail/</a></td>
                </tr>
                <tr>
                  <th>販売価格</th>
                  <td>
                    <ul className="legal-inline-list">
                      <li>Starter（無料プラン）：0円</li>
                      <li>Standard：月額1,980円（税込）</li>
                      <li>Enterprise：月額4,980円（税込）</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>販売価格以外の必要料金</th>
                  <td>インターネット接続料金、通信費等はユーザー負担となります。</td>
                </tr>
                <tr>
                  <th>支払方法</th>
                  <td>クレジットカード決済（Visa, Mastercard, JCB, American Express）</td>
                </tr>
                <tr>
                  <th>支払時期</th>
                  <td>有料プラン申込時に初回決済、以降毎月自動課金</td>
                </tr>
                <tr>
                  <th>商品の引渡時期</th>
                  <td>お申込み手続き完了後、直ちにご利用いただけます。</td>
                </tr>
                <tr>
                  <th>返品・キャンセルについて</th>
                  <td>
                    デジタルサービスの性質上、利用開始後の返金は原則としていたしかねます。
                    解約はいつでも可能で、解約後は当月末までご利用いただけます。
                  </td>
                </tr>
                <tr>
                  <th>動作環境</th>
                  <td>
                    Google Chrome（最新版）、Safari（最新版）、Firefox（最新版）、
                    Microsoft Edge（最新版）。Gmailアカウントが必要です。
                  </td>
                </tr>
                <tr>
                  <th>特別条件</th>
                  <td>
                    年間プランの場合、月額換算で2ヶ月分お得になります。
                    10名以上のチームプランは別途お見積もりとなります。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
