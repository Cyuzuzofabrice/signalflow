import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Public pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Onboarding
import Onboarding from "./pages/Onboarding";

// SaaS pages
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadDetails from "./pages/LeadDetail";
import Signals from "./pages/Signals";
import Campaigns from "./pages/Campaigns";
import Messages from "./pages/Messages";
import Message from "./pages/Messages";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ONBOARDING */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* MAIN SIGNALFLOW WORKSPACE */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/:id" element={<LeadDetails />} />
        <Route path="/signals" element={<Signals />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:id" element={<Message />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />

        {/* DEMO */}
        <Route path="/demo" element={<Dashboard />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}