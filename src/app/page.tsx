"use client";

import { useEffect, useState, useCallback } from "react";

/* ================================================================
   rakuda Mail - Landing Page
   AI-powered email generation platform
   ================================================================ */

// --- Tone Data ---
const TONES = [
  {
    id: "formal",
    label: "\u30D5\u30A9\u30FC\u30DE\u30EB",
    emoji: "\uD83D\uDC54",
    tag: "\u4E01\u5BE7\u30FB\u683C\u5F0F",
    subject: "Re: \u65B0\u898F\u304A\u53D6\u5F15\u306E\u3054\u76F8\u8AC7\u306B\u3064\u3044\u3066",
    body: `\u682A\u5F0F\u4F1A\u793E\u25CB\u25CB
\u55B6\u696D\u90E8 \u7530\u4E2D\u69D8

\u304A\u4E16\u8A71\u306B\u306A\u3063\u3066\u304A\u308A\u307E\u3059\u3002
\u682A\u5F0F\u4F1A\u793E\u30E9\u30AF\u30C0\u306E\u5C71\u7530\u3067\u3054\u3056\u3044\u307E\u3059\u3002

\u5148\u65E5\u306F\u304A\u5FD9\u3057\u3044\u4E2D\u3001\u8CB4\u91CD\u306A\u304A\u6642\u9593\u3092\u3044\u305F\u3060\u304D\u8AA0\u306B\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3057\u305F\u3002
\u3054\u63D0\u6848\u3044\u305F\u3060\u304D\u307E\u3057\u305F\u65B0\u898F\u304A\u53D6\u5F15\u306E\u4EF6\u306B\u3064\u304D\u307E\u3057\u3066\u3001\u793E\u5185\u306B\u3066\u524D\u5411\u304D\u306B\u691C\u8A0E\u3092\u9032\u3081\u3066\u304A\u308A\u307E\u3059\u3002

\u3064\u304D\u307E\u3057\u3066\u306F\u3001\u4E0B\u8A18\u306E\u65E5\u7A0B\u306B\u3066\u304A\u6253\u3061\u5408\u308F\u305B\u306E\u304A\u6642\u9593\u3092\u9802\u6234\u3067\u304D\u307E\u3059\u3067\u3057\u3087\u3046\u304B\u3002

\u30FB3\u670826\u65E5\uFF08\u6728\uFF0914:00\u301C15:00
\u30FB3\u670827\u65E5\uFF08\u91D1\uFF0910:00\u301C11:00

\u3054\u591A\u5FD9\u306E\u3068\u3053\u308D\u6050\u308C\u5165\u308A\u307E\u3059\u304C\u3001\u3054\u78BA\u8A8D\u306E\u307B\u3069\u3088\u308D\u3057\u304F\u304A\u9858\u3044\u7533\u3057\u4E0A\u3052\u307E\u3059\u3002

\u5C71\u7530 \u592A\u90CE`,
  },
  {
    id: "friendly",
    label: "\u30D5\u30EC\u30F3\u30C9\u30EA\u30FC",
    emoji: "\uD83D\uDC4B",
    tag: "\u89AA\u3057\u307F\u30FB\u30AB\u30B8\u30E5\u30A2\u30EB",
    subject: "Re: \u65B0\u898F\u304A\u53D6\u5F15\u306E\u3054\u76F8\u8AC7\u306B\u3064\u3044\u3066",
    body: `\u7530\u4E2D\u3055\u3093

\u5148\u65E5\u306F\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3057\u305F\uFF01
\u3054\u63D0\u6848\u306E\u4EF6\u3001\u30C1\u30FC\u30E0\u3067\u3082\u300C\u305C\u3072\u9032\u3081\u305F\u3044\u300D\u3068\u76DB\u308A\u4E0A\u304C\u3063\u3066\u3044\u307E\u3059\u3002

\u8A73\u3057\u3044\u304A\u8A71\u3092\u304A\u4F3A\u3044\u3057\u305F\u3044\u306E\u3067\u3001\u6765\u9031\u3042\u305F\u308A\u306730\u5206\u307B\u3069\u304A\u6642\u9593\u3044\u305F\u3060\u3051\u307E\u305B\u3093\u304B\uFF1F

\u30FB3/26\uFF08\u6728\uFF0914\u6642\u301C
\u30FB3/27\uFF08\u91D1\uFF0910\u6642\u301C

\u3053\u306E\u3042\u305F\u308A\u3067\u3054\u90FD\u5408\u3044\u304B\u304C\u3067\u3057\u3087\u3046\uFF1F
\u5225\u306E\u65E5\u7A0B\u3067\u3082\u8ABF\u6574\u3067\u304D\u307E\u3059\u306E\u3067\u3001\u304A\u6C17\u8EFD\u306B\u304A\u77E5\u3089\u305B\u304F\u3060\u3055\u3044\uFF01

\u5C71\u7530`,
  },
  {
    id: "concise",
    label: "\u7C21\u6F54",
    emoji: "\u26A1",
    tag: "\u7AEF\u7684\u30FB\u52B9\u7387\u7684",
    subject: "Re: \u65B0\u898F\u304A\u53D6\u5F15\u306E\u4EF6",
    body: `\u7530\u4E2D\u69D8

\u304A\u4E16\u8A71\u306B\u306A\u308A\u307E\u3059\u3002
\u5148\u65E5\u306E\u3054\u63D0\u6848\u3001\u793E\u5185\u3067\u524D\u5411\u304D\u306B\u691C\u8A0E\u4E2D\u3067\u3059\u3002

\u4E0B\u8A18\u3044\u305A\u308C\u304B\u3067\u304A\u6253\u3061\u5408\u308F\u305B\u53EF\u80FD\u3067\u3057\u3087\u3046\u304B\u3002
\u30FB3/26\uFF08\u6728\uFF0914:00\u301C
\u30FB3/27\uFF08\u91D1\uFF0910:00\u301C

\u3088\u308D\u3057\u304F\u304A\u9858\u3044\u3044\u305F\u3057\u307E\u3059\u3002

\u5C71\u7530`,
  },
  {
    id: "english",
    label: "\u82F1\u8A9E",
    emoji: "\uD83C\uDF0F",
    tag: "English\u30FBGlobal",
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
    q: "\u7121\u6599\u30D7\u30E9\u30F3\u3067\u4F55\u304C\u3067\u304D\u307E\u3059\u304B\uFF1F",
    a: "\u670820\u901A\u307E\u3067\u306EAI\u30E1\u30FC\u30EB\u751F\u6210\u30013\u7A2E\u985E\u306E\u30C8\u30FC\u30F3\u8ABF\u6574\u3001\u57FA\u672C\u30C6\u30F3\u30D7\u30EC\u30FC\u30C85\u4EF6\u3092\u3054\u5229\u7528\u3044\u305F\u3060\u3051\u307E\u3059\u3002Gmail\u9023\u643A\u3082\u7121\u6599\u3067\u8A2D\u5B9A\u53EF\u80FD\u3067\u3059\u3002\u307E\u305A\u306F\u7121\u6599\u30D7\u30E9\u30F3\u3067\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002",
  },
  {
    q: "\u30E1\u30FC\u30EB\u306E\u5185\u5BB9\u306F\u30B5\u30FC\u30D0\u30FC\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\u304B\uFF1F",
    a: "\u3044\u3044\u3048\u3002\u30E9\u30AF\u30C0Mail\u306F\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u3092\u6700\u512A\u5148\u306B\u8A2D\u8A08\u3057\u3066\u3044\u307E\u3059\u3002\u30E1\u30FC\u30EB\u672C\u6587\u306FAI\u51E6\u7406\u5F8C\u306B\u5373\u6642\u524A\u9664\u3055\u308C\u3001\u30B5\u30FC\u30D0\u30FC\u306B\u306F\u4E00\u5207\u4FDD\u5B58\u3057\u307E\u305B\u3093\u3002OAuth\u8A8D\u8A3C\u60C5\u5831\u3082\u6697\u53F7\u5316\u3057\u3066\u7BA1\u7406\u3057\u3066\u3044\u307E\u3059\u3002",
  },
  {
    q: "\u3069\u306E\u30E1\u30FC\u30EB\u30B5\u30FC\u30D3\u30B9\u306B\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u3059\u304B\uFF1F",
    a: "\u73FE\u5728\u306FGmail\uFF08Google Workspace\u542B\u3080\uFF09\u306B\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u3059\u3002Outlook\u5BFE\u5FDC\u306F2026\u5E74Q2\u306B\u30EA\u30EA\u30FC\u30B9\u4E88\u5B9A\u3067\u3059\u3002API\u306B\u3088\u308B\u5916\u90E8\u30B5\u30FC\u30D3\u30B9\u9023\u643A\u3082\u9806\u6B21\u62E1\u5927\u3057\u3066\u3044\u304D\u307E\u3059\u3002",
  },
  {
    q: "AI\u304C\u751F\u6210\u3057\u305F\u6587\u7AE0\u306F\u305D\u306E\u307E\u307E\u9001\u308C\u308B\u30AF\u30AA\u30EA\u30C6\u30A3\u3067\u3059\u304B\uFF1F",
    a: "\u306F\u3044\u3002\u30D3\u30B8\u30CD\u30B9\u30E1\u30FC\u30EB\u306B\u7279\u5316\u3057\u305F\u8A00\u8A9E\u30E2\u30C7\u30EB\u3092\u63A1\u7528\u3057\u3066\u304A\u308A\u3001\u656C\u8A9E\u306E\u4F7F\u3044\u5206\u3051\u3084\u6587\u8108\u306B\u5FDC\u3058\u305F\u9069\u5207\u306A\u8868\u73FE\u3092\u751F\u6210\u3057\u307E\u3059\u3002\u3082\u3061\u308D\u3093\u9001\u4FE1\u524D\u306E\u78BA\u8A8D\u30FB\u7DE8\u96C6\u3082\u53EF\u80FD\u3067\u3059\u3002\u793E\u5185\u30C6\u30B9\u30C8\u3067\u306F92%\u306E\u30E6\u30FC\u30B6\u30FC\u304C\u300C\u4FEE\u6B63\u306A\u3057\u3067\u9001\u4FE1\u53EF\u80FD\u300D\u3068\u56DE\u7B54\u3057\u3066\u3044\u307E\u3059\u3002",
  },
  {
    q: "\u30C1\u30FC\u30E0\u30D7\u30E9\u30F3\u306E\u6700\u4F4E\u4EBA\u6570\u306F\u3042\u308A\u307E\u3059\u304B\uFF1F",
    a: "\u6700\u4F4E3\u540D\u304B\u3089\u3054\u5229\u7528\u3044\u305F\u3060\u3051\u307E\u3059\u3002\u30C1\u30FC\u30E0\u5168\u4F53\u3067\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3084\u30C8\u30FC\u30F3\u8A2D\u5B9A\u3092\u5171\u6709\u3067\u304D\u3001\u30E1\u30FC\u30EB\u306E\u54C1\u8CEA\u3092\u7D44\u7E54\u3068\u3057\u3066\u7D71\u4E00\u3067\u304D\u307E\u3059\u300210\u540D\u4EE5\u4E0A\u306E\u3054\u5951\u7D04\u306F\u5225\u9014\u304A\u898B\u7A4D\u3082\u308A\u3044\u305F\u3057\u307E\u3059\u3002",
  },
  {
    q: "\u89E3\u7D04\u306F\u3044\u3064\u3067\u3082\u3067\u304D\u307E\u3059\u304B\uFF1F",
    a: "\u306F\u3044\u3001\u3044\u3064\u3067\u3082\u89E3\u7D04\u53EF\u80FD\u3067\u3059\u3002\u89E3\u7D04\u5F8C\u3082\u5F53\u6708\u672B\u307E\u3067\u306F\u3054\u5229\u7528\u3044\u305F\u3060\u3051\u307E\u3059\u3002\u5E74\u9593\u30D7\u30E9\u30F3\uFF082\u30F6\u6708\u5206\u304A\u5F97\uFF09\u3082\u3042\u308A\u307E\u3059\u304C\u3001\u3053\u3061\u3089\u3082\u9014\u4E2D\u89E3\u7D04\u306B\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u3059\u3002",
  },
];

