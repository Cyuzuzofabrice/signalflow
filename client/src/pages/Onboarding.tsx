import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Globe,
  Sparkles,
  Target,
  Building2,
  Loader2,
} from "lucide-react";

import {
  createWorkspaceIcp,
  getWorkspace,
  getWorkspaceDetails,
  updateWorkspace,
  updateWorkspaceIcp,
} from "../lib/api";

export default function Onboarding() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingWorkspace, setLoadingWorkspace] = useState(true);
  const [error, setError] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [offer, setOffer] = useState("");
  const [idealCustomer, setIdealCustomer] = useState("");

  const workspace = getWorkspace();

  /*
   * Load existing workspace data.
   *
   * This is important when a user:
   * - starts onboarding
   * - leaves
   * - logs in again later
   * - returns to onboarding
   *
   * We restore whatever was already saved.
   */
  useEffect(() => {
    async function loadWorkspace() {
      if (!workspace?.id) {
        setLoadingWorkspace(false);
        setError(
          "Your workspace could not be found. Please log in again.",
        );
        return;
      }

      try {
        const details = await getWorkspaceDetails(workspace.id);

        if (details.name?.trim()) {
          setCompanyName(details.name);
        }

        if (details.website?.trim()) {
          setWebsite(details.website);
        }

        if (details.description?.trim()) {
          setOffer(details.description);
        }

        if (details.icp?.description?.trim()) {
          setIdealCustomer(details.icp.description);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your workspace.",
        );
      } finally {
        setLoadingWorkspace(false);
      }
    }

    void loadWorkspace();
  }, [workspace?.id]);

  /*
   * Continue to the next onboarding step.
   */
  function nextStep() {
    setError("");

    if (step === 1) {
      const trimmedCompanyName = companyName.trim();

      if (trimmedCompanyName.length < 2) {
        setError(
          "Company name must be at least 2 characters.",
        );
        return;
      }
    }

    if (step === 2) {
      const trimmedOffer = offer.trim();

      if (trimmedOffer.length < 2) {
        setError(
          "Please describe what your business provides.",
        );
        return;
      }
    }

    if (step === 3) {
      const trimmedIdealCustomer =
        idealCustomer.trim();

      if (trimmedIdealCustomer.length < 2) {
        setError(
          "Please describe your ideal customer.",
        );
        return;
      }
    }

    setStep((current) =>
      Math.min(current + 1, 4),
    );
  }

  /*
   * Go back one step.
   */
  function previousStep() {
    setError("");

    setStep((current) =>
      Math.max(current - 1, 1),
    );
  }

  /*
   * Save onboarding.
   *
   * IMPORTANT:
   *
   * If an ICP already exists, UPDATE it.
   *
   * If an ICP does not exist, CREATE it.
   *
   * This prevents:
   *
   * "An ICP already exists for this workspace"
   */
  async function finishOnboarding() {
    setError("");

    if (!workspace?.id) {
      setError(
        "Your workspace could not be found. Please log in again.",
      );
      return;
    }

    const trimmedCompanyName =
      companyName.trim();

    const trimmedWebsite =
      website.trim();

    const trimmedOffer =
      offer.trim();

    const trimmedIdealCustomer =
      idealCustomer.trim();

    /*
     * Final validation before sending anything.
     */

    if (trimmedCompanyName.length < 2) {
      setError(
        "Company name must be at least 2 characters.",
      );
      setStep(1);
      return;
    }

    if (trimmedOffer.length < 2) {
      setError(
        "Please describe what your business provides.",
      );
      setStep(2);
      return;
    }

    if (trimmedIdealCustomer.length < 2) {
      setError(
        "Please describe your ideal customer.",
      );
      setStep(3);
      return;
    }

    try {
      setLoading(true);

      /*
       * STEP 1
       *
       * Save company information.
       */
      await updateWorkspace(workspace.id, {
        name: trimmedCompanyName,
        website: trimmedWebsite || null,
        description: trimmedOffer,
      });

      /*
       * STEP 2
       *
       * Get the latest workspace.
       *
       * We need this to know whether an ICP
       * already exists.
       */
      const currentWorkspace =
        await getWorkspaceDetails(
          workspace.id,
        );

      /*
       * Prepare ICP data.
       */
      const keywords =
        trimmedIdealCustomer
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 10);

      const icpData = {
        name: trimmedIdealCustomer.slice(
          0,
          100,
        ),
        industries: ["General"],
        locations: ["Global"],
        companySizes: ["Any"],
        jobTitles: ["Decision Maker"],
        keywords,
        description: trimmedIdealCustomer,
      };

      /*
       * STEP 3
       *
       * CREATE if there is no ICP.
       *
       * UPDATE if an ICP already exists.
       */
      if (currentWorkspace.icp) {
        await updateWorkspaceIcp(
          workspace.id,
          icpData,
        );
      } else {
        await createWorkspaceIcp(
          workspace.id,
          icpData,
        );
      }

      /*
       * Everything has been successfully saved.
       *
       * Send the user directly to Dashboard.
       */
      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save your onboarding information.",
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * Open dashboard from the final confirmation.
   */
  function goToDashboard() {
    navigate("/dashboard", {
      replace: true,
    });
  }

  /*
   * Loading state.
   */
  if (loadingWorkspace) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Loading your workspace...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Sparkles size={18} />
            </div>

            <div>
              <p className="text-lg font-semibold tracking-tight">
                SignalFlow
              </p>

              <p className="text-xs text-slate-500">
                Workspace setup
              </p>
            </div>
          </div>

          <div className="text-sm text-slate-500">
            Step {step} of 4
          </div>
        </header>

        {/* =====================================================
            PROGRESS
        ===================================================== */}

        <div className="mt-10">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-900 transition-all duration-500"
              style={{
                width: `${(step / 4) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <main className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-2xl">

            {/* =================================================
                STEP 1
            ================================================= */}

            {step === 1 && (
              <section>
                <div className="mb-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    <Building2 size={22} />
                  </div>

                  <h1 className="text-4xl font-semibold tracking-tight">
                    Tell us about your company.
                  </h1>

                  <p className="mt-3 text-lg text-slate-500">
                    This helps SignalFlow understand the
                    business behind your opportunities.
                  </p>
                </div>

                <div className="space-y-5">

                  {/* Company name */}

                  <div>
                    <label
                      htmlFor="companyName"
                      className="mb-2 block text-sm font-medium"
                    >
                      Company name
                    </label>

                    <input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(
                          e.target.value,
                        );
                        setError("");
                      }}
                      placeholder="SignalFlow"
                      autoComplete="organization"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      This will be your SignalFlow workspace name.
                    </p>
                  </div>

                  {/* Website */}

                  <div>
                    <label
                      htmlFor="website"
                      className="mb-2 block text-sm font-medium"
                    >
                      Website

                      <span className="ml-2 font-normal text-slate-400">
                        Optional
                      </span>
                    </label>

                    <div className="relative">
                      <Globe
                        size={18}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="website"
                        type="url"
                        value={website}
                        onChange={(e) => {
                          setWebsite(
                            e.target.value,
                          );
                          setError("");
                        }}
                        placeholder="https://example.com"
                        autoComplete="url"
                        className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-5 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      />
                    </div>
                  </div>

                </div>
              </section>
            )}

            {/* =================================================
                STEP 2
            ================================================= */}

            {step === 2 && (
              <section>
                <div className="mb-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    <Sparkles size={22} />
                  </div>

                  <h1 className="text-4xl font-semibold tracking-tight">
                    What do you sell?
                  </h1>

                  <p className="mt-3 text-lg text-slate-500">
                    Describe your product or service in simple
                    language.
                  </p>
                </div>

                <textarea
                  value={offer}
                  onChange={(e) => {
                    setOffer(e.target.value);
                    setError("");
                  }}
                  rows={7}
                  placeholder="We provide AI-powered customer support and automation for growing businesses..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </section>
            )}

            {/* =================================================
                STEP 3
            ================================================= */}

            {step === 3 && (
              <section>
                <div className="mb-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    <Target size={22} />
                  </div>

                  <h1 className="text-4xl font-semibold tracking-tight">
                    Who is your ideal customer?
                  </h1>

                  <p className="mt-3 text-lg text-slate-500">
                    Describe the type of person or business most
                    likely to buy from you.
                  </p>
                </div>

                <textarea
                  value={idealCustomer}
                  onChange={(e) => {
                    setIdealCustomer(
                      e.target.value,
                    );
                    setError("");
                  }}
                  rows={7}
                  placeholder="B2B companies, SaaS businesses, agencies, and service providers that want to find high-intent prospects and contact them at the right time."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </section>
            )}

            {/* =================================================
                STEP 4
            ================================================= */}

            {step === 4 && (
              <section className="text-center">
                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white">
                  <Check size={28} />
                </div>

                <h1 className="text-4xl font-semibold tracking-tight">
                  You're ready to find signals.
                </h1>

                <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-500">
                  SignalFlow now understands your business and
                  your ideal customer. Let's find opportunities
                  worth acting on.
                </p>

                <button
                  type="button"
                  onClick={goToDashboard}
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 font-medium text-white transition hover:bg-slate-800"
                >
                  Open dashboard
                  <ArrowRight size={18} />
                </button>
              </section>
            )}

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* =================================================
                NAVIGATION
            ================================================= */}

            {step < 4 && (
              <div className="mt-10 flex items-center justify-between">

                {/* Back */}

                <button
                  type="button"
                  onClick={previousStep}
                  disabled={
                    step === 1 || loading
                  }
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-900 disabled:invisible"
                >
                  <ArrowLeft size={17} />
                  Back
                </button>

                {/* Continue */}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Continue
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={finishOnboarding}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        Finish setup
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                )}

              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}