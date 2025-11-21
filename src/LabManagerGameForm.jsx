import React, { useMemo, useState } from "react";
import LabThankYouPage from "./LabThankYouPage";
import logo from "./assets/logo.png";

export default function LabManagerGameForm({
  // Ganti default password ini sesuai kebutuhan
  accessPassword = "megumi-approved",
}) {
  // === ACCESS GATE STATE ===
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === accessPassword) {
      setIsAuthorized(true);
      setPasswordError("");
    } else {
      setPasswordError("Password salah. Silakan coba lagi.");
    }
  };

  // === MAIN FORM STATE ===
  const [formData, setFormData] = useState({
    nama: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const completedSteps = useMemo(() => {
    let count = 0;
    if (formData.nama.trim()) count++;

    return count;
  }, [formData]);

  const totalSteps = 1;
  const progress = (completedSteps / totalSteps) * 100;

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSubmitted(false);
  };

  const handleTujuanChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      tujuan: value,
      tujuanCustom: value === "lainnya" ? prev.tujuanCustom : "",
    }));
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // In a real app, send formData to your backend here
    console.log("Lab visitor form submitted:", formData);
  };

  if (submitted) {
    return <LabThankYouPage />;
  }

  // =========================
  // PASSWORD GATE SCREEN
  // =========================
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full rounded-3xl border border-[#F0F0F0] bg-white shadow-[0_18px_45px_rgba(15,134,87,0.08)] p-6 sm:p-8 relative overflow-hidden">
          {/* Background shapes */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-[32px] border-[10px] border-[#F7BF33]/40" />
          <div className="pointer-events-none absolute -left-12 bottom-10 h-20 w-20 rounded-full border-[8px] border-[#3A6DC5]/20" />

          {/* Logo + title */}
          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg overflow-hidden">
              <img
                src={logo}
                alt="Lab Logo"
                className="h-full w-full object-contain p-1"
              />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#0F8657]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0F8657]">
                MGM Lab Access
                <span className="h-1 w-1 rounded-full bg-[#0F8657]" />
              </p>
              <h1 className="mt-2 text-xl sm:text-xl font-black tracking-tight text-[#272727]">
                Password Required
              </h1>
              <p className="mt-1 text-xs text-[#6B7280]">
                Masukkan password untuk masuk ke halaman Manager Form.
              </p>
            </div>
          </div>

          {/* Password form */}
          <form onSubmit={handlePasswordSubmit} className="space-y-4 relative">
            <div>
              <label className="block text-xs font-semibold text-[#4B5563] mb-2">
                Password Akses
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 pr-20 py-2.5 text-sm text-[#272727] outline-none transition focus:border-[#3A6DC5] focus:ring-2 focus:ring-[#3A6DC5]/20"
                  placeholder="********"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError("");
                  }}
                  autoFocus
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 my-1 inline-flex items-center justify-center rounded-xl px-3 text-[11px] font-medium text-white bg-[#EFF3FF]"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {passwordError && (
              <div className="rounded-2xl border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2 text-[11px] text-[#B91C1C] flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#B91C1C] text-white text-[10px] font-bold">
                  !
                </span>
                <span>{passwordError}</span>
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#3A6DC5] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(58,109,197,0.55)] transition hover:translate-y-0.5 hover:bg-[#305aa1] focus:outline-none focus:ring-2 focus:ring-[#3A6DC5]/40"
            >
              <span>Continue to Manager Form</span>
              <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-xs">
                <span className="translate-x-[1px]">▶</span>
              </span>
            </button>

            <p className="mt-3 text-[10px] text-center text-[#9CA3AF]">
              Jika lupa password, hubungi admin / penanggung jawab lab.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // =========================
  // MAIN VISITOR FORM (AS BEFORE)
  // =========================
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full grid gap-8 md:grid-cols-[1.1fr,0.9fr] items-stretch">
        {/* Form Card */}
        <div className="relative overflow-hidden rounded-3xl border border-[#F0F0F0] bg-white shadow-[0_18px_45px_rgba(15,134,87,0.08)] p-6 sm:p-8">
          {/* Gamey background shapes */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-[32px] border-[10px] border-[#F7BF33]/40" />
          <div className="pointer-events-none absolute -left-12 bottom-10 h-24 w-24 rounded-full border-[10px] border-[#3A6DC5]/20" />
          <div className="pointer-events-none absolute right-6 bottom-6 grid grid-cols-3 gap-1 opacity-40">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i % 3 === 0
                    ? "bg-[#F94141]"
                    : i % 3 === 1
                    ? "bg-[#3A6DC5]"
                    : "bg-[#F7BF33]"
                }`}
              />
            ))}
          </div>

          {/* Header */}
          <div className="relative flex items-start justify-between">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg overflow-hidden">
              <img
                src={logo}
                alt="Lab Logo"
                className="h-full w-full object-contain p-1"
              />
            </div>
          </div>
          <div className="relative mb-20 flex items-start justify-center gap-4">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#0F8657]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F8657]">
                MGM Lab Manager
                <span className="h-1 w-1 rounded-full bg-[#0F8657]" />
              </p>
              <h1 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-[#272727]">
                Manager Form
              </h1>
              <p className="mt-1 text-sm text-[#6B7280]">
                Harap isi data dibawah untuk menggunakan lab MGM
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280]">
              <span>Progress Pengisian</span>
              <span>
                {completedSteps}/{totalSteps} Quest
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/80">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#3A6DC5] via-[#F7BF33] to-[#F94141] transition-all duration-300"
                style={{ width: `${Math.max(progress, 8)}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5 relative z-20"
          >
            {/* Nama */}
            <FieldCard
              label="Nama"
              quest="Quest 1"
              description="Siapa nama lengkapmu?"
            >
              <input
                type="text"
                className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#272727] outline-none transition focus:border-[#3A6DC5] focus:ring-2 focus:ring-[#3A6DC5]/20"
                placeholder="Tulis nama lengkapmu"
                value={formData.nama}
                onChange={handleChange("nama")}
                required
              />
            </FieldCard>

            {/* Submit */}
            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#6B7280]">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#3A6DC5]/10 text-[11px] font-bold text-[#3A6DC5]">
                  i
                </span>
                <span>
                  Dengan mengisi form, kamu setuju dengan{" "}
                  <a
                    href="https://s.estella.id/privacy-policy-mgm"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>{" "}
                  dan{" "}
                  <a href="https://s.estella.id/sop-mgm" target="_blank">
                    SOP
                  </a>{" "}
                  Lab MGM
                </span>
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-2xl bg-[#3A6DC5] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(58,109,197,0.55)] transition hover:translate-y-0.5 hover:bg-[#305aa1] focus:outline-none focus:ring-2 focus:ring-[#3A6DC5]/40"
              >
                <span>Submit &amp; Enter Lab</span>
                <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg:white/15 text-xs">
                  <span className="translate-x-[1px]">▶</span>
                </span>
              </button>
            </div>

            {submitted && (
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#0F8657]/20 bg-[#0F8657]/5 px-4 py-3 text-xs sm:text-sm text-[#065F46]">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#0F8657] text-white text-xs font-bold">
                  ✓
                </div>
                <p>
                  Data kunjungan berhasil direkam! Terima kasih sudah berkunjung
                  ke laboratorium kami.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Right: Fun Game-like Side Panel */}
        <div className="relative flex flex-col rounded-3xl bg-[#272727] p-6 sm:p-7 text-white overflow-hidden">
          {/* Pattern blocks */}
          <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rotate-12 rounded-[32px] bg-[#F94141] opacity-60" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 -rotate-6 bg-[#0F8657] opacity-60" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7BF33]">
                Overview Form
              </p>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium">
                Level{" "}
                {completedSteps === totalSteps ? "MAX" : completedSteps + 1}
              </span>
              <span className="mt-1 text-[11px] text-white/60">
                {completedSteps === totalSteps
                  ? "All quests cleared!"
                  : "Lengkapi semua quest."}
              </span>
            </div>
          </div>

          {/* XP Bar */}
          <div className="relative z-10 mt-6 rounded-2xl bg-white/5 p-3">
            <div className="flex items-center justify-between text-[11px] text:white/70">
              <span>XP Meter</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-2 h-2.5 w-full rounded-full bg-black/40">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#F7BF33] via-[#3A6DC5] to-[#F94141] transition-all duration-300"
                style={{ width: `${Math.max(progress, 6)}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-white/55">
              <span>Isi semua data untuk full XP.</span>
              <span>
                {completedSteps}/{totalSteps} quest selesai
              </span>
            </div>
          </div>

          {/* Live preview */}
          <div className="relative z-10 mt-6 grid gap-3 text-[11px] sm:text-xs">
            <InfoPill
              label="Nama"
              value={formData.nama || "Belum diisi"}
              color="blue"
            />
          </div>

          {/* Bottom badges */}
          <div className="relative z-10 mt-6 flex flex-wrap gap-2 text-[9px] text-white/55">
            <Badge color="#3A6DC5">Media</Badge>
            <Badge color="#F7BF33">Game</Badge>
            <Badge color="#0F8657">Mobile</Badge>
            <Badge color="#F94141">Laboratory</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldCard({ label, quest, description, children }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB]/60 p-4 sm:p-5 hover:border-[#3A6DC5]/40 hover:bg-white transition">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#3A6DC5]/10 text-[11px] font-semibold text-[#3A6DC5]">
            {quest.split(" ")[1]}
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
              {quest}
            </p>
            <p className="-mt-0.5 text-sm font-semibold text-[#272727]">
              {label}
            </p>
          </div>
        </div>
      </div>
      <p className="mb-3 text-xs text-[#6B7280]">{description}</p>
      {children}
    </div>
  );
}

function InfoPill({ label, value, color }) {
  const colorMap = {
    blue: "bg-[#3A6DC5]/20 text-[#BFCEEE] border-[#3A6DC5]/40",
    green: "bg-[#0F8657]/20 text-[#C4E7D7] border-[#0F8657]/40",
    yellow: "bg-[#F7BF33]/15 text-[#FDE9B5] border-[#F7BF33]/40",
    red: "bg-[#F94141]/20 text-[#FECACA] border-[#FCA5A5]/60",
  };

  return (
    <div
      className={`flex items-center justify-between rounded-2xl border px-3 py-2 ${
        colorMap[color] || colorMap.blue
      }`}
    >
      <span className="text-[10px] uppercase tracking-[0.16em] text-white/70">
        {label}
      </span>
      <span className="max-w-[55%] truncate text-[11px] font-medium">
        {value}
      </span>
    </div>
  );
}

function Badge({ children, color }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1"
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06)", color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="font-medium">{children}</span>
    </span>
  );
}