// --- Feature Data ---
const FEATURES = [
  {
    icon: "\uD83E\uDD16",
    color: "blue",
    title: "AI\u81EA\u52D5\u751F\u6210",
    desc: "\u53D7\u4FE1\u30E1\u30FC\u30EB\u306E\u6587\u8108\u3092\u89E3\u6790\u3057\u3001\u6700\u9069\u306A\u8FD4\u4FE1\u30C9\u30E9\u30D5\u30C8\u3092\u77AC\u6642\u306B\u751F\u6210\u3002\u656C\u8A9E\u30EC\u30D9\u30EB\u3082\u81EA\u52D5\u5224\u5B9A\u3057\u307E\u3059\u3002",
  },
  {
    icon: "\uD83C\uDFAF",
    color: "purple",
    title: "\u30C8\u30FC\u30F3\u8ABF\u6574",
    desc: "\u30D5\u30A9\u30FC\u30DE\u30EB\u30FB\u30D5\u30EC\u30F3\u30C9\u30EA\u30FC\u30FB\u7C21\u6F54\u30FB\u82F1\u8A9E\u306A\u3069\u3001\u76F8\u624B\u3084\u30B7\u30FC\u30F3\u306B\u5408\u308F\u305B\u305F\u6587\u4F53\u30921\u30AF\u30EA\u30C3\u30AF\u3067\u5207\u308A\u66FF\u3048\u3002",
  },
  {
    icon: "\uD83D\uDCCB",
    color: "green",
    title: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u7BA1\u7406",
    desc: "\u3088\u304F\u4F7F\u3046\u6587\u9762\u3092\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3068\u3057\u3066\u4FDD\u5B58\u3002\u30AB\u30B9\u30BF\u30E0\u5909\u6570\u3067\u5B9B\u540D\u3084\u65E5\u6642\u3092\u81EA\u52D5\u5DEE\u3057\u8FBC\u307F\u3067\u304D\u307E\u3059\u3002",
  },
  {
    icon: "\uD83D\uDC65",
    color: "amber",
    title: "\u30C1\u30FC\u30E0\u5171\u6709",
    desc: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3084\u30C8\u30FC\u30F3\u8A2D\u5B9A\u3092\u30C1\u30FC\u30E0\u5168\u4F53\u3067\u5171\u6709\u3002\u7D44\u7E54\u3068\u3057\u3066\u30E1\u30FC\u30EB\u54C1\u8CEA\u3092\u7D71\u4E00\u3067\u304D\u307E\u3059\u3002",
  },
  {
    icon: "\uD83C\uDF0D",
    color: "pink",
    title: "\u591A\u8A00\u8A9E\u5BFE\u5FDC",
    desc: "\u65E5\u672C\u8A9E\u30FB\u82F1\u8A9E\u30FB\u4E2D\u56FD\u8A9E\u30FB\u97D3\u56FD\u8A9E\u306B\u5BFE\u5FDC\u3002\u6D77\u5916\u3068\u306E\u3084\u308A\u53D6\u308A\u3082AI\u304C\u9069\u5207\u306A\u8A00\u8A9E\u3067\u8FD4\u4FE1\u3092\u4F5C\u6210\u3002",
  },
  {
    icon: "\uD83D\uDD12",
    color: "navy",
    title: "Gmail OAuth\u9023\u643A",
    desc: "Google\u306E\u516C\u5F0FOAuth\u8A8D\u8A3C\u3067\u5B89\u5168\u306B\u9023\u643A\u3002\u30E1\u30FC\u30EB\u672C\u6587\u306F\u30B5\u30FC\u30D0\u30FC\u306B\u4FDD\u5B58\u305B\u305A\u3001\u51E6\u7406\u5F8C\u306B\u5373\u6642\u524A\u9664\u3002",
  },
];

