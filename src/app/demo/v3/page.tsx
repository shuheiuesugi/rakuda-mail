"use client";

import React, { useState } from "react";

const emails = [
  { id: 1, sender: "田中 一郎", email: "tanaka@example.co.jp", subject: "新規お取引のご相談について", time: "9:14", unread: true, body: "山田様、先日はお時間をいただきありがとうございました。弊社サービスについてご検討いただけるとのこと、大変ありがたく存じます。つきましては、具体的な条件面について一度お打ち合わせの機会を頂戴できればと考えております。ご都合の良い日程をいくつかお教えいただけますでしょうか。" },
  { id: 2, sender: "佐藤 美咲", email: "sato@partner.inc", subject: "Re: 来週の定例MTGについて", time: "8:42", unread: true, body: "お疲れ様です。来週の定例ですが、15時からでお願いできますでしょうか。議題としては、Q1の振り返りと次四半期の計画について話したいと思います。" },
  { id: 3, sender: "鈴木 太郎", email: "suzuki@client.co.jp", subject: "見積書の件", time: "昨日", unread: false, body: "いつもお世話になっております。先日ご依頼いただいた見積書を添付いたします。内容にご不明点がございましたら、お気軽にお問い合わせください。" },
  { id: 4, sender: "山本 花子", email: "yamamoto@vendor.jp", subject: "請求書送付のお知らせ", time: "昨日", unread: false, body: "お世話になっております。2月分の請求書を送付いたします。お支払い期限は3月末日となっておりますので、ご確認のほどよろしくお願いいたします。" },
  { id: 5, sender: "LinkedIn", email: "noreply@linkedin.com", subject: "5 new connections this week", time: "3/24", unread: false, body: "You have new connection requests. Check out who wants to connect with you this week." },
  { id: 6, sender: "高橋 健一", email: "takahashi@startup.io", subject: "資料送付の件", time: "3/23", unread: false, body: "お世話になっております。先日お話しした件について、参考資料をお送りいたします。ご査収のほどよろしくお願いいたします。" },
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

const WaveSvg = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M4 20 Q8 8, 16 16 T28 12" stroke="url(#wg3)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <defs>
      <linearGradient id="wg3" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
  </svg>
);

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7a8494" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 7L2 7" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
  </svg>
);

const navItems = [
  { icon: <MailIcon />, label: "受信トレイ", count: 2 },
  { icon: <SendIcon />, label: "送信済み", count: 0 },
  { icon: <FileIcon />, label: "下書き", count: 1 },
  { icon: <TrashIcon />, label: "ゴミ箱", count: 0 },
  { icon: <SettingsIcon />, label: "設定", count: 0 },
];

