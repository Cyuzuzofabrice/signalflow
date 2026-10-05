
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Archive,
  ArrowUpRight,
  Check,
  CheckCheck,
  Copy,
  Edit3,
  Mail,
  MessageSquare,
  MoreHorizontal,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  Zap,
  Brain,
  Target,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  analyzeBuyingSignal,
  getWorkspace,
  type AIAnalysisResult,
} from "../lib/api";

type MessageStatus =
  | "Draft"
  | "Ready"
  | "Sent"
  | "Replied";

type Channel = "Email" | "LinkedIn";

type MessageItem = {
  id: string;
  contact: string;
  company: string;
  role: string;
  status: MessageStatus;
  channel: Channel;
  score: number;
  signal: string;
  time: string;
  subject: string;
  message: string;
};

const messages: MessageItem[] = [
  {
    id: "sarah-uwase",
    contact: "Sarah Uwase",
    company: "Kigali Digital",
    role: "Head of Growth",
    status: "Ready",
    channel: "LinkedIn",
    score: 94,
    signal: "Hiring for a new sales role",
    time: "18 min ago",
    subject: "",
    message:
      "Hi Sarah — noticed Kigali Digital is hiring for a new sales role. That usually means the team is looking to increase pipeline quickly. We help teams identify companies already showing buying intent so sales can focus on the right accounts. Thought this might be relevant as your team expands.",
  },
  {
    id: "daniel-m",
    contact: "Daniel M.",
    company: "Nova Systems",
    role: "VP Growth",
    status: "Draft",
    channel: "Email",
    score: 89,
    signal: "Expanding into East Africa",
    time: "42 min ago",
    subject:
      "Helping Nova Systems accelerate East Africa growth",
    message:
      "Hi Daniel,\n\nI noticed Nova Systems is expanding its commercial presence across East Africa. That kind of expansion usually creates a need for a stronger pipeline of qualified accounts.\n\nSignalFlow helps growth teams discover companies showing active buying intent before they enter a traditional sales pipeline.\n\nWould it be useful to compare notes?",
  },
  {
    id: "eric-niyonzima",
    contact: "Eric Niyonzima",
    company: "MobiPay",
    role: "Product Lead",
    status: "Sent",
    channel: "LinkedIn",
    score: 86,
    signal: "Researching automation platforms",
    time: "1 hr ago",
    subject: "",
    message:
      "Hi Eric — I noticed some recent activity around automation solutions at MobiPay. SignalFlow helps teams discover companies that are actively researching solutions before they become obvious opportunities. Given what you're working on, I thought it could be worth connecting.",
  },
  {
    id: "grace-mukamana",
    contact: "Grace Mukamana",
    company: "Vertex Labs",
    role: "Founder",
    status: "Replied",
    channel: "Email",
    score: 82,
    signal: "Competitor comparison activity",
    time: "2 hrs ago",
    subject: "Quick question about Vertex Labs",
    message:
      "Hi Grace,\n\nI noticed Vertex Labs has been researching several solutions in the customer acquisition space.\n\nWe built SignalFlow to help teams identify those buying signals earlier and turn them into qualified conversations.\n\nHappy to share how it works if this is something you're exploring.",
  },
  {
    id: "kevin-r",
    contact: "Kevin R.",
    company: "East Africa Cloud",
    role: "Marketing Manager",
    status: "Ready",
    channel: "LinkedIn",
    score: 74,
    signal: "Hiring two new marketing roles",
    time: "4 hrs ago",
    subject: "",
    message:
      "Hi Kevin — saw that East Africa Cloud is adding two marketing roles. That kind of team growth often comes with bigger pipeline targets. SignalFlow helps marketing and sales teams find companies already showing signs they're ready to buy.",
  },
  {
    id: "alice-k",
    contact: "Alice K.",
    company: "Rwanda Commerce",
    role: "Commercial Director",
    status: "Draft",
    channel: "Email",
    score: 78,
    signal: "Multiple visits to pricing page",
    time: "5 hrs ago",
    subject: "A quick idea for Rwanda Commerce",
    message:
      "Hi Alice,\n\nI noticed increased activity around the commercial pages on Rwanda Commerce.\n\nSignalFlow helps businesses identify high-intent accounts and understand why they're likely to be interested before reaching out.\n\nWould you be open to a quick conversation?",
  },
];

const filters: Array<
  "All" | MessageStatus
