import { useState } from "react";
import { useDashboard, ALL_REGENCIES } from "../context/DashboardContext";
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
  cx: number;
  cy: number;
}

const REGENCY_NODES: RegencyMapNode[] = [
  // 5 Target Research Regencies
  { id: "malaka", name: "Kabupaten Malaka", share: "50,46% Share (Sentra Penyangga)", target: true, status: "secure", production: "73.267 Ton", productivity: "12,59 Ton/Ha", cx: 694.9, cy: 201.7 },
  { id: "sikka", name: "Kabupaten Sikka", share: "Anjlok -84,71% (Syok Kritis BDB)", target: true, status: "critical", production: "3.200 Ton", productivity: "1,85 Ton/Ha", cx: 392.5, cy: 92.7 },
  { id: "matim", name: "Manggarai Timur", share: "Anjlok -78,68% (Syok Kritis BDB)", target: true, status: "critical", production: "4.150 Ton", productivity: "1,98 Ton/Ha", cx: 209.9, cy: 111.2 },
  { id: "ngada", name: "Kabupaten Ngada", share: "Anjlok -21,86% (Instruksi Bupati No.1/2023)", target: true, status: "warning", production: "5.800 Ton", productivity: "3,20 Ton/Ha", cx: 254.2, cy: 118.2 },
  { id: "ende", name: "Kabupaten Ende", share: "Watchlist (Pisang Beranga Kelimutu)", target: true, status: "warning", production: "7.400 Ton", productivity: "4,10 Ton/Ha", cx: 327.9, cy: 118.2 },
  // Non-Target Regencies (Display N/A)
  { id: "kupang_kab", name: "Kabupaten Kupang", share: "Wilayah Luar Fokus (N/A)", target: false, status: "na", production: "N/A", productivity: "N/A", cx: 577.0, cy: 264.1 },
  { id: "kupang_kota", name: "Kota Kupang", share: "Wilayah Luar Fokus (N/A)", target: false, status: "na", production: "N/A", productivity: "N/A", cx: 552.0, cy: 280.0 },
  { id: "belu", name: "Kabupaten Belu", share: "Wilayah Luar Fokus (N/A)", target: false, status: "na", production: "N/A", productivity: "N/A", cx: 712.7, cy: 159.0 },
  { id: "flotim", name: "Flores Timur", share: "Wilayah Luar Fokus (N/A)", target: false, status: "na", production: "N/A", productivity: "N/A", cx: 478.7, cy: 60.3 },
  { id: "lembata", name: "Kabupaten Lembata", share: "Wilayah Luar Fokus (N/A)", target: false, status: "na", production: "N/A", productivity: "N/A", cx: 540.0, cy: 75.0 },
  { id: "alor", name: "Kabupaten Alor", share: "Wilayah Luar Fokus (N/A)", target: false, status: "na", production: "N/A", productivity: "N/A", cx: 660.0, cy: 65.0 },
  { id: "sumba_timur", name: "Sumba Timur", share: "Wilayah Luar Fokus (N/A)", target: false, status: "na", production: "N/A", productivity: "N/A", cx: 170.2, cy: 212.1 },
  { id: "rote", name: "Rote Ndao", share: "Wilayah Luar Fokus (N/A)", target: false, status: "na", production: "N/A", productivity: "N/A", cx: 487.8, cy: 337.0 },
];

