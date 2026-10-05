import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../lib/api";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] =
    useState(false);
  const [confirmFocused, setConfirmFocused] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!normalizedEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      /*
       * The current backend requires firstName and lastName.
       * We generate them from the email for the MVP.
       *
       * Example:
       * john.smith@gmail.com
       * -> John Smith
       */

      const emailName =
        normalizedEmail.split("@")[0] || "SignalFlow";

      const nameParts = emailName
        .replace(/[._-]+/g, " ")
        .trim()
        .split(/\s+/);

      const firstName =
        nameParts[0]?.charAt(0).toUpperCase() +
          nameParts[0]?.slice(1) || "SignalFlow";

      const lastName =
        nameParts.slice(1).join(" ") || "User";

      const workspaceName = `${emailName}'s Workspace`;

      await registerUser({
        firstName,
        lastName,
        email: normalizedEmail,
        password,
        workspaceName,
      });

      navigate("/onboarding");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3f2ed] text-[#111111]">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={{
            x: [0, 100, -60, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-[20%] -top-[18%] h-[760px] w-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.19),rgba(167,139,250,0.07)_38%,transparent_72%)] blur-[50px]"
        />

        <motion.div
          animate={{
            x: [0, -100, 60, 0],
            y: [0, 70, -40, 0],
            scale: [1, 0.94, 1.08, 1],
          }}
          transition={{
            duration: 29,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-[18%] top-[5%] h-[700px] w-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),rgba(125,211,252,0.06)_42%,transparent_72%)] blur-[55px]"
        />

        <motion.div
          animate={{
            x: [-50, 70, -20, -50],
            y: [20, -40, 60, 20],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[25%] top-[25%] h-[620px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(251,191,180,0.11),transparent_70%)] blur-[75px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 70, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 31,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[35%] left-[15%] h-[650px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.10),transparent_70%)] blur-[80px]"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-1/2 h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.035]"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 75,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-1/2 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.025]"
        />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,242,237,0.12),rgba(243,242,237,0.58)_78%)]" />
      </div>

      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="relative z-20 px-5 py-6 sm:px-8 sm:py-7">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2.5"
          >
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.06,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 16,
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
            >
              <motion.span
                animate={{
                  scale: [1, 1.18, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-2.5 w-2.5 rounded-full bg-white"
              />
            </motion.div>

            <span className="text-[15px] font-semibold tracking-[-0.03em]">
              SignalFlow
            </span>
          </Link>

          <Link
            to="/"
            className="group flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/50 px-4 py-2.5 text-xs font-medium text-black/45 backdrop-blur-md transition-all duration-300 hover:border-black/[0.14] hover:bg-white/80 hover:text-black"
          >
            <ArrowLeft
              size={13}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back home
          </Link>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <div className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-5 pb-16 pt-8 sm:px-6">
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
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-[470px]"
        >
          {/* =====================================================
              INTRO
          ===================================================== */}

          <div className="mb-8 text-center">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.15,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-black/[0.07] bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            >
              <Sparkles
                size={17}
                strokeWidth={1.7}
                className="text-black/60"
              />

              <motion.span
                animate={{
                  opacity: [0.2, 0.7, 0.2],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-violet-500"
              />
            </motion.div>

            <motion.p
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
              }}
              className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-black/30"
            >
              Start discovering
            </motion.p>

            <motion.h1
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="mt-3 text-[2.7rem] font-semibold leading-[0.95] tracking-[-0.065em] sm:text-5xl"
            >
              Find customers
              <br />
              <span className="text-black/35">
                before they find you.
              </span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.4,
              }}
              className="mx-auto mt-5 max-w-sm text-sm leading-6 text-black/45"
            >
              Create your SignalFlow workspace and start
              turning buying signals into qualified
              opportunities.
            </motion.p>
          </div>

          {/* =====================================================
              FORM CARD
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -2,
            }}
            className="group relative overflow-hidden rounded-[32px] border border-black/[0.08] bg-white/80 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.09)] backdrop-blur-2xl transition-shadow duration-500 hover:shadow-[0_40px_120px_rgba(0,0,0,0.12)]"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.13),transparent_70%)] blur-2xl" />

            <div className="relative rounded-[26px] border border-black/[0.045] bg-white/70 p-6 sm:p-7">
              <form
                onSubmit={handleRegister}
                className="space-y-5"
              >
                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 flex items-center justify-between"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
                      Work email
                    </span>

                    <span className="text-[10px] text-black/25">
                      Required
                    </span>
                  </label>

                  <motion.div
                    animate={{
                      scale: emailFocused ? 1.005 : 1,
                    }}
                    className={`relative rounded-2xl transition-all duration-300 ${
                      emailFocused
                        ? "shadow-[0_0_0_4px_rgba(124,58,237,0.06)]"
                        : ""
                    }`}
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      placeholder="you@company.com"
                      autoComplete="email"
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      onFocus={() =>
                        setEmailFocused(true)
                      }
                      onBlur={() =>
                        setEmailFocused(false)
                      }
                      disabled={loading}
                      className={`h-14 w-full rounded-2xl border bg-[#f8f8f5] px-4 text-sm outline-none transition-all duration-300 placeholder:text-black/25 ${
                        emailFocused
                          ? "border-violet-400/50 bg-white"
                          : "border-black/[0.08] hover:border-black/[0.16]"
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                    />

                    {emailFocused && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute bottom-0 left-4 right-4 h-px origin-left bg-violet-500"
                      />
                    )}
                  </motion.div>
                </div>

                {/* PASSWORD */}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/40"
                  >
                    Password
                  </label>

                  <motion.div
                    animate={{
                      scale: passwordFocused ? 1.005 : 1,
                    }}
                    className={`relative rounded-2xl transition-all duration-300 ${
                      passwordFocused
                        ? "shadow-[0_0_0_4px_rgba(124,58,237,0.06)]"
                        : ""
                    }`}
                  >
                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      onFocus={() =>
                        setPasswordFocused(true)
                      }
                      onBlur={() =>
                        setPasswordFocused(false)
                      }
                      disabled={loading}
                      className={`h-14 w-full rounded-2xl border bg-[#f8f8f5] px-4 pr-12 text-sm outline-none transition-all duration-300 placeholder:text-black/25 ${
                        passwordFocused
                          ? "border-violet-400/50 bg-white"
                          : "border-black/[0.08] hover:border-black/[0.16]"
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                    />

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        setShowPassword(
                          (value) => !value,
                        )
                      }
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-black/30 transition-all duration-200 hover:bg-black/[0.05] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                    {passwordFocused && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute bottom-0 left-4 right-4 h-px origin-left bg-violet-500"
                      />
                    )}
                  </motion.div>
                </div>

                {/* CONFIRM PASSWORD */}

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/40"
                  >
                    Confirm password
                  </label>

                  <motion.div
                    animate={{
                      scale: confirmFocused ? 1.005 : 1,
                    }}
                    className={`relative rounded-2xl transition-all duration-300 ${
                      confirmFocused
                        ? "shadow-[0_0_0_4px_rgba(124,58,237,0.06)]"
                        : ""
                    }`}
                  >
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value,
                        )
                      }
                      onFocus={() =>
                        setConfirmFocused(true)
                      }
                      onBlur={() =>
                        setConfirmFocused(false)
                      }
                      disabled={loading}
                      className={`h-14 w-full rounded-2xl border bg-[#f8f8f5] px-4 pr-12 text-sm outline-none transition-all duration-300 placeholder:text-black/25 ${
                        confirmFocused
                          ? "border-violet-400/50 bg-white"
                          : "border-black/[0.08] hover:border-black/[0.16]"
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                    />

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        setShowConfirmPassword(
                          (value) => !value,
                        )
                      }
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-black/30 transition-all duration-200 hover:bg-black/[0.05] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                    {confirmFocused && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute bottom-0 left-4 right-4 h-px origin-left bg-violet-500"
                      />
                    )}
                  </motion.div>
                </div>

                {/* ERROR */}

                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium leading-5 text-red-600"
                  >
                    {error}
                  </motion.div>
                )}

                {/* BENEFITS */}

                <div className="rounded-2xl border border-black/[0.06] bg-[#fafaf7] p-4">
                  <div className="flex items-center gap-2">
                    <Zap
                      size={14}
                      className="text-violet-500"
                    />

                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/35">
                      Your workspace includes
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                      "Buying signals",
                      "Lead scoring",
                      "AI reasoning",
                      "5 free leads",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs text-black/50"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black/[0.05]">
                          <Check
                            size={9}
                            className="text-black/60"
                          />
                        </span>

                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={
                    !loading
                      ? {
                          y: -2,
                          boxShadow:
                            "0 16px 35px rgba(0,0,0,0.18)",
                        }
                      : undefined
                  }
                  whileTap={
                    !loading
                      ? {
                          scale: 0.985,
                          y: 0,
                        }
                      : undefined
                  }
                  className="group relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#111111] text-sm font-semibold text-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-shadow duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {!loading && (
                    <motion.span
                      initial={{
                        x: "-120%",
                      }}
                      whileHover={{
                        x: "120%",
                      }}
                      transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-white/[0.08]"
                    />
                  )}

                  <span className="relative">
                    {loading
                      ? "Creating workspace..."
                      : "Create your workspace"}
                  </span>

                  {loading ? (
                    <motion.span
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="relative h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                  ) : (
                    <ArrowUpRight
                      size={16}
                      className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  )}
                </motion.button>
              </form>

              {/* LOGIN */}

              <div className="mt-7 border-t border-black/[0.07] pt-6 text-center">
                <p className="text-xs text-black/40">
                  Already using SignalFlow?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-black transition-colors hover:text-violet-600"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* TRUST */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.9,
            }}
            className="mt-7 flex items-center justify-center gap-2"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />

            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-black/25">
              No credit card required
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}