import { useState } from "react";
import { ALL_REGENCIES, ANNUAL_BASELINE } from "../context/DashboardContext";

export default function Page6() {
  const [filterMode, setFilterMode] = useState<"all" | "hist" | "proj">("all");

  const years =
    filterMode === "hist"
      ? [2021, 2022, 2023, 2024, 2025]
      : filterMode === "proj"
      ? [2026, 2027, 2028]
      : [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028];

  const targetRegs = ALL_REGENCIES.filter((r) => r.id !== "all");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: "#F8FAFC" }}>
      {/* Header Bar */}
      <div
        style={{
          padding: "10px 20px",
          borderBottom: "1px solid #CBD5E1",
          background: "#FFFFFF",
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="serif-font" style={{ fontSize: 15, fontWeight: 700, color: "#0F2C59", margin: 0 }}>
          Data Explorer Enterprise &amp; Master Panel 8 Tahun (2021–2028)
        </h2>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setFilterMode("all")}
            style={{
              background: filterMode === "all" ? "#0F2C59" : "#E2E8F0",
              color: filterMode === "all" ? "#FFFFFF" : "#0F2C59",
              border: "none",
              padding: "4px 12px",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Seluruh Data (2021–2028)
          </button>
          <button
            onClick={() => setFilterMode("hist")}
            style={{
              background: filterMode === "hist" ? "#0F2C59" : "#E2E8F0",
              color: filterMode === "hist" ? "#FFFFFF" : "#0F2C59",
              border: "none",
              padding: "4px 12px",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Historis (2021–2025)
          </button>
          <button
            onClick={() => setFilterMode("proj")}
            style={{
              background: filterMode === "proj" ? "#0F2C59" : "#E2E8F0",
              color: filterMode === "proj" ? "#FFFFFF" : "#0F2C59",
              border: "none",
              padding: "4px 12px",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Proyeksi (2026–2028)
          </button>
        </div>
      </div>

      {/* Main Table Content */}
      <div style={{ flex: 1, padding: 12, overflowY: "auto" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: 6, padding: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "'Inter', sans-serif" }}>
            <thead>
              <tr style={{ background: "#F1F5F9", color: "#475569", borderBottom: "2px solid #CBD5E1" }}>
                <th style={{ padding: "6px 10px", textAlign: "left" }}>Tahun / Periode</th>
                <th style={{ padding: "6px 10px", textAlign: "left" }}>Kategori</th>
                <th style={{ padding: "6px 10px", textAlign: "left" }}>Kabupaten</th>
                <th style={{ padding: "6px 10px", textAlign: "right" }}>Produksi (Ton)</th>
                <th style={{ padding: "6px 10px", textAlign: "right" }}>Produktivitas</th>
                <th style={{ padding: "6px 10px", textAlign: "right" }}>Pangsa NTT</th>
                <th style={{ padding: "6px 10px", textAlign: "center" }}>Status Badge</th>
              </tr>
            </thead>
            <tbody>
              {years.map((yr) => {
                const isH = yr <= 2025;
                const tot = ANNUAL_BASELINE[yr] || 145200;

                return targetRegs.map((reg) => {
                  let prodVal = Math.round(tot * (reg.share ? reg.share : 0.05));
                  if (reg.id === "malaka") prodVal = Math.round(tot * (yr === 2021 ? 0.30 : yr === 2022 ? 0.35 : yr === 2023 ? 0.48 : 0.5046));
                  if (reg.id === "sikka") prodVal = yr <= 2021 ? 36000 : yr === 2022 ? 24750 : Math.round(tot * 0.022);
                  if (reg.id === "matim") prodVal = yr <= 2021 ? 27000 : yr === 2022 ? 19800 : Math.round(tot * 0.0286);
                  if (reg.id === "ngada") prodVal = yr <= 2021 ? 18000 : yr === 2022 ? 16500 : Math.round(tot * 0.0399);
                  if (reg.id === "ende") prodVal = yr <= 2021 ? 18000 : yr === 2022 ? 16500 : Math.round(tot * 0.051);

                  // Dynamic Badge Logic fixing User Point 1
                  let badgeText = "";
                  let badgeBg = "";
                  let badgeColor = "";

                  if (isH) {
                    // Historical Mode (2021-2025)
                    if (reg.target) {
                      badgeText = reg.id === "malaka" ? "BUFFER 50%" : reg.id === "sikka" || reg.id === "matim" ? "-84,7% BDB" : "RISIKO BDB";
                      badgeBg = reg.id === "malaka" ? "#D1E7DD" : reg.id === "sikka" || reg.id === "matim" ? "#F8D7DA" : "#FFF3CD";
                      badgeColor = reg.id === "malaka" ? "#198754" : reg.id === "sikka" || reg.id === "matim" ? "#DC3545" : "#D39E00";
                    } else {
                      badgeText = "BPS AKTUAL";
                      badgeBg = "#E2E8F0";
                      badgeColor = "#0F2C59";
                    }
                  } else {
                    // Projection Mode (2026-2028)
                    if (reg.target) {
                      badgeText = reg.id === "malaka" ? "PROYEKSI BUFFER" : reg.id === "sikka" || reg.id === "matim" ? "PROYEKSI KRITIS" : "PROYEKSI RISIKO";
                      badgeBg = reg.id === "malaka" ? "#D1E7DD" : reg.id === "sikka" || reg.id === "matim" ? "#F8D7DA" : "#FFF3CD";
                      badgeColor = reg.id === "malaka" ? "#198754" : reg.id === "sikka" || reg.id === "matim" ? "#DC3545" : "#D39E00";
                    } else {
                      badgeText = "PROYEKSI LUAR FOKUS";
                      badgeBg = "#F1F5F9";
                      badgeColor = "#64748B";
                    }
                  }

                  return (
                    <tr key={`${yr}-${reg.id}`} style={{ borderBottom: "1px solid #E2E8F0" }}>
                      <td style={{ padding: "6px 10px", fontWeight: 700 }}>{yr}</td>
                      <td style={{ padding: "6px 10px" }}>
                        <span
                          style={{
                            background: isH ? "#E2E8F0" : "#FFF0F0",
                            color: isH ? "#0F2C59" : "#DC3545",
                            padding: "1px 6px",
                            borderRadius: 3,
                            fontWeight: 700,
                            fontSize: 9.5,
                            fontFamily: "'Space Mono', monospace, sans-serif",
                          }}
                        >
                          {isH ? "HISTORIS BPS" : "PROYEKSI"}
                        </span>
                      </td>
                      <td style={{ padding: "6px 10px", fontWeight: 600 }}>{reg.name}</td>
                      <td style={{ padding: "6px 10px", textAlign: "right", fontWeight: 700 }}>
                        {prodVal.toLocaleString("id-ID")} Ton
                      </td>
                      <td style={{ padding: "6px 10px", textAlign: "right" }}>
                        {reg.id === "malaka" ? "12,59 Ton/Ha" : reg.id === "sikka" ? "1,85 Ton/Ha" : "5,40 Ton/Ha"}
                      </td>
                      <td style={{ padding: "6px 10px", textAlign: "right" }}>
                        {reg.share ? `${(reg.share * 100).toFixed(2)}%` : "5.00%"}
                      </td>
                      <td style={{ padding: "6px 10px", textAlign: "center" }}>
                        <span
                          style={{
                            background: badgeBg,
                            color: badgeColor,
                            padding: "1px 6px",
                            borderRadius: 3,
                            fontWeight: 700,
                            fontSize: 9.5,
                            fontFamily: "'Space Mono', monospace, sans-serif",
                            border: `1px solid ${badgeColor}30`,
                          }}
                        >
                          {badgeText}
                        </span>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
