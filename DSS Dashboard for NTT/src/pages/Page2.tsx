import { useDashboard } from "../context/DashboardContext";
import NTTMap from "../components/NTTMap";

export default function Page2() {
  const { selectedRegency, setSelectedRegency, viewMode } = useDashboard();

  const regencyList = [
    { rank: 1, name: "Kabupaten Malaka", production: "73.267 Ton", share: "50,46%", status: "Secure Buffer", statusColor: "#198754", id: "malaka" },
    { rank: 2, name: "Kabupaten Kupang", production: "18.420 Ton", share: "12,68%", status: "Secure Buffer", statusColor: "#198754", id: "kupang" },
    { rank: 3, name: "Kabupaten Sumba Timur", production: "11.200 Ton", share: "7,71%", status: "Secure Buffer", statusColor: "#198754", id: "sumba_timur" },
    { rank: 4, name: "Kabupaten Ende", production: "7.400 Ton", share: "5,10%", status: "Watchlist", statusColor: "#FFC107", id: "ende" },
    { rank: 5, name: "Flores Timur", production: "6.900 Ton", share: "4,75%", status: "Watchlist", statusColor: "#FFC107", id: "flotim" },
  ];

  const shockList = [
    { rank: 1, name: "Kabupaten Sikka", production: "3.200 Ton", drop: "-84,71%", status: "Critical BDB Outbreak", id: "sikka" },
    { rank: 2, name: "Manggarai Timur", production: "4.150 Ton", drop: "-78,68%", status: "Critical BDB Outbreak", id: "matim" },
    { rank: 3, name: "Kabupaten Ngada", production: "5.800 Ton", drop: "-45,24%", status: "High Risk BDB", id: "ngada" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid #DEE2E6", background: "#FFFFFF", flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, color: "#0F2C59" }}>
          Peta Spasial Rantai Pasok &amp; Pos Karantina Biosekuriti Trans-Flores
        </h2>
        <div style={{ fontSize: 11, color: "#6C757D", marginTop: 2 }}>
          Mode: <b style={{ color: "#E62129" }}>{viewMode}</b> · Regency Selection: <b style={{ color: "#0F2C59" }}>{selectedRegency === "all" ? "Seluruh 22 Kab/Kota" : selectedRegency.toUpperCase()}</b>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ flex: 1, display: "flex", gap: 14, padding: 16, overflow: "hidden" }}>
        {/* Left: Map (65%) */}
        <div style={{ flex: "0 0 65%", background: "#FFFFFF", border: "1px solid #DEE2E6", borderRadius: 4, padding: 12, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0F2C59", marginBottom: 8 }}>
            PETA ALIRAN BIOSEKURITI &amp; ROUTE DISTRIBUSI TRANS-FLORES
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <NTTMap />
          </div>
        </div>

        {/* Right: Leaderboard Tables (35%) */}
        <div style={{ flex: "0 0 35%", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
          {/* Buffer Leaderboard */}
          <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderRadius: 4, padding: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#198754", borderBottom: "2px solid #198754", paddingBottom: 4, marginBottom: 8 }}>
              TOP SENTRA PENYANGGA PASOKAN (SURPLUS)
            </div>
            <table style={{ width: "100%", fontSize: 11, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8F9FA", color: "#6C757D" }}>
                  <th style={{ textAlign: "left", padding: "4px 6px" }}>Kabupaten</th>
                  <th style={{ textAlign: "right", padding: "4px 6px" }}>Produksi</th>
                  <th style={{ textAlign: "right", padding: "4px 6px" }}>Pangsa</th>
                </tr>
              </thead>
              <tbody>
                {regencyList.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedRegency(item.id)}
                    style={{
                      borderBottom: "1px solid #E9ECEF",
                      cursor: "pointer",
                      background: selectedRegency === item.id ? "#FFF0F0" : "transparent",
                    }}
                  >
                    <td style={{ padding: "6px", fontWeight: 600, color: "#0F2C59" }}>{item.name}</td>
                    <td style={{ padding: "6px", textAlign: "right" }}>{item.production}</td>
                    <td style={{ padding: "6px", textAlign: "right", fontWeight: 700, color: item.statusColor }}>{item.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Outbreak Leaderboard */}
          <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderRadius: 4, padding: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#DC3545", borderBottom: "2px solid #DC3545", paddingBottom: 4, marginBottom: 8 }}>
              SENTRA TERDAMPAK WABAH BDB (OUTBREAK SHOCK)
            </div>
            <table style={{ width: "100%", fontSize: 11, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8F9FA", color: "#6C757D" }}>
                  <th style={{ textAlign: "left", padding: "4px 6px" }}>Kabupaten</th>
                  <th style={{ textAlign: "right", padding: "4px 6px" }}>Produksi</th>
                  <th style={{ textAlign: "right", padding: "4px 6px" }}>Penurunan</th>
                </tr>
              </thead>
              <tbody>
                {shockList.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedRegency(item.id)}
                    style={{
                      borderBottom: "1px solid #E9ECEF",
                      cursor: "pointer",
                      background: selectedRegency === item.id ? "#FFF0F0" : "transparent",
                    }}
                  >
                    <td style={{ padding: "6px", fontWeight: 600, color: "#0F2C59" }}>{item.name}</td>
                    <td style={{ padding: "6px", textAlign: "right" }}>{item.production}</td>
                    <td style={{ padding: "6px", textAlign: "right", fontWeight: 700, color: "#DC3545" }}>{item.drop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Checkpoints Card */}
          <div style={{ background: "#F8F9FA", border: "1px solid #0D6EFD40", borderLeft: "4px solid #0D6EFD", borderRadius: 4, padding: 10, fontSize: 11 }}>
            <div style={{ fontWeight: 700, color: "#0D6EFD" }}>POS KARANTINA BIOSEKURITI TRANS-FLORES:</div>
            <div style={{ marginTop: 4, color: "#333333" }}>
              ● <b>Checkpoint 1 (Sikka-Ende):</b> Pos desinfeksi alat angkut &amp; parang panen.<br />
              ● <b>Checkpoint 2 (Matim-Ngada):</b> Pos karantina bibit kultur jaringan.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
