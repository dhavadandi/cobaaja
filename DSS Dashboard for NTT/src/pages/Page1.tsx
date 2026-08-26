import { useDashboard, ALL_REGENCIES, MONTHS_36, ANNUAL_BASELINE } from "../context/DashboardContext";
import NTTMap from "../components/NTTMap";

function KPICard({
  title,
  metric,
  subtext,
  badgeColor,
  badgeLabel,
}: {
  title: string;
  metric: string;
  subtext: string;
  badgeColor: string;
  badgeLabel: string;
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #DEE2E6",
        borderRadius: 6,
        padding: "12px 14px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        flex: 1,
        minWidth: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left 3px Vertical Accent Border Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 3,
          height: "100%",
          background: badgeColor,
        }}
      />
      <div
        style={{
          fontSize: 9.5,
          fontWeight: 700,
          color: "#6C757D",
          letterSpacing: "0.1em",
          marginBottom: 4,
          textTransform: "uppercase",
          fontFamily: "'Space Mono', monospace, sans-serif",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: metric === "N/A" ? "#6C757D" : "#0F2C59",
          fontFamily: "'Source Serif 4', Georgia, serif",
          lineHeight: 1.1,
          marginBottom: 4,
        }}
      >
        {metric}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              background: badgeColor + "18",
              border: `1px solid ${badgeColor}40`,
              color: badgeColor,
              fontSize: 9.5,
              fontWeight: 700,
              padding: "1px 5px",
              borderRadius: 3,
              fontFamily: "'Space Mono', monospace, sans-serif",
            }}
          >
            {badgeLabel}
          </span>
          <span style={{ fontSize: 10, color: "#6C757D" }}>{subtext}</span>
        </div>

        {/* Micro-Visual Meter Pill Bars */}
        <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              style={{
                width: 3,
                height: 8,
                borderRadius: 1,
                background: i <= 4 ? badgeColor : "#E2E8F0",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page1() {
  const { selectedRegency, setSelectedRegency, selectedMonth } = useDashboard();

  const currentRegObj = ALL_REGENCIES.find((r) => r.id === selectedRegency);
  const isNonTarget = currentRegObj && !currentRegObj.target && selectedRegency !== "all";

  // Calculate dynamic supply metrics based on 36-Month Selection & BMKG Weighting
  const getDynamicSupplyData = () => {
    let year = 2026;
    let weight = 1.0;
    let isSpecificMonth = false;
    let selectedMonthObj = MONTHS_36.find((m) => m.key === selectedMonth);

    if (selectedMonth.startsWith("yr-")) {
      year = parseInt(selectedMonth.replace("yr-", ""));
    } else if (selectedMonthObj) {
      year = selectedMonthObj.year;
      weight = selectedMonthObj.bmkgWeight;
      isSpecificMonth = true;
    }

    const annualTotal = ANNUAL_BASELINE[year] || 145200;
    const periodSupply = Math.round(annualTotal * weight);

    return {
      year,
      weight,
      isSpecificMonth,
      selectedMonthObj,
      periodSupply,
      annualTotal,
    };
  };

  const dyn = getDynamicSupplyData();

  // Dynamic KPI Card 2 (Option A)
  const getKPICard2Data = () => {
    if (selectedRegency === "malaka" || selectedRegency === "all") {
      const malakaSupply = Math.round(dyn.periodSupply * 0.5046);
      return {
        title: selectedRegency === "all" ? "PASOKAN SENTRA MALAKA" : "PASOKAN KABUPATEN MALAKA",
        metric: `${malakaSupply.toLocaleString("id-ID")} Ton`,
        subtext: "50,46% Pangsa Pasokan NTT",
        color: "#198754",
        badge: "PRIMARY BUFFER",
      };
    }
    if (selectedRegency === "sikka") {
      const sikkaSupply = Math.round(dyn.periodSupply * 0.022);
      return {
        title: "PASOKAN KABUPATEN SIKKA",
        metric: `${sikkaSupply.toLocaleString("id-ID")} Ton`,
        subtext: "2,20% Pangsa (-84,71% YoY)",
        color: "#DC3545",
        badge: "CRITICAL BDB",
      };
    }
    if (selectedRegency === "matim") {
      const matimSupply = Math.round(dyn.periodSupply * 0.0286);
      return {
        title: "PASOKAN MANGGARAI TIMUR",
        metric: `${matimSupply.toLocaleString("id-ID")} Ton`,
        subtext: "2,86% Pangsa (-78,68% YoY)",
        color: "#DC3545",
        badge: "CRITICAL BDB",
      };
    }
    if (selectedRegency === "ngada") {
      const ngadaSupply = Math.round(dyn.periodSupply * 0.0399);
      return {
        title: "PASOKAN KABUPATEN NGADA",
        metric: `${ngadaSupply.toLocaleString("id-ID")} Ton`,
        subtext: "3,99% Pangsa (Risiko BDB)",
        color: "#D39E00",
        badge: "ERADIKASI",
      };
    }
    if (selectedRegency === "ende") {
      const endeSupply = Math.round(dyn.periodSupply * 0.051);
      return {
        title: "PASOKAN KABUPATEN ENDE",
        metric: `${endeSupply.toLocaleString("id-ID")} Ton`,
        subtext: "5,10% Pangsa (Beranga Kelimutu)",
        color: "#D39E00",
        badge: "WATCHLIST",
      };
    }

    return {
      title: `PASOKAN ${currentRegObj ? currentRegObj.name.toUpperCase() : ""}`,
      metric: "N/A",
      subtext: "Luar 5 Sentra Penelitian",
      color: "#6C757D",
      badge: "DATA N/A",
    };
  };

  const card2 = getKPICard2Data();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: "#F8FAFC" }}>
      {/* Main Content Area - Fits 100vh Single Screen Layout Perfectly */}
      <div style={{ flex: 1, minHeight: 0, padding: 12, display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        {/* KPI Strip */}
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <KPICard
            title={`TOTAL PASOKAN AGREGAT NTT (${dyn.isSpecificMonth ? dyn.selectedMonthObj?.key : `TAHUN ${dyn.year}`})`}
            metric={`${dyn.periodSupply.toLocaleString("id-ID")} Ton`}
            subtext={
              dyn.isSpecificMonth
                ? `BMKG ${Math.round(dyn.weight * 100 * 10) / 10}% (${dyn.selectedMonthObj?.ewsAlert ? "ALERT EWS" : "PANEN"})`
                : `Baseline ${dyn.year}`
            }
            badgeColor={dyn.selectedMonthObj?.ewsAlert ? "#DC3545" : "#0D6EFD"}
            badgeLabel={dyn.selectedMonthObj?.ewsAlert ? "EWS KEMARAU" : "DUAL-FORECAST"}
          />
          <KPICard
            title={card2.title}
            metric={card2.metric}
            subtext={card2.subtext}
            badgeColor={card2.color}
            badgeLabel={card2.badge}
          />
          <KPICard
            title="SYOK PENURUNAN FLORES"
            metric={isNonTarget ? "N/A" : "-78,68%"}
            subtext={isNonTarget ? "Luar Sentra" : "Sikka (-84%), Matim (-78%)"}
            badgeColor={isNonTarget ? "#6C757D" : "#DC3545"}
            badgeLabel={isNonTarget ? "DATA N/A" : "CRITICAL BDB"}
          />
          <KPICard
            title="PDRB SEKTOR PERTANIAN"
            metric="Rp 9,78 T"
            subtext="28,50% Kontribusi PDRB BI"
            badgeColor="#0D6EFD"
            badgeLabel="MACRO IMPACT"
          />
        </div>

        {/* Hero Section Split: Map (60%) & AI Briefing (40%) */}
        <div style={{ display: "flex", gap: 10, flex: 1, minHeight: 0 }}>
          {/* Map Container */}
          <div
            style={{
              flex: "0 0 60%",
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              borderRadius: 6,
              padding: 10,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "#0F2C59", marginBottom: 6, fontFamily: "'Space Mono', monospace, sans-serif" }}>
              PETA CHOROPLETH KONSENTRASI PASOKAN &amp; WABAH BDB (22 KAB/KOTA)
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <NTTMap />
            </div>
          </div>

          {/* AI Executive Briefing Container with Rich Structured Information (Filling empty space 100%) */}
          <div
            style={{
              flex: "0 0 40%",
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              borderRadius: 6,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              overflowY: "auto",
              gap: 10,
            }}
          >
            <div style={{ borderBottom: "2px solid #E62129", paddingBottom: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2C59", fontFamily: "'Space Mono', monospace, sans-serif" }}>
                RINGKASAN EKSEKUTIF PENELITIAN &amp; TPID BI
              </div>
            </div>

            {/* Finding Box */}
            <div style={{ background: "#F8FAFC", borderLeft: "3px solid #0F2C59", padding: "6px 10px", borderRadius: "0 4px 4px 0", fontSize: 11 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: "#0F2C59", textTransform: "uppercase", fontFamily: "'Space Mono', monospace, sans-serif" }}>
                TEMUAN UTAMA SPASIAL &amp; BMKG:
              </div>
              <div style={{ marginTop: 2, lineHeight: 1.4 }}>
                {dyn.isSpecificMonth && (
                  <div style={{ color: dyn.selectedMonthObj?.ewsAlert ? "#DC3545" : "#0D6EFD", fontWeight: 700, marginBottom: 2 }}>
                    [{dyn.selectedMonthObj?.label}]: Pasokan NTT {dyn.periodSupply.toLocaleString("id-ID")} Ton (Malaka: {Math.round(dyn.periodSupply * 0.5046).toLocaleString("id-ID")} Ton).
                  </div>
                )}
                {selectedRegency === "malaka" ? (
                  <b>Kabupaten Malaka menjadi sentra penyangga utama dengan proyeksi pasokan sebesar {Math.round(dyn.periodSupply * 0.5046).toLocaleString("id-ID")} Ton (50,46% pasokan total NTT).</b>
                ) : selectedRegency === "sikka" ? (
                  <b style={{ color: "#DC3545" }}>Kabupaten Sikka mengalami penurunan produksi drastis -84,71% ({Math.round(dyn.periodSupply * 0.022).toLocaleString("id-ID")} Ton) akibat wabah BDB.</b>
                ) : isNonTarget ? (
                  <b style={{ color: "#6C757D" }}>Wilayah {currentRegObj.name} berada di luar 5 sentra utama fokus penelitian data panel (Status: N/A).</b>
                ) : (
                  <b>Kabupaten Malaka menyumbang 50,46% pasokan pisang NTT ({Math.round(dyn.periodSupply * 0.5046).toLocaleString("id-ID")} Ton), sementara sentra utama Pulau Flores mengalami penurunan akibat wabah BDB (*Ralstonia syzygii*).</b>
                )}
              </div>
            </div>

            {/* Rekomendasi TPID Box */}
            <div style={{ background: "#EBF3FE", borderLeft: "3px solid #0D6EFD", padding: "6px 10px", borderRadius: "0 4px 4px 0", fontSize: 11 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: "#0D6EFD", textTransform: "uppercase", fontFamily: "'Space Mono', monospace, sans-serif" }}>
                REKOMENDASI KERANGKA 4K TPID:
              </div>
              <ul style={{ margin: "3px 0 0 0", paddingLeft: 14, lineHeight: 1.4 }}>
                <li><b>Ketersediaan Pasokan:</b> Bibit kultur jaringan <i>Pisang Beranga Kelimutu Ende</i>.</li>
                <li><b>Kelancaran Distribusi:</b> Checkpoint Biosekuriti Darat Trans-Flores.</li>
                <li><b>Komunikasi Efektif:</b> Edukasi Instruksi Bupati Ngada No. 1/2023.</li>
              </ul>
            </div>

            {/* IDE 2: Macro Support & UMKM Impact Widgets */}
            <div style={{ borderTop: "1px dashed #CBD5E1", paddingTop: 8 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6, fontFamily: "'Space Mono', monospace, sans-serif" }}>
                INDIKATOR DUKUNGAN MAKRO &amp; DAMPAK UMKM:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <div style={{ background: "#FFF0F0", border: "1px solid rgba(220,53,69,0.25)", borderRadius: 4, padding: "6px 8px" }}>
                  <div style={{ fontSize: 9, color: "#DC3545", fontWeight: 700 }}>INFLASI HORTIKULTURA</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#DC3545", fontFamily: "'Source Serif 4', Georgia, serif" }}>70%</div>
                  <div style={{ fontSize: 8.5, color: "#64748B" }}>Disumbang Pisang (Bria, 2024)</div>
                </div>

                <div style={{ background: "#FFFBEB", border: "1px solid rgba(217,119,6,0.25)", borderRadius: 4, padding: "6px 8px" }}>
                  <div style={{ fontSize: 9, color: "#D97706", fontWeight: 700 }}>BIAYA BAHAN BAKU UMKM</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#D97706", fontFamily: "'Source Serif 4', Georgia, serif" }}>+50% s.d. +200%</div>
                  <div style={{ fontSize: 8.5, color: "#64748B" }}>*Muku Loto &amp; Manggulu*</div>
                </div>
              </div>
            </div>

            {/* NEW ADDITION: Mini Leaderboard Table 5 Sentra Utama (Fills the remaining bottom space 100%) */}
            <div style={{ borderTop: "1px dashed #CBD5E1", paddingTop: 8 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6, fontFamily: "'Space Mono', monospace, sans-serif" }}>
                LEADERBOARD PASOKAN 5 SENTRA UTAMA:
              </div>
              <div style={{ border: "1px solid #E2E8F0", borderRadius: 4, overflow: "hidden", fontSize: 10 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F1F5F9", color: "#475569", borderBottom: "1px solid #CBD5E1" }}>
                      <th style={{ padding: "4px 8px", textAlign: "left" }}>Kabupaten</th>
                      <th style={{ padding: "4px 8px", textAlign: "right" }}>Pasokan</th>
                      <th style={{ padding: "4px 8px", textAlign: "right" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      onClick={() => setSelectedRegency("malaka")}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        cursor: "pointer",
                        background: selectedRegency === "malaka" ? "#D1E7DD" : "transparent",
                      }}
                    >
                      <td style={{ padding: "4px 8px", fontWeight: 700 }}>Kab. Malaka</td>
                      <td style={{ padding: "4px 8px", textAlign: "right" }}>{Math.round(dyn.periodSupply * 0.5046).toLocaleString("id-ID")} Ton</td>
                      <td style={{ padding: "4px 8px", textAlign: "right" }}>
                        <span style={{ color: "#198754", fontWeight: 700, background: "#D1E7DD", padding: "1px 4px", borderRadius: 2 }}>BUFFER 50%</span>
                      </td>
                    </tr>
                    <tr
                      onClick={() => setSelectedRegency("sikka")}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        cursor: "pointer",
                        background: selectedRegency === "sikka" ? "#F8D7DA" : "transparent",
                      }}
                    >
                      <td style={{ padding: "4px 8px", fontWeight: 700 }}>Kab. Sikka</td>
                      <td style={{ padding: "4px 8px", textAlign: "right" }}>{Math.round(dyn.periodSupply * 0.022).toLocaleString("id-ID")} Ton</td>
                      <td style={{ padding: "4px 8px", textAlign: "right" }}>
                        <span style={{ color: "#DC3545", fontWeight: 700, background: "#F8D7DA", padding: "1px 4px", borderRadius: 2 }}>-84,7% BDB</span>
                      </td>
                    </tr>
                    <tr
                      onClick={() => setSelectedRegency("matim")}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        cursor: "pointer",
                        background: selectedRegency === "matim" ? "#F8D7DA" : "transparent",
                      }}
                    >
                      <td style={{ padding: "4px 8px", fontWeight: 700 }}>Manggarai Timur</td>
                      <td style={{ padding: "4px 8px", textAlign: "right" }}>{Math.round(dyn.periodSupply * 0.0286).toLocaleString("id-ID")} Ton</td>
                      <td style={{ padding: "4px 8px", textAlign: "right" }}>
                        <span style={{ color: "#DC3545", fontWeight: 700, background: "#F8D7DA", padding: "1px 4px", borderRadius: 2 }}>-78,7% BDB</span>
                      </td>
                    </tr>
                    <tr
                      onClick={() => setSelectedRegency("ngada")}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        cursor: "pointer",
                        background: selectedRegency === "ngada" ? "#FFF3CD" : "transparent",
                      }}
                    >
                      <td style={{ padding: "4px 8px", fontWeight: 700 }}>Kab. Ngada</td>
                      <td style={{ padding: "4px 8px", textAlign: "right" }}>{Math.round(dyn.periodSupply * 0.0399).toLocaleString("id-ID")} Ton</td>
                      <td style={{ padding: "4px 8px", textAlign: "right" }}>
                        <span style={{ color: "#D39E00", fontWeight: 700, background: "#FFF3CD", padding: "1px 4px", borderRadius: 2 }}>RISIKO BDB</span>
                      </td>
                    </tr>
                    <tr
                      onClick={() => setSelectedRegency("ende")}
                      style={{
                        cursor: "pointer",
                        background: selectedRegency === "ende" ? "#FFF3CD" : "transparent",
                      }}
                    >
                      <td style={{ padding: "4px 8px", fontWeight: 700 }}>Kab. Ende</td>
                      <td style={{ padding: "4px 8px", textAlign: "right" }}>{Math.round(dyn.periodSupply * 0.051).toLocaleString("id-ID")} Ton</td>
                      <td style={{ padding: "4px 8px", textAlign: "right" }}>
                        <span style={{ color: "#D39E00", fontWeight: 700, background: "#FFF3CD", padding: "1px 4px", borderRadius: 2 }}>WATCHLIST</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
