import { useDashboard } from "../context/DashboardContext";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

export default function Page4() {
  const { interventionSettings, setInterventionSettings, showToast } = useDashboard();
  const { seedCoverage, sanitationCoverage, quarantineEff } = interventionSettings;

  // Real-time calculation logic
  const baseProduction = 145200;
  const maxRecovery = 211860;
  const neglectScenario = 108000;

  const interventionScore = (seedCoverage * 0.45 + sanitationCoverage * 0.30 + quarantineEff * 0.25) / 100;
  const projectedProduction = Math.round(neglectScenario + (maxRecovery - neglectScenario) * interventionScore);
  const savedVsNeglect = projectedProduction - neglectScenario;
  const fulfillmentRate = Math.min(99, Math.round(60 + interventionScore * 40));

  const planletNeeded = Math.round((seedCoverage / 100) * 450000);
  const budget = Math.round(((planletNeeded / 1000) * 7500000) / 1000000) / 10; // Rp Miliar
  const recoveryMonths = Math.round(18 - interventionScore * 6);

  const comparisonData = [
    { label: "BDB Neglect", value: neglectScenario, fill: "#DC3545" },
    { label: "Current Selected", value: projectedProduction, fill: "#E62129" },
    { label: "Full Biosecurity", value: maxRecovery, fill: "#198754" },
  ];

  const handleSliderChange = (field: keyof typeof interventionSettings, val: number) => {
    setInterventionSettings((prev) => ({ ...prev, [field]: val }));
    showToast(`Parameter Intervensi ${field} Diperbarui ke ${val}%`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid #DEE2E6", background: "#FFFFFF", flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, color: "#0F2C59" }}>
          Simulator Skenario Kebijakan &amp; Kalkulator Logistik Biosekuriti 2026–2028
        </h2>
        <div style={{ fontSize: 11, color: "#6C757D", marginTop: 1 }}>
          Interactive Policy Control Panel · Real-time Scenario Recalculation · LightGBM Impact Projection
        </div>
      </div>

      {/* Main Layout */}
      <div style={{ flex: 1, display: "flex", gap: 0, overflow: "hidden" }}>
        {/* LEFT — Sliders 30% */}
        <div
          style={{
            flex: "0 0 30%",
            borderRight: "1px solid #DEE2E6",
            background: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              padding: "10px 16px",
              borderBottom: "1px solid #DEE2E6",
              background: "#0F2C59",
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 700,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>PARAMETER INTERVENSI BIOSEKURITI</span>
            <span style={{ fontSize: 10, background: "#E62129", padding: "1px 6px", borderRadius: 2 }}>REAL-TIME</span>
          </div>

          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Slider 1 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: "#0F2C59" }}>Distrib. Bibit Kultur Jaringan:</span>
                <span style={{ fontWeight: 700, color: "#E62129" }}>{seedCoverage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={seedCoverage}
                onChange={(e) => handleSliderChange("seedCoverage", Number(e.target.value))}
                style={{ width: "100%", cursor: "pointer" }}
              />
              <div style={{ fontSize: 10, color: "#6C757D", marginTop: 4 }}>
                Target: Distrik Sikka, Manggarai Timur, &amp; Ngada
              </div>
            </div>

            {/* Slider 2 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: "#0F2C59" }}>Cakupan Sanitasi Kebun &amp; Parang:</span>
                <span style={{ fontWeight: 700, color: "#E62129" }}>{sanitationCoverage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sanitationCoverage}
                onChange={(e) => handleSliderChange("sanitationCoverage", Number(e.target.value))}
                style={{ width: "100%", cursor: "pointer" }}
              />
              <div style={{ fontSize: 10, color: "#6C757D", marginTop: 4 }}>
                Desinfeksi 10% Alkohol &amp; Potong Jantung Pisang
              </div>
            </div>

            {/* Slider 3 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: "#0F2C59" }}>Efektivitas Pos Karantina Trans-Flores:</span>
                <span style={{ fontWeight: 700, color: "#E62129" }}>{quarantineEff}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={quarantineEff}
                onChange={(e) => handleSliderChange("quarantineEff", Number(e.target.value))}
                style={{ width: "100%", cursor: "pointer" }}
              />
              <div style={{ fontSize: 10, color: "#6C757D", marginTop: 4 }}>
                Pos Karantina Darat Sikka-Ende &amp; Matim-Ngada
              </div>
            </div>

            <button
              onClick={() => showToast("Skenario Berhasil Diperhitungkan Kembali")}
              style={{
                marginTop: 10,
                background: "#E62129",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 4,
                padding: "10px",
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(230,33,41,0.25)",
              }}
            >
              RECALCULATE SCENARIO IMPACT
            </button>
          </div>
        </div>

        {/* MIDDLE — Live Chart (45%) */}
        <div style={{ flex: "0 0 45%", borderRight: "1px solid #DEE2E6", background: "#FFFFFF", padding: 16, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2C59", marginBottom: 12 }}>
            PROYEKSI PEMULIHAN PRODUKSI PISANG NTT (2028)
          </div>

          <div style={{ background: "#F8F9FA", border: "1px solid #DEE2E6", borderRadius: 4, padding: 12, marginBottom: 14, display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 10, color: "#6C757D" }}>PROYEKSI PRODUKSI 2028:</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#198754", fontFamily: "'Source Serif 4', serif" }}>
                {projectedProduction.toLocaleString("id-ID")} Ton
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#6C757D" }}>SAVED VS PEMBIARAN:</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#0D6EFD", fontFamily: "'Source Serif 4', serif" }}>
                +{savedVsNeglect.toLocaleString("id-ID")} Ton
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
                <XAxis dataKey="label" fontSize={11} stroke="#6C757D" />
                <YAxis fontSize={11} stroke="#6C757D" domain={[0, 240000]} />
                <Tooltip />
                <Bar dataKey="value" name="Produksi (Ton)" radius={[4, 4, 0, 0]}>
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT — Budget Calculator (25%) */}
        <div style={{ flex: "0 0 25%", background: "#FFFFFF", padding: 16, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2C59", borderBottom: "2px solid #0F2C59", paddingBottom: 4 }}>
            KALKULATOR RAB &amp; LOGISTIK PEMDA
          </div>

          <div style={{ background: "#F8F9FA", border: "1px solid #DEE2E6", borderRadius: 4, padding: 12 }}>
            <div style={{ fontSize: 10, color: "#6C757D" }}>KEBUTUHAN BIBIT KULTUR JARINGAN:</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0F2C59", marginTop: 2 }}>
              {planletNeeded.toLocaleString("id-ID")} Planlet
            </div>
          </div>

          <div style={{ background: "#F8F9FA", border: "1px solid #DEE2E6", borderRadius: 4, padding: 12 }}>
            <div style={{ fontSize: 10, color: "#6C757D" }}>ESTIMASI ANGGARAN (RAB):</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#E62129", marginTop: 2 }}>
              Rp {budget} Miliar
            </div>
            <div style={{ fontSize: 9, color: "#6C757D", marginTop: 2 }}>
              Alokasi APBD Pemda NTT &amp; Program BI
            </div>
          </div>

          <div style={{ background: "#F8F9FA", border: "1px solid #DEE2E6", borderRadius: 4, padding: 12 }}>
            <div style={{ fontSize: 10, color: "#6C757D" }}>ESTIMASI WAKTU PEMULIHAN:</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#198754", marginTop: 2 }}>
              {recoveryMonths} Bulan
            </div>
            <div style={{ fontSize: 9, color: "#6C757D", marginTop: 2 }}>
              Sampai Panen Perdana Bebas BDB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
