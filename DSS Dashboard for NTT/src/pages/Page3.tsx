import { useState } from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { MONTHS_36, ANNUAL_BASELINE } from "../context/DashboardContext";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          background: "#0F172A",
          color: "#FFFFFF",
          border: `1px solid ${data.isEws ? "#DC3545" : "#0D6EFD"}`,
          borderRadius: 6,
          padding: "10px 14px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
          fontSize: 11,
          fontFamily: "'Space Mono', monospace, sans-serif",
          minWidth: 200,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 12, color: "#F8FAFC", marginBottom: 4 }}>{data.fullLabel}</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <span style={{ color: "#94A3B8" }}>Pasokan Bulanan:</span>
          <span style={{ fontWeight: 700, color: data.isEws ? "#F87171" : "#60A5FA" }}>
            {data.supply.toLocaleString("id-ID")} Ton
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ color: "#94A3B8" }}>Bobot BMKG ($w_m$):</span>
          <span style={{ fontWeight: 700, color: "#F1F5F9" }}>{(data.weight * 100).toFixed(1)}%</span>
        </div>
        {data.isEws && (
          <div style={{ fontSize: 9.5, color: "#EF4444", fontWeight: 700, borderTop: "1px solid #334155", paddingTop: 4, marginTop: 4 }}>
            ⚠️ SISTEM PERINGATAN DINI: EWS KEMARAU
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function Page3() {
  const [activeTab, setActiveTab] = useState<"monthly36" | "yearly">("monthly36");

  // Generate 36 Monthly Points Data for Recharts Line/Area Chart
  const chart36Data = MONTHS_36.map((m) => {
    const baseAnnual = ANNUAL_BASELINE[m.year] || 145200;
    const monthlyVal = Math.round(baseAnnual * m.bmkgWeight);
    const avgVal = Math.round(baseAnnual / 12);
    return {
      monthKey: m.key,
      shortLabel: m.key.replace("20", "'"), // e.g. '26-01
      fullLabel: m.label,
      year: m.year,
      weight: m.bmkgWeight,
      supply: monthlyVal,
      baselineAvg: avgVal,
      isEws: m.ewsAlert,
    };
  });

  const yearlyScenariosData = [
    { year: "2024 (Aktual)", baseline: 140020, pembiaran: 140020, intervensi: 140020 },
    { year: "2025 (Wabah BDB)", baseline: 140020, pembiaran: 140020, intervensi: 140020 },
    { year: "2026 (Tahun 1)", baseline: 145200, pembiaran: 125000, intervensi: 165000 },
    { year: "2027 (Tahun 2)", baseline: 152000, pembiaran: 115000, intervensi: 188000 },
    { year: "2028 (Tahun 3)", baseline: 160500, pembiaran: 108000, intervensi: 211860 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: "#F8FAFC" }}>
      {/* Navigation Header Tabs */}
      <div
        style={{
          padding: "8px 16px",
          borderBottom: "1px solid #CBD5E1",
          background: "#FFFFFF",
          flexShrink: 0,
          display: "flex",
          justify: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0F2C59", fontFamily: "'Space Mono', monospace, sans-serif" }}>
          PEMODELAN DUAL-FORECASTING 36 BULAN &amp; EWS BMKG (2026–2028)
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", background: "#F1F5F9", padding: 3, borderRadius: 6, gap: 4, border: "1px solid #E2E8F0" }}>
          <button
            onClick={() => setActiveTab("monthly36")}
            style={{
              background: activeTab === "monthly36" ? "#0F2C59" : "transparent",
              color: activeTab === "monthly36" ? "#FFFFFF" : "#64748B",
              border: "none",
              borderRadius: 4,
              padding: "5px 12px",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "'Space Mono', monospace, sans-serif",
              cursor: "pointer",
            }}
          >
            📈 Grafik Gelombang 36 Bulan BMKG
          </button>
          <button
            onClick={() => setActiveTab("yearly")}
            style={{
              background: activeTab === "yearly" ? "#0F2C59" : "transparent",
              color: activeTab === "yearly" ? "#FFFFFF" : "#64748B",
              border: "none",
              borderRadius: 4,
              padding: "5px 12px",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "'Space Mono', monospace, sans-serif",
              cursor: "pointer",
            }}
          >
            📊 Skenario Structural Break Tahunan
          </button>
        </div>
      </div>

      {/* Main Content Area - Fits Single Screen Layout Perfectly */}
      <div style={{ flex: 1, minHeight: 0, padding: 12, display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        {activeTab === "monthly36" ? (
          <div
            style={{
              flex: 1,
              minHeight: 0,
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              borderRadius: 6,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2C59", fontFamily: "'Space Mono', monospace, sans-serif" }}>
                  GRAFIK TREN DUAL-FORECASTING DISAGREGASI TEMPORAL 36 BULAN (2026–2028)
                </div>
                <div style={{ fontSize: 10, color: "#64748B", marginTop: 2 }}>
                  Model Chow-Lin Berbasis Indeks Curah Hujan Musiman BMKG Stasiun Klimatologi NTT ($w_m$). Puncak Panen (Maret $11,2\%$), EWS Kemarau (Juni–Agustus $6,4\%$).
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, fontSize: 10, fontFamily: "'Space Mono', monospace, sans-serif" }}>
                <span style={{ color: "#0D6EFD", fontWeight: 700 }}>● Fluktuasi Musiman BMKG</span>
                <span style={{ color: "#64748B", fontWeight: 600 }}>╌ Rata-rata Baseline</span>
                <span style={{ color: "#DC3545", fontWeight: 700 }}>╍ Batas EWS Kemarau</span>
              </div>
            </div>

            {/* Recharts Interactive Dual-Line / Area Curve Chart */}
            <div style={{ flex: 1, minHeight: 0, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chart36Data} margin={{ top: 15, right: 20, left: 10, bottom: 25 }}>
                  <defs>
                    <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D6EFD" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#0D6EFD" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="shortLabel"
                    tick={{ fontSize: 9, fill: "#64748B", fontFamily: "'Space Mono', monospace" }}
                    interval={1}
                    angle={-30}
                    textAnchor="end"
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#64748B", fontFamily: "'Space Mono', monospace" }}
                    domain={[8000, 20000]}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}rb`}
                  />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <ReferenceLine y={10500} stroke="#DC3545" strokeDasharray="4 4" label={{ value: "EWS ALERT THRESHOLD", fill: "#DC3545", fontSize: 9, position: "insideTopLeft", fontWeight: 700 }} />
                  
                  {/* Area fill under BMKG seasonal curve */}
                  <Area type="monotone" dataKey="supply" fill="url(#colorSupply)" stroke="none" />
                  
                  {/* Main Line: Seasonal BMKG Monthly Supply */}
                  <Line
                    type="monotone"
                    dataKey="supply"
                    name="Pasokan Musiman BMKG"
                    stroke="#0D6EFD"
                    strokeWidth={2.5}
                    dot={(props: any) => {
                      const { cx, cy, payload } = props;
                      if (payload.isEws) {
                        return <circle key={cx} cx={cx} cy={cy} r={4} fill="#DC3545" stroke="#FFFFFF" strokeWidth={1.5} />;
                      }
                      return <circle key={cx} cx={cx} cy={cy} r={3} fill="#0D6EFD" stroke="#FFFFFF" strokeWidth={1} />;
                    }}
                    activeDot={{ r: 6, stroke: "#0F2C59", strokeWidth: 2 }}
                  />

                  {/* Secondary Line: Baseline Average */}
                  <Line
                    type="monotone"
                    dataKey="baselineAvg"
                    name="Rata-rata Baseline"
                    stroke="#94A3B8"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              minHeight: 0,
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              borderRadius: 6,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2C59", marginBottom: 4, fontFamily: "'Space Mono', monospace, sans-serif" }}>
              PERBANDINGAN GRAFIK SKENARIO REGRESI STRUCTURAL BREAK (2024–2028)
            </div>
            <div style={{ fontSize: 10, color: "#64748B", marginBottom: 12 }}>
              Proyeksi Dampak Pembiaran Wabah BDB (-23% penurunan) vs Skenario Intervensi Biosekuriti (+32% pemulihan produksi).
            </div>

            {/* Recharts Bar/Line Chart for Yearly Scenarios */}
            <div style={{ flex: 1, minHeight: 0, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={yearlyScenariosData} margin={{ top: 15, right: 20, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#475569", fontFamily: "'Space Mono', monospace" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748B" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}rb Ton`} domain={[80000, 230000]} />
                  <RechartsTooltip />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "'Space Mono', monospace" }} />
                  <Line type="monotone" dataKey="baseline" name="Baseline Structural Break" stroke="#0D6EFD" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="pembiaran" name="Pembiaran BDB (Syok Penurunan)" stroke="#DC3545" strokeWidth={2.5} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="intervensi" name="Intervensi Biosekuriti (Pemulihan)" stroke="#198754" strokeWidth={2.5} dot={{ r: 5 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