> = [
  "All",
  "Draft",
  "Ready",
  "Sent",
  "Replied",
];

const demoPrompt =
  "A B2B SaaS company is hiring three sales representatives and just opened a new pricing page. They want to increase pipeline this quarter. Should we reach out, and what should we say?";

export default function Messages() {
  const editorRef =
    useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] =
    useState<"All" | MessageStatus>("All");

  const [selectedId, setSelectedId] =
    useState(messages[0].id);

  const [search, setSearch] =
    useState("");

  const [messageText, setMessageText] =
    useState(messages[0].message);

  const [copied, setCopied] =
    useState(false);

  const [sent, setSent] =
    useState(false);

  const [regenerating, setRegenerating] =
    useState(false);

  /*
   * REAL AI ANALYZER STATE
   */
  const [aiInput, setAiInput] =
    useState("");

  const [aiResult, setAiResult] =
    useState<AIAnalysisResult | null>(null);

  const [aiLoading, setAiLoading] =
    useState(false);

  const [aiError, setAiError] =
    useState("");

  /*
   * Shows when AI message was inserted
   * into the editor.
   */
  const [messageAdded, setMessageAdded] =
    useState(false);

  const selected =
    messages.find(
      (item) => item.id === selectedId,
    ) ?? messages[0];

  const filteredMessages =
    messages.filter((message) => {
      const matchesFilter =
        activeFilter === "All" ||
        message.status === activeFilter;

      const searchTerm =
        search.toLowerCase();

      const matchesSearch =
        message.contact
          .toLowerCase()
          .includes(searchTerm) ||
        message.company
          .toLowerCase()
          .includes(searchTerm) ||
        message.signal
          .toLowerCase()
          .includes(searchTerm);

      return (
        matchesFilter &&
        matchesSearch
      );
    });

  /*
   * REAL AI ANALYSIS
   */
  async function analyzeOpportunity() {
    setAiError("");
    setAiResult(null);
    setMessageAdded(false);

    const input =
      aiInput.trim();

    if (!input) {
      setAiError(
        "Enter an opportunity or prospect signal first.",
      );
      return;
    }

    if (input.length < 10) {
      setAiError(
        "Give SignalFlow a little more information to analyze.",
      );
      return;
    }

    const workspace =
      getWorkspace();

    if (!workspace?.id) {
      setAiError(
        "Your workspace could not be found. Please log in again.",
      );
      return;
    }

    try {
      setAiLoading(true);

      const result =
        await analyzeBuyingSignal(
          workspace.id,
          input,
        );

      setAiResult(result);
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : "SignalFlow could not analyze this opportunity.",
      );
    } finally {
      setAiLoading(false);
    }
  }

  /*
   * INSERT REAL AI MESSAGE INTO EDITOR
   */
  function useAIMessage() {
    if (!aiResult) return;

    setMessageText(
      aiResult.message,
    );

    setCopied(false);
    setSent(false);
    setMessageAdded(true);

    /*
     * Move the user to the message editor
     * so the demo clearly shows:
     *
     * AI result
     *      ↓
     * Outreach message
     */
    setTimeout(() => {
      editorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    setTimeout(() => {
      setMessageAdded(false);
    }, 2500);
  }

  function useDemoInput() {
    setAiInput(demoPrompt);
    setAiError("");
    setAiResult(null);
    setMessageAdded(false);
  }

  function selectMessage(
    message: MessageItem,
  ) {
    setSelectedId(message.id);
    setMessageText(
      message.message,
    );
    setCopied(false);
    setSent(false);
    setMessageAdded(false);
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(
        messageText,
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  function regenerateMessage() {
    setRegenerating(true);

    setTimeout(() => {
      setMessageText(
        `Hi ${selected.contact.split(" ")[0]} — I noticed ${selected.company} is showing a recent buying signal around "${selected.signal.toLowerCase()}". SignalFlow helps growth teams identify companies at this stage so they can reach out while the timing is right. Thought this could be relevant to what you're working on.`,
      );

      setRegenerating(false);
    }, 900);
  }

  function sendMessage() {
    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-[#f7f6f1] text-[#111111]">

      {/* ========================================================= */}
      {/* SIDEBAR */}
      {/* ========================================================= */}

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[245px] border-r border-black/8 bg-[#f7f6f1] lg:block">
        <div className="flex h-full flex-col px-5 py-6">

          <Link
            to="/dashboard"
            className="mb-10 px-3 text-xl font-black tracking-[-0.05em]"
          >
            SignalFlow
          </Link>

          <nav className="space-y-1">

            <SideNav
              label="Overview"
              href="/dashboard"
            />

            <SideNav
              label="Opportunities"
              href="/leads"
            />

            <SideNav
              label="Buying signals"
              href="/signals"
            />

            <SideNav
              label="Messages"
              href="/messages"
              active
            />

            <SideNav
              label="Campaigns"
              href="/campaigns"
            />

            <SideNav
              label="Analytics"
              href="/analytics"
            />

            <SideNav
              label="Settings"
              href="/settings"
            />

          </nav>

          <div className="mt-auto rounded-2xl border border-black/8 bg-white p-4">

            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
              <Sparkles size={15} />
            </div>

            <p className="text-sm font-semibold">
              AI outreach assistant
            </p>

            <p className="mt-1 text-xs leading-5 text-black/45">
              Personalized messages are ready for your highest-intent opportunities.
            </p>

          </div>
        </div>
      </aside>

      <main className="lg:pl-[245px]">

        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <header className="sticky top-0 z-20 border-b border-black/8 bg-[#f7f6f1]/90 backdrop-blur-xl">

          <div className="flex h-[72px] items-center justify-between px-5 md:px-8">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/35">
                SignalFlow
              </p>

              <h1 className="mt-1 text-lg font-semibold tracking-[-0.02em]">
                Messages
              </h1>

            </div>

            <div className="flex items-center gap-3">

              <button
                type="button"
                className="hidden h-10 w-10 items-center justify-center rounded-xl border border-black/8 bg-white transition hover:bg-black/5 md:flex"
              >
                <MoreHorizontal size={17} />
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                CF
              </div>

            </div>

          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-5 py-8 md:px-8">

          {/* ===================================================== */}
          {/* INTRO */}
          {/* ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-8"
          >

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <div className="mb-3 flex items-center gap-2 text-sm text-black/45">
                  <MessageSquare size={16} />
                  Outreach workspace
                </div>

                <h2 className="text-3xl font-medium tracking-[-0.05em] md:text-4xl">
                  Turn signals into conversations.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">
                  Review, personalize, and send AI-generated outreach based on the buying signals SignalFlow discovers.
                </p>

              </div>

              <Link
                to="/leads"
                className="flex w-fit items-center gap-2 rounded-full !bg-black px-5 py-3 text-sm font-semibold !text-white transition hover:bg-black/85"
              >
                Find more opportunities
                <ArrowUpRight size={15} />
              </Link>

            </div>
          </motion.div>

          {/* ===================================================== */}
          {/* LIVE AI OPPORTUNITY ANALYZER */}
          {/* ===================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
            }}
            className="mb-7 overflow-hidden rounded-3xl border border-violet-200/70 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
          >

            {/* Analyzer header */}
            <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50/80 via-white to-white px-5 py-5 md:px-7">

              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div className="flex items-start gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
                    <Brain size={20} />
                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-base font-semibold">
                        Live AI opportunity analyzer
                      </h3>

                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                        Live AI
                      </span>

                    </div>

                    <p className="mt-1 max-w-2xl text-xs leading-5 text-black/45">
                      Give SignalFlow a real prospect signal and let the AI identify buying intent, score the opportunity, and generate the next action.
                    </p>

                  </div>
                </div>

                <button
                  type="button"
                  onClick={useDemoInput}
                  className="flex w-fit items-center gap-2 rounded-xl border border-black/8 bg-white px-3 py-2 text-[11px] font-semibold text-black/55 transition hover:bg-black/5 hover:text-black"
                >
                  <Sparkles size={13} />
                  Use demo input
                </button>

              </div>
            </div>

            {/* Analyzer body */}
            <div className="p-5 md:p-7">

              <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">

                {/* Input */}
                <div>

                  <div className="mb-3 flex items-center justify-between">

                    <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/35">
                      Prospect signal
                    </label>

                    <span className="text-[10px] text-black/30">
                      {aiInput.length}/5000
                    </span>

                  </div>

                  <textarea
                    value={aiInput}
                    onChange={(event) => {
                      setAiInput(
                        event.target.value,
                      );
                      setAiError("");
                      setAiResult(null);
                      setMessageAdded(false);
                    }}
                    maxLength={5000}
                    rows={8}
                    placeholder="Example: A SaaS company is hiring engineers and looking for ways to automate customer support as its user base grows..."
                    className="w-full resize-none rounded-2xl border border-black/8 bg-black/[0.018] p-5 text-sm leading-7 text-black/75 outline-none transition placeholder:text-black/25 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />

                  {aiError && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium leading-5 text-red-700"
                    >
                      {aiError}
                    </motion.div>
                  )}

                  <button
                    type="button"
                    onClick={analyzeOpportunity}
                    disabled={aiLoading}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {aiLoading ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        SignalFlow is analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Analyze with SignalFlow
                        <ArrowRight size={15} />
                      </>
                    )}

                  </button>

                  <p className="mt-3 text-center text-[10px] text-black/30">
                    Your input is analyzed by the SignalFlow AI engine.
                  </p>

                </div>

                {/* Output */}
                <div className="rounded-2xl border border-black/8 bg-[#fbfbf8] p-5">

                  {!aiResult &&
                    !aiLoading && (
                      <div className="flex min-h-[320px] flex-col items-center justify-center text-center">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                          <Target size={21} />
                        </div>

                        <p className="mt-4 text-sm font-semibold">
                          Your AI analysis will appear here
                        </p>

                        <p className="mt-2 max-w-sm text-xs leading-5 text-black/40">
                          Enter a real opportunity on the left. SignalFlow will identify the signal, calculate intent, explain why it matters, and generate outreach.
                        </p>

                      </div>
                    )}

                  {aiLoading && (
                    <div className="flex min-h-[320px] flex-col items-center justify-center text-center">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
                        <Brain
                          size={24}
                          className="animate-pulse"
                        />
                      </div>

                      <p className="mt-5 text-sm font-semibold">
                        Analyzing opportunity...
                      </p>

                      <p className="mt-2 text-xs text-black/40">
                        SignalFlow is evaluating buying intent.
                      </p>

                      <div className="mt-5 flex items-center gap-1.5">

                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500" />

                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500 [animation-delay:120ms]" />

                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500 [animation-delay:240ms]" />

                      </div>

                    </div>
                  )}

                  {aiResult &&
                    !aiLoading && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                      >

                        {/* Result top */}
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                          <div>

                            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/35">
                              Detected buying signal
                            </p>

                            <h4 className="mt-1 text-lg font-semibold tracking-[-0.02em]">
                              {aiResult.signal}
                            </h4>

                          </div>

                          <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-black/5">

                            <div>

                              <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-black/30">
                                Intent
                              </p>

                              <p
                                className={`text-2xl font-bold tracking-[-0.05em] ${
                                  aiResult.score >= 80
                                    ? "text-emerald-600"
                                    : aiResult.score >= 50
                                      ? "text-amber-600"
                                      : "text-black/45"
                                }`}
                              >
                                {aiResult.score}
                              </p>

                            </div>

                            <span className="text-[9px] font-semibold text-black/30">
                              /100
                            </span>

                          </div>

                        </div>

                        {/* Score bar */}
                        <div className="mt-4">

                          <div className="h-2 overflow-hidden rounded-full bg-black/5">

                            <motion.div
                              initial={{
                                width: 0,
                              }}
                              animate={{
                                width: `${aiResult.score}%`,
                              }}
                              transition={{
                                duration: 0.8,
                                ease: "easeOut",
                              }}
                              className={`h-full rounded-full ${
                                aiResult.score >= 80
                                  ? "bg-emerald-500"
                                  : aiResult.score >= 50
                                    ? "bg-amber-500"
                                    : "bg-black/25"
                              }`}
                            />

                          </div>
                        </div>

                        {/* Action */}
                        <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5">

                          <div className="flex items-start gap-3">

                            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
                              <Zap size={13} />
                            </div>

                            <div>

                              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-700/60">
                                Recommended action
                              </p>

                              <p className="mt-1 text-xs font-semibold text-emerald-900">
                                {aiResult.action}
                              </p>

                            </div>

                          </div>
                        </div>

                        {/* Reasoning */}
                        <div className="mt-4">

                          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-black/30">
                            Why SignalFlow flagged it
                          </p>

                          <p className="mt-2 text-xs leading-5 text-black/55">
                            {aiResult.reasoning}
                          </p>

                        </div>

                        {/* Generated message */}
                        <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50/50 p-4">

                          <div className="flex items-center justify-between gap-3">

                            <div className="flex items-center gap-2">

                              <Sparkles
                                size={13}
                                className="text-violet-600"
                              />

                              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-violet-700">
                                AI-generated outreach
                              </p>

                            </div>

                            <button
                              type="button"
                              onClick={useAIMessage}
                              className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-violet-700"
                            >
                              Use message
                              <ArrowRight size={11} />
                            </button>

                          </div>

                          <p className="mt-3 whitespace-pre-line text-xs leading-6 text-violet-950/70">
                            {aiResult.message}
                          </p>

                        </div>

                      </motion.div>
                    )}

                </div>

              </div>
            </div>
          </motion.section>

          {/* ===================================================== */}
          {/* METRICS */}
          {/* ===================================================== */}

          <div className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

            <Metric
              icon={
                <MessageSquare size={17} />
              }
              label="Total messages"
              value="86"
              change="+18 this week"
            />

            <Metric
              icon={<Zap size={17} />}
              label="Ready to send"
              value="18"
              change="12 high intent"
            />

            <Metric
              icon={<Send size={17} />}
              label="Sent"
              value="51"
              change="+14 this week"
            />

            <Metric
              icon={
                <CheckCheck size={17} />
              }
              label="Replies"
              value="17"
              change="33.3% response"
            />

          </div>

          {/* ===================================================== */}
          {/* MESSAGE WORKSPACE */}
          {/* ===================================================== */}

          <div
            ref={editorRef}
            className="grid min-h-[680px] overflow-hidden rounded-2xl border border-black/8 bg-white lg:grid-cols-[370px_1fr]"
          >

            {/* Inbox */}
            <section className="border-b border-black/8 lg:border-b-0 lg:border-r">

              <div className="border-b border-black/8 p-4">

                <div className="relative">

                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30"
                  />

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value,
                      )
                    }
                    placeholder="Search messages..."
                    className="h-10 w-full rounded-xl bg-black/[0.035] pl-10 pr-3 text-sm outline-none placeholder:text-black/30 focus:bg-black/[0.06]"
                  />

                </div>

                <div className="mt-3 flex gap-1 overflow-x-auto">

                  {filters.map(
                    (filter) => (
                      <button
                        type="button"
                        key={filter}
                        onClick={() =>
                          setActiveFilter(
                            filter,
                          )
                        }
                        className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition ${
                          activeFilter ===
                          filter
                            ? "bg-black text-white"
                            : "text-black/45 hover:bg-black/5 hover:text-black"
                        }`}
                      >
                        {filter}
                      </button>
                    ),
                  )}

                </div>
              </div>

              <div>

                {filteredMessages.map(
                  (message, index) => (
                    <motion.button
                      type="button"
                      key={message.id}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay:
                          index * 0.035,
                      }}
                      onClick={() =>
                        selectMessage(
                          message,
                        )
                      }
                      className={`w-full border-b border-black/6 p-4 text-left transition ${
                        selectedId ===
                        message.id
                          ? "bg-black/[0.035]"
                          : "hover:bg-black/[0.018]"
                      }`}
                    >

                      <div className="flex items-start gap-3">

                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">

                          {getInitials(
                            message.contact,
                          )}

                          {message.status ===
                            "Replied" && (
                            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                          )}

                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex items-center justify-between gap-2">

                            <p className="truncate text-sm font-semibold">
                              {message.contact}
                            </p>

                            <span className="shrink-0 text-[10px] text-black/30">
                              {message.time}
                            </span>

                          </div>

                          <p className="mt-0.5 truncate text-xs text-black/45">
                            {message.company}
                          </p>

                          <p className="mt-2 line-clamp-1 text-xs leading-5 text-black/55">
                            {message.message}
                          </p>

                          <div className="mt-3 flex items-center gap-2">

                            <StatusBadge
                              status={
                                message.status
                              }
                            />

                            <ChannelBadge
                              channel={
                                message.channel
                              }
                            />

                            <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-black/35">
                              {message.score}
                              <span>
                                score
                              </span>
                            </span>

                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ),
                )}

              </div>

              {filteredMessages.length ===
                0 && (
                <div className="px-5 py-14 text-center">

                  <Search
                    size={20}
                    className="mx-auto text-black/25"
                  />

                  <p className="mt-3 text-sm font-semibold">
                    No messages found
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Try another search or filter.
                  </p>

                </div>
              )}

            </section>

            {/* ===================================================== */}
            {/* MESSAGE EDITOR */}
            {/* ===================================================== */}

            <section className="flex min-h-[680px] flex-col">

              {/* Editor header */}
              <div className="flex items-center justify-between border-b border-black/8 px-5 py-4 md:px-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                    {getInitials(
                      selected.contact,
                    )}
                  </div>

                  <div>

                    <p className="text-sm font-semibold">
                      {selected.contact}
                    </p>

                    <p className="text-xs text-black/40">
                      {selected.role} ·{" "}
                      {selected.company}
                    </p>

                  </div>
                </div>

                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/8 transition hover:bg-black/5"
                  >
                    <Archive
                      size={15}
                    />
                  </button>

                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/8 transition hover:bg-black/5"
                  >
                    <MoreHorizontal
                      size={15}
                    />
                  </button>

                </div>
              </div>

              {/* Signal context */}
              <div className="border-b border-black/8 bg-[#fbfbf8] px-5 py-4 md:px-6">

                <div className="flex flex-wrap items-center gap-2">

                  <div className="flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-[11px] font-semibold text-violet-700">

                    <Sparkles size={12} />

                    {messageAdded
                      ? "AI message added"
                      : "AI personalized"}

                  </div>

                  <div className="rounded-full bg-black/[0.045] px-3 py-1.5 text-[11px] font-medium text-black/50">
                    Signal score{" "}
                    {aiResult
                      ? aiResult.score
                      : selected.score}
                  </div>

                  <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-700">
                    {aiResult
                      ? aiResult.signal
                      : selected.signal}
                  </div>

                </div>
              </div>

              {/* Editor */}
              <div className="flex flex-1 flex-col">

                <div className="flex-1 p-5 md:p-7">

                  <div className="mx-auto max-w-3xl">

                    <div className="mb-6">

                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/35">
                        Outreach message
                      </p>

                      {selected.channel ===
                        "Email" && (
                        <input
                          defaultValue={
                            selected.subject
                          }
                          placeholder="Subject"
                          className="mb-4 w-full border-b border-black/8 pb-3 text-lg font-semibold outline-none placeholder:text-black/25 focus:border-black/20"
                        />
                      )}

                      <div className="flex items-center gap-2 text-xs text-black/40">

                        {selected.channel ===
                        "Email" ? (
                          <>
                            <Mail
                              size={13}
                            />
                            Email
                          </>
                        ) : (
                          <LinkedInBadge />
                        )}

                        <span>·</span>

                        <span>
                          {messageAdded
                            ? "Generated from live AI analysis"
                            : "Personalized from buying signal"}
                        </span>

                      </div>
                    </div>

                    <textarea
                      value={
                        messageText
                      }
                      onChange={(
                        event,
                      ) =>
                        setMessageText(
                          event.target
                            .value,
                        )
                      }
                      className="min-h-[260px] w-full resize-none rounded-2xl border border-black/8 bg-black/[0.018] p-5 text-sm leading-7 text-black/70 outline-none transition focus:border-black/15 focus:bg-white"
                    />

                    {/* AI insight */}
                    <div className="mt-5 rounded-2xl border border-violet-200/70 bg-violet-50/45 p-4">

                      <div className="flex gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white">
                          <Sparkles
                            size={14}
                          />
                        </div>

                        <div>

                          <p className="text-xs font-semibold text-violet-900">
                            Why this message works
                          </p>

                          <p className="mt-1 text-xs leading-5 text-violet-900/60">
                            {messageAdded
                              ? "SignalFlow generated this message directly from the prospect signal you analyzed above."
                              : "The message references the company's recent buying signal instead of using a generic sales pitch. This makes the outreach more relevant and timely."}
                          </p>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-black/8 bg-[#fbfbf8] p-4 md:p-5">

                  <div className="mx-auto flex max-w-3xl flex-col justify-between gap-3 sm:flex-row sm:items-center">

                    <div className="flex items-center gap-2">

                      <button
                        type="button"
                        onClick={
                          regenerateMessage
                        }
                        disabled={
                          regenerating
                        }
                        className="flex items-center gap-2 rounded-xl border border-black/8 bg-white px-4 py-2.5 text-xs font-semibold transition hover:bg-black/5 disabled:opacity-50"
                      >

                        <RefreshCw
                          size={14}
                          className={
                            regenerating
                              ? "animate-spin"
                              : ""
                          }
                        />

                        {regenerating
                          ? "Regenerating..."
                          : "Regenerate"}

                      </button>

                      <button
                        type="button"
                        onClick={
                          copyMessage
                        }
                        className="flex items-center gap-2 rounded-xl border border-black/8 bg-white px-4 py-2.5 text-xs font-semibold transition hover:bg-black/5"
                      >

                        {copied ? (
                          <Check
                            size={14}
                          />
                        ) : (
                          <Copy
                            size={14}
                          />
                        )}

                        {copied
                          ? "Copied"
                          : "Copy"}

                      </button>

                      <button
                        type="button"
                        className="hidden items-center gap-2 rounded-xl border border-black/8 bg-white px-4 py-2.5 text-xs font-semibold transition hover:bg-black/5 sm:flex"
                      >
                        <Edit3
                          size={14}
                        />
                        Edit
                      </button>

                    </div>

                    <button
                      type="button"
                      onClick={
                        sendMessage
                      }
                      className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/85"
                    >

                      {sent ? (
                        <>
                          <Check
                            size={16}
                          />
                          Message sent
                        </>
                      ) : (
                        <>
                          <Send
                            size={15}
                          />
                          Send message
                        </>
                      )}

                    </button>

                  </div>
                </div>

              </div>
            </section>
          </div>

          {/* Best send time */}
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-black/8 bg-white p-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Zap size={16} />
              </div>

              <div>

                <p className="text-sm font-semibold">
                  Best send time
                </p>

                <p className="mt-0.5 text-xs text-black/40">
                  Based on engagement patterns for similar prospects.
                </p>

              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold">

              Today · 10:30 AM

              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700">
                Recommended
              </span>

            </div>

          </div>

        </div>
      </main>

      {/* ========================================================= */}
      {/* SUCCESS TOAST */}
      {/* ========================================================= */}

      <AnimatePresence>
        {messageAdded && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-black px-5 py-4 text-sm font-medium text-white shadow-2xl"
          >

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500">
              <Sparkles
                size={14}
              />
            </div>

            AI message added to outreach editor

          </motion.div>
        )}

        {sent && !messageAdded && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-2xl bg-black px-5 py-4 text-sm font-medium text-white shadow-2xl"
          >

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500">
              <Check size={14} />
            </div>

            Message sent successfully

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

/* ========================================================= */
/* SIDEBAR */
/* ========================================================= */

function SideNav({
  label,
  href,
  active = false,
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      to={href}
      className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "border border-black/[0.07] bg-white text-black shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
          : "border border-transparent text-black/50 hover:border-black/[0.05] hover:bg-white/70 hover:text-black"
      }`}
    >
      {label}
    </Link>
  );
}

/* ========================================================= */
/* METRIC */
/* ========================================================= */

function Metric({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-2xl border border-black/8 bg-white p-5">

      <div className="flex items-center justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.045]">
          {icon}
        </div>

        <span className="text-[11px] font-semibold text-emerald-600">
          {change}
        </span>

      </div>

      <p className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
        {value}
      </p>

      <p className="mt-1 text-xs text-black/40">
        {label}
      </p>

    </div>
  );
}

/* ========================================================= */
/* STATUS */
/* ========================================================= */

function StatusBadge({
  status,
}: {
  status: MessageStatus;
}) {
  const styles: Record<
    MessageStatus,
    string
  > = {
    Draft:
      "bg-black/[0.05] text-black/50",
    Ready:
      "bg-violet-50 text-violet-700",
    Sent:
      "bg-blue-50 text-blue-700",
    Replied:
      "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* ========================================================= */
/* CHANNEL */
/* ========================================================= */

function ChannelBadge({
  channel,
}: {
  channel: Channel;
}) {
  if (channel === "LinkedIn") {
    return <LinkedInBadge />;
  }

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-black/35">
      <Mail size={11} />
      Email
    </span>
  );
}

function LinkedInBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#315ca8]">

      <span className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#315ca8] text-[8px] font-black text-white">
        in
      </span>

      LinkedIn

    </span>
  );
}

/* ========================================================= */
/* INITIALS */
/* ========================================================= */

function getInitials(
  name: string,
) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


