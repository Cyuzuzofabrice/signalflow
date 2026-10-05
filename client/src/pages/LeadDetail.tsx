import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Clock3,
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
  
  MoreHorizontal,
  Search,
  
  Sparkles,
  Target,
  TrendingUp,

  Users,
  Zap,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const company = {
  name: "Kigali Digital",
  initials: "KD",
  website: "kigalidigital.example",
  industry: "Digital Services",
  location: "Kigali, Rwanda",
  employees: "51–200",
  score: 94,
  status: "High intent",
  description:
    "Kigali Digital is showing multiple signals that indicate a growing need for better customer acquisition and sales operations.",
};

const signals = [
  {
    title: "Hiring for a new sales role",
    type: "Hiring",
    source: "LinkedIn",
    time: "12 min ago",
    score: 94,
    description:
      "A new sales position was recently posted, suggesting the company is increasing its commercial capacity.",
    icon: Users,
  },
  {
    title: "Commercial expansion detected",
    type: "Expansion",
    source: "Company activity",
    time: "2 hrs ago",
    score: 88,
    description:
      "Recent company activity indicates increased focus on growth and customer acquisition.",
    icon: TrendingUp,
  },
  {
    title: "Research activity detected",
    type: "Research",
    source: "Web activity",
    time: "5 hrs ago",
    score: 84,
    description:
      "Relevant pages and topics connected to sales automation have recently been researched.",
    icon: Search,
  },
];

const contacts = [
  {
    name: "Sarah Uwase",
    role: "Head of Growth",
    initials: "SU",
    relevance: "Decision maker",
  },
  {
    name: "Eric Habimana",
    role: "Sales Manager",
    initials: "EH",
    relevance: "Influencer",
  },
  {
    name: "Grace Mukamana",
    role: "Marketing Lead",
    initials: "GM",
    relevance: "Potential champion",
  },
];

