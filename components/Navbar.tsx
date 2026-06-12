"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "18px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled ? "rgba(13,13,20,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(108,99,255,0.15)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6c63ff, #9b8fff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: "white",
        }}>V</div>
        <span style={{ fontSize: 18, fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>
          Vennova
        </span>
      </div>

      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {["Features", "Solutions", "Pricing", "Docs"].map(link => (
          <a key={link} href="#" style={{
            color: "rgba(255,255,255,0.65)", fontSize: 14,
            textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
          >
            {link}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button style={{
          background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
          color: "white", padding: "8px 20px", borderRadius: 8,
          fontSize: 14, cursor: "pointer", transition: "border-color 0.2s",
        }}>
          Sign in
        </button>
        <button style={{
          background: "linear-gradient(135deg, #6c63ff, #9b8fff)",
          border: "none", color: "white", padding: "9px 22px",
          borderRadius: 8, fontSize: 14, cursor: "pointer",
          fontWeight: 600, boxShadow: "0 4px 20px rgba(108,99,255,0.4)",
        }}>
          Get started
        </button>
      </div>
    </nav>
  );
}
