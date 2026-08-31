import { useState, useRef } from "react";
import { useDashboard } from "../context/DashboardContext";
import nttPaths from "./ntt_paths.json";
import regencySubPaths from "./regency_paths.json";

interface RegencyMapNode {
  id: string;
  name: string;
  share: string;
  target: boolean;
  status: "secure" | "critical" | "warning" | "na";
  production: string;
  productivity: string;
  badgeLabel: string;
}

const REGENCY_NODES_MAP: Record<string, RegencyMapNode> = {
  malaka: { id: "malaka", name: "Kabupaten Malaka", share: "50,46% Pangsa Pasokan Total NTT", target: true, status: "secure", production: "73.267 Ton", productivity: "12,59 Ton/Ha", badgeLabel: "BUFFER 50%" },
  sikka: { id: "sikka", name: "Kabupaten Sikka", share: "Anjlok -84,71% YoY (Wabah BDB)", target: true, status: "critical", production: "3.200 Ton", productivity: "1,85 Ton/Ha", badgeLabel: "-84,7% BDB" },
  matim: { id: "matim", name: "Manggarai Timur", share: "Anjlok -78,68% YoY (Wabah BDB)", target: true, status: "critical", production: "4.150 Ton", productivity: "1,98 Ton/Ha", badgeLabel: "-78,7% BDB" },
  ngada: { id: "ngada", name: "Kabupaten Ngada", share: "Anjlok -21,86% YoY (Risiko BDB)", target: true, status: "warning", production: "5.800 Ton", productivity: "3,20 Ton/Ha", badgeLabel: "RISIKO BDB" },
  ende: { id: "ende", name: "Kabupaten Ende", share: "Watchlist (Pisang Beranga Kelimutu)", target: true, status: "warning", production: "7.400 Ton", productivity: "4,10 Ton/Ha", badgeLabel: "WATCHLIST" },
  kupang_kab: { id: "kupang_kab", name: "Kabupaten Kupang", share: "Penyangga Selatan (BPS)", target: false, status: "secure", production: "18.420 Ton", productivity: "8,20 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  kupang_kota: { id: "kupang_kota", name: "Kota Kupang", share: "Pusat Distribusi (BPS)", target: false, status: "na", production: "1.200 Ton", productivity: "4,50 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  belu: { id: "belu", name: "Kabupaten Belu", share: "Penyangga Perbatasan (BPS)", target: false, status: "secure", production: "12.300 Ton", productivity: "7,80 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  ttu: { id: "ttu", name: "Timor Tengah Utara", share: "Sentra Timor (BPS)", target: false, status: "na", production: "8.900 Ton", productivity: "6,40 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  tts: { id: "tts", name: "Timor Tengah Selatan", share: "Sentra Timor (BPS)", target: false, status: "secure", production: "14.500 Ton", productivity: "7,10 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  flotim: { id: "flotim", name: "Flores Timur", share: "Watchlist Flores (BPS)", target: false, status: "warning", production: "6.900 Ton", productivity: "5,20 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  lembata: { id: "lembata", name: "Kabupaten Lembata", share: "Wilayah Luar Fokus (BPS)", target: false, status: "na", production: "3.400 Ton", productivity: "4,80 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  alor: { id: "alor", name: "Kabupaten Alor", share: "Wilayah Luar Fokus (BPS)", target: false, status: "na", production: "4.100 Ton", productivity: "5,10 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  nagekeo: { id: "nagekeo", name: "Kabupaten Nagekeo", share: "Risiko BDB (BPS)", target: false, status: "warning", production: "4.800 Ton", productivity: "4,30 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  manggarai: { id: "manggarai", name: "Kabupaten Manggarai", share: "Risiko BDB (BPS)", target: false, status: "warning", production: "5.200 Ton", productivity: "4,60 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  mabar: { id: "mabar", name: "Manggarai Barat", share: "Distribusi Wisata (BPS)", target: false, status: "secure", production: "6.100 Ton", productivity: "5,40 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  sumba_timur: { id: "sumba_timur", name: "Sumba Timur", share: "Sentra Sumba (BPS)", target: false, status: "secure", production: "11.200 Ton", productivity: "7,50 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  sumba_barat: { id: "sumba_barat", name: "Sumba Barat", share: "Sentra Sumba (BPS)", target: false, status: "na", production: "4.800 Ton", productivity: "5,90 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  sumba_tengah: { id: "sumba_tengah", name: "Sumba Tengah", share: "Sentra Sumba (BPS)", target: false, status: "na", production: "3.900 Ton", productivity: "5,30 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  sumba_bd: { id: "sumba_bd", name: "Sumba Barat Daya", share: "Sentra Sumba (BPS)", target: false, status: "secure", production: "8.400 Ton", productivity: "6,80 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  rote: { id: "rote", name: "Rote Ndao", share: "Penyangga Selatan (BPS)", target: false, status: "secure", production: "5.100 Ton", productivity: "6,10 Ton/Ha", badgeLabel: "BPS AKTUAL" },
  sabu: { id: "sabu", name: "Sabu Raijua", share: "Wilayah Luar Fokus (BPS)", target: false, status: "na", production: "1.800 Ton", productivity: "3,90 Ton/Ha", badgeLabel: "BPS AKTUAL" },
};

// Historical Year Overrides (2021-2023)
const HISTORICAL_YEAR_OVERRIDES: Record<number, Record<string, Partial<RegencyMapNode>>> = {
  2021: {
    malaka: { production: "54.000 Ton", share: "30,00% Pangsa (Stabil)", badgeLabel: "SENTRA 30%", status: "secure" },
    sikka: { production: "36.000 Ton", share: "20,00% Pangsa Flores", badgeLabel: "UTAMA FLORES", status: "secure" },
    matim: { production: "27.000 Ton", share: "15,00% Pangsa Flores", badgeLabel: "SENTRA FLORES", status: "secure" },
    ngada: { production: "18.000 Ton", share: "10,00% Pangsa Flores", badgeLabel: "SENTRA FLORES", status: "secure" },
    ende: { production: "18.000 Ton", share: "10,00% Pangsa Ende", badgeLabel: "SENTRA ENDE", status: "secure" },
  },
  2022: {
    malaka: { production: "57.750 Ton", share: "35,00% Pangsa Pasokan", badgeLabel: "SENTRA 35%", status: "secure" },
    sikka: { production: "24.750 Ton", share: "15,00% Pangsa (Awal BDB)", badgeLabel: "RISIKO BDB", status: "warning" },
    matim: { production: "19.800 Ton", share: "12,00% Pangsa (Awal BDB)", badgeLabel: "RISIKO BDB", status: "warning" },
    ngada: { production: "16.500 Ton", share: "10,00% Pangsa Flores", badgeLabel: "RISIKO BDB", status: "warning" },
    ende: { production: "16.500 Ton", share: "10,00% Pangsa Ende", badgeLabel: "WATCHLIST", status: "warning" },
  },
  2023: {
    malaka: { production: "67.200 Ton", share: "48,00% Pangsa (Buffer)", badgeLabel: "BUFFER 48%", status: "secure" },
    sikka: { production: "3.080 Ton", share: "2,20% Pangsa (-84,7% BDB)", badgeLabel: "-84,7% BDB", status: "critical" },
    matim: { production: "4.004 Ton", share: "2,86% Pangsa (-78,7% BDB)", badgeLabel: "-78,7% BDB", status: "critical" },
    ngada: { production: "5.586 Ton", share: "3,99% Pangsa (Risiko)", badgeLabel: "RISIKO BDB", status: "warning" },
    ende: { production: "7.140 Ton", share: "5,10% Pangsa (Watchlist)", badgeLabel: "WATCHLIST", status: "warning" },
  },
};

interface TooltipState {
  x: number;
  y: number;
  node: RegencyMapNode;
}

export default function NTTMap() {
  const { selectedRegency, setSelectedRegency, selectedMonth } = useDashboard();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isHist = selectedMonth.startsWith("hist-");
  const selectedYear = isHist
    ? parseInt(selectedMonth.replace("hist-", ""))
    : selectedMonth.startsWith("yr-")
    ? parseInt(selectedMonth.replace("yr-", ""))
    : selectedMonth !== "all"
    ? parseInt(selectedMonth.split("-")[0])
    : 2026;

  const getDynamicNode = (key: string): RegencyMapNode => {
    const base = REGENCY_NODES_MAP[key] || {
      id: key,
      name: `Kabupaten NTT (${key})`,
      share: "Catatan BPS",
      target: false,
      status: "na",
      production: "N/A",
      productivity: "N/A",
      badgeLabel: "BPS AKTUAL",
    };
    if (selectedYear && HISTORICAL_YEAR_OVERRIDES[selectedYear] && HISTORICAL_YEAR_OVERRIDES[selectedYear][key]) {
      return { ...base, ...HISTORICAL_YEAR_OVERRIDES[selectedYear][key] };
    }
    return base;
  };

  const getStatusFill = (status: string, regId: string) => {
    if (selectedYear === 2021) return "#D1E7DD"; // In 2021 pre-BDB, all sentras were healthy green!
    if (selectedYear === 2022) {
      if (regId === "malaka") return "#D1E7DD";
      return "#FFF3CD"; // Yellow warning in 2022
    }
    if (status === "secure") return "#D1E7DD"; // Soft Pastel Green
    if (status === "critical") return "#F8D7DA"; // Soft Pastel Red/Pink
    if (status === "warning") return "#FFF3CD"; // Soft Pastel Yellow
    return "#F1F5F9"; // Neutral Light Gray
  };

  const getStatusStroke = (status: string, regId: string) => {
    if (selectedYear === 2021) return "#198754";
    if (selectedYear === 2022) {
      if (regId === "malaka") return "#198754";
      return "#D39E00";
    }
    if (status === "secure") return "#198754";
    if (status === "critical") return "#DC3545";
    if (status === "warning") return "#D39E00";
    return "#CBD5E1";
  };

  const getBadgeStyle = (status: string) => {
    if (status === "secure") return { bg: "#D1E7DD", color: "#198754", border: "#A3CFBB" };
    if (status === "critical") return { bg: "#F8D7DA", color: "#DC3545", border: "#F5C2C7" };
    if (status === "warning") return { bg: "#FFF3CD", color: "#D39E00", border: "#FFE69C" };
    return { bg: "#F1F5F9", color: "#64748B", border: "#E2E8F0" };
  };

  const handleMouseMove = (e: React.MouseEvent, nodeKey: string) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const node = getDynamicNode(nodeKey);
    setTooltip({
      x: e.clientX - rect.left + 15,
      y: e.clientY - rect.top - 15,
      node,
    });
  };

  const handleRegionClick = (id: string) => {
    setSelectedRegency(selectedRegency === id ? "all" : id);
  };

  return (
    <div
      ref={containerRef}
      onMouseLeave={() => setTooltip(null)}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #F0F4F8 0%, #E6EDF5 100%)",
        borderRadius: 6,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #CBD5E1",
      }}
    >
      <svg viewBox="0 0 750 380" style={{ width: "100%", height: "100%", display: "block" }}>
        <text
          x="375"
          y="26"
          textAnchor="middle"
          fontSize="10"
          fontWeight="600"
          fill="#94A3B8"
          style={{ fontFamily: "'Space Mono', monospace, sans-serif", letterSpacing: "0.2em", textTransform: "uppercase" }}
        >
          LAUT FLORES &amp; SAWU
        </text>

        {/* 1. Neutral Base Layer Polygons for All Regencies */}
        <g>
          {nttPaths.map((pathStr: string, idx: number) => {
            const nonTargetKeys = [
              "sumba_bd", "sumba_barat", "sumba_tengah", "sumba_timur", "rote", "sabu",
              "mabar", "manggarai", "nagekeo", "flotim", "lembata", "alor",
              "kupang_kab", "kupang_kota", "belu", "ttu", "tts"
            ];
            const nodeKey = nonTargetKeys[idx % nonTargetKeys.length];

            return (
              <path
                key={idx}
                d={pathStr}
                fill="#F1F5F9"
                fillOpacity="0.9"
                stroke="#CBD5E1"
                strokeWidth="0.8"
                onClick={() => handleRegionClick(nodeKey)}
                onMouseMove={(e) => handleMouseMove(e, nodeKey)}
                style={{ cursor: "pointer", transition: "all 0.15s" }}
              />
            );
          })}
        </g>

        {/* 2. Dynamic Color Fills for 5 Target Sentra Regencies */}
        <path
          d={regencySubPaths.malaka}
          fill={getStatusFill(getDynamicNode("malaka").status, "malaka")}
          fillOpacity={selectedRegency === "all" || selectedRegency === "malaka" ? "0.95" : "0.4"}
          stroke={getStatusStroke(getDynamicNode("malaka").status, "malaka")}
          strokeWidth={selectedRegency === "malaka" ? "2.5" : "1.2"}
          onClick={() => handleRegionClick("malaka")}
          onMouseMove={(e) => handleMouseMove(e, "malaka")}
          style={{ cursor: "pointer", transition: "all 0.15s" }}
        />

        <path
          d={regencySubPaths.sikka}
          fill={getStatusFill(getDynamicNode("sikka").status, "sikka")}
          fillOpacity={selectedRegency === "all" || selectedRegency === "sikka" ? "0.95" : "0.4"}
          stroke={getStatusStroke(getDynamicNode("sikka").status, "sikka")}
          strokeWidth={selectedRegency === "sikka" ? "2.5" : "1.2"}
          onClick={() => handleRegionClick("sikka")}
          onMouseMove={(e) => handleMouseMove(e, "sikka")}
          style={{ cursor: "pointer", transition: "all 0.15s" }}
        />

        <path
          d={regencySubPaths.matim}
          fill={getStatusFill(getDynamicNode("matim").status, "matim")}
          fillOpacity={selectedRegency === "all" || selectedRegency === "matim" ? "0.95" : "0.4"}
          stroke={getStatusStroke(getDynamicNode("matim").status, "matim")}
          strokeWidth={selectedRegency === "matim" ? "2.5" : "1.2"}
          onClick={() => handleRegionClick("matim")}
          onMouseMove={(e) => handleMouseMove(e, "matim")}
          style={{ cursor: "pointer", transition: "all 0.15s" }}
        />

        <path
          d={regencySubPaths.ngada}
          fill={getStatusFill(getDynamicNode("ngada").status, "ngada")}
          fillOpacity={selectedRegency === "all" || selectedRegency === "ngada" ? "0.95" : "0.4"}
          stroke={getStatusStroke(getDynamicNode("ngada").status, "ngada")}
          strokeWidth={selectedRegency === "ngada" ? "2.5" : "1.2"}
          onClick={() => handleRegionClick("ngada")}
          onMouseMove={(e) => handleMouseMove(e, "ngada")}
          style={{ cursor: "pointer", transition: "all 0.15s" }}
        />

        <path
          d={regencySubPaths.ende}
          fill={getStatusFill(getDynamicNode("ende").status, "ende")}
          fillOpacity={selectedRegency === "all" || selectedRegency === "ende" ? "0.95" : "0.4"}
          stroke={getStatusStroke(getDynamicNode("ende").status, "ende")}
          strokeWidth={selectedRegency === "ende" ? "2.5" : "1.2"}
          onClick={() => handleRegionClick("ende")}
          onMouseMove={(e) => handleMouseMove(e, "ende")}
          style={{ cursor: "pointer", transition: "all 0.15s" }}
        />
      </svg>

      {/* Footer Minimalist Legend Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 12,
          zIndex: 10,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(6px)",
          border: "1px solid #CBD5E1",
          borderRadius: 4,
          padding: "4px 10px",
          fontSize: 10,
          fontFamily: "'Space Mono', monospace, sans-serif",
          display: "flex",
          gap: 12,
          alignItems: "center",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        <span style={{ color: "#198754", fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, background: "#D1E7DD", border: "1px solid #198754", borderRadius: 2, display: "inline-block" }}></span>
          Malaka (Penyangga)
        </span>
        <span style={{ color: "#DC3545", fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, background: "#F8D7DA", border: "1px solid #DC3545", borderRadius: 2, display: "inline-block" }}></span>
          Sikka &amp; Matim (Kritis BDB)
        </span>
        <span style={{ color: "#D39E00", fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, background: "#FFF3CD", border: "1px solid #D39E00", borderRadius: 2, display: "inline-block" }}></span>
          Ngada &amp; Ende (Risiko)
        </span>
        <span style={{ color: "#64748B", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, background: "#F1F5F9", border: "1px solid #CBD5E1", borderRadius: 2, display: "inline-block" }}></span>
          17 Kab/Kota (Data BPS)
        </span>
      </div>

      {/* Floating White Light Theme Popup Card */}
      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: Math.min(tooltip.x, containerRef.current ? containerRef.current.clientWidth - 240 : tooltip.x),
            top: Math.max(10, Math.min(tooltip.y, containerRef.current ? containerRef.current.clientHeight - 150 : tooltip.y)),
            pointerEvents: "none",
            zIndex: 30,
            background: "#FFFFFF",
            color: "#0F172A",
            border: "1px solid #E2E8F0",
            borderRadius: 8,
            padding: "12px 16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            maxWidth: 240,
            fontSize: 11,
            fontFamily: "'Space Mono', monospace, sans-serif",
          }}
        >
          {/* Header Row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#0F2C59" }}>{tooltip.node.name}</span>
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 12,
                background: getBadgeStyle(tooltip.node.status).bg,
                color: getBadgeStyle(tooltip.node.status).color,
                border: `1px solid ${getBadgeStyle(tooltip.node.status).border}`,
              }}
            >
              {tooltip.node.badgeLabel}
            </span>
          </div>

          <div style={{ fontSize: 10, color: "#64748B", marginBottom: 8, lineHeight: 1.3 }}>{tooltip.node.share}</div>

          {/* Stats Lines */}
          <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748B" }}>Produksi ({selectedYear}):</span>
              <span style={{ fontWeight: 700, color: "#0F2C59" }}>{tooltip.node.production}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748B" }}>Produktivitas:</span>
              <span style={{ fontWeight: 700, color: "#0F2C59" }}>{tooltip.node.productivity}</span>
            </div>
            <div style={{ fontSize: 9.5, color: "#0D6EFD", textAlign: "right", marginTop: 4, fontWeight: 700 }}>
              Klik untuk detail →
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