export default function LeadDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#f5f5f1] text-[#111111]">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-[#f5f5f1]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{
                rotate: 6,
                scale: 1.05,
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111]"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
            </motion.div>

            <span className="text-[15px] font-semibold tracking-[-0.03em]">
              SignalFlow
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold">
                Fabrice
              </p>

              <p className="text-[10px] text-black/35">
                Admin
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] text-xs font-semibold text-white">
              F
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* BACK */}

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/leads"
            className="inline-flex items-center gap-2 text-xs font-semibold text-black/40 transition hover:text-black"
          >
            <ArrowLeft size={14} />
            Back to opportunities
          </Link>
        </motion.div>

        {/* =================================================
            COMPANY HERO
        ================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mt-7 rounded-[30px] border border-black/[0.07] bg-white p-5 shadow-[0_20px_70px_rgba(0,0,0,0.045)] sm:p-7 lg:p-8"
        >
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex gap-5">
              <motion.div
                whileHover={{
                  scale: 1.04,
                  rotate: 2,
                }}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#111111] text-lg font-bold text-white"
              >
                {company.initials}
              </motion.div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
                    {company.name}
                  </h1>

                  <span className="rounded-full bg-green-500/[0.08] px-2.5 py-1.5 text-[9px] font-bold text-green-700">
                    {company.status}
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-black/40">
                  {company.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-black/35">
                  <span className="flex items-center gap-1.5">
                    <Globe2 size={12} />
                    {company.website}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    {company.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Building2 size={12} />
                    {company.industry}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Users size={12} />
                    {company.employees}
                  </span>
                </div>
              </div>
            </div>

            {/* SCORE */}

            <div className="flex items-center gap-5 xl:min-w-[240px] xl:justify-end">
              <div className="text-right">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/25">
                  Lead score
                </p>

                <div className="mt-1 flex items-baseline justify-end gap-1">
                  <span className="text-5xl font-semibold tracking-[-0.07em]">
                    {company.score}
                  </span>

                  <span className="text-xs text-black/25">
                    /100
                  </span>
                </div>

                <p className="mt-1 text-[10px] font-semibold text-green-600">
                  Strong buying intent
                </p>
              </div>

              <ScoreRing score={company.score} />
            </div>
          </div>

          {/* ACTIONS */}

          <div className="mt-7 flex flex-col gap-2 border-t border-black/[0.07] pt-6 sm:flex-row">
            <Link
              to={`/messages/${id ?? "1"}`}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 text-xs font-semibold text-white shadow-[0_8px_22px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5"
            >
              <Sparkles size={14} />
              Generate outreach
              <ArrowUpRight size={14} />
            </Link>

            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-black/[0.08] bg-white px-5 text-xs font-semibold text-black/55 transition hover:bg-black/[0.025] hover:text-black"
            >
              <Check size={14} />
              Mark qualified
            </button>

            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-black/[0.08] bg-white px-5 text-xs font-semibold text-black/55 transition hover:bg-black/[0.025] hover:text-black"
            >
              <Mail size={14} />
              Add to campaign
            </button>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-black/35 transition hover:bg-black/[0.025] hover:text-black"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </motion.section>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">
            {/* SIGNALS */}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.12,
              }}
              className="overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_15px_55px_rgba(0,0,0,0.04)]"
            >
              <SectionHeader
                icon={<Zap size={15} />}
                eyebrow="Buying intelligence"
                title="Why this lead is interesting"
                description="SignalFlow combines multiple signals to determine buying intent."
              />

              <div className="divide-y divide-black/[0.06]">
                {signals.map((signal, index) => {
                  const Icon = signal.icon;

                  return (
                    <motion.div
                      key={signal.title}
                      initial={{
                        opacity: 0,
                        x: -12,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.25 + index * 0.08,
                      }}
                      className="p-5 sm:p-6"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/[0.04]">
                          <Icon
                            size={17}
                            className="text-black/55"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col justify-between gap-2 sm:flex-row">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-violet-500/[0.08] px-2 py-1 text-[8px] font-bold text-violet-700">
                                  {signal.type}
                                </span>

                                <span className="text-[9px] text-black/25">
                                  {signal.time}
                                </span>
                              </div>

                              <h3 className="mt-2 text-sm font-semibold">
                                {signal.title}
                              </h3>

                              <p className="mt-1 max-w-2xl text-[11px] leading-5 text-black/40">
                                {signal.description}
                              </p>
                            </div>

                            <div className="shrink-0 sm:text-right">
                              <p className="text-2xl font-semibold tracking-[-0.05em]">
                                {signal.score}
                              </p>

                              <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-black/20">
                                Signal
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-black/[0.05] pt-3">
                            <span className="text-[9px] text-black/30">
                              Source:{" "}
                              <span className="font-semibold text-black/45">
                                {signal.source}
                              </span>
                            </span>

                            <button
                              type="button"
                              className="flex items-center gap-1 text-[9px] font-semibold text-black/35 hover:text-black"
                            >
                              View evidence
                              <ExternalLink size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* AI REASONING */}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.2,
              }}
              className="overflow-hidden rounded-[28px] bg-[#111111] text-white shadow-[0_20px_60px_rgba(0,0,0,0.13)]"
            >
              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                    <Sparkles
                      size={14}
                      className="text-violet-300"
                    />
                  </span>

                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">
                    AI reasoning
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
                  This looks like a timely opportunity.
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/50">
                  SignalFlow found several independent indicators
                  pointing in the same direction: Kigali Digital is
                  increasing its focus on growth and sales.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <Reason
                    number="01"
                    title="Strong signal"
                    text="Recent hiring activity suggests an active business priority."
                  />

                  <Reason
                    number="02"
                    title="Good match"
                    text="The company fits your defined ideal customer profile."
                  />

                  <Reason
                    number="03"
                    title="Good timing"
                    text="The activity is recent enough to act on now."
                  />
                </div>
              </div>

              <div className="border-t border-white/10 bg-white/[0.025] px-6 py-4 sm:px-7">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/30">
                    SignalFlow confidence
                  </span>

                  <span className="text-xs font-semibold text-white/80">
                    96%
                  </span>
                </div>
              </div>
            </motion.section>

            {/* ACTIVITY */}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.28,
              }}
              className="rounded-[28px] border border-black/[0.07] bg-white p-5 shadow-[0_15px_55px_rgba(0,0,0,0.04)] sm:p-6"
            >
              <SectionHeader
                icon={<Clock3 size={15} />}
                eyebrow="Activity"
                title="Recent company activity"
                description="A timeline of the events contributing to this opportunity."
              />

              <div className="relative mt-6">
                <div className="absolute bottom-5 left-[15px] top-4 w-px bg-black/[0.08]" />

                <Activity
                  title="Sales role published"
                  text="A new sales position was posted."
                  time="12 min ago"
                  active
                />

                <Activity
                  title="Commercial activity increased"
                  text="New growth-related activity detected."
                  time="2 hrs ago"
                />

                <Activity
                  title="Research activity detected"
                  text="Relevant sales automation topics were researched."
                  time="5 hrs ago"
                />

                <Activity
                  title="Company profile updated"
                  text="Business information was recently changed."
                  time="Yesterday"
                />
              </div>
            </motion.section>
          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <aside className="space-y-6">
            {/* CONTACTS */}

            <motion.section
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.65,
              }}
              className="rounded-[28px] border border-black/[0.07] bg-white p-5 shadow-[0_15px_55px_rgba(0,0,0,0.04)]"
            >
              <SectionHeader
                icon={<Users size={15} />}
                eyebrow="People"
                title="Potential contacts"
                description="People who may influence this opportunity."
              />

              <div className="mt-5 space-y-2">
                {contacts.map((contact) => (
                  <div
                    key={contact.name}
                    className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-black/[0.025]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/[0.05] text-[9px] font-bold">
                      {contact.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold">
                        {contact.name}
                      </p>

                      <p className="mt-0.5 truncate text-[9px] text-black/35">
                        {contact.role}
                      </p>
                    </div>

                    <ArrowRight
                      size={13}
                      className="text-black/20 transition group-hover:translate-x-0.5 group-hover:text-black/50"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-black/[0.07] py-2.5 text-[10px] font-semibold text-black/45 transition hover:bg-black/[0.025] hover:text-black"
              >
                Find more contacts
                <Search size={12} />
              </button>
            </motion.section>

            {/* ICP MATCH */}

            <motion.section
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.65,
              }}
              className="rounded-[28px] border border-black/[0.07] bg-white p-5 shadow-[0_15px_55px_rgba(0,0,0,0.04)]"
            >
              <SectionHeader
                icon={<Target size={15} />}
                eyebrow="Qualification"
                title="Ideal customer match"
                description="How closely this company matches your target profile."
              />

              <div className="mt-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-semibold tracking-[-0.05em]">
                      91%
                    </p>

                    <p className="mt-1 text-[9px] text-black/30">
                      ICP match
                    </p>
                  </div>

                  <span className="rounded-full bg-green-500/[0.08] px-2.5 py-1.5 text-[9px] font-bold text-green-700">
                    Excellent
                  </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/[0.05]">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: "91%",
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.5,
                    }}
                    className="h-full rounded-full bg-[#111111]"
                  />
                </div>

                <div className="mt-5 space-y-3">
                  <Match
                    label="Industry"
                    value="Strong"
                  />

                  <Match
                    label="Company size"
                    value="Strong"
                  />

                  <Match
                    label="Location"
                    value="Strong"
                  />

                  <Match
                    label="Buying intent"
                    value="Very strong"
                  />
                </div>
              </div>
            </motion.section>

            {/* COMPANY */}

            <motion.section
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.65,
              }}
              className="rounded-[28px] border border-black/[0.07] bg-white p-5 shadow-[0_15px_55px_rgba(0,0,0,0.04)]"
            >
              <SectionHeader
                icon={<Building2 size={15} />}
                eyebrow="Company"
                title="Company details"
                description="Information used for qualification."
              />

              <div className="mt-5 space-y-3">
                <InfoRow
                  label="Industry"
                  value={company.industry}
                />

                <InfoRow
                  label="Employees"
                  value={company.employees}
                />

                <InfoRow
                  label="Location"
                  value={company.location}
                />

                <InfoRow
                  label="Website"
                  value={company.website}
                />
              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black/[0.04] py-2.5 text-[10px] font-semibold text-black/45 transition hover:bg-black/[0.07] hover:text-black"
              >
                Visit company
                <ExternalLink size={12} />
              </button>
            </motion.section>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* =============================================================
   SCORE RING
