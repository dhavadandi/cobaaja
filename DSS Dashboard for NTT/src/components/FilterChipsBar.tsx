import { useDashboard, ALL_REGENCIES, MONTHS_36 } from "../context/DashboardContext";

export default function FilterChipsBar() {
  const { selectedRegency, setSelectedRegency, selectedMonth, setSelectedMonth, resetFilters } = useDashboard();

  const isFiltered = selectedRegency !== "all" || selectedMonth !== "all";

  if (!isFiltered) return null;

  const currentRegObj = ALL_REGENCIES.find((r) => r.id === selectedRegency);
  const regLabel = currentRegObj ? currentRegObj.name : selectedRegency;

  let monthLabel = selectedMonth;
  if (selectedMonth.startsWith("yr-")) {
    monthLabel = `Tahun ${selectedMonth.replace("yr-", "")}`;
  } else if (selectedMonth !== "all") {
    const mObj = MONTHS_36.find((m) => m.key === selectedMonth);
    if (mObj) monthLabel = mObj.label;
  }

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
          {regLabel} {!currentRegObj?.target && "(N/A)"} ✕
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
          Periode: {monthLabel} ✕
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
