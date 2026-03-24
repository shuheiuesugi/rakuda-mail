export function HeaderLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 40" className="header-logo-svg" style={{ height: "20px", width: "auto" }}>
      <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="currentColor" letterSpacing="3">RAKUDAメール</text>
    </svg>
  );
}

export function FooterLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
        <path d="M10,75 C10,75 22,25 38,25 C52,25 44,65 56,65 C68,65 60,20 74,20 C90,20 100,75 100,75"
              stroke="#1A1A2E" strokeWidth="7" fill="none" strokeLinecap="round"/>
      </svg>
      <span style={{ fontSize: "14px", fontWeight: 300, letterSpacing: "0.15em", color: "#111" }}>RAKUDA AI</span>
    </div>
  );
}