export default function DemoV3() {
  const [selectedEmail, setSelectedEmail] = useState(0);
  const [selectedTone, setSelectedTone] = useState<number>(0);
  const [activeNav, setActiveNav] = useState(0);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const current = emails[selectedEmail];

  const base: React.CSSProperties = {
    background: "linear-gradient(165deg, #0a0e17 0%, #0d1a2d 50%, #0f1729 100%)",
    minHeight: "100vh",
    color: "#e2e8f0",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif",
    fontSize: 13,
  };

  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.025)",
    borderLeft: "2px solid rgba(255,255,255,0.05)",
    borderTop: "none",
    borderRight: "none",
    borderBottom: "none",
    borderRadius: 8,
  };

  const elevated: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    borderLeft: "2px solid rgba(59,130,246,0.3)",
    borderTop: "none",
    borderRight: "none",
    borderBottom: "none",
    borderRadius: 8,
  };

  return (
    <div style={base}>
      {/* Demo Navigation */}
      <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 9999, display: "flex", gap: 6, padding: "8px 12px", borderRadius: 12, background: "rgba(6,10,18,0.9)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
        {[1,2,3,4,5].map(v => (
          <a key={v} href={`/demo/v${v}`} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: v === 3 ? 600 : 400, color: v === 3 ? "#fff" : "#94a3b8", background: v === 3 ? "#3B82F6" : "transparent", textDecoration: "none", transition: "all 0.2s" }}>V{v}</a>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        {/* Compact Sidebar - 60px icons only */}
        <div style={{
          width: 60,
          minWidth: 60,
          background: "rgba(6, 10, 18, 0.5)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "12px 0",
          height: "100vh",
          position: "sticky",
          top: 0,
        }}>
          <div style={{ marginBottom: 20, padding: 4 }}>
            <WaveSvg size={28} />
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
            {navItems.map((item, i) => (
              <div
                key={item.label}
                onClick={() => setActiveNav(i)}
                onMouseEnter={() => setHoveredNav(i)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 40,
                  cursor: "pointer",
                  color: activeNav === i ? "#3B82F6" : "#7a8494",
                  background: activeNav === i ? "rgba(59,130,246,0.1)" : "transparent",
                  borderLeft: activeNav === i ? "2px solid #3B82F6" : "2px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                {item.icon}
                {item.count > 0 && (
                  <span style={{
                    position: "absolute", top: 4, right: 8,
                    fontSize: 9, color: "#fff",
                    background: "#3B82F6",
                    width: 14, height: 14, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700,
                  }}>
                    {item.count}
                  </span>
                )}
                {/* Tooltip */}
                {hoveredNav === i && (
                  <div style={{
                    position: "absolute",
                    left: 56,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(15,23,42,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 6,
                    padding: "4px 10px",
                    fontSize: 11,
                    color: "#e2e8f0",
                    whiteSpace: "nowrap",
                    zIndex: 100,
                    pointerEvents: "none",
                  }}>
                    {item.label}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #3B82F6, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 600, cursor: "pointer",
          }}>
            YT
          </div>
        </div>

        {/* Main Content - Three columns */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
          {/* Header - compact */}
          <div style={{ padding: "8px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "nowrap" }}>
              RAKUDAメール
            </span>
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><SearchIcon /></div>
              <input
                type="text"
                placeholder="検索..."
                style={{
                  width: "100%",
                  padding: "6px 10px 6px 32px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 6,
                  color: "#e2e8f0",
                  fontSize: 12,
                  outline: "none",
                }}
              />
            </div>
            <span style={{ fontSize: 11, color: "#4b5563", whiteSpace: "nowrap" }}>5件の未読</span>
          </div>

          {/* Three-column content */}
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            {/* Email List - compact */}
            <div style={{ width: 280, minWidth: 280, borderRight: "1px solid rgba(255,255,255,0.05)", overflowY: "auto" }}>
              {emails.map((em, i) => (
                <div
                  key={em.id}
                  onClick={() => setSelectedEmail(i)}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(255,255,255,0.02)",
                    background: selectedEmail === i ? "rgba(59,130,246,0.06)" : "transparent",
                    borderLeft: selectedEmail === i ? "2px solid #3B82F6" : "2px solid transparent",
                    transition: "background 0.1s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {em.unread && <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "#3B82F6" }} />}
                      <span style={{ fontSize: 12, fontWeight: em.unread ? 600 : 400, color: em.unread ? "#e2e8f0" : "#9ca3af" }}>
                        {em.sender}
                      </span>
                    </div>
                    <span style={{ fontSize: 10, color: "#4b5563" }}>{em.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: em.unread ? "#e2e8f0" : "#7a8494", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: em.unread ? 500 : 400 }}>
                    {em.subject}
                  </div>
                  <div style={{ fontSize: 11, color: "#4b5563", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 1 }}>
                    {em.body.slice(0, 40)}...
                  </div>
                </div>
              ))}
            </div>

            {/* Email Detail - middle */}
            <div style={{ flex: 1, borderRight: "1px solid rgba(255,255,255,0.05)", overflowY: "auto", padding: 16 }}>
              <div style={{ ...card, padding: 16, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "rgba(59,130,246,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#3B82F6", fontWeight: 600, fontSize: 12,
                  }}>
                    {current.sender.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{current.sender}</div>
                    <div style={{ fontSize: 11, color: "#4b5563" }}>{current.email}</div>
                  </div>
                  <span style={{ fontSize: 11, color: "#4b5563" }}>{current.time}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{current.subject}</div>
                <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7 }}>{current.body}</div>
              </div>
            </div>

            {/* AI Panel - right side */}
            <div style={{ width: 320, minWidth: 320, overflowY: "auto", padding: 16 }}>
              <div style={{ ...elevated, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <SparkleIcon />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>AI返信</span>
                  </div>
                  {/* Inline tone selector */}
                  <div style={{ display: "flex", gap: 4 }}>
                    {tones.map((tone, i) => (
                      <button
                        key={tone}
                        onClick={() => setSelectedTone(i)}
                        style={{
                          padding: "3px 8px",
                          borderRadius: 4,
                          border: "none",
                          fontSize: 10,
                          fontWeight: 500,
                          cursor: "pointer",
                          background: selectedTone === i ? "#3B82F6" : "rgba(255,255,255,0.03)",
                          color: selectedTone === i ? "#fff" : "#7a8494",
                          transition: "all 0.1s",
                        }}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: 6,
                  padding: 12,
                  fontSize: 12,
                  color: "#9ca3af",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  marginBottom: 12,
                }}>
                  {aiDraft}
                </div>

                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{
                    flex: 1, padding: "6px 0",
                    background: "#3B82F6", color: "#fff",
                    border: "none", borderRadius: 6,
                    fontSize: 12, fontWeight: 500, cursor: "pointer",
                  }}>
                    送信
                  </button>
                  <button style={{
                    padding: "6px 12px",
                    background: "rgba(255,255,255,0.03)",
                    color: "#7a8494",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 6, fontSize: 12, cursor: "pointer",
                  }}>
                    編集
                  </button>
                  <button style={{
                    padding: "6px 12px",
                    background: "rgba(255,255,255,0.03)",
                    color: "#7a8494",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 6, fontSize: 12, cursor: "pointer",
                  }}>
                    再生成
                  </button>
                </div>
              </div>

              {/* Quick stats */}
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.025)", borderRadius: 6, padding: "8px 10px", borderLeft: "2px solid #4ade80" }}>
                  <div style={{ fontSize: 10, color: "#7a8494" }}>今日の返信</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#4ade80" }}>12</div>
                </div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.025)", borderRadius: 6, padding: "8px 10px", borderLeft: "2px solid #fbbf24" }}>
                  <div style={{ fontSize: 10, color: "#7a8494" }}>未処理</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fbbf24" }}>3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div style={{ padding: "48px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 380, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
              <WaveSvg size={24} />
              <span style={{ fontSize: 18, fontWeight: 700, background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                RAKUDAメール
              </span>
            </div>
            <p style={{ fontSize: 12, color: "#7a8494" }}>AIがメール返信をサポートします</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: 24 }}>
            <button style={{
              width: "100%",
              padding: "10px 14px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 6,
              color: "#e2e8f0",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 12,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Googleアカウントでログイン
            </button>
            <div style={{ textAlign: "center", fontSize: 10, color: "#4b5563" }}>
              ログインすることで利用規約に同意します
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div style={{ padding: "32px 16px 48px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>設定</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div style={{ background: "rgba(255,255,255,0.025)", borderLeft: "2px solid rgba(255,255,255,0.05)", borderRadius: 8, padding: 16 }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, marginBottom: 12 }}>プロフィール</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, color: "#7a8494", marginBottom: 2 }}>表示名</label>
                  <input type="text" defaultValue="山田 太郎" style={{
                    width: "100%", padding: "6px 8px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 4, color: "#e2e8f0", fontSize: 12, outline: "none",
                    boxSizing: "border-box",
                  }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, color: "#7a8494", marginBottom: 2 }}>メールアドレス</label>
                  <input type="email" defaultValue="yamada@company.co.jp" style={{
                    width: "100%", padding: "6px 8px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 4, color: "#e2e8f0", fontSize: 12, outline: "none",
                    boxSizing: "border-box",
                  }} />
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.025)", borderLeft: "2px solid rgba(255,255,255,0.05)", borderRadius: 8, padding: 16 }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, marginBottom: 12 }}>AI返信設定</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, color: "#7a8494", marginBottom: 2 }}>デフォルトのトーン</label>
                  <select style={{
                    width: "100%", padding: "6px 8px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 4, color: "#e2e8f0", fontSize: 12, outline: "none",
                    boxSizing: "border-box",
                  }}>
                    <option>フォーマル</option>
                    <option>カジュアル</option>
                    <option>簡潔</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, color: "#7a8494", marginBottom: 2 }}>署名</label>
                  <textarea defaultValue={"山田 太郎\n株式会社サンプル"} rows={2} style={{
                    width: "100%", padding: "6px 8px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 4, color: "#e2e8f0", fontSize: 12, outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.025)", borderLeft: "2px solid rgba(255,255,255,0.05)", borderRadius: 8, padding: 16 }}>
            <h3 style={{ fontSize: 12, fontWeight: 600, marginBottom: 12 }}>通知設定</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {["新着メール通知", "AI返信提案", "週次サマリー"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>{item}</span>
                  <div style={{
                    width: 34, height: 18, borderRadius: 9,
                    background: "#3B82F6",
                    position: "relative", cursor: "pointer",
                  }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, right: 2, transition: "all 0.2s" }} />
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
