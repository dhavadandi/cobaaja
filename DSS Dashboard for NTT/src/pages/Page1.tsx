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

  const isHist = selectedMonth.startsWith("hist-");
  const getDynamicSupplyData = () => {
    let year = 2026;
    let weight = 1.0;
    let isSpecificMonth = false;
    let selectedMonthObj = MONTHS_36.find((m) => m.key === selectedMonth);

    if (isHist) {
      year = parseInt(selectedMonth.replace("hist-", ""));
    } else if (selectedMonth.startsWith("yr-")) {
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
      isHist,
      selectedMonthObj,
      periodSupply,
      annualTotal,
    };
  };

  const dyn = getDynamicSupplyData();

  // Dynamic KPI Card 2
  const getKPICard2Data = () => {
    if (selectedRegency === "malaka" || selectedRegency === "all") {
      const shareVal = dyn.year === 2021 ? 0.30 : dyn.year === 2022 ? 0.35 : dyn.year === 2023 ? 0.48 : 0.5046;
      const malakaSupply = Math.round(dyn.periodSupply * shareVal);
      return {
        title: selectedRegency === "all" ? "PASOKAN SENTRA MALAKA" : "PASOKAN KABUPATEN MALAKA",
        metric: `${malakaSupply.toLocaleString("id-ID")} Ton`,
        subtext: `${(shareVal * 100).toFixed(2)}% Pangsa Pasokan NTT`,
        color: "#198754",
        badge: dyn.isHist ? `HISTORIS ${dyn.year}` : "PRIMARY BUFFER",
      };
    }
    if (selectedRegency === "sikka") {
      const shareVal = dyn.year === 2021 ? 0.20 : dyn.year === 2022 ? 0.15 : 0.022;
      const sikkaSupply = Math.round(dyn.periodSupply * shareVal);
      return {
        title: "PASOKAN KABUPATEN SIKKA",
        metric: `${sikkaSupply.toLocaleString("id-ID")} Ton`,
        subtext: `${(shareVal * 100).toFixed(2)}% Pangsa Pasokan`,
        color: dyn.year <= 2021 ? "#198754" : dyn.year === 2022 ? "#D39E00" : "#DC3545",
        badge: dyn.year <= 2021 ? "SEHAT 2021" : dyn.year === 2022 ? "AWAL BDB" : "CRITICAL BDB",
      };
    }
    if (selectedRegency === "matim") {
      const shareVal = dyn.year === 2021 ? 0.15 : dyn.year === 2022 ? 0.12 : 0.0286;
      const matimSupply = Math.round(dyn.periodSupply * shareVal);
      return {
        title: "PASOKAN MANGGARAI TIMUR",
        metric: `${matimSupply.toLocaleString("id-ID")} Ton`,
        subtext: `${(shareVal * 100).toFixed(2)}% Pangsa Pasokan`,
        color: dyn.year <= 2021 ? "#198754" : dyn.year === 2022 ? "#D39E00" : "#DC3545",
        badge: dyn.year <= 2021 ? "SEHAT 2021" : dyn.year === 2022 ? "AWAL BDB" : "CRITICAL BDB",
      };
    }
    if (selectedRegency === "ngada") {
      const shareVal = dyn.year === 2021 ? 0.10 : dyn.year === 2022 ? 0.10 : 0.0399;
      const ngadaSupply = Math.round(dyn.periodSupply * shareVal);
      return {
        title: "PASOKAN KABUPATEN NGADA",
        metric: `${ngadaSupply.toLocaleString("id-ID")} Ton`,
        subtext: `${(shareVal * 100).toFixed(2)}% Pangsa Pasokan`,
        color: "#D39E00",
        badge: "RISIKO BDB",
      };
    }
    if (selectedRegency === "ende") {
      const shareVal = dyn.year === 2021 ? 0.10 : dyn.year === 2022 ? 0.10 : 0.051;
      const endeSupply = Math.round(dyn.periodSupply * shareVal);
      return {
        title: "PASOKAN KABUPATEN ENDE",
        metric: `${endeSupply.toLocaleString("id-ID")} Ton`,
        subtext: `${(shareVal * 100).toFixed(2)}% Pangsa (Beranga Kelimutu)`,
        color: "#D39E00",
        badge: "WATCHLIST",
      };
    }

    return {
      title: `PASOKAN ${currentRegObj ? currentRegObj.name.toUpperCase() : ""}`,
      metric: dyn.isHist ? `${Math.round(dyn.periodSupply * 0.05).toLocaleString("id-ID")} Ton` : "N/A",
      subtext: dyn.isHist ? `Data Aktual BPS Tahun ${dyn.year}` : "Luar 5 Sentra Penelitian",
      color: dyn.isHist ? "#0D6EFD" : "#6C757D",
      badge: dyn.isHist ? "BPS AKTUAL" : "DATA N/A",
    };
  };

  const card2 = getKPICard2Data();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: "#F8FAFC" }}>
      {/* Main Content Area */}
      <div style={{ flex: 1, minHeight: 0, padding: 12, display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        {/* KPI Strip */}
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <KPICard
            title={`TOTAL PASOKAN AGREGAT NTT (${dyn.isHist ? `TAHUN HISTORIS ${dyn.year}` : dyn.isSpecificMonth ? dyn.selectedMonthObj?.key : `TAHUN ${dyn.year}`})`}
            metric={`${dyn.periodSupply.toLocaleString("id-ID")} Ton`}
            subtext={
              dyn.isHist
                ? `Catatan BPS ${dyn.year}`
                : dyn.isSpecificMonth
                ? `BMKG ${Math.round(dyn.weight * 100 * 10) / 10}% (${dyn.selectedMonthObj?.ewsAlert ? "ALERT EWS" : "PANEN"})`
                : `Baseline ${dyn.year}`
            }
            badgeColor={dyn.isHist ? "#0F2C59" : dyn.selectedMonthObj?.ewsAlert ? "#DC3545" : "#0D6EFD"}
            badgeLabel={dyn.isHist ? "HISTORIS BPS" : dyn.selectedMonthObj?.ewsAlert ? "EWS KEMARAU" : "DUAL-FORECAST"}
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
            metric={dyn.year <= 2021 ? "0.00%" : isNonTarget && !dyn.isHist ? "N/A" : "-78,68%"}
            subtext={dyn.year <= 2021 ? "Pra-Wabah BDB" : isNonTarget && !dyn.isHist ? "Luar Sentra" : "Sikka (-84%), Matim (-78%)"}
            badgeColor={dyn.year <= 2021 ? "#198754" : isNonTarget && !dyn.isHist ? "#6C757D" : "#DC3545"}
            badgeLabel={dyn.year <= 2021 ? "STABIL 2021" : isNonTarget && !dyn.isHist ? "DATA N/A" : "CRITICAL BDB"}
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

          {/* AI Executive Briefing Container */}
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
            <div style={{ background: "#F8FAFC", borderLeft: "3px solid #0F2C59", padding: "8px 10px", borderRadius: "0 4px 4px 0", fontSize: 11 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: "#0F2C59", textTransform: "uppercase", fontFamily: "'Space Mono', monospace, sans-serif" }}>
                TEMUAN UTAMA SPASIAL &amp; HISTORIS:
              </div>
              <div style={{ marginTop: 3, lineHeight: 1.45 }}>
                {dyn.isHist ? (
                  <b>[Data Historis {dyn.year}]: Total Pasokan NTT sebesar {dyn.periodSupply.toLocaleString("id-ID")} Ton. Model peramalan 2026–2028 dibangun berbasis data panel historis 15 tahun (2010–2024).</b>
                ) : (
                  <b>Model proyeksi 2026–2028 didasarkan pada Data Panel Historis 15 Tahun (2010–2024). Kabupaten Malaka menyumbang 50,46% pasokan pisang NTT ({Math.round(dyn.periodSupply * 0.5046).toLocaleString("id-ID")} Ton), sementara Pulau Flores mengalami kejatuhan produksi akibat wabah BDB (Ralstonia syzygii).</b>
                )}
              </div>
            </div>

            {/* Dampak Ekonomi & Sosial Box */}
            <div style={{ background: "#FFF0F0", borderLeft: "3px solid #E62129", padding: "8px 10px", borderRadius: "0 4px 4px 0", fontSize: 11 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: "#E62129", textTransform: "uppercase", fontFamily: "'Space Mono', monospace, sans-serif" }}>
                DAMPAK EKONOMI &amp; SOSIAL:
              </div>
              <div style={{ marginTop: 3, lineHeight: 1.45, color: "#991B1B" }}>
                Wabah BDB memangkas pendapatan petani pisang Flores hingga 65% (Nampa et al., 2025). Kenaikan biaya bahan baku UMKM pengolahan khas (Muku Loto, Manggulu, Ka'pu Pantunnu) mencapai 50%–200%. Pisang menyumbang 70% inflasi hortikultura NTT (Bria, 2024).
              </div>
            </div>

            {/* Rekomendasi TPID Box */}
            <div style={{ background: "#EBF3FE", borderLeft: "3px solid #0D6EFD", padding: "8px 10px", borderRadius: "0 4px 4px 0", fontSize: 11 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: "#0D6EFD", textTransform: "uppercase", fontFamily: "'Space Mono', monospace, sans-serif" }}>
                REKOMENDASI KERANGKA 4K TPID:
              </div>
              <div style={{ marginTop: 3, lineHeight: 1.45 }}>
                <b>Ketersediaan Pasokan:</b> Amankan Malaka &amp; salurkan bibit kultur jaringan <i>Pisang Beranga Kelimutu Ende</i> (Kepmentan 304/2006).<br />
                <b>Kelancaran Distribusi:</b> Checkpoint Biosekuriti Darat Trans-Flores (Sikka-Ende &amp; Matim-Ngada).<br />
                <b>Komunikasi Efektif:</b> Edukasi Instruksi Bupati Ngada No. 1/2023 (eradikasi kebun &amp; desinfeksi parang panen 10%).
              </div>
            </div>

            {/* Leaderboard Pasokan 5 Sentra Utama Table */}
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
