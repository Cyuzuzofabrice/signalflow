import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Who we are", href: "#who-we-are" },
  { label: "Pricing", href: "#pricing" },
  { label: "Login", href: "/login" },
  { label: "YouTube", href: "#" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f7f6f1] px-5 pb-8 pt-20 sm:px-6 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top border */}
        <div className="h-px w-full bg-black/10" />

        {/* MENU */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center pt-14 sm:pt-16"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/35">
            Menu
          </p>

          <nav
            aria-label="Footer navigation"
            className="mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8"
          >
            {footerLinks.map((link) => {
              const isInternalRoute =
                link.href.startsWith("/") && !link.href.startsWith("#");

              const className =
                "group flex items-center gap-1 text-xs font-medium text-black/50 transition-colors duration-300 hover:text-black";

              const content = (
                <>
                  <span>{link.label}</span>

                  {link.label === "YouTube" && (
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-70" />
                  )}
                </>
              );

              if (isInternalRoute) {
                return (
                  <Link key={link.label} to={link.href} className={className}>
                    {content}
                  </Link>
                );
              }

              return (
                <a key={link.label} href={link.href} className={className}>
                  {content}
                </a>
              );
            })}
          </nav>
        </motion.div>

        {/* SIGNALFLOW */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-24 overflow-hidden sm:mt-32"
        >
          <motion.h2
            animate={{
              letterSpacing: ["-0.07em", "-0.055em", "-0.07em"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="whitespace-nowrap text-center text-[14vw] font-black leading-[0.8] tracking-[-0.07em] text-[#111111] sm:text-[13vw] lg:text-[12vw]"
          >
            SIGNALFLOW
          </motion.h2>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="mt-16 border-t border-black/10 pt-6 sm:mt-20"
        >
          <p className="text-center text-[10px] font-medium text-black/40 sm:text-xs">
            © 2026 SignalFlow. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}