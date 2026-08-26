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
  kupang_kab: { id: "kupang_kab", name: "Kabupaten Kupang", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  kupang_kota: { id: "kupang_kota", name: "Kota Kupang", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  belu: { id: "belu", name: "Kabupaten Belu", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  ttu: { id: "ttu", name: "Timor Tengah Utara", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  tts: { id: "tts", name: "Timor Tengah Selatan", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  flotim: { id: "flotim", name: "Flores Timur", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  lembata: { id: "lembata", name: "Kabupaten Lembata", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  alor: { id: "alor", name: "Kabupaten Alor", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  nagekeo: { id: "nagekeo", name: "Kabupaten Nagekeo", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  manggarai: { id: "manggarai", name: "Kabupaten Manggarai", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  mabar: { id: "mabar", name: "Manggarai Barat", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  sumba_timur: { id: "sumba_timur", name: "Sumba Timur", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  sumba_barat: { id: "sumba_barat", name: "Sumba Barat", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  sumba_tengah: { id: "sumba_tengah", name: "Sumba Tengah", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  sumba_bd: { id: "sumba_bd", name: "Sumba Barat Daya", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  rote: { id: "rote", name: "Rote Ndao", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
  sabu: { id: "sabu", name: "Sabu Raijua", share: "Wilayah Luar Fokus 5 Sentra Utama", target: false, status: "na", production: "N/A", productivity: "N/A", badgeLabel: "Luar Fokus" },
};

interface TooltipState {
  x: number;
  y: number;
  node: RegencyMapNode;
}

export default function NTTMap() {
  const { selectedRegency, setSelectedRegency } = useDashboard();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Soft Pastel Palette Fill
  const getStatusFill = (status: string) => {
    if (status === "secure") return "#D1E7DD"; // Soft Pastel Green (Malaka Buffer)
    if (status === "critical") return "#F8D7DA"; // Soft Pastel Red/Pink (Sikka & Matim Kritis)
    if (status === "warning") return "#FFF3CD"; // Soft Pastel Yellow (Ngada & Ende Risiko)
    return "#F1F5F9"; // Light Neutral Pastel Gray for Non-Target Regencies
  };

  const getStatusStroke = (status: string) => {
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

  const handleMouseMove = (e: React.MouseEvent, node: RegencyMapNode) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
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
        {/* Sea Watermark Label */}
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

        {/* 1. Neutral Base Layer Polygons for All Regencies (Soft Light Gray) */}
        <g>
          {nttPaths.map((pathStr: string, idx: number) => {
            const nonTargetKeys = [
              "sumba_bd", "sumba_barat", "sumba_tengah", "sumba_timur", "rote", "sabu",
              "mabar", "manggarai", "nagekeo", "flotim", "lembata", "alor",
              "kupang_kab", "kupang_kota", "belu", "ttu", "tts"
            ];
            const nodeKey = nonTargetKeys[idx % nonTargetKeys.length];
            const nodeObj = REGENCY_NODES_MAP[nodeKey] || {
              id: nodeKey,
              name: `Kabupaten NTT (Wilayah #${idx + 1})`,
              share: "Wilayah Luar Fokus 5 Sentra Utama (Status: N/A)",
              target: false,
              status: "na",
              production: "N/A",
              productivity: "N/A",
              badgeLabel: "Luar Fokus"
            };

            return (
              <path
                key={idx}
                d={pathStr}
                fill="#F1F5F9"
                fillOpacity="0.9"
                stroke="#CBD5E1"
                strokeWidth="0.8"
                onClick={() => handleRegionClick(nodeObj.id)}
                onMouseMove={(e) => handleMouseMove(e, nodeObj)}
                style={{ cursor: "pointer", transition: "all 0.15s" }}
              />
            );
          })}
        </g>

        {/* 2. Soft Pastel Color Fills for 5 Target Sentra Regencies */}
        {/* Malaka (Soft Pastel Green) */}
        <path
          d={regencySubPaths.malaka}
          fill={getStatusFill("secure")}
          fillOpacity={selectedRegency === "all" || selectedRegency === "malaka" ? "0.95" : "0.4"}
          stroke={getStatusStroke("secure")}
          strokeWidth={selectedRegency === "malaka" ? "2.5" : "1.2"}
          onClick={() => handleRegionClick("malaka")}
          onMouseMove={(e) => handleMouseMove(e, REGENCY_NODES_MAP["malaka"])}
          style={{ cursor: "pointer", transition: "all 0.15s" }}
        />

        {/* Sikka (Soft Pastel Red/Pink) */}
        <path
          d={regencySubPaths.sikka}
          fill={getStatusFill("critical")}
          fillOpacity={selectedRegency === "all" || selectedRegency === "sikka" ? "0.95" : "0.4"}
          stroke={getStatusStroke("critical")}
          strokeWidth={selectedRegency === "sikka" ? "2.5" : "1.2"}
          onClick={() => handleRegionClick("sikka")}
          onMouseMove={(e) => handleMouseMove(e, REGENCY_NODES_MAP["sikka"])}
          style={{ cursor: "pointer", transition: "all 0.15s" }}
        />

        {/* Manggarai Timur (Soft Pastel Red/Pink) */}
        <path
          d={regencySubPaths.matim}
          fill={getStatusFill("critical")}
          fillOpacity={selectedRegency === "all" || selectedRegency === "matim" ? "0.95" : "0.4"}
          stroke={getStatusStroke("critical")}
          strokeWidth={selectedRegency === "matim" ? "2.5" : "1.2"}
          onClick={() => handleRegionClick("matim")}
          onMouseMove={(e) => handleMouseMove(e, REGENCY_NODES_MAP["matim"])}
          style={{ cursor: "pointer", transition: "all 0.15s" }}
        />

        {/* Ngada (Soft Pastel Yellow) */}
        <path
          d={regencySubPaths.ngada}
          fill={getStatusFill("warning")}
          fillOpacity={selectedRegency === "all" || selectedRegency === "ngada" ? "0.95" : "0.4"}
          stroke={getStatusStroke("warning")}
          strokeWidth={selectedRegency === "ngada" ? "2.5" : "1.2"}
          onClick={() => handleRegionClick("ngada")}
          onMouseMove={(e) => handleMouseMove(e, REGENCY_NODES_MAP["ngada"])}
          style={{ cursor: "pointer", transition: "all 0.15s" }}
        />

        {/* Ende (Soft Pastel Yellow) */}
        <path
          d={regencySubPaths.ende}
          fill={getStatusFill("warning")}
          fillOpacity={selectedRegency === "all" || selectedRegency === "ende" ? "0.95" : "0.4"}
          stroke={getStatusStroke("warning")}
          strokeWidth={selectedRegency === "ende" ? "2.5" : "1.2"}
          onClick={() => handleRegionClick("ende")}
          onMouseMove={(e) => handleMouseMove(e, REGENCY_NODES_MAP["ende"])}
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
          Malaka (Sentra Penyangga)
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
          17 Kab/Kota (Luar Fokus N/A)
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
              <span style={{ color: "#64748B" }}>Produksi:</span>
              <span style={{ fontWeight: 700, color: tooltip.node.target ? "#0F2C59" : "#64748B" }}>{tooltip.node.production}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748B" }}>Produktivitas:</span>
              <span style={{ fontWeight: 700, color: tooltip.node.target ? "#0F2C59" : "#64748B" }}>{tooltip.node.productivity}</span>
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
