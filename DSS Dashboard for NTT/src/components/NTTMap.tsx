import { useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import nttPaths from "./ntt_paths.json";

interface RegencyNode {
  id: string;
  name: string;
  share: string;
  status: "secure" | "critical" | "warning";
  production: string;
  productivity: string;
  cx: number;
  cy: number;
}

const REGENCY_NODES: RegencyNode[] = [
  { id: "malaka", name: "Kabupaten Malaka", share: "50,46% Share (Sentra Utama)", status: "secure", production: "73.267 Ton", productivity: "12,59 Ton/Ha", cx: 694.9, cy: 201.7 },
  { id: "kupang", name: "Kabupaten Kupang", share: "12,68% Share (Penyangga)", status: "secure", production: "18.420 Ton", productivity: "9,96 Ton/Ha", cx: 577.0, cy: 264.1 },
  { id: "sikka", name: "Kabupaten Sikka", share: "Anjlok -84,71% (BDB Shock)", status: "critical", production: "3.200 Ton", productivity: "1,85 Ton/Ha", cx: 392.5, cy: 92.7 },
  { id: "matim", name: "Manggarai Timur", share: "Anjlok -78,68% (BDB Shock)", status: "critical", production: "4.150 Ton", productivity: "1,98 Ton/Ha", cx: 209.9, cy: 111.2 },
  { id: "ngada", name: "Kabupaten Ngada", share: "Anjlok -45,24% (Waspada BDB)", status: "warning", production: "5.800 Ton", productivity: "3,20 Ton/Ha", cx: 254.2, cy: 118.2 },
  { id: "ende", name: "Kabupaten Ende", share: "Watchlist (Ende)", status: "warning", production: "7.400 Ton", productivity: "4,10 Ton/Ha", cx: 327.9, cy: 118.2 },
  { id: "flotim", name: "Flores Timur", share: "Watchlist (Larantuka)", status: "warning", production: "6.900 Ton", productivity: "3,80 Ton/Ha", cx: 478.7, cy: 60.3 },
  { id: "sumba_timur", name: "Sumba Timur", share: "Penyangga Sumba", status: "secure", production: "11.200 Ton", productivity: "6,50 Ton/Ha", cx: 170.2, cy: 212.1 },
  { id: "rote", name: "Rote Ndao", share: "Penyangga Selatan", status: "secure", production: "5.100 Ton", productivity: "5,10 Ton/Ha", cx: 487.8, cy: 337.0 },
];

export default function NTTMap() {
  const { selectedRegency, setSelectedRegency } = useDashboard();
  const [hoveredNode, setHoveredNode] = useState<RegencyNode | null>(null);

  const getStatusColor = (status: string) => {
    if (status === "secure") return "#198754";
    if (status === "critical") return "#DC3545";
    return "#FFC107";
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#F4F7FB", borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Map Control Overlay */}
      <div style={{ position: "absolute", top: 12, left: 14, zIndex: 10, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)", border: "1px solid #DEE2E6", borderRadius: 4, padding: "6px 12px", fontSize: 11 }}>
        <div style={{ fontWeight: 700, color: "#0F2C59" }}>GeoJSON Official Boundary NTT (22 Kab/Kota)</div>
        <div style={{ fontSize: 10, color: "#6C757D", marginTop: 2, display: "flex", gap: 10 }}>
          <span style={{ color: "#198754", fontWeight: 600 }}>● Hijau: Sentra Penyangga (Malaka)</span>
          <span style={{ color: "#DC3545", fontWeight: 600 }}>● Merah: Syok BDB (Flores)</span>
          <span style={{ color: "#FFC107", fontWeight: 600 }}>● Kuning: Watchlist</span>
        </div>
      </div>

      {/* Main SVG GeoJSON Map */}
      <svg viewBox="0 0 750 380" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.06))" }}>
        <defs>
          {/* Flow Line Gradient */}
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#198754" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0DCAF0" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* 1. Base GeoJSON Polygon Paths of NTT Islands */}
        <g>
          {nttPaths.map((pathStr: string, idx: number) => (
            <path
              key={idx}
              d={pathStr}
              fill="#E9ECEF"
              stroke="#CED4DA"
              strokeWidth="1.2"
              style={{ transition: "all 0.3s" }}
            />
          ))}
        </g>

        {/* 2. Logistics & Checkpoint Flow Lines */}
        {/* Malaka -> Kupang */}
        <path d="M 694,201 Q 630,240 577,264" stroke="url(#flowGrad)" strokeWidth="2.5" strokeDasharray="5,3" fill="none" />
        {/* Sikka -> Matim Checkpoint */}
        <path d="M 392,92 L 209,111" stroke="#DC3545" strokeWidth="2" strokeDasharray="3,3" fill="none" />

        {/* 3. Interactive Regency Nodes */}
        {REGENCY_NODES.map((node) => {
          const isSelected = selectedRegency === node.id || selectedRegency === "all";
          const isHighlighted = selectedRegency === node.id;
          const nodeColor = getStatusColor(node.status);

          return (
            <g
              key={node.id}
              onClick={() => setSelectedRegency(node.id === selectedRegency ? "all" : node.id)}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Highlight Pulsing Outer Ring */}
              {(isHighlighted || hoveredNode?.id === node.id) && (
                <circle cx={node.cx} cy={node.cy} r={node.id === "malaka" ? 22 : 16} fill={nodeColor} opacity="0.25">
                  <animate attributeName="r" values="14;24;14" dur="2s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Main Node Circle */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.id === "malaka" ? 12 : 8}
                fill={nodeColor}
                stroke="#FFFFFF"
                strokeWidth="2"
                opacity={isSelected ? 1 : 0.4}
                style={{ transition: "all 0.2s" }}
              />

              {/* Node Label Text */}
              <text
                x={node.cx}
                y={node.cy - (node.id === "malaka" ? 16 : 12)}
                textAnchor="middle"
                fontSize={node.id === "malaka" ? "11" : "9.5"}
                fontWeight="700"
                fill={isSelected ? "#0F2C59" : "#6C757D"}
                style={{ pointerEvents: "none" }}
              >
                {node.name.replace("Kabupaten ", "")}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Hover Tooltip Card */}
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
            minWidth: 200,
          }}
        >
          <div style={{ fontWeight: 700, color: "#0F2C59", fontSize: 12 }}>{hoveredNode.name}</div>
          <div style={{ color: getStatusColor(hoveredNode.status), fontWeight: 600, marginTop: 2 }}>{hoveredNode.share}</div>
          <div style={{ marginTop: 6, borderTop: "1px solid #E9ECEF", paddingTop: 6, color: "#333333" }}>
            <div>Produksi 2025: <b>{hoveredNode.production}</b></div>
            <div>Produktivitas: <b>{hoveredNode.productivity}</b></div>
          </div>
          <div style={{ fontSize: 9, color: "#6C757D", marginTop: 4, fontStyle: "italic" }}>
            Klik poligon/node untuk menyaring data dashboard
          </div>
        </div>
      )}
    </div>
  );
}
