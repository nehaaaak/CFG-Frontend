// "use client";
// import { motion, MotionProps } from "framer-motion";

// const float = (delay: number): MotionProps => ({
//   animate: { y: [0, -5, 0] },
//   transition: { duration: 3.5, delay, repeat: Infinity, ease: "easeInOut" },
// });

// /*
//   Node layout (top-left corner, width×height):
//   ENTRY   : top=0,   left=144  → 132×66  → bottom-center = (210, 66)
//   COND    : top=158, left=95   → 148×88
//               diamond points: top=(169,160) left=(97,202) right=(241,202) bottom=(169,246)
//   block_A : top=325, left=16   → 124×76  → top-center=(78,325)  bottom-center=(78,401)
//   block_B : top=325, left=210  → 124×76  → top-center=(272,325) bottom-center=(272,401)
//   RETURN  : top=472, left=114  → 132×66  → top-center=(180,472)
// */

// export default function IsoCFG() {
//   return (
//     <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-neutral-950">
//       {/* grid */}
//       <div
//         className="absolute inset-0"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(148,163,184,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.07) 1px,transparent 1px)",
//           backgroundSize: "28px 28px",
//         }}
//       />

//       {/* scene */}
//       <div className="relative" style={{ width: 420, height: 545 }}>
//         {/* ── edges (SVG layer, behind all nodes) ── */}
//         <svg
//           className="absolute inset-0 w-full h-full pointer-events-none"
//           viewBox="0 0 420 545"
//         >
//           <defs>
//             {/* arrowhead markers */}
//             <marker
//               id="arr-blue"
//               markerWidth="6"
//               markerHeight="6"
//               refX="5"
//               refY="3"
//               orient="auto"
//             >
//               <path d="M0,0 L6,3 L0,6 Z" fill="rgba(79,130,220,0.75)" />
//             </marker>
//             <marker
//               id="arr-green"
//               markerWidth="6"
//               markerHeight="6"
//               refX="5"
//               refY="3"
//               orient="auto"
//             >
//               <path d="M0,0 L6,3 L0,6 Z" fill="rgba(34,197,120,0.75)" />
//             </marker>
//             <marker
//               id="arr-orange"
//               markerWidth="6"
//               markerHeight="6"
//               refX="5"
//               refY="3"
//               orient="auto"
//             >
//               <path d="M0,0 L6,3 L0,6 Z" fill="rgba(234,100,60,0.75)" />
//             </marker>
//           </defs>

//           <style>{`
//             .e { fill:none; stroke-width:1.6; stroke-dasharray:6 5; animation:flow 2.4s linear infinite; }
//             .em  { stroke:rgba(79,130,220,0.75);  }
//             .et  { stroke:rgba(34,197,120,0.75);  animation-duration:2.8s; }
//             .ef  { stroke:rgba(234,100,60,0.75);  animation-duration:3.2s; }
//             .eo  { stroke:rgba(79,130,220,0.65);  animation-duration:3.6s; }
//             @keyframes flow { to { stroke-dashoffset:-22; } }
//           `}</style>

//           {/* ENTRY bottom-center (210,66) → COND diamond top (169,160) */}
//           <path
//             className="e em"
//             d="M210,66 C210,108 169,118 169,160"
//             markerEnd="url(#arr-blue)"
//           />

//           {/* COND left-point (97,202) → block_A top-center (78,325) */}
//           <path
//             className="e et"
//             d="M97,202 C72,255 78,285 78,325"
//             markerEnd="url(#arr-green)"
//           />

//           {/* COND right-point (241,202) → block_B top-center (272,325) */}
//           <path
//             className="e ef"
//             d="M241,202 C268,255 272,285 272,325"
//             markerEnd="url(#arr-orange)"
//           />

//           {/* block_A bottom-center (78,401) → RETURN top, left side (162,472) */}
//           <path
//             className="e eo"
//             d="M78,401 C78,438 145,458 162,472"
//             markerEnd="url(#arr-blue)"
//           />

//           {/* block_B bottom-center (272,401) → RETURN top, right side (198,472) */}
//           <path
//             className="e eo"
//             d="M272,401 C272,438 215,458 198,472"
//             markerEnd="url(#arr-blue)"
//           />
//         </svg>