============================================================= */

function ScoreRing({
  score,
}: {
  score: number;
}) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (score / 100) * circumference;

  return (
    <div className="relative h-[76px] w-[76px]">
      <svg
        viewBox="0 0 80 80"
        className="h-full w-full -rotate-90"
      >
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-black/[0.06]"
        />

        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-[#111111]"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <Zap size={16} />
      </div>
    </div>
  );
}

/* =============================================================
   SECTION HEADER
============================================================= */

function SectionHeader({
  icon,
  eyebrow,
  title,
  description,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-black/[0.06] pb-5">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] text-black/50">
          {icon}
        </div>

        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-black/25">
            {eyebrow}
          </p>

          <h2 className="mt-1 text-base font-semibold tracking-[-0.025em]">
            {title}
          </h2>

          <p className="mt-1 text-[10px] leading-5 text-black/35">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   REASON
============================================================= */

function Reason({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <span className="text-[9px] font-bold text-white/30">
        {number}
      </span>

      <p className="mt-3 text-xs font-semibold text-white/80">
        {title}
      </p>

      <p className="mt-2 text-[10px] leading-5 text-white/35">
        {text}
      </p>
    </div>
  );
}

/* =============================================================
   ACTIVITY
============================================================= */

function Activity({
  title,
  text,
  time,
  active = false,
}: {
  title: string;
  text: string;
  time: string;
  active?: boolean;
}) {
  return (
    <div className="relative flex gap-4 pb-7 last:pb-0">
      <div
        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-white ${
          active
            ? "bg-[#111111]"
            : "bg-black/[0.08]"
        }`}
      >
        {active && (
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        )}
      </div>

      <div className="flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row">
          <p className="text-xs font-semibold">
            {title}
          </p>

          <span className="text-[9px] text-black/25">
            {time}
          </span>
        </div>

        <p className="mt-1 text-[10px] leading-5 text-black/35">
          {text}
        </p>
      </div>
    </div>
  );
}

/* =============================================================
   MATCH
============================================================= */

function Match({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-black/[0.05] pb-3 last:border-0 last:pb-0">
      <span className="text-[10px] text-black/35">
        {label}
      </span>

      <span className="flex items-center gap-1.5 text-[10px] font-semibold">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        {value}
      </span>
    </div>
  );
}

/* =============================================================
   INFO ROW
============================================================= */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-black/[0.05] pb-3 last:border-0 last:pb-0">
      <span className="text-[10px] text-black/30">
        {label}
      </span>

      <span className="truncate text-right text-[10px] font-semibold text-black/55">
        {value}
      </span>
    </div>
  );
}