import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", icon: "◈", label: "Ringkasan Eksekutif" },
  { path: "/peta-spasial", icon: "⊹", label: "Peta Spasial 22 Kab/Kota & Rantai Pasok" },
  { path: "/forecasting", icon: "⟁", label: "Dual-Forecasting & EWS Musiman BMKG" },
  { path: "/simulator", icon: "⊛", label: "Interactive Policy Scenario Simulator" },
  { path: "/action-matrix", icon: "⊞", label: "Action Matrix 4K TPID & Biosekuriti BDB" },
  { path: "/data-explorer", icon: "⊟", label: "Data Explorer & Export Audit Log" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      style={{
        width: 240,
        background: "#FFFFFF",
        borderRight: "1px solid #DEE2E6",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      <nav style={{ padding: "12px 0", flex: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "9px 16px",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                border: "none",
                borderLeft: active ? "4px solid #E62129" : "4px solid transparent",
                background: active ? "#FFF0F0" : "transparent",
                color: active ? "#E62129" : "#212529",
                fontWeight: active ? 600 : 400,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.15s",
                lineHeight: 1.4,
              }}
            >
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1, opacity: active ? 1 : 0.5 }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div
        style={{
          padding: "14px 16px",
          borderTop: "1px solid #DEE2E6",
          background: "#FAFAFA",
        }}
      >
        <div style={{ fontSize: 10, color: "#6C757D", marginBottom: 6 }}>
          <div style={{ fontWeight: 600, color: "#212529", marginBottom: 3 }}>Dataset Status</div>
          Master Data Panel BPS NTT 2015–2025
        </div>
        <div style={{ fontSize: 10, color: "#6C757D", marginBottom: 6 }}>
          <div style={{ fontWeight: 600, color: "#212529", marginBottom: 2 }}>Model Version</div>
          LightGBM + Structural Break v2.4
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, color: "#6C757D" }}>Data Quality Score</span>
          <span
            style={{
              background: "#198754",
              color: "white",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 6px",
              borderRadius: 2,
              letterSpacing: "0.03em",
            }}
          >
            99.8% Verified
          </span>
        </div>
        <div
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: "1px solid #DEE2E6",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#198754",
              animation: "pulse 2s infinite",
            }}
          />
          <span style={{ fontSize: 10, color: "#198754", fontWeight: 600 }}>SISTEM ONLINE</span>
        </div>
      </div>
    </aside>
  );
}
