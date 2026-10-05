import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  BriefcaseBusiness,
  ChevronRight,
  CircleDollarSign,
  Gauge,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getWorkspace,
  getWorkspaceDetails,
  logoutUser,
  type WorkspaceDetails,
} from "../lib/api";

type Signal = {
  id: number;
  company: string;
  signal: string;
  score: number;
  time: string;
  type: "high" | "medium" | "low";
};

type Opportunity = {
  id: number;
  company: string;
  role: string;
  score: number;
  signal: string;
  time: string;
};

const recentSignals: Signal[] = [
  {
    id: 1,
    company: "Acme Technologies",
    signal: "Hiring engineering team",
    score: 94,
    time: "8 min ago",
    type: "high",
  },
  {
    id: 2,
    company: "Northstar Labs",
    signal: "Searching for automation",
    score: 87,
    time: "24 min ago",
    type: "high",
  },
  {
    id: 3,
    company: "Vertex Systems",
    signal: "New product launch",
    score: 76,
    time: "41 min ago",
    type: "medium",
  },
  {
    id: 4,
    company: "Orbit Digital",
    signal: "Growing engineering team",
    score: 68,
    time: "1 hr ago",
    type: "medium",
  },
];

const opportunities: Opportunity[] = [
  {
    id: 1,
    company: "Acme Technologies",
    role: "Head of Engineering",
    score: 94,
    signal: "Hiring",
    time: "8 min ago",
  },
  {
    id: 2,
    company: "Northstar Labs",
    role: "Founder",
    score: 87,
    signal: "Automation",
    time: "24 min ago",
  },
  {
    id: 3,
    company: "Vertex Systems",
    role: "VP Product",
    score: 76,
    signal: "Expansion",
    time: "41 min ago",
  },
];

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Opportunities",
    href: "/leads",
    icon: BriefcaseBusiness,
    active: false,
  },
  {
    label: "Buying signals",
    href: "/signals",
    icon: Zap,
    active: false,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: MessageSquare,
    active: false,
  },
  {
    label: "Campaigns",
    href: "/campaigns",
    icon: Target,
    active: false,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    active: false,
  },
];

function scoreClass(score: number) {
  if (score >= 80) {
    return "text-emerald-600";
  }

  if (score >= 50) {
    return "text-amber-600";
  }

  return "text-black/45";
}

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  description,
}: {
  icon: typeof Activity;
  label: string;
  value: string | number;
  change?: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.035]">
          <Icon className="h-4 w-4 text-black/55" />
        </div>

        {change && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            {change}
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-black/35">
          {label}
        </p>

        <p className="mt-1 text-2xl font-semibold tracking-tight text-black">
          {value}
        </p>

        <p className="mt-1 text-[10px] text-black/40">
          {description}
        </p>
      </div>
    </div>
  );
}

