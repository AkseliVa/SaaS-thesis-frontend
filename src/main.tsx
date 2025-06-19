import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes } from "react-router";
import { Route } from 'react-router';
import Dashboard from './pages/Dashboard.tsx';
import Employees from './pages/Employees.tsx';
import Projects from './pages/Projects.tsx';
import Calendar from './pages/Calendar.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="employees" element={<Employees />} />
      <Route path="projects" element={<Projects />} />
      <Route path="calendar" element={<Calendar />} />
    </Routes>
  </BrowserRouter>,
)
