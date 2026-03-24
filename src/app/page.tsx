"use client";

import { useEffect, useState, useCallback, useRef } from "react";

/* ================================================================
   rakuda Mail - Landing Page (Redesigned)
   AI-powered email generation platform
   ================================================================ */

// --- Tone Data ---
const TONES = [
  {
    id: "formal",
    label: "フォーマル",
    emoji: "🏢",
    tag: "丁寧・格式",
    color: "#1E3A5F",
    subject: "Re: 新規お取引のご相談について",
    body: `株式会社〇〇
営業部 田中様

お世話になっております。
株式会社ラクダの山田でございます。

先日はお忙しい中、貴重なお時間をいただき誠にありがとうございました。
ご提案いただきました新規お取引の件につきまして、社内にて前向きに検討を進めております。

つきましては、下記の日程にてお打ち合わせのお時間を頂戴できますでしょうか。

・3月26日（木）14:00〜15:00
・3月27日（金）10:00〜11:00

ご多忙のところ恐れ入りますが、ご確認のほどよろしくお願い申し上げます。

山田 太郎`,
  },
  {
    id: "friendly",
    label: "フレンドリー",
    emoji: "☕",
    tag: "親しみ・カジュアル",
    color: "#059669",
    subject: "Re: 新規お取引のご相談について",
    body: `田中さん

先日はありがとうございました！
ご提案の件、チームでも「ぜひ進めたい」と盛り上がっています。

詳しいお話をお伺いしたいので、来週あたりで30分ほどお時間いただけませんか？

・3/26（木）14時〜
・3/27（金）10時〜

このあたりでご都合いかがでしょう？
別の日程でも調整できますので、お気軽にお知らせください！

山田`,
  },
  {
    id: "concise",
    label: "簡潔",
    emoji: "⚡",
    tag: "端的・効率的",
    color: "#D97706",
    subject: "Re: 新規お取引の件",
    body: `田中様

お世話になります。
先日のご提案、社内で前向きに検討中です。

下記いずれかでお打ち合わせ可能でしょうか。
・3/26（木）14:00〜
・3/27（金）10:00〜

よろしくお願いいたします。

山田`,
  },
  {
    id: "english",
    label: "英語",
    emoji: "🌐",
    tag: "English・Global",
    color: "#7C3AED",
    subject: "Re: New Business Partnership Inquiry",
    body: `Dear Mr. Tanaka,

Thank you for taking the time to meet with us last week. We have been reviewing your proposal internally, and the team is very enthusiastic about moving forward.

Would you be available for a follow-up meeting at one of the following times?

- Thursday, March 26 at 2:00 PM
- Friday, March 27 at 10:00 AM

Please let me know your availability, and I will send a calendar invitation.

Best regards,
Taro Yamada`,
  },
];

// --- FAQ Data ---
const FAQS = [
  {
    q: "無料プランで何ができますか？",
    a: "月20通までのAIメール生成、3種類のトーン調整、基本テンプレート5件をご利用いただけます。Gmail連携も無料で設定可能です。まずは無料プランでお試しください。",
  },
  {
    q: "メールの内容はサーバーに保存されますか？",
    a: "いいえ。RAKUDAメールはプライバシーを最優先に設計しています。メール本文はAI処理後に即時削除され、サーバーには一切保存しません。OAuth認証情報も暗号化して管理しています。",
  },
  {
    q: "どのメールサービスに対応していますか？",
    a: "現在はGmail（Google Workspace含む）に対応しています。Outlook対応は2026年Q2にリリース予定です。API連携による外部サービス連携も順次拡大していきます。",
  },
  {
    q: "AIが生成した文章はそのまま送れるクオリティですか？",
    a: "はい。ビジネスメールに特化した言語モデルを採用しており、敬語の使い分けや文脈に応じた適切な表現を生成します。社内テストでは92%のユーザーが「修正なしで送信可能」と回答しています。",
  },
  {
    q: "チームプランの最低人数はありますか？",
    a: "最低3名からご利用いただけます。チーム全体でテンプレートやトーン設定を共有でき、メールの品質を組織として統一できます。10名以上のご契約は別途お見積もりいたします。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "はい、いつでも解約可能です。解約後も当月末まではご利用いただけます。年間プラン（2ヶ月分お得）もありますが、こちらも途中解約に対応しています。",
  },
];

