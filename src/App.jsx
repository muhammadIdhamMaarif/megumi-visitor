import React, { useEffect, useState } from "react";
import LabVisitorGameForm from "./LabVisitorGameForm";
import LabUserGameForm from "./LabUserGameForm";
import LabManagerGameForm from "./LabManagerGameForm";
import "./App.css";

const ROLES = {
  PENGUNJUNG: "pengunjung",
  PENGGUNA: "pengguna",
  PENGURUS: "pengurus",
};

export default function App() {
  const [phase, setPhase] = useState("intro"); // "intro" | "select" | "form"
  const [role, setRole] = useState(null);

  // After intro animation, automatically show role selection
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("select");
    }, 2600); // match CSS animation duration
    return () => clearTimeout(timer);
  }, []);

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    setPhase("form");
  };

  // When a role has been chosen, just show the corresponding form/program
  if (phase === "form" && role) {
    if (role === ROLES.PENGUNJUNG) return <LabVisitorGameForm />;
    if (role === ROLES.PENGGUNA) return <LabUserGameForm />;
    if (role === ROLES.PENGURUS) return <LabManagerGameForm />;
  }

  return (
    <div className="mg3-app-root">
      {phase === "intro" && <IntroScreen />}
      {phase === "select" && (
        <RoleSelectScreen onSelectRole={handleSelectRole} />
      )}
    </div>
  );
}

function IntroScreen() {
  return (
    <div className="intro-container">
      <div className="intro-card intro-pop">
        <div className="intro-logo">
          {/* You can replace this with an <img src=".../M.png" /> */}
          <span className="logo-m">M</span>
          <span className="logo-g">G</span>
          <span className="logo-3">M</span>
        </div>
        <p className="intro-title">Selamat Datang di Lab Game</p>
        <p className="intro-subtitle">Loading Page.</p>
      </div>

      {/* Decorative shapes inspired by your pattern/logo */}
      <div className="intro-shape intro-shape-1" />
      <div className="intro-shape intro-shape-2" />
      <div className="intro-shape intro-shape-3" />
    </div>
  );
}

function RoleSelectScreen({ onSelectRole }) {
  return (
    <div className="select-container">
      <header className="select-header">
        <div className="select-logo-row">
          <div className="select-logo">
            <span className="logo-m">M</span>
            <span className="logo-g">G</span>
            <span className="logo-3">M</span>
          </div>
          <span className="select-tag">Lab Game</span>
        </div>
        <h1 className="select-title">Pilih Peranmu di Lab</h1>
        <p className="select-subtitle">
          Kamu datang sebagai apa hari ini? Pilih salah satu untuk membuka form
          yang sesuai.
        </p>
      </header>

      <main className="role-grid">
        <RoleCard
          color="blue"
          title="Pengunjung"
          badge="Casual Player"
          description="Datang untuk mencoba game, eksplorasi, dan bermain santai di lab."
          onClick={() => onSelectRole(ROLES.PENGUNJUNG)}
        />
        <RoleCard
          color="green"
          title="Pengguna"
          badge="Lab User"
          description="Mahasiswa yang menggunakan perangkat lab untuk tugas, riset, atau eksperimen."
          onClick={() => onSelectRole(ROLES.PENGGUNA)}
        />
        <RoleCard
          color="red"
          title="Pengurus"
          badge="Lab Crew"
          description="Tim pengelola yang mengatur jadwal, aset, dan aktivitas di lab."
          onClick={() => onSelectRole(ROLES.PENGURUS)}
        />
      </main>
    </div>
  );
}

function RoleCard({ color, title, badge, description, onClick }) {
  // Decide which icon to show based on the title
  let iconClass = "role-icon-cross"; // default

  if (title === "Pengunjung") {
    iconClass = "role-icon-cross";
  } else if (title === "Pengguna") {
    iconClass = "role-icon-triangle";
  } else if (title === "Pengurus") {
    iconClass = "role-icon-circle";
  }

  return (
    <button className={`role-card role-${color}`} onClick={onClick}>
      <div className="role-icon-wrapper">
        <span className={`role-icon-shape ${iconClass}`} />
      </div>
      <div className="role-text">
        <div className="role-title-row">
          <h2 className="role-title">{title}</h2>
          <span className="role-badge">{badge}</span>
        </div>
        <p className="role-description">{description}</p>
        <span className="role-cta">Pilih &rarr;</span>
      </div>
    </button>
  );
}
