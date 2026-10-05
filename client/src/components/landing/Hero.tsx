import { ArrowRight, Check, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-black/60"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI LEAD INTELLIGENCE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-8xl"
          >
            Find customers
            <br />
            before they find
            <br />
            someone else.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-7 text-black/55 sm:text-lg"
          >
            SignalFlow discovers buying signals, qualifies prospects, and
            shows you who is most likely to need what you sell.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm">
              <Search className="h-5 w-5 text-black/35" />

              <input
                type="text"
                placeholder="yourwebsite.com"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-black/30"
              />
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#111111] px-6 py-3 text-sm font-medium text-white transition hover:bg-black/80">
              Find opportunities
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          <p className="mt-4 text-xs text-black/35">
            Discover signals. Score opportunities. Take action.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-20 max-w-6xl"
        >
          <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
              <div>
                <p className="text-sm font-semibold">Opportunity feed</p>
                <p className="mt-0.5 text-xs text-black/40">
                  Live buying signals
                </p>
              </div>

              <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                Live
              </div>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-3">
              <div className="rounded-2xl bg-[#f7f7f3] p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-black/35">
                  Opportunities
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">
                  128
                </p>
                <p className="mt-1 text-xs text-green-600">
                  +18% this week
                </p>
              </div>

              <div className="rounded-2xl bg-[#f7f7f3] p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-black/35">
                  High intent
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">
                  24
                </p>
                <p className="mt-1 text-xs text-black/40">
                  Ready for outreach
                </p>
              </div>

              <div className="rounded-2xl bg-[#f7f7f3] p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-black/35">
                  Avg. score
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">
                  82
                </p>
                <p className="mt-1 text-xs text-black/40">
                  Across qualified leads
                </p>
              </div>
            </div>

            <div className="border-t border-black/5">
              {[
                {
                  name: "Kigali Dental Care",
                  role: "Clinic Director",
                  signal: "Looking for AI receptionist",
                  score: 94,
                },
                {
                  name: "Nova Health",
                  role: "Founder",
                  signal: "Exploring WhatsApp automation",
                  score: 88,
                },
                {
                  name: "Urban Dental",
                  role: "Owner",
                  signal: "Searching for appointment software",
                  score: 81,
                },
              ].map((lead) => (
                <div
                  key={lead.name}
                  className="flex items-center justify-between gap-4 border-b border-black/5 px-5 py-4 last:border-b-0"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-xs font-semibold text-white">
                      {lead.name
                        .split(" ")
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {lead.name}
                      </p>
                      <p className="truncate text-xs text-black/40">
                        {lead.role} · {lead.signal}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Check className="hidden h-4 w-4 text-green-600 sm:block" />

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {lead.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}