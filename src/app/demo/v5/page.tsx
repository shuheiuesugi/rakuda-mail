"use client";

import React, { useState } from "react";

const emails = [
  { id: 1, sender: "田中 一郎", email: "tanaka@example.co.jp", subject: "新規お取引のご相談について", time: "9:14", unread: true, body: "山田様、先日はお時間をいただきありがとうございました。弊社サービスについて、改めてご説明させていただければと存じます。ご都合のよい日程をお知らせいただけますでしょうか。" },
  { id: 2, sender: "佐藤 美咲", email: "sato@partner.inc", subject: "Re: 来週の定例MTGについて", time: "8:42", unread: true, body: "お疲れ様です。来週の定例ですが、15時からでお願いできますでしょうか。議題は前回の続きで、プロジェクトの進捗確認を予定しています。" },
  { id: 3, sender: "鈴木 太郎", email: "suzuki@client.co.jp", subject: "見積書の件", time: "昨日", unread: false, body: "いつもお世話になっております。先日ご依頼いただいた見積書を添付にてお送りいたします。内容をご確認の上、ご不明な点がございましたらお気軽にお問い合わせください。" },
  { id: 4, sender: "山本 花子", email: "yamamoto@vendor.jp", subject: "請求書送付のお知らせ", time: "昨日", unread: false, body: "お世話になっております。2月分の請求書を送付いたします。お支払い期限は3月末日となっておりますので、ご確認のほどよろしくお願いいたします。" },
  { id: 5, sender: "LinkedIn", email: "noreply@linkedin.com", subject: "5 new connections this week", time: "3/24", unread: false, body: "You have new connection requests and updates from your network. Check out what's happening in your professional community." },
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

const WaveLogo = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <path d="M4 20c2-4 4-8 6-8s4 6 6 6 4-10 6-10 4 8 6 8" stroke="url(#wg5)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <defs>
      <linearGradient id="wg5" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
  </svg>
);

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7a8494" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const InboxIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
  </svg>
);

const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
  </svg>
);

const font = "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif";

const sidebarItems = [
  { key: "inbox", label: "受信トレイ", icon: <InboxIcon />, badge: 2 },
  { key: "starred", label: "スター付き", icon: <StarIcon />, badge: 0 },
  { key: "sent", label: "送信済み", icon: <SendIcon />, badge: 0 },
  { key: "trash", label: "ゴミ箱", icon: <TrashIcon />, badge: 0 },
];

