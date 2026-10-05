import { motion } from "framer-motion";
import {
  Bell,
  Check,
  ChevronRight,
  Globe2,
  KeyRound,
  Lock,
  Mail,
  Monitor,
 
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type ToggleProps = {
  enabled: boolean;
  onChange: () => void;
};

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={enabled}
      className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
        enabled ? "bg-[#111111]" : "bg-black/[0.12]"
      }`}
    >
      <motion.span
        animate={{
          x: enabled ? 20 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.18)]"
      />
    </button>
  );
}

const sectionItems = [
  {
    id: "profile",
    label: "Profile",
    description: "Your personal information",
    icon: User,
  },
  {
    id: "workspace",
    label: "Workspace",
    description: "Company and business settings",
    icon: Globe2,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Control what SignalFlow sends you",
    icon: Bell,
  },
  {
    id: "security",
    label: "Security",
    description: "Password and account protection",
    icon: ShieldCheck,
  },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [signalAlerts, setSignalAlerts] = useState(true);

  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f1] text-[#111111]">
      {/* =========================================================
          TOP NAV
      ========================================================= */}

      <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-[#f5f5f1]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            to="/dashboard"
            className="group flex items-center gap-3"
          >
            <motion.div
              whileHover={{
                rotate: 7,
                scale: 1.05,
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111]"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
            </motion.div>

            <span className="text-[15px] font-semibold tracking-[-0.03em]">
              SignalFlow
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold">
                Fabrice
              </p>

              <p className="text-[10px] text-black/35">
                Admin
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] text-xs font-semibold text-white">
              F
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <main className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">
            Workspace
          </p>

          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
                Settings
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
                Manage your SignalFlow account, workspace,
                notifications and security preferences.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/70 px-3.5 py-2 text-[11px] font-medium text-black/50 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Workspace active
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="mt-10 grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Sidebar */}

          <motion.aside
            initial={{
              opacity: 0,
              x: -15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="h-fit rounded-[26px] border border-black/[0.07] bg-white/80 p-2 shadow-[0_15px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl"
          >
            <div className="px-4 pb-3 pt-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/25">
                Settings
              </p>
            </div>

            <div className="space-y-1">
              {sectionItems.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setActiveSection(item.id)
                    }
                    className={`group flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-all duration-200 ${
                      active
                        ? "bg-[#111111] text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)]"
                        : "text-black/55 hover:bg-black/[0.04] hover:text-black"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        active
                          ? "bg-white/10"
                          : "bg-black/[0.04]"
                      }`}
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.8}
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold">
                        {item.label}
                      </span>

                      <span
                        className={`mt-0.5 block truncate text-[9px] ${
                          active
                            ? "text-white/45"
                            : "text-black/30"
                        }`}
                      >
                        {item.description}
                      </span>
                    </span>

                    <ChevronRight
                      size={14}
                      className={`shrink-0 transition-transform ${
                        active
                          ? "translate-x-0 opacity-70"
                          : "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-50"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="my-3 h-px bg-black/[0.06]" />

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-black/45 transition hover:bg-red-500/[0.05] hover:text-red-600"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/[0.06]">
                <Lock size={15} />
              </span>

              <span>
                <span className="block text-xs font-semibold">
                  Delete account
                </span>

                <span className="mt-0.5 block text-[9px] text-black/25">
                  Permanently remove workspace
                </span>
              </span>
            </button>
          </motion.aside>

          {/* Main settings card */}

          <motion.section
            key={activeSection}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="min-w-0 rounded-[30px] border border-black/[0.07] bg-white/85 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-7 lg:p-9"
          >
            {/* PROFILE */}

            {activeSection === "profile" && (
              <ProfileSection />
            )}

            {/* WORKSPACE */}

            {activeSection === "workspace" && (
              <WorkspaceSection />
            )}

            {/* NOTIFICATIONS */}

            {activeSection === "notifications" && (
              <NotificationsSection
                emailNotifications={emailNotifications}
                setEmailNotifications={() =>
                  setEmailNotifications(
                    (value) => !value,
                  )
                }
                signalAlerts={signalAlerts}
                setSignalAlerts={() =>
                  setSignalAlerts((value) => !value)
                }
                weeklyDigest={weeklyDigest}
                setWeeklyDigest={() =>
                  setWeeklyDigest((value) => !value)
                }
              />
            )}

            {/* SECURITY */}

            {activeSection === "security" && (
              <SecuritySection />
            )}
          </motion.section>
        </div>
      </main>
    </div>
  );
}

