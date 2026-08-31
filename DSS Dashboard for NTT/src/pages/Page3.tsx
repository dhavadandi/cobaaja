import { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Page3() {
  const [activeTab, setActiveTab] = useState<"monthly36" | "yearly">("monthly36");

  // Monthly 36-Month Wave Dataset
  const monthlyLabels = [
    "Jan 26", "Feb 26", "Mar 26", "Apr 26", "Mei 26", "Jun 26", "Jul 26", "Agu 26", "Sep 26", "Okt 26", "Nov 26", "Des 26",
    "Jan 27", "Feb 27", "Mar 27", "Apr 27", "Mei 27", "Jun 27", "Jul 27", "Agu 27", "Sep 27", "Okt 27", "Nov 27", "Des 27",
    "Jan 28", "Feb 28", "Mar 28", "Apr 28", "Mei 28", "Jun 28", "Jul 28", "Agu 28", "Sep 28", "Okt 28", "Nov 28", "Des 28",
  ];

  const monthlySupplyData = [
    15246, 15682, 16262, 13794, 11906, 9874, 9002, 9293, 10454, 11326, 13939, 15682,
    15960, 16416, 17024, 14440, 12464, 10336, 9424, 9728, 10944, 11856, 14592, 16416,
    16853, 17334, 17976, 15248, 13161, 10914, 9951, 10272, 11556, 12519, 15408, 17334,
  ];

  const monthlyChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Pasokan Musiman BMKG (36 Bulan)",
        data: monthlySupplyData,
        borderColor: "#0D6EFD",
        backgroundColor: "rgba(13,110,253,0.08)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "#0D6EFD",
      },
    ],
  };

  // 8-Year Structural Break Continuous Trend Dataset (2021-2028)
  const yearlyChartData = {
    labels: ["2021 (BPS)", "2022 (BPS)", "2023 (Puncak BDB)", "2024 (BPS)", "2025 (Baseline T0)", "2026 (T1)", "2027 (T2)", "2028 (T3)"],
    datasets: [
      {
        label: "Historis Aktual BPS (2021–2025)",
        data: [180000, 165000, 140000, 145200, 145200, null, null, null],
        borderColor: "#0F2C59",
        backgroundColor: "rgba(15,44,89,0.1)",
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#0F2C59",
        fill: true,
      },
      {
        label: "Proyeksi Baseline (2025–2028)",
        data: [null, null, null, null, 145200, 145200, 152000, 160500],
        borderColor: "#0D6EFD",
        borderDash: [5, 5],
        borderWidth: 2.5,
        pointRadius: 4,
      },
      {
        label: "Skenario Pembiaran BDB",
        data: [null, null, null, null, 145200, 125000, 115000, 108000],
        borderColor: "#DC3545",
        borderDash: [3, 3],
        borderWidth: 2.5,
        pointRadius: 4,
      },
      {
        label: "Skenario Intervensi Biosekuriti 4K",
        data: [null, null, null, null, 145200, 165000, 188000, 211860],
        borderColor: "#198754",
        borderWidth: 3,
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: { family: "'Space Mono', monospace", size: 11 },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: activeTab === "monthly36" ? 8000 : 90000,
        ticks: {
          callback: function (val: number | string) {
            return (Number(val) / 1000).toFixed(0) + "k Ton";
          },
        },
      },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: "#F8FAFC" }}>
      {/* Sub-Header Toolbar */}
      <div
        style={{
          padding: "8px 16px",
          borderBottom: "1px solid #CBD5E1",
          background: "#FFFFFF",
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0F2C59", fontFamily: "'Space Mono', monospace, sans-serif" }}>
          PEMODELAN DUAL-FORECASTING 36 BULAN &amp; TREN HISTORIS 8 TAHUN (2021–2028)
        </div>

        {/* Tab Buttons (No Emojis) */}
        <div style={{ display: "flex", background: "#F1F5F9", padding: 3, borderRadius: 6, gap: 4, border: "1px solid #E2E8F0" }}>
          <button
            onClick={() => setActiveTab("monthly36")}
            style={{
              background: activeTab === "monthly36" ? "#0F2C59" : "transparent",
              color: activeTab === "monthly36" ? "#FFFFFF" : "#64748B",
              border: "none",
              borderRadius: 4,
              padding: "6px 14px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace, sans-serif",
            }}
          >
            Grafik Gelombang 36 Bulan BMKG
          </button>
          <button
            onClick={() => setActiveTab("yearly")}
            style={{
              background: activeTab === "yearly" ? "#0F2C59" : "transparent",
              color: activeTab === "yearly" ? "#FFFFFF" : "#64748B",
              border: "none",
              borderRadius: 4,
              padding: "6px 14px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace, sans-serif",
            }}
          >
            Tren Structural Break 8 Tahun (2021–2028)
          </button>
        </div>
      </div>

      {/* Main Chart Card */}
      <div style={{ flex: 1, padding: 12, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: 6, padding: 14, flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2C59", marginBottom: 4, fontFamily: "'Space Mono', monospace, sans-serif" }}>
            {activeTab === "monthly36"
              ? "GRAFIK GELOMBANG DUAL-FORECASTING DISAGREGASI TEMPORAL 36 BULAN"
              : "PERBANDINGAN GRAFIK TREN STRUCTURAL BREAK 8 TAHUN (2021–2028)"}
          </div>
          <div style={{ fontSize: 10, color: "#64748B", marginBottom: 12 }}>
            {activeTab === "monthly36"
              ? "Model Chow-Lin Berbasis Indeks Curah Hujan BMKG (w_m). Puncak Panen (Maret 11,2%), EWS Kemarau (Juni-Agustus 6,4%)."
              : "Tren Historis BPS (2021–2025) Bersambung ke Proyeksi Dual-Forecasting Pembiaran BDB vs Intervensi Biosekuriti (2026–2028)."}
          </div>

          <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
            <Line data={activeTab === "monthly36" ? monthlyChartData : yearlyChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
