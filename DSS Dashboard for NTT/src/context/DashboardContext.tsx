import React, { createContext, useContext, useState } from "react";

export interface InterventionSettings {
  seedCoverage: number;
  sanitationCoverage: number;
  quarantineEff: number;
}

export interface MonthPeriod {
  key: string;
  label: string;
  year: number;
  monthIdx: number; // 0..11
  season: "wet" | "dry" | "trans";
  bmkgWeight: number;
  ewsAlert: boolean;
}

export const ALL_REGENCIES = [
  { id: "all", name: "Seluruh 22 Kabupaten/Kota", target: false },
  { id: "malaka", name: "Kabupaten Malaka", target: true, status: "Secure Buffer (50,46%)", share: 0.5046, color: "#198754" },
  { id: "sikka", name: "Kabupaten Sikka", target: true, status: "Critical BDB (-84,71%)", share: 0.0220, color: "#DC3545" },
  { id: "matim", name: "Manggarai Timur", target: true, status: "Critical BDB (-78,68%)", share: 0.0286, color: "#DC3545" },
  { id: "ngada", name: "Kabupaten Ngada", target: true, status: "High Risk BDB (-21,86%)", share: 0.0399, color: "#FFC107" },
  { id: "ende", name: "Kabupaten Ende", target: true, status: "Watchlist (Beranga Kelimutu)", share: 0.0510, color: "#FFC107" },
  // Non-target regencies
  { id: "kupang_kab", name: "Kabupaten Kupang", target: false },
  { id: "kupang_kota", name: "Kota Kupang", target: false },
  { id: "belu", name: "Kabupaten Belu", target: false },
  { id: "ttu", name: "Timor Tengah Utara", target: false },
  { id: "tts", name: "Timor Tengah Selatan", target: false },
  { id: "flotim", name: "Flores Timur", target: false },
  { id: "lembata", name: "Kabupaten Lembata", target: false },
  { id: "alor", name: "Kabupaten Alor", target: false },
  { id: "nagekeo", name: "Kabupaten Nagekeo", target: false },
  { id: "manggarai", name: "Kabupaten Manggarai", target: false },
  { id: "mabar", name: "Manggarai Barat", target: false },
  { id: "sumba_timur", name: "Sumba Timur", target: false },
  { id: "sumba_barat", name: "Sumba Barat", target: false },
  { id: "sumba_tengah", name: "Sumba Tengah", target: false },
  { id: "sumba_bd", name: "Sumba Barat Daya", target: false },
  { id: "rote", name: "Rote Ndao", target: false },
  { id: "sabu", name: "Sabu Raijua", target: false },
];

const BMKG_WEIGHTS = [0.105, 0.108, 0.112, 0.095, 0.082, 0.068, 0.062, 0.064, 0.072, 0.078, 0.096, 0.108];
const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// Generate 36 Months Array (2026, 2027, 2028)
export const MONTHS_36: MonthPeriod[] = [];
[2026, 2027, 2028].forEach((yr) => {
  MONTH_NAMES.forEach((mName, mIdx) => {
    const w = BMKG_WEIGHTS[mIdx];
    const isDry = mIdx >= 5 && mIdx <= 7; // Jun, Jul, Aug
    MONTHS_36.push({
      key: `${yr}-${String(mIdx + 1).padStart(2, "0")}`,
      label: `${mName} ${yr}${mIdx === 2 ? " (Puncak Panen)" : isDry ? " (EWS Kemarau)" : ""}`,
      year: yr,
      monthIdx: mIdx,
      season: isDry ? "dry" : mIdx >= 11 || mIdx <= 2 ? "wet" : "trans",
      bmkgWeight: w,
      ewsAlert: isDry,
    });
  });
});

// Yearly Baseline Annual Projections (Ton)
export const ANNUAL_BASELINE: Record<number, number> = {
  2025: 145200,
  2026: 145200,
  2027: 152000,
  2028: 160500,
};

interface DashboardContextType {
  selectedRegency: string;
  setSelectedRegency: (regency: string) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  interventionSettings: InterventionSettings;
  setInterventionSettings: React.Dispatch<React.SetStateAction<InterventionSettings>>;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  resetFilters: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [selectedRegency, setSelectedRegencyState] = useState<string>("all");
  const [selectedMonth, setSelectedMonthState] = useState<string>("all");
  const [interventionSettings, setInterventionSettings] = useState<InterventionSettings>({
    seedCoverage: 65,
    sanitationCoverage: 80,
    quarantineEff: 90,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const setSelectedRegency = (regency: string) => {
    setSelectedRegencyState(regency);
    const regObj = ALL_REGENCIES.find((r) => r.id === regency);
    const name = regObj ? regObj.name : regency;
    if (regObj && !regObj.target && regency !== "all") {
      showToast(`Filter: ${name} (Wilayah Luar Fokus 5 Sentra Utama - Data N/A)`);
    } else {
      showToast(`Filter Kabupaten diperbarui: ${name}`);
    }
  };

  const setSelectedMonth = (monthKey: string) => {
    setSelectedMonthState(monthKey);
    let label = "Seluruh 36 Bulan (2026–2028)";
    if (monthKey.startsWith("yr-")) {
      label = `Tahun ${monthKey.replace("yr-", "")} (12 Bulan)`;
    } else if (monthKey !== "all") {
      const mObj = MONTHS_36.find((m) => m.key === monthKey);
      if (mObj) label = mObj.label;
    }
    showToast(`Filter Periode: ${label}`);
  };

  const resetFilters = () => {
    setSelectedRegencyState("all");
    setSelectedMonthState("all");
    showToast("Seluruh Filter Berhasil Di-reset ke Default");
  };

  return (
    <DashboardContext.Provider
      value={{
        selectedRegency,
        setSelectedRegency,
        selectedMonth,
        setSelectedMonth,
        interventionSettings,
        setInterventionSettings,
        toastMessage,
        showToast,
        resetFilters,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