export default function DemoV5() {
  const [selectedId, setSelectedId] = useState(1);
  const [tone, setTone] = useState<"formal" | "casual" | "concise">("formal");
  const [activeSidebar, setActiveSidebar] = useState("inbox");
  const [showAiPanel, setShowAiPanel] = useState(true);

  const selected = emails.find((e) => e.id === selectedId)!;
  const toneLabels = { formal: "フォーマル", casual: "カジュアル", concise: "簡潔" };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(165deg, #0a0e17 0%, #0d1a2d 50%, #0f1729 100%)", fontFamily: font, color: "#e2e8f0", display: "flex", flexDirection: "column" }}>
      {/* App Layout */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div style={{ width: 200, background: "rgba(6,10,18,0.5)", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px 20px" }}>
            <WaveLogo />
            <span style={{ fontSize: 15, fontWeight: 700, background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RAKUDAメール</span>
          </div>

          {/* Compose Button */}
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", borderRadius: 8, border: "none", background: "#3B82F6", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: font, marginBottom: 12 }}>
            新規作成
          </button>

          {/* Nav Items */}
          {sidebarItems.map((item) => (
            <button key={item.key} onClick={() => setActiveSidebar(item.key)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", background: activeSidebar === item.key ? "rgba(59,130,246,0.1)" : "transparent", color: activeSidebar === item.key ? "#60a5fa" : "#7a8494", fontSize: 13, fontWeight: activeSidebar === item.key ? 500 : 400, cursor: "pointer", fontFamily: font, width: "100%", textAlign: "left", transition: "all 0.15s" }}>
              {item.icon}
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge > 0 && <span style={{ fontSize: 11, background: "#3B82F6", color: "#fff", borderRadius: 10, padding: "1px 7px", fontWeight: 600 }}>{item.badge}</span>}
            </button>
          ))}

          <div style={{ flex: 1 }} />

          {/* Settings at bottom */}
          <button onClick={() => setActiveSidebar("settings")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", background: activeSidebar === "settings" ? "rgba(59,130,246,0.1)" : "transparent", color: activeSidebar === "settings" ? "#60a5fa" : "#4b5563", fontSize: 13, cursor: "pointer", fontFamily: font, width: "100%", textAlign: "left" }}>
            <SettingsIcon />
            設定
          </button>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Search Bar */}
          <div style={{ padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, maxWidth: 400 }}>
              <SearchIcon />
              <span style={{ color: "#4b5563", fontSize: 13 }}>メールを検索...</span>
            </div>
          </div>

          {/* Two Panel: Email List + Detail */}
          <div style={{ display: "flex", flex: 1, position: "relative" as const }}>
            {/* Email List */}
            <div style={{ width: 360, borderRight: "1px solid rgba(255,255,255,0.04)", overflowY: "auto" as const }}>
              <div style={{ padding: "12px 16px 8px", fontSize: 11, color: "#4b5563", fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" as const }}>受信トレイ</div>
              {emails.map((em) => (
                <button key={em.id} onClick={() => { setSelectedId(em.id); setShowAiPanel(true); }} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", width: "100%", border: "none", borderBottom: "1px solid rgba(255,255,255,0.03)", background: selectedId === em.id ? "rgba(59,130,246,0.06)" : "transparent", cursor: "pointer", textAlign: "left", fontFamily: font, transition: "all 0.12s", borderLeft: selectedId === em.id ? "2px solid #3B82F6" : "2px solid transparent" }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: em.unread ? "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(167,139,250,0.3))" : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: em.unread ? "#60a5fa" : "#4b5563", flexShrink: 0, marginTop: 1 }}>{em.sender[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: em.unread ? 600 : 400, color: em.unread ? "#e2e8f0" : "#9ca3af" }}>{em.sender}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {em.unread && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6" }} />}
                        <span style={{ fontSize: 11, color: "#4b5563" }}>{em.time}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: em.unread ? 500 : 400, color: em.unread ? "#e2e8f0" : "#7a8494", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 2 }}>{em.subject}</div>
                    <div style={{ fontSize: 11, color: "#4b5563", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{em.body}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Email Detail (Larger Card) */}
            <div style={{ flex: 1, padding: 24, overflowY: "auto" as const, position: "relative" as const }}>
              <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 28, boxShadow: "0 0 0 1px rgba(59,130,246,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ display: "flex", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: selected.unread ? "linear-gradient(135deg, #3B82F6, #60a5fa)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600, color: selected.unread ? "#fff" : "#7a8494" }}>{selected.sender[0]}</div>
                    <div>
                      <h2 style={{ fontSize: 16, fontWeight: 600, color: "#e2e8f0", margin: "0 0 4px" }}>{selected.subject}</h2>
                      <div style={{ fontSize: 12, color: "#7a8494" }}>{selected.sender} &lt;{selected.email}&gt;</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: "#4b5563", flexShrink: 0 }}>{selected.time}</span>
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.04)", marginBottom: 20 }} />
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "#9ca3af", margin: 0 }}>{selected.body}</p>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
                  <button onClick={() => setShowAiPanel(!showAiPanel)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(59,130,246,0.3)", background: "rgba(59,130,246,0.08)", color: "#60a5fa", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: font }}>
                    <SparkleIcon />
                    AI返信
                  </button>
                  <button style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)", color: "#7a8494", fontSize: 12, cursor: "pointer", fontFamily: font }}>返信</button>
                  <button style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)", color: "#7a8494", fontSize: 12, cursor: "pointer", fontFamily: font }}>転送</button>
                </div>
              </div>

              {/* Floating AI Reply Panel */}
              {showAiPanel && (
                <div style={{ position: "absolute" as const, bottom: 24, right: 24, left: 24, background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.05))", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 12, padding: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.1)", backdropFilter: "blur(16px)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <SparkleIcon />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>AI返信ドラフト</span>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      {(["formal", "casual", "concise"] as const).map((t) => (
                        <button key={t} onClick={() => setTone(t)} style={{ padding: "4px 12px", borderRadius: 6, border: "none", background: tone === t ? "rgba(59,130,246,0.15)" : "transparent", color: tone === t ? "#60a5fa" : "#4b5563", fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: font, transition: "all 0.12s", boxShadow: tone === t ? "0 0 0 1px rgba(59,130,246,0.3)" : "none" }}>
                          {toneLabels[t]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <pre style={{ fontSize: 12, lineHeight: 1.7, color: "#9ca3af", margin: "0 0 16px", whiteSpace: "pre-wrap", fontFamily: font, maxHeight: 180, overflowY: "auto" as const }}>{aiDraft}</pre>
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button style={{ padding: "7px 18px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)", color: "#7a8494", fontSize: 12, cursor: "pointer", fontFamily: font }}>再生成</button>
                    <button style={{ padding: "7px 18px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)", color: "#7a8494", fontSize: 12, cursor: "pointer", fontFamily: font }}>編集</button>
                    <button style={{ padding: "7px 18px", borderRadius: 6, border: "none", background: "#3B82F6", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: font }}>送信</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div style={{ padding: "48px 32px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#7a8494", marginBottom: 24, letterSpacing: 0.5, textTransform: "uppercase" as const }}>ログイン</h3>
        <div style={{ maxWidth: 400, margin: "0 auto", background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <WaveLogo />
            <span style={{ fontSize: 18, fontWeight: 700, background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RAKUDAメール</span>
          </div>
          <p style={{ fontSize: 13, color: "#7a8494", margin: 0, textAlign: "center", lineHeight: 1.6 }}>Googleアカウントでログインして<br />AIメール返信を始めましょう</p>
          <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 28px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#e2e8f0", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: font, transition: "all 0.15s" }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Googleでログイン
          </button>
          <span style={{ fontSize: 11, color: "#4b5563" }}>ログイン情報は安全に管理されます</span>
        </div>
      </div>

      {/* Settings Section */}
      <div style={{ padding: "24px 32px 60px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#7a8494", marginBottom: 24, letterSpacing: 0.5, textTransform: "uppercase" as const }}>設定</h3>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {/* AI Settings */}
          <div style={{ flex: "1 1 320px", background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 24 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", margin: "0 0 18px" }}>AI設定</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, color: "#4b5563", display: "block", marginBottom: 6, letterSpacing: 0.3 }}>デフォルトトーン</label>
                <div style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#9ca3af", fontSize: 13 }}>フォーマル</div>
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#4b5563", display: "block", marginBottom: 6, letterSpacing: 0.3 }}>署名</label>
                <div style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#9ca3af", fontSize: 13, lineHeight: 1.6 }}>山田 太郎<br />株式会社サンプル</div>
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#4b5563", display: "block", marginBottom: 6, letterSpacing: 0.3 }}>言語</label>
                <div style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#9ca3af", fontSize: 13 }}>日本語</div>
              </div>
            </div>
          </div>
          {/* Account Settings */}
          <div style={{ flex: "1 1 320px", background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 24 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", margin: "0 0 18px" }}>アカウント</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, color: "#4b5563", display: "block", marginBottom: 6, letterSpacing: 0.3 }}>接続中のアカウント</label>
                <div style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#9ca3af", fontSize: 13 }}>yamada@example.co.jp</div>
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#4b5563", display: "block", marginBottom: 6, letterSpacing: 0.3 }}>通知設定</label>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 18, borderRadius: 9, background: "#3B82F6", position: "relative" as const, cursor: "pointer" }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute" as const, top: 2, right: 2, transition: "all 0.15s" }} />
                  </div>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>新着メール通知</span>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#4b5563", display: "block", marginBottom: 6, letterSpacing: 0.3 }}>プラン</label>
                <div style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid rgba(59,130,246,0.2)", background: "rgba(59,130,246,0.05)", color: "#60a5fa", fontSize: 13, boxShadow: "0 0 0 1px rgba(59,130,246,0.1)" }}>Pro プラン</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
