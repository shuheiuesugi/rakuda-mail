"use client";

import { useEffect, useState, useCallback } from "react";

/* ================================================================
   /lp/easy — かんたんLP
   ターゲット: 技術に詳しくない営業・事務スタッフ
   やさしい日本語で全文記述
   ================================================================ */

// --- FAQ Data (初心者向け) ---
const FAQS = [
  {
    q: "パソコンに詳しくなくても使えますか？",
    a: "はい、まったく問題ありません。Gmailが使える方なら、すぐに始められます。特別なソフトのインストールも不要です。ウェブブラウザだけあればOKです。",
  },
  {
    q: "AIが作ったメール、おかしな文章になりませんか？",
    a: "ご安心ください。ビジネスメール専用のAIなので、敬語の使い方も、文章の流れも自然です。社内テストでは92%の方が「そのまま送れる」と評価しています。上司に見せても安心の品質です。",
  },
  {
    q: "メールの内容が外に漏れる心配はありませんか？",
    a: "ありません。メールの内容はAIが読んだらすぐに消去され、サーバーには一切残りません。Googleの公式認証を使っているので、パスワードを入力する必要もありません。",
  },
  {
    q: "お金はかかりますか？",
    a: "月20通までなら、ずっと無料です。クレジットカードの登録も不要です。もっとたくさん使いたい場合は、月額2,980円のプランがあります。いつでもやめられます。",
  },
  {
    q: "スマホからも使えますか？",
    a: "はい、スマホのブラウザからも使えます。移動中にメールの返信を作成して、あとでパソコンから確認・送信することもできます。",
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
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 5.5L4 8l5-6" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 7h12M8 2l5 5-5 5" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l4 4 4-4" />
    </svg>
  );
}

// ================================================================
// HEADER
// ================================================================
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <a href="../" className="header-logo">
          <div className="header-logo-icon">R</div>
          <div className="header-logo-text">
            ラクダ<span>Mail</span>
          </div>
        </a>

        <nav className={`header-nav ${mobileOpen ? "open" : ""}`}>
          <a href="#before-after" onClick={() => setMobileOpen(false)}>使い方</a>
          <a href="#features" onClick={() => setMobileOpen(false)}>できること</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)}>料金</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>よくある質問</a>
        </nav>

        <a href="../signup" className="header-cta">
          無料で始める
        </a>

        <button
          className={`mobile-menu-btn ${mobileOpen ? "open" : ""}`}
          aria-label="メニューを開く"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
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
            パソコンが使えれば大丈夫
          </div>

          <h1 style={{ marginBottom: 20 }}>
            メールを選ぶだけ。<br />
            <span className="accent-text">AIが書いてくれる。</span>
          </h1>

          <p className="hero-subtitle" style={{ margin: "0 auto 32px", maxWidth: 520, textAlign: "center" }}>
            「この返信、なんて書こう...」そんな悩みはもう終わり。<br />
            メールを選んでボタンを押すだけで、丁寧なビジネスメールが完成します。
          </p>

          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a href="../signup" className="btn-primary btn-glow">
              <SparkleIcon />
              無料で始める（30秒）
              <ArrowRight />
            </a>
            <a href="#how-it-works" className="btn-secondary">
              使い方を見る
            </a>
          </div>

          <div className="hero-stats" style={{ justifyContent: "center", marginTop: 40 }}>
            <div className="hero-stat">
              <div className="hero-stat-number">120社+</div>
              <div className="hero-stat-label">導入企業</div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <div className="hero-stat-number">92%</div>
              <div className="hero-stat-label">そのまま送れる</div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <div className="hero-stat-number">1分</div>
              <div className="hero-stat-label">でメール完成</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// BEFORE / AFTER
