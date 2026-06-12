"use client";
import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 60;

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Preload all frames
  useEffect(() => {
    let count = 0;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(2, "0");
      img.src = `/frames/frame_${num}.png`;
      img.onload = () => {
        count++;
        setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) setLoaded(true);
      };
      imgs[i] = img;
    }
    imagesRef.current = imgs;
  }, []);

  // Draw frame to canvas
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (frame: number) => {
      const img = imagesRef.current[frame];
      if (!img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    draw(0);

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // section is 400vh tall; sticky area starts at top of viewport
      const scrolled = -rect.top;
      const total = section.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrolled / total, 0), 1);
      const frame = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);

      if (frame !== frameRef.current) {
        frameRef.current = frame;
        setCurrentFrame(frame);
        draw(frame);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded]);

  // Canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Redraw current frame on resize
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = imagesRef.current[frameRef.current];
      if (img) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Text phases based on frame
  const phase = currentFrame < 15
    ? "intro"
    : currentFrame < 35
    ? "network"
    : "features";

  const heroText = {
    intro: {
      label: "All-in-one clinic OS",
      heading: "Run your clinic\nsmarter",
      sub: "Vennova connects every part of your practice — appointments, records, billing — in one beautiful platform.",
    },
    network: {
      label: "Real-time connections",
      heading: "Everything\nconnected",
      sub: "Watch your clinic's ecosystem come alive. Doctors, patients, records, and appointments — all linked seamlessly.",
    },
    features: {
      label: "Powerful features",
      heading: "Built for modern\nhealthcare",
      sub: "Smart appointments. Patient management. Real-time sync. The tools your clinic needs to thrive.",
    },
  }[phase];

  return (
    <>
      {/* Loading screen */}
      {!loaded && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "#0d0d14",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 24,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "linear-gradient(135deg, #6c63ff, #9b8fff)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, fontWeight: 800, color: "white",
            boxShadow: "0 0 40px rgba(108,99,255,0.5)",
          }}>V</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "white", fontSize: 16, marginBottom: 16, opacity: 0.7 }}>
              Loading Vennova…
            </div>
            <div style={{ width: 200, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
              <div style={{
                height: "100%", borderRadius: 2,
                background: "linear-gradient(90deg, #6c63ff, #9b8fff)",
                width: `${loadProgress}%`,
                transition: "width 0.1s ease",
              }} />
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 8 }}>
              {loadProgress}%
            </div>
          </div>
        </div>
      )}

      {/* Scrollytelling container — 400vh for scroll room */}
      <div ref={sectionRef} style={{ height: "400vh", position: "relative" }}>
        {/* Sticky viewport */}
        <div style={{
          position: "sticky", top: 0,
          height: "100vh", overflow: "hidden",
          background: "#0d0d14",
        }}>
          {/* Canvas — the frame sequence */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />

          {/* Gradient overlay — top */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 180,
            background: "linear-gradient(to bottom, rgba(13,13,20,0.9) 0%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* Gradient overlay — bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
            background: "linear-gradient(to top, rgba(13,13,20,1) 0%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* Left side gradient */}
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: "30%",
            background: "linear-gradient(to right, rgba(13,13,20,0.7) 0%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* Hero text overlay */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center",
            padding: "0 8vw",
            pointerEvents: "none",
          }}>
            <div style={{
              maxWidth: 520,
              transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
            }}>
              {/* Label pill */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(108,99,255,0.15)",
                border: "1px solid rgba(108,99,255,0.35)",
                borderRadius: 100, padding: "6px 14px",
                marginBottom: 20,
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#6c63ff",
                  boxShadow: "0 0 8px #6c63ff",
                  animation: "pulse 2s infinite",
                }} />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {heroText.label}
                </span>
              </div>

              {/* Heading */}
              <h1 style={{
                fontSize: "clamp(40px, 5.5vw, 72px)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "white",
                marginBottom: 20,
                whiteSpace: "pre-line",
                textShadow: "0 2px 40px rgba(0,0,0,0.4)",
              }}>
                {heroText.heading}
              </h1>

              {/* Subtext */}
              <p style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.65,
                marginBottom: 36,
                maxWidth: 420,
              }}>
                {heroText.sub}
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 12, pointerEvents: "all" }}>
                <button style={{
                  background: "linear-gradient(135deg, #6c63ff, #9b8fff)",
                  border: "none", color: "white",
                  padding: "13px 28px", borderRadius: 10,
                  fontSize: 15, fontWeight: 600, cursor: "pointer",
                  boxShadow: "0 4px 30px rgba(108,99,255,0.5)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 40px rgba(108,99,255,0.6)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 30px rgba(108,99,255,0.5)";
                  }}
                >
                  Start for free
                </button>
                <button style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white", padding: "13px 28px",
                  borderRadius: 10, fontSize: 15, cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
                >
                  Watch demo
                </button>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          {currentFrame < 3 && (
            <div style={{
              position: "absolute", bottom: 36, left: "50%",
              transform: "translateX(-50%)",
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 8,
              animation: "fadeInUp 1s ease 1s both",
            }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Scroll to explore
              </span>
              <div style={{
                width: 24, height: 38,
                border: "1.5px solid rgba(255,255,255,0.2)",
                borderRadius: 12,
                display: "flex", alignItems: "flex-start",
                justifyContent: "center", padding: "5px 0",
              }}>
                <div style={{
                  width: 4, height: 8, borderRadius: 2,
                  background: "rgba(255,255,255,0.5)",
                  animation: "scrollDot 1.5s ease infinite",
                }} />
              </div>
            </div>
          )}

          {/* Frame progress bar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 2, background: "rgba(255,255,255,0.05)",
          }}>
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg, #6c63ff, #9b8fff)",
              width: `${(currentFrame / (TOTAL_FRAMES - 1)) * 100}%`,
              transition: "width 0.05s linear",
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(14px); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  );
}
