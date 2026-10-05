import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Bell,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  Filter,
  Globe,
  Mail,
  MapPin,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

type SignalType =
  | "Hiring"
  | "Expansion"
  | "Research"
  | "Competitor"
  | "Engagement";

type Signal = {
  id: string;
  company: string;
  location: string;
  industry: string;
  type: SignalType;
  signal: string;
  source: string;
  detected: string;
  score: number;
  confidence: number;
  people: number;
  description: string;
  reasoning: string;
};

const signals: Signal[] = [
  {
    id: "sig-001",
    company: "Kigali Digital",
    location: "Kigali, Rwanda",
    industry: "Digital Services",
    type: "Hiring",
    signal: "Hiring for a new sales role",
    source: "LinkedIn",
    detected: "18 min ago",
    score: 94,
    confidence: 96,
    people: 2,
    description:
      "Kigali Digital recently opened a new sales position, suggesting the company is preparing to increase customer acquisition capacity.",
    reasoning:
      "The hiring activity matches your ideal customer profile and indicates a likely need for better lead generation and sales automation.",
  },
  {
    id: "sig-002",
    company: "Nova Systems",
    location: "Nairobi, Kenya",
    industry: "SaaS",
    type: "Expansion",
    signal: "Expanding into East Africa",
    source: "Company news",
    detected: "42 min ago",
    score: 89,
    confidence: 92,
    people: 4,
    description:
      "Nova Systems announced plans to expand its commercial presence across East African markets.",
    reasoning:
      "Expansion usually creates immediate demand for new customer acquisition channels, sales processes, and market intelligence.",
  },
  {
    id: "sig-003",
    company: "MobiPay",
    location: "Kigali, Rwanda",
    industry: "Fintech",
    type: "Research",
    signal: "Researching automation platforms",
    source: "Website",
    detected: "1 hr ago",
    score: 86,
    confidence: 91,
    people: 3,
    description:
      "Multiple visits to pages related to automation and customer acquisition were detected.",
    reasoning:
      "Repeated product research suggests the company is actively evaluating solutions rather than casually browsing.",
  },
  {
    id: "sig-004",
    company: "Vertex Labs",
    location: "Kampala, Uganda",
    industry: "Technology",
    type: "Competitor",
    signal: "Competitor comparison activity",
    source: "Website",
    detected: "2 hrs ago",
    score: 82,
    confidence: 87,
    people: 2,
    description:
      "Vertex Labs appears to be comparing several solutions in the same category as your product.",
    reasoning:
      "Competitive research is a strong indicator that a company has an active problem and may be close to a buying decision.",
  },
  {
    id: "sig-005",
    company: "Rwanda Commerce",
    location: "Kigali, Rwanda",
    industry: "E-commerce",
    type: "Engagement",
    signal: "Multiple visits to pricing page",
    source: "Website",
    detected: "3 hrs ago",
    score: 78,
    confidence: 84,
    people: 5,
    description:
      "Several visitors from Rwanda Commerce returned to commercial pages during the last 24 hours.",
    reasoning:
      "Repeated pricing-page activity suggests increasing commercial interest and makes this account worth monitoring.",
  },
  {
    id: "sig-006",
    company: "East Africa Cloud",
    location: "Nairobi, Kenya",
    industry: "Cloud Computing",
    type: "Hiring",
    signal: "Hiring two new marketing roles",
    source: "Job board",
    detected: "4 hrs ago",
    score: 74,
    confidence: 81,
    people: 2,
    description:
      "East Africa Cloud is hiring additional marketing staff as its commercial team grows.",
    reasoning:
      "Marketing expansion can indicate increasing pipeline goals and a need for additional customer acquisition infrastructure.",
  },
];

const signalFilters = [
  "All",
  "Hiring",
  "Expansion",
  "Research",
  "Competitor",
  "Engagement",
];

