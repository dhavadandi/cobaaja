import { useDashboard, ALL_REGENCIES, MONTHS_36 } from "../context/DashboardContext";

export default function Header() {
  const { selectedRegency, setSelectedRegency, selectedMonth, setSelectedMonth } = useDashboard();

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
      {/* Left: Brand Logo & Clean Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <img
          src="/logo-ntt.png"
          alt="Pemprov NTT Logo"
          style={{ height: 38, width: "auto", objectFit: "contain" }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1.2 }}>
            PORTAL DSS STABILITAS PASOKAN &amp; BIOSEKURITI PISANG NTT
          </div>
        </div>
      </div>

      {/* Right: Controllers */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Regency Selector (22 Regencies) */}
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
            maxWidth: 220,
          }}
        >
          {ALL_REGENCIES.map((r) => (
            <option key={r.id} value={r.id}>
              {r.target ? `● ${r.name}` : r.id === "all" ? r.name : `${r.name} (N/A)`}
            </option>
          ))}
        </select>

        {/* 36-Month Period Selector */}
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
            maxWidth: 260,
          }}
        >
          <option value="all">Seluruh 36 Bulan (2026–2028)</option>

          <optgroup label="── AKUMULASI TAHUNAN ──">
            <option value="yr-2026">Total Tahun 2026 (145.200 Ton)</option>
            <option value="yr-2027">Total Tahun 2027 Proyeksi (152.000 Ton)</option>
            <option value="yr-2028">Total Tahun 2028 Proyeksi (160.500 Ton)</option>
          </optgroup>

          <optgroup label="── TAHUN 2026 (12 BULAN) ──">
            {MONTHS_36.filter((m) => m.year === 2026).map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </optgroup>

          <optgroup label="── TAHUN 2027 (12 BULAN) ──">
            {MONTHS_36.filter((m) => m.year === 2027).map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </optgroup>

          <optgroup label="── TAHUN 2028 (12 BULAN) ──">
            {MONTHS_36.filter((m) => m.year === 2028).map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </optgroup>
        </select>

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
