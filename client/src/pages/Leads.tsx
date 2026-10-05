import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

type Lead = {
  id: string;
  company: string;
  location: string;
  industry: string;
  employees: string;
  score: number;
  intent: string;
  signal: string;
  source: "Website" | "LinkedIn" | "News" | "Job board";
  time: string;
  contact: string;
  role: string;
};

const leads: Lead[] = [
  {
    id: "kigali-digital",
    company: "Kigali Digital",
    location: "Kigali, Rwanda",
    industry: "Digital Services",
    employees: "51–200",
    score: 94,
    intent: "High intent",
    signal: "Hiring for a new sales role",
    source: "LinkedIn",
    time: "18 min ago",
    contact: "Sarah Uwase",
    role: "Head of Growth",
  },
  {
    id: "nova-systems",
    company: "Nova Systems",
    location: "Nairobi, Kenya",
    industry: "SaaS",
    employees: "51–200",
    score: 89,
    intent: "High intent",
    signal: "Expanding into East Africa",
    source: "News",
    time: "42 min ago",
    contact: "Daniel M.",
    role: "VP Growth",
  },
  {
    id: "mobipay",
    company: "MobiPay",
    location: "Kigali, Rwanda",
    industry: "Fintech",
    employees: "201–500",
    score: 86,
    intent: "Strong match",
    signal: "Researching automation platforms",
    source: "Website",
    time: "1 hr ago",
    contact: "Eric Niyonzima",
    role: "Product Lead",
  },
  {
    id: "vertex-labs",
    company: "Vertex Labs",
    location: "Kampala, Uganda",
    industry: "Technology",
    employees: "11–50",
    score: 82,
    intent: "Strong match",
    signal: "Competitor comparison activity",
    source: "Website",
    time: "2 hrs ago",
    contact: "Grace Mukamana",
    role: "Founder",
  },
  {
    id: "rwanda-commerce",
    company: "Rwanda Commerce",
    location: "Kigali, Rwanda",
    industry: "E-commerce",
    employees: "51–200",
    score: 78,
    intent: "Good match",
    signal: "Multiple visits to pricing page",
    source: "Website",
    time: "3 hrs ago",
    contact: "Kevin R.",
    role: "Commercial Director",
  },
  {
    id: "east-africa-cloud",
    company: "East Africa Cloud",
    location: "Nairobi, Kenya",
    industry: "Cloud Computing",
    employees: "201–500",
    score: 74,
    intent: "Good match",
    signal: "Hiring two new marketing roles",
    source: "Job board",
    time: "4 hrs ago",
    contact: "James K.",
    role: "Marketing Manager",
  },
];

const filters = [
  "All",
  "High intent",
  "Strong match",
  "Good match",
];

