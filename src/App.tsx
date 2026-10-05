import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";

function Placeholder({
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f3] px-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/30">
          SignalFlow
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
          {title}
        </h1>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Placeholder title="Create your account" />}
        />

        <Route
          path="/forgot-password"
          element={<Placeholder title="Reset your password" />}
        />

        {/* App */}
        <Route
          path="/onboarding"
          element={<Placeholder title="Set up your workspace" />}
        />

        <Route
          path="/dashboard"
          element={<Placeholder title="Dashboard" />}
        />

        <Route
          path="/leads"
          element={<Placeholder title="Opportunities" />}
        />

        <Route
          path="/signals"
          element={<Placeholder title="Signals" />}
        />

        <Route
          path="/campaigns"
          element={<Placeholder title="Campaigns" />}
        />

        <Route
          path="/messages"
          element={<Placeholder title="Messages" />}
        />

        <Route
          path="/analytics"
          element={<Placeholder title="Analytics" />}
        />

        <Route
          path="/settings"
          element={<Placeholder title="Settings" />}
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}