export default function NTTMap() {
  const { selectedRegency, setSelectedRegency } = useDashboard();
  const [hoveredNode, setHoveredNode] = useState<RegencyMapNode | null>(null);

  const getStatusColor = (status: string) => {
    if (status === "secure") return "#198754";
    if (status === "critical") return "#DC3545";
    if (status === "warning") return "#FFC107";
    return "#6C757D"; // N/A neutral
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#F4F7FB", borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Legend Header */}
      <div style={{ position: "absolute", top: 12, left: 14, zIndex: 10, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)", border: "1px solid #DEE2E6", borderRadius: 4, padding: "6px 12px", fontSize: 11 }}>
        <div style={{ fontWeight: 700, color: "#0F2C59" }}>PETA SPASIAL CHOROPLETH (5 SENTRA UTAMA RISIKOS WABAH)</div>
        <div style={{ fontSize: 10, color: "#6C757D", marginTop: 2, display: "flex", gap: 10 }}>
          <span style={{ color: "#198754", fontWeight: 700 }}>■ Hijau: Malaka (50,46% Sentra Penyangga)</span>
          <span style={{ color: "#DC3545", fontWeight: 700 }}>■ Merah: Sikka &amp; Matim (Kritis BDB)</span>
          <span style={{ color: "#FFC107", fontWeight: 700 }}>■ Kuning: Ngada &amp; Ende (Risiko/Watchlist)</span>
          <span style={{ color: "#6C757D", fontWeight: 600 }}>■ Abu-Abu: Wilayah Lain (N/A)</span>
        </div>
      </div>

      {/* SVG GeoJSON Map */}
      <svg viewBox="0 0 750 380" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.06))" }}>
        {/* 1. Base GeoJSON Island Paths (Neutral Light Gray) */}
        <g>
          {nttPaths.map((pathStr: string, idx: number) => (
            <path key={idx} d={pathStr} fill="#E9ECEF" stroke="#CED4DA" strokeWidth="1.2" />
          ))}
        </g>

        {/* 2. CHOROPLETH REGIONAL SUB-POLYGON OVERLAYS (Full Region Fill) */}
        {/* Malaka (Full Green Fill) */}
        <path
          d={regencySubPaths.malaka}
          fill={selectedRegency === "malaka" ? "#146C43" : "#198754"}
          fillOpacity={selectedRegency === "all" || selectedRegency === "malaka" ? "0.85" : "0.3"}
          stroke="#0F2C59"
          strokeWidth={selectedRegency === "malaka" ? "2.5" : "1.5"}
          onClick={() => setSelectedRegency("malaka")}
          style={{ cursor: "pointer", transition: "all 0.2s" }}
        />

        {/* Sikka (Full Red Fill) */}
        <path
          d={regencySubPaths.sikka}
          fill={selectedRegency === "sikka" ? "#B02A37" : "#DC3545"}
          fillOpacity={selectedRegency === "all" || selectedRegency === "sikka" ? "0.85" : "0.3"}
          stroke="#0F2C59"
          strokeWidth={selectedRegency === "sikka" ? "2.5" : "1.5"}
          onClick={() => setSelectedRegency("sikka")}
          style={{ cursor: "pointer", transition: "all 0.2s" }}
        />

        {/* Manggarai Timur (Full Red Fill) */}
        <path
          d={regencySubPaths.matim}
          fill={selectedRegency === "matim" ? "#B02A37" : "#DC3545"}
          fillOpacity={selectedRegency === "all" || selectedRegency === "matim" ? "0.85" : "0.3"}
          stroke="#0F2C59"
          strokeWidth={selectedRegency === "matim" ? "2.5" : "1.5"}
          onClick={() => setSelectedRegency("matim")}
          style={{ cursor: "pointer", transition: "all 0.2s" }}
        />

        {/* Ngada (Full Yellow Fill) */}
        <path
          d={regencySubPaths.ngada}
          fill={selectedRegency === "ngada" ? "#D39E00" : "#FFC107"}
          fillOpacity={selectedRegency === "all" || selectedRegency === "ngada" ? "0.85" : "0.3"}
          stroke="#0F2C59"
          strokeWidth={selectedRegency === "ngada" ? "2.5" : "1.5"}
          onClick={() => setSelectedRegency("ngada")}
          style={{ cursor: "pointer", transition: "all 0.2s" }}
        />

        {/* Ende (Full Yellow Fill) */}
        <path
          d={regencySubPaths.ende}
          fill={selectedRegency === "ende" ? "#D39E00" : "#FFC107"}
          fillOpacity={selectedRegency === "all" || selectedRegency === "ende" ? "0.85" : "0.3"}
          stroke="#0F2C59"
          strokeWidth={selectedRegency === "ende" ? "2.5" : "1.5"}
          onClick={() => setSelectedRegency("ende")}
          style={{ cursor: "pointer", transition: "all 0.2s" }}
        />

        {/* 3. Checkpoint Logistics Lines */}
        <path d="M 392,92 L 254,118" stroke="#DC3545" strokeWidth="2" strokeDasharray="3,3" fill="none" />
        <path d="M 694,201 Q 630,240 577,264" stroke="#198754" strokeWidth="2" strokeDasharray="4,3" fill="none" />

        {/* 4. Interactive Regency Nodes & Labels */}
        {REGENCY_NODES.map((node) => {
          const isSelected = selectedRegency === node.id;
          const nodeColor = getStatusColor(node.status);

          return (
            <g
              key={node.id}
              onClick={() => setSelectedRegency(node.id === selectedRegency ? "all" : node.id)}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: "pointer" }}
            >
              {isSelected && (
                <circle cx={node.cx} cy={node.cy} r="18" fill={nodeColor} opacity="0.3">
                  <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
                </circle>
              )}

              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.target ? 6 : 4}
                fill={node.target ? nodeColor : "#6C757D"}
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />

              <text
                x={node.cx}
                y={node.cy - 10}
                textAnchor="middle"
                fontSize={node.target ? "10" : "8"}
                fontWeight={node.target ? "700" : "500"}
                fill={isSelected ? "#0F2C59" : "#333333"}
                style={{ pointerEvents: "none" }}
              >
                {node.name.replace("Kabupaten ", "")}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredNode && (
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            background: "#FFFFFF",
            border: `2px solid ${getStatusColor(hoveredNode.status)}`,
            borderRadius: 6,
            padding: "10px 14px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            zIndex: 20,
            fontSize: 11,
            minWidth: 220,
          }}
        >
          <div style={{ fontWeight: 700, color: "#0F2C59", fontSize: 12 }}>{hoveredNode.name}</div>
          <div style={{ color: getStatusColor(hoveredNode.status), fontWeight: 700, marginTop: 2 }}>{hoveredNode.share}</div>
          <div style={{ marginTop: 6, borderTop: "1px solid #E9ECEF", paddingTop: 6, color: "#333333" }}>
            <div>Produksi: <b>{hoveredNode.production}</b></div>
            <div>Produktivitas: <b>{hoveredNode.productivity}</b></div>
          </div>
          {!hoveredNode.target && (
            <div style={{ fontSize: 9, color: "#DC3545", marginTop: 4, fontWeight: 600 }}>
              * Wilayah luar 5 sentra utama penelitian (Data N/A)
            </div>
          )}
        </div>
      )}
    </div>
  );
}