// ================================================================
function BeforeAfterSection() {
  return (
    <section className="section-before-after" id="before-after">
      <div className="container">
        <div className="fade-in">
          <div className="section-label">
            <span className="section-label-line" />
            こんなに変わります
          </div>
          <h2 className="section-heading">
            メール返信が<span className="heading-accent">こんなにラクに</span>
          </h2>
          <p className="section-description">
            今までのメール作業と、ラクダMailを使った場合を比べてみてください。
          </p>
        </div>

        <div className="ba-grid">
          {/* Before */}
          <div className="ba-card before fade-in-left">
            <div className="ba-card-label before">
              <span className="ba-label-icon">&#128553;</span>
              いままでのやり方
            </div>
            <div className="ba-card-body">
              <div className="ba-step">
                <div className="ba-step-time">5分</div>
                <div className="ba-step-desc">「なんて書けばいいんだろう...」と悩む</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time">5分</div>
                <div className="ba-step-desc">文章を打ち込む。敬語これで合ってる？</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time">3分</div>
                <div className="ba-step-desc">何度も読み返して、ちょっとずつ直す</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time">2分</div>
                <div className="ba-step-desc">「失礼じゃないかな...」と不安になる</div>
              </div>
              <div className="ba-total">
                <span className="ba-total-time bad">合計 15分 / 1通</span>
                <span className="ba-total-note">毎日この繰り返し...</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
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

          {/* After */}
          <div className="ba-card after fade-in-right">
            <div className="ba-card-label after">
              <span className="ba-label-icon">&#10024;</span>
              ラクダMailなら
            </div>
            <div className="ba-card-body">
              <div className="ba-step">
                <div className="ba-step-time fast">選ぶ</div>
                <div className="ba-step-desc">返信したいメールを選ぶだけ</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time fast">待つ</div>
                <div className="ba-step-desc">AIが1秒でメールを書いてくれる</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time fast">確認</div>
                <div className="ba-step-desc">読んで問題なければ送信ボタンを押す</div>
              </div>
              <div className="ba-total">
                <span className="ba-total-time good">合計 たったの30秒</span>
                <span className="ba-total-note">悩む時間がゼロに！</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// FEATURES (やさしく)
// ================================================================
function FeaturesSection() {
  const features = [
    {
      icon: "&#129302;",
      color: "blue",
      title: "AIがメールを書いてくれる",
      desc: "返信したいメールを選ぶだけ。AIが相手の話の内容を理解して、ぴったりの返信を自動で作ってくれます。",
      stat: "1秒",
      statLabel: "で完成",
    },
    {
      icon: "&#127917;",
      color: "purple",
      title: "丁寧さを選べる",
      desc: "「丁寧に」「親しみやすく」「短く」「英語で」の4つから選ぶだけ。同じ内容でも、相手に合わせた書き方に変わります。",
      stat: "4つ",
      statLabel: "の書き方",
    },
    {
      icon: "&#128221;",
      color: "green",
      title: "よく使う文章を保存",
      desc: "いつも使う挨拶やお礼のメールをテンプレートとして保存できます。次からはワンクリックで呼び出せます。",
      stat: "何件でも",
      statLabel: "保存OK",
    },
    {
      icon: "&#128101;",
      color: "amber",
      title: "チームみんなで使える",
      desc: "新人の方でもベテランと同じ品質のメールが書けます。チーム全員でテンプレートを共有できるので、メールの書き方で迷いません。",
      stat: "92%",
      statLabel: "そのまま送れる",
    },
    {
      icon: "&#127758;",
      color: "pink",
      title: "外国語メールもおまかせ",
      desc: "英語・中国語・韓国語のメールもAIが作ってくれます。翻訳アプリを使わなくても、自然な外国語メールが完成します。",
      stat: "4つ",
      statLabel: "の言語に対応",
    },
    {
      icon: "&#128274;",
      color: "navy",
      title: "メールの中身は残りません",
      desc: "あなたのメールの内容は、AIが読んだらすぐに消えます。サーバーには一切保存されないので、安心して使えます。",
      stat: "0件",
      statLabel: "データ保存なし",
    },
  ];

  return (
    <section className="section-features" id="features">
      <div className="container">
        <div className="section-center fade-in">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span className="section-label-line" />
            できること
          </div>
          <h2 className="section-heading">
            ラクダMailで<br className="br-desktop" />できること
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>
            むずかしい設定は何もありません。Gmailにログインするだけで、すぐに使い始められます。
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card fade-in stagger-${i + 1}`}
            >
              <div className={`feature-icon ${f.color}`} dangerouslySetInnerHTML={{ __html: f.icon }} />
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
// HOW IT WORKS
// ================================================================
function HowSection() {
  return (
    <section className="section-how" id="how-it-works">
      <div className="container">
        <div className="section-center fade-in">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span className="section-label-line" />
            使い方はかんたん3ステップ
          </div>
          <h2 className="section-heading">
            たった3つの手順で完了
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>
            むずかしい操作は一切ありません。ボタンを押していくだけです。
          </p>
        </div>

        <div className="how-steps">
          <div className="how-step fade-in stagger-1">
            <div className="how-step-number-wrap">
              <div className="how-step-number">1</div>
            </div>
            <h3 className="how-step-title">メールを選ぶ</h3>
            <p className="how-step-desc">
              返信したいメールをクリックするだけ。AIが中身を自動で読み取ります。
            </p>
          </div>

          <div className="how-connector fade-in">
            <svg width="100%" height="2" preserveAspectRatio="none">
              <line x1="0" y1="1" x2="100%" y2="1" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 6" />
            </svg>
          </div>

          <div className="how-step fade-in stagger-2">
            <div className="how-step-number-wrap">
              <div className="how-step-number">2</div>
            </div>
            <h3 className="how-step-title">書き方を選ぶ</h3>
            <p className="how-step-desc">
              「丁寧に」「親しみやすく」などを選ぶだけ。AIが相手に合わせたメールを1秒で作ります。
            </p>
          </div>

          <div className="how-connector fade-in">
            <svg width="100%" height="2" preserveAspectRatio="none">
              <line x1="0" y1="1" x2="100%" y2="1" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 6" />
            </svg>
          </div>

          <div className="how-step fade-in stagger-3">
            <div className="how-step-number-wrap">
              <div className="how-step-number">3</div>
            </div>
            <h3 className="how-step-title">確認して送信</h3>
            <p className="how-step-desc">
              できあがったメールを読んで、OKなら送信ボタンを押すだけ。修正したい部分は自由に直せます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// PRICING
// ================================================================
function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="section-pricing" id="pricing">
      <div className="container">
        <div className="section-center fade-in">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span className="section-label-line" />
            料金
          </div>
          <h2 className="section-heading">
            ずっと無料でも使えます
          </h2>
          <p className="section-description" style={{ margin: "0 auto" }}>
            まずは無料で試してみてください。クレジットカードの登録も不要です。
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

        <div className="pricing-grid">
          {/* Free */}
          <div className="pricing-card fade-in stagger-1">
            <div className="pricing-card-inner">
              <div className="pricing-name">無料プラン</div>
              <div className="pricing-tagline">まずは試してみたい方に</div>
              <div className="pricing-price">
                <span className="pricing-currency">&yen;</span>
                <span className="pricing-amount">0</span>
              </div>
              <div className="pricing-note">ずっと無料・クレカ不要</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feature"><span className="pricing-check blue"><CheckIcon /></span>月20通までメール作成</li>
                <li className="pricing-feature"><span className="pricing-check blue"><CheckIcon /></span>3つの書き方から選べる</li>
                <li className="pricing-feature"><span className="pricing-check blue"><CheckIcon /></span>テンプレート5件保存</li>
                <li className="pricing-feature"><span className="pricing-check blue"><CheckIcon /></span>Gmailとつながる</li>
              </ul>
              <a href="../signup" className="pricing-btn outline" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>無料で始める</a>
            </div>
          </div>

          {/* Pro */}
          <div className="pricing-card popular fade-in stagger-2">
            <div className="pricing-popular-badge">一番人気</div>
            <div className="pricing-card-inner">
              <div className="pricing-name">Proプラン</div>
              <div className="pricing-tagline">たくさんメールを使う方に</div>
              <div className="pricing-price">
                <span className="pricing-currency">&yen;</span>
                <span className="pricing-amount">{annual ? "2,480" : "2,980"}</span>
                <span className="pricing-period">/月</span>
              </div>
              <div className="pricing-note">
                {annual ? "年間29,760円（月額換算）" : "年払いなら月¥2,480でもっとお得"}
              </div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feature"><span className="pricing-check accent"><CheckIcon /></span>メール作成<strong>無制限</strong></li>
                <li className="pricing-feature"><span className="pricing-check accent"><CheckIcon /></span>4つの書き方+自分だけの設定</li>
                <li className="pricing-feature"><span className="pricing-check accent"><CheckIcon /></span>テンプレート無制限</li>
                <li className="pricing-feature"><span className="pricing-check accent"><CheckIcon /></span>英語・中国語・韓国語にも対応</li>
                <li className="pricing-feature"><span className="pricing-check accent"><CheckIcon /></span>困った時の優先サポート</li>
              </ul>
              <a href="../signup" className="pricing-btn filled" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>14日間無料で試す</a>
            </div>
          </div>

          {/* Enterprise */}
          <div className="pricing-card team fade-in stagger-3">
            <div className="pricing-card-inner">
              <div className="pricing-name">チームプラン</div>
              <div className="pricing-tagline">会社やチームで使いたい方に</div>
              <div className="pricing-price">
                <span className="pricing-amount" style={{ fontSize: 28 }}>お問い合わせ</span>
              </div>
              <div className="pricing-note">人数に合わせたお見積り</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feature"><span className="pricing-check green"><CheckIcon /></span>Proプランの全機能</li>
                <li className="pricing-feature"><span className="pricing-check green"><CheckIcon /></span>テンプレートをチームで共有</li>
                <li className="pricing-feature"><span className="pricing-check green"><CheckIcon /></span>管理者用の画面</li>
                <li className="pricing-feature"><span className="pricing-check green"><CheckIcon /></span>使い方レポート</li>
                <li className="pricing-feature"><span className="pricing-check green"><CheckIcon /></span>専任の担当者がサポート</li>
              </ul>
              <a href="../book-call" className="pricing-btn dark" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>相談する（無料）</a>
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
            よくある質問
          </div>
          <h2 className="section-heading">はじめての方からの質問</h2>
          <p className="section-description" style={{ margin: "0 auto" }}>
            「こんなこと聞いていいのかな？」という質問にもお答えします。
          </p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className={`faq-item fade-in stagger-${i + 1} ${openIndex === i ? "open" : ""}`}>
              <button className="faq-question" onClick={() => toggle(i)}>
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
            メール返信、今日からラクにしませんか？
          </h2>
          <p className="cta-desc">
            無料ではじめられます。クレジットカードも不要。<br />
            Gmailのアカウントがあれば、30秒で使い始められます。
          </p>
          <div className="cta-actions">
            <a href="../signup" className="btn-primary btn-glow btn-large">
              <SparkleIcon />
              無料で始める（30秒）
              <ArrowRight />
            </a>
          </div>
          <div className="cta-trust-signals">
            <div className="cta-trust-item"><CheckIcon /><span>ずっと無料で使える</span></div>
            <div className="cta-trust-item"><CheckIcon /><span>クレカ不要</span></div>
            <div className="cta-trust-item"><CheckIcon /><span>いつでもやめられる</span></div>
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
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="../" className="footer-logo">
              <div className="footer-logo-icon">R</div>
              <div className="footer-logo-text">ラクダ<span>Mail</span></div>
            </a>
            <p className="footer-brand-desc">
              AIがビジネスメールを自動で作成。<br />
              メール返信の悩みから解放します。
            </p>
          </div>
          <div>
            <h4 className="footer-col-title">プロダクト</h4>
            <ul className="footer-links">
              <li><a href="../#features">機能一覧</a></li>
              <li><a href="../#pricing">料金プラン</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">サポート</h4>
            <ul className="footer-links">
              <li><a href="../book-call">お問い合わせ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">会社</h4>
            <ul className="footer-links">
              <li><a href="../tokushoho">特定商取引法</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2026 ラクダMail. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="../terms">利用規約</a>
            <a href="../privacy">プライバシーポリシー</a>
            <a href="../tokushoho">特定商取引法に基づく表記</a>
            <a href="../security">セキュリティ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ================================================================
// MAIN PAGE
// ================================================================
export default function EasyLP() {
  useScrollFade();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BeforeAfterSection />
        <FeaturesSection />
        <HowSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
