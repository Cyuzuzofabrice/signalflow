import {
  ArrowRight,
  CalendarClock,
  ChevronDown,
  Clock3,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Sparkles,
  Users,
  Target,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type CampaignStatus = "Active" | "Draft" | "Completed";

type Campaign = {
  id: number;
  name: string;
  description: string;
  status: CampaignStatus;
  leads: number;
  contacted: number;
  replies: number;
  meetings: number;
  lastActivity: string;
  channel: string;
};

const campaigns: Campaign[] = [
  {
    id: 1,
    name: "East Africa SaaS Outreach",
    description:
      "High-intent technology companies showing active buying signals.",
    status: "Active",
    leads: 84,
    contacted: 62,
    replies: 17,
    meetings: 6,
    lastActivity: "12 min ago",
    channel: "Email + LinkedIn",
  },
  {
    id: 2,
    name: "Hiring Signal Campaign",
    description:
      "Companies hiring for growth, sales, and operations roles.",
    status: "Active",
    leads: 47,
    contacted: 31,
    replies: 9,
    meetings: 3,
    lastActivity: "34 min ago",
    channel: "Email",
  },
  {
    id: 3,
    name: "AI Automation Prospects",
    description:
      "Businesses researching automation and workflow solutions.",
    status: "Draft",
    leads: 28,
    contacted: 0,
    replies: 0,
    meetings: 0,
    lastActivity: "Yesterday",
    channel: "Email",
  },
  {
    id: 4,
    name: "Q3 High Intent Follow-up",
    description:
      "Follow-up sequence for previously engaged prospects.",
    status: "Completed",
    leads: 63,
    contacted: 63,
    replies: 21,
    meetings: 8,
    lastActivity: "Sep 28",
    channel: "Email + LinkedIn",
  },
];

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: Target,
  },
  {
    label: "Opportunities",
    href: "/leads",
    icon: Users,
  },
  {
    label: "Buying signals",
    href: "/signals",
    icon: Zap,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: Mail,
  },
  {
    label: "Campaigns",
    href: "/campaigns",
    icon: Send,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: Target,
  },
];

function StatusBadge({
  status,
}: {
  status: CampaignStatus;
}) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-600",
    Draft: "bg-amber-50 text-amber-600",
    Completed: "bg-black/[0.05] text-black/45",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Target;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-[22px] border border-black/[0.07] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.045]">
        <Icon className="h-4 w-4 text-black/55" />
      </div>

      <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.14em] text-black/30">
        {label}
      </p>

      <p className="mt-1 text-[28px] font-semibold tracking-[-0.05em]">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-black/35">
        {detail}
      </p>
    </motion.div>
  );
}

