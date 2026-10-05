import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  Globe,
  Radar,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { useState, type ReactNode } from "react";

type Step = "business" | "customer" | "signals" | "qualified";

const steps: {
  id: Step;
  number: string;
  title: string;
  description: string;
}[] = [
  {
    id: "business",
    number: "01",
    title: "Tell us what you sell",
    description: "Start with your website.",
  },
  {
    id: "customer",
    number: "02",
    title: "Define your customer",
    description: "Tell us who you want to reach.",
  },
  {
    id: "signals",
    number: "03",
    title: "Find buying signals",
    description: "We find people already showing intent.",
  },
  {
    id: "qualified",
    number: "04",
    title: "Get qualified opportunities",
    description: "Focus on the people most likely to buy.",
  },
];

export default function HeroExperience() {
  const [activeStep, setActiveStep] =
    useState<Step>("business");

  const [website, setWebsite] = useState("");

  return (
    <section className="relative isolate overflow-hidden px-5 pb-24 pt-32 sm:px-6 sm:pb-32 sm:pt-36 lg:px-8">
      {/* =====================================================
          FLOWING BACKGROUND
      ===================================================== */}

      <FlowingBackground />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-start gap-14 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
          
          {/* LEFT */}
          <HowItWorks
            activeStep={activeStep}
            onStepChange={setActiveStep}
          />

          {/* RIGHT */}
          <div className="min-w-0">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* EYEBROW */}

              <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/70 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45 shadow-sm backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-violet-600" />

                AI lead intelligence
              </div>

              {/* HERO TITLE */}

              <h1 className="mt-7 max-w-4xl text-[48px] font-semibold leading-[0.94] tracking-[-0.065em] sm:text-[64px] lg:text-[76px] xl:text-[84px]">
                Find customers
                <br />

                before they find
                <br />

                <span className="text-black/25">
                  someone else.
                </span>
              </h1>

              {/* DESCRIPTION */}

              <p className="mt-7 max-w-2xl text-[15px] leading-7 text-black/50 sm:text-lg">
                SignalFlow discovers people who are already
                showing signs they need what you sell, then
                turns those signals into qualified opportunities.
              </p>

              {/* WEBSITE INPUT */}

              <div className="mt-9 max-w-2xl">
                <div className="flex flex-col gap-2 rounded-[22px] border border-black/[0.08] bg-white/85 p-2 shadow-[0_25px_80px_rgba(0,0,0,0.07)] backdrop-blur-xl sm:flex-row">
                  <div className="flex min-h-[52px] flex-1 items-center gap-3 px-4">
                    <Globe className="h-4 w-4 shrink-0 text-black/30" />

                    <input
                      type="url"
                      value={website}
                      onChange={(event) =>
                        setWebsite(event.target.value)
                      }
                      placeholder="Paste your website"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-black/30"
                    />
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{
                      scale: 1.015,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() =>
                      setActiveStep("customer")
                    }
                    className="flex min-h-[52px] items-center justify-center gap-2 rounded-[16px] bg-[#111111] px-6 text-sm font-semibold text-white shadow-lg"
                  >
                    Find opportunities

                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>

                <p className="mt-3 text-xs text-black/30">
                  Start with your website. SignalFlow does the searching.
                </p>
              </div>
            </motion.div>

            {/* PRODUCT PREVIEW */}

            <ProductPreview
              activeStep={activeStep}
              onStepChange={setActiveStep}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   FLOWING BACKGROUND
========================================================= */

function FlowingBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Base atmosphere */}

      <div className="absolute inset-0 bg-[#f7f6f1]" />

      {/* Huge violet flow */}

      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -40, 60, 0],
          rotate: [0, 5, -4, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-[20%] top-[5%] h-[650px] w-[850px] rounded-[45%] bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.22),rgba(196,181,253,0.10)_45%,transparent_72%)] blur-[45px]"
      />

      {/* Blue flowing shape */}

      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 80, -40, 0],
          rotate: [0, -7, 4, 0],
          scale: [1, 0.94, 1.08, 1],
        }}
        transition={{
          duration: 27,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-[15%] top-[10%] h-[620px] w-[800px] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(125,211,252,0.19),rgba(186,230,253,0.08)_48%,transparent_72%)] blur-[55px]"
      />

      {/* Peach/pink flow */}

      <motion.div
        animate={{
          x: [0, 90, -70, 0],
          y: [0, -60, 40, 0],
          rotate: [0, 8, -5, 0],
          scale: [1, 1.12, 0.92, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[25%] -top-[18%] h-[520px] w-[700px] rounded-[48%] bg-[radial-gradient(ellipse_at_center,rgba(251,191,180,0.20),rgba(253,186,116,0.07)_45%,transparent_72%)] blur-[60px]"
      />

      {/* Large center flow */}

      <motion.div
        animate={{
          x: [-50, 70, -20, -50],
          y: [20, -50, 70, 20],
          rotate: [-4, 5, -2, -4],
        }}
        transition={{
          duration: 31,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[20%] top-[25%] h-[600px] w-[900px] rounded-[48%] bg-[radial-gradient(ellipse_at_center,rgba(221,214,254,0.16),transparent_68%)] blur-[70px]"
      />

      {/* Bottom soft glow */}

      <motion.div
        animate={{
          x: [0, -80, 70, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 29,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[35%] left-[15%] h-[650px] w-[1000px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(196,181,253,0.12),transparent_68%)] blur-[80px]"
      />

      {/* Very subtle flowing lines */}

      <motion.div
        animate={{
          x: ["-8%", "4%", "-8%"],
          y: ["0%", "-3%", "0%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-10%] top-[35%] h-[220px] w-[120%] rotate-[-7deg] rounded-[50%] border border-violet-300/[0.10] blur-[1px]"
      />

      <motion.div
        animate={{
          x: ["5%", "-5%", "5%"],
          y: ["0%", "4%", "0%"],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-10%] top-[42%] h-[260px] w-[120%] rotate-[6deg] rounded-[50%] border border-blue-300/[0.08] blur-[1px]"
      />

      {/* White fade keeps the center readable */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,246,241,0.18),transparent_55%)]" />

      {/* Subtle noise-like grid */}

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.7) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}


/* =========================================================
   HOW IT WORKS
========================================================= */

function HowItWorks({
  activeStep,
  onStepChange,
}: {
  activeStep: Step;
  onStepChange: (step: Step) => void;
}) {
  return (
    <div className="relative lg:sticky lg:top-32 lg:self-start">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
        How it works
      </p>

      <h2 className="mt-4 max-w-[240px] text-2xl font-semibold leading-tight tracking-[-0.045em]">
        From signal to opportunity.
      </h2>

      <p className="mt-4 max-w-[240px] text-sm leading-6 text-black/40">
        SignalFlow turns scattered buying signals into people your business can actually talk to.
      </p>

      <div className="relative mt-9">
        <div className="absolute left-[15px] top-4 bottom-4 w-px bg-black/[0.08]" />

        <motion.div
          className="absolute left-[15px] top-4 w-px origin-top bg-black"
          animate={{
            height:
              activeStep === "business"
                ? "0%"
                : activeStep === "customer"
                  ? "33%"
                  : activeStep === "signals"
                    ? "66%"
                    : "100%",
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <div className="relative space-y-2">
          {steps.map((step) => {
            const active = activeStep === step.id;

            return (
              <motion.button
                key={step.id}
                type="button"
                onClick={() =>
                  onStepChange(step.id)
                }
                whileHover={{
                  x: 3,
                }}
                className={`group relative flex w-full items-start gap-4 rounded-2xl p-3 text-left transition-all duration-300 ${
                  active
                    ? "bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md"
                    : "hover:bg-white/40"
                }`}
              >
                <motion.div
                  animate={{
                    scale: active ? 1.08 : 1,
                  }}
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold transition-all ${
                    active
                      ? "border-[#111111] bg-[#111111] text-white"
                      : "border-black/[0.1] bg-[#f7f6f1] text-black/35 group-hover:border-black/20"
                  }`}
                >
                  {active ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    step.number
                  )}
                </motion.div>

                <div className="pt-0.5">
                  <p
                    className={`text-xs font-semibold ${
                      active
                        ? "text-black"
                        : "text-black/45"
                    }`}
                  >
                    {step.title}
                  </p>

                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.p
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        className="mt-1.5 max-w-[185px] overflow-hidden text-[11px] leading-5 text-black/40"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-[10px] font-medium text-black/30">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
        Live lead discovery
      </div>
    </div>
  );
}


/* =========================================================
   PRODUCT PREVIEW
========================================================= */

function ProductPreview({
  activeStep,
  onStepChange,
}: {
  activeStep: Step;
  onStepChange: (step: Step) => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.2,
      }}
      className="mt-16 overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/80 shadow-[0_35px_100px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:mt-20"
    >
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          </div>

          <span className="text-xs font-medium text-black/35">
            SignalFlow
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-medium text-black/35">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          Live discovery
        </div>
      </div>

      <div className="bg-[#fafaf7]/90 p-5 sm:p-8 lg:p-10">
        <AnimatePresence mode="wait">
          {activeStep === "business" && (
            <BusinessPreview key="business" />
          )}

          {activeStep === "customer" && (
            <CustomerPreview key="customer" />
          )}

          {activeStep === "signals" && (
            <SignalsPreview key="signals" />
          )}

          {activeStep === "qualified" && (
            <QualifiedPreview key="qualified" />
          )}
        </AnimatePresence>

        <div className="mt-7 flex items-center justify-between border-t border-black/[0.06] pt-5">
          <div className="text-[10px] text-black/30">
            SignalFlow intelligence engine
          </div>

          <div className="flex gap-1.5">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() =>
                  onStepChange(step.id)
                }
                className={`h-1.5 rounded-full transition-all ${
                  activeStep === step.id
                    ? "w-7 bg-black"
                    : "w-1.5 bg-black/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


/* =========================================================
   BUSINESS
========================================================= */

function BusinessPreview() {
  return (
    <PreviewShell
      eyebrow="01 · Your business"
      title="Tell SignalFlow what you sell."
      description="SignalFlow analyzes your website and turns your business into a profile it can use to find relevant opportunities."
    >
      <div className="rounded-[22px] border border-black/[0.07] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
            <Globe className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold">
              Company website
            </p>

            <p className="mt-0.5 text-xs text-black/35">
              signalflow-demo.com
            </p>
          </div>

          <div className="ml-auto rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold text-green-700">
            Analyzed
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["What you sell", "AI automation"],
            ["Best customers", "Service businesses"],
            ["Market", "East Africa"],
          ].map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="rounded-2xl bg-[#f7f7f3] p-4"
            >
              <p className="text-[9px] font-semibold uppercase tracking-wider text-black/30">
                {label}
              </p>

              <p className="mt-2 text-xs font-medium">
                {value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </PreviewShell>
  );
}


/* =========================================================
   CUSTOMER
========================================================= */

function CustomerPreview() {
  return (
    <PreviewShell
      eyebrow="02 · Ideal customer"
      title="Define who you want to find."
      description="Give SignalFlow enough context to understand which people are worth your attention."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          {
            label: "Job titles",
            values: ["Founder", "Owner", "Director"],
          },
          {
            label: "Industries",
            values: ["Healthcare", "SaaS", "Services"],
          },
          {
            label: "Locations",
            values: ["Kigali", "Rwanda", "East Africa"],
          },
          {
            label: "Needs",
            values: ["Automation", "Lead generation", "AI"],
          },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            className="rounded-2xl border border-black/[0.07] bg-white p-4"
          >
            <p className="text-[9px] font-semibold uppercase tracking-wider text-black/30">
              {item.label}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.values.map((value) => (
                <span
                  key={value}
                  className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[10px] font-medium text-black/55"
                >
                  {value}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
        <Target className="h-4 w-4 text-violet-600" />

        <span className="text-xs font-medium text-violet-900">
          Ideal customer profile ready
        </span>

        <Check className="ml-auto h-4 w-4 text-violet-600" />
      </div>
    </PreviewShell>
  );
}


/* =========================================================
   SIGNALS
========================================================= */

function SignalsPreview() {
  const signals = [
    {
      source: "LinkedIn",
      title: "Looking for an AI receptionist",
      description:
        "A clinic director is actively looking for a better way to handle WhatsApp inquiries.",
      score: 94,
    },
    {
      source: "Web",
      title: "Need help automating bookings",
      description:
        "A growing healthcare business is evaluating automation options.",
      score: 89,
    },
    {
      source: "Community",
      title: "How are you handling inbound leads?",
      description:
        "Founder discussing lead response time and customer follow-up.",
      score: 84,
    },
  ];

  return (
    <PreviewShell
      eyebrow="03 · Buying signals"
      title="Find people already showing intent."
      description="SignalFlow searches for public signals that match your business and your ideal customer."
    >
      <div className="space-y-3">
        {signals.map((signal, index) => (
          <motion.div
            key={signal.title}
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.12,
            }}
            className="rounded-2xl border border-black/[0.07] bg-white p-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.05]">
                {signal.source === "LinkedIn" ? (
                  <span className="text-xs font-bold text-[#0A66C2]">
                    in
                  </span>
                ) : signal.source === "Web" ? (
                  <Globe className="h-4 w-4 text-black/45" />
                ) : (
                  <Radar className="h-4 w-4 text-violet-600" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-black/30">
                    {signal.source}
                  </span>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-semibold text-green-700">
                    {signal.score} intent
                  </span>
                </div>

                <h3 className="mt-2 text-xs font-semibold sm:text-sm">
                  {signal.title}
                </h3>

                <p className="mt-1.5 text-[11px] leading-5 text-black/40">
                  {signal.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PreviewShell>
  );
}


/* =========================================================
   QUALIFIED
========================================================= */

function QualifiedPreview() {
  return (
    <PreviewShell
      eyebrow="04 · Qualified opportunity"
      title="Know who to talk to first."
      description="Every opportunity comes with evidence, intent and an overall score."
    >
      <div className="rounded-[22px] border border-black/[0.08] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-sm font-semibold text-white">
            JC
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Dr. Jean Claude
            </h3>

            <p className="mt-1 text-xs text-black/40">
              Clinic Director · Kigali Dental Care
            </p>
          </div>

          <div className="ml-auto text-right">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-black/30">
              Score
            </p>

            <motion.p
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 12,
              }}
              className="text-3xl font-semibold tracking-[-0.05em]"
            >
              94
            </motion.p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-[#f7f7f3] p-4">
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-black/35" />

            <p className="text-[9px] font-semibold uppercase tracking-wider text-black/35">
              Buying signal
            </p>
          </div>

          <p className="mt-2 text-sm font-medium">
            Looking for an AI receptionist for WhatsApp bookings.
          </p>

          <p className="mt-2 text-[11px] leading-5 text-black/40">
            Strong match with your target customer and service.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ["ICP", "20/20"],
            ["Intent", "24/25"],
            ["Fit", "50/55"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-black/[0.06] p-3"
            >
              <p className="text-[9px] uppercase tracking-wider text-black/30">
                {label}
              </p>

              <p className="mt-1 text-sm font-semibold">
                {value}
              </p>
            </div>
          ))}
        </div>

        <motion.button
          type="button"
          whileHover={{
            scale: 1.01,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3.5 text-xs font-semibold text-white"
        >
          Generate personalized outreach

          <ArrowRight className="h-3.5 w-3.5" />
        </motion.button>
      </div>
    </PreviewShell>
  );
}


/* =========================================================
   PREVIEW SHELL
========================================================= */

function PreviewShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -18,
      }}
      transition={{
        duration: 0.4,
      }}
      className="mx-auto max-w-3xl"
    >
      <div className="mb-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-600">
          {eyebrow}
        </p>

        <h2 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.045em] sm:text-3xl">
          {title}
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
          {description}
        </p>
      </div>

      {children}
    </motion.div>
  );
}