//         {/* ── ENTRY ── */}
//         <motion.div
//           className="absolute"
//           style={{ top: 0, left: 144 }}
//           {...float(0)}
//         >
//           <svg width="132" height="66" viewBox="0 0 132 66">
//             <rect
//               x=".5"
//               y=".5"
//               width="131"
//               height="65"
//               rx="6"
//               fill="rgba(79,130,220,0.12)"
//               stroke="rgba(79,130,220,0.7)"
//               strokeWidth="1.4"
//             />
//             <rect
//               x="4"
//               y="4"
//               width="124"
//               height="10"
//               rx="2"
//               fill="rgba(79,130,220,0.22)"
//             />
//             <text
//               x="66"
//               y="46"
//               fontFamily="JetBrains Mono,monospace"
//               fontSize="13"
//               fill="rgba(59,110,210,1)"
//               className="dark:fill-[rgba(147,197,253,0.95)]"
//               textAnchor="middle"
//               letterSpacing="2"
//             >
//               ENTRY
//             </text>
//             <circle cx="116" cy="9" r="3" fill="rgba(34,197,120,0.85)" />
//           </svg>
//         </motion.div>

//         {/* ── COND ── */}
//         <motion.div
//           className="absolute"
//           style={{ top: 158, left: 95 }}
//           {...float(0.5)}
//         >
//           <svg width="148" height="88" viewBox="0 0 148 88">
//             <polygon
//               points="74,2 146,44 74,86 2,44"
//               fill="rgba(124,58,237,0.1)"
//               stroke="rgba(124,58,237,0.65)"
//               strokeWidth="1.4"
//             />
//             <text
//               x="74"
//               y="40"
//               fontFamily="JetBrains Mono,monospace"
//               fontSize="13"
//               fill="rgba(109,40,217,1)"
//               className="dark:fill-[rgba(196,181,253,0.95)]"
//               textAnchor="middle"
//             >
//               x &gt; 0
//             </text>
//             <text
//               x="74"
//               y="57"
//               fontFamily="JetBrains Mono,monospace"
//               fontSize="10"
//               fill="rgba(109,40,217,0.6)"
//               className="dark:fill-[rgba(196,181,253,0.55)]"
//               textAnchor="middle"
//             >
//               cond
//             </text>
//           </svg>
//         </motion.div>

//         {/* true / false labels */}
//         <span
//           className="absolute font-mono text-[11px] tracking-wide"
//           style={{ top: 268, left: 18, color: "rgba(22,163,74,0.9)" }}
//         >
//           true
//         </span>
//         <span
//           className="absolute font-mono text-[11px] tracking-wide"
//           style={{ top: 268, left: 248, color: "rgba(220,60,30,0.9)" }}
//         >
//           false
//         </span>

//         {/* ── block_A ── */}
//         <motion.div
//           className="absolute"
//           style={{ top: 325, left: 16 }}
//           {...float(1)}
//         >
//           <svg width="124" height="76" viewBox="0 0 124 76">
//             <rect
//               x=".5"
//               y=".5"
//               width="123"
//               height="75"
//               rx="5"
//               fill="rgba(22,163,74,0.09)"
//               stroke="rgba(22,163,74,0.6)"
//               strokeWidth="1.4"
//             />
//             <rect
//               x="6"
//               y="8"
//               width="72"
//               height="5"
//               rx="1.5"
//               fill="rgba(22,163,74,0.32)"
//             />
//             <rect
//               x="6"
//               y="18"
//               width="52"
//               height="5"
//               rx="1.5"
//               fill="rgba(22,163,74,0.22)"
//             />
//             <rect
//               x="6"
//               y="28"
//               width="64"
//               height="5"
//               rx="1.5"
//               fill="rgba(22,163,74,0.15)"
//             />
//             <text
//               x="62"
//               y="58"
//               fontFamily="JetBrains Mono,monospace"
//               fontSize="11"
//               fill="rgba(15,130,55,1)"
//               className="dark:fill-[rgba(110,231,183,0.9)]"
//               textAnchor="middle"
//             >
//               block_A
//             </text>
//           </svg>
//         </motion.div>

//         {/* ── block_B ── */}
//         <motion.div
//           className="absolute"
//           style={{ top: 325, left: 210 }}
//           {...float(0.75)}
//         >
//           <svg width="124" height="76" viewBox="0 0 124 76">
//             <rect
//               x=".5"
//               y=".5"
//               width="123"
//               height="75"
//               rx="5"
//               fill="rgba(220,60,30,0.08)"
//               stroke="rgba(220,80,40,0.6)"
//               strokeWidth="1.4"
//             />
//             <rect
//               x="6"
//               y="8"
//               width="72"
//               height="5"
//               rx="1.5"
//               fill="rgba(220,80,40,0.32)"
//             />
//             <rect
//               x="6"
//               y="18"
//               width="52"
//               height="5"
//               rx="1.5"
//               fill="rgba(220,80,40,0.22)"
//             />
//             <rect
//               x="6"
//               y="28"
//               width="64"
//               height="5"
//               rx="1.5"
//               fill="rgba(220,80,40,0.15)"
//             />
//             <text
//               x="62"
//               y="58"
//               fontFamily="JetBrains Mono,monospace"
//               fontSize="11"
//               fill="rgba(185,50,20,1)"
//               className="dark:fill-[rgba(251,146,110,0.9)]"
//               textAnchor="middle"
//             >
//               block_B
//             </text>
//           </svg>
//         </motion.div>