export default function Signals() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [sort, setSort] = useState("Highest score");
  const [sortOpen, setSortOpen] = useState(false);

  const filteredSignals = useMemo(() => {
    const filtered = signals.filter((signal) => {
      const search = query.toLowerCase();

      const matchesSearch =
        signal.company.toLowerCase().includes(search) ||
        signal.signal.toLowerCase().includes(search) ||
        signal.industry.toLowerCase().includes(search) ||
        signal.location.toLowerCase().includes(search);

      const matchesFilter =
        activeFilter === "All" || signal.type === activeFilter;

      return matchesSearch && matchesFilter;
    });

    return [...filtered].sort((a, b) => {
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
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[245px] border-r border-black/8 bg-[#f7f6f1] lg:block">
        <div className="flex h-full flex-col px-5 py-6">
          <Link
            to="/dashboard"
            className="mb-10 px-3 text-xl font-black tracking-[-0.05em]"
          >
            SignalFlow
          </Link>

          <nav className="space-y-1">
            <SideNav label="Overview" href="/dashboard" />
            <SideNav label="Opportunities" href="/leads" />
            <SideNav label="Buying signals" href="/signals" active />
            <SideNav label="Messages" href="/messages" />
            <SideNav label="Campaigns" href="/campaigns" />
            <SideNav label="Analytics" href="/analytics" />
            <SideNav label="Settings" href="/settings" />
          </nav>

          <div className="mt-auto rounded-2xl border border-black/8 bg-white p-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
              <Sparkles size={15} />
            </div>

            <p className="text-sm font-semibold">Signal engine active</p>

            <p className="mt-1 text-xs leading-5 text-black/45">
              SignalFlow is continuously monitoring your target market.
            </p>

            <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Monitoring 2,481 companies
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:pl-[245px]">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-black/8 bg-[#f7f6f1]/90 backdrop-blur-xl">
          <div className="flex h-[72px] items-center justify-between px-5 md:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/35">
                SignalFlow
              </p>

              <h1 className="mt-1 text-lg font-semibold tracking-[-0.02em]">
                Buying signals
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden h-10 w-10 items-center justify-center rounded-xl border border-black/8 bg-white transition hover:bg-black/5 md:flex">
                <Bell size={16} className="text-black/55" />
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                CF
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
          {/* Page intro */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-black/45">
                  <Activity size={16} />
                  Live market intelligence
                </div>

                <h2 className="text-3xl font-medium tracking-[-0.05em] md:text-4xl">
                  Buying signals
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
                  Real-time signals showing which companies are becoming more
                  likely to buy. SignalFlow turns scattered activity into
                  actionable opportunities.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-50 px-4 py-2.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-emerald-700">
                  Live monitoring
                </span>
              </div>
            </div>
          </motion.section>

          {/* Metrics */}
          <div className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              icon={<Activity size={17} />}
              label="Signals today"
              value="127"
              change="+18.4%"
            />

            <MetricCard
              icon={<Zap size={17} />}
              label="High intent"
              value="34"
              change="+12.1%"
            />

            <MetricCard
              icon={<Building2 size={17} />}
              label="Companies tracked"
              value="2,481"
              change="+4.8%"
            />

            <MetricCard
              icon={<TrendingUp size={17} />}
              label="Average signal score"
              value="81"
              change="+6.2%"
            />
          </div>

          {/* Toolbar */}
          <div className="mb-5 rounded-2xl border border-black/8 bg-white p-3">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search companies, signals, industries..."
                  className="h-11 w-full rounded-xl bg-black/[0.035] pl-11 pr-4 text-sm outline-none transition placeholder:text-black/30 focus:bg-black/[0.055]"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {signalFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      activeFilter === filter
                        ? "bg-black text-white"
                        : "bg-black/[0.035] text-black/55 hover:bg-black/[0.07]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="relative">
                <button
                  onClick={() => setSortOpen((current) => !current)}
                  className="flex h-11 items-center gap-2 rounded-xl border border-black/8 bg-white px-4 text-sm font-medium"
                >
                  <Filter size={15} />
                  {sort}
                  <ChevronDown size={14} />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-13 z-40 w-44 rounded-xl border border-black/8 bg-white p-1.5 shadow-xl">
                    {[
                      "Highest score",
                      "Lowest score",
                      "Company name",
                    ].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSort(option);
                          setSortOpen(false);
                        }}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-black/5"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Signals table */}
          <div className="overflow-hidden rounded-2xl border border-black/8 bg-white">
            {/* Table header */}
            <div className="hidden grid-cols-[1.15fr_1.45fr_0.7fr_0.65fr_0.55fr] gap-4 border-b border-black/8 bg-black/[0.018] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-black/35 md:grid">
              <span>Company</span>
              <span>Detected signal</span>
              <span>Source</span>
              <span>Time</span>
              <span>Score</span>
            </div>

            {filteredSignals.map((signal, index) => (
              <motion.button
                key={signal.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => setSelectedSignal(signal)}
                className="grid w-full gap-4 border-b border-black/6 px-5 py-5 text-left transition last:border-b-0 hover:bg-black/[0.018] md:grid-cols-[1.15fr_1.45fr_0.7fr_0.65fr_0.55fr] md:items-center"
              >
                {/* Company */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.045]">
                    <Building2 size={17} className="text-black/60" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {signal.company}
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-xs text-black/40">
                      <MapPin size={11} />
                      {signal.location}
                    </div>
                  </div>
                </div>

                {/* Signal */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <SignalBadge type={signal.type} />

                    <span className="text-[10px] text-black/30">
                      {signal.industry}
                    </span>
                  </div>

                  <p className="text-sm font-medium">{signal.signal}</p>

                  <p className="mt-1 line-clamp-1 text-xs text-black/40">
                    {signal.description}
                  </p>
                </div>

                {/* Source */}
                <div>
                  <SourceBadge source={signal.source} />
                </div>

                {/* Time */}
                <div className="flex items-center gap-1.5 text-xs text-black/40">
                  <Clock3 size={13} />
                  {signal.detected}
                </div>

                {/* Score */}
                <div className="flex items-center gap-2">
                  <ScoreRing score={signal.score} />

                  <ArrowUpRight
                    size={15}
                    className="hidden text-black/25 lg:block"
                  />
                </div>
              </motion.button>
            ))}

            {filteredSignals.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/5">
                  <Search size={18} className="text-black/40" />
                </div>

                <p className="mt-4 text-sm font-semibold">
                  No signals found
                </p>

                <p className="mt-1 text-sm text-black/40">
                  Try another search or signal type.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Detail drawer */}
      <AnimatePresence>
        {selectedSignal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSignal(null)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-[520px] overflow-y-auto border-l border-black/10 bg-[#f7f6f1] shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/8 bg-[#f7f6f1]/90 px-6 py-5 backdrop-blur-xl">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/35">
                    Signal intelligence
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">
                    {selectedSignal.company}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedSignal(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/8 bg-white transition hover:bg-black/5"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-5 p-6">
                {/* Company */}
                <div className="rounded-2xl border border-black/8 bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                        <Building2 size={19} />
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          {selectedSignal.company}
                        </h4>

                        <p className="mt-1 text-xs text-black/40">
                          {selectedSignal.industry}
                        </p>
                      </div>
                    </div>

                    <ScoreRing score={selectedSignal.score} large />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <InfoItem
                      icon={<MapPin size={14} />}
                      label="Location"
                      value={selectedSignal.location}
                    />

                    <InfoItem
                      icon={<Users size={14} />}
                      label="People"
                      value={`${selectedSignal.people} detected`}
                    />
                  </div>
                </div>

                {/* Detected signal */}
                <div className="rounded-2xl border border-black/8 bg-white p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/35">
                      Detected signal
                    </p>

                    <SignalBadge type={selectedSignal.type} />
                  </div>

                  <h4 className="text-xl font-medium tracking-[-0.03em]">
                    {selectedSignal.signal}
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-black/50">
                    {selectedSignal.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <SourceBadge source={selectedSignal.source} />

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3 py-1.5 text-[11px] font-medium text-black/50">
                      <Clock3 size={12} />
                      {selectedSignal.detected}
                    </span>
                  </div>
                </div>

                {/* AI reasoning */}
                <div className="rounded-2xl border border-violet-200/70 bg-violet-50/50 p-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                      <Sparkles size={15} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        SignalFlow reasoning
                      </p>

                      <p className="text-[11px] text-violet-700/60">
                        AI qualification
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-black/65">
                    {selectedSignal.reasoning}
                  </p>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-black/45">
                        Confidence
                      </span>

                      <span className="font-semibold">
                        {selectedSignal.confidence}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-black/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${selectedSignal.confidence}%`,
                        }}
                        transition={{ duration: 0.7 }}
                        className="h-full rounded-full bg-violet-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Why it matters */}
                <div className="rounded-2xl border border-black/8 bg-white p-5">
                  <div className="flex items-center gap-2">
                    <Target size={16} />
                    <p className="text-sm font-semibold">
                      Why this matters
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    <ReasonRow
                      title="Strong company fit"
                      text="Matches your ideal customer profile."
                      positive
                    />

                    <ReasonRow
                      title="Active buying signal"
                      text="The activity indicates a current business need."
                      positive
                    />

                    <ReasonRow
                      title="Good timing"
                      text="The signal was detected recently."
                      positive
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Link
                    to={`/messages/${selectedSignal.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-black/85"
                  >
                    <Mail size={16} />
                    Generate outreach
                    <ArrowUpRight size={15} />
                  </Link>

                  <Link
                    to={`/leads/${selectedSignal.company
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-3.5 text-sm font-semibold transition hover:bg-black/5"
                  >
                    <ExternalLink size={16} />
                    Open company
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function SideNav({
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

function MetricCard({
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
    <div className="rounded-2xl border border-black/8 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.045]">
          {icon}
        </div>

        <span className="text-[11px] font-semibold text-emerald-600">
          {change}
        </span>
      </div>

      <p className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
        {value}
      </p>

      <p className="mt-1 text-xs text-black/40">{label}</p>
    </div>
  );
}

function SignalBadge({ type }: { type: SignalType }) {
  const styles: Record<SignalType, string> = {
    Hiring: "bg-blue-50 text-blue-700",
    Expansion: "bg-emerald-50 text-emerald-700",
    Research: "bg-violet-50 text-violet-700",
    Competitor: "bg-orange-50 text-orange-700",
    Engagement: "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[type]}`}
    >
      {type}
    </span>
  );
}

function SourceBadge({ source }: { source: string }) {
  if (source === "LinkedIn") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef4ff] px-3 py-1.5 text-[11px] font-semibold text-[#315ca8]">
        <span className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#315ca8] text-[9px] font-black text-white">
          in
        </span>
        LinkedIn
      </span>
    );
  }

  if (source === "Website") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.045] px-3 py-1.5 text-[11px] font-medium text-black/55">
        <Globe size={12} />
        Website
      </span>
    );
  }

  if (source === "Job board") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-700">
        <Users size={12} />
        Job board
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.045] px-3 py-1.5 text-[11px] font-medium text-black/55">
      <Activity size={12} />
      {source}
    </span>
  );
}

function ScoreRing({
  score,
  large = false,
}: {
  score: number;
  large?: boolean;
}) {
  const radius = large ? 25 : 19;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div
      className={`relative shrink-0 ${
        large ? "h-16 w-16" : "h-10 w-10"
      }`}
    >
      <svg
        className="h-full w-full -rotate-90"
        viewBox="0 0 64 64"
      >
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={large ? 4 : 3}
          className="text-black/7"
        />

        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={large ? 4 : 3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className={
            score >= 90
              ? "text-emerald-500"
              : score >= 80
                ? "text-violet-500"
                : "text-amber-500"
          }
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-bold ${
            large ? "text-sm" : "text-[10px]"
          }`}
        >
          {score}
        </span>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-black/[0.025] p-3">
      <div className="flex items-center gap-1.5 text-black/35">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xs font-medium">{value}</p>
    </div>
  );
}

function ReasonRow({
  title,
  text,
  positive = false,
}: {
  title: string;
  text: string;
  positive?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          positive ? "bg-emerald-50 text-emerald-600" : "bg-black/5"
        }`}
      >
        <Check size={11} />
      </div>

      <div>
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-0.5 text-xs leading-5 text-black/40">
          {text}
        </p>
      </div>
    </div>
  );
}