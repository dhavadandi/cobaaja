import { useDashboard } from "../context/DashboardContext";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

export default function Page3() {
  const { selectedMonth, selectedRegency } = useDashboard();

  const model1Data = [
    { year: "2015", historical: 210000, baseline: null, neglect: null, biosecurity: null },
    { year: "2018", historical: 228000, baseline: null, neglect: null, biosecurity: null },
    { year: "2021", historical: 235000, baseline: null, neglect: null, biosecurity: null },
    { year: "2024", historical: 243898, baseline: null, neglect: null, biosecurity: null },
    { year: "2025 (BDB)", historical: 140020, baseline: 140020, neglect: 140020, biosecurity: 140020 },
    { year: "2026", historical: null, baseline: 145200, neglect: 125000, biosecurity: 165000 },
    { year: "2027", historical: null, baseline: 152000, neglect: 115000, biosecurity: 188000 },
    { year: "2028", historical: null, baseline: 160500, neglect: 108000, biosecurity: 211860 },
  ];

  const model2MonthlyData = [
    { month: "Jan", supply: 14200, price: 15000, isDrought: false },
    { month: "Feb", supply: 15800, price: 15200, isDrought: false },
    { month: "Mar", supply: 18400, price: 14800, isDrought: false }, // Peak harvest
    { month: "Apr", supply: 16200, price: 15500, isDrought: false },
    { month: "Mei", supply: 12500, price: 16500, isDrought: false },
    { month: "Jun", supply: 8900, price: 18500, isDrought: true }, // Drought alert
    { month: "Jul", supply: 7200, price: 19800, isDrought: true }, // Peak drought alert
    { month: "Agu", supply: 7800, price: 20000, isDrought: true }, // Peak drought alert
    { month: "Sep", supply: 9400, price: 18000, isDrought: false },
    { month: "Okt", supply: 11200, price: 17000, isDrought: false },
    { month: "Nov", supply: 13100, price: 16000, isDrought: false },
    { month: "Des", supply: 15200, price: 15400, isDrought: false },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid #DEE2E6", background: "#FFFFFF", flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, color: "#0F2C59" }}>
          Pemodelan Dual-Forecasting Ekonometri &amp; EWS Musiman BMKG
        </h2>
        <div style={{ fontSize: 11, color: "#6C757D", marginTop: 2 }}>
          Regresi Tren Structural Break Dummy (Model 1) vs Disagregasi Chow-Lin BMKG (Model 2) · Filter: <b style={{ color: "#0D6EFD" }}>{selectedMonth === "all" ? "12 Bulan 2026" : selectedMonth.toUpperCase()}</b>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Model 1 Container */}
        <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderRadius: 4, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2C59" }}>
              MODEL 1: PROYEKSI TREN PRODUKSI TAHUNAN (2026–2028) PASCA-SYOK BDB
            </div>
            <span style={{ fontSize: 11, fontFamily: "serif", fontStyle: "italic", background: "#F8F9FA", padding: "2px 8px", borderRadius: 3, border: "1px solid #DEE2E6" }}>
              Y_t = β_0 + β_1·t + β_2·D_break + ε_t
            </span>
          </div>

          <div style={{ height: 220, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={model1Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
                <XAxis dataKey="year" stroke="#6C757D" fontSize={11} />
                <YAxis stroke="#6C757D" fontSize={11} domain={[80000, 260000]} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="historical" name="Historis BPS" stroke="#0F2C59" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="baseline" name="Baseline (160.500 Ton)" stroke="#0D6EFD" strokeWidth={2} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="neglect" name="Pembiaran BDB (108.000 Ton)" stroke="#DC3545" strokeWidth={2.5} />
                <Line type="monotone" dataKey="biosecurity" name="Intervensi Biosekuriti (211.860 Ton)" stroke="#198754" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Model 2 Container */}
        <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderRadius: 4, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2C59" }}>
              MODEL 2: DISAGREGASI BULANAN CHOW-LIN BMKG &amp; EARLY WARNING SYSTEM (2026)
            </div>
            <span style={{ background: "#FFF0F0", color: "#DC3545", border: "1px solid #DC354540", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 2 }}>
              EWS TRIGGER: JUNI–AGUSTUS (KEMARAU)
            </span>
          </div>

          <div style={{ height: 220, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={model2MonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
                <XAxis dataKey="month" stroke="#6C757D" fontSize={11} />
                <YAxis stroke="#6C757D" fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="supply" name="Pasokan Bulanan (Ton)" fill="#0F2C59" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ marginTop: 10, background: "#FFF0F0", border: "1px solid #DC354540", borderLeft: "4px solid #DC3545", padding: "8px 12px", borderRadius: 4, fontSize: 11, color: "#212529" }}>
            <b style={{ color: "#DC3545" }}>ALARM PERINGATAN DINI MUSIMAN (JUN-AUG):</b> Curah hujan BMKG di bawah 100 mm/bulan memicu penurunan produksi hingga 40% dan lonjakan harga Disperindag ke Rp 20.000/Kg.
          </div>
        </div>
      </div>
    </div>
  );
}