//         {/* ── RETURN ── */}
//         <motion.div
//           className="absolute"
//           style={{ top: 472, left: 114 }}
//           {...float(1.3)}
//         >
//           <svg width="132" height="66" viewBox="0 0 132 66">
//             <rect
//               x=".5"
//               y=".5"
//               width="131"
//               height="65"
//               rx="6"
//               fill="rgba(79,130,220,0.12)"
//               stroke="rgba(79,130,220,0.65)"
//               strokeWidth="1.4"
//             />
//             <rect
//               x="4"
//               y="4"
//               width="124"
//               height="10"
//               rx="2"
//               fill="rgba(79,130,220,0.22)"
//             />
//             <text
//               x="66"
//               y="46"
//               fontFamily="JetBrains Mono,monospace"
//               fontSize="13"
//               fill="rgba(59,110,210,1)"
//               className="dark:fill-[rgba(147,197,253,0.95)]"
//               textAnchor="middle"
//               letterSpacing="2"
//             >
//               RETURN
//             </text>
//           </svg>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// components/shared/iso-cfg.tsx
"use client";
import { motion, MotionProps } from "framer-motion";

const float = (delay: number): MotionProps => ({
  animate: { y: [0, -5, 0] },
  transition: { duration: 3.5, delay, repeat: Infinity, ease: "easeInOut" },
});

