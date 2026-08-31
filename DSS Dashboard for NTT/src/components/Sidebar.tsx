import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Ringkasan Eksekutif" },
  { path: "/peta-spasial", label: "Peta Spasial & Trans-Flores" },
  { path: "/forecasting", label: "Dual-Forecasting & BMKG" },
  { path: "/simulator", label: "Scenario Simulator" },
  { path: "/action-matrix", label: "Action Matrix 4K TPID" },
  { path: "/data-explorer", label: "Data Explorer Enterprise" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      style={{
        width: 240,
        background: "#FFFFFF",
        borderRight: "1px solid #CBD5E1",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      <nav style={{ padding: "8px 0", flex: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: "none",
                borderLeft: active ? "4px solid #E62129" : "4px solid transparent",
                background: active ? "#FFF0F0" : "transparent",
                color: active ? "#E62129" : "#495057",
                fontWeight: active ? 700 : 500,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.15s",
                lineHeight: 1.3,
              }}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
