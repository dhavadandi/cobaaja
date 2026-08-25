import { useDashboard } from "../context/DashboardContext";

export default function Page5() {
  const { showToast, viewMode } = useDashboard();

  const handleDownloadSOP = (sopTitle: string) => {
    showToast(`Mengunduh Dokumen Resmi: ${sopTitle}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid #DEE2E6", background: "#FFFFFF", flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, color: "#0F2C59" }}>
          Matriks Rekomendasi Kebijakan Kerangka Kerja 4K TPID BI &amp; SOP Biosekuriti BDB
        </h2>
        <div style={{ fontSize: 11, color: "#6C757D", marginTop: 2 }}>
          Panduan Aksi Terapkan Pemda NTT &amp; Bank Indonesia · Mode: <b style={{ color: "#E62129" }}>{viewMode}</b>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Card 1: Ketersediaan Pasokan */}
        <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderTop: "4px solid #198754", borderRadius: 4, padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#198754", marginBottom: 6 }}>
              1. KETERSEDIAAN PASOKAN (SUPPLY AVAILABILITY)
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "#212529" }}>
              <li><b>Pengamanan Sentra Penyangga:</b> Alokasi perlindungan khusus pada Kabupaten Malaka (50,46% pasokan NTT) dari intrusi bibit terinfeksi.</li>
              <li><b>Peremajaan Kultur Jaringan:</b> Pembagian 450.000 bibit kultur jaringan bebas BDB ke Sikka, Matim, dan Ngada.</li>
            </ul>
          </div>
          <button
            onClick={() => handleDownloadSOP("SOP_Pengadaan_Bibit_Kultur_Jaringan_NTT.pdf")}
            style={{ marginTop: 14, background: "#198754", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
          >
            Download SOP Pengadaan Bibit Kultur Jaringan PDF
          </button>
        </div>

        {/* Card 2: Kelancaran Distribusi */}
        <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderTop: "4px solid #0D6EFD", borderRadius: 4, padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0D6EFD", marginBottom: 6 }}>
              2. KELANCARAN DISTRIBUSI (DISTRIBUTION EFFICIENCY)
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "#212529" }}>
              <li><b>Pos Karantina Darat Trans-Flores:</b> Pembentukan 2 Checkpoint Karantina di batas Sikka-Ende &amp; Matim-Ngada.</li>
              <li><b>Pengawasan Lalu Lintas:</b> Pembatasan pengangkutan anakan/buah pisang bergejala nekrosis antar-kabupaten.</li>
            </ul>
          </div>
          <button
            onClick={() => handleDownloadSOP("SOP_Pos_Karantina_Biosekuriti_Trans_Flores.pdf")}
            style={{ marginTop: 14, background: "#0D6EFD", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
          >
            Download SOP Checkpoint Karantina Darat PDF
          </button>
        </div>

        {/* Card 3: Keterjangkauan Harga */}
        <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderTop: "4px solid #FFC107", borderRadius: 4, padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#D39E00", marginBottom: 6 }}>
              3. KETERJANGKAUAN HARGA (PRICE AFFORDABILITY)
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "#212529" }}>
              <li><b>Pemantauan EWS Disperindag:</b> Monitoring harga eceran harian via Portal Satu Data Disperindag NTT.</li>
              <li><b>Operasi Pasar Musiman:</b> Operasi pasar komoditas pisang saat puncak kemarau (Juni–Agustus) saat harga menembus Rp 20.000/Kg.</li>
            </ul>
          </div>
          <button
            onClick={() => handleDownloadSOP("Panduan_Operasi_Pasar_Pisang_Disperindag.pdf")}
            style={{ marginTop: 14, background: "#FFC107", color: "#212529", border: "none", borderRadius: 4, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
          >
            View Live Disperindag Price Feeds
          </button>
        </div>

        {/* Card 4: Komunikasi Efektif */}
        <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderTop: "4px solid #E62129", borderRadius: 4, padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#E62129", marginBottom: 6 }}>
              4. KOMUNIKASI EFEKTIF (EFFECTIVE COMMUNICATION)
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "#212529" }}>
              <li><b>Edukasi Sanitasi Kebun:</b> Desinfeksi parang panen dengan alkohol/desinfektan 10% setiap kali berpindah rumpun.</li>
              <li><b>Pemotongan Jantung Pisang:</b> Pemotongan segera jantung pisang (male bud removal) setelah sisir buah terakhir terbentuk.</li>
            </ul>
          </div>
          <button
            onClick={() => handleDownloadSOP("Poster_Edukasi_Sanitasi_Parang_Panen_BDB.pdf")}
            style={{ marginTop: 14, background: "#E62129", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
          >
            Download Poster Edukasi Sanitasi Kebun PDF
          </button>
        </div>
      </div>
    </div>
  );
}
