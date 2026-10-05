import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const caseStudies = [
  {
    company: "Agent Rise",
    logo: "https://www.raisedhand.ai/logos/wins/agentrise.png",
    result: "+$3,000",
    label: "Added in 14 days.",
    description:
      "Turned relevant buying signals into new conversations and opportunities.",
  },
  {
    company: "Northstar",
    logo: null,
    result: "42",
    label: "Qualified opportunities.",
    description:
      "Focused the sales team on prospects already showing meaningful intent.",
  },
  {
    company: "Vertex Labs",
    logo: null,
    result: "3.2×",
    label: "More qualified conversations.",
    description:
      "Used buying context to make every outbound conversation more relevant.",
  },
];

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative scroll-mt-32 overflow-hidden px-5 py-28 sm:px-6 sm:py-36 lg:px-8"
    >
      {/* Moving background */}

      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, 70, -40, 0],
          y: [0, -30, 45, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-[15%] top-[5%] h-[550px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.13),transparent_70%)] blur-[80px]"
      />

      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.08, 1],
        }}
        transition={{
          duration: 29,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-[15%] bottom-[0%] h-[600px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.11),transparent_70%)] blur-[80px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-3xl"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30">
            Case studies
          </p>

          <h2 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Why teams choose SignalFlow.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-black/45 sm:text-base">
            See what happens when teams stop guessing who might buy and start
            acting on real buying signals.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.company}
              study={study}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 45,
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
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
      }}
      className="group relative flex min-h-[470px] flex-col overflow-hidden rounded-[30px] border border-black/[0.08] bg-white/90 p-7 shadow-[0_25px_80px_rgba(0,0,0,0.055)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_35px_100px_rgba(0,0,0,0.1)] sm:p-8"
    >
      {/* Subtle card glow */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.13),transparent_70%)] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Company */}

      <div className="relative flex items-center justify-between">
        <div className="flex h-12 items-center">
          {study.logo ? (
            <img
              src={study.logo}
              alt={`${study.company} logo`}
              className="max-h-9 max-w-[145px] object-contain object-left grayscale opacity-75 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
            />
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
                {study.company.charAt(0)}
              </div>

              <span className="text-sm font-semibold tracking-[-0.02em]">
                {study.company}
              </span>
            </div>
          )}
        </div>

        <motion.div
          whileHover={{
            rotate: 45,
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-black/[0.02]"
        >
          <ArrowUpRight className="h-4 w-4 text-black/45" />
        </motion.div>
      </div>

      {/* Divider */}

      <div className="mt-8 h-px w-full bg-black/[0.07]" />

      {/* Result */}

      <div className="relative mt-12">
        <p className="text-[4.2rem] font-semibold leading-none tracking-[-0.075em] sm:text-[4.7rem]">
          {study.result}
        </p>

        <p className="mt-4 text-sm font-medium text-black/70">
          {study.label}
        </p>
      </div>

      {/* Description */}

      <p className="mt-8 max-w-sm text-sm leading-6 text-black/45">
        {study.description}
      </p>

      {/* Bottom */}

      <div className="mt-auto pt-10">
        <div className="flex items-center justify-between border-t border-black/[0.07] pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/30">
            Customer story
          </span>

          <span className="flex items-center gap-1 text-xs font-semibold text-black/45 transition-colors group-hover:text-black">
            Read story
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}