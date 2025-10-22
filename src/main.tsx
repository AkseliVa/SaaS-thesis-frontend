import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Projects from "./pages/Projects";
import Calendar from "./pages/Calendar";
import Customers from "./pages/Customers";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import theme from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

export function App() {
  const token = localStorage.getItem("token");

  if (!window.sessionStorage.getItem("sessionStarted")) {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    localStorage.removeItem("companyId");
    window.sessionStorage.setItem("sessionStarted", "true");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => window.location.reload()} />} />

        <Route path="/dashboard" element={<ProtectedRoute token={token}><Dashboard /></ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute token={token}><Employees /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute token={token}><Projects /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute token={token}><Calendar /></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute token={token}><Customers /></ProtectedRoute>} />

        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
      </Routes>

    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
      <App />
  </ThemeProvider>
  
);
