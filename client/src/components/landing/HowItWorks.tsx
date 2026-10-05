import {
  motion,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Globe,
  Mail,
  MapPin,
  Radar,
  Search,
  Sparkles,
  Target,
  UserRound,
    
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

type Step = "business" | "customer" | "signals" | "qualified";

const steps: {
  id: Step;
  number: string;
  label: string;
}[] = [
  {
    id: "business",
    number: "01",
    label: "Your business",
  },
  {
    id: "customer",
    number: "02",
    label: "Ideal customer",
  },
  {
    id: "signals",
    number: "03",
    label: "Buying signals",
  },
  {
    id: "qualified",
    number: "04",
    label: "Qualified opportunity",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] =
    useState<Step>("business");

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#f7f7f3] px-5 py-28 sm:px-6 sm:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* SECTION INTRO */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-16 max-w-2xl lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45 shadow-sm">
            <Sparkles className="h-3 w-3 text-violet-600" />
            How it works
          </div>

          <h2 className="mt-6 text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl lg:text-7xl">
            Find customers
            <br />
            before they find
            <br />
            <span className="text-black/25">
              someone else.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-black/45 sm:text-base">
            Give SignalFlow your website. We work out who
            you sell to, find people showing buying intent,
            and turn those signals into qualified
            opportunities.
          </p>
        </motion.div>

        {/* MAIN EXPERIENCE */}
        <div className="grid items-start gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* LEFT STICKY SIDE */}
          <div className="lg:sticky lg:top-32">
            <StepNavigation
              activeStep={activeStep}
              onChange={setActiveStep}
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.25,
                duration: 0.6,
              }}
              className="mt-10 hidden rounded-[24px] border border-black/[0.07] bg-white p-5 lg:block"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black">
                  <Radar className="h-4 w-4 text-white" />
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    SignalFlow is working
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-black/40">
                    Discovery, qualification and enrichment
                    happen in one continuous workflow.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT INTERACTIVE PRODUCT */}
          <div className="relative">
            {/* CONNECTING LINE */}
            <div className="absolute bottom-8 left-[19px] top-8 hidden w-px bg-black/[0.08] sm:block" />

            <div className="space-y-8">
              <BusinessStep
                activeStep={activeStep}
                onActive={() =>
                  setActiveStep("business")
                }
              />

              <CustomerStep
                activeStep={activeStep}
                onActive={() =>
                  setActiveStep("customer")
                }
              />

              <SignalsStep
                activeStep={activeStep}
                onActive={() =>
                  setActiveStep("signals")
                }
              />

              <QualifiedStep
                activeStep={activeStep}
                onActive={() =>
                  setActiveStep("qualified")
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   LEFT NAVIGATION
========================================================= */

function StepNavigation({
  activeStep,
  onChange,
}: {
  activeStep: Step;
  onChange: (step: Step) => void;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-black/30">
        SignalFlow process
      </p>

      <div className="mt-6 space-y-1">
        {steps.map((step) => {
          const active =
            activeStep === step.id;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => {
                onChange(step.id);

                document
                  .getElementById(
                    `signalflow-step-${step.id}`,
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
              }}
              className={`group flex w-full items-center gap-4 rounded-2xl px-3 py-3.5 text-left transition-all duration-300 ${
                active
                  ? "bg-black text-white shadow-[0_12px_35px_rgba(0,0,0,0.12)]"
                  : "text-black/40 hover:bg-white hover:text-black"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  active
                    ? "bg-white text-black"
                    : "bg-black/[0.05] text-black/35"
                }`}
              >
                {step.number}
              </span>

              <span className="flex-1 text-sm font-medium">
                {step.label}
              </span>

              <ChevronRight
                className={`h-4 w-4 transition-transform duration-300 ${
                  active
                    ? "translate-x-0 text-white/60"
                    : "-translate-x-1 text-black/15 group-hover:translate-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <motion.a
        href="/register"
        whileHover={{
          x: 4,
        }}
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
      >
        Launch SignalFlow

        <ArrowRight className="h-4 w-4" />
      </motion.a>
    </div>
  );
}

/* =========================================================
   STEP WRAPPER
========================================================= */

function StepCard({
  id,
  number,
  eyebrow,
  title,
  description,
  activeStep,
  step,
  onActive,
  children,
}: {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  activeStep: Step;
  step: Step;
  onActive: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    amount: 0.45,
    margin: "-10% 0px -10% 0px",
  });

  useEffect(() => {
    if (isInView) {
      onActive();
    }
  }, [isInView, onActive]);

  const active = activeStep === step;

  return (
    <motion.article
      id={id}
      ref={ref}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-0 sm:pl-12"
    >
      {/* NUMBER NODE */}
      <motion.div
        animate={{
          scale: active ? 1.08 : 1,
          backgroundColor: active
            ? "#111111"
            : "#ffffff",
          borderColor: active
            ? "#111111"
            : "rgba(0,0,0,0.10)",
        }}
        transition={{
          duration: 0.3,
        }}
        className="absolute left-0 top-6 z-20 hidden h-10 w-10 items-center justify-center rounded-full border sm:flex"
      >
        <span
          className={`text-[10px] font-bold ${
            active
              ? "text-white"
              : "text-black/35"
          }`}
        >
          {number}
        </span>
      </motion.div>

      <motion.div
        animate={{
          y: active ? -4 : 0,
          boxShadow: active
            ? "0 25px 80px rgba(0,0,0,0.09)"
            : "0 8px 30px rgba(0,0,0,0.025)",
        }}
        transition={{
          duration: 0.35,
        }}
        className="overflow-hidden rounded-[30px] border border-black/[0.08] bg-white"
      >
        {/* CARD HEADER */}
        <div className="border-b border-black/[0.06] p-6 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-600">
                {eyebrow}
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
                {title}
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
                {description}
              </p>
            </div>

            <div
              className={`hidden shrink-0 rounded-full px-3 py-1.5 text-[10px] font-semibold sm:block ${
                active
                  ? "bg-black text-white"
                  : "bg-black/[0.04] text-black/30"
              }`}
            >
              {number}
            </div>
          </div>
        </div>

        {/* PRODUCT UI */}
        <div className="bg-[#fafaf7] p-5 sm:p-7">
          {children}
        </div>
      </motion.div>
    </motion.article>
  );
}

/* =========================================================
   01 BUSINESS
========================================================= */

function BusinessStep({
  activeStep,
  onActive,
}: {
  activeStep: Step;
  onActive: () => void;
}) {
  return (
    <StepCard
      id="signalflow-step-business"
      number="01"
      eyebrow="01 · Your business"
      title="Paste your website."
      description="That's the whole setup. SignalFlow learns what you sell, who you serve, and what a valuable opportunity looks like."
      activeStep={activeStep}
      step="business"
      onActive={onActive}
    >
      <div className="rounded-[22px] border border-black/[0.08] bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex min-h-[52px] flex-1 items-center gap-3 rounded-2xl border border-black/[0.08] px-4">
            <Globe className="h-4 w-4 text-black/30" />

            <span className="text-sm text-black/50">
              https://yourcompany.com
            </span>
          </div>

          <motion.button
            type="button"
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-black px-6 text-sm font-semibold text-white"
          >
            Continue

            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <MiniInsight
            label="What you sell"
            value="AI automation"
          />

          <MiniInsight
            label="Customers"
            value="Service businesses"
          />

          <MiniInsight
            label="Market"
            value="East Africa"
          />
        </div>
      </div>
    </StepCard>
  );
}

/* =========================================================
   02 CUSTOMER
========================================================= */

function CustomerStep({
  activeStep,
  onActive,
}: {
  activeStep: Step;
  onActive: () => void;
}) {
  return (
    <StepCard
      id="signalflow-step-customer"
      number="02"
      eyebrow="02 · Ideal customer"
      title="Who we look for, and where."
      description="SignalFlow creates an ideal customer profile from your business, then lets you refine exactly who you want."
      activeStep={activeStep}
      step="customer"
      onActive={onActive}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <FilterGroup
          icon={UserRound}
          label="Job titles"
          values={[
            "Founder / CEO",
            "Owner",
            "Operations manager",
          ]}
        />

        <FilterGroup
          icon={Target}
          label="Industries"
          values={[
            "Healthcare",
            "SaaS",
            "Professional services",
          ]}
        />

        <FilterGroup
          icon={MapPin}
          label="Locations"
          values={[
            "Rwanda",
            "Kenya",
            "East Africa",
          ]}
        />

        <FilterGroup
          icon={Search}
          label="What they need"
          values={[
            "AI automation",
            "Lead generation",
            "Booking automation",
          ]}
        />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.2,
        }}
        className="mt-4 flex items-center justify-between rounded-2xl border border-violet-100 bg-violet-50/70 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100">
            <Target className="h-4 w-4 text-violet-600" />
          </div>

          <div>
            <p className="text-xs font-semibold text-violet-950">
              Ideal customer ready
            </p>

            <p className="mt-0.5 text-[10px] text-violet-700/60">
              SignalFlow will use this profile to qualify
              opportunities.
            </p>
          </div>
        </div>

        <Check className="h-4 w-4 text-violet-600" />
      </motion.div>
    </StepCard>
  );
}

/* =========================================================
   03 SIGNALS
========================================================= */

function SignalsStep({
  activeStep,
  onActive,
}: {
  activeStep: Step;
  onActive: () => void;
}) {
  const signals = [
    {
      initials: "P",
      name: "Priya Raman",
      role: "Practice owner · Northside Dental",
      text: "Anyone know an agency that sets up an AI receptionist for clinics?",
      source: "LinkedIn",
      score: 94,
    },
    {
      initials: "M",
      name: "Marcus Hale",
      role: "Owner · Hale Roofing",
      text: "Nobody replies to our leads until morning. Who fixes this?",
      source: "Web",
      score: 91,
    },
    {
      initials: "T",
      name: "Tom Alvarez",
      role: "Founder · Verde Landscaping",
      text: "Looking for a better way to handle incoming leads.",
      source: "Community",
      score: 88,
    },
  ];

  return (
    <StepCard
      id="signalflow-step-signals"
      number="03"
      eyebrow="03 · Buying signals"
      title="Find people already showing intent."
      description="SignalFlow searches public conversations and surfaces people who are already talking about problems your product can solve."
      activeStep={activeStep}
      step="signals"
      onActive={onActive}
    >
      <div className="mb-5 flex items-center gap-2 text-[10px] font-medium text-black/35">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />

        Using SignalFlow to find posts where people ask
        for what you sell...
      </div>

      <div className="space-y-3">
        {signals.map((signal, index) => (
          <motion.div
            key={signal.name}
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.12,
            }}
            className="rounded-[22px] border border-black/[0.07] bg-white p-4 sm:p-5"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-xs font-semibold text-white">
                {signal.initials}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">
                      {signal.name}
                    </p>

                    <p className="mt-0.5 text-[10px] text-black/35">
                      {signal.role}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-bold text-green-700">
                    {signal.score} intent
                  </span>
                </div>

                <div className="mt-3 rounded-xl bg-[#f7f7f3] p-3">
                  <p className="text-xs leading-5 text-black/65">
                    “{signal.text}”
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[9px] font-semibold text-black/40">
                    {signal.source}
                  </span>

                  <span className="text-[9px] text-black/25">
                    Found just now
                  </span>

                  <Check className="ml-auto h-3.5 w-3.5 text-green-500" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </StepCard>
  );
}

/* =========================================================
   04 QUALIFIED
========================================================= */

function QualifiedStep({
  activeStep,
  onActive,
}: {
  activeStep: Step;
  onActive: () => void;
}) {
  return (
    <StepCard
      id="signalflow-step-qualified"
      number="04"
      eyebrow="04 · Qualified opportunity"
      title="You get the signal and the contact."
      description="Every opportunity comes with the evidence, qualification score and available contact information so you know exactly why it matters."
      activeStep={activeStep}
      step="qualified"
      onActive={onActive}
    >
      <div className="rounded-[24px] border border-black/[0.08] bg-white p-5 shadow-sm sm:p-6">
        {/* PERSON */}
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-xs font-semibold text-white">
            PR
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-semibold">
              Priya Raman
            </h4>

            <p className="mt-0.5 text-[10px] text-black/40">
              Practice owner · Northside Dental
            </p>

            <div className="mt-2 flex items-center gap-1.5 text-[9px] font-medium text-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

              Found just now
            </div>
          </div>

          <div className="ml-auto shrink-0 text-right">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-black/30">
              Qualification
            </p>

            <motion.p
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 12,
              }}
              className="mt-0.5 text-3xl font-semibold tracking-[-0.06em]"
            >
              94%
            </motion.p>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-5 rounded-2xl bg-[#f7f7f3] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-black/30">
                Qualification summary
              </p>

              <p className="mt-1.5 text-sm font-semibold">
                Perfect fit
              </p>
            </div>

            <span className="rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-bold text-green-700">
              HIGH INTENT
            </span>
          </div>

          <p className="mt-3 text-xs leading-5 text-black/50">
            Priya is a practice owner who can make the
            decision. Northside Dental is missing calls
            after hours, making an AI receptionist highly
            relevant.
          </p>
        </div>

        {/* SCORE */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <ScoreBox
            label="ICP match"
            value="20/20"
          />

          <ScoreBox
            label="Intent"
            value="24/25"
          />

          <ScoreBox
            label="Fit"
            value="50/55"
          />
        </div>

        {/* CONTACT */}
        <div className="mt-4">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-black/30">
            How to reach them
          </p>

          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <ContactItem
              icon={Globe}
              label="Website"
              value="northsidedental.com"
            />

            <ContactItem
              icon={Mail}
              label="Email"
              value="priya@northsidedental.com"
            />
          </div>
        </div>

        {/* CTA */}
        <motion.button
          type="button"
          whileHover={{
            scale: 1.01,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-4 text-sm font-semibold text-white shadow-lg"
        >
          Generate personalized outreach

          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </StepCard>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function MiniInsight({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#f7f7f3] p-3">
      <p className="text-[9px] font-semibold uppercase tracking-wider text-black/30">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium">
        {value}
      </p>
    </div>
  );
}

function FilterGroup({
  icon: Icon,
  label,
  values,
}: {
  icon: typeof Target;
  label: string;
  values: string[];
}) {
  return (
    <div className="rounded-[20px] border border-black/[0.07] bg-white p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-black/30" />

        <p className="text-[10px] font-semibold uppercase tracking-wider text-black/35">
          {label}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {values.map((value) => (
          <span
            key={value}
            className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.045] px-2.5 py-1.5 text-[10px] font-medium text-black/60"
          >
            {value}

            <span className="text-black/25">
              ×
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ScoreBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-black/[0.06] p-3">
      <p className="text-[8px] uppercase tracking-wider text-black/30">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Globe;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-black/[0.06] p-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-black/[0.04]">
        <Icon className="h-3.5 w-3.5 text-black/40" />
      </div>

      <div className="min-w-0">
        <p className="text-[8px] uppercase tracking-wider text-black/25">
          {label}
        </p>

        <p className="mt-0.5 truncate text-[10px] font-medium text-black/60">
          {value}
        </p>
      </div>

      <Check className="ml-auto h-3 w-3 shrink-0 text-green-500" />
    </div>
  );
}