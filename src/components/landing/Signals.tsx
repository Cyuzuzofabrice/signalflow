import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Globe,
  Radar,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  {
    id: "scan",
    label: "Scanning website",
  },
  {
    id: "signal",
    label: "Buying signal detected",
  },
  {
    id: "qualify",
    label: "Matching your ICP",
  },
  {
    id: "score",
    label: "Opportunity qualified",
  },
];

export default function SignalDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((current) => (current + 1) % steps.length);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="product"
      className="relative px-6 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT SIDE */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-black/55">
                <Radar className="h-3.5 w-3.5" />
                SIGNAL INTELLIGENCE
              </div>

              <h2 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Stop searching for
                <br />
                customers.
                <br />
                <span className="text-black/35">
                  Find the ones already looking.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-black/50">
                SignalFlow watches for public buying signals, compares them
                against your ideal customer profile, and turns them into
                actionable opportunities.
              </p>

              <div className="mt-8 space-y-3">
                {steps.map((item, index) => (
                  <motion.div
                    key={item.id}
                    animate={{
                      opacity: index <= step ? 1 : 0.35,
                      x: index === step ? 6 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                        index <= step
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-white text-black/30"
                      }`}
                    >
                      {index < step ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <span className="text-[10px] font-semibold">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.1)]">
              {/* WINDOW HEADER */}
              <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                  </div>

                  <span className="ml-3 text-xs font-medium text-black/40">
                    SignalFlow
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-green-600">
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-green-500"
                  />
                  Live
                </div>
              </div>

              {/* CONTENT */}
              <div className="min-h-[470px] bg-[#fafaf7] p-5 sm:p-7">
                <AnimatePresence mode="wait">
                  {step === 0 && <Scanning key="scan" />}
                  {step === 1 && <SignalDetected key="signal" />}
                  {step === 2 && <Qualification key="qualify" />}
                  {step === 3 && <QualifiedLead key="score" />}
                </AnimatePresence>
              </div>
            </div>

            {/* FLOATING SIGNAL */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-4 top-20 hidden rounded-2xl border border-black/10 bg-white p-4 shadow-xl sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
                  <Sparkles className="h-4 w-4 text-violet-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    New signal
                  </p>
                  <p className="mt-0.5 text-[11px] text-black/40">
                    High buying intent
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Scanning() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex h-full min-h-[420px] flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
              <Globe className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Your company
              </p>

              <p className="text-xs text-black/40">
                kigalidentalcare.com
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-black/45">
                Analyzing public signals
              </span>

              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                }}
                className="font-medium"
              >
                Scanning
              </motion.span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-black/5">
              <motion.div
                initial={{ width: "5%" }}
                animate={{ width: "92%" }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="h-full rounded-full bg-black"
              />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {[
              "Website analyzed",
              "Company profile identified",
              "Public conversations scanned",
            ].map((text, index) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.4,
                }}
                className="flex items-center gap-2 text-xs text-black/50"
              >
                <Check className="h-3.5 w-3.5 text-green-600" />
                {text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SignalDetected() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="flex min-h-[420px] items-center justify-center"
    >
      <div className="w-full max-w-md">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-violet-600">
          <Zap className="h-3.5 w-3.5" />
          Buying signal detected
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.03em]">
                Looking for an AI receptionist
              </h3>

              <p className="mt-2 text-sm leading-6 text-black/50">
                Public activity suggests the company is actively exploring
                automated WhatsApp conversations and appointment booking.
              </p>
            </div>

            <div className="shrink-0 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              94 intent
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#f7f7f3] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
              Evidence
            </p>

            <p className="mt-2 text-sm leading-6 text-black/65">
              “We are looking for a better way to handle WhatsApp inquiries
              and appointment requests.”
            </p>

            <p className="mt-3 text-xs text-black/35">
              Public web signal · detected today
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Qualification() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex min-h-[420px] items-center justify-center"
    >
      <div className="w-full max-w-md">
        <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/40">
          <Target className="h-3.5 w-3.5" />
          ICP qualification
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Industry", "Healthcare", true],
              ["Location", "Kigali, Rwanda", true],
              ["Decision maker", "Clinic Director", true],
              ["Keywords", "AI receptionist", true],
            ].map(([label, value, matched]) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay:
                    ["Industry", "Location", "Decision maker", "Keywords"].indexOf(
                      label as string,
                    ) * 0.12,
                }}
                className="rounded-2xl bg-[#f7f7f3] p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-wider text-black/35">
                    {label}
                  </p>

                  {matched && (
                    <Check className="h-3.5 w-3.5 text-green-600" />
                  )}
                </div>

                <p className="mt-2 text-sm font-medium">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1 }}
            className="mt-5 h-1 rounded-full bg-black"
          />

          <p className="mt-4 text-xs text-black/40">
            Strong ICP match detected across company, role, location and
            buying intent.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function QualifiedLead() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="flex min-h-[420px] items-center justify-center"
    >
      <div className="w-full max-w-md">
        <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-green-600">
          <Sparkles className="h-3.5 w-3.5" />
          High-intent opportunity
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-sm font-semibold text-white">
              JC
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Dr. Jean Claude
              </h3>

              <p className="mt-1 text-sm text-black/40">
                Clinic Director · Kigali Dental Care
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-black/35">
                Opportunity score
              </p>

              <motion.p
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 12,
                }}
                className="mt-2 text-6xl font-semibold tracking-[-0.06em]"
              >
                94
              </motion.p>
            </div>

            <div className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              HIGH INTENT
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {[
              ["ICP", "20/20"],
              ["Signal", "24/25"],
              ["Fit", "50/55"],
            ].map(([label, value], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="rounded-2xl bg-[#f7f7f3] p-3"
              >
                <p className="text-[10px] uppercase tracking-wider text-black/35">
                  {label}
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3.5 text-sm font-medium text-white"
          >
            Generate personalized outreach
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}