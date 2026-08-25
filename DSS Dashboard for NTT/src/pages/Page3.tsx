import { useState } from "react";
import { MONTHS_36, ANNUAL_BASELINE } from "../context/DashboardContext";

export default function Page3() {
  const [activeTab, setActiveTab] = useState<"monthly36" | "yearly">("monthly36");

  // Generate 36 Monthly Points Data
  const monthly36Data = MONTHS_36.map((m) => {
    const baseAnnual = ANNUAL_BASELINE[m.year] || 145200;
    const monthlyVal = Math.round(baseAnnual * m.bmkgWeight);
    return {
      monthKey: m.key,
      label: m.label,
      year: m.year,
      weight: m.bmkgWeight,
      supply: monthlyVal,
      isEws: m.ewsAlert,
    };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid #DEE2E6", background: "#FFFFFF", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 15, fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, color: "#0F2C59" }}>
            Pemodelan Dual-Forecasting Ekonometri &amp; EWS Musiman BMKG (36 Bulan)
          </h2>
          <div style={{ fontSize: 11, color: "#6C757D", marginTop: 2 }}>
            Proyeksi Disagregasi Temporal Bulanan (Chow-Lin BMKG) &amp; Regresi Structural Break Syok Wabah BDB (2026–2028)
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", background: "#E9ECEF", padding: 3, borderRadius: 6, gap: 4 }}>
          <button
            onClick={() => setActiveTab("monthly36")}
            style={{
              background: activeTab === "monthly36" ? "#0F2C59" : "transparent",
              color: activeTab === "monthly36" ? "#FFFFFF" : "#495057",
              border: "none",
              borderRadius: 4,
              padding: "6px 14px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Disagregasi 36 Bulan BMKG (2026–2028)
          </button>
          <button
            onClick={() => setActiveTab("yearly")}
            style={{
              background: activeTab === "yearly" ? "#0F2C59" : "transparent",
              color: activeTab === "yearly" ? "#FFFFFF" : "#495057",
              border: "none",
              borderRadius: 4,
              padding: "6px 14px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Structural Break Tahunan (2015–2028)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
        {activeTab === "monthly36" ? (
          <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderRadius: 4, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F2C59", marginBottom: 4 }}>
              DISAGREGASI TEMPORAL PASOKAN BULANAN (36 BULAN: JANUARI 2026 – DESEMBER 2028)
            </div>
            <div style={{ fontSize: 11, color: "#6C757D", marginBottom: 14 }}>
              *Fluktuasi pasokan dihitung berdasarkan pembobotan indeks curah hujan bulanan BMKG Stasiun Klimatologi NTT ($w_m$). Bulan Juni–Agustus merupakan periode Sistem Peringatan Dini (EWS Kemarau).
            </div>

            {/* 36-Month Data Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 16 }}>
              {monthly36Data.slice(0, 18).map((m) => (
                <div
                  key={m.monthKey}
                  style={{
                    background: m.isEws ? "#FFF0F0" : "#F8F9FA",
                    border: `1px solid ${m.isEws ? "#E6212940" : "#DEE2E6"}`,
                    borderRadius: 4,
                    padding: 8,
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, color: m.isEws ? "#DC3545" : "#0F2C59" }}>{m.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Source Serif 4', Georgia, serif", marginTop: 4 }}>
                    {m.supply.toLocaleString("id-ID")} Ton
                  </div>
                  <div style={{ fontSize: 9.5, color: "#6C757D", marginTop: 2 }}>
                    Bobot: {Math.round(m.weight * 100 * 10) / 10}%
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2C59", marginBottom: 10 }}>TAHUN 2027 (KEDUA) &amp; TAHUN 2028 (KETIGA):</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
              {monthly36Data.slice(18, 36).map((m) => (
                <div
                  key={m.monthKey}
                  style={{
                    background: m.isEws ? "#FFF0F0" : "#F8F9FA",
                    border: `1px solid ${m.isEws ? "#E6212940" : "#DEE2E6"}`,
                    borderRadius: 4,
                    padding: 8,
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, color: m.isEws ? "#DC3545" : "#0F2C59" }}>{m.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Source Serif 4', Georgia, serif", marginTop: 4 }}>
                    {m.supply.toLocaleString("id-ID")} Ton
                  </div>
                  <div style={{ fontSize: 9.5, color: "#6C757D", marginTop: 2 }}>
                    Bobot: {Math.round(m.weight * 100 * 10) / 10}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderRadius: 4, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F2C59", marginBottom: 12 }}>
              MODEL REGRESI STRUCTURAL BREAK 3 SKENARIO KEBIJAKAN (2015 – 2028)
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#0F2C59", color: "#FFFFFF" }}>
                  <th style={{ padding: 10, textAnchor: "left" }}>Tahun / Skenario</th>
                  <th style={{ padding: 10, textAnchor: "right" }}>Proyeksi Baseline</th>
                  <th style={{ padding: 10, textAnchor: "right" }}>Skenario Pembiaran BDB</th>
                  <th style={{ padding: 10, textAnchor: "right" }}>Skenario Intervensi Biosekuriti</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #E9ECEF" }}>
                  <td style={{ padding: 10, fontWeight: 700 }}>2025 (Wabah BDB)</td>
                  <td style={{ padding: 10, textAlign: "right" }}>140.020 Ton</td>
                  <td style={{ padding: 10, textAlign: "right", color: "#DC3545" }}>140.020 Ton</td>
                  <td style={{ padding: 10, textAlign: "right", color: "#198754" }}>140.020 Ton</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #E9ECEF" }}>
                  <td style={{ padding: 10, fontWeight: 700 }}>2026 (Tahun 1 Peramalan)</td>
                  <td style={{ padding: 10, textAlign: "right" }}>145.200 Ton</td>
                  <td style={{ padding: 10, textAlign: "right", color: "#DC3545" }}>125.000 Ton</td>
                  <td style={{ padding: 10, textAlign: "right", color: "#198754" }}>165.000 Ton</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #E9ECEF" }}>
                  <td style={{ padding: 10, fontWeight: 700 }}>2027 (Tahun 2 Peramalan)</td>
                  <td style={{ padding: 10, textAlign: "right" }}>152.000 Ton</td>
                  <td style={{ padding: 10, textAlign: "right", color: "#DC3545" }}>115.000 Ton</td>
                  <td style={{ padding: 10, textAlign: "right", color: "#198754" }}>188.000 Ton</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #E9ECEF" }}>
                  <td style={{ padding: 10, fontWeight: 700 }}>2028 (Tahun 3 Peramalan)</td>
                  <td style={{ padding: 10, textAlign: "right" }}>160.500 Ton</td>
                  <td style={{ padding: 10, textAlign: "right", color: "#DC3545", fontWeight: 700 }}>108.000 Ton (-23%)</td>
                  <td style={{ padding: 10, textAlign: "right", color: "#198754", fontWeight: 700 }}>211.860 Ton (+32%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
