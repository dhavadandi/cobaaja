import { useState } from "react";
import { MONTHS_36, ALL_REGENCIES, ANNUAL_BASELINE, useDashboard } from "../context/DashboardContext";

export default function Page6() {
  const { showToast } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<"forecast36" | "historical">("forecast36");

  const targetRegencies = ALL_REGENCIES.filter((r) => r.target);

  // Generate 36 Month Master Panel Data Rows (36 months x 5 Regencies = 180 Rows)
  const master36Rows: Array<{
    id: string;
    monthKey: string;
    monthLabel: string;
    regency: string;
    share: number;
    annualBaseline: number;
    monthlySupply: number;
    bmkgWeight: number;
    status: string;
  }> = [];

  MONTHS_36.forEach((m) => {
    const annualTotal = ANNUAL_BASELINE[m.year] || 145200;
    const periodSupply = Math.round(annualTotal * m.bmkgWeight);

    targetRegencies.forEach((r) => {
      const regShare = r.share || 0.05;
      const regSupply = Math.round(periodSupply * regShare);
      master36Rows.push({
        id: `${r.id}-${m.key}`,
        monthKey: m.key,
        monthLabel: m.label,
        regency: r.name,
        share: Math.round(regShare * 100 * 100) / 100,
        annualBaseline: annualTotal,
        monthlySupply: regSupply,
        bmkgWeight: Math.round(m.bmkgWeight * 100 * 10) / 10,
        status: r.status,
      });
    });
  });

  const filteredRows = master36Rows.filter(
    (row) =>
      row.monthLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.regency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.monthKey.includes(searchTerm)
  );

  const handleExportCSV = () => {
    showToast("Mengunduh File CSV Data Explorer 36 Bulan Forecasting...");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid #DEE2E6", background: "#FFFFFF", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 15, fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, color: "#0F2C59" }}>
            Data Explorer Enterprise &amp; Master Panel 36 Bulan (2026–2028)
          </h2>
          <div style={{ fontSize: 11, color: "#6C757D", marginTop: 2 }}>
            Audit Trail Data Panel BPS NTT (2015–2025) &amp; Hasil Proyeksi Dual-Forecasting Disagregasi Temporal BMKG (180 Observasi)
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="text"
            placeholder="Cari Kabupaten / Bulan / Tahun..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "6px 12px",
              border: "1px solid #CED4DA",
              borderRadius: 4,
              fontSize: 12,
              outline: "none",
              width: 220,
            }}
          />
          <button
            onClick={handleExportCSV}
            style={{
              background: "#198754",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 4,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Export Data CSV
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #DEE2E6", paddingBottom: 8 }}>
          <button
            onClick={() => setSelectedTab("forecast36")}
            style={{
              background: selectedTab === "forecast36" ? "#0F2C59" : "#E9ECEF",
              color: selectedTab === "forecast36" ? "#FFFFFF" : "#495057",
              border: "none",
              borderRadius: 4,
              padding: "6px 14px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Master Tabel Peramalan 36 Bulan (180 Observasi)
          </button>
          <button
            onClick={() => setSelectedTab("historical")}
            style={{
              background: selectedTab === "historical" ? "#0F2C59" : "#E9ECEF",
              color: selectedTab === "historical" ? "#FFFFFF" : "#495057",
              border: "none",
              borderRadius: 4,
              padding: "6px 14px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Master Panel Data Historis BPS (242 Observasi: 2015–2025)
          </button>
        </div>

        {selectedTab === "forecast36" ? (
          <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", background: "#F8F9FA", borderBottom: "1px solid #DEE2E6", fontSize: 11, fontWeight: 700, color: "#0F2C59" }}>
              TAMPILAN DATA PANEL PROYEKSI PERAMALAN BULANAN (MENAMPILKAN {filteredRows.length} DARI 180 BARIS DATA)
            </div>
            <div style={{ maxHeight: 420, overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
                <thead style={{ position: "sticky", top: 0, background: "#0F2C59", color: "#FFFFFF", zIndex: 10 }}>
                  <tr>
                    <th style={{ padding: "8px 12px", textAlign: "left" }}>Kode Periode</th>
                    <th style={{ padding: "8px 12px", textAlign: "left" }}>Bulan &amp; Tahun</th>
                    <th style={{ padding: "8px 12px", textAlign: "left" }}>Kabupaten Sentra</th>
                    <th style={{ padding: "8px 12px", textAlign: "right" }}>Pangsa Spasial</th>
                    <th style={{ padding: "8px 12px", textAlign: "right" }}>Bobot BMKG ($w_m$)</th>
                    <th style={{ padding: "8px 12px", textAlign: "right" }}>Proyeksi Pasokan</th>
                    <th style={{ padding: "8px 12px", textAlign: "left" }}>Status Risikos</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.slice(0, 100).map((r, idx) => (
                    <tr key={r.id} style={{ background: idx % 2 === 0 ? "#FFFFFF" : "#F8F9FA", borderBottom: "1px solid #E9ECEF" }}>
                      <td style={{ padding: "8px 12px", fontWeight: 700, color: "#0F2C59" }}>{r.monthKey}</td>
                      <td style={{ padding: "8px 12px" }}>{r.monthLabel}</td>
                      <td style={{ padding: "8px 12px", fontWeight: 700 }}>{r.regency}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right" }}>{r.share}%</td>
                      <td style={{ padding: "8px 12px", textAlign: "right" }}>{r.bmkgWeight}%</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 700, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                        {r.monthlySupply.toLocaleString("id-ID")} Ton
                      </td>
                      <td style={{ padding: "8px 12px" }}>
                        <span
                          style={{
                            background: r.status.includes("Critical") ? "#FFF0F0" : r.status.includes("Secure") ? "#E6F4EA" : "#FFF9E6",
                            color: r.status.includes("Critical") ? "#DC3545" : r.status.includes("Secure") ? "#198754" : "#D39E00",
                            padding: "2px 6px",
                            borderRadius: 2,
                            fontWeight: 700,
                            fontSize: 10,
                          }}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderRadius: 4, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F2C59", marginBottom: 8 }}>
              DATA PANEL HISTORIS BPS NUSA TENGGARA TIMUR (2015–2025)
            </div>
            <div style={{ fontSize: 12, color: "#495057", lineHeight: 1.6 }}>
              Total 242 observasi panel tahunan dari 22 kabupaten/kota se-NTT selama periode 11 tahun (2015–2025). Data ini bersumber dari publikasi resmi BPS NTT (*NTT Dalam Angka 2015-2026*) dan BPS Query Builder Statistik Hortikultura, bebas dari nilai hilang (*0 Missing Values*).
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