function SideNav({
  onLogout,
}: {
  onLogout: () => void;
}) {
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[230px] border-r border-black/[0.06] bg-[#f7f7f5] lg:block">
      <div className="flex h-full flex-col px-4 py-5">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2.5 px-3 py-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white">
            <Sparkles className="h-4 w-4" />
          </div>

          <div>
            <p className="text-[13px] font-semibold tracking-tight text-black">
              SignalFlow
            </p>

            <p className="text-[9px] text-black/35">
              Intelligence platform
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="mt-9">
          <p className="px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/30">
            Workspace
          </p>

          <nav className="mt-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-[12px] font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30 ${
                    item.active
                      ? "border-black/[0.07] bg-white text-black shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                      : "border-transparent text-black/50 hover:border-black/[0.05] hover:bg-white/70 hover:text-black"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      item.active
                        ? "text-violet-600"
                        : "text-black/35 group-hover:text-black/70"
                    }`}
                  />

                  <span>{item.label}</span>

                  {item.label === "Buying signals" && (
                    <span className="ml-auto rounded-full bg-violet-100 px-1.5 py-0.5 text-[8px] font-semibold text-violet-700">
                      AI
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom navigation */}
        <div className="mt-auto">
          <Link
            to="/settings"
            className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-[12px] font-medium text-black/50 transition hover:border-black/[0.05] hover:bg-white/70 hover:text-black"
          >
            <Settings className="h-4 w-4 text-black/35 group-hover:text-black/70" />

            <span>Settings</span>
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="group mt-1 flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left text-[12px] font-medium text-black/50 transition hover:border-red-500/10 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4 text-black/35 transition group-hover:text-red-500" />

            <span>Logout</span>
          </button>

          {/* AI card */}
          <div className="mt-4 rounded-2xl bg-black p-4 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-violet-300" />

              <span className="text-[10px] font-semibold">
                AI intelligence
              </span>
            </div>

            <p className="mt-2 text-[10px] leading-5 text-white/55">
              SignalFlow is continuously looking for opportunities that match
              your ideal customer.
            </p>

            <Link
              to="/signals"
              className="mt-4 inline-flex items-center gap-1 text-[9px] font-semibold text-white transition hover:text-violet-300"
            >
              View signals

              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [workspace, setWorkspace] =
    useState<WorkspaceDetails | null>(null);

  const [loading, setLoading] = useState(true);

  function handleLogout() {
    logoutUser();
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    async function loadWorkspace() {
      try {
        const storedWorkspace = getWorkspace();

        if (!storedWorkspace?.id) {
          setLoading(false);
          return;
        }

        const details = await getWorkspaceDetails(
          storedWorkspace.id,
        );

        setWorkspace(details);
      } catch (error) {
        console.error(
          "Unable to load workspace:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    loadWorkspace();
  }, []);

  const workspaceName =
    workspace?.name ||
    getWorkspace()?.name ||
    "Your workspace";

  const leadCount =
    workspace?.stats.leads ?? 128;

  const signalCount =
    workspace?.stats.signals ?? 42;

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-black">
      <SideNav onLogout={handleLogout} />

      <main className="min-h-screen lg:pl-[230px]">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-black/[0.06] bg-[#f7f7f5]/90 backdrop-blur-xl">
          <div className="flex h-[70px] items-center justify-between px-5 sm:px-8 xl:px-10">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-black/35">
                Overview
              </p>

              <h1 className="mt-1 text-[18px] font-semibold tracking-tight">
                {loading
                  ? "Loading workspace..."
                  : workspaceName}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                type="button"
                className="hidden h-9 w-9 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-black/45 transition hover:text-black sm:flex"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Notifications */}
              <button
                type="button"
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-black/45 transition hover:text-black"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />

                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-600" />
              </button>

              {/* Avatar */}
              <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-xl bg-black text-[10px] font-semibold text-white">
                SF
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 xl:px-10">
          {/* Hero */}
          <section className="flex flex-col justify-between gap-6 rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.025)] md:flex-row md:items-center md:p-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[9px] font-semibold text-violet-700">
                <Sparkles className="h-3 w-3" />

                AI opportunity intelligence
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Find the right opportunity
                <br />

                <span className="text-black/35">
                  before everyone else.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-[12px] leading-6 text-black/45">
                SignalFlow watches for commercial intent and turns real-world
                signals into opportunities your team can act on.
              </p>
            </div>

            {/* View live signals */}
            <Link
              to="/signals"
              className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#111] px-5 py-3 text-[11px] font-semibold leading-none text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
            >
              <span className="text-white">
                View live signals
              </span>

              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </section>

          {/* Metrics */}
          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              icon={BriefcaseBusiness}
              label="Opportunities"
              value={leadCount}
              change="+18%"
              description="Potential opportunities discovered"
            />

            <MetricCard
              icon={Zap}
              label="Buying signals"
              value={signalCount}
              change="+24%"
              description="High-intent signals detected"
            />

            <MetricCard
              icon={Gauge}
              label="Avg. intent"
              value="78%"
              change="+9%"
              description="Average opportunity score"
            />

            <MetricCard
              icon={MessageSquare}
              label="Conversations"
              value="36"
              change="+16%"
              description="Outreach opportunities ready"
            />
          </section>

          {/* Main content */}
          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.6fr)]">
            {/* Recent signals */}
            <div className="rounded-[24px] border border-black/[0.06] bg-white shadow-[0_6px_25px_rgba(0,0,0,0.025)]">
              <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-violet-600" />

                    <h3 className="text-[13px] font-semibold">
                      Recent signals
                    </h3>
                  </div>

                  <p className="mt-1 text-[10px] text-black/40">
                    Latest buying intent detected by SignalFlow
                  </p>
                </div>

                <Link
                  to="/signals"
                  className="text-[10px] font-semibold text-black/45 transition hover:text-black"
                >
                  View all
                </Link>
              </div>

              <div className="divide-y divide-black/[0.05]">
                {recentSignals.map((signal) => (
                  <Link
                    key={signal.id}
                    to="/signals"
                    className="group flex items-center gap-4 px-5 py-4 transition hover:bg-black/[0.015]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                      <Zap className="h-4 w-4 text-violet-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-[11px] font-semibold">
                          {signal.company}
                        </p>

                        <span className="rounded-full bg-black/[0.035] px-2 py-0.5 text-[8px] font-medium text-black/40">
                          {signal.time}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-[10px] text-black/45">
                        {signal.signal}
                      </p>
                    </div>

                    <div className="hidden text-right sm:block">
                      <p
                        className={`text-[12px] font-semibold ${scoreClass(
                          signal.score,
                        )}`}
                      >
                        {signal.score}
                      </p>

                      <p className="mt-0.5 text-[8px] uppercase tracking-[0.12em] text-black/25">
                        intent
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 shrink-0 text-black/20 transition group-hover:translate-x-0.5 group-hover:text-black/50" />
                  </Link>
                ))}
              </div>

              {/* Explore all signals */}
              <Link
                to="/signals"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap border-t border-white/[0.08] bg-[#111] px-5 py-4 text-[10px] font-semibold leading-none text-white transition-all duration-200 hover:bg-black"
              >
                <span className="text-white">
                  Explore all signals
                </span>

                <ArrowRight className="h-3 w-3 shrink-0 text-white transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* AI panel */}
            <div className="relative overflow-hidden rounded-[24px] bg-violet-600 p-6 text-white shadow-[0_12px_35px_rgba(109,40,217,0.18)]">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>

                  <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/75">
                    AI active
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  Your AI found something.
                </h3>

                <p className="mt-3 text-[11px] leading-5 text-white/65">
                  A company matching your ideal customer profile appears to
                  have strong commercial intent.
                </p>

                {/* AI signal */}
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.15em] text-white/45">
                        Signal
                      </p>

                      <p className="mt-1 text-[11px] font-semibold text-white">
                        Hiring engineering talent
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-semibold">
                        94
                      </p>

                      <p className="text-[8px] uppercase tracking-[0.12em] text-white/40">
                        intent
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[94%] rounded-full bg-white" />
                  </div>
                </div>

                {/* Explore hiring signals */}
                <Link
                  to="/signals"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "20px",
                    minHeight: "40px",
                    padding: "10px 16px",
                    borderRadius: "12px",
                    backgroundColor: "#111111",
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: 600,
                    lineHeight: "1",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      color: "#ffffff",
                      visibility: "visible",
                      opacity: 1,
                    }}
                  >
                    Explore hiring signals
                  </span>

                  <ArrowRight
                    style={{
                      color: "#ffffff",
                      width: "12px",
                      height: "12px",
                      flexShrink: 0,
                    }}
                  />
                </Link>
              </div>
            </div>
          </section>

          {/* Bottom section */}
          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            {/* Opportunities */}
            <div className="rounded-[24px] border border-black/[0.06] bg-white shadow-[0_6px_25px_rgba(0,0,0,0.025)]">
              <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-5">
                <div>
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-violet-600" />

                    <h3 className="text-[13px] font-semibold">
                      Opportunities
                    </h3>
                  </div>

                  <p className="mt-1 text-[10px] text-black/40">
                    Highest-intent accounts ready for action
                  </p>
                </div>

                <Link
                  to="/leads"
                  className="inline-flex items-center gap-1 rounded-full border border-black/[0.07] bg-white px-3 py-2 text-[9px] font-semibold text-black/55 transition hover:border-black/[0.12] hover:text-black"
                >
                  View all

                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="divide-y divide-black/[0.05]">
                {opportunities.map((opportunity) => (
                  <Link
                    key={opportunity.id}
                    to={`/leads/${opportunity.id}`}
                    className="group flex items-center gap-4 px-5 py-4 transition hover:bg-black/[0.015]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.035]">
                      <Users className="h-4 w-4 text-black/45" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold">
                        {opportunity.company}
                      </p>

                      <p className="mt-1 truncate text-[10px] text-black/40">
                        {opportunity.role}
                      </p>
                    </div>

                    <div className="hidden items-center gap-2 sm:flex">
                      <span className="rounded-full bg-violet-50 px-2 py-1 text-[8px] font-semibold text-violet-600">
                        {opportunity.signal}
                      </span>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-[12px] font-semibold ${scoreClass(
                          opportunity.score,
                        )}`}
                      >
                        {opportunity.score}
                      </p>

                      <p className="mt-0.5 text-[8px] text-black/25">
                        {opportunity.time}
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 shrink-0 text-black/20 transition group-hover:translate-x-0.5 group-hover:text-black/50" />
                  </Link>
                ))}
              </div>
            </div>

            {/* ICP coverage */}
            <div className="rounded-[24px] border border-black/[0.06] bg-white p-5 shadow-[0_6px_25px_rgba(0,0,0,0.025)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-violet-600" />

                    <h3 className="text-[13px] font-semibold">
                      ICP coverage
                    </h3>
                  </div>

                  <p className="mt-1 text-[10px] text-black/40">
                    How closely detected opportunities match your profile
                  </p>
                </div>

                <Link
                  to="/settings"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.06] text-black/35 transition hover:bg-black/[0.03] hover:text-black"
                  aria-label="Edit ICP"
                >
                  <Settings className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-7 flex items-center gap-6">
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[10px] border-violet-100">
                  <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-t-violet-600 border-r-violet-600" />

                  <div className="text-center">
                    <p className="text-2xl font-semibold tracking-tight">
                      86%
                    </p>

                    <p className="text-[8px] uppercase tracking-[0.12em] text-black/30">
                      match
                    </p>
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-black/45">
                        Industry
                      </span>

                      <span className="text-[9px] font-semibold">
                        92%
                      </span>
                    </div>

                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/[0.05]">
                      <div className="h-full w-[92%] rounded-full bg-violet-600" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-black/45">
                        Company size
                      </span>

                      <span className="text-[9px] font-semibold">
                        84%
                      </span>
                    </div>

                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/[0.05]">
                      <div className="h-full w-[84%] rounded-full bg-violet-600" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-black/45">
                        Location
                      </span>

                      <span className="text-[9px] font-semibold">
                        81%
                      </span>
                    </div>

                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/[0.05]">
                      <div className="h-full w-[81%] rounded-full bg-violet-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI recommendation */}
              <div className="mt-7 rounded-2xl bg-black/[0.025] p-4">
                <div className="flex items-center gap-2">
                  <CircleDollarSign className="h-3.5 w-3.5 text-violet-600" />

                  <p className="text-[9px] font-semibold">
                    AI recommendation
                  </p>
                </div>

                <p className="mt-2 text-[10px] leading-5 text-black/45">
                  Your current ICP is producing strong matches. Consider
                  expanding your search to adjacent industries to increase
                  opportunity volume.
                </p>

                <Link
                  to="/settings"
                  className="mt-3 inline-flex items-center gap-1 text-[9px] font-semibold text-violet-600 transition hover:text-violet-800"
                >
                  Adjust ICP

                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </section>

          {/* Quick actions */}
          <section className="mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-semibold">
                  Quick actions
                </h3>

                <p className="mt-1 text-[10px] text-black/40">
                  Move from intelligence to action.
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Find signals */}
              <Link
                to="/signals"
                className="group flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 transition hover:-translate-y-0.5 hover:border-black/[0.1] hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
                  <Zap className="h-4 w-4 text-violet-600" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold">
                    Find signals
                  </p>

                  <p className="mt-1 text-[9px] text-black/35">
                    Discover new intent
                  </p>
                </div>

                <ArrowRight className="h-3.5 w-3.5 text-black/20 transition group-hover:translate-x-0.5 group-hover:text-black/50" />
              </Link>

              {/* Review leads */}
              <Link
                to="/leads"
                className="group flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 transition hover:-translate-y-0.5 hover:border-black/[0.1] hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.035]">
                  <Users className="h-4 w-4 text-black/50" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold">
                    Review leads
                  </p>

                  <p className="mt-1 text-[9px] text-black/35">
                    See your opportunities
                  </p>
                </div>

                <ArrowRight className="h-3.5 w-3.5 text-black/20 transition group-hover:translate-x-0.5 group-hover:text-black/50" />
              </Link>

              {/* Write outreach */}
              <Link
                to="/messages"
                className="group flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 transition hover:-translate-y-0.5 hover:border-black/[0.1] hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.035]">
                  <MessageSquare className="h-4 w-4 text-black/50" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold">
                    Write outreach
                  </p>

                  <p className="mt-1 text-[9px] text-black/35">
                    Turn signals into messages
                  </p>
                </div>

                <ArrowRight className="h-3.5 w-3.5 text-black/20 transition group-hover:translate-x-0.5 group-hover:text-black/50" />
              </Link>

              {/* Configure ICP */}
              <Link
                to="/settings"
                className="group flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 transition hover:-translate-y-0.5 hover:border-black/[0.1] hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.035]">
                  <Settings className="h-4 w-4 text-black/50" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold">
                    Configure ICP
                  </p>

                  <p className="mt-1 text-[9px] text-black/35">
                    Improve signal quality
                  </p>
                </div>

                <ArrowRight className="h-3.5 w-3.5 text-black/20 transition group-hover:translate-x-0.5 group-hover:text-black/50" />
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-10 flex flex-col gap-3 border-t border-black/[0.06] py-6 text-[9px] text-black/30 sm:flex-row sm:items-center sm:justify-between">
            <p>
              SignalFlow · AI-powered opportunity intelligence
            </p>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                Systems operational
              </span>

              <span>v0.1 MVP</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}