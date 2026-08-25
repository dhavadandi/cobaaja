import { useDashboard } from "../context/DashboardContext";

export default function FilterChipsBar() {
  const { selectedRegency, setSelectedRegency, selectedMonth, setSelectedMonth, viewMode, setViewMode, resetFilters } = useDashboard();

  const regencyNames: Record<string, string> = {
    all: "Seluruh 22 Kab/Kota",
    malaka: "Kab. Malaka",
    kupang: "Kab. Kupang",
    sikka: "Kab. Sikka",
    matim: "Manggarai Timur",
    ngada: "Kab. Ngada",
    ende: "Kab. Ende",
  };

  const isFiltered = selectedRegency !== "all" || selectedMonth !== "all" || viewMode !== "executive";

  if (!isFiltered) return null;

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #DEE2E6",
        padding: "6px 20px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 11,
        flexShrink: 0,
      }}
    >
      <span style={{ fontWeight: 700, color: "#0F2C59", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        Filter Aktif:
      </span>

      {selectedRegency !== "all" && (
        <span
          style={{
            background: "#FFF0F0",
            border: "1px solid #E6212940",
            color: "#E62129",
            padding: "2px 8px",
            borderRadius: 12,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
          }}
          onClick={() => setSelectedRegency("all")}
          title="Klik untuk menghapus filter kabupaten"
        >
          {regencyNames[selectedRegency] || selectedRegency} ✕
        </span>
      )}

      {selectedMonth !== "all" && (
        <span
          style={{
            background: "#EBF3FE",
            border: "1px solid #0D6EFD40",
            color: "#0D6EFD",
            padding: "2px 8px",
            borderRadius: 12,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
          }}
          onClick={() => setSelectedMonth("all")}
          title="Klik untuk menghapus filter bulan"
        >
          Bulan: {selectedMonth.toUpperCase()} 2026 ✕
        </span>
      )}

      {viewMode !== "executive" && (
        <span
          style={{
            background: "#E8F5E9",
            border: "1px solid #19875440",
            color: "#198754",
            padding: "2px 8px",
            borderRadius: 12,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
          }}
          onClick={() => setViewMode("executive")}
          title="Klik untuk kembali ke Executive View"
        >
          Mode: Operational View ✕
        </span>
      )}

      <button
        onClick={resetFilters}
        style={{
          marginLeft: "auto",
          background: "transparent",
          border: "none",
          color: "#6C757D",
          fontSize: 11,
          fontWeight: 600,
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        Reset Seluruh Filter
      </button>
    </div>
  );
}
