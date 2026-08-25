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
        borderRadius: 4,
        padding: "14px 16px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 600, color: "#6C757D", letterSpacing: "0.06em", marginBottom: 6, textTransform: "uppercase" }}>
        {title}
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: metric === "N/A" ? "#6C757D" : "#212529",
          fontFamily: "'Source Serif 4', Georgia, serif",
          lineHeight: 1.1,
          marginBottom: 6,
        }}
      >
        {metric}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span
          style={{
            background: badgeColor + "18",
            border: `1px solid ${badgeColor}40`,
            color: badgeColor,
            fontSize: 10,
            fontWeight: 700,
            padding: "2px 6px",
            borderRadius: 2,
          }}
        >
          {badgeLabel}
        </span>
        <span style={{ fontSize: 10.5, color: "#6C757D" }}>{subtext}</span>
      </div>
    </div>
  );
}

export default function Page1() {
  const { selectedRegency, selectedMonth } = useDashboard();

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

  // Dynamic KPI Card 1 (Agregat NTT) and Card 2 (Wilayah Terpilih - Option A)
  const getKPICard2Data = () => {
    if (selectedRegency === "malaka" || selectedRegency === "all") {
      const malakaSupply = Math.round(dyn.periodSupply * 0.5046);
      return {
        title: selectedRegency === "all" ? "PASOKAN SENTRA UTAMA (MALAKA)" : "PASOKAN KABUPATEN MALAKA",
        metric: `${malakaSupply.toLocaleString("id-ID")} Ton`,
        subtext: "50,46% Pangsa Pasokan Total NTT",
        color: "#198754",
        badge: "PRIMARY BUFFER",
      };
    }
    if (selectedRegency === "sikka") {
      const sikkaSupply = Math.round(dyn.periodSupply * 0.022);
      return {
        title: "PASOKAN KABUPATEN SIKKA",
        metric: `${sikkaSupply.toLocaleString("id-ID")} Ton`,
        subtext: "2,20% Pangsa (Anjlok -84,71% YoY)",
        color: "#DC3545",
        badge: "CRITICAL BDB",
      };
    }
    if (selectedRegency === "matim") {
      const matimSupply = Math.round(dyn.periodSupply * 0.0286);
      return {
        title: "PASOKAN MANGGARAI TIMUR",
        metric: `${matimSupply.toLocaleString("id-ID")} Ton`,
        subtext: "2,86% Pangsa (Anjlok -78,68% YoY)",
        color: "#DC3545",
        badge: "CRITICAL BDB",
      };
    }
    if (selectedRegency === "ngada") {
      const ngadaSupply = Math.round(dyn.periodSupply * 0.0399);
      return {
        title: "PASOKAN KABUPATEN NGADA",
        metric: `${ngadaSupply.toLocaleString("id-ID")} Ton`,
        subtext: "3,99% Pangsa (Risiko Tinggi BDB)",
        color: "#FFC107",
        badge: "ERADIKASI",
      };
    }
    if (selectedRegency === "ende") {
      const endeSupply = Math.round(dyn.periodSupply * 0.051);
      return {
        title: "PASOKAN KABUPATEN ENDE",
        metric: `${endeSupply.toLocaleString("id-ID")} Ton`,
        subtext: "5,10% Pangsa (Pisang Beranga Kelimutu)",
        color: "#FFC107",
        badge: "WATCHLIST",
      };
    }

    return {
      title: `PASOKAN ${currentRegObj ? currentRegObj.name.toUpperCase() : ""}`,
      metric: "N/A",
      subtext: "Wilayah Luar Fokus 5 Sentra Utama",
      color: "#6C757D",
      badge: "DATA N/A",
    };
  };

  const card2 = getKPICard2Data();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid #DEE2E6", background: "#FFFFFF", flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, color: "#0F2C59" }}>
          Ringkasan Eksekutif &amp; Command Center Stabilitas Pasokan Pisang NTT
        </h2>
        <div style={{ fontSize: 11, color: "#6C757D", marginTop: 2 }}>
          Filter Wilayah: <b style={{ color: "#0F2C59" }}>{selectedRegency === "all" ? "Seluruh 22 Kabupaten/Kota" : currentRegObj?.name}</b> · Horison Peramalan:{" "}
          <b style={{ color: "#0D6EFD" }}>
            {selectedMonth === "all"
              ? "Seluruh 36 Bulan (2026–2028)"
              : selectedMonth.startsWith("yr-")
              ? `Tahun ${selectedMonth.replace("yr-", "")}`
              : dyn.selectedMonthObj?.label}
          </b>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
        {/* KPI Strip */}
        <div style={{ display: "flex", gap: 12 }}>
          <KPICard
            title={`TOTAL PASOKAN AGREGAT NTT (${dyn.isSpecificMonth ? dyn.selectedMonthObj?.key : `TAHUN ${dyn.year}`})`}
            metric={`${dyn.periodSupply.toLocaleString("id-ID")} Ton`}
            subtext={
              dyn.isSpecificMonth
                ? `Bobot BMKG ${Math.round(dyn.weight * 100 * 10) / 10}% (${dyn.selectedMonthObj?.ewsAlert ? "ALERT EWS KEMARAU" : "PANEN BASAH"})`
                : `Proyeksi Baseline Structural Break ${dyn.year}`
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
            title="SYOK PENURUNAN SENTRA FLORES"
            metric={isNonTarget ? "N/A" : "-78,68%"}
            subtext={isNonTarget ? "Fokus 4 Sentra Flores" : "Sikka (-84,71%), Matim (-78,68%), Ngada (-21,86%)"}
            badgeColor={isNonTarget ? "#6C757D" : "#DC3545"}
            badgeLabel={isNonTarget ? "DATA N/A" : "CRITICAL BDB"}
          />
          <KPICard
            title="PDRB SEKTOR PERTANIAN"
            metric="Rp 9,78 T"
            subtext="28,50% Kontribusi PDRB - Bank Indonesia Q1-2025"
            badgeColor="#0D6EFD"
            badgeLabel="MACRO IMPACT"
          />
        </div>

        {/* Hero Section Split: Map (60%) & AI Briefing (40%) */}
        <div style={{ display: "flex", gap: 14, flex: 1, minHeight: 380 }}>
          {/* Map Container */}
          <div
            style={{
              flex: "0 0 60%",
              background: "#FFFFFF",
              border: "1px solid #DEE2E6",
              borderRadius: 4,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2C59", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>PETA SPASIAL CHOROPLETH KONSENTRASI PASOKAN &amp; WABAH BDB (22 KAB/KOTA)</span>
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
              border: "1px solid #DEE2E6",
              borderRadius: 4,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid #E62129", paddingBottom: 8, marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0F2C59" }}>
                RINGKASAN EKSEKUTIF PENELITIAN &amp; TPID BI
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 12, lineHeight: 1.5, color: "#212529" }}>
              <div style={{ background: "#F8F9FA", borderLeft: "3px solid #0F2C59", padding: "8px 12px", borderRadius: "0 4px 4px 0" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#0F2C59", textTransform: "uppercase" }}>TEMUAN UTAMA SPASIAL &amp; BMKG:</div>
                <div style={{ marginTop: 2 }}>
                  {dyn.isSpecificMonth && (
                    <div style={{ color: dyn.selectedMonthObj?.ewsAlert ? "#DC3545" : "#0D6EFD", fontWeight: 700, marginBottom: 4 }}>
                      [{dyn.selectedMonthObj?.label}]: Pasokan Agregat NTT {dyn.periodSupply.toLocaleString("id-ID")} Ton (Sentra Malaka: {Math.round(dyn.periodSupply * 0.5046).toLocaleString("id-ID")} Ton).
                    </div>
                  )}
                  {selectedRegency === "malaka" ? (
                    <b>Kabupaten Malaka menjadi penyangga utama dengan proyeksi pasokan periode ini sebesar {Math.round(dyn.periodSupply * 0.5046).toLocaleString("id-ID")} Ton (50,46% pasokan total NTT).</b>
                  ) : selectedRegency === "sikka" ? (
                    <b style={{ color: "#DC3545" }}>Kabupaten Sikka mengalami penurunan produksi drastis -84,71% ({Math.round(dyn.periodSupply * 0.022).toLocaleString("id-ID")} Ton periode ini) akibat wabah BDB.</b>
                  ) : isNonTarget ? (
                    <b style={{ color: "#6C757D" }}>Wilayah {currentRegObj.name} berada di luar 5 sentra utama fokus penelitian data panel (Status: N/A).</b>
                  ) : (
                    <b>Kabupaten Malaka menyumbang 50,46% pasokan pisang NTT ({Math.round(dyn.periodSupply * 0.5046).toLocaleString("id-ID")} Ton), sementara sentra utama Pulau Flores mengalami penurunan akibat wabah BDB (*Ralstonia syzygii*).</b>
                  )}
                </div>
              </div>

              <div style={{ background: "#FFF0F0", borderLeft: "3px solid #DC3545", padding: "8px 12px", borderRadius: "0 4px 4px 0" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#DC3545", textTransform: "uppercase" }}>DAMPAK EKONOMI &amp; SOSIAL:</div>
                <div style={{ marginTop: 2 }}>
                  Wabah BDB memangkas pendapatan petani pisang Flores hingga 65% (Nampa et al., 2025). Kenaikan biaya bahan baku UMKM pengolahan khas (*Muku Loto, Manggulu, Ka'pu Pantunnu*) mencapai 50%–200%. Pisang menyumbang 70% inflasi hortikultura NTT (Bria, 2024).
                </div>
              </div>

              <div style={{ background: "#EBF3FE", borderLeft: "3px solid #0D6EFD", padding: "8px 12px", borderRadius: "0 4px 4px 0" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#0D6EFD", textTransform: "uppercase" }}>REKOMENDASI KERANGKA 4K TPID:</div>
                <ul style={{ margin: "4px 0 0 0", paddingLeft: 16 }}>
                  <li><b>Ketersediaan Pasokan:</b> Amankan Malaka &amp; salurkan bibit kultur jaringan <i>Pisang Beranga Kelimutu Ende</i> (Kepmentan 304/2006).</li>
                  <li><b>Kelancaran Distribusi:</b> Checkpoint Biosekuriti Darat Trans-Flores (Sikka-Ende &amp; Matim-Ngada).</li>
                  <li><b>Komunikasi Efektif:</b> Edukasi Instruksi Bupati Ngada No. 1/2023 (eradikasi kebun &amp; desinfeksi parang panen 10%).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