export default function Leads() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("Highest score");

  const filteredLeads = useMemo(() => {
    const result = leads.filter((lead) => {
      const searchQuery = query.toLowerCase();

      const matchesQuery =
        lead.company.toLowerCase().includes(searchQuery) ||
        lead.industry.toLowerCase().includes(searchQuery) ||
        lead.location.toLowerCase().includes(searchQuery) ||
        lead.signal.toLowerCase().includes(searchQuery);

      const matchesFilter =
        activeFilter === "All" ||
        lead.intent === activeFilter;

      return matchesQuery && matchesFilter;
    });

    return [...result].sort((a, b) => {
      if (sort === "Highest score") {
        return b.score - a.score;
      }

      if (sort === "Lowest score") {
        return a.score - b.score;
      }

      return a.company.localeCompare(b.company);
    });
  }, [query, activeFilter, sort]);

  return (
    <div className="min-h-screen bg-[#f7f6f1] text-[#111111]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[245px] border-r border-black/[0.07] bg-[#f7f6f1] lg:block">
        <div className="flex h-full flex-col px-5 py-6">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="mb-10 px-3 text-xl font-black tracking-[-0.05em]"
          >
            SignalFlow
          </Link>

          {/* Navigation */}
          <nav className="space-y-1">
            <SideLink
              label="Overview"
              href="/dashboard"
            />

            <SideLink
              label="Opportunities"
              href="/leads"
              active
            />

            <SideLink
              label="Buying signals"
              href="/signals"
            />

            <SideLink
              label="Messages"
              href="/messages"
            />

            <SideLink
              label="Campaigns"
              href="/campaigns"
            />

            <SideLink
              label="Analytics"
              href="/analytics"
            />

            <SideLink
              label="Settings"
              href="/settings"
            />
          </nav>

          {/* Workspace usage */}
          <div className="mt-auto rounded-2xl border border-black/[0.07] bg-white p-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
              <Sparkles size={15} />
            </div>

            <p className="text-sm font-semibold">
              5 free opportunities
            </p>

            <p className="mt-1 text-xs leading-5 text-black/45">
              Your workspace is actively discovering buying signals.
            </p>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/5">
              <div className="h-full w-[60%] rounded-full bg-black" />
            </div>

            <p className="mt-2 text-[11px] text-black/40">
              3 of 5 used
            </p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:pl-[245px]">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-black/[0.07] bg-[#f7f6f1]/90 backdrop-blur-xl">
          <div className="flex h-[72px] items-center justify-between px-5 md:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/35">
                SignalFlow
              </p>

              <h1 className="mt-1 text-lg font-semibold tracking-[-0.02em]">
                Opportunities
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="hidden h-10 items-center gap-2 rounded-xl border border-black/[0.07] bg-white px-4 text-sm text-black/60 transition hover:border-black/[0.14] hover:bg-black/[0.02] md:flex"
              >
                <Filter size={15} />
                Filters
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                CF
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8"
          >
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-medium text-black/45">
                  <Target size={15} />
                  Qualified opportunities
                </p>

                <h2 className="text-3xl font-medium tracking-[-0.045em] md:text-4xl">
                  Companies worth talking to.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-black/50">
                  SignalFlow ranks companies using buying signals,
                  company fit, timing, and evidence from across the
                  web.
                </p>
              </div>

              <Link
                to="/signals"
                className="group flex w-fit items-center gap-2 rounded-full !bg-black px-5 py-3 text-sm font-semibold !text-white shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-[0_12px_30px_rgba(0,0,0,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
              >
                View live signals

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.div>

          {/* Metrics */}
          <div className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric
              icon={<Target size={17} />}
              label="Qualified opportunities"
              value="34"
              change="+12 today"
            />

            <Metric
              icon={<Zap size={17} />}
              label="High intent"
              value="12"
              change="+4 today"
            />

            <Metric
              icon={<TrendingUp size={17} />}
              label="Average score"
              value="81"
              change="+6.2%"
            />

            <Metric
              icon={<Users size={17} />}
              label="Contacts found"
              value="421"
              change="+38 today"
            />
          </div>

          {/* Toolbar */}
          <div className="mb-5 rounded-2xl border border-black/[0.07] bg-white p-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                />

                <input
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search companies, industries, signals..."
                  className="h-11 w-full rounded-xl bg-black/[0.035] pl-11 pr-4 text-sm outline-none placeholder:text-black/30 transition focus:bg-black/[0.055] focus:ring-2 focus:ring-violet-500/10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2 overflow-x-auto">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`whitespace-nowrap rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30 ${
                      activeFilter === filter
                        ? "border-black/[0.07] bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                        : "border-transparent bg-black/[0.035] text-black/55 hover:bg-black/[0.07] hover:text-black"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setSortOpen((value) => !value)
                  }
                  className="flex h-11 items-center gap-2 rounded-xl border border-black/[0.07] bg-white px-4 text-sm font-medium transition hover:border-black/[0.14] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
                >
                  <SlidersHorizontal size={15} />

                  {sort}

                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      sortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-[52px] z-20 w-44 rounded-xl border border-black/[0.07] bg-white p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
                    {[
                      "Highest score",
                      "Lowest score",
                      "Company name",
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSort(option);
                          setSortOpen(false);
                        }}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                          sort === option
                            ? "bg-black/[0.05] font-semibold text-black"
                            : "text-black/60 hover:bg-black/[0.04] hover:text-black"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
            {/* Table header */}
            <div className="hidden grid-cols-[1.5fr_1fr_1fr_0.8fr_0.7fr] gap-4 border-b border-black/[0.07] bg-black/[0.018] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-black/35 md:grid">
              <span>Company</span>
              <span>Signal</span>
              <span>Contact</span>
              <span>Intent</span>
              <span>Score</span>
            </div>

            {/* Leads */}
            <div>
              {filteredLeads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                    duration: 0.35,
                  }}
                >
                  <Link
                    to={`/leads/${lead.id}`}
                    className="group grid gap-4 border-b border-black/[0.06] px-5 py-5 transition last:border-b-0 hover:bg-black/[0.018] focus:outline-none focus-visible:bg-violet-50/40 md:grid-cols-[1.5fr_1fr_1fr_0.8fr_0.7fr] md:items-center"
                  >
                    {/* Company */}
                    <div className="min-w-0">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.045]">
                          <Building2
                            size={17}
                            className="text-black/60"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {lead.company}
                          </p>

                          <p className="mt-1 truncate text-xs text-black/40">
                            {lead.location} · {lead.industry}
                          </p>

                          <p className="mt-1 text-[11px] text-black/30">
                            {lead.employees} employees
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Signal */}
                    <div>
                      <p className="text-sm font-medium">
                        {lead.signal}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-full bg-black/[0.045] px-2 py-1 text-[10px] font-medium text-black/50">
                          {lead.source === "LinkedIn" ? (
                            <span className="inline-flex items-center gap-1">
                              <span className="font-bold">
                                in
                              </span>
                              LinkedIn
                            </span>
                          ) : (
                            lead.source
                          )}
                        </span>

                        <span className="text-[11px] text-black/30">
                          {lead.time}
                        </span>
                      </div>
                    </div>

                    {/* Contact */}
                    <div>
                      <p className="text-sm font-medium">
                        {lead.contact}
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        {lead.role}
                      </p>
                    </div>

                    {/* Intent */}
                    <div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                          lead.score >= 90
                            ? "bg-emerald-50 text-emerald-700"
                            : lead.score >= 80
                              ? "bg-violet-50 text-violet-700"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {lead.intent}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`relative flex h-11 w-11 items-center justify-center rounded-full border-[3px] ${
                          lead.score >= 90
                            ? "border-emerald-200"
                            : lead.score >= 80
                              ? "border-violet-200"
                              : "border-amber-200"
                        }`}
                      >
                        <span className="text-xs font-bold">
                          {lead.score}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={16}
                        className="hidden text-black/25 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-black/60 md:block"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Empty state */}
            {filteredLeads.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/5">
                  <Search
                    size={18}
                    className="text-black/40"
                  />
                </div>

                <p className="mt-4 text-sm font-semibold">
                  No opportunities found
                </p>

                <p className="mt-1 text-sm text-black/40">
                  Try changing your search or filter.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveFilter("All");
                  }}
                  className="mt-4 rounded-xl border border-black/[0.08] bg-white px-4 py-2 text-xs font-semibold text-black/60 transition hover:bg-black/[0.03] hover:text-black"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-[10px] text-black/25">
            SignalFlow continuously ranks opportunities as new
            buying signals are detected.
          </p>
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar link */
/* -------------------------------------------------------------------------- */

function SideLink({
  label,
  href,
  active = false,
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      to={href}
      className={`group flex min-h-10 items-center rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30 ${
        active
          ? "border-black/[0.07] bg-white text-black shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
          : "border-transparent text-black/50 hover:border-black/[0.05] hover:bg-white/70 hover:text-black"
      }`}
    >
      {label}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Metric */
/* -------------------------------------------------------------------------- */

function Metric({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.045]">
          {icon}
        </div>

        <span className="text-[11px] font-medium text-emerald-600">
          {change}
        </span>
      </div>

      <p className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
        {value}
      </p>

      <p className="mt-1 text-xs text-black/40">
        {label}
      </p>
    </motion.div>
  );
}