"use client";

import { useEffect, useState, useCallback } from "react";

/* ================================================================
   /lp/cost — コスト訴求LP
   ターゲット: コスト削減を求める管理職・経営層
   ================================================================ */

// --- FAQ Data (Cost-focused) ---
const FAQS = [
  {
    q: "無料プランだけで十分使えますか？",
    a: "はい。月20通までの個人利用なら無料プランで十分です。営業チームなど大量にメールを送る場合はProプラン（月¥2,980）で無制限になります。",
  },
  {
    q: "他のAIメールツールと比較してどのくらい安いですか？",
    a: "海外の主要AIメールツールは月$29〜$49（約4,500〜7,500円）が相場です。RAKUDAメールは月¥2,980で同等以上の機能を提供しており、約60%のコスト削減になります。",
  },
  {
    q: "年払いにするとどれくらいお得ですか？",
    a: "年払いなら2ヶ月分が無料になります。Proプランの場合、月払い¥2,980×12=¥35,760のところ、年払いなら¥29,760。年間¥6,000の節約です。",
  },
  {
    q: "ROI（投資対効果）を試算できますか？",
    a: "メール1通あたり平均15分→30秒に短縮。1日20通処理する場合、1日あたり約5時間の工数削減。時給3,000円換算で月30万円以上の工数削減効果が見込めます。",
  },
  {
    q: "途中でプランを変更・解約できますか？",
    a: "はい、いつでも変更・解約可能です。プランのアップグレードは即時反映、ダウングレードは次の請求日から適用されます。年払いでも途中解約に対応しています。",
  },
];

// --- Scroll fade hook ---
function useScrollFade() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".fade-in, .fade-in-left, .fade-in-right, .fade-in-scale"
    );
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// --- SVG Icons ---
function CheckIcon() {
  return (
    <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 5.5L4 8l5-6" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 7h12M8 2l5 5-5 5" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l4 4 4-4" />
    </svg>
  );
}