function CampaignCard({
  campaign,
  index,
}: {
  campaign: Campaign;
  index: number;
}) {
  const contactRate =
    campaign.leads > 0
      ? Math.round(
          (campaign.contacted / campaign.leads) * 100,
        )
      : 0;

  const replyRate =
    campaign.contacted > 0
      ? Math.round(
          (campaign.replies / campaign.contacted) * 100,
        )
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group rounded-[24px] border border-black/[0.07] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:p-6"
    >
      {/* Campaign header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <Send className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[14px] font-semibold tracking-[-0.02em]">
                {campaign.name}
              </h3>

              <StatusBadge status={campaign.status} />
            </div>

            <p className="mt-1.5 max-w-xl text-[11px] leading-5 text-black/40">
              {campaign.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label={`More options for ${campaign.name}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-black/25 transition hover:bg-black/[0.04] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Campaign stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-black/[0.025] p-3">
          <p className="text-[9px] text-black/30">
            Leads
          </p>

          <p className="mt-1 text-[16px] font-semibold">
            {campaign.leads}
          </p>
        </div>

        <div className="rounded-xl bg-black/[0.025] p-3">
          <p className="text-[9px] text-black/30">
            Contacted
          </p>

          <p className="mt-1 text-[16px] font-semibold">
            {campaign.contacted}
          </p>
        </div>

        <div className="rounded-xl bg-black/[0.025] p-3">
          <p className="text-[9px] text-black/30">
            Replies
          </p>

          <p className="mt-1 text-[16px] font-semibold">
            {campaign.replies}
          </p>
        </div>

        <div className="rounded-xl bg-black/[0.025] p-3">
          <p className="text-[9px] text-black/30">
            Meetings
          </p>

          <p className="mt-1 text-[16px] font-semibold">
            {campaign.meetings}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-[9px]">
          <span className="text-black/35">
            {contactRate}% contacted
          </span>

          <span className="font-semibold text-violet-600">
            {replyRate}% reply rate
          </span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.05]">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${Math.max(contactRate, 3)}%`,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2 + index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full rounded-full bg-violet-600"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-col justify-between gap-3 border-t border-black/[0.06] pt-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-4 text-[9px] text-black/30">
          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3 w-3" />
            {campaign.lastActivity}
          </span>

          <span className="flex items-center gap-1.5">
            <Mail className="h-3 w-3" />
            {campaign.channel}
          </span>
        </div>

        <Link
          to={`/campaigns/${campaign.id}`}
          className="group/link flex items-center gap-1.5 text-[10px] font-semibold text-black/50 transition hover:text-black focus:outline-none focus-visible:text-violet-600"
        >
          Open campaign

          <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Campaigns() {
  const [activeFilter, setActiveFilter] = useState<
    "All" | CampaignStatus
  >("All");

  const [search, setSearch] = useState("");

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesFilter =
        activeFilter === "All" ||
        campaign.status === activeFilter;

      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        campaign.name.toLowerCase().includes(query) ||
        campaign.description
          .toLowerCase()
          .includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <div className="min-h-screen bg-[#f7f7f3] text-[#111]">
      {/* ------------------------------------------------------------------ */}
      {/* Sidebar */}
      {/* ------------------------------------------------------------------ */}

      <aside className="fixed inset-y-0 left-0 hidden w-[250px] border-r border-black/[0.07] bg-[#fafaf7] px-4 py-5 lg:block">
        {/* Logo */}
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

        {/* Navigation */}
        <div className="mt-10">
          <p className="px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
            Workspace
          </p>

          <nav className="mt-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                item.label === "Campaigns";

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`group flex min-h-10 items-center gap-3 rounded-xl border px-3 py-2.5 text-[12px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30 ${
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

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-5 left-4 right-4">
          <Link
            to="/settings"
            className="group flex min-h-10 items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-[12px] font-medium text-black/45 transition-all duration-200 hover:border-black/[0.05] hover:bg-white/70 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
          >
            <Sparkles className="h-4 w-4 shrink-0 group-hover:text-violet-600" />

            <span>Settings</span>
          </Link>

          <div className="mt-3 border-t border-black/[0.07] pt-4">
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700">
                CF
              </div>

              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold">
                  Cyuzuzo Fabrice
                </p>

                <p className="truncate text-[9px] text-black/35">
                  Personal workspace
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* Main */}
      {/* ------------------------------------------------------------------ */}

      <div className="lg:pl-[250px]">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-black/[0.07] bg-[#f7f7f3]/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-black/45 transition hover:border-black/[0.14] hover:bg-black/[0.03] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-xl border border-black/[0.07] bg-white px-2.5 transition hover:border-black/[0.14] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-[9px] font-bold text-violet-700">
                CF
              </div>

              <span className="hidden text-[11px] font-semibold sm:block">
                Cyuzuzo
              </span>

              <ChevronDown className="h-3 w-3 text-black/30" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100">
                  <Send className="h-3.5 w-3.5 text-violet-600" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-violet-600">
                  Outreach workspace
                </span>
              </div>

              <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.055em] sm:text-[42px]">
                Campaigns
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
                Turn qualified opportunities into personalized
                outreach sequences and track what happens next.
              </p>
            </div>

            {/* Primary CTA */}
            <button
              type="button"
              className="group flex w-fit items-center gap-2 rounded-full bg-[#111] px-5 py-3 text-[11px] font-semibold text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_30px_rgba(0,0,0,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
            >
              <Plus className="h-3.5 w-3.5" />
              Create campaign
            </button>
          </motion.div>

          {/* Metrics */}
          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Active campaigns"
              value="2"
              detail="Currently running"
              icon={Send}
            />

            <StatCard
              label="Prospects enrolled"
              value="131"
              detail="Across active campaigns"
              icon={Users}
            />

            <StatCard
              label="Reply rate"
              value="14.2%"
              detail="Last 30 days"
              icon={Mail}
            />

            <StatCard
              label="Meetings booked"
              value="17"
              detail="From campaign outreach"
              icon={CalendarClock}
            />
          </section>

          {/* Search + Filters */}
          <section className="mt-8">
            <div className="flex flex-col gap-4 rounded-[20px] border border-black/[0.07] bg-white p-3 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-black/25" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search campaigns..."
                  className="h-10 w-full rounded-xl bg-black/[0.025] pl-9 pr-4 text-[11px] outline-none placeholder:text-black/25 transition focus:bg-black/[0.04] focus:ring-2 focus:ring-violet-500/10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-1 overflow-x-auto">
                {(
                  [
                    "All",
                    "Active",
                    "Draft",
                    "Completed",
                  ] as const
                ).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() =>
                      setActiveFilter(filter)
                    }
                    className={`whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-[10px] font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30 ${
                      activeFilter === filter
                        ? "border-black/[0.07] bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                        : "border-transparent text-black/40 hover:bg-black/[0.04] hover:text-black"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Campaign list */}
          <section className="mt-5 grid gap-4">
            {filteredCampaigns.map(
              (campaign, index) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  index={index}
                />
              ),
            )}

            {filteredCampaigns.length === 0 && (
              <div className="rounded-[24px] border border-dashed border-black/10 bg-white p-12 text-center">
                <Search className="mx-auto h-5 w-5 text-black/25" />

                <p className="mt-3 text-sm font-semibold">
                  No campaigns found
                </p>

                <p className="mt-1 text-xs text-black/35">
                  Try another search or filter.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveFilter("All");
                  }}
                  className="mt-4 rounded-xl border border-black/[0.08] bg-white px-4 py-2 text-xs font-semibold text-black/60 transition hover:bg-black/[0.03] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>

          {/* AI recommendation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.55,
            }}
            className="relative mt-6 overflow-hidden rounded-[24px] bg-[#111] p-6 text-white sm:p-8"
          >
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-400" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">
                    SignalFlow recommendation
                  </span>
                </div>

                <h2 className="mt-3 max-w-xl text-xl font-semibold tracking-[-0.04em]">
                  12 new high-intent companies are ready for outreach.
                </h2>

                <p className="mt-2 max-w-xl text-[11px] leading-5 text-white/40">
                  SignalFlow detected strong hiring and expansion
                  signals that match your ideal customer profile.
                </p>
              </div>

              <Link
                to="/leads"
                className="group flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-[10px] font-semibold text-black transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Review opportunities

                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.section>

          {/* Footer */}
          <p className="mt-8 text-center text-[9px] font-medium text-black/25">
            SignalFlow intelligence updates continuously as new
            opportunities and engagement signals are detected.
          </p>
        </main>
      </div>
    </div>
  );
}