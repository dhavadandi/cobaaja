import { useDashboard } from "../context/DashboardContext";
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
          color: "#212529",
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
  const { selectedRegency, selectedMonth, viewMode } = useDashboard();

  // Dynamic values depending on selectedRegency
  const getRegencyMetrics = () => {
    if (selectedRegency === "malaka") {
      return {
        title1: "PASOKAN KABUPATEN MALAKA",
        metric1: "73.267 Ton",
        sub1: "Pangsa Spasial 50,46%",
        badge1Color: "#198754",
        badge1Label: "SENTRA UTAMA",
        title2: "PRODUKTIVITAS LAHAN MALAKA",
        metric2: "12,59 Ton/Ha",
        sub2: "Efisiensi Panen Tertinggi NTT",
        badge2Color: "#198754",
        badge2Label: "SECURE ZONE",
      };
    }
    if (selectedRegency === "sikka") {
      return {
        title1: "PASOKAN KABUPATEN SIKKA",
        metric1: "3.200 Ton",
        sub1: "Penurunan -84,71% YoY",
        badge1Color: "#DC3545",
        badge1Label: "CRITICAL BDB",
        title2: "PRODUKTIVITAS LAHAN SIKKA",
        metric2: "1,85 Ton/Ha",
        sub2: "68% Kebun Terinfeksi BDB",
        badge2Color: "#DC3545",
        badge2Label: "HIGH RISK",
      };
    }
    if (selectedRegency === "matim") {
      return {
        title1: "PASOKAN MANGGARAI TIMUR",
        metric1: "4.150 Ton",
        sub1: "Penurunan -78,68% YoY",
        badge1Color: "#DC3545",
        badge1Label: "CRITICAL BDB",
        title2: "PRODUKTIVITAS LAHAN MATIM",
        metric2: "1,98 Ton/Ha",
        sub2: "700 Ha Lahan Terancam BDB",
        badge2Color: "#DC3545",
        badge2Label: "OUTBREAK ZONE",
      };
    }
    return {
      title1: "TOTAL PASOKAN PISANG NTT 2025",
      metric1: selectedMonth !== "all" ? "12.100 Ton" : "145.200 Ton",
      sub1: "-42,59% YoY vs 2024 (243,8 rb Ton)",
      badge1Color: "#DC3545",
      badge1Label: "ALERT STATUS",
      title2: "PANGSA SENTRA MALAKA",
      metric2: "50,46%",
      sub2: "73.267 Ton Pasokan BPS 2025",
      badge2Color: "#198754",
      badge2Label: "SINGLE SENTRA RISK",
    };
  };

  const regMetrics = getRegencyMetrics();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid #DEE2E6", background: "#FFFFFF", flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, color: "#0F2C59" }}>
          Ringkasan Eksekutif &amp; Command Center Stabilitas Pasokan Pisang NTT
        </h2>
        <div style={{ fontSize: 11, color: "#6C757D", marginTop: 2 }}>
          Mode: <b style={{ color: "#E62129" }}>{viewMode === "executive" ? "Executive Summary View" : "Operational Technical View"}</b> · Filter: <b style={{ color: "#0F2C59" }}>{selectedRegency === "all" ? "Seluruh 22 Kabupaten/Kota" : selectedRegency.toUpperCase()}</b> · Periode: <b style={{ color: "#0D6EFD" }}>{selectedMonth === "all" ? "2025 - 2026" : selectedMonth.toUpperCase() + " 2026"}</b>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
        {/* KPI Strip */}
        <div style={{ display: "flex", gap: 12 }}>
          <KPICard
            title={regMetrics.title1}
            metric={regMetrics.metric1}
            subtext={regMetrics.sub1}
            badgeColor={regMetrics.badge1Color}
            badgeLabel={regMetrics.badge1Label}
          />
          <KPICard
            title={regMetrics.title2}
            metric={regMetrics.metric2}
            subtext={regMetrics.sub2}
            badgeColor={regMetrics.badge2Color}
            badgeLabel={regMetrics.badge2Label}
          />
          <KPICard
            title="SYOK PENURUNAN SENTRA FLORES"
            metric="-78,68%"
            subtext="Sikka (-84,71%), Matim (-78,68%), Ngada (-45,24%)"
            badgeColor="#DC3545"
            badgeLabel="CRITICAL BDB"
          />
          <KPICard
            title="PDRB SEKTOR PERTANIAN"
            metric="Rp 9,78 T"
            subtext="28,50% Kontribusi PDRB - LPP BI Q1-2025"
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
              <span>PETA SPASIAL KONSENTRASI PASOKAN &amp; ZONA WABAH BDB (22 KAB/KOTA)</span>
              <span style={{ fontSize: 10, color: "#6C757D" }}>GeoJSON Boundaries Official Pemprov NTT</span>
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
                AI EXECUTIVE BRIEFING ENGINE — TPID BI
              </div>
              <span style={{ background: "#E8F5E9", color: "#198754", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 2 }}>
                VERIFIED 98.4%
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 12, lineHeight: 1.5, color: "#212529" }}>
              <div style={{ background: "#F8F9FA", borderLeft: "3px solid #0F2C59", padding: "8px 12px", borderRadius: "0 4px 4px 0" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#0F2C59", textTransform: "uppercase" }}>TEMUAN UTAMA (KEY FINDING):</div>
                <div style={{ marginTop: 2 }}>
                  {selectedRegency === "malaka" ? (
                    <b>Kabupaten Malaka menjadi penyangga pasokan utama NTT dengan produksi 73.267 Ton (50,46% pasokan total). Produktivitas mencapai 12,59 Ton/Ha.</b>
                  ) : selectedRegency === "sikka" ? (
                    <b style={{ color: "#DC3545" }}>Kabupaten Sikka mengalami kejatuhan produksi drastis sebesar -84,71% (3.200 Ton) akibat wabah BDB yang menginfeksi 68% lahan kebun.</b>
                  ) : (
                    <b>Kabupaten Malaka menyumbang 50,46% total pasokan pisang NTT, sementara sentra utama Pulau Flores mengalami kejatuhan produksi parah akibat wabah BDB.</b>
                  )}
                </div>
              </div>

              <div style={{ background: "#FFF0F0", borderLeft: "3px solid #DC3545", padding: "8px 12px", borderRadius: "0 4px 4px 0" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#DC3545", textTransform: "uppercase" }}>DAMPAK EKONOMI (ECONOMIC IMPACT):</div>
                <div style={{ marginTop: 2 }}>
                  Serangan BDB memangkas pendapatan petani di Flores hingga 65% (Nampa dkk., 2025) dan mendorong lonjakan harga eceran hingga Rp 20.000/Kg (Penyumbang 70% Inflasi Hortikultura NTT).
                </div>
              </div>

              <div style={{ background: "#EBF3FE", borderLeft: "3px solid #0D6EFD", padding: "8px 12px", borderRadius: "0 4px 4px 0" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#0D6EFD", textTransform: "uppercase" }}>REKOMENDASI AKSI KEBIDAKAN (TPID BI &amp; PEMDA):</div>
                <ul style={{ margin: "4px 0 0 0", paddingLeft: 16 }}>
                  <li><b>Ketersediaan Pasokan:</b> Pengamanan Sentra Malaka &amp; Penyaluran Bibit Kultur Jaringan Sehat Bebas BDB.</li>
                  <li><b>Kelancaran Distribusi:</b> Pembentukan Pos Karantina Biosekuriti Darat di Rute Trans-Flores.</li>
                  <li><b>Komunikasi Efektif:</b> Edukasi Sanitasi Parang Panen (Desinfeksi 10%) &amp; Pemotongan Jantung Pisang.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
