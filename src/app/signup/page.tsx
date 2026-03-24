"use client";

import { useState } from "react";

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <a href="./" style={styles.logoLink}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 40" style={{ height: 20, width: "auto", color: "#1a1a2e" }}>
              <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32"
                    stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif"
                    fontSize="22" fontWeight="300" fill="currentColor" letterSpacing="3">RAKUDAメール</text>
            </svg>
          </a>
          <a href="./book-call" style={styles.headerContact}>
            導入相談
          </a>
        </div>
      </header>

      <main style={styles.main}>
        {submitted ? (
          <div style={styles.card}>
            <div style={styles.successIcon}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#059669" opacity="0.1" />
                <circle cx="24" cy="24" r="18" fill="#059669" opacity="0.15" />
                <path d="M16 24l5 5 11-11" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 style={styles.successTitle}>確認メールを送信しました</h1>
            <p style={styles.successDesc}>
              <strong style={{ color: "#0F172A" }}>{email}</strong> 宛に確認メールを送信しました。<br />
              メール内のリンクをクリックして、アカウント設定を完了してください。
            </p>
            <div style={styles.successNote}>
              <span style={{ fontSize: 14 }}>&#128233;</span>
              メールが届かない場合は、迷惑メールフォルダもご確認ください
            </div>
            <a href="./" style={styles.backBtn}>トップページに戻る</a>
          </div>
        ) : (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardLogoWrap}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40">
                  <path d="M10,75 C10,75 22,25 38,25 C52,25 44,65 56,65 C68,65 60,20 74,20 C90,20 100,75 100,75"
                        stroke="#3B82F6" strokeWidth="7" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <h1 style={styles.title}>無料アカウントを作成</h1>
              <p style={styles.subtitle}>
                30秒で登録完了。AIがメール返信を自動生成します。
              </p>
            </div>

            {/* Trust signals */}
            <div style={styles.trustRow}>
              <div style={styles.trustItem}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#059669" opacity="0.12"/><path d="M4 7l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>永年無料プランあり</span>
              </div>
              <div style={styles.trustItem}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#059669" opacity="0.12"/><path d="M4 7l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>クレジットカード不要</span>
              </div>
              <div style={styles.trustItem}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#059669" opacity="0.12"/><path d="M4 7l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>30秒で登録完了</span>
              </div>
            </div>

            {/* Google OAuth */}
            <button
              type="button"
              style={styles.googleBtn}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f5f5f5"; e.currentTarget.style.borderColor = "#bbb"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#dadce0"; }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Googleアカウントで登録
            </button>

            <div style={styles.divider}>
              <span style={styles.dividerLine} />
              <span style={styles.dividerText}>または</span>
              <span style={styles.dividerLine} />
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label} htmlFor="signup-email">
                メールアドレス
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.submitBtn}>
                無料で始める
              </button>
            </form>

            <p style={styles.terms}>
              登録することで、<a href="./terms" style={styles.termsLink}>利用規約</a>および
              <a href="./privacy" style={styles.termsLink}>プライバシーポリシー</a>に同意したものとみなされます。
            </p>

            <div style={styles.consultRow}>
              <span style={{ color: "#64748B", fontSize: 13 }}>導入前に相談したい方は</span>
              <a href="./book-call" style={styles.consultLink}>無料相談を予約 &rarr;</a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ---- Inline Styles ---- */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(168deg, #F8FAFC 0%, #EFF6FF 50%, #F8FAFC 100%)",
    fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: "#0F172A",
  },
  header: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: 60,
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(0,0,0,0.04)",
  },
  headerInner: {
    maxWidth: 1140,
    margin: "0 auto",
    padding: "0 24px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    textDecoration: "none",
    color: "#0F172A",
    fontWeight: 700,
    fontSize: 16,
  },
  logoIcon: {
    width: 32,
    height: 32,
    background: "linear-gradient(135deg, #3B82F6, #2563EB)",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "white",
    fontWeight: 700,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },
  logoAccent: {
    color: "#3B82F6",
  },
  headerContact: {
    fontSize: 13,
    fontWeight: 500,
    color: "#475569",
    textDecoration: "none",
  },
  main: {
    paddingTop: 100,
    paddingBottom: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    padding: "100px 16px 60px",
  },
  card: {
    width: "100%",
    maxWidth: 440,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
    padding: "36px 32px 32px",
    border: "1px solid #E5E7EB",
  },
  cardHeader: {
    textAlign: "center" as const,
    marginBottom: 24,
  },
  cardLogoWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 16,
  },
  cardLogo: {
    width: 44,
    height: 44,
    background: "linear-gradient(135deg, #3B82F6, #2563EB)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    color: "white",
    fontWeight: 800,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    marginBottom: 6,
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 1.6,
  },
  trustRow: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
    marginBottom: 24,
    padding: "14px 16px",
    background: "#F8FAFC",
    borderRadius: 10,
    border: "1px solid #F1F5F9",
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: "#334155",
    fontWeight: 500,
  },
  googleBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "12px 16px",
    background: "#fff",
    border: "1px solid #dadce0",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    color: "#3c4043",
    cursor: "pointer",
    transition: "background 0.15s, border-color 0.15s",
    fontFamily: "inherit",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: "20px 0",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: "#E5E7EB",
  },
  dividerText: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: 500,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#334155",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    border: "1px solid #D1D5DB",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.15s",
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
  },
  submitBtn: {
    width: "100%",
    padding: "12px 16px",
    background: "linear-gradient(135deg, #3B82F6, #2563EB)",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
    boxShadow: "0 4px 12px rgba(59,130,246,0.25)",
    fontFamily: "inherit",
    marginTop: 4,
  },
  terms: {
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "center" as const,
    lineHeight: 1.6,
    marginTop: 16,
  },
  termsLink: {
    color: "#3B82F6",
    textDecoration: "none",
  },
  consultRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 20,
    paddingTop: 20,
    borderTop: "1px solid #F1F5F9",
  },
  consultLink: {
    fontSize: 13,
    fontWeight: 600,
    color: "#3B82F6",
    textDecoration: "none",
  },
  // Success state
  successIcon: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 800,
    textAlign: "center" as const,
    marginBottom: 12,
    color: "#0F172A",
  },
  successDesc: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center" as const,
    lineHeight: 1.7,
    marginBottom: 16,
  },
  successNote: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "10px 16px",
    background: "#FFF7ED",
    borderRadius: 8,
    fontSize: 12,
    color: "#92400E",
    fontWeight: 500,
    marginBottom: 20,
  },
  backBtn: {
    display: "block",
    textAlign: "center" as const,
    padding: "11px 20px",
    background: "#F1F5F9",
    color: "#334155",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
    transition: "background 0.15s",
  },
};
