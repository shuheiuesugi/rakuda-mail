export default function TermsPage() {
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
          <h1 className="legal-title">利用規約</h1>
          <p className="legal-updated">最終更新日：2026年3月24日</p>

          <p className="legal-intro">
            この利用規約（以下「本規約」）は、RAKUDAメール（以下「本サービス」）の利用に関する条件を定めるものです。本サービスを利用する前に、本規約をよくお読みください。本サービスを利用することで、本規約に同意したものとみなされます。
          </p>

          <section className="legal-section">
            <h2>第1条（定義）</h2>
            <ol>
              <li>「本サービス」とは、RAKUDAメールが提供するAIメール作成ツールおよびこれに付随する一切のサービスを指します。</li>
              <li>「ユーザー」とは、本サービスを利用するすべての個人または法人を指します。</li>
              <li>「コンテンツ」とは、ユーザーが本サービスに入力・生成するすべてのテキスト、データ、情報を指します。</li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>第2条（サービスの提供）</h2>
            <ol>
              <li>本サービスは、AIを活用したビジネスメールの自動生成、トーン調整、テンプレート管理等の機能を提供します。</li>
              <li>本サービスの利用にはGoogleアカウントが必要です。</li>
              <li>本サービスの内容は、予告なく変更・追加・削除される場合があります。</li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>第3条（アカウント）</h2>
            <ol>
              <li>ユーザーは、正確かつ最新の情報を登録する義務を負います。</li>
              <li>アカウントの管理責任はユーザーにあります。第三者によるアカウントの不正利用についても、ユーザーが責任を負います。</li>
              <li>ユーザーは、アカウント情報の不正利用を発見した場合、直ちに当社に通知しなければなりません。</li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>第4条（料金・支払い）</h2>
            <ol>
              <li>本サービスの利用プランおよび料金は以下のとおりです。
                <ul>
                  <li>Free（無料プラン）：0円 / 月（月20通まで）</li>
                  <li>Pro：月額2,980円（税込）/ 年間プラン 月額2,480円（税込）</li>
                  <li>Team：月額9,800円（税込）/ 3名から</li>
                  <li>Enterprise：要見積もり（個別対応）</li>
                </ul>
              </li>
              <li>有料プランの料金は、月額課金制です。利用開始日を起算日として毎月自動更新されます。</li>
              <li>支払い方法は、クレジットカード決済とします。</li>
              <li>一度支払われた料金は、原則として返金いたしません。</li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>第5条（禁止事項）</h2>
            <p>ユーザーは、以下の行為を行ってはなりません。</p>
            <ol>
              <li>法令または公序良俗に反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>本サービスのサーバーまたはネットワークに過度な負荷をかける行為</li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>他のユーザーのアカウントを不正に使用する行為</li>
              <li>スパムメール、迷惑メール等の送信に本サービスを利用する行為</li>
              <li>本サービスを逆コンパイル、リバースエンジニアリングする行為</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>第6条（知的財産権）</h2>
            <ol>
              <li>本サービスに関する知的財産権は、当社または正当な権利者に帰属します。</li>
              <li>ユーザーが本サービスを利用して生成したコンテンツの権利は、ユーザーに帰属します。</li>
              <li>当社は、サービスの改善を目的として、匿名化された利用データを統計的に利用することがあります。</li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>第7条（免責事項）</h2>
            <ol>
              <li>当社は、AIが生成するメール文面の正確性、適切性、完全性について保証するものではありません。</li>
              <li>本サービスの利用に起因するいかなる損害についても、当社の故意または重過失による場合を除き、当社は責任を負いません。</li>
              <li>天災、通信障害等の不可抗力による本サービスの中断について、当社は責任を負いません。</li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>第8条（サービスの変更・終了）</h2>
            <ol>
              <li>当社は、30日前の事前通知をもって、本サービスの全部または一部を変更・終了することができます。</li>
              <li>本サービスの終了に伴い、ユーザーに損害が生じた場合であっても、当社は一切の責任を負いません。</li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>第9条（準拠法・管轄裁判所）</h2>
            <ol>
              <li>本規約の解釈および適用は、日本法に準拠します。</li>
              <li>本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
            </ol>
          </section>
        </div>
      </main>
    </>
  );
}
