import { useEffect, useRef } from "react";
import { useDashboard } from "../context/DashboardContext";

declare const L: any;

interface RegencyGeoNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: "secure" | "critical" | "warning" | "na";
  share: string;
  production: string;
  productivity: string;
}

const REGION_NODES: RegencyGeoNode[] = [
  { id: "malaka", name: "Kabupaten Malaka", lat: -9.56, lng: 124.89, status: "secure", share: "50,46% Pangsa (Sentra Penyangga)", production: "73.267 Ton", productivity: "12,59 Ton/Ha" },
  { id: "sikka", name: "Kabupaten Sikka", lat: -8.62, lng: 122.22, status: "critical", share: "Anjlok -84,71% (Kritis BDB)", production: "3.200 Ton", productivity: "1,85 Ton/Ha" },
  { id: "matim", name: "Manggarai Timur", lat: -8.78, lng: 120.61, status: "critical", share: "Anjlok -78,68% (Kritis BDB)", production: "4.150 Ton", productivity: "1,98 Ton/Ha" },
  { id: "ngada", name: "Kabupaten Ngada", lat: -8.84, lng: 121.00, status: "warning", share: "Anjlok -21,86% (Risiko BDB)", production: "5.800 Ton", productivity: "3,20 Ton/Ha" },
  { id: "ende", name: "Kabupaten Ende", lat: -8.84, lng: 121.65, status: "warning", share: "Watchlist (Beranga Kelimutu)", production: "7.400 Ton", productivity: "4,10 Ton/Ha" },
  { id: "kupang_kab", name: "Kabupaten Kupang", lat: -10.05, lng: 123.85, status: "na", share: "Luar Fokus Penelitian", production: "18.420 Ton", productivity: "5,10 Ton/Ha" },
  { id: "kupang_kota", name: "Kota Kupang", lat: -10.17, lng: 123.58, status: "na", share: "Luar Fokus Penelitian", production: "1.200 Ton", productivity: "4,00 Ton/Ha" },
  { id: "belu", name: "Kabupaten Belu", lat: -9.10, lng: 124.88, status: "na", share: "Luar Fokus Penelitian", production: "8.500 Ton", productivity: "4,50 Ton/Ha" },
  { id: "flotim", name: "Flores Timur", lat: -8.34, lng: 122.98, status: "na", share: "Luar Fokus Penelitian", production: "6.900 Ton", productivity: "3,80 Ton/Ha" },
  { id: "lembata", name: "Kabupaten Lembata", lat: -8.38, lng: 123.55, status: "na", share: "Luar Fokus Penelitian", production: "4.200 Ton", productivity: "3,50 Ton/Ha" },
  { id: "alor", name: "Kabupaten Alor", lat: -8.22, lng: 124.55, status: "na", share: "Luar Fokus Penelitian", production: "5.100 Ton", productivity: "4,10 Ton/Ha" },
  { id: "sumba_timur", name: "Sumba Timur", lat: -9.65, lng: 120.26, status: "na", share: "Luar Fokus Penelitian", production: "11.200 Ton", productivity: "4,80 Ton/Ha" },
  { id: "rote", name: "Rote Ndao", lat: -10.73, lng: 123.06, status: "na", share: "Luar Fokus Penelitian", production: "5.100 Ton", productivity: "3,90 Ton/Ha" },
];

export default function NTTMap() {
  const { selectedRegency, setSelectedRegency } = useDashboard();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const getStatusColor = (status: string) => {
    if (status === "secure") return "#198754";
    if (status === "critical") return "#DC3545";
    if (status === "warning") return "#D39E00";
    return "#64748B";
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (typeof L === "undefined") return;

    if (!mapInstanceRef.current) {
      // Initialize Leaflet Map centered on NTT
      const map = L.map(mapContainerRef.current, {
        center: [-9.1, 122.4],
        zoom: 7.5,
        zoomControl: false,
        attributionControl: false,
      });

      // CartoDB Light Tile Layer (High Resolution Clean Basemap)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 14,
        subdomains: "abcd",
      }).addTo(map);

      // Add Zoom Control at Top Right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Add Checkpoint Polyline Flow Vectors
      const transFloresCoords = [
        [-8.62, 122.22], // Sikka
        [-8.84, 121.65], // Ende
        [-8.84, 121.00], // Ngada
        [-8.78, 120.61], // Matim
      ];
      L.polyline(transFloresCoords, {
        color: "#DC3545",
        weight: 2.5,
        dashArray: "6, 6",
        opacity: 0.8,
      }).addTo(map);

      const malakaSupplyRoute = [
        [-9.56, 124.89], // Malaka
        [-10.05, 123.85], // Kupang
      ];
      L.polyline(malakaSupplyRoute, {
        color: "#198754",
        weight: 2.5,
        dashArray: "6, 6",
        opacity: 0.8,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Remove previous markers
    map.eachLayer((layer: any) => {
      if (layer instanceof L.CircleMarker || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add High Resolution Interactive Circle Markers
    REGION_NODES.forEach((node) => {
      const color = getStatusColor(node.status);
      const isSelected = selectedRegency === node.id;
      const radius = node.status !== "na" ? (isSelected ? 16 : 12) : 6;

      // Translucent Outer Halo Circle
      if (node.status !== "na") {
        L.circleMarker([node.lat, node.lng], {
          radius: radius + 6,
          fillColor: color,
          fillOpacity: 0.2,
          stroke: false,
        }).addTo(map);
      }

      // Inner Solid Core Circle
      const marker = L.circleMarker([node.lat, node.lng], {
        radius: radius,
        fillColor: color,
        fillOpacity: 0.9,
        color: "#FFFFFF",
        weight: 2,
      }).addTo(map);

      // Popup Content Card
      const popupHtml = `
        <div style="font-family:'Space Mono',monospace; font-size:11px; color:#0F172A; min-width:180px;">
          <div style="font-weight:700; font-size:12px; color:#0F2C59; margin-bottom:2px;">${node.name}</div>
          <div style="font-size:10px; color:${color}; font-weight:700; margin-bottom:6px;">${node.share}</div>
          <div style="border-top:1px solid #E2E8F0; padding-top:4px; font-size:10px;">
            <div><b>Produksi:</b> ${node.production}</div>
            <div><b>Produktivitas:</b> ${node.productivity}</div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on("click", () => {
        setSelectedRegency(node.id === selectedRegency ? "all" : node.id);
      });
    });
  }, [selectedRegency]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 6,
        overflow: "hidden",
        border: "1px solid #CBD5E1",
      }}
    >
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />

      {/* Footer Minimalist Legend Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 12,
          zIndex: 1000,
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
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <span style={{ color: "#198754", fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, background: "#198754", borderRadius: "50%", display: "inline-block" }}></span>
          Malaka (Penyangga)
        </span>
        <span style={{ color: "#DC3545", fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, background: "#DC3545", borderRadius: "50%", display: "inline-block" }}></span>
          Sikka &amp; Matim (Kritis BDB)
        </span>
        <span style={{ color: "#D39E00", fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, background: "#D39E00", borderRadius: "50%", display: "inline-block" }}></span>
          Ngada &amp; Ende (Risiko)
        </span>
      </div>
    </div>
  );
}
