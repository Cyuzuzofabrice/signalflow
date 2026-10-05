import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock3,
  ShieldCheck,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Pricing() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 0,
    minutes: 18,
    seconds: 9,
  });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft((current) => {
        let { days, hours, minutes, seconds } = current;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours -= 1;
            } else if (days > 0) {
              hours = 23;
              days -= 1;
            }
          }
        }

        return {
          days,
          hours,
          minutes,
          seconds,
        };
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="pricing"
      className="relative overflow-hidden px-5 py-28 sm:px-6 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        {/* Offer heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700">
            <Clock3 className="h-3.5 w-3.5" />
            Launch offer
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl lg:text-6xl">
            Start finding
            <br />
            <span className="text-black/30">your next customers.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-black/45 sm:text-base">
            Get SignalFlow at the launch price while we're opening the
            platform to our first agencies and teams.
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-9 flex max-w-md items-center justify-center gap-2 sm:gap-3"
        >
          <TimeBox
            value={timeLeft.days}
            label="days"
          />

          <span className="pb-5 text-lg font-semibold text-black/20">
            :
          </span>

          <TimeBox
            value={timeLeft.hours}
            label="hours"
          />

          <span className="pb-5 text-lg font-semibold text-black/20">
            :
          </span>

          <TimeBox
            value={timeLeft.minutes}
            label="minutes"
          />

          <span className="pb-5 text-lg font-semibold text-black/20">
            :
          </span>

          <TimeBox
            value={timeLeft.seconds}
            label="seconds"
          />
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-7 max-w-2xl rounded-2xl border border-black/[0.07] bg-white p-4 text-center shadow-sm"
        >
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-600" />

            <p className="text-sm font-semibold">
              Your first qualified opportunities are on us.
            </p>
          </div>

          <p className="mt-1.5 text-xs leading-5 text-black/40">
            If SignalFlow doesn't deliver meaningful qualified opportunities
            during your first week, we'll make it right.
          </p>

          <button className="mt-2 text-xs font-medium text-black underline decoration-black/20 underline-offset-4">
            Read about the guarantee
          </button>
        </motion.div>

        {/* Billing */}
        <div className="mt-12 flex justify-center">
          <div className="flex rounded-full border border-black/[0.08] bg-white p-1 shadow-sm">
            <button className="rounded-full bg-black px-5 py-2.5 text-xs font-semibold text-white">
              Monthly
            </button>

            <button className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-black/50">
              Yearly

              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[9px] font-bold text-green-700">
                49% off
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto mt-8 grid max-w-5xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <ProCard />

          <DemoCard />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-black/30">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secure checkout
        </div>
      </div>
    </section>
  );
}

function TimeBox({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="min-w-[58px] rounded-2xl border border-black/[0.07] bg-white px-3 py-2.5 text-center shadow-sm sm:min-w-[68px]">
      <motion.p
        key={value}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold tracking-[-0.04em] sm:text-2xl"
      >
        {String(value).padStart(2, "0")}
      </motion.p>

      <p className="mt-0.5 text-[9px] uppercase tracking-wider text-black/30">
        {label}
      </p>
    </div>
  );
}

function ProCard() {
  const features = [
    "Daily high-intent opportunities",
    "Evidence behind every opportunity",
    "Email and contact information",
    "Personalized outreach generation",
    "Automated follow-ups",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-[28px] border border-black/[0.1] bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.08)] sm:p-8"
    >
      <div className="absolute right-6 top-6 rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-violet-700">
        Launch offer
      </div>

      <div className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
          Pro
        </p>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
          Your sales intelligence layer.
        </h3>

        <p className="mt-3 text-sm leading-6 text-black/45">
          Built for agencies and teams that want a consistent flow of
          high-intent opportunities without spending the day searching.
        </p>
      </div>

      <div className="mt-8 flex items-end gap-3">
        <span className="text-xl font-medium text-black/25 line-through">
          $69
        </span>

        <span className="text-5xl font-semibold tracking-[-0.06em]">
          $24.99
        </span>

        <span className="pb-1 text-xs text-black/40">
          / month
        </span>
      </div>

      <p className="mt-2 text-xs text-black/35">
        Billed $299/year, then $829.
      </p>

      <div className="my-7 h-px bg-black/[0.06]" />

      <p className="text-xs font-semibold text-black/55">
        Ideal for agencies that want:
      </p>

      <div className="mt-4 space-y-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.06,
            }}
            className="flex items-start gap-3"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
              <Check className="h-3 w-3 text-green-600" />
            </span>

            <span className="text-sm leading-5 text-black/60">
              {feature}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#111111] px-5 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-black"
      >
        Start with SignalFlow
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );
}

function DemoCard() {
  const points = [
    "Skeptical and want to see it work first",
    "Not sure it fits your niche yet",
    "Want a walkthrough before paying",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="rounded-[28px] border border-black/[0.08] bg-[#111111] p-6 text-white shadow-[0_25px_80px_rgba(0,0,0,0.14)] sm:p-8"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
        <Video className="h-5 w-5 text-white/80" />
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/35">
        Full demo
      </p>

      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
        See SignalFlow find opportunities for you.
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/45">
        15 minutes. We run a live search for your business and show you what
        SignalFlow can discover.
      </p>

      <div className="mt-7 space-y-3">
        {points.map((point) => (
          <div
            key={point}
            className="flex items-start gap-3"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />

            <span className="text-sm leading-5 text-white/60">
              {point}
            </span>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-[#111111]"
      >
        Get a full demo
        <ArrowRight className="h-4 w-4" />
      </motion.button>

      <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-white/25">
        <ShieldCheck className="h-3 w-3" />
        No commitment required
      </div>
    </motion.div>
  );
}