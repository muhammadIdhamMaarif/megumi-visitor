// LabVisitorThankYouPage.jsx
import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";

const TOTAL_SECONDS = 30;

export default function LabThankYouPage() {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Refresh / restart the site
          window.location.reload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRestart = () => {
    window.location.reload();
  };

  const progress = (secondsLeft / TOTAL_SECONDS) * 100;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full">
        <div className="relative overflow-hidden rounded-3xl border border-[#F0F0F0] bg-white shadow-[0_18px_45px_rgba(15,134,87,0.10)] p-6 sm:p-8">
          {/* Gamey background shapes */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-[32px] border-[10px] border-[#F7BF33]/40" />
          <div className="pointer-events-none absolute -left-12 bottom-10 h-28 w-28 rounded-full border-[10px] border-[#3A6DC5]/20" />
          <div className="pointer-events-none absolute right-6 bottom-6 grid grid-cols-4 gap-1 opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i % 4 === 0
                    ? "bg-[#F94141]"
                    : i % 4 === 1
                    ? "bg-[#3A6DC5]"
                    : i % 4 === 2
                    ? "bg-[#F7BF33]"
                    : "bg-[#0F8657]"
                }`}
              />
            ))}
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg overflow-hidden">
                <img
                  src={logo}
                  alt="Lab Logo"
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-[#0F8657]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0F8657]">
                  Mission Complete
                  <span className="h-1 w-1 rounded-full bg-[#0F8657]" />
                </p>
                <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#272727]">
                  Terima kasih sudah mengisi Form!
                </h1>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Data kunjunganmu sudah terekam dengan aman. Selamat menikmati
                  pengalaman di Laboratorium MGM.
                </p>
              </div>
            </div>
          </div>

          {/* Main content: left text + right timer card */}
          <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr,0.9fr] items-stretch">
            {/* Left side */}
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]">
                    Status Kunjungan
                  </p>
                  <p className="mt-2 text-sm text-[#272727]">
                    Kamu sekarang sudah{" "}
                    <span className="font-semibold text-[#0F8657]">
                      terdaftar sebagai pengunjung
                    </span>{" "}
                    Lab MGM pada sesi ini.
                  </p>
                  <p className="mt-1 text-xs text-[#6B7280]">
                    Jika ingin kembali ke awal dan mengisi data baru, gunakan
                    tombol di bawah atau tunggu hitungan mundur selesai.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#3A6DC5] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(58,109,197,0.60)] transition hover:translate-y-0.5 hover:bg-[#305aa1] focus:outline-none focus:ring-2 focus:ring-[#3A6DC5]/40 w-full sm:w-auto"
                  >
                    <span>Kembali ke Awal</span>
                    <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs">
                      ⟳
                    </span>
                  </button>

                  <p className="text-xs text-[#6B7280]">
                    Halaman ini akan otomatis menyegarkan dalam{" "}
                    <span className="font-semibold text-[#F94141]">
                      {secondsLeft} detik
                    </span>{" "}
                    jika kamu tidak menekan tombol.
                  </p>
                </div>
              </div>

              {/* Little playful badges */}
              <div className="flex flex-wrap gap-2 text-[10px] text-[#6B7280]">
                <Tag color="#3A6DC5">Media</Tag>
                <Tag color="#F7BF33">Game</Tag>
                <Tag color="#0F8657">Mobile</Tag>
                <Tag color="#F94141">Laboratory</Tag>
              </div>
            </div>

            {/* Right side: timer card */}
            <div className="relative flex flex-col rounded-3xl bg-[#272727] p-5 sm:p-6 text-white overflow-hidden">
              <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rotate-12 rounded-[32px] bg-[#F94141] opacity-60" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 -rotate-6 bg-[#3A6DC5] opacity-60" />

              <div className="relative z-10 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7BF33]">
                    Auto Restart
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    Halaman akan kembali ke layar awal.
                  </p>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium">
                  Session ID:{" "}
                  <span className="font-mono text-[10px]">
                    MGM-{new Date().getFullYear()}
                  </span>
                </div>
              </div>

              {/* Countdown display */}
              <div className="relative z-10 mt-6 flex flex-col items-center gap-4">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-black/40">
                  <div className="absolute inset-2 rounded-full bg-[#272727] border border-white/10" />
                  <div
                    className="absolute inset-0 rounded-full border-4 border-transparent"
                    style={{
                      borderTopColor: "#F7BF33",
                      borderRightColor: "#3A6DC5",
                      borderBottomColor: "#0F8657",
                      borderLeftColor: "#F94141",
                      transform: `rotate(${(progress / 100) * 360}deg)`,
                      transition: "transform 0.25s linear",
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                      Timer
                    </span>
                    <span className="mt-1 text-3xl font-black tabular-nums">
                      {secondsLeft}
                    </span>
                    <span className="text-[11px] text-white/60">
                      detik tersisa
                    </span>
                  </div>
                </div>

                {/* Bar + labels */}
                <div className="w-full rounded-2xl bg-white/5 p-3">
                  <div className="flex items-center justify-between text-[11px] text-white/70">
                    <span>Progress reset</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full rounded-full bg-black/40">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0F8657] via-[#F7BF33] to-[#F94141] transition-all duration-300"
                      style={{ width: `${Math.max(progress, 4)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-white/60">
                    Begitu timer habis, halaman akan kembali ke form awal secara
                    otomatis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ children, color }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-2.5 py-1"
      style={{ color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="font-medium text-[10px] text-[#272727]">{children}</span>
    </span>
  );
}
