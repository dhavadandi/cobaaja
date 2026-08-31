import { useDashboard } from "../context/DashboardContext";

export default function Page5() {
  const { showToast } = useDashboard();

  const handleDownloadSOP = (sopTitle: string) => {
    showToast(`Mengunduh Dokumen Rekomendasi Paper: ${sopTitle}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid #DEE2E6", background: "#FFFFFF", flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, color: "#0F2C59" }}>
          Matriks Rekomendasi Kebijakan Kerangka Kerja 4K TPID BI &amp; Biosekuriti BDB
        </h2>
        <div style={{ fontSize: 11, color: "#6C757D", marginTop: 2 }}>
          Integrasi Temuan Paper: <i>Komoditas Pisang NTT Kala Blood Banana Disease: Apakah Mampu Bertahan atau Mati Perlahan?</i>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Card 1: Ketersediaan Pasokan */}
        <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderTop: "4px solid #198754", borderRadius: 4, padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#198754", marginBottom: 8, borderBottom: "1px solid #E9ECEF", paddingBottom: 4 }}>
              1. KETERSEDIAAN PASOKAN (SUPPLY AVAILABILITY)
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "#212529" }}>
              <li><b>Pengamanan Sentra Malaka (50,46%):</b> Perlindungan khusus Kabupaten Malaka sebagai benteng pasokan utama NTT (85.600 Ton pada 2025) dari kontaminasi bibit terinfeksi.</li>
              <li><b>Peremajaan Varietas Unggul Kultur Jaringan:</b> Pengadaan dan penyaluran 450.000 bibit kultur jaringan sehat bebas BDB, mengedepankan varietas unggul nasional <b>Pisang Beranga Kelimutu Ende</b> (<i>Musa acuminata</i>, Kepmentan 304/2006) ke wilayah terdampak (Sikka, Matim, Ngada, Ende).</li>
            </ul>
          </div>
          <button
            onClick={() => handleDownloadSOP("Rekomendasi_Peremajaan_Bibit_Beranga_Kelimutu.pdf")}
            style={{ marginTop: 14, background: "#198754", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
          >
            Download Draft Rekomendasi Bibit Kultur Jaringan PDF
          </button>
        </div>

        {/* Card 2: Kelancaran Distribusi */}
        <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderTop: "4px solid #0D6EFD", borderRadius: 4, padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0D6EFD", marginBottom: 8, borderBottom: "1px solid #E9ECEF", paddingBottom: 4 }}>
              2. KELANCARAN DISTRIBUSI (DISTRIBUTION EFFICIENCY)
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "#212529" }}>
              <li><b>Pos Karantina Biosekuriti Darat Trans-Flores:</b> Pembentukan 2 Checkpoint Karantina di rute perbatasan strategis (Sikka-Ende &amp; Matim-Ngada) guna memutus penularan bakteri <i>Ralstonia syzygii</i>.</li>
              <li><b>Pengawasan Rantai Pasok Antar-Pulau:</b> Pengetatan karantina pengangkutan anakan/buah pisang terinfeksi agar wabah dari Flores tidak menyeberang ke Pulau Timor atau Sumba (Nampa et al., 2025).</li>
            </ul>
          </div>
          <button
            onClick={() => handleDownloadSOP("SOP_Pos_Karantina_Biosekuriti_Trans_Flores.pdf")}
            style={{ marginTop: 14, background: "#0D6EFD", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
          >
            Download Draft SOP Karantina Trans-Flores PDF
          </button>
        </div>

        {/* Card 3: Keterjangkauan Harga */}
        <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderTop: "4px solid #FFC107", borderRadius: 4, padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#D39E00", marginBottom: 8, borderBottom: "1px solid #E9ECEF", paddingBottom: 4 }}>
              3. KETERJANGKAUAN HARGA (PRICE AFFORDABILITY)
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "#212529" }}>
              <li><b>Pengendalian Inflasi Hortikultura (70% Inflasi):</b> Pemantauan harga eceran pisang lokal secara berkala via Satu Data Disperindag guna menekan inflasi daerah (Bria, 2024).</li>
              <li><b>Mitigasi Biaya Bahan Baku UMKM:</b> Operasi pasar musiman puncak kemarau (Juni–Agustus) untuk melindungi UMKM pengolahan pangan khas NTT (<i>Muku Loto, Manggulu, Ka'pu Pantunnu</i>) dari kenaikan biaya bahan baku 50%–200% (Fitriyawati, 2022).</li>
            </ul>
          </div>
          <button
            onClick={() => handleDownloadSOP("Kebijakan_Stabilisasi_Harga_Pisang_Disperindag.pdf")}
            style={{ marginTop: 14, background: "#FFC107", color: "#212529", border: "none", borderRadius: 4, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
          >
            View Disperindag Inflation Feeds
          </button>
        </div>

        {/* Card 4: Komunikasi Efektif */}
        <div style={{ background: "#FFFFFF", border: "1px solid #DEE2E6", borderTop: "4px solid #E62129", borderRadius: 4, padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#E62129", marginBottom: 8, borderBottom: "1px solid #E9ECEF", paddingBottom: 4 }}>
              4. KOMUNIKASI EFEKTIF &amp; DUKUNGAN REGULASI (COMMUNICATION)
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: "#212529" }}>
              <li><b>Edukasi Instruksi Bupati Ngada No. 1/2023:</b> Sosialisasi protokol pembersihan/pemusnahan (eradikasi) kebun, desinfeksi parang panen 10% desinfektan/alkohol, dan pemotongan jantung pisang (<i>male bud removal</i>) pasca-sisir buah terbentuk (Aba, 2026).</li>
              <li><b>Advokasi Skema Kompensasi Petani (DPRD Ngada):</b> Mendorong pemberian kompensasi bagi petani yang pendapatan kebunnya anjlok 65% (Nampa et al., 2025; Mau et al., 2025) serta pembentukan tim investigasi lintas-instansi (Bala, 2026).</li>
            </ul>
          </div>
          <button
            onClick={() => handleDownloadSOP("Panduan_Eradikasi_Instruksi_Bupati_Ngada.pdf")}
            style={{ marginTop: 14, background: "#E62129", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
          >
            Download Panduan Eradikasi Kebun PDF
          </button>
        </div>
      </div>
    </div>
  );
}
