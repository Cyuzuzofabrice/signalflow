import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  Clock3,
  Mail,
  MessageSquare,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "Opportunities",
    href: "/leads",
    icon: Target,
  },
  {
    label: "Buying signals",
    href: "/signals",
    icon: Zap,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    label: "Campaigns",
    href: "/campaigns",
    icon: Mail,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: Activity,
  },
];

const chartData = [
  { day: "Mon", signals: 62, opportunities: 18 },
  { day: "Tue", signals: 78, opportunities: 24 },
  { day: "Wed", signals: 71, opportunities: 21 },
  { day: "Thu", signals: 96, opportunities: 31 },
  { day: "Fri", signals: 88, opportunities: 27 },
  { day: "Sat", signals: 104, opportunities: 35 },
  { day: "Sun", signals: 127, opportunities: 42 },
];

const signalTypes = [
  {
    name: "Hiring",
    value: 38,
    percentage: 30,
    color: "bg-violet-600",
  },
  {
    name: "Expansion",
    value: 31,
    percentage: 24,
    color: "bg-blue-500",
  },
  {
    name: "Research",
    value: 26,
    percentage: 20,
    color: "bg-emerald-500",
  },
  {
    name: "Competitor",
    value: 19,
    percentage: 15,
    color: "bg-amber-500",
  },
  {
    name: "Engagement",
    value: 13,
    percentage: 11,
    color: "bg-pink-500",
  },
];

const funnel = [
  {
    label: "Signals detected",
    value: "2,481",
    percentage: 100,
    icon: Zap,
  },
  {
    label: "Qualified opportunities",
    value: "684",
    percentage: 72,
    icon: Target,
  },
  {
    label: "Contacts found",
    value: "421",
    percentage: 56,
    icon: Users,
  },
  {
    label: "Messages sent",
    value: "286",
    percentage: 39,
    icon: Mail,
  },
  {
    label: "Replies",
    value: "41",
    percentage: 24,
    icon: MessageSquare,
  },
  {
    label: "Meetings booked",
    value: "17",
    percentage: 14,
    icon: CalendarDays,
  },
];

const topCompanies = [
  {
    company: "Kigali Digital",
    score: 94,
    signals: 8,
    status: "High intent",
  },
  {
    company: "Nova Systems",
    score: 89,
    signals: 6,
    status: "High intent",
  },
  {
    company: "MobiPay",
    score: 86,
    signals: 5,
    status: "Strong match",
  },
  {
    company: "Vertex Labs",
    score: 82,
    signals: 4,
    status: "Strong match",
  },
];

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  positive = true,
  detail,
  delay = 0,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
  detail: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-[22px] border border-black/[0.07] bg-white p-5"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.045]">
          <Icon className="h-4 w-4 text-black/55" />
        </div>

        <span
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold ${
            positive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}

          {change}
        </span>
      </div>

      <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.14em] text-black/30">
        {label}
      </p>

      <p className="mt-1 text-[28px] font-semibold tracking-[-0.05em]">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-black/35">{detail}</p>
    </motion.div>
  );
}

