
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getWorkspaceDetails,
  loginUser,
} from "../lib/api";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError(
        "Please enter your email and password.",
      );
      return;
    }

    try {
      setLoading(true);

      /*
       * LOGIN
       *
       * loginUser():
       * - authenticates the user
       * - stores the JWT token
       * - stores the workspace
       * - returns the workspace
       */
      const result = await loginUser(
        normalizedEmail,
        password,
      );

      /*
       * Get workspace directly from the
       * successful login response.
       */
      const workspaceId =
        result.workspace?.id;

      if (!workspaceId) {
        throw new Error(
          "Your account does not have a workspace. Please contact support.",
        );
      }

      /*
       * Get the latest workspace state
       * from the backend.
       */
      const details =
        await getWorkspaceDetails(
          workspaceId,
        );

      /*
       * ONBOARDING COMPLETION
       *
       * We do NOT require a website.
       *
       * A workspace is considered complete when:
       *
       * 1. Business description exists
       * 2. ICP exists
       *
       * Website is optional.
       */
      const hasBusinessDescription =
        Boolean(
          details.description?.trim(),
        );

      const hasIcp =
        Boolean(details.icp);

      const onboardingComplete =
        hasBusinessDescription &&
        hasIcp;

      /*
       * Intelligent redirect:
       *
       * Complete -> Dashboard
       * Incomplete -> Onboarding
       */
      if (onboardingComplete) {
        navigate("/dashboard", {
          replace: true,
        });
      } else {
        navigate("/onboarding", {
          replace: true,
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3f2ed] text-[#111111]">
      {/* =========================================================
          ATMOSPHERIC BACKGROUND
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Main violet light */}
        <motion.div
          animate={{
            x: [0, 100, -60, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.12, 0.94, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-[18%] -top-[18%] h-[750px] w-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),rgba(167,139,250,0.08)_35%,transparent_70%)] blur-[45px]"
        />

        {/* Blue light */}
        <motion.div
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 70, -30, 0],
            scale: [1, 0.92, 1.1, 1],
          }}
          transition={{
            duration: 29,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-[18%] top-[8%] h-[700px] w-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),rgba(125,211,252,0.06)_40%,transparent_72%)] blur-[55px]"
        />

        {/* Warm center glow */}
        <motion.div
          animate={{
            x: [-50, 60, -20, -50],
            y: [20, -40, 50, 20],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[28%] top-[28%] h-[600px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(251,191,180,0.11),transparent_70%)] blur-[70px]"
        />

        {/* Bottom purple glow */}
        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: 31,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[30%] left-[20%] h-[600px] w-[850px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.10),transparent_70%)] blur-[80px]"
        />

        {/* Moving orbit */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-1/2 h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.035]"
        />

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 70,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-1/2 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.025]"
        />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* White cinematic fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,242,237,0.15),rgba(243,242,237,0.52)_75%)]" />
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
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
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
          className="w-full max-w-[460px]"
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
              className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-black/[0.07] bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            >
              <Sparkles
                size={17}
                strokeWidth={1.7}
                className="text-black/60"
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
              Welcome back
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
              Find your next
              <br />
              <span className="text-black/35">
                opportunity.
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
              Sign in to your SignalFlow workspace and
              turn buying signals into action.
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
            {/* Card glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_70%)] blur-2xl" />

            <div className="relative rounded-[26px] border border-black/[0.045] bg-white/70 p-6 sm:p-7">
              <form
                onSubmit={handleLogin}
                className="space-y-5"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 flex items-center justify-between"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
                      Email address
                    </span>

                    <span className="text-[10px] text-black/25">
                      Required
                    </span>
                  </label>

                  <motion.div
                    animate={{
                      scale: emailFocused
                        ? 1.005
                        : 1,
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
                      placeholder="you@company.com"
                      autoComplete="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value,
                        )
                      }
                      onFocus={() =>
                        setEmailFocused(true)
                      }
                      onBlur={() =>
                        setEmailFocused(false)
                      }
                      className={`h-14 w-full rounded-2xl border bg-[#f8f8f5] px-4 text-sm text-black outline-none transition-all duration-300 placeholder:text-black/25 ${
                        emailFocused
                          ? "border-violet-400/50 bg-white"
                          : "border-black/[0.08] hover:border-black/[0.16]"
                      }`}
                    />

                    {emailFocused && (
                      <motion.div
                        initial={{
                          scaleX: 0,
                        }}
                        animate={{
                          scaleX: 1,
                        }}
                        className="absolute bottom-0 left-4 right-4 h-px origin-left bg-violet-500"
                      />
                    )}
                  </motion.div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2.5 flex items-center justify-between"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
                      Password
                    </span>

                    <Link
                      to="/forgot-password"
                      className="text-[10px] font-medium text-black/35 transition-colors hover:text-black"
                    >
                      Forgot password?
                    </Link>
                  </label>

                  <motion.div
                    animate={{
                      scale: passwordFocused
                        ? 1.005
                        : 1,
                    }}
                    className={`relative rounded-2xl transition-all duration-300 ${
                      passwordFocused
                        ? "shadow-[0_0_0_4px_rgba(124,58,237,0.06)]"
                        : ""
                    }`}
                  >
                    <LockKeyhole
                      size={15}
                      className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 transition-colors duration-300 ${
                        passwordFocused
                          ? "text-violet-500"
                          : "text-black/25"
                      }`}
                    />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value,
                        )
                      }
                      onFocus={() =>
                        setPasswordFocused(true)
                      }
                      onBlur={() =>
                        setPasswordFocused(false)
                      }
                      className={`h-14 w-full rounded-2xl border bg-[#f8f8f5] px-11 pr-12 text-sm text-black outline-none transition-all duration-300 placeholder:text-black/25 ${
                        passwordFocused
                          ? "border-violet-400/50 bg-white"
                          : "border-black/[0.08] hover:border-black/[0.16]"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value,
                        )
                      }
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-black/30 transition-all duration-200 hover:bg-black/[0.05] hover:text-black"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                    {passwordFocused && (
                      <motion.div
                        initial={{
                          scaleX: 0,
                        }}
                        animate={{
                          scaleX: 1,
                        }}
                        className="absolute bottom-0 left-4 right-4 h-px origin-left bg-violet-500"
                      />
                    )}
                  </motion.div>
                </div>

                {/* Error */}
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
                    className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-600"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Remember */}
                <label className="flex cursor-pointer items-center gap-2.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-[5px] border border-black/[0.12] bg-white transition-colors hover:border-black/30">
                    <Check
                      size={10}
                      className="text-transparent"
                    />
                  </span>

                  <span className="text-xs text-black/40">
                    Keep me signed in
                  </span>
                </label>

                {/* Button */}
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
                  className={`group relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#111111] text-sm font-semibold text-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-all duration-300 ${
                    loading
                      ? "cursor-not-allowed opacity-70"
                      : ""
                  }`}
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
                      ? "Signing in..."
                      : "Log in"}
                  </span>

                  {!loading && (
                    <ArrowUpRight
                      size={16}
                      className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  )}
                </motion.button>
              </form>

              {/* Register */}
              <div className="mt-7 border-t border-black/[0.07] pt-6 text-center">
                <p className="text-xs text-black/40">
                  Don't have a SignalFlow account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-black transition-colors hover:text-violet-600"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* =====================================================
              TRUST LINE
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.8,
            }}
            className="mt-7 flex items-center justify-center gap-2"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />

            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-black/25">
              Secure SignalFlow workspace
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