/* =============================================================
   PROFILE
============================================================= */

function ProfileSection() {
  return (
    <div>
      <SectionHeader
        icon={<User size={17} />}
        eyebrow="Personal information"
        title="Your profile"
        description="Manage the information connected to your SignalFlow account."
      />

      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        <InputField
          label="First name"
          value="Fabrice"
        />

        <InputField
          label="Last name"
          value="Cyuzuzo"
        />

        <InputField
          label="Email address"
          value="fabrice@example.com"
          type="email"
        />

        <InputField
          label="Role"
          value="Founder / Developer"
        />
      </div>

      <div className="mt-7 rounded-2xl border border-black/[0.06] bg-[#fafaf7] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/[0.08]">
            <Mail
              size={15}
              className="text-violet-600"
            />
          </div>

          <div>
            <p className="text-xs font-semibold">
              Email verification
            </p>

            <p className="mt-1 text-[11px] leading-5 text-black/40">
              Your email address is currently verified and
              can be used for workspace notifications.
            </p>
          </div>

          <span className="ml-auto flex items-center gap-1 rounded-full bg-green-500/[0.08] px-2.5 py-1 text-[9px] font-semibold text-green-700">
            <Check size={10} />
            Verified
          </span>
        </div>
      </div>

      <SaveButton />
    </div>
  );
}

/* =============================================================
   WORKSPACE
============================================================= */

function WorkspaceSection() {
  return (
    <div>
      <SectionHeader
        icon={<Globe2 size={17} />}
        eyebrow="Business settings"
        title="Workspace"
        description="Tell SignalFlow what your company does so signals can be qualified correctly."
      />

      <div className="mt-9 space-y-5">
        <InputField
          label="Company name"
          value="SignalFlow"
        />

        <InputField
          label="Website"
          value="https://signalflow.app"
        />

        <div>
          <label className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
            What do you sell?
          </label>

          <textarea
            defaultValue="AI-powered lead discovery and buying-intent intelligence for modern sales teams."
            rows={4}
            className="w-full resize-none rounded-2xl border border-black/[0.08] bg-[#f8f8f5] px-4 py-3.5 text-sm leading-6 outline-none transition-all duration-300 placeholder:text-black/25 focus:border-violet-400/50 focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,58,237,0.06)]"
          />
        </div>

        <div>
          <label className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
            Ideal customers
          </label>

          <textarea
            defaultValue="B2B companies, agencies and software businesses actively looking for qualified sales opportunities."
            rows={4}
            className="w-full resize-none rounded-2xl border border-black/[0.08] bg-[#f8f8f5] px-4 py-3.5 text-sm leading-6 outline-none transition-all duration-300 focus:border-violet-400/50 focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,58,237,0.06)]"
          />
        </div>
      </div>

      <SaveButton />
    </div>
  );
}

/* =============================================================
   NOTIFICATIONS
============================================================= */

