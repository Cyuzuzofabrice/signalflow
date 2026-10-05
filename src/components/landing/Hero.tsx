
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Globe2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-36 sm:px-6 sm:pt-44 lg:px-8 lg:pb-28">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-200/25 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/55 backdrop-blur-sm">
            <Sparkles size={13} />
            AI lead intelligence
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.08,
          }}
          className="mx-auto max-w-5xl text-center"
        >
          <h1 className="text-balance text-[clamp(3.2rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-[#111111]">
            Find customers
            <br />
            <span className="text-black/35">
              before they find someone else.
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.18,
          }}
          className="mx-auto mt-8 max-w-xl text-center text-base leading-7 text-black/50 sm:text-lg"
        >
          SignalFlow discovers buying signals, identifies
          the people who fit your business, and turns intent
          into qualified opportunities.
        </motion.p>

        {/* Website input */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.28,
          }}
          className="mx-auto mt-9 max-w-xl"
        >
          <div className="flex flex-col gap-2 rounded-[22px] border border-black/[0.09] bg-white p-2 shadow-[0_20px_70px_rgba(0,0,0,0.08)] sm:flex-row">
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
              <Globe2
                size={18}
                className="shrink-0 text-black/30"
              />

              <input
                type="url"
                placeholder="https://yourcompany.com"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-black outline-none placeholder:text-black/30"
              />
            </div>

            <Link
              to="/register"
              className="group flex items-center justify-center gap-2 rounded-[16px] bg-[#111111] px-5 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.01]"
            >
              Find opportunities
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-black/35">
            <Check size={13} />
            Start with your business website
            <span>·</span>
            No credit card required
          </div>
        </motion.div>

        {/* Product preview */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.42,
          }}
          className="relative mx-auto mt-20 max-w-6xl"
        >
          <div className="overflow-hidden rounded-[28px] border border-black/[0.09] bg-white shadow-[0_35px_100px_rgba(0,0,0,0.1)]">
            {/* Browser bar */}
            <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-3.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
              </div>

              <div className="hidden rounded-full bg-black/[0.035] px-4 py-1.5 text-[10px] text-black/30 sm:block">
                app.signalflow.ai
              </div>

              <div className="w-10" />
            </div>

            {/* Preview */}
            <div className="grid min-h-[390px] grid-cols-1 lg:grid-cols-[210px_1fr]">
              {/* Sidebar */}
              <aside className="hidden border-r border-black/[0.06] bg-[#fafaf8] p-5 lg:block">
                <div className="mb-8 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111111]">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                  <span className="text-xs font-semibold">
                    SignalFlow
                  </span>
                </div>

                <div className="space-y-1">
                  {[
                    "Overview",
                    "Opportunities",
                    "Signals",
                    "Campaigns",
                    "Messages",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-xl px-3 py-2.5 text-[11px] ${
                        index === 0
                          ? "bg-black/[0.06] font-semibold text-black"
                          : "text-black/40"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </aside>

              {/* Main preview */}
              <div className="p-5 sm:p-7 lg:p-9">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                      Overview
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em]">
                      Your opportunities
                    </h3>
                  </div>

                  <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-600 sm:block">
                    7 high intent
                  </span>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[
                    ["24", "Leads found"],
                    ["7", "High intent"],
                    ["94%", "Avg. score"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-black/[0.06] bg-[#fafaf8] p-4"
                    >
                      <p className="text-2xl font-semibold tracking-[-0.04em]">
                        {value}
                      </p>
                      <p className="mt-1 text-[10px] text-black/35">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-black/[0.06]">
                  <div className="border-b border-black/[0.06] px-4 py-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30">
                      Recent opportunities
                    </span>
                  </div>

                  {[
                    {
                      name: "Dr. Jean Claude",
                      company: "Kigali Dental Care",
                      score: 94,
                    },
                    {
                      name: "Sarah Mukamana",
                      company: "Bright Dental",
                      score: 91,
                    },
                    {
                      name: "Eric Niyonzima",
                      company: "Nova Health",
                      score: 87,
                    },
                  ].map((lead) => (
                    <div
                      key={lead.name}
                      className="flex items-center justify-between gap-4 border-b border-black/[0.05] px-4 py-3.5 last:border-b-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold">
                          {lead.name}
                        </p>
                        <p className="mt-0.5 truncate text-[10px] text-black/35">
                          {lead.company}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <span className="hidden rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600 sm:block">
                          HIGH INTENT
                        </span>

                        <span className="text-sm font-semibold">
                          {lead.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
