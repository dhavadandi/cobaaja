import React, { createContext, useContext, useState } from "react";

export interface InterventionSettings {
  seedCoverage: number;
  sanitationCoverage: number;
  quarantineEff: number;
}

interface DashboardContextType {
  selectedRegency: string;
  setSelectedRegency: (regency: string) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  viewMode: "executive" | "operational";
  setViewMode: (mode: "executive" | "operational") => void;
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
  const [viewMode, setViewModeState] = useState<"executive" | "operational">("executive");
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
    }, 4000);
  };

  const setSelectedRegency = (regency: string) => {
    setSelectedRegencyState(regency);
    const regencyNames: Record<string, string> = {
      all: "Seluruh 22 Kabupaten/Kota",
      malaka: "Kabupaten Malaka",
      kupang: "Kabupaten Kupang",
      sikka: "Kabupaten Sikka",
      matim: "Manggarai Timur",
      ngada: "Kabupaten Ngada",
      ende: "Kabupaten Ende",
    };
    showToast(`Filter Kabupaten diperbarui: ${regencyNames[regency] || regency}`);
  };

  const setSelectedMonth = (month: string) => {
    setSelectedMonthState(month);
    showToast(`Filter Periode Bulan diperbarui: ${month === "all" ? "Seluruh Bulan 2026" : month.toUpperCase() + " 2026"}`);
  };

  const setViewMode = (mode: "executive" | "operational") => {
    setViewModeState(mode);
    showToast(`Mode Tampilan beralih ke: ${mode === "executive" ? "Executive Summary View" : "Operational Technical View"}`);
  };

  const resetFilters = () => {
    setSelectedRegencyState("all");
    setSelectedMonthState("all");
    setViewModeState("executive");
    showToast("Seluruh Filter Filter Berhasil Di-reset ke Default");
  };

  return (
    <DashboardContext.Provider
      value={{
        selectedRegency,
        setSelectedRegency,
        selectedMonth,
        setSelectedMonth,
        viewMode,
        setViewMode,
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