function NotificationsSection({
  emailNotifications,
  setEmailNotifications,
  signalAlerts,
  setSignalAlerts,
  weeklyDigest,
  setWeeklyDigest,
}: {
  emailNotifications: boolean;
  setEmailNotifications: () => void;
  signalAlerts: boolean;
  setSignalAlerts: () => void;
  weeklyDigest: boolean;
  setWeeklyDigest: () => void;
}) {
  return (
    <div>
      <SectionHeader
        icon={<Bell size={17} />}
        eyebrow="Communication"
        title="Notifications"
        description="Choose which SignalFlow updates you want to receive."
      />

      <div className="mt-9 overflow-hidden rounded-2xl border border-black/[0.07]">
        <NotificationRow
          icon={<Mail size={16} />}
          title="Email notifications"
          description="Receive important workspace updates by email."
          enabled={emailNotifications}
          onChange={setEmailNotifications}
        />

        <NotificationRow
          icon={<Zap size={16} />}
          title="Buying signal alerts"
          description="Get notified when a high-intent opportunity appears."
          enabled={signalAlerts}
          onChange={setSignalAlerts}
        />

        <NotificationRow
          icon={<Monitor size={16} />}
          title="Weekly digest"
          description="Receive a weekly summary of your pipeline activity."
          enabled={weeklyDigest}
          onChange={setWeeklyDigest}
        />
      </div>
    </div>
  );
}

/* =============================================================
   SECURITY
============================================================= */

function SecuritySection() {
  return (
    <div>
      <SectionHeader
        icon={<ShieldCheck size={17} />}
        eyebrow="Account protection"
        title="Security"
        description="Keep your SignalFlow workspace protected."
      />

      <div className="mt-9 space-y-4">
        <SecurityRow
          icon={<KeyRound size={16} />}
          title="Password"
          description="Last changed recently"
          action="Change"
        />

        <SecurityRow
          icon={<Lock size={16} />}
          title="Two-factor authentication"
          description="Add another layer of protection"
          action="Enable"
        />

        <SecurityRow
          icon={<Monitor size={16} />}
          title="Active sessions"
          description="Manage devices signed into your account"
          action="View"
        />
      </div>

      <div className="mt-7 rounded-2xl border border-green-500/[0.15] bg-green-500/[0.04] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/[0.1]">
            <ShieldCheck
              size={16}
              className="text-green-600"
            />
          </div>

          <div>
            <p className="text-xs font-semibold">
              Your account is protected
            </p>

            <p className="mt-1 text-[10px] text-black/40">
              No suspicious activity detected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   COMPONENTS
============================================================= */

function SectionHeader({
  icon,
  eyebrow,
  title,
  description,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-black/[0.07] pb-7">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/[0.04]">
          {icon}
        </span>

        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/30">
          {eyebrow}
        </p>
      </div>

      <h2 className="mt-5 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
        {title}
      </h2>

      <p className="mt-2 max-w-xl text-sm leading-6 text-black/40">
        {description}
      </p>
    </div>
  );
}

function InputField({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
        {label}
      </label>

      <input
        type={type}
        defaultValue={value}
        className="h-13 w-full rounded-2xl border border-black/[0.08] bg-[#f8f8f5] px-4 text-sm outline-none transition-all duration-300 focus:border-violet-400/50 focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,58,237,0.06)]"
      />
    </div>
  );
}

function SaveButton() {
  return (
    <div className="mt-8 flex justify-end">
      <motion.button
        type="button"
        whileHover={{
          y: -2,
          boxShadow: "0 12px 25px rgba(0,0,0,0.14)",
        }}
        whileTap={{
          scale: 0.98,
        }}
        className="rounded-xl bg-[#111111] px-5 py-3 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-shadow"
      >
        Save changes
      </motion.button>
    </div>
  );
}

function NotificationRow({
  icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-black/[0.06] p-5 last:border-b-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] text-black/55">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-black/40">
          {description}
        </p>
      </div>

      <Toggle
        enabled={enabled}
        onChange={onChange}
      />
    </div>
  );
}

function SecurityRow({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-black/[0.07] bg-[#fafaf7] p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black/55 shadow-sm">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-xs text-black/35">
          {description}
        </p>
      </div>

      <button
        type="button"
        className="rounded-xl border border-black/[0.08] bg-white px-3.5 py-2 text-[11px] font-semibold transition hover:border-black/20 hover:bg-black/[0.02]"
      >
        {action}
      </button>
    </div>
  );
}