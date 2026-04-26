// components/shared/iso-features.tsx
"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

const FEATURES = [
  {
    label: "CFG Visualization",
    sub: "Control flow mapping",
    color: {
      stroke: "rgba(79,130,220,0.7)",
      fill: "rgba(79,130,220,0.12)",
      bar: "rgba(79,130,220,0.22)",
      text: "rgba(59,110,210,1)",
      textDark: "rgba(147,197,253,0.95)",
      icon: "rgba(79,130,220,0.6)",
      iconFill: "rgba(79,130,220,0.15)",
    },
    icon: "cfg",
  },
  {
    label: "Code Analysis",
    sub: "Deep static inspection",
    color: {
      stroke: "rgba(124,58,237,0.65)",
      fill: "rgba(124,58,237,0.1)",
      bar: "rgba(124,58,237,0.2)",
      text: "rgba(109,40,217,1)",
      textDark: "rgba(196,181,253,0.95)",
      icon: "rgba(124,58,237,0.55)",
      iconFill: "rgba(124,58,237,0.14)",
    },
    icon: "analysis",
  },
  {
    label: "AI Explanations",
    sub: "Natural language insights",
    color: {
      stroke: "rgba(22,163,74,0.6)",
      fill: "rgba(22,163,74,0.09)",
      bar: "rgba(22,163,74,0.2)",
      text: "rgba(15,130,55,1)",
      textDark: "rgba(110,231,183,0.9)",
      icon: "rgba(22,163,74,0.55)",
      iconFill: "rgba(22,163,74,0.12)",
    },
    icon: "ai",
  },
  {
    label: "Code Optimization",
    sub: "Performance improvements",
    color: {
      stroke: "rgba(220,80,40,0.6)",
      fill: "rgba(220,80,40,0.08)",
      bar: "rgba(220,80,40,0.2)",
      text: "rgba(185,50,20,1)",
      textDark: "rgba(251,146,110,0.9)",
      icon: "rgba(220,80,40,0.55)",
      iconFill: "rgba(220,80,40,0.12)",
    },
    icon: "optim",
  },
];

// Icon per feature
function FeatureIcon({
  type,
  color,
}: {
  type: string;
  color: (typeof FEATURES)[0]["color"];
}) {
  if (type === "cfg")
    return (
      <g>
        <rect
          x="8"
          y="8"
          width="12"
          height="8"
          rx="2"
          fill={color.iconFill}
          stroke={color.icon}
          strokeWidth="1"
        />
        <rect
          x="2"
          y="30"
          width="12"
          height="8"
          rx="2"
          fill={color.iconFill}
          stroke={color.icon}
          strokeWidth="1"
        />
        <rect
          x="22"
          y="30"
          width="12"
          height="8"
          rx="2"
          fill={color.iconFill}
          stroke={color.icon}
          strokeWidth="1"
        />
        <line
          x1="14"
          y1="16"
          x2="8"
          y2="30"
          stroke={color.icon}
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <line
          x1="18"
          y1="16"
          x2="28"
          y2="30"
          stroke={color.icon}
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      </g>
    );
  if (type === "analysis")
    return (
      <g>
        <rect
          x="4"
          y="8"
          width="28"
          height="3"
          rx="1"
          fill={color.icon}
          opacity={0.7}
        />
        <rect
          x="4"
          y="14"
          width="20"
          height="3"
          rx="1"
          fill={color.icon}
          opacity={0.5}
        />
        <rect
          x="4"
          y="20"
          width="24"
          height="3"
          rx="1"
          fill={color.icon}
          opacity={0.4}
        />
        <rect
          x="4"
          y="26"
          width="14"
          height="3"
          rx="1"
          fill={color.icon}
          opacity={0.3}
        />
        <circle
          cx="26"
          cy="33"
          r="7"
          fill="none"
          stroke={color.icon}
          strokeWidth="1.3"
        />
        <line
          x1="31"
          y1="38"
          x2="36"
          y2="44"
          stroke={color.icon}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
    );
  if (type === "ai")
    return (
      <g>
        <rect
          x="4"
          y="6"
          width="32"
          height="22"
          rx="4"
          fill={color.iconFill}
          stroke={color.icon}
          strokeWidth="1.1"
        />
        <rect
          x="9"
          y="12"
          width="18"
          height="2.5"
          rx="1"
          fill={color.icon}
          opacity={0.7}
        />
        <rect
          x="9"
          y="17"
          width="22"
          height="2.5"
          rx="1"
          fill={color.icon}
          opacity={0.5}
        />
        <path
          d="M10,28 L6,36 L18,28"
          fill={color.iconFill}
          stroke={color.icon}
          strokeWidth="1"
        />
        <circle cx="28" cy="36" r="2.5" fill={color.icon} opacity={0.7} />
        <circle cx="34" cy="32" r="1.8" fill={color.icon} opacity={0.45} />
        <circle cx="22" cy="38" r="1.2" fill={color.icon} opacity={0.3} />
      </g>
    );
  // optim
  return (
    <g>
      <rect
        x="4"
        y="30"
        width="7"
        height="14"
        rx="1.5"
        fill={color.icon}
        opacity={0.3}
      />
      <rect
        x="13"
        y="22"
        width="7"
        height="22"
        rx="1.5"
        fill={color.icon}
        opacity={0.45}
      />
      <rect
        x="22"
        y="14"
        width="7"
        height="30"
        rx="1.5"
        fill={color.icon}
        opacity={0.6}
      />
      <path
        d="M32,10 L27,22 L31,22 L26,40 L40,18 L35,18 Z"
        fill={color.icon}
        opacity={0.75}
      />
    </g>
  );
}

