"use client";

import React, { useState } from "react";

const emails = [
  { id: 1, sender: "田中 一郎", email: "tanaka@example.co.jp", subject: "新規お取引のご相談について", time: "9:14", unread: true, body: "山田様、先日はお時間をいただきありがとうございました。弊社サービスについてご検討いただけるとのこと、大変ありがたく存じます。つきましては、具体的な条件面について一度お打ち合わせの機会を頂戴できればと考えております。ご都合の良い日程をいくつかお教えいただけますでしょうか。" },
  { id: 2, sender: "佐藤 美咲", email: "sato@partner.inc", subject: "Re: 来週の定例MTGについて", time: "8:42", unread: true, body: "お疲れ様です。来週の定例ですが、15時からでお願いできますでしょうか。議題としては、Q1の振り返りと次四半期の計画について話したいと思います。" },
  { id: 3, sender: "鈴木 太郎", email: "suzuki@client.co.jp", subject: "見積書の件", time: "昨日", unread: false, body: "いつもお世話になっております。先日ご依頼いただいた見積書を添付いたします。内容にご不明点がございましたら、お気軽にお問い合わせください。" },
  { id: 4, sender: "山本 花子", email: "yamamoto@vendor.jp", subject: "請求書送付のお知らせ", time: "昨日", unread: false, body: "お世話になっております。2月分の請求書を送付いたします。お支払い期限は3月末日となっておりますので、ご確認のほどよろしくお願いいたします。" },
  { id: 5, sender: "LinkedIn", email: "noreply@linkedin.com", subject: "5 new connections this week", time: "3/24", unread: false, body: "You have new connection requests. Check out who wants to connect with you this week." },
];

const aiDraft = `田中様

お世話になっております。
先日は貴重なお時間をいただき、ありがとうございました。
ご提案の件、社内にて前向きに検討しております。

つきましては、下記の日程にてお打ち合わせの時間を頂戴できますでしょうか。

・3月28日（金）14:00〜15:00
・3月31日（月）10:00〜11:00

ご確認のほどよろしくお願い申し上げます。

山田 太郎`;

const tones = ["フォーマル", "カジュアル", "簡潔"] as const;
const labels = [
  { name: "受信トレイ", count: 2 },
  { name: "送信済み", count: 0 },
  { name: "下書き", count: 1 },
  { name: "ゴミ箱", count: 0 },
];

const LogoSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 40" style={{ height: 20, width: "auto" }}>
    <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="#60a5fa" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="#e2e8f0" letterSpacing="3">RAKUDAメール</text>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7a8494" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 7L2 7" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
  </svg>
);

const labelIcons = [<MailIcon key="m" />, <SendIcon key="s" />, <FileIcon key="f" />, <TrashIcon key="t" />];