// --- SVG Icons ---
function ChevronDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4l4 4 4-4" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 7h12M8 2l5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 5.5L4 8l5-6" />
    </svg>
  );
}

// --- Scroll fade hook ---
function useScrollFade() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".fade-in, .fade-in-left, .fade-in-right"
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
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
        <a href="#" className="header-logo">
          <div className="header-logo-icon">R</div>
          <div className="header-logo-text">
            {"\u30E9\u30AF\u30C0"}<span>Mail</span>
          </div>
        </a>

        <nav className="header-nav">
          <a href="#features">{"\u6A5F\u80FD"}</a>
          <a href="#how">{"\u4F7F\u3044\u65B9"}</a>
          <a href="#pricing">{"\u6599\u91D1"}</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a href="#cta" className="header-cta">
          {"\u7121\u6599\u3067\u59CB\u3081\u308B"}
        </a>

        <button className="mobile-menu-btn" aria-label="Menu">
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
      <div className="hero-inner">
        <div className="hero-content fade-in">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Gmail{"\u9023\u643A\u3067\u4ECA\u3059\u3050\u4F7F\u3048\u308B"}
          </div>

          <h1>
            {"\u30E1\u30FC\u30EB\u3092\u3001"}
            <br />
            <span className="accent-text">AI{"\u306B\u4EFB\u305B\u308B\u3002"}</span>
          </h1>

          <p className="hero-subtitle">
            {"\u53D7\u4FE1\u30E1\u30FC\u30EB\u3092\u8AAD\u307F\u53D6\u308A\u3001\u6700\u9069\u306A\u30C8\u30FC\u30F3\u3067\u8FD4\u4FE1\u30C9\u30E9\u30D5\u30C8\u3092\u81EA\u52D5\u751F\u6210\u3002"}
            {"\u0031\u65E547\u5206\u306E\u30E1\u30FC\u30EB\u4F5C\u696D\u3092\u3001\u308F\u305A\u304B3\u5206\u306B\u3002"}
          </p>

          <div className="hero-actions">
            <a href="#cta" className="btn-primary">
              {"\u7121\u6599\u3067\u59CB\u3081\u308B"}
              <ArrowRight />
            </a>
            <a href="#demo" className="btn-secondary">
              {"\u30C7\u30E2\u3092\u898B\u308B"}
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">4,720+</div>
              <div className="hero-stat-label">{"\u30E6\u30FC\u30B6\u30FC"}</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">92%</div>
              <div className="hero-stat-label">{"\u4FEE\u6B63\u306A\u3057\u9001\u4FE1\u7387"}</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">47{"\u5206"}</div>
              <div className="hero-stat-label">1{"\u65E5\u306E\u6642\u77ED\u52B9\u679C"}</div>
            </div>
          </div>
        </div>

        <div className="hero-mockup fade-in stagger-2">
          <div className="hero-mockup-window">
            <div className="mockup-titlebar">
              <div className="mockup-dot" />
              <div className="mockup-dot" />
              <div className="mockup-dot" />
              <div className="mockup-url">mail.rakuda-ai.com</div>
            </div>

            <div className="mockup-body">
              <div className="mockup-email-before">
                <div className="mockup-email-header">
                  <div className="mockup-avatar">{"\u7530"}</div>
                  <div className="mockup-sender-info">
                    <div className="mockup-sender">{"\u7530\u4E2D \u4E00\u90CE"}</div>
                    <div className="mockup-subject">
                      {"\u65B0\u898F\u304A\u53D6\u5F15\u306E\u3054\u76F8\u8AC7\u306B\u3064\u3044\u3066"}
                    </div>
                  </div>
                </div>
                <div className="mockup-email-body">
                  {"\u5C71\u7530\u69D8\u3001\u5148\u65E5\u306F\u304A\u6642\u9593\u3092\u3044\u305F\u3060\u304D\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3057\u305F\u3002\u5F0A\u793E\u30B5\u30FC\u30D3\u30B9\u306B\u3064\u3044\u3066\u3054\u691C\u8A0E\u3044\u305F\u3060\u3051\u308B\u3068\u5E78\u3044\u3067\u3059\u3002\u6765\u9031\u3042\u305F\u308A\u3067..."}
                </div>
              </div>

              <div className="mockup-email-after">
                <div className="mockup-ai-badge">
                  <span className="mockup-ai-dot" />
                  AI{"\u751F\u6210\u4E2D"}...
                </div>
                <div className="mockup-generated-text">
                  {"\u7530\u4E2D\u69D8"}
                  <br />
                  <br />
                  {"\u304A\u4E16\u8A71\u306B\u306A\u3063\u3066\u304A\u308A\u307E\u3059\u3002"}
                  <br />
                  {"\u5148\u65E5\u306F\u8CB4\u91CD\u306A\u304A\u6642\u9593\u3092\u3044\u305F\u3060\u304D"}
                  <span className="highlight">{"\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3057\u305F\u3002"}</span>
                  <br />
                  {"\u3054\u63D0\u6848\u306E\u4EF6\u3001\u793E\u5185\u306B\u3066"}
                  <span className="highlight">{"\u524D\u5411\u304D\u306B\u691C\u8A0E"}</span>
                  {"\u3057\u3066\u304A\u308A\u307E\u3059\u3002"}
                  <span className="mockup-cursor" />
                </div>
              </div>
            </div>
          </div>

          <div className="hero-float-badge top-right">
            <span style={{ fontSize: 14 }}>{"\uD83D\uDD12"}</span>
            <span>{"\u30C7\u30FC\u30BF\u975E\u4FDD\u5B58"}</span>
          </div>
          <div className="hero-float-badge bottom-left">
            <span style={{ fontSize: 14 }}>{"\u26A1"}</span>
            <span>3{"\u79D2\u3067\u751F\u6210"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// EMAIL DEMO
// ================================================================
function DemoSection() {
  return (
    <section className="section-demo" id="demo">
      <div className="container">
        <div className="fade-in">
          <div className="section-label">
            <span className="section-label-line" />
            DEMO
          </div>
          <h2 className="section-heading">
            {"\u53D7\u4FE1\u30E1\u30FC\u30EB\u304B\u3089\u3001\u5373\u5EA7\u306B\u8FD4\u4FE1\u30C9\u30E9\u30D5\u30C8"}
          </h2>
          <p className="section-description">
            {"\u30E1\u30FC\u30EB\u3092\u9078\u629E\u3059\u308B\u3060\u3051\u3067\u3001\u6587\u8108\u3092\u7406\u89E3\u3057\u305FAI\u304C\u9069\u5207\u306A\u8FD4\u4FE1\u3092\u81EA\u52D5\u751F\u6210\u3002\u656C\u8A9E\u30EC\u30D9\u30EB\u3084\u8981\u4EF6\u306E\u629C\u3051\u6F0F\u308C\u3082\u30C1\u30A7\u30C3\u30AF\u3057\u307E\u3059\u3002"}
          </p>
        </div>

        <div className="demo-grid">
          {/* Received */}
          <div className="demo-card fade-in-left">
            <div className="demo-card-header">
              <div className="demo-card-header-left">
                <div className="demo-card-icon received">{"\uD83D\uDCE9"}</div>
                <div className="demo-card-title">{"\u53D7\u4FE1\u30E1\u30FC\u30EB"}</div>
              </div>
              <div className="demo-card-badge time">3{"\u670823\u65E5"} 9:14</div>
            </div>
            <div className="demo-card-body">
              <div className="demo-email-meta">
                <div className="demo-email-meta-row">
                  <span className="demo-email-meta-label">From</span>
                  <span className="demo-email-meta-value">
                    {"\u7530\u4E2D\u4E00\u90CE"} &lt;tanaka@example.co.jp&gt;
                  </span>
                </div>
                <div className="demo-email-meta-row">
                  <span className="demo-email-meta-label">{"\u4EF6\u540D"}</span>
                  <span className="demo-email-meta-value">
                    {"\u65B0\u898F\u304A\u53D6\u5F15\u306E\u3054\u76F8\u8AC7\u306B\u3064\u3044\u3066"}
                  </span>
                </div>
              </div>
              <div className="demo-email-text">
                <p>{"\u5C71\u7530\u69D8"}</p>
                <p>
                  {"\u304A\u4E16\u8A71\u306B\u306A\u3063\u3066\u304A\u308A\u307E\u3059\u3002\u682A\u5F0F\u4F1A\u793E\u25CB\u25CB\u306E\u7530\u4E2D\u3067\u3059\u3002\u5148\u65E5\u306E\u30AB\u30F3\u30D5\u30A1\u30EC\u30F3\u30B9\u3067\u306F\u3001\u8CB4\u91CD\u306A\u304A\u8A71\u3092\u304A\u805E\u304B\u305B\u3044\u305F\u3060\u304D\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3057\u305F\u3002"}
                </p>
                <p>
                  {"\u5F0A\u793E\u3067\u306F\u73FE\u5728\u3001\u5FA1\u793E\u306E\u30D7\u30ED\u30C0\u30AF\u30C8\u3092\u793E\u5185\u5C0E\u5165\u3059\u308B\u65B9\u5411\u3067\u691C\u8A0E\u3092\u9032\u3081\u3066\u304A\u308A\u307E\u3059\u3002\u3064\u304D\u307E\u3057\u3066\u306F\u3001\u5177\u4F53\u7684\u306A\u5C0E\u5165\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB\u3084\u8CBB\u7528\u611F\u306B\u3064\u3044\u3066\u3001\u4E00\u5EA6\u304A\u6253\u3061\u5408\u308F\u305B\u306E\u6A5F\u4F1A\u3092\u3044\u305F\u3060\u3051\u306A\u3044\u3067\u3057\u3087\u3046\u304B\u3002"}
                </p>
                <p>
                  {"\u6765\u9031\u3067\u3042\u308C\u3070\u300126\u65E5\uFF08\u6728\uFF09\u306E\u5348\u5F8C\u3082\u3057\u304F\u306F27\u65E5\uFF08\u91D1\uFF09\u306E\u5348\u524D\u4E2D\u304C\u7A7A\u3044\u3066\u304A\u308A\u307E\u3059\u3002"}
                </p>
                <p>{"\u3054\u691C\u8A0E\u306E\u307B\u3069\u3001\u3088\u308D\u3057\u304F\u304A\u9858\u3044\u3044\u305F\u3057\u307E\u3059\u3002"}</p>
              </div>
            </div>
          </div>

          {/* Arrow desktop */}
          <div className="demo-arrow fade-in">
            <div className="demo-arrow-circle">{"\u2192"}</div>
          </div>

          {/* Arrow mobile */}
          <div className="demo-arrow-mobile fade-in">
            <div className="demo-arrow-circle">{"\u2193"}</div>
          </div>

          {/* AI Draft */}
          <div className="demo-card fade-in-right">
            <div className="demo-card-header">
              <div className="demo-card-header-left">
                <div className="demo-card-icon generated">{"\u2728"}</div>
                <div className="demo-card-title">AI{"\u751F\u6210\u30C9\u30E9\u30D5\u30C8"}</div>
              </div>
              <div className="demo-card-badge ai">{"\u81EA\u52D5\u751F\u6210"} 0.8{"\u79D2"}</div>
            </div>
            <div className="demo-card-body">
              <div className="demo-email-meta">
                <div className="demo-email-meta-row">
                  <span className="demo-email-meta-label">To</span>
                  <span className="demo-email-meta-value">
                    {"\u7530\u4E2D\u4E00\u90CE"} &lt;tanaka@example.co.jp&gt;
                  </span>
                </div>
                <div className="demo-email-meta-row">
                  <span className="demo-email-meta-label">{"\u4EF6\u540D"}</span>
                  <span className="demo-email-meta-value">
                    Re: {"\u65B0\u898F\u304A\u53D6\u5F15\u306E\u3054\u76F8\u8AC7\u306B\u3064\u3044\u3066"}
                  </span>
                </div>
              </div>
              <div className="demo-email-text">
                <p>{"\u7530\u4E2D\u69D8"}</p>
                <p>
                  {"\u304A\u4E16\u8A71\u306B\u306A\u3063\u3066\u304A\u308A\u307E\u3059\u3002\u5148\u65E5\u306E\u30AB\u30F3\u30D5\u30A1\u30EC\u30F3\u30B9\u3067\u306F\u3001\u3053\u3061\u3089\u3053\u305D\u5927\u5909\u6709\u610F\u7FA9\u306A\u304A\u6642\u9593\u3092\u3044\u305F\u3060\u304D\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3057\u305F\u3002"}
                </p>
                <div className="demo-email-highlight">
                  {"\u5F0A\u793E\u30D7\u30ED\u30C0\u30AF\u30C8\u306E\u5C0E\u5165\u3092\u3054\u691C\u8A0E\u3044\u305F\u3060\u3051\u308B\u3068\u306E\u3053\u3068\u3001\u5927\u5909\u5B09\u3057\u304F\u5B58\u3058\u307E\u3059\u3002\u5177\u4F53\u7684\u306A\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB\u30FB\u8CBB\u7528\u611F\u306B\u3064\u3044\u3066\u3001\u305C\u3072\u304A\u6253\u3061\u5408\u308F\u305B\u3055\u305B\u3066\u3044\u305F\u3060\u3051\u308C\u3070\u3068\u601D\u3044\u307E\u3059\u3002"}
                </div>
                <p>
                  {"\u3054\u63D0\u793A\u3044\u305F\u3060\u3044\u305F\u65E5\u7A0B\u306E\u3046\u3061\u3001\u4E0B\u8A18\u306B\u3066\u304A\u4F3A\u3044\u3067\u304D\u308C\u3070\u3068\u5B58\u3058\u307E\u3059\u3002"}
                </p>
                <p>
                  <strong>3{"\u670826\u65E5\uFF08\u6728\uFF0914:00\u301C15:00"}</strong>
                </p>
                <p>
                  {"\u30AA\u30F3\u30E9\u30A4\u30F3\u30FB\u5BFE\u9762\u3044\u305A\u308C\u3082\u3054\u5BFE\u5FDC\u53EF\u80FD\u3067\u3059\u306E\u3067\u3001\u3054\u5E0C\u671B\u3092\u304A\u77E5\u3089\u305B\u3044\u305F\u3060\u3051\u307E\u3059\u3068\u5E78\u3044\u3067\u3059\u3002"}
                </p>
                <p>{"\u4F55\u5352\u3088\u308D\u3057\u304F\u304A\u9858\u3044\u7533\u3057\u4E0A\u3052\u307E\u3059\u3002"}</p>
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
  return (
    <section className="section-features" id="features">
      <div className="container">
        <div className="section-center fade-in">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span className="section-label-line" />
            FEATURES
          </div>
          <h2 className="section-heading">
            {"\u30E1\u30FC\u30EB\u696D\u52D9\u3092\u3001\u6839\u672C\u304B\u3089\u5909\u3048\u308B6\u3064\u306E\u6A5F\u80FD"}
          </h2>
          <p className="section-description">
            {"\u5358\u306A\u308B\u6587\u7AE0\u751F\u6210\u3067\u306F\u306A\u304F\u3001\u30D3\u30B8\u30CD\u30B9\u30E1\u30FC\u30EB\u306B\u5FC5\u8981\u306A\u6587\u8108\u7406\u89E3\u30FB\u656C\u8A9E\u5224\u5B9A\u30FB\u30C8\u30FC\u30F3\u8ABF\u6574\u3092AI\u304C\u4E00\u62EC\u51E6\u7406\u3057\u307E\u3059\u3002"}
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
          <h2 className="section-heading">3{"\u30B9\u30C6\u30C3\u30D7\u3067\u3001\u30E1\u30FC\u30EB\u304C\u5B8C\u6210"}</h2>
          <p className="section-description">
            {"\u8907\u96D1\u306A\u8A2D\u5B9A\u306F\u4E0D\u8981\u3002Gmail\u3092\u63A5\u7D9A\u3057\u305F\u3089\u3001\u3059\u3050\u306B\u4F7F\u3044\u59CB\u3081\u3089\u308C\u307E\u3059\u3002"}
          </p>
        </div>

        <div className="how-steps">
          <div className="how-step fade-in stagger-1">
            <div className="how-step-number">
              <span className="how-step-icon">{"\uD83D\uDCE7"}</span>
            </div>
            <h3 className="how-step-title">{"\u30E1\u30FC\u30EB\u3092\u9078\u629E"}</h3>
            <p className="how-step-desc">
              {"\u8FD4\u4FE1\u3057\u305F\u3044\u30E1\u30FC\u30EB\u3092\u9078\u3076\u3060\u3051\u3002AI\u304C\u9001\u4FE1\u8005\u3068\u306E\u95A2\u4FC2\u6027\u3084\u904E\u53BB\u306E\u3084\u308A\u53D6\u308A\u3082\u8003\u616E\u3057\u3066\u6587\u8108\u3092\u628A\u63E1\u3057\u307E\u3059\u3002"}
            </p>
          </div>

          <div className="how-step fade-in stagger-2">
            <div className="how-step-number">
              <span className="how-step-icon">{"\uD83C\uDFA8"}</span>
            </div>
            <h3 className="how-step-title">{"\u30C8\u30FC\u30F3\u3092\u9078\u3076"}</h3>
            <p className="how-step-desc">
              {"\u30D5\u30A9\u30FC\u30DE\u30EB\u30FB\u30AB\u30B8\u30E5\u30A2\u30EB\u30FB\u7C21\u6F54\u306A\u3069\u3001\u76EE\u7684\u306B\u5408\u3063\u305F\u30C8\u30FC\u30F3\u3092\u30EF\u30F3\u30AF\u30EA\u30C3\u30AF\u3067\u6307\u5B9A\u3002\u81EA\u52D5\u5224\u5B9A\u30E2\u30FC\u30C9\u3082\u3002"}
            </p>
          </div>

          <div className="how-step fade-in stagger-3">
            <div className="how-step-number">
              <span className="how-step-icon">{"\uD83D\uDE80"}</span>
            </div>
            <h3 className="how-step-title">{"\u78BA\u8A8D\u3057\u3066\u9001\u4FE1"}</h3>
            <p className="how-step-desc">
              {"\u751F\u6210\u3055\u308C\u305F\u30C9\u30E9\u30D5\u30C8\u3092\u78BA\u8A8D\u30FB\u5FAE\u8ABF\u6574\u3057\u3066\u9001\u4FE1\u3002\u5E73\u57470.8\u79D2\u3067\u751F\u6210\u5B8C\u4E86\u300192%\u304C\u305D\u306E\u307E\u307E\u9001\u4FE1\u53EF\u80FD\u306A\u54C1\u8CEA\u3067\u3059\u3002"}
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
  const tone = TONES[activeTone];

  return (
    <section className="section-tone" id="tone">
      <div className="container">
        <div className="fade-in">
          <div className="section-label">
            <span className="section-label-line" />
            TONE ADJUSTMENT
          </div>
          <h2 className="section-heading">
            {"\u540C\u3058\u5185\u5BB9\u3067\u3082\u3001\u30C8\u30FC\u30F3\u3067\u5370\u8C61\u306F\u5909\u308F\u308B"}
          </h2>
          <p className="section-description">
            {"\u76F8\u624B\u3068\u306E\u95A2\u4FC2\u6027\u3084\u30B7\u30FC\u30F3\u306B\u5FDC\u3058\u3066\u3001\u6700\u9069\u306A\u30C8\u30FC\u30F3\u3092\u9078\u629E\u3002\u793E\u5185\u30C1\u30E3\u30C3\u30C8\u306E\u3088\u3046\u306A\u8FD4\u4FE1\u304B\u3089\u3001\u53D6\u7DE0\u5F79\u5B9B\u306E\u6B63\u5F0F\u6587\u66F8\u307E\u3067\u5BFE\u5FDC\u3057\u307E\u3059\u3002"}
          </p>
        </div>

        <div className="tone-layout fade-in">
          <div className="tone-tabs">
            {TONES.map((t, i) => (
              <button
                key={t.id}
                className={`tone-tab ${i === activeTone ? "active" : ""}`}
                onClick={() => setActiveTone(i)}
              >
                <span className="tone-tab-emoji">{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </div>

          <div className="tone-preview">
            <div className="tone-preview-header">
              <div className="tone-preview-header-left">
                <div className="tone-preview-label">{"\u30D7\u30EC\u30D3\u30E5\u30FC"}</div>
              </div>
              <div className="tone-preview-tag">{tone.tag}</div>
            </div>
            <div className="tone-preview-body">
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
  return (
    <section className="section-pricing" id="pricing">
      <div className="container">
        <div className="section-center fade-in">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span className="section-label-line" />
            PRICING
          </div>
          <h2 className="section-heading">{"\u30B7\u30F3\u30D7\u30EB\u3067\u900F\u660E\u306A\u6599\u91D1\u4F53\u7CFB"}</h2>
          <p className="section-description">
            {"\u5FC5\u8981\u306A\u5206\u3060\u3051\u3002\u96A0\u308C\u305F\u30B3\u30B9\u30C8\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u5E74\u9593\u30D7\u30E9\u30F3\u306A\u30892\u30F6\u6708\u5206\u304A\u5F97\u3067\u3059\u3002"}
          </p>
        </div>

        <div className="pricing-grid">
          {/* Free */}
          <div className="pricing-card fade-in stagger-1">
            <div className="pricing-name">Free</div>
            <div className="pricing-tagline">{"\u307E\u305A\u306F\u8A66\u3057\u3066\u307F\u305F\u3044\u65B9\u306B"}</div>
            <div className="pricing-price">
              <span className="pricing-currency">&yen;</span>
              <span className="pricing-amount">0</span>
            </div>
            <div className="pricing-note">{"\u305A\u3063\u3068\u7121\u6599"}</div>
            <div className="pricing-divider" />
            <ul className="pricing-features">
              <li className="pricing-feature">
                <span className="pricing-check blue"><CheckIcon /></span>
                {"\u670820\u901A\u307E\u3067\u306EAI\u30E1\u30FC\u30EB\u751F\u6210"}
              </li>
              <li className="pricing-feature">
                <span className="pricing-check blue"><CheckIcon /></span>
                3{"\u7A2E\u985E\u306E\u30C8\u30FC\u30F3\u8ABF\u6574"}
              </li>
              <li className="pricing-feature">
                <span className="pricing-check blue"><CheckIcon /></span>
                {"\u57FA\u672C\u30C6\u30F3\u30D7\u30EC\u30FC\u30C85\u4EF6"}
              </li>
              <li className="pricing-feature">
                <span className="pricing-check blue"><CheckIcon /></span>
                Gmail{"\u9023\u643A"}
              </li>
            </ul>
            <button className="pricing-btn outline">{"\u7121\u6599\u3067\u59CB\u3081\u308B"}</button>
          </div>

          {/* Pro */}
          <div className="pricing-card popular fade-in stagger-2">
            <div className="pricing-popular-badge">{"\u4E00\u756A\u4EBA\u6C17"}</div>
            <div className="pricing-name">Pro</div>
            <div className="pricing-tagline">{"\u30E1\u30FC\u30EB\u696D\u52D9\u3092\u672C\u683C\u7684\u306B\u52B9\u7387\u5316\u3057\u305F\u3044\u65B9\u306B"}</div>
            <div className="pricing-price">
              <span className="pricing-currency">&yen;</span>
              <span className="pricing-amount">2,980</span>
              <span className="pricing-period">/月</span>
            </div>
            <div className="pricing-note">{"\u5E74\u9593\u30D7\u30E9\u30F3\u306A\u3089\u6708"}&yen;2,480</div>
            <div className="pricing-divider" />
            <ul className="pricing-features">
              <li className="pricing-feature">
                <span className="pricing-check green"><CheckIcon /></span>
                <strong>{"\u7121\u5236\u9650"}</strong>{"\u306EAI\u30E1\u30FC\u30EB\u751F\u6210"}
              </li>
              <li className="pricing-feature">
                <span className="pricing-check green"><CheckIcon /></span>
                {"\u5168\u30C8\u30FC\u30F3\uFF0B\u30AB\u30B9\u30BF\u30E0\u30C8\u30FC\u30F3"}
              </li>
              <li className="pricing-feature">
                <span className="pricing-check green"><CheckIcon /></span>
                {"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u7121\u5236\u9650"}
              </li>
              <li className="pricing-feature">
                <span className="pricing-check green"><CheckIcon /></span>
                {"\u591A\u8A00\u8A9E\u5BFE\u5FDC\uFF084\u8A00\u8A9E\uFF09"}
              </li>
              <li className="pricing-feature">
                <span className="pricing-check green"><CheckIcon /></span>
                {"\u512A\u5148\u30B5\u30DD\u30FC\u30C8"}
              </li>
            </ul>
            <button className="pricing-btn filled">Pro{"\u3092\u59CB\u3081\u308B"}</button>
          </div>

          {/* Team */}
          <div className="pricing-card fade-in stagger-3">
            <div className="pricing-name">Team</div>
            <div className="pricing-tagline">{"\u7D44\u7E54\u5168\u4F53\u3067\u30E1\u30FC\u30EB\u54C1\u8CEA\u3092\u7D71\u4E00\u3057\u305F\u3044\u30C1\u30FC\u30E0\u306B"}</div>
            <div className="pricing-price">
              <span className="pricing-currency">&yen;</span>
              <span className="pricing-amount">9,800</span>
              <span className="pricing-period">/月</span>
            </div>
            <div className="pricing-note">3{"\u540D\u301C"} / 1{"\u540D\u3042\u305F\u308A\u6708"}&yen;3,267</div>
            <div className="pricing-divider" />
            <ul className="pricing-features">
              <li className="pricing-feature">
                <span className="pricing-check green"><CheckIcon /></span>
                Pro{"\u306E\u5168\u6A5F\u80FD"}
              </li>
              <li className="pricing-feature">
                <span className="pricing-check green"><CheckIcon /></span>
                {"\u30C1\u30FC\u30E0\u5171\u6709\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8"}
              </li>
              <li className="pricing-feature">
                <span className="pricing-check green"><CheckIcon /></span>
                {"\u7BA1\u7406\u8005\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9"}
              </li>
              <li className="pricing-feature">
                <span className="pricing-check green"><CheckIcon /></span>
                {"\u5229\u7528\u72B6\u6CC1\u30EC\u30DD\u30FC\u30C8"}
              </li>
              <li className="pricing-feature">
                <span className="pricing-check green"><CheckIcon /></span>
                {"\u5C02\u4EFB\u30B5\u30DD\u30FC\u30C8\u62C5\u5F53"}
              </li>
            </ul>
            <button className="pricing-btn dark">{"\u304A\u554F\u3044\u5408\u308F\u305B"}</button>
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
          <h2 className="section-heading">{"\u3088\u304F\u3042\u308B\u8CEA\u554F"}</h2>
          <p className="section-description">
            {"\u3054\u4E0D\u660E\u70B9\u304C\u3042\u308C\u3070\u3001\u304A\u6C17\u8EFD\u306B\u304A\u554F\u3044\u5408\u308F\u305B\u304F\u3060\u3055\u3044\u3002"}
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`faq-item fade-in stagger-${i + 1} ${openIndex === i ? "open" : ""}`}
            >
              <button className="faq-question" onClick={() => toggle(i)}>
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
          <h2 className="cta-heading">
            {"\u30E1\u30FC\u30EB\u4F5C\u696D\u306B\u3001\u3082\u3046\u6642\u9593\u3092\u304B\u3051\u306A\u3044"}
          </h2>
          <p className="cta-desc">
            {"\u7121\u6599\u30D7\u30E9\u30F3\u3067\u4ECA\u3059\u3050\u59CB\u3081\u3089\u308C\u307E\u3059\u3002\u30AF\u30EC\u30B8\u30C3\u30C8\u30AB\u30FC\u30C9\u4E0D\u8981\u3001Gmail\u30A2\u30AB\u30A6\u30F3\u30C8\u3060\u3051\u3067\u767B\u9332\u5B8C\u4E86\u3002"}
          </p>
          <div className="cta-actions">
            <a href="#" className="btn-primary">
              {"\u7121\u6599\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u4F5C\u6210"}
              <ArrowRight />
            </a>
            <a href="#" className="btn-secondary">
              {"\u5C0E\u5165\u4E8B\u4F8B\u3092\u898B\u308B"}
            </a>
          </div>
          <p className="cta-note">
            {"\u767B\u9332\u306F30\u79D2"} ・ {"\u30AF\u30EC\u30B8\u30C3\u30C8\u30AB\u30FC\u30C9\u4E0D\u8981"} ・ {"\u3044\u3064\u3067\u3082\u89E3\u7D04\u53EF\u80FD"}
          </p>
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
            <a href="#" className="footer-logo">
              <div className="footer-logo-icon">R</div>
              <div className="footer-logo-text">
                {"\u30E9\u30AF\u30C0"}<span>Mail</span>
              </div>
            </a>
            <p className="footer-brand-desc">
              AI{"\u304C\u30D3\u30B8\u30CD\u30B9\u30E1\u30FC\u30EB\u3092\u81EA\u52D5\u751F\u6210\u3002\u3042\u306A\u305F\u306E\u6642\u9593\u3092\u3001\u3082\u3063\u3068\u4FA1\u5024\u306E\u3042\u308B\u3053\u3068\u306B\u3002"}
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">{"\u30D7\u30ED\u30C0\u30AF\u30C8"}</h4>
            <ul className="footer-links">
              <li><a href="#">{"\u6A5F\u80FD\u4E00\u89A7"}</a></li>
              <li><a href="#">{"\u6599\u91D1\u30D7\u30E9\u30F3"}</a></li>
              <li><a href="#">{"\u5C0E\u5165\u4E8B\u4F8B"}</a></li>
              <li><a href="#">{"\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8"}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">{"\u30B5\u30DD\u30FC\u30C8"}</h4>
            <ul className="footer-links">
              <li><a href="#">{"\u30D8\u30EB\u30D7\u30BB\u30F3\u30BF\u30FC"}</a></li>
              <li><a href="#">{"\u304A\u554F\u3044\u5408\u308F\u305B"}</a></li>
              <li><a href="#">API {"\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8"}</a></li>
              <li><a href="#">{"\u30B9\u30C6\u30FC\u30BF\u30B9"}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">{"\u4F1A\u793E"}</h4>
            <ul className="footer-links">
              <li><a href="#">{"\u904B\u55B6\u4F1A\u793E"}</a></li>
              <li><a href="#">{"\u63A1\u7528\u60C5\u5831"}</a></li>
              <li><a href="#">{"\u30D6\u30ED\u30B0"}</a></li>
              <li><a href="#">{"\u304A\u77E5\u3089\u305B"}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2026 {"\u30E9\u30AF\u30C0"}Mail. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">{"\u5229\u7528\u898F\u7D04"}</a>
            <a href="#">{"\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC"}</a>
            <a href="#">{"\u7279\u5B9A\u5546\u53D6\u5F15\u6CD5\u306B\u57FA\u3065\u304F\u8868\u8A18"}</a>
          </div>
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
        <DemoSection />
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
