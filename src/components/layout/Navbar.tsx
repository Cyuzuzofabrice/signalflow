import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Case studies", href: "#case-studies" },
  { label: "Who we are", href: "#who-we-are" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState(true);

  return (
    <>
      {/* =========================================================
          LAUNCH OFFER
      ========================================================= */}
      <AnimatePresence>
        {announcement && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="fixed inset-x-0 top-0 z-[70] overflow-hidden bg-[#111111] text-white"
          >
            <div className="relative mx-auto flex min-h-10 max-w-7xl items-center justify-center px-12 text-center">
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="text-[11px] font-medium tracking-[-0.01em] text-white/90 transition hover:text-white sm:text-xs"
              >
                <span className="font-semibold">Launch offer:</span>{" "}
                get your first 5 qualified opportunities free
              </a>

              <button
                type="button"
                onClick={() => setAnnouncement(false)}
                aria-label="Close announcement"
                className="absolute right-3 flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white sm:right-6"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          MAIN NAVBAR
      ========================================================= */}
      <motion.header
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: announcement ? 48 : 8,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 z-[60] px-4 sm:px-6 lg:px-8"
      >
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/[0.08] bg-white/90 px-4 py-2.5 shadow-[0_8px_35px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:px-5">
          {/* =====================================================
              BRAND
          ===================================================== */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <motion.span
              whileHover={{
                scale: 1.08,
                rotate: 5,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 15,
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111]"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-white transition-transform duration-300 group-hover:scale-125" />
            </motion.span>

            <span className="text-[15px] font-semibold tracking-[-0.025em]">
              SignalFlow
            </span>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-[12px] font-medium text-black/50 transition-colors duration-200 hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* =====================================================
              DESKTOP ACTIONS
          ===================================================== */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Login */}
            <Link
              to="/login"
              className="rounded-full px-3.5 py-2 text-[12px] font-medium text-black/55 transition hover:text-black"
            >
              Login
            </Link>

            {/* Demo */}
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <Link
                to="/demo"
                className="flex items-center gap-1.5 rounded-full border border-black/[0.1] bg-white px-4 py-2.5 text-[12px] font-semibold text-black transition hover:border-black/20 hover:bg-black/[0.03]"
              >
                Get a full demo
              </Link>
            </motion.div>

            {/* Main CTA */}
            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <Link
                to="/register"
                className="group flex items-center gap-1.5 rounded-full bg-[#111111] px-5 py-2.5 text-[12px] font-semibold !text-white shadow-[0_5px_18px_rgba(0,0,0,0.14)] transition hover:bg-black hover:shadow-[0_8px_25px_rgba(0,0,0,0.18)]"
              >
                <span className="!text-white">
                  Get your first 5 leads free
                </span>

                <ArrowUpRight
                  size={13}
                  className="text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ===================================================== */}
          <motion.button
            type="button"
            whileTap={{
              scale: 0.92,
            }}
            onClick={() => setOpen((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.span
                key={open ? "close" : "menu"}
                initial={{
                  opacity: 0,
                  rotate: -45,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 45,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.16,
                }}
              >
                {open ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* =====================================================
              MOBILE MENU
          ===================================================== */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -12,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-0 right-0 top-[calc(100%+8px)] z-[80] md:hidden"
              >
                <div className="overflow-hidden rounded-[26px] border border-black/[0.08] bg-white/95 p-2.5 shadow-[0_25px_70px_rgba(0,0,0,0.15)] backdrop-blur-xl">
                  <nav className="flex flex-col">
                    {/* Navigation links */}
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        initial={{
                          opacity: 0,
                          x: -12,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: index * 0.045,
                          duration: 0.22,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="rounded-2xl px-4 py-3.5 text-sm font-semibold text-black/65 transition-colors duration-200 hover:bg-black/[0.04] hover:text-black"
                      >
                        {item.label}
                      </motion.a>
                    ))}

                    {/* Divider */}
                    <div className="my-2 h-px bg-black/[0.07]" />

                    {/* Login */}
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="rounded-2xl px-4 py-3.5 text-sm font-semibold text-black/60 transition-colors hover:bg-black/[0.04] hover:text-black"
                    >
                      Login
                    </Link>

                    {/* Demo */}
                    <Link
                      to="/demo"
                      onClick={() => setOpen(false)}
                      className="mt-1 rounded-2xl border border-black/[0.08] px-4 py-3.5 text-center text-sm font-semibold text-black transition-colors hover:bg-black/[0.03]"
                    >
                      Get a full demo
                    </Link>

                    {/* CTA */}
                    <motion.div
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="mt-2"
                    >
                      <Link
                        to="/register"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-[#111111] px-4 py-3.5 text-sm font-semibold !text-white shadow-[0_8px_25px_rgba(0,0,0,0.14)]"
                      >
                        <span className="!text-white">
                          Get your first 5 leads free
                        </span>

                        <ArrowUpRight
                          size={15}
                          className="text-white"
                        />
                      </Link>
                    </motion.div>
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
}