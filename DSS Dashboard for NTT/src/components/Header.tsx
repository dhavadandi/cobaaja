import { useDashboard } from "../context/DashboardContext";

export default function Header() {
  const { selectedRegency, setSelectedRegency, selectedMonth, setSelectedMonth, viewMode, setViewMode } = useDashboard();

  const handlePrint = () => {
    window.print();
  };

  return (
    <header
      style={{
        background: "#0F2C59",
        borderBottom: "3px solid #E62129",
        color: "#FFFFFF",
        padding: "0 20px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        zIndex: 100,
      }}
    >
      {/* Left: Brand Logo & Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <img
          src="/logo-ntt.png"
          alt="Pemprov NTT Logo"
          style={{ height: 38, width: "auto", objectFit: "contain" }}
          onError={(e) => {
            // Fallback if image fails
            (e.target as HTMLElement).style.display = "none";
          }}
        />
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1.2 }}>
            PORTAL DSS STABILITAS PASOKAN &amp; BIOSEKURITI PISANG NTT
          </div>
          <div style={{ fontSize: 10, opacity: 0.8, display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
            <span>Kerangka Kerja 4K TPID Bank Indonesia NTT</span>
            <span style={{ background: "#E62129", padding: "1px 6px", borderRadius: 2, fontWeight: 700, fontSize: 9 }}>
              BPS &amp; BI Q1-2025 VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* Right: Controllers */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Regency Selector */}
        <select
          value={selectedRegency}
          onChange={(e) => setSelectedRegency(e.target.value)}
          style={{
            background: "#1A3B6E",
            color: "#FFFFFF",
            border: "1px solid #2B4E85",
            borderRadius: 4,
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="all">Seluruh 22 Kabupaten/Kota</option>
          <option value="malaka">Kabupaten Malaka (Sentra 50,46%)</option>
          <option value="kupang">Kabupaten Kupang (Penyangga)</option>
          <option value="sikka">Kabupaten Sikka (Kritis BDB -84%)</option>
          <option value="matim">Manggarai Timur (Kritis BDB -78%)</option>
          <option value="ngada">Kabupaten Ngada (Waspada BDB)</option>
          <option value="ende">Kabupaten Ende</option>
        </select>

        {/* Month Selector */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{
            background: "#1A3B6E",
            color: "#FFFFFF",
            border: "1px solid #2B4E85",
            borderRadius: 4,
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="all">Januari – Desember 2026</option>
          <option value="jan">Januari 2026</option>
          <option value="feb">Februari 2026</option>
          <option value="mar">Maret 2026 (Puncak Panen)</option>
          <option value="apr">April 2026</option>
          <option value="mei">Mei 2026</option>
          <option value="jun">Juni 2026 (Awal Kemarau)</option>
          <option value="jul">Juli 2026 (Puncak Kemarau)</option>
          <option value="agu">Agustus 2026 (Puncak Kemarau)</option>
          <option value="sep">September 2026</option>
          <option value="okt">Oktober 2026</option>
          <option value="nov">November 2026</option>
          <option value="des">Desember 2026</option>
        </select>

        {/* View Mode Toggle */}
        <div
          style={{
            display: "flex",
            background: "#1A3B6E",
            borderRadius: 4,
            padding: 2,
            border: "1px solid #2B4E85",
          }}
        >
          <button
            onClick={() => setViewMode("executive")}
            style={{
              background: viewMode === "executive" ? "#E62129" : "transparent",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 3,
              padding: "4px 10px",
              fontSize: 11,
              fontWeight: viewMode === "executive" ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Executive View
          </button>
          <button
            onClick={() => setViewMode("operational")}
            style={{
              background: viewMode === "operational" ? "#E62129" : "transparent",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 3,
              padding: "4px 10px",
              fontSize: 11,
              fontWeight: viewMode === "operational" ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Operational View
          </button>
        </div>

        {/* Download PDF Report Button */}
        <button
          onClick={handlePrint}
          style={{
            background: "#E62129",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 4,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(230,33,41,0.3)",
          }}
        >
          Download Report PDF
        </button>
      </div>
    </header>
  );
}
