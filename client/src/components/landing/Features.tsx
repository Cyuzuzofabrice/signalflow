import {
  Check,
  MessageSquare,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden px-5 py-28 sm:px-6 sm:py-36 lg:px-8"
    >
      {/* Background atmosphere */}

      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[-15%] top-[10%] h-[500px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.14),transparent_70%)] blur-[70px]"
      />

      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[-15%] bottom-[5%] h-[500px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.12),transparent_70%)] blur-[70px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
              Features
            </p>

            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              Turn buying signals into conversations.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-black/45 sm:text-base">
              SignalFlow doesn't just find potential customers. It helps you
              understand why they're a fit and gives you the context to start
              the conversation.
            </p>
          </div>

          {/* Feature card */}

          <LinkedInFeature />
        </div>
      </div>
    </section>
  );
}

function LinkedInFeature() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-[32px] border border-black/[0.08] bg-white/80 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-7"
    >
      {/* Feature heading */}

      <div className="max-w-xl">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A66C2]/10">
          <span className="text-sm font-bold text-[#0A66C2]">in</span>
          </div>

          <span>LinkedIn, on autopilot</span>
        </div>

        <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">
          Invites that send themselves.
          <br />

          Messages that{" "}
          <span className="text-black/30">
            sound like you.
          </span>
        </h3>

        <p className="mt-5 max-w-lg text-sm leading-6 text-black/45">
          Connect your LinkedIn once. SignalFlow finds relevant people,
          prepares personalized messages and follow-ups, and lets you review
          everything before sending.
        </p>
      </div>

      {/* Product demo */}

      <div className="relative mt-10">
        <LinkedInDashboard />
      </div>
    </motion.div>
  );
}

function LinkedInDashboard() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-black/[0.07] bg-[#fafaf8] shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      {/* Window header */}

      <div className="flex items-center justify-between border-b border-black/[0.06] bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-black/10" />
            <span className="h-2 w-2 rounded-full bg-black/10" />
            <span className="h-2 w-2 rounded-full bg-black/10" />
          </div>

          <span className="ml-2 text-[10px] font-medium text-black/35">
            SignalFlow · LinkedIn
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[9px] font-medium text-black/35">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          Connected
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_1.1fr] sm:p-5">
        {/* Person */}

        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.15,
          }}
          className="rounded-2xl border border-black/[0.06] bg-white p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
              JC
            </div>

            <div>
              <p className="text-xs font-semibold">
                Jean Claude
              </p>

              <p className="mt-0.5 text-[10px] text-black/35">
                Clinic Director
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-[#f7f7f3] p-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-violet-600" />

              <span className="text-[9px] font-semibold text-violet-700">
                Buying signal
              </span>
            </div>

            <p className="mt-2 text-[10px] leading-5 text-black/50">
              Looking for a better way to manage WhatsApp inquiries and
              appointments.
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-wider text-black/30">
              Opportunity score
            </span>

            <span className="text-sm font-semibold">
              94
            </span>
          </div>
        </motion.div>

        {/* Message */}

        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.25,
          }}
          className="rounded-2xl border border-black/[0.06] bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-black/40" />

              <span className="text-[10px] font-semibold">
                Personalized message
              </span>
            </div>

            <span className="rounded-full bg-green-50 px-2 py-1 text-[8px] font-semibold text-green-700">
              Ready
            </span>
          </div>

          <div className="mt-4 rounded-xl bg-[#f7f7f3] p-3">
            <p className="text-[10px] leading-5 text-black/55">
              Hi Jean Claude — I noticed you're exploring better ways to
              handle patient inquiries and bookings.
            </p>

            <p className="mt-2 text-[10px] leading-5 text-black/55">
              We help growing clinics automate WhatsApp conversations while
              keeping the experience personal.
            </p>

            <p className="mt-2 text-[10px] leading-5 text-black/55">
              Would it be useful to show you how it works?
            </p>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-black/[0.07] px-3 py-2.5 text-[9px] font-semibold text-black/50"
            >
              <Check className="h-3 w-3" />
              Review
            </button>

            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-black px-3 py-2.5 text-[9px] font-semibold text-white"
            >
              <Send className="h-3 w-3" />
              Send
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom stats */}

      <div className="grid grid-cols-3 border-t border-black/[0.06] bg-white">
        <FeatureStat
          icon={<UserRound className="h-3.5 w-3.5" />}
          value="128"
          label="Prospects"
        />

        <FeatureStat
          icon={<MessageSquare className="h-3.5 w-3.5" />}
          value="43"
          label="Messages"
        />

        <FeatureStat
          icon={<Send className="h-3.5 w-3.5" />}
          value="18"
          label="Sent"
        />
      </div>
    </div>
  );
}

function FeatureStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 border-r border-black/[0.06] px-3 py-3 last:border-r-0 sm:px-5">
      <span className="text-black/30">
        {icon}
      </span>

      <div>
        <p className="text-xs font-semibold">
          {value}
        </p>

        <p className="text-[8px] uppercase tracking-wider text-black/25">
          {label}
        </p>
      </div>
    </div>
  );
}