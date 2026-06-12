"use client";

const features = [
  {
    icon: "🗓",
    title: "Smart Appointments",
    description: "AI-powered scheduling that reduces no-shows by 60%. Patients book in seconds, doctors stay organized.",
    color: "#6c63ff",
  },
  {
    icon: "👩‍⚕️",
    title: "Patient Management",
    description: "Complete patient profiles with medical history, prescriptions, and visit notes — always at your fingertips.",
    color: "#9b8fff",
  },
  {
    icon: "⚡",
    title: "Real-time Data Sync",
    description: "Every update — from lab results to billing — syncs instantly across your entire clinic network.",
    color: "#c084fc",
  },
  {
    icon: "🩺",
    title: "Doctor Dashboard",
    description: "A focused workspace for clinicians. Today's patients, pending reports, and quick actions — all in one view.",
    color: "#818cf8",
  },
  {
    icon: "💊",
    title: "Prescription Tools",
    description: "Digital prescriptions with drug interaction alerts. Send to pharmacies directly from the platform.",
    color: "#6c63ff",
  },
  {
    icon: "📊",
    title: "Analytics & Reports",
    description: "Understand your clinic's performance with beautiful dashboards. Revenue, throughput, patient trends.",
    color: "#9b8fff",
  },
];

export default function FeaturesSection() {
  return (
    <section style={{
      background: "#0d0d14",
      padding: "120px 8vw",
    }}>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(108,99,255,0.12)",
          border: "1px solid rgba(108,99,255,0.3)",
          borderRadius: 100, padding: "6px 16px", marginBottom: 20,
        }}>
          <span style={{ fontSize: 12, color: "#9b8fff", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Platform features
          </span>
        </div>
        <h2 style={{
          fontSize: "clamp(32px, 4vw, 56px)",
          fontWeight: 800, letterSpacing: "-0.03em",
          color: "white", marginBottom: 16,
        }}>
          Everything your clinic needs
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
          Built from the ground up for modern healthcare teams — from solo practices to multi-site hospital networks.
        </p>
      </div>

      {/* Feature grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 24,
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: "28px 28px 32px",
            transition: "border-color 0.3s, background 0.3s, transform 0.3s",
            cursor: "default",
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = `${f.color}40`;
              el.style.background = "rgba(255,255,255,0.06)";
              el.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "rgba(255,255,255,0.07)";
              el.style.background = "rgba(255,255,255,0.03)";
              el.style.transform = "translateY(0)";
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: `${f.color}20`,
              border: `1px solid ${f.color}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, marginBottom: 18,
            }}>
              {f.icon}
            </div>
            <h3 style={{ color: "white", fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>
              {f.title}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.65 }}>
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