function Chart() {
  const maxSignals = Math.max(
    ...chartData.map((item) => item.signals),
  );

  return (
    <div className="relative mt-7 h-[270px]">
      <div className="absolute inset-0 flex flex-col justify-between">
        {[100, 75, 50, 25, 0].map((value) => (
          <div
            key={value}
            className="flex items-center gap-3"
          >
            <span className="w-7 text-right text-[8px] text-black/25">
              {Math.round((maxSignals * value) / 100)}
            </span>

            <div className="h-px flex-1 bg-black/[0.055]" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-10 right-0 top-0 flex items-end justify-between gap-2">
        {chartData.map((item, index) => {
          const signalHeight =
            (item.signals / maxSignals) * 100;

          const opportunityHeight =
            (item.opportunities / maxSignals) * 100;

          return (
            <div
              key={item.day}
              className="flex h-full flex-1 flex-col justify-end"
            >
              <div className="relative flex h-full items-end justify-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: `${signalHeight}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-[22%] max-w-5 rounded-t-lg bg-black/[0.08]"
                />

                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: `${opportunityHeight}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-[22%] max-w-5 rounded-t-lg bg-violet-600"
                />
              </div>

              <span className="mt-3 text-center text-[9px] font-medium text-black/30">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[250px] border-r border-black/[0.07] bg-[#fafaf7] px-4 py-5 lg:block">
      <Link
        to="/"
        className="flex items-center gap-2.5 px-2"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111]">
          <span className="h-2.5 w-2.5 rounded-full bg-white" />
        </span>

        <span className="text-[15px] font-semibold tracking-[-0.025em]">
          SignalFlow
        </span>
      </Link>

      <div className="mt-10">
        <p className="px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
          Workspace
        </p>

        <nav className="mt-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.label === "Analytics";

            return (
              <Link
                key={item.label}
                to={item.href}
                className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-[12px] font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30 ${
                  active
                    ? "border-black/[0.07] bg-white text-black shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                    : "border-transparent text-black/50 hover:border-black/[0.05] hover:bg-white/70 hover:text-black"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    active
                      ? "text-violet-600"
                      : "text-black/35 group-hover:text-black/70"
                  }`}
                />

                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-5 left-4 right-4">
        <Link
          to="/settings"
          className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-[12px] font-medium text-black/45 transition hover:border-black/[0.05] hover:bg-white/70 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
        >
          <Activity className="h-4 w-4 text-black/35 group-hover:text-black/70" />

          Settings
        </Link>

        <div className="mt-3 border-t border-black/[0.07] pt-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700">
              CF
            </div>

            <div>
              <p className="text-[11px] font-semibold">
                Cyuzuzo Fabrice
              </p>

              <p className="text-[9px] text-black/35">
                Personal workspace
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function Analytics() {
  const [period, setPeriod] = useState("Last 7 days");

  return (
    <div className="min-h-screen bg-[#f7f7f3] text-[#111]">
      <Sidebar />

      <div className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 border-b border-black/[0.07] bg-[#f7f7f3]/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-xl border border-black/[0.07] bg-white px-3 text-[10px] font-semibold text-black/50"
            >
              <Clock3 className="h-3.5 w-3.5" />

              Live data

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            </button>

            <div className="flex h-9 items-center gap-2 rounded-xl border border-black/[0.07] bg-white px-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-[9px] font-bold text-violet-700">
                CF
              </div>

              <span className="hidden text-[11px] font-semibold sm:block">
                Cyuzuzo
              </span>

              <ChevronDown className="h-3 w-3 text-black/30" />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1450px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100">
                  <TrendingUp className="h-3.5 w-3.5 text-violet-600" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-violet-600">
                  Performance intelligence
                </span>
              </div>

              <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.055em] sm:text-[42px]">
                Analytics
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
                Understand which signals are turning into real
                opportunities, conversations, and meetings.
              </p>
            </div>

            <div className="relative">
              <select
                value={period}
                onChange={(event) =>
                  setPeriod(event.target.value)
                }
                className="h-10 appearance-none rounded-xl border border-black/[0.08] bg-white py-2 pl-4 pr-9 text-[10px] font-semibold outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-black/30" />
            </div>
          </motion.div>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              icon={Zap}
              label="Signals detected"
              value="2,481"
              change="+24.8%"
              detail="vs previous period"
              delay={0}
            />

            <MetricCard
              icon={Target}
              label="Qualified opportunities"
              value="684"
              change="+18.4%"
              detail="High-intent prospects"
              delay={0.05}
            />

            <MetricCard
              icon={MessageSquare}
              label="Reply rate"
              value="14.2%"
              change="+3.1%"
              detail="Across all campaigns"
              delay={0.1}
            />

            <MetricCard
              icon={CalendarDays}
              label="Meetings booked"
              value="17"
              change="+21.4%"
              detail="Attributed to SignalFlow"
              delay={0.15}
            />
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="rounded-[24px] border border-black/[0.07] bg-white p-5 sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/30">
                    Signal activity
                  </p>

                  <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em]">
                    Signals & opportunities
                  </h2>

                  <p className="mt-1 text-[10px] text-black/35">
                    Activity generated during{" "}
                    {period.toLowerCase()}.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[9px] font-medium text-black/40">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-black/10" />
                    Signals
                  </span>

                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-violet-600" />
                    Opportunities
                  </span>
                </div>
              </div>

              <Chart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="rounded-[24px] border border-black/[0.07] bg-white p-5 sm:p-6"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/30">
                Signal mix
              </p>

              <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em]">
                Where intent comes from
              </h2>

              <div className="mt-7 space-y-5">
                {signalTypes.map((signal, index) => (
                  <div key={signal.name}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium">
                        {signal.name}
                      </span>

                      <span className="text-[10px] font-semibold text-black/50">
                        {signal.value}{" "}
                        <span className="font-normal text-black/25">
                          ({signal.percentage}%)
                        </span>
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.05]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${signal.percentage}%`,
                        }}
                        transition={{
                          duration: 0.7,
                          delay: 0.3 + index * 0.08,
                        }}
                        className={`h-full rounded-full ${signal.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-[24px] border border-black/[0.07] bg-white p-5 sm:p-6"
            >
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/30">
                  Conversion
                </p>

                <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em]">
                  Opportunity funnel
                </h2>

                <p className="mt-1 text-[10px] text-black/35">
                  How discovered intent moves through your sales
                  workflow.
                </p>
              </div>

              <div className="mt-7 space-y-4">
                {funnel.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.04]">
                        <Icon className="h-3.5 w-3.5 text-black/45" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <span className="truncate text-[10px] font-semibold">
                            {item.label}
                          </span>

                          <span className="text-[10px] font-bold">
                            {item.value}
                          </span>
                        </div>

                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.05]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${item.percentage}%`,
                            }}
                            transition={{
                              duration: 0.8,
                              delay: 0.35 + index * 0.07,
                            }}
                            className={`h-full rounded-full ${
                              index === funnel.length - 1
                                ? "bg-violet-600"
                                : "bg-black/[0.16]"
                            }`}
                          />
                        </div>
                      </div>

                      <span className="hidden w-9 text-right text-[9px] font-semibold text-black/30 sm:block">
                        {item.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36 }}
              className="rounded-[24px] border border-black/[0.07] bg-white p-5 sm:p-6"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/30">
                Top opportunities
              </p>

              <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em]">
                Highest intent accounts
              </h2>

              <div className="mt-5 divide-y divide-black/[0.06]">
                {topCompanies.map((company, index) => (
                  <Link
                    key={company.company}
                    to={`/leads/${index + 1}`}
                    className="group flex items-center gap-3 py-4 first:pt-2 last:pb-2"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.045] text-[10px] font-bold">
                      {company.company
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold">
                        {company.company}
                      </p>

                      <p className="mt-1 text-[9px] text-black/30">
                        {company.signals} signals ·{" "}
                        {company.status}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[13px] font-bold text-violet-600">
                        {company.score}
                      </p>

                      <ArrowUpRight className="ml-auto mt-1 h-3 w-3 text-black/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black/60" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="mt-5 overflow-hidden rounded-[24px] bg-[#111] p-6 text-white sm:p-8"
          >
            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                    <TrendingUp className="h-3.5 w-3.5 text-violet-300" />
                  </span>

                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
                    SignalFlow insight
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
                  Hiring signals are currently converting 2.4×
                  better.
                </h2>

                <p className="mt-2 text-[11px] leading-5 text-white/40">
                  Companies showing active hiring intent are
                  producing more replies and meetings than other
                  signal types in your workspace.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-8">
                <div>
                  <p className="text-3xl font-semibold tracking-[-0.05em]">
                    24.8%
                  </p>

                  <p className="mt-1 text-[9px] text-white/30">
                    hiring signal reply rate
                  </p>
                </div>

                <div className="h-12 w-px bg-white/10" />

                <div>
                  <p className="text-3xl font-semibold tracking-[-0.05em]">
                    6
                  </p>

                  <p className="mt-1 text-[9px] text-white/30">
                    meetings this week
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          <p className="mt-8 text-center text-[9px] font-medium text-black/25">
            Analytics update continuously as SignalFlow detects new
            signals and activity.
          </p>
        </main>
      </div>
    </div>
  );
}