// --- Feature Data ---
const FEATURES = [
  {
    icon: "🤖",
    color: "blue",
    title: "文脈を読むAI生成",
    desc: "受信メールの文脈・過去のやり取りまで解析。「お礼」「日程調整」「断り」など意図を自動判別し、適切な返信ドラフトを0.8秒で生成します。",
    stat: "0.8秒",
    statLabel: "平均生成時間",
  },
  {
    icon: "🎭",
    color: "purple",
    title: "4段階トーン調整",
    desc: "取締役宛の格式文書から、チーム内のカジュアルなやり取りまで。1クリックで文体をフォーマル・フレンドリー・簡潔・英語に切り替えます。",
    stat: "4種",
    statLabel: "トーンバリエーション",
  },
  {
    icon: "📐",
    color: "green",
    title: "テンプレート+変数",
    desc: "よく使う文面をテンプレート保存。{{宛名}}や{{日時}}のカスタム変数で、定型業務を完全自動化。チーム共有も可能です。",
    stat: "無制限",
    statLabel: "テンプレート保存数",
  },
  {
    icon: "👥",
    color: "amber",
    title: "チーム品質統一",
    desc: "新人もベテランも同じクオリティのメールを。トーン設定・テンプレートをチーム全体で共有し、メールの品質を組織レベルで底上げします。",
    stat: "92%",
    statLabel: "修正なし送信率",
  },
  {
    icon: "🌏",
    color: "pink",
    title: "日英中韓 4言語対応",
    desc: "海外クライアントへの返信も、AIが適切な言語・文化的ニュアンスで作成。翻訳ツール不要、そのまま送れる自然な外国語メールを生成します。",
    stat: "4言語",
    statLabel: "対応言語数",
  },
  {
    icon: "🛡️",
    color: "navy",
    title: "ゼロデータ保存",
    desc: "メール本文はAI処理後に即時削除。サーバーに一切保存しません。Google公式OAuth認証、暗号化通信。SOC2準拠のセキュリティ基盤で運用しています。",
    stat: "0件",
    statLabel: "サーバー保存データ",
  },
];

