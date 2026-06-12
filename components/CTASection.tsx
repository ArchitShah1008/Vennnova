"use client";

export default function CTASection() {
  return (
    <section style={{
      background: "#0d0d14",
      padding: "80px 8vw 120px",
    }}>
      <div style={{
        background: "linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(155,143,255,0.08) 100%)",
        border: "1px solid rgba(108,99,255,0.25)",
        borderRadius: 24,
        padding: "80px 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Glow orbs */}
        <div style={{
          position: "absolute", top: -60, left: "20%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -60, right: "15%",
          width: 250, height: 250, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <h2 style={{
          fontSize: "clamp(28px, 4vw, 52px)",
          fontWeight: 800, color: "white",
          letterSpacing: "-0.03em", marginBottom: 18,
          position: "relative",
        }}>
          Ready to transform your clinic?
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.55)", fontSize: 17,
          maxWidth: 460, margin: "0 auto 40px",
          lineHeight: 1.65, position: "relative",
        }}>
          Join hundreds of clinics already running smarter with Vennova. Setup takes under 10 minutes.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", position: "relative" }}>
          <button style={{
            background: "linear-gradient(135deg, #6c63ff, #9b8fff)",
            border: "none", color: "white",
            padding: "14px 32px", borderRadius: 10,
            fontSize: 16, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 4px 30px rgba(108,99,255,0.5)",
          }}>
            Get started free
          </button>
          <button style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white", padding: "14px 32px",
            borderRadius: 10, fontSize: 16, cursor: "pointer",
          }}>
            Talk to sales
          </button>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginTop: 20, position: "relative" }}>
          No credit card required · Free 14-day trial · Cancel anytime
        </p>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 64, display: "flex", justifyContent: "space-between",
        alignItems: "center", opacity: 0.4,
        borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 40,
      }}>
        <span style={{ color: "white", fontSize: 14, fontWeight: 600 }}>Vennova</span>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>© 2026 Vennova. All rights reserved.</span>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Support"].map(l => (
            <a key={l} href="#" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