export default function DemoV1() {
  const [selectedEmail, setSelectedEmail] = useState(0);
  const [selectedTone, setSelectedTone] = useState<number>(0);
  const [activeLabel, setActiveLabel] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  const current = emails[selectedEmail];

  const base: React.CSSProperties = {
    background: "linear-gradient(165deg, #0a0e17 0%, #0d1a2d 50%, #0f1729 100%)",
    minHeight: "100vh",
    color: "#e2e8f0",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif",
    fontSize: 14,
  };

  const sidebar: React.CSSProperties = {
    width: 200,
    minWidth: 200,
    background: "rgba(6, 10, 18, 0.5)",
    borderRight: "1px solid rgba(255,255,255,0.05)",
    display: "flex",
    flexDirection: "column",
    padding: "16px 0",
    height: "calc(100vh - 48px)",
    position: "sticky",
    top: 48,
  };

  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: 12,
  };

  const elevated: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
  };

  return (
    <div style={base}>
      {/* LP-unified Header */}
      <header style={{ height: 48, borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", padding: "0 16px", position: "sticky", top: 0, zIndex: 50, background: "rgba(6,10,18,0.8)", backdropFilter: "blur(12px)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <LogoSvg />
        </a>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          <a href="/" style={{ fontSize: 12, color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}>トップに戻る</a>
        </div>
      </header>

      {/* Demo Navigation */}
      <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 9999, display: "flex", gap: 6, padding: "8px 12px", borderRadius: 12, background: "rgba(6,10,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
        {[1,2,3,4,5].map(v => (
          <a key={v} href={`/demo/v${v}`} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: v === 1 ? 600 : 400, color: v === 1 ? "#fff" : "#94a3b8", background: v === 1 ? "#3B82F6" : "transparent", textDecoration: "none", transition: "all 0.2s" }}>V{v}</a>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div style={sidebar}>

          <div style={{ flex: 1 }}>
            {labels.map((label, i) => (
              <div
                key={label.name}
                onClick={() => setActiveLabel(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  cursor: "pointer",
                  color: activeLabel === i ? "#e2e8f0" : "#9ca3af",
                  background: activeLabel === i ? "rgba(59,130,246,0.1)" : "transparent",
                  borderRight: activeLabel === i ? "2px solid #3B82F6" : "2px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ color: activeLabel === i ? "#3B82F6" : "#7a8494" }}>{labelIcons[i]}</span>
                <span style={{ flex: 1, fontSize: 13 }}>{label.name}</span>
                {label.count > 0 && (
                  <span style={{ fontSize: 11, color: "#3B82F6", background: "rgba(59,130,246,0.15)", padding: "2px 6px", borderRadius: 8, fontWeight: 600 }}>
                    {label.count}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>
              YT
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>山田 太郎</div>
              <div style={{ fontSize: 10, color: "#7a8494" }}>yamada@company.co.jp</div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "calc(100vh - 48px)", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}><SearchIcon /></div>
              <input
                type="text"
                placeholder="メールを検索..."
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 36px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8,
                  color: "#e2e8f0",
                  fontSize: 13,
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            {/* Email List */}
            <div style={{ width: 320, minWidth: 320, borderRight: "1px solid rgba(255,255,255,0.05)", overflowY: "auto" }}>
              {emails.map((em, i) => (
                <div
                  key={em.id}
                  onClick={() => setSelectedEmail(i)}
                  style={{
                    padding: "14px 16px",
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                    background: selectedEmail === i ? "rgba(59,130,246,0.08)" : "transparent",
                    transition: "background 0.15s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: em.unread ? 600 : 400, color: em.unread ? "#e2e8f0" : "#9ca3af" }}>
                      {em.sender}
                    </span>
                    <span style={{ fontSize: 11, color: "#7a8494" }}>{em.time}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: em.unread ? 600 : 400, color: em.unread ? "#e2e8f0" : "#9ca3af", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {em.unread && <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#3B82F6", marginRight: 6, verticalAlign: "middle" }} />}
                    {em.subject}
                  </div>
                  <div style={{ fontSize: 12, color: "#4b5563", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {em.body.slice(0, 50)}...
                  </div>
                </div>
              ))}
            </div>

            {/* Detail Panel */}
            <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
              <div style={{ ...card, padding: 24, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#3B82F6", fontWeight: 600, fontSize: 14 }}>
                    {current.sender.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{current.sender}</div>
                    <div style={{ fontSize: 12, color: "#7a8494" }}>{current.email}</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: 12, color: "#7a8494" }}>{current.time}</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{current.subject}</div>
                <div style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.8 }}>{current.body}</div>
              </div>

              {/* AI Reply */}
              <div style={{ ...elevated, padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <SparkleIcon />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>AI返信ドラフト</span>
                </div>

                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  {tones.map((tone, i) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(i)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        border: "none",
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: "pointer",
                        background: selectedTone === i ? "#3B82F6" : "rgba(255,255,255,0.03)",
                        color: selectedTone === i ? "#fff" : "#9ca3af",
                        transition: "all 0.15s",
                      }}
                    >
                      {tone}
                    </button>
                  ))}
                </div>

                <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: 16, fontSize: 13, color: "#9ca3af", lineHeight: 1.8, whiteSpace: "pre-wrap", marginBottom: 16 }}>
                  {aiDraft}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ padding: "8px 20px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                    送信する
                  </button>
                  <button style={{ padding: "8px 20px", background: "rgba(255,255,255,0.03)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
                    編集する
                  </button>
                  <button style={{ padding: "8px 20px", background: "rgba(255,255,255,0.03)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
                    再生成
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div style={{ padding: "64px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
              <LogoSvg />
            </div>
            <p style={{ fontSize: 13, color: "#7a8494" }}>AIがメール返信をサポートします</p>
          </div>
          <div style={{ ...card, padding: 32 }}>
            <button style={{
              width: "100%",
              padding: "12px 16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              color: "#e2e8f0",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 16,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Googleアカウントでログイン
            </button>
            <div style={{ textAlign: "center", fontSize: 11, color: "#4b5563" }}>
              ログインすることで利用規約に同意します
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div style={{ padding: "48px 24px 64px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>設定</h2>

          <div style={{ ...card, padding: 24, marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>プロフィール</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#7a8494", marginBottom: 4 }}>表示名</label>
                <input type="text" defaultValue="山田 太郎" style={{ width: "100%", padding: "8px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#7a8494", marginBottom: 4 }}>メールアドレス</label>
                <input type="email" defaultValue="yamada@company.co.jp" style={{ width: "100%", padding: "8px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>

          <div style={{ ...card, padding: 24, marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>AI返信設定</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#7a8494", marginBottom: 4 }}>デフォルトのトーン</label>
                <select style={{ width: "100%", padding: "8px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }}>
                  <option>フォーマル</option>
                  <option>カジュアル</option>
                  <option>簡潔</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#7a8494", marginBottom: 4 }}>署名</label>
                <textarea defaultValue={"山田 太郎\n株式会社サンプル\nTel: 03-1234-5678"} rows={3} style={{ width: "100%", padding: "8px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>

          <div style={{ ...card, padding: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>通知設定</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["新着メール通知", "AI返信提案", "週次サマリー"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: "#9ca3af" }}>{item}</span>
                  <div style={{ width: 40, height: 22, borderRadius: 11, background: "#3B82F6", position: "relative", cursor: "pointer" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, right: 2, transition: "all 0.2s" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