const BOX_W = 320;
const BOX_H = 64;
const GAP = 22;
const TOTAL = FEATURES.length;

// Arrow y positions: center of each box
const boxY = (i: number) => i * (BOX_H + GAP) + BOX_H / 2;

export default function IsoFeatures() {
  const [active, setActive] = useState(-1); // which box is "clicked"
  const arrowControls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        for (let i = 0; i < TOTAL; i++) {
          if (cancelled) return;

          // Move arrow to box i (fast slide)
          await arrowControls.start({
            y: boxY(i),
            transition: { duration: 0.45, ease: "easeInOut" },
          });

          if (cancelled) return;

          // "Click" — highlight box
          setActive(i);
          await new Promise((r) => setTimeout(r, 700));
          setActive(-1);
          await new Promise((r) => setTimeout(r, 180));
        }
        // Pause before looping
        await new Promise((r) => setTimeout(r, 600));
      }
    };

    // Init arrow off-screen top
    arrowControls.set({ y: boxY(0) });
    run();
    return () => {
      cancelled = true;
    };
  }, [arrowControls]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-neutral-950">
      {/* grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.07) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* scene */}
      <div
        className="relative flex"
        style={{
          width: BOX_W + 56,
          height: TOTAL * BOX_H + (TOTAL - 1) * GAP,
        }}
      >
        {/* ── animated cursor arrow ── */}
        <motion.div
          animate={arrowControls}
          className="absolute"
          style={{ left: -2, top: 0, translateY: "-50%", zIndex: 10 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28">
            {/* pointer cursor shape */}
            <path
              d="M6,4 L6,20 L10,16 L13,23 L15,22 L12,15 L17,15 Z"
              fill="rgba(79,130,220,0.9)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* ── feature boxes ── */}
        <div
          className="flex flex-col absolute"
          style={{ left: 32, top: 0, gap: GAP }}
        >
          {FEATURES.map((f, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={f.label}
                animate={
                  isActive
                    ? {
                        scale: 1.035,
                        transition: { duration: 0.15, ease: "easeOut" },
                      }
                    : {
                        scale: 1,
                        transition: { duration: 0.2, ease: "easeOut" },
                      }
                }
                style={{ originX: 0.5, originY: 0.5 }}
              >
                <svg
                  width={BOX_W}
                  height={BOX_H}
                  viewBox={`0 0 ${BOX_W} ${BOX_H}`}
                  style={{ display: "block" }}
                >
                  {/* box bg */}
                  <rect
                    x=".5"
                    y=".5"
                    width={BOX_W - 1}
                    height={BOX_H - 1}
                    rx="6"
                    fill={
                      isActive
                        ? f.color.fill.replace(/[\d.]+\)$/, "0.22)")
                        : f.color.fill
                    }
                    stroke={f.color.stroke}
                    strokeWidth={isActive ? "1.8" : "1.4"}
                  />
                  {/* top bar */}
                  <rect
                    x="4"
                    y="4"
                    width={BOX_W - 8}
                    height="9"
                    rx="2"
                    fill={f.color.bar}
                  />

                  {/* icon area (left 60px) */}
                  <g transform="translate(8, 10)">
                    <FeatureIcon type={f.icon} color={f.color} />
                  </g>

                  {/* divider */}
                  <line
                    x1="68"
                    y1="16"
                    x2="68"
                    y2={BOX_H - 8}
                    stroke={f.color.stroke}
                    strokeWidth="0.8"
                    opacity="0.4"
                  />

                  {/* label */}
                  <text
                    x="84"
                    y="34"
                    fontFamily="JetBrains Mono,monospace"
                    fontSize="11.5"
                    fontWeight="600"
                    fill={f.color.text}
                    dominantBaseline="middle"
                  >
                    {f.label}
                  </text>
                  {/* sublabel */}
                  <text
                    x="84"
                    y="50"
                    fontFamily="JetBrains Mono,monospace"
                    fontSize="8.5"
                    fill={f.color.text}
                    opacity="0.55"
                    dominantBaseline="middle"
                  >
                    {f.sub}
                  </text>

                  {/* active glow ring */}
                  {isActive && (
                    <rect
                      x=".5"
                      y=".5"
                      width={BOX_W - 1}
                      height={BOX_H - 1}
                      rx="6"
                      fill="none"
                      stroke={f.color.stroke}
                      strokeWidth="3"
                      opacity="0.35"
                    />
                  )}
                </svg>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