// ================================================================
// HEADER
// ================================================================
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <a href="../" className="header-logo" style={{ display: "flex", alignItems: "center", gap: "0" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 40" className="header-logo-svg" style={{ height: "20px", width: "auto" }}>
            <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="currentColor" letterSpacing="3">RAKUDAメール</text>
          </svg>
        </a>

        <nav className="header-nav">
          <a href="#stats">コスト比較</a>
          <a href="#features">機能</a>
          <a href="#pricing">料金</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="header-cta-group">
          <a href="../book-call" className="btn btn-sm btn-dark">
            無料相談
          </a>
          <a href="../signup" className="btn btn-sm btn-cta-call">
            無料で始める
          </a>
        </div>

        <button className="mobile-menu-btn" aria-label="メニューを開く">
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

// ================================================================
// HERO
// ================================================================
function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner" style={{ gridTemplateColumns: "1fr", textAlign: "center", maxWidth: 800 }}>
        <div className="hero-content fade-in" style={{ textAlign: "center" }}>
          <div className="hero-badge" style={{ margin: "0 auto 24px" }}>
            <span className="hero-badge-dot" />
            メール業務のコストを1/3に
          </div>

          <h1 style={{ marginBottom: 20 }}>
            メール1通あたり<br />
            <span className="accent-text">¥75 → ¥2.5</span>
          </h1>

          <p className="hero-subtitle" style={{ margin: "0 auto 32px", maxWidth: 520, textAlign: "center" }}>
            人件費換算でメール1通あたり¥75かかっていたコストを、AIで¥2.5に削減。
            月額¥2,980で無制限。年払いなら2ヶ月分お得。
          </p>

          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a href="../signup" className="btn-primary btn-glow">
              <SparkleIcon />
              無料で始める
              <ArrowRight />
            </a>
            <a href="#pricing" className="btn-secondary">
              料金プランを見る
            </a>
          </div>

          <div className="hero-stats" style={{ justifyContent: "center", marginTop: 40 }}>
            <div className="hero-stat">
              <div className="hero-stat-number">1/30</div>
              <div className="hero-stat-label">メール単価</div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <div className="hero-stat-number">¥30万+</div>
              <div className="hero-stat-label">月間工数削減額</div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <div className="hero-stat-number">60%</div>
              <div className="hero-stat-label">他社比コスト削減</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// STATS (Cost Comparison)
// ================================================================
function StatsSection() {
  return (
    <section className="section-before-after" id="stats" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="container">
        <div className="section-center fade-in">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span className="section-label-line" />
            COST COMPARISON
          </div>
          <h2 className="section-heading">
            メール業務にかかる<span className="heading-accent">本当のコスト</span>
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>
            時給3,000円の社員がメール1通に15分。1日20通で月60万円以上の人件費です。
          </p>
        </div>

        {/* ROI Calculator visual */}
        <div className="ba-grid" style={{ marginTop: 48 }}>
          <div className="ba-card before fade-in-left">
            <div className="ba-card-label before">
              <span className="ba-label-icon">&#128176;</span>
              従来のメール業務コスト
            </div>
            <div className="ba-card-body">
              <div className="ba-step">
                <div className="ba-step-time">¥750</div>
                <div className="ba-step-desc">メール1通あたりの人件費（15分×時給3,000円）</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time">¥15,000</div>
                <div className="ba-step-desc">1日20通のメール処理コスト</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time">¥30万</div>
                <div className="ba-step-desc">月間（20営業日）のメール人件費</div>
              </div>
              <div className="ba-total">
                <span className="ba-total-time bad">年間 ¥360万 / 人</span>
                <span className="ba-total-note">メール業務だけで</span>
              </div>
            </div>
          </div>

          <div className="ba-arrow fade-in-scale">
            <div className="ba-arrow-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </div>
          <div className="ba-arrow-mobile fade-in-scale">
            <div className="ba-arrow-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </div>
          </div>

          <div className="ba-card after fade-in-right">
            <div className="ba-card-label after">
              <span className="ba-label-icon">&#10024;</span>
              RAKUDAメール導入後
            </div>
            <div className="ba-card-body">
              <div className="ba-step">
                <div className="ba-step-time fast">¥25</div>
                <div className="ba-step-desc">メール1通あたりの実質コスト（30秒+ツール代）</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time fast">¥500</div>
                <div className="ba-step-desc">1日20通のメール処理コスト</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time fast">¥1万</div>
                <div className="ba-step-desc">月間のメール処理コスト（人件費+ツール代）</div>
              </div>
              <div className="ba-total">
                <span className="ba-total-time good">年間 ¥12万 / 人</span>
                <span className="ba-total-note">97%コスト削減</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// FEATURES
// ================================================================
function FeaturesSection() {
  const features = [
    {
      icon: "💵",
      color: "blue",
      title: "圧倒的な低コスト",
      desc: "月額¥2,980でメール生成無制限。海外ツールの約1/3の価格で同等以上の品質を提供。永年無料プランも用意。",
      stat: "月¥2,980",
      statLabel: "Proプラン",
    },
    {
      icon: "⚡",
      color: "green",
      title: "人件費を97%削減",
      desc: "メール1通15分→30秒へ。1日20通処理する社員なら、月30万円以上の工数削減効果。導入初月からROI達成。",
      stat: "97%",
      statLabel: "コスト削減率",
    },
    {
      icon: "📈",
      color: "purple",
      title: "チーム全体で効率化",
      desc: "Teamプランなら1名あたり月¥2,600〜。テンプレート共有で新人もベテランも同じ品質。教育コストもゼロに。",
      stat: "¥2,600〜",
      statLabel: "1名あたり月額",
    },
    {
      icon: "📅",
      color: "amber",
      title: "年払いで2ヶ月分お得",
      desc: "年払いを選択すれば実質2ヶ月分が無料に。Proプランなら年間¥6,000の節約。長く使うほどお得な料金体系。",
      stat: "¥6,000",
      statLabel: "年間節約額",
    },
    {
      icon: "🔒",
      color: "navy",
      title: "隠れたコストなし",
      desc: "初期費用ゼロ、追加課金なし。全機能が料金内に含まれます。メール本文の保存もしないので、情報漏洩リスクもゼロ。",
      stat: "¥0",
      statLabel: "初期費用",
    },
    {
      icon: "💰",
      color: "pink",
      title: "導入コストもゼロ",
      desc: "Gmailアカウントで30秒で登録完了。IT部門の対応不要、研修不要。翌日から全社員がすぐに使い始められます。",
      stat: "30秒",
      statLabel: "セットアップ時間",
    },
  ];

  return (
    <section className="section-features" id="features">
      <div className="container">
        <div className="section-center fade-in">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span className="section-label-line" />
            FEATURES
          </div>
          <h2 className="section-heading">
            コスト削減を実現する<br className="br-desktop" />6つの仕組み
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>
            単なる値下げではなく、業務構造そのものを効率化して圧倒的なコストパフォーマンスを実現します。
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card fade-in stagger-${i + 1}`}
            >
              <div className={`feature-icon ${f.color}`}>{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
              <div className="feature-stat">
                <span className="feature-stat-number">{f.stat}</span>
                <span className="feature-stat-label">{f.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================================================================
// PRICING with competitor comparison
// ================================================================
function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="section-pricing" id="pricing">
      <div className="container">
        <div className="section-center fade-in">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span className="section-label-line" />
            PRICING
          </div>
          <h2 className="section-heading">
            業界最安クラスの料金体系
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>
            海外ツールの約1/3。国内ツールと比較しても最安水準。すべて税込・追加費用なし。
          </p>

          <div className="pricing-toggle">
            <span className={`pricing-toggle-label ${!annual ? "active" : ""}`}>月払い</span>
            <button
              className={`pricing-toggle-switch ${annual ? "on" : ""}`}
              onClick={() => setAnnual(!annual)}
              aria-label="年払いに切り替え"
            >
              <span className="pricing-toggle-knob" />
            </button>
            <span className={`pricing-toggle-label ${annual ? "active" : ""}`}>
              年払い
              <span className="pricing-toggle-save">2ヶ月分お得</span>
            </span>
          </div>
        </div>

        {/* Competitor comparison table */}
        <div className="fade-in" style={{ marginTop: 40, marginBottom: 48, overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
            background: "var(--bg-white)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}>
            <thead>
              <tr style={{ background: "var(--bg-off)", borderBottom: "2px solid var(--border)" }}>
                <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700, fontSize: 13, color: "var(--text-secondary)" }}>サービス</th>
                <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 700, fontSize: 13, color: "var(--text-secondary)" }}>月額料金</th>
                <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 700, fontSize: 13, color: "var(--text-secondary)" }}>メール生成数</th>
                <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 700, fontSize: 13, color: "var(--text-secondary)" }}>日本語対応</th>
                <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 700, fontSize: 13, color: "var(--text-secondary)" }}>無料プラン</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "rgba(59,130,246,0.04)", borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--accent)" }}>RAKUDAメール</td>
                <td style={{ padding: "14px 16px", textAlign: "center", fontWeight: 800, color: "var(--accent)" }}>{annual ? "¥2,480" : "¥2,980"}</td>
                <td style={{ padding: "14px 16px", textAlign: "center", fontWeight: 600 }}>無制限</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--success)" }}>&#10004;</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--success)" }}>&#10004; 月20通</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>海外ツールA</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text-secondary)" }}>$29（約¥4,500）</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text-secondary)" }}>月500通</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text-tertiary)" }}>&#9650; 限定的</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text-tertiary)" }}>&#10006;</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>海外ツールB</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text-secondary)" }}>$49（約¥7,500）</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text-secondary)" }}>無制限</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text-tertiary)" }}>&#10006;</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--success)" }}>&#10004; 月5通</td>
              </tr>
              <tr>
                <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>国内ツールC</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text-secondary)" }}>¥5,980</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text-secondary)" }}>月300通</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--success)" }}>&#10004;</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text-tertiary)" }}>&#10006;</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pricing cards */}
        <div className="pricing-grid">
          {/* Free */}
          <div className="pricing-card fade-in stagger-1">
            <div className="pricing-card-inner">
              <div className="pricing-name">Free</div>
              <div className="pricing-tagline">まずはコスト効果を体験</div>
              <div className="pricing-price">
                <span className="pricing-currency">&yen;</span>
                <span className="pricing-amount">0</span>
              </div>
              <div className="pricing-note">ずっと無料・クレカ不要</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feature"><span className="pricing-check blue"><CheckIcon /></span>月20通までのAIメール生成</li>
                <li className="pricing-feature"><span className="pricing-check blue"><CheckIcon /></span>3種類のトーン調整</li>
                <li className="pricing-feature"><span className="pricing-check blue"><CheckIcon /></span>基本テンプレート5件</li>
                <li className="pricing-feature"><span className="pricing-check blue"><CheckIcon /></span>Gmail連携</li>
              </ul>
              <a href="../signup?plan=free" className="pricing-btn outline" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>無料で始める</a>
            </div>
          </div>

          {/* Pro */}
          <div className="pricing-card popular fade-in stagger-2">
            <div className="pricing-popular-badge">コスパ最強</div>
            <div className="pricing-card-inner">
              <div className="pricing-name">Pro</div>
              <div className="pricing-tagline">メール業務のコストを劇的に削減</div>
              <div className="pricing-price">
                <span className="pricing-currency">&yen;</span>
                <span className="pricing-amount">{annual ? "2,480" : "2,980"}</span>
                <span className="pricing-period">/月</span>
              </div>
              <div className="pricing-note">
                {annual ? "年間29,760円（月額換算）" : "年間プランなら月¥2,480"}
              </div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feature"><span className="pricing-check accent"><CheckIcon /></span><strong>無制限</strong>のAIメール生成</li>
                <li className="pricing-feature"><span className="pricing-check accent"><CheckIcon /></span>全トーン＋カスタムトーン</li>
                <li className="pricing-feature"><span className="pricing-check accent"><CheckIcon /></span>テンプレート無制限</li>
                <li className="pricing-feature"><span className="pricing-check accent"><CheckIcon /></span>多言語対応（4言語）</li>
                <li className="pricing-feature"><span className="pricing-check accent"><CheckIcon /></span>優先サポート</li>
              </ul>
              <a href="../signup?plan=pro" className="pricing-btn filled" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>14日間無料で試す</a>
            </div>
          </div>

          {/* Enterprise */}
          <div className="pricing-card team fade-in stagger-3">
            <div className="pricing-card-inner">
              <div className="pricing-name">Enterprise</div>
              <div className="pricing-tagline">組織全体のコスト最適化に</div>
              <div className="pricing-price">
                <span className="pricing-amount" style={{ fontSize: 28 }}>お問い合わせ</span>
              </div>
              <div className="pricing-note">カスタム料金・SLA対応</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feature"><span className="pricing-check green"><CheckIcon /></span>Proの全機能</li>
                <li className="pricing-feature"><span className="pricing-check green"><CheckIcon /></span>チーム共有テンプレート</li>
                <li className="pricing-feature"><span className="pricing-check green"><CheckIcon /></span>管理者ダッシュボード</li>
                <li className="pricing-feature"><span className="pricing-check green"><CheckIcon /></span>SSO / SAML対応</li>
                <li className="pricing-feature"><span className="pricing-check green"><CheckIcon /></span>専任サポート担当</li>
              </ul>
              <a href="../book-call" className="pricing-btn dark" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>お問い合わせ</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// FAQ
// ================================================================
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section className="section-faq" id="faq">
      <div className="container">
        <div className="section-center fade-in">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span className="section-label-line" />
            FAQ
          </div>
          <h2 className="section-heading">コストに関するよくある質問</h2>
          <p className="section-description" style={{ margin: "0 auto" }}>
            料金・ROI・他社比較について、よくいただく質問にお答えします。
          </p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? "open" : ""}`}>
              <button className="faq-question" onClick={() => toggle(i)} aria-expanded={openIndex === i}>
                <span>{faq.q}</span>
                <span className="faq-chevron"><ChevronDown /></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================================================================
// CTA
// ================================================================
function CTASection() {
  return (
    <section className="section-cta" id="cta">
      <div className="container">
        <div className="cta-inner fade-in">
          <div className="cta-eyecatch"><SparkleIcon /></div>
          <h2 className="cta-heading">
            メール業務のコスト、今日から削減しませんか
          </h2>
          <p className="cta-desc">
            無料プランで今すぐ始められます。導入初月からROI達成。クレジットカード不要。
          </p>
          <div className="cta-actions">
            <a href="../signup" className="btn-primary btn-glow btn-large">
              <SparkleIcon />
              無料アカウントを作成
              <ArrowRight />
            </a>
          </div>
          <div className="cta-trust-signals">
            <div className="cta-trust-item"><CheckIcon /><span>永年無料プランあり</span></div>
            <div className="cta-trust-item"><CheckIcon /><span>クレカ不要</span></div>
            <div className="cta-trust-item"><CheckIcon /><span>いつでも解約可能</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// FOOTER
// ================================================================
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #E5E5E5", background: "#fff", padding: "40px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
            <path d="M10,75 C10,75 22,25 38,25 C52,25 44,65 56,65 C68,65 60,20 74,20 C90,20 100,75 100,75"
                  stroke="#1A1A2E" strokeWidth="7" fill="none" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 300, letterSpacing: "0.15em", color: "#111" }}>RAKUDA AI</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: 12 }}>サポート</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
              <li><a href="mailto:info@rakuda-ai.com" style={{ fontSize: 14, color: "#6B7280", textDecoration: "none" }}>info@rakuda-ai.com</a></li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: 12 }}>リンク</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
              <li><a href="../terms" style={{ fontSize: 14, color: "#6B7280", textDecoration: "none" }}>利用規約</a></li>
              <li><a href="../privacy" style={{ fontSize: 14, color: "#6B7280", textDecoration: "none" }}>プライバシーポリシー</a></li>
              <li><a href="../tokushoho" style={{ fontSize: 14, color: "#6B7280", textDecoration: "none" }}>特定商取引法</a></li>
              <li><a href="../security" style={{ fontSize: 14, color: "#6B7280", textDecoration: "none" }}>セキュリティ</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 24, textAlign: "center" as const, fontSize: 12, color: "#9CA3AF" }}>
          &copy; 2026 Rakuda AI Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ================================================================
// MAIN PAGE
// ================================================================
export default function CostLP() {
  useScrollFade();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
