import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardProvider, useDashboard } from "./context/DashboardContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FilterChipsBar from "./components/FilterChipsBar";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";

function ToastNotification() {
  const { toastMessage } = useDashboard();
  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        background: "#0F2C59",
        color: "#FFFFFF",
        borderLeft: "4px solid #E62129",
        borderRadius: 4,
        padding: "12px 18px",
        fontSize: 12,
        fontWeight: 600,
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <span style={{ color: "#E62129", fontSize: 16 }}>●</span>
      <span>{toastMessage}</span>
    </div>
  );
}

function MainLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#F8F9FA",
        overflow: "hidden",
      }}
    >
      <Header />
      <FilterChipsBar />
      <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Routes>
            <Route path="/" element={<Page1 />} />
            <Route path="/peta-spasial" element={<Page2 />} />
            <Route path="/forecasting" element={<Page3 />} />
            <Route path="/simulator" element={<Page4 />} />
            <Route path="/action-matrix" element={<Page5 />} />
            <Route path="/data-explorer" element={<Page6 />} />
          </Routes>
        </main>
      </div>
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </DashboardProvider>
  );
}