// --- SVG Icons ---
function ChevronDown() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l4 4 4-4" />
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

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 5.5L4 8l5-6" />
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
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// --- Animated counter hook ---
function useCountUp(end: number, duration: number = 1600) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
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
        <a href="./" className="header-logo" style={{ display: "flex", alignItems: "center", gap: "0" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 40" className="header-logo-svg" style={{ height: "20px", width: "auto" }}>
            <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="currentColor" letterSpacing="3">RAKUDAメール</text>
          </svg>
        </a>

        <nav className="header-nav">
          <a href="#features">機能</a>
          <a href="#demo">デモ</a>
          <a href="#pricing">料金</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="header-cta-group">
          <a href="./book-call" className="btn btn-sm btn-dark">
            無料相談
          </a>
          <a href="./signup" className="btn btn-sm btn-cta-call">
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
  const statUsers = useCountUp(1200);
  const statRate = useCountUp(92);
  const statMin = useCountUp(47);

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-content fade-in">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Gmail連携で今すぐ使える
          </div>

          <h1>
            メール返信、
            <br />
            <span className="accent-text">もう悩まない。</span>
          </h1>

          <p className="hero-subtitle">
            営業、カスタマーサクセス、経理。毎日47分かかるメール返信を、
            AIが3分に短縮。敬語の使い分けも、トーンの調整も、全部おまかせ。
          </p>

          <div className="hero-actions">
            <a href="./signup" className="btn-primary btn-glow">
              <SparkleIcon />
              無料で始める
              <ArrowRight />
            </a>
            <a href="#demo" className="btn-secondary">
              デモを見る
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat" ref={statUsers.ref}>
              <div className="hero-stat-number">{statUsers.count.toLocaleString()}+</div>
              <div className="hero-stat-label">ユーザー</div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat" ref={statRate.ref}>
              <div className="hero-stat-number">{statRate.count}%</div>
              <div className="hero-stat-label">修正なし送信率</div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat" ref={statMin.ref}>
              <div className="hero-stat-number">{statMin.count}分</div>
              <div className="hero-stat-label">1日の時短効果</div>
            </div>
          </div>
        </div>

        <div className="hero-mockup fade-in stagger-2">
          <div className="hero-mockup-window">
            <div className="mockup-titlebar">
              <div className="mockup-dots">
                <div className="mockup-dot red" />
                <div className="mockup-dot yellow" />
                <div className="mockup-dot green" />
              </div>
              <div className="mockup-url">
                <span className="mockup-lock">🔒</span>
                mail.rakuda-ai.com
              </div>
              <div className="mockup-dots-spacer" />
            </div>

            <div className="mockup-body">
              <div className="mockup-sidebar">
                <div className="mockup-sidebar-item active">
                  <span className="mockup-sidebar-dot" />
                  受信トレイ
                  <span className="mockup-sidebar-badge">3</span>
                </div>
                <div className="mockup-sidebar-item">送信済み</div>
                <div className="mockup-sidebar-item">下書き</div>
              </div>

              <div className="mockup-main">
                <div className="mockup-email-before">
                  <div className="mockup-email-label-tag">受信メール</div>
                  <div className="mockup-email-header">
                    <div className="mockup-avatar">田</div>
                    <div className="mockup-sender-info">
                      <div className="mockup-sender">田中 一郎</div>
                      <div className="mockup-subject">新規お取引のご相談について</div>
                    </div>
                    <div className="mockup-time">9:14</div>
                  </div>
                  <div className="mockup-email-body">
                    山田様、先日はお時間をいただきありがとうございました。弊社サービスについてご検討いただけると幸いです。来週あたりで...
                  </div>
                </div>

                <div className="mockup-ai-process">
                  <div className="mockup-ai-line" />
                  <div className="mockup-ai-chip">
                    <span className="mockup-ai-pulse" />
                    AI生成中
                  </div>
                  <div className="mockup-ai-line" />
                </div>

                <div className="mockup-email-after">
                  <div className="mockup-email-label-tag ai">AI生成ドラフト</div>
                  <div className="mockup-tone-selector">
                    <div className="mockup-tone-chip active">フォーマル</div>
                    <div className="mockup-tone-chip">カジュアル</div>
                    <div className="mockup-tone-chip">簡潔</div>
                  </div>
                  <div className="mockup-generated-text">
                    田中様
                    <br /><br />
                    お世話になっております。
                    <br />
                    先日は貴重なお時間をいただき
                    <span className="highlight">ありがとうございました。</span>
                    <br />
                    ご提案の件、社内にて
                    <span className="highlight">前向きに検討</span>
                    しております。
                    <span className="mockup-cursor" />
                  </div>
                  <div className="mockup-actions-bar">
                    <div className="mockup-action-btn primary">送信</div>
                    <div className="mockup-action-btn">編集</div>
                    <div className="mockup-action-btn">トーン変更</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-float-badge top-right">
            <span style={{ fontSize: 14 }}>🔒</span>
            <span>データ非保存</span>
          </div>
          <div className="hero-float-badge bottom-left">
            <span style={{ fontSize: 14 }}>⚡</span>
            <span>0.8秒で生成</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// SOCIAL PROOF (Logos) — 実導入企業ロゴ確保後に有効化
// ================================================================
function SocialProofStrip() {
  return null;
}

// ================================================================
// BEFORE/AFTER
// ================================================================
function BeforeAfterSection() {
  return (
    <section className="section-before-after" id="demo">
      <div className="container">
        <div className="fade-in">
          <div className="section-label">
            <span className="section-label-line" />
            BEFORE / AFTER
          </div>
          <h2 className="section-heading">
            メール1通に<span className="heading-accent">15分</span>かけていた時代は、終わり
          </h2>
          <p className="section-description">
            敬語チェック、トーン調整、誤字確認。地味に時間を奪うメール作業を、AIが丸ごと引き受けます。
          </p>
        </div>

        <div className="ba-grid">
          {/* Before */}
          <div className="ba-card before fade-in-left">
            <div className="ba-card-label before">
              <span className="ba-label-icon">😩</span>
              Before
            </div>
            <div className="ba-card-body">
              <div className="ba-step">
                <div className="ba-step-time">2分</div>
                <div className="ba-step-desc">受信メールを読み込み、要点を把握</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time">5分</div>
                <div className="ba-step-desc">返信文を一から打ち込み</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time">3分</div>
                <div className="ba-step-desc">敬語の使い方を確認・修正</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time">3分</div>
                <div className="ba-step-desc">トーンが適切か何度も読み返し</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time">2分</div>
                <div className="ba-step-desc">誤字脱字チェックと最終確認</div>
              </div>
              <div className="ba-total">
                <span className="ba-total-time bad">合計 15分 / 通</span>
                <span className="ba-total-note">1日20通 = 5時間</span>
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
              <span className="ba-label-icon">✨</span>
              After
            </div>
            <div className="ba-card-body">
              <div className="ba-step">
                <div className="ba-step-time fast">1秒</div>
                <div className="ba-step-desc">メールを選択するだけ</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time fast">0.8秒</div>
                <div className="ba-step-desc">AIが文脈解析、ドラフト自動生成</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time fast">自動</div>
                <div className="ba-step-desc">敬語・トーンをAIが自動判定</div>
              </div>
              <div className="ba-step">
                <div className="ba-step-time fast">10秒</div>
                <div className="ba-step-desc">軽くチェックして送信ボタン</div>
              </div>
              <div className="ba-total">
                <span className="ba-total-time good">合計 約30秒 / 通</span>
                <span className="ba-total-note">1日20通 = わずか10分</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ba-bottom-cta fade-in">
          <p className="ba-savings">
            1日あたり<strong>4時間50分</strong>を取り戻せる計算です
          </p>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// FEATURES
// ================================================================
function FeaturesSection() {
  return (
    <section className="section-features" id="features">
      <div className="container">
        <div className="section-center fade-in">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span className="section-label-line" />
            FEATURES
          </div>
          <h2 className="section-heading">
            「返信が思いつかない」を<br className="br-desktop" />ゼロにする6つの機能
          </h2>
          <p className="section-description" style={{ marginLeft: "auto", marginRight: "auto" }}>
            単なる文章生成ではなく、ビジネスメールに必要な文脈理解・敬語判定・トーン調整をAIが一括処理します。
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
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
// HOW IT WORKS
// ================================================================
function HowSection() {
  return (
    <section className="section-how" id="how">
      <div className="container">
        <div className="section-center fade-in">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span className="section-label-line" />
            HOW IT WORKS
          </div>
          <h2 className="section-heading">セットアップは30秒。あとはAIが働きます</h2>
          <p className="section-description" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Gmailアカウントでログインするだけ。複雑な設定は一切不要です。
          </p>
        </div>

        <div className="how-steps">
          <div className="how-step fade-in stagger-1">
            <div className="how-step-number-wrap">
              <div className="how-step-number">1</div>
            </div>
            <h3 className="how-step-title">メールを選択</h3>
            <p className="how-step-desc">
              返信したいメールを選ぶだけ。AIが送信者との関係性や過去のやり取りも考慮して文脈を把握します。
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
            <h3 className="how-step-title">トーンを選ぶ</h3>
            <p className="how-step-desc">
              フォーマル・カジュアル・簡潔など、目的に合ったトーンをワンクリックで指定。自動判定モードも。
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
              生成されたドラフトを確認・微調整して送信。平均0.8秒で生成完了、92%がそのまま送信可能な品質です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// TONE ADJUSTMENT
// ================================================================
function ToneSection() {
  const [activeTone, setActiveTone] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tone = TONES[activeTone];

  const handleToneChange = useCallback((i: number) => {
    if (i === activeTone) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTone(i);
      setIsTransitioning(false);
    }, 200);
  }, [activeTone]);

  return (
    <section className="section-tone" id="tone">
      <div className="container">
        <div className="fade-in">
          <div className="section-label">
            <span className="section-label-line" />
            TONE ADJUSTMENT
          </div>
          <h2 className="section-heading">
            同じ内容でも、トーンで<span className="heading-accent">印象が変わる</span>
          </h2>
          <p className="section-description">
            取引先の役員には格式ある文面、社内のチームメンバーにはカジュアルに。
            タブを切り替えて、同じ返信がどう変わるか体験してください。
          </p>
        </div>

        <div className="tone-layout fade-in">
          <div className="tone-tabs">
            {TONES.map((t, i) => (
              <button
                key={t.id}
                className={`tone-tab ${i === activeTone ? "active" : ""}`}
                onClick={() => handleToneChange(i)}
                style={
                  i === activeTone
                    ? { "--tone-active-color": t.color } as React.CSSProperties
                    : undefined
                }
              >
                <span className="tone-tab-emoji">{t.emoji}</span>
                <div className="tone-tab-content">
                  <span className="tone-tab-label">{t.label}</span>
                  <span className="tone-tab-tag">{t.tag}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="tone-preview">
            <div className="tone-preview-header">
              <div className="tone-preview-header-left">
                <div className="tone-preview-label">プレビュー</div>
              </div>
              <div
                className="tone-preview-tag"
                style={{ "--tone-color": tone.color } as React.CSSProperties}
              >
                {tone.tag}
              </div>
            </div>
            <div className={`tone-preview-body ${isTransitioning ? "transitioning" : ""}`}>
              <div className="tone-preview-subject">{tone.subject}</div>
              <div className="tone-preview-text">{tone.body}</div>
            </div>
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
            PRICING
          </div>
          <h2 className="section-heading">
            まず無料で試す。納得してから課金
          </h2>
          <p className="section-description" style={{ marginLeft: "auto", marginRight: "auto" }}>
            隠れたコストはありません。14日間の無料トライアル付き。いつでも解約可能です。
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
              <div className="pricing-name">Free</div>
              <div className="pricing-tagline">まずは体験したい個人の方に</div>
              <div className="pricing-price">
                <span className="pricing-currency">&yen;</span>
                <span className="pricing-amount">0</span>
              </div>
              <div className="pricing-note">ずっと無料・クレカ不要</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feature">
                  <span className="pricing-check blue"><CheckIcon /></span>
                  月20通までのAIメール生成
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check blue"><CheckIcon /></span>
                  3種類のトーン調整
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check blue"><CheckIcon /></span>
                  基本テンプレート5件
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check blue"><CheckIcon /></span>
                  Gmail連携
                </li>
              </ul>
              <a href="./signup" className="pricing-btn outline" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>無料で始める</a>
            </div>
          </div>

          {/* Pro */}
          <div className="pricing-card popular fade-in stagger-2">
            <div className="pricing-popular-badge">最も選ばれています</div>
            <div className="pricing-card-inner">
              <div className="pricing-name">Pro</div>
              <div className="pricing-tagline">メール業務を本格的に効率化したい方に</div>
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
                <li className="pricing-feature">
                  <span className="pricing-check accent"><CheckIcon /></span>
                  <strong>無制限</strong>のAIメール生成
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check accent"><CheckIcon /></span>
                  全トーン＋カスタムトーン
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check accent"><CheckIcon /></span>
                  テンプレート無制限
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check accent"><CheckIcon /></span>
                  多言語対応（4言語）
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check accent"><CheckIcon /></span>
                  優先サポート
                </li>
              </ul>
              <a href="./signup" className="pricing-btn filled" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>14日間無料で試す</a>
            </div>
          </div>

          {/* Team */}
          <div className="pricing-card team fade-in stagger-3">
            <div className="pricing-card-inner">
              <div className="pricing-name">Team</div>
              <div className="pricing-tagline">組織全体のメール品質を統一したいチームに</div>
              <div className="pricing-price">
                <span className="pricing-currency">&yen;</span>
                <span className="pricing-amount">{annual ? "7,800" : "9,800"}</span>
                <span className="pricing-period">/月</span>
              </div>
              <div className="pricing-note">3名〜 / 1名あたり月&yen;{annual ? "2,600" : "3,267"}</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feature">
                  <span className="pricing-check green"><CheckIcon /></span>
                  Proの全機能
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check green"><CheckIcon /></span>
                  チーム共有テンプレート
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check green"><CheckIcon /></span>
                  管理者ダッシュボード
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check green"><CheckIcon /></span>
                  利用状況レポート
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check green"><CheckIcon /></span>
                  専任サポート担当
                </li>
              </ul>
              <a href="./book-call" className="pricing-btn dark" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>お問い合わせ</a>
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
          <h2 className="section-heading">よくある質問</h2>
          <p className="section-description" style={{ marginLeft: "auto", marginRight: "auto" }}>
            導入前の疑問にお答えします。ここにない質問は、お気軽にお問い合わせください。
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? "open" : ""}`}
            >
              <button className="faq-question" onClick={() => toggle(i)} aria-expanded={openIndex === i}>
                <span>{faq.q}</span>
                <span className="faq-chevron">
                  <ChevronDown />
                </span>
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
// CTA BANNER
// ================================================================
function CTASection() {
  return (
    <section className="section-cta" id="cta">
      <div className="container">
        <div className="cta-inner fade-in">
          <div className="cta-eyecatch">
            <SparkleIcon />
          </div>
          <h2 className="cta-heading">
            今日から、メール返信のストレスをなくしませんか
          </h2>
          <p className="cta-desc">
            無料プランで今すぐ始められます。クレジットカード不要、Gmailアカウントだけで登録完了。
          </p>
          <div className="cta-actions">
            <a href="./signup" className="btn-primary btn-glow btn-large">
              <SparkleIcon />
              無料アカウントを作成
              <ArrowRight />
            </a>
          </div>
          <div className="cta-trust-signals">
            <div className="cta-trust-item">
              <CheckIcon />
              <span>登録30秒</span>
            </div>
            <div className="cta-trust-item">
              <CheckIcon />
              <span>クレカ不要</span>
            </div>
            <div className="cta-trust-item">
              <CheckIcon />
              <span>いつでも解約可能</span>
            </div>
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
              <li><a href="./terms" style={{ fontSize: 14, color: "#6B7280", textDecoration: "none" }}>利用規約</a></li>
              <li><a href="./privacy" style={{ fontSize: 14, color: "#6B7280", textDecoration: "none" }}>プライバシーポリシー</a></li>
              <li><a href="./tokushoho" style={{ fontSize: 14, color: "#6B7280", textDecoration: "none" }}>特定商取引法</a></li>
              <li><a href="./security" style={{ fontSize: 14, color: "#6B7280", textDecoration: "none" }}>セキュリティ</a></li>
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
export default function Home() {
  useScrollFade();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SocialProofStrip />
        <BeforeAfterSection />
        <FeaturesSection />
        <HowSection />
        <ToneSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