export default function IsoCFG() {
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
      <div className="relative" style={{ width: 420, height: 545 }}>
        {/* ── edges ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 420 545"
        >
          <defs>
            <marker
              id="arr-blue"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(79,130,220,0.75)" />
            </marker>
            <marker
              id="arr-green"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(34,197,120,0.75)" />
            </marker>
            <marker
              id="arr-orange"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(234,100,60,0.75)" />
            </marker>
          </defs>

          <style>{`
            .e { fill:none; stroke-width:1.6; stroke-dasharray:6 5; animation:flow 2.4s linear infinite; }
            .em  { stroke:rgba(79,130,220,0.75);  }
            .et  { stroke:rgba(34,197,120,0.75);  animation-duration:2.8s; }
            .ef  { stroke:rgba(234,100,60,0.75);  animation-duration:3.2s; }
            .eo  { stroke:rgba(79,130,220,0.65);  animation-duration:3.6s; }
            @keyframes flow { to { stroke-dashoffset:-22; } }
          `}</style>

          <path
            className="e em"
            d="M210,66 C210,108 169,118 169,160"
            markerEnd="url(#arr-blue)"
          />
          <path
            className="e et"
            d="M97,202 C72,255 78,285 78,325"
            markerEnd="url(#arr-green)"
          />
          <path
            className="e ef"
            d="M241,202 C268,255 272,285 272,325"
            markerEnd="url(#arr-orange)"
          />
          <path
            className="e eo"
            d="M78,401 C78,438 145,458 162,472"
            markerEnd="url(#arr-blue)"
          />
          <path
            className="e eo"
            d="M272,401 C272,438 215,458 198,472"
            markerEnd="url(#arr-blue)"
          />
        </svg>

        {/* ── ENTRY ── */}
        <motion.div
          className="absolute"
          style={{ top: 0, left: 144 }}
          {...float(0)}
        >
          <svg width="132" height="66" viewBox="0 0 132 66">
            <rect
              x=".5"
              y=".5"
              width="131"
              height="65"
              rx="6"
              fill="rgba(79,130,220,0.12)"
              stroke="rgba(79,130,220,0.7)"
              strokeWidth="1.4"
            />
            <rect
              x="4"
              y="4"
              width="124"
              height="10"
              rx="2"
              fill="rgba(79,130,220,0.22)"
            />
            <text
              x="66"
              y="46"
              fontFamily="JetBrains Mono,monospace"
              fontSize="13"
              fill="rgba(59,110,210,1)"
              className="dark:fill-[rgba(147,197,253,0.95)]"
              textAnchor="middle"
              letterSpacing="2"
            >
              ENTRY
            </text>
            <circle cx="116" cy="9" r="3" fill="rgba(34,197,120,0.85)" />
          </svg>
        </motion.div>

        {/* ── COND ── */}
        <motion.div
          className="absolute"
          style={{ top: 158, left: 95 }}
          {...float(0.5)}
        >
          <svg width="148" height="88" viewBox="0 0 148 88">
            <polygon
              points="74,2 146,44 74,86 2,44"
              fill="rgba(124,58,237,0.1)"
              stroke="rgba(124,58,237,0.65)"
              strokeWidth="1.4"
            />
            <text
              x="74"
              y="40"
              fontFamily="JetBrains Mono,monospace"
              fontSize="13"
              fill="rgba(109,40,217,1)"
              className="dark:fill-[rgba(196,181,253,0.95)]"
              textAnchor="middle"
            >
              x &gt; 0
            </text>
            <text
              x="74"
              y="57"
              fontFamily="JetBrains Mono,monospace"
              fontSize="10"
              fill="rgba(109,40,217,0.6)"
              className="dark:fill-[rgba(196,181,253,0.55)]"
              textAnchor="middle"
            >
              cond
            </text>
          </svg>
        </motion.div>

        {/* true / false labels — pushed outward away from edges */}
        <span
          className="absolute font-mono text-[11px] tracking-wide"
          style={{ top: 268, left: -2, color: "rgba(22,163,74,0.9)" }}
        >
          true
        </span>
        <span
          className="absolute font-mono text-[11px] tracking-wide"
          style={{ top: 268, left: 298, color: "rgba(220,60,30,0.9)" }}
        >
          false
        </span>

        {/* ── block_A ── */}
        <motion.div
          className="absolute"
          style={{ top: 325, left: 16 }}
          {...float(1)}
        >
          <svg width="124" height="76" viewBox="0 0 124 76">
            <rect
              x=".5"
              y=".5"
              width="123"
              height="75"
              rx="5"
              fill="rgba(22,163,74,0.09)"
              stroke="rgba(22,163,74,0.6)"
              strokeWidth="1.4"
            />
            <rect
              x="6"
              y="8"
              width="72"
              height="5"
              rx="1.5"
              fill="rgba(22,163,74,0.32)"
            />
            <rect
              x="6"
              y="18"
              width="52"
              height="5"
              rx="1.5"
              fill="rgba(22,163,74,0.22)"
            />
            <rect
              x="6"
              y="28"
              width="64"
              height="5"
              rx="1.5"
              fill="rgba(22,163,74,0.15)"
            />
            <text
              x="62"
              y="58"
              fontFamily="JetBrains Mono,monospace"
              fontSize="11"
              fill="rgba(15,130,55,1)"
              className="dark:fill-[rgba(110,231,183,0.9)]"
              textAnchor="middle"
            >
              block_A
            </text>
          </svg>
        </motion.div>

        {/* ── block_B ── */}
        <motion.div
          className="absolute"
          style={{ top: 325, left: 210 }}
          {...float(0.75)}
        >
          <svg width="124" height="76" viewBox="0 0 124 76">
            <rect
              x=".5"
              y=".5"
              width="123"
              height="75"
              rx="5"
              fill="rgba(220,60,30,0.08)"
              stroke="rgba(220,80,40,0.6)"
              strokeWidth="1.4"
            />
            <rect
              x="6"
              y="8"
              width="72"
              height="5"
              rx="1.5"
              fill="rgba(220,80,40,0.32)"
            />
            <rect
              x="6"
              y="18"
              width="52"
              height="5"
              rx="1.5"
              fill="rgba(220,80,40,0.22)"
            />
            <rect
              x="6"
              y="28"
              width="64"
              height="5"
              rx="1.5"
              fill="rgba(220,80,40,0.15)"
            />
            <text
              x="62"
              y="58"
              fontFamily="JetBrains Mono,monospace"
              fontSize="11"
              fill="rgba(185,50,20,1)"
              className="dark:fill-[rgba(251,146,110,0.9)]"
              textAnchor="middle"
            >
              block_B
            </text>
          </svg>
        </motion.div>

        {/* ── RETURN ── */}
        <motion.div
          className="absolute"
          style={{ top: 472, left: 114 }}
          {...float(1.3)}
        >
          <svg width="132" height="66" viewBox="0 0 132 66">
            <rect
              x=".5"
              y=".5"
              width="131"
              height="65"
              rx="6"
              fill="rgba(79,130,220,0.12)"
              stroke="rgba(79,130,220,0.65)"
              strokeWidth="1.4"
            />
            <rect
              x="4"
              y="4"
              width="124"
              height="10"
              rx="2"
              fill="rgba(79,130,220,0.22)"
            />
            <text
              x="66"
              y="46"
              fontFamily="JetBrains Mono,monospace"
              fontSize="13"
              fill="rgba(59,110,210,1)"
              className="dark:fill-[rgba(147,197,253,0.95)]"
              textAnchor="middle"
              letterSpacing="2"
            >
              RETURN
            </text>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
