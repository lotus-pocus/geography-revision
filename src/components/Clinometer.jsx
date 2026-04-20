import { useState, useEffect, useRef } from "react";

const ROUND1_QUESTIONS = [
  {
    id: "r1q1",
    scene: "You are standing on a beach. Your partner holds a ranging pole 10 metres away up the slope. You look through the clinometer and see the needle pointing to...",
    angle: 12,
    question: "What angle does the clinometer read?",
    answer: 12,
    unit: "°",
    hint: "The clinometer shows the angle between horizontal and the line of sight. Read the number the needle points to on the scale.",
    explanation: "The clinometer needle reads 12°. This is the angle of the slope - the beach rises 12 degrees from horizontal over that 10m distance.",
  },
  {
    id: "r1q2",
    scene: "You move to a steeper part of the beach near the cliff base. Your partner is 10 metres upslope. You look through the clinometer...",
    angle: 28,
    question: "What angle does the clinometer read?",
    answer: 28,
    unit: "°",
    hint: "Look at where the needle rests on the scale. The scale goes from 0° (flat) to 90° (vertical cliff).",
    explanation: "The clinometer reads 28°. This is a much steeper slope - nearly a third of the way to vertical. You'd notice this is much harder to walk up!",
  },
  {
    id: "r1q3",
    scene: "You measure the upper beach where waves rarely reach. The slope is very gentle. Your partner stands 10 metres away...",
    angle: 5,
    question: "What angle does the clinometer read?",
    answer: 5,
    unit: "°",
    hint: "Gentle slopes give small angles. A completely flat surface would read 0°.",
    explanation: "The clinometer reads just 5°. This is a very gentle gradient - typical of the upper beach where wave energy is low and sediment is fine.",
  },
  {
    id: "r1q4",
    scene: "You are measuring the swash zone - the part of the beach where waves run up. This area is often steep. You look through the clinometer...",
    angle: 18,
    question: "What angle does the clinometer read?",
    answer: 18,
    unit: "°",
    hint: "The needle hangs vertically under gravity. You read the angle where it crosses the scale.",
    explanation: "18° - a moderate slope. The swash zone is typically steeper because larger sediment (shingle/pebbles) is deposited there by powerful waves.",
  },
  {
    id: "r1q5",
    scene: "You measure the backshore - the top of the beach profile, above the high tide mark. This area is nearly flat...",
    angle: 3,
    question: "What angle does the clinometer read?",
    answer: 3,
    unit: "°",
    hint: "Very flat surfaces give angles close to 0°. Even 1° or 2° is a noticeable slope in reality.",
    explanation: "Only 3°! The backshore is nearly flat - it's rarely reached by waves, so there's little energy to build a steep profile here.",
  },
];

const ROUND2_QUESTIONS = [
  {
    id: "r2q1",
    angle: 12,
    distance: 10,
    question: "The beach slope is 12° and your transect interval is 10m. Using tan(angle) × distance, calculate the height gained.",
    tanValue: 0.2126,
    answer: 2.1,
    unit: "m",
    hint: "Formula: height = tan(angle°) × horizontal distance. tan(12°) = 0.2126. Multiply this by 10.",
    explanation: "Height = tan(12°) × 10 = 0.2126 × 10 = 2.13m ≈ 2.1m. So for every 10 metres along the beach, you rise 2.1 metres in height.",
    worked: "tan(12°) = 0.2126 → 0.2126 × 10m = 2.1m",
  },
  {
    id: "r2q2",
    angle: 28,
    distance: 10,
    question: "The steep cliff-base section reads 28° over 10m. Calculate the height gained.",
    tanValue: 0.5317,
    answer: 5.3,
    unit: "m",
    hint: "Formula: height = tan(angle°) × horizontal distance. tan(28°) = 0.5317. Multiply by 10.",
    explanation: "Height = tan(28°) × 10 = 0.5317 × 10 = 5.317m ≈ 5.3m. This steep section gains over 5 metres in just 10 horizontal metres!",
    worked: "tan(28°) = 0.5317 → 0.5317 × 10m = 5.3m",
  },
  {
    id: "r2q3",
    angle: 5,
    distance: 10,
    question: "The gentle upper beach reads 5° over 10m. Calculate the height gained.",
    tanValue: 0.0875,
    answer: 0.9,
    unit: "m",
    hint: "Formula: height = tan(angle°) × horizontal distance. tan(5°) = 0.0875. Multiply by 10.",
    explanation: "Height = tan(5°) × 10 = 0.0875 × 10 = 0.875m ≈ 0.9m. Very gentle - less than 1 metre gained over 10 metres horizontally.",
    worked: "tan(5°) = 0.0875 → 0.0875 × 10m = 0.9m",
  },
  {
    id: "r2q4",
    angle: 18,
    distance: 10,
    question: "The swash zone reads 18° over 10m. Calculate the height gained.",
    tanValue: 0.3249,
    answer: 3.2,
    unit: "m",
    hint: "Formula: height = tan(angle°) × horizontal distance. tan(18°) = 0.3249. Multiply by 10.",
    explanation: "Height = tan(18°) × 10 = 0.3249 × 10 = 3.249m ≈ 3.2m. A moderate rise - typical of the energetic swash zone where coarser sediment builds steeper profiles.",
    worked: "tan(18°) = 0.3249 → 0.3249 × 10m = 3.2m",
  },
  {
    id: "r2q5",
    angle: 22,
    distance: 10,
    question: "A section near groynes reads 22° over 10m. Calculate the height gained.",
    tanValue: 0.4040,
    answer: 4.0,
    unit: "m",
    hint: "Formula: height = tan(angle°) × horizontal distance. tan(22°) = 0.4040. Multiply by 10.",
    explanation: "Height = tan(22°) × 10 = 0.4040 × 10 = 4.04m ≈ 4.0m. Beaches trapped by groynes often build up steep profiles as sediment accumulates on the updrift side.",
    worked: "tan(22°) = 0.4040 → 0.4040 × 10m = 4.0m",
  },
];

const ROUND3_QUESTIONS = [
  {
    id: "r3q1",
    readings: [
      { site: 1, angle: 5, distance: 10 },
      { site: 2, angle: 12, distance: 10 },
      { site: 3, angle: 28, distance: 10 },
      { site: 4, angle: 8, distance: 10 },
    ],
    tans: [0.0875, 0.2126, 0.5317, 0.1405],
    heights: [0.9, 2.1, 5.3, 1.4],
    totalHeight: 9.7,
    question: "You have taken 4 readings along a beach transect. Calculate the total height gained from the sea to the back of the beach.",
    hint: "Calculate height for each site (tan × 10m), then add them all together. The total is the full height of the beach profile.",
    explanation: "Each section: 0.9 + 2.1 + 5.3 + 1.4 = 9.7m total height. This is the complete vertical rise of the beach from sea to back.",
    answer: 9.7,
    unit: "m",
  },
  {
    id: "r3q2",
    readings: [
      { site: 1, angle: 3, distance: 10 },
      { site: 2, angle: 8, distance: 10 },
      { site: 3, angle: 18, distance: 10 },
      { site: 4, angle: 22, distance: 10 },
    ],
    tans: [0.0524, 0.1405, 0.3249, 0.4040],
    heights: [0.5, 1.4, 3.2, 4.0],
    totalHeight: 9.1,
    question: "Calculate the total height gained across all 4 transect sites.",
    hint: "Work out each height separately using tan × 10, then sum them all.",
    explanation: "0.5 + 1.4 + 3.2 + 4.0 = 9.1m total rise. Notice how the beach gets progressively steeper moving inland - common on shingle beaches.",
    answer: 9.1,
    unit: "m",
  },
  {
    id: "r3q3",
    readings: [
      { site: 1, angle: 12, distance: 10 },
      { site: 2, angle: 5, distance: 10 },
      { site: 3, angle: 3, distance: 10 },
      { site: 4, angle: 8, distance: 10 },
    ],
    tans: [0.2126, 0.0875, 0.0524, 0.1405],
    heights: [2.1, 0.9, 0.5, 1.4],
    totalHeight: 4.9,
    question: "This beach has a steeper lower section and gentler upper section. Calculate the total height gained.",
    hint: "Calculate each height, then add. Remember: height = tan(angle°) × 10m for each reading.",
    explanation: "2.1 + 0.9 + 0.5 + 1.4 = 4.9m. This profile shape (steeper near the sea, gentler at the top) is typical of a constructive beach with gentler waves.",
    answer: 4.9,
    unit: "m",
  },
  {
    id: "r3q4",
    readings: [
      { site: 1, angle: 18, distance: 10 },
      { site: 2, angle: 22, distance: 10 },
      { site: 3, angle: 28, distance: 10 },
      { site: 4, angle: 12, distance: 10 },
    ],
    tans: [0.3249, 0.4040, 0.5317, 0.2126],
    heights: [3.2, 4.0, 5.3, 2.1],
    totalHeight: 14.6,
    question: "A high-energy beach near a cliff. Calculate the total height gained across all 4 sites.",
    hint: "This beach is steep throughout - all angles are relatively large. Height = tan × 10 for each, then total them up.",
    explanation: "3.2 + 4.0 + 5.3 + 2.1 = 14.6m - a very tall beach profile! High-energy destructive waves pile coarse sediment into steep beach profiles.",
    answer: 14.6,
    unit: "m",
  },
  {
    id: "r3q5",
    readings: [
      { site: 1, angle: 5, distance: 10 },
      { site: 2, angle: 5, distance: 10 },
      { site: 3, angle: 5, distance: 10 },
      { site: 4, angle: 5, distance: 10 },
    ],
    tans: [0.0875, 0.0875, 0.0875, 0.0875],
    heights: [0.9, 0.9, 0.9, 0.9],
    totalHeight: 3.5,
    question: "A very uniform, gently sloping beach. All readings are the same. Calculate the total height gained.",
    hint: "When all angles are the same, you can multiply one height by the number of sites - or just add them. Both give the same answer.",
    explanation: "0.9 × 4 = 3.5m. A uniform beach like this is rare in nature but helps illustrate the calculation clearly. In practice, most beaches show variation between sites.",
    answer: 3.5,
    unit: "m",
  },
];

function ClinometerDiagram({ angle, showLabel = true }) {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 65;
  const rad = (angle * Math.PI) / 180;
  const needleX = cx + r * Math.sin(rad);
  const needleY = cy - r * Math.cos(rad);

  const ticks = [];
  for (let a = -90; a <= 90; a += 10) {
    const ar = (a * Math.PI) / 180;
    const x1 = cx + (r - 8) * Math.sin(ar);
    const y1 = cy - (r - 8) * Math.cos(ar);
    const x2 = cx + r * Math.sin(ar);
    const y2 = cy - r * Math.cos(ar);
    const lx = cx + (r + 14) * Math.sin(ar);
    const ly = cy - (r + 14) * Math.cos(ar);
    ticks.push({ x1, y1, x2, y2, lx, ly, label: Math.abs(a) });
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d1d5db" strokeWidth="1" />
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="#f3f4f6" />
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#374151" strokeWidth="1" />
          <text x={t.lx} y={t.ly + 4} textAnchor="middle" fontSize="7" fill="#6b7280">{t.label}</text>
        </g>
      ))}
      <line x1={cx} y1={cy} x2={cx} y2={cy - r + 5} stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="2,2" />
      <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke="#D85A30" strokeWidth="2" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={4} fill="#D85A30" />
      {showLabel && (
        <text x={cx} y={cy + 20} textAnchor="middle" fontSize="11" fontWeight="500" fill="#1a1a2e">{angle}°</text>
      )}
    </svg>
  );
}

function BeachProfile({ readings, tans }) {
  const w = 320;
  const h = 120;
  const pad = 30;
  const n = readings.length;
  const xStep = (w - pad * 2) / n;

  let points = [[pad, h - pad]];
  let cumX = pad;
  let cumY = h - pad;

  readings.forEach((r, i) => {
    const heightGain = (tans[i] * r.distance * (h - pad * 2)) / 20;
    cumX += xStep;
    cumY -= heightGain;
    points.push([cumX, Math.max(pad, cumY)]);
  });

  const polyline = points.map(p => p.join(",")).join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", maxWidth: w }}>
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#d1d5db" strokeWidth="0.5" />
      <text x={pad} y={h - 8} fontSize="9" fill="#6b7280">Sea</text>
      <text x={w - pad - 20} y={h - 8} fontSize="9" fill="#6b7280">Back</text>
      <polyline points={polyline} fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#1D9E75" />
      ))}
      {readings.map((r, i) => (
        <text key={i} x={pad + (i + 0.5) * xStep} y={h - 15} fontSize="8" textAnchor="middle" fill="#9ca3af">S{i + 1}</text>
      ))}
    </svg>
  );
}

function StepItem({ n, text }) {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
      <span style={{ background: "#1D9E75", color: "#fff", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "500", flexShrink: 0, marginTop: "1px" }}>{n}</span>
      <p style={{ fontSize: "13px", color: "#065f46", margin: 0, lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

function StepByStep({ label, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", padding: "8px 12px", background: "#f0fdf4", border: "0.5px solid #a7f3d0", borderRadius: open ? "8px 8px 0 0" : "8px", fontSize: "13px", color: "#065f46", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "500" }}>
        <span>{label}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ background: "#f0fdf4", border: "0.5px solid #a7f3d0", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "12px 14px" }}>
          {content}
        </div>
      )}
    </div>
  );
}

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [fresh, setFresh] = useState(true);
  const [open, setOpen] = useState(false);

  const press = (val) => {
    if (fresh) {
      setDisplay(val === "." ? "0." : val);
      setFresh(false);
    } else {
      if (val === "." && display.includes(".")) return;
      setDisplay(display === "0" && val !== "." ? val : display + val);
    }
  };

  const pressOp = (nextOp) => {
    setPrev(parseFloat(display));
    setOp(nextOp);
    setFresh(true);
  };

  const equals = () => {
    if (op === null || prev === null) return;
    const curr = parseFloat(display);
    let result;
    if (op === "+") result = prev + curr;
    else if (op === "-") result = prev - curr;
    else if (op === "x") result = prev * curr;
    else if (op === "/") result = curr !== 0 ? prev / curr : "Error";
    const rounded = typeof result === "number" ? parseFloat(result.toFixed(4)) : result;
    setDisplay(String(rounded));
    setPrev(null);
    setOp(null);
    setFresh(true);
  };

  const clear = () => { setDisplay("0"); setPrev(null); setOp(null); setFresh(true); };

  const btn = (label, onClick, bg = "#ffffff", color = "#1a1a2e") => (
    <button key={label} onClick={onClick} style={{ background: bg, color, border: "0.5px solid #e5e7eb", borderRadius: "6px", padding: "10px 0", fontSize: "15px", fontWeight: "500", cursor: "pointer", textAlign: "center" }}>
      {label}
    </button>
  );

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", padding: "8px 12px", background: "#f3f4f6", border: "0.5px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", color: "#6b7280", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>Calculator</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ border: "0.5px solid #e5e7eb", borderRadius: "0 0 8px 8px", padding: "10px", background: "#f9fafb" }}>
          <div style={{ background: "#1a1a2e", color: "#ffffff", borderRadius: "6px", padding: "10px 12px", marginBottom: "8px", fontSize: "20px", fontWeight: "500", textAlign: "right", fontFamily: "monospace", minHeight: "44px" }}>
            {op && <span style={{ fontSize: "12px", color: "#9ca3af", marginRight: "8px" }}>{prev} {op}</span>}
            {display}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
            {btn("C", clear, "#fef2f2", "#991b1b")}
            {btn("+/-", () => setDisplay(d => String(-parseFloat(d))), "#f3f4f6", "#374151")}
            {btn("%", () => setDisplay(d => String(parseFloat(d) / 100)), "#f3f4f6", "#374151")}
            {btn("/", () => pressOp("/"), "#185FA5", "#ffffff")}
            {btn("7", () => press("7"))}
            {btn("8", () => press("8"))}
            {btn("9", () => press("9"))}
            {btn("x", () => pressOp("x"), "#185FA5", "#ffffff")}
            {btn("4", () => press("4"))}
            {btn("5", () => press("5"))}
            {btn("6", () => press("6"))}
            {btn("-", () => pressOp("-"), "#185FA5", "#ffffff")}
            {btn("1", () => press("1"))}
            {btn("2", () => press("2"))}
            {btn("3", () => press("3"))}
            {btn("+", () => pressOp("+"), "#185FA5", "#ffffff")}
            <button onClick={() => press("0")} style={{ gridColumn: "span 2", background: "#ffffff", color: "#1a1a2e", border: "0.5px solid #e5e7eb", borderRadius: "6px", padding: "10px 0", fontSize: "15px", fontWeight: "500", cursor: "pointer", textAlign: "center" }}>0</button>
            {btn(".", () => press("."))}
            {btn("=", equals, "#1D9E75", "#ffffff")}
          </div>
        </div>
      )}
    </div>
  );
}

function Round1({ question, isPractice, onComplete }) {
  const [showHint, setShowHint] = useState(isPractice);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplainer, setShowExplainer] = useState(isPractice);

  const options = [
    question.angle - 8,
    question.angle - 4,
    question.angle,
    question.angle + 4,
    question.angle + 8,
  ].sort(() => Math.random() - 0.5).slice(0, 4).sort((a, b) => a - b);

  if (!options.includes(question.angle)) options[Math.floor(Math.random() * 4)] = question.angle;
  const sortedOptions = [...new Set(options)].sort((a, b) => a - b);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    setShowHint(true);
  };

  return (
    <div>
      {isPractice && (
        <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "10px 14px", marginBottom: "1rem", fontSize: "13px", color: "#1d4ed8" }}>
          Practice question - hints are shown. Read through carefully before attempting on your own.
        </div>
      )}
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "1rem", lineHeight: 1.6 }}>{question.scene}</p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <ClinometerDiagram angle={question.angle} showLabel={isPractice} />
      </div>

      {showExplainer && isPractice && (
        <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "12px", marginBottom: "1rem", fontSize: "13px" }}>
          <p style={{ fontWeight: "500", marginBottom: "8px", fontSize: "13px" }}>How to read a clinometer:</p>
          <img
            src="/images/clinometer-method.png"
            alt="Student sighting along a clinometer toward a ranging pole to measure slope angle"
            style={{ width: "100%", borderRadius: "8px", display: "block", marginBottom: "8px" }}
          />
          <p style={{ color: "#6b7280", lineHeight: 1.6, margin: 0 }}>Sight along the flat edge of the clinometer toward the same height mark on the ranging pole. The orange needle (or ball-bearing) hangs under gravity - read the angle where it rests on the scale. 0° = flat ground, 90° = vertical cliff.</p>
        </div>
      )}

      <p style={{ fontWeight: "500", fontSize: "14px", marginBottom: "12px" }}>{question.question}</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1rem" }}>
        {sortedOptions.map(opt => {
          let bg = "#ffffff";
          let border = "0.5px solid #d1d5db";
          let color = "#1a1a2e";
          if (submitted) {
            if (opt === question.angle) { bg = "#ecfdf5"; border = "0.5px solid #a7f3d0"; color = "#065f46"; }
            else if (opt === selected) { bg = "#fef2f2"; border = "0.5px solid #fecaca"; color = "#991b1b"; }
          } else if (selected === opt) {
            bg = "#eff6ff"; border = "2px solid #185FA5"; color = "#185FA5";
          }
          return (
            <button key={opt} onClick={() => !submitted && setSelected(opt)} style={{ background: bg, border, borderRadius: "8px", padding: "10px", fontSize: "16px", fontWeight: "500", color, cursor: submitted ? "default" : "pointer", textAlign: "center" }}>
              {opt}°
            </button>
          );
        })}
      </div>

      {showHint && !submitted && (
        <div style={{ background: "#fffbeb", border: "0.5px solid #fde68a", borderRadius: "8px", padding: "10px 14px", marginBottom: "1rem", fontSize: "13px", color: "#92400e" }}>
          Hint: {question.hint}
        </div>
      )}

      {!submitted && (
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handleSubmit} disabled={selected === null} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: selected !== null ? "#1a1a2e" : "#f3f4f6", color: selected !== null ? "#ffffff" : "#9ca3af", cursor: selected !== null ? "pointer" : "default", fontSize: "14px", fontWeight: "500" }}>
            Check answer
          </button>
          {!isPractice && (
            <button onClick={() => setShowHint(h => !h)} style={{ padding: "10px 14px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: "transparent", color: "#6b7280", cursor: "pointer", fontSize: "13px" }}>
              {showHint ? "Hide hint" : "Show hint"}
            </button>
          )}
        </div>
      )}

      {submitted && (
        <div>
          <div style={{ background: selected === question.angle ? "#ecfdf5" : "#fef2f2", border: `0.5px solid ${selected === question.angle ? "#a7f3d0" : "#fecaca"}`, borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px", color: selected === question.angle ? "#065f46" : "#991b1b" }}>
            {selected === question.angle ? "Correct!" : `Not quite - the answer is ${question.angle}°.`}
          </div>
          <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px", color: "#6b7280", lineHeight: 1.6 }}>
            {question.explanation}
          </div>
          <button onClick={() => onComplete(selected === question.angle)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: "#1a1a2e", color: "#ffffff", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>
            {isPractice ? "Start the real question →" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

function Round2({ question, isPractice, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(isPractice);
  const [submitted, setSubmitted] = useState(false);
  const [showWorked, setShowWorked] = useState(false);

  const offsets = [-1.5, -0.7, 0.8, 1.6];
  const rawOptions = offsets.map(o => Math.round((question.answer + o) * 10) / 10);
  const allOptions = [...new Set([...rawOptions, question.answer])]
    .filter(o => o > 0)
    .sort((a, b) => a - b)
    .slice(0, 4);
  const options = allOptions.length === 4 ? allOptions : [...new Set([question.answer, ...rawOptions.filter(o => o > 0)])].sort((a, b) => a - b).slice(0, 4);

  const isCorrect = () => selected === question.answer;

  return (
    <div>
      {isPractice && (
        <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "10px 14px", marginBottom: "1rem", fontSize: "13px", color: "#1d4ed8" }}>
          Practice question - the formula and hints are shown to help you learn.
        </div>
      )}

      <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "6px", fontWeight: "500" }}>THE FORMULA</p>
        <p style={{ fontSize: "15px", fontFamily: "monospace", margin: 0, color: "#1a1a2e" }}>height = tan(angle) x distance</p>
        <p style={{ fontSize: "12px", color: "#9ca3af", margin: "6px 0 0" }}>tan({question.angle}°) = {question.tanValue}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <ClinometerDiagram angle={question.angle} showLabel={true} />
      </div>

      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "1rem", lineHeight: 1.6 }}>{question.question}</p>

      {showHint && (
        <div style={{ background: "#fffbeb", border: "0.5px solid #fde68a", borderRadius: "8px", padding: "10px 14px", marginBottom: "1rem", fontSize: "13px", color: "#92400e" }}>
          {question.hint}
        </div>
      )}

      {!submitted && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1rem" }}>
          {options.map(opt => {
            const isSel = selected === opt;
            return (
              <button key={opt} onClick={() => setSelected(opt)} style={{ background: isSel ? "#eff6ff" : "#ffffff", border: isSel ? "2px solid #185FA5" : "0.5px solid #d1d5db", borderRadius: "8px", padding: "12px", fontSize: "16px", fontWeight: "500", color: isSel ? "#185FA5" : "#1a1a2e", cursor: "pointer", textAlign: "center" }}>
                {opt}m
              </button>
            );
          })}
        </div>
      )}

      {!submitted && isPractice && (
        <StepByStep
          label="Need help? Show step-by-step"
          content={
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "8px" }}>
                <StepItem n={1} text={<>Type <strong>{question.tanValue}</strong> (this is tan({question.angle}°) - it's given to you)</>} />
                <StepItem n={2} text={<>Press <strong>x</strong> (multiply)</>} />
                <StepItem n={3} text={<>Type <strong>{question.distance}</strong> (the distance in metres)</>} />
                <StepItem n={4} text={<>Press <strong>=</strong> - the answer is the height gained in metres</>} />
              </div>
              <div style={{ background: "#dcfce7", borderRadius: "6px", padding: "8px 10px", fontFamily: "monospace", fontSize: "13px", color: "#065f46" }}>
                {question.tanValue} x {question.distance} = {question.answer}m
              </div>
            </div>
          }
        />
      )}

      {!submitted && <Calculator />}

      {!submitted && (
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => { if (selected !== null) setSubmitted(true); }} disabled={selected === null} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: selected !== null ? "#1a1a2e" : "#f3f4f6", color: selected !== null ? "#ffffff" : "#9ca3af", cursor: selected !== null ? "pointer" : "default", fontSize: "14px", fontWeight: "500" }}>
            Check answer
          </button>
          {!isPractice && (
            <button onClick={() => setShowHint(h => !h)} style={{ padding: "10px 14px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: "transparent", color: "#6b7280", cursor: "pointer", fontSize: "13px" }}>
              {showHint ? "Hide hint" : "Show hint"}
            </button>
          )}
        </div>
      )}

      {submitted && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1rem" }}>
            {options.map(opt => {
              let bg = "#ffffff";
              let border = "0.5px solid #d1d5db";
              let color = "#1a1a2e";
              if (opt === question.answer) { bg = "#ecfdf5"; border = "0.5px solid #a7f3d0"; color = "#065f46"; }
              else if (opt === selected) { bg = "#fef2f2"; border = "0.5px solid #fecaca"; color = "#991b1b"; }
              return (
                <div key={opt} style={{ background: bg, border, borderRadius: "8px", padding: "12px", fontSize: "16px", fontWeight: "500", color, textAlign: "center" }}>
                  {opt}m
                </div>
              );
            })}
          </div>
          <div style={{ background: isCorrect() ? "#ecfdf5" : "#fef2f2", border: `0.5px solid ${isCorrect() ? "#a7f3d0" : "#fecaca"}`, borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px", color: isCorrect() ? "#065f46" : "#991b1b" }}>
            {isCorrect() ? `Correct! ${question.answer}m.` : `Not quite - the answer is ${question.answer}m.`}
          </div>
          <button onClick={() => setShowWorked(w => !w)} style={{ width: "100%", marginBottom: "8px", padding: "8px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: "transparent", color: "#6b7280", cursor: "pointer", fontSize: "13px" }}>
            {showWorked ? "Hide" : "Show"} worked solution
          </button>
          {showWorked && (
            <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px" }}>
              <p style={{ fontFamily: "monospace", marginBottom: "6px", color: "#1a1a2e" }}>{question.worked}</p>
              <p style={{ color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{question.explanation}</p>
            </div>
          )}
          <button onClick={() => onComplete(isCorrect())} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: "#1a1a2e", color: "#ffffff", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>
            {isPractice ? "Start the real question →" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

function Round3({ question, isPractice, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(isPractice);
  const [submitted, setSubmitted] = useState(false);
  const [showWorked, setShowWorked] = useState(false);

  const offsets = [-2.5, -1.2, 1.3, 2.6];
  const rawOptions = offsets.map(o => Math.round((question.answer + o) * 10) / 10);
  const allOptions = [...new Set([...rawOptions, question.answer])]
    .filter(o => o > 0)
    .sort((a, b) => a - b)
    .slice(0, 4);
  const options = allOptions.length === 4 ? allOptions : [...new Set([question.answer, ...rawOptions.filter(o => o > 0)])].sort((a, b) => a - b).slice(0, 4);

  const isCorrect = () => selected === question.answer;

  return (
    <div>
      {isPractice && (
        <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "10px 14px", marginBottom: "1rem", fontSize: "13px", color: "#1d4ed8" }}>
          Practice question - work through each site step by step, then add the heights together.
        </div>
      )}

      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "1rem", lineHeight: 1.6 }}>{question.question}</p>

      <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "12px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px", fontWeight: "500" }}>YOUR READINGS</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
          {question.readings.map((r, i) => (
            <div key={i} style={{ background: "#ffffff", borderRadius: "8px", padding: "8px", textAlign: "center", border: "0.5px solid #e5e7eb" }}>
              <p style={{ fontSize: "10px", color: "#9ca3af", margin: "0 0 4px" }}>Site {r.site}</p>
              <p style={{ fontSize: "16px", fontWeight: "500", margin: "0 0 2px", color: "#1a1a2e" }}>{r.angle}</p>
              <p style={{ fontSize: "10px", color: "#9ca3af", margin: 0 }}>tan={question.tans[i]}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <BeachProfile readings={question.readings} tans={question.tans} />
        <p style={{ fontSize: "11px", color: "#9ca3af", textAlign: "center", marginTop: "4px" }}>Your beach profile (shape only - heights not to scale)</p>
      </div>

      {showHint && (
        <div style={{ background: "#fffbeb", border: "0.5px solid #fde68a", borderRadius: "8px", padding: "10px 14px", marginBottom: "1rem", fontSize: "13px", color: "#92400e", lineHeight: 1.6 }}>
          {question.hint}
          {isPractice && (
            <div style={{ marginTop: "8px", fontFamily: "monospace", fontSize: "12px" }}>
              {question.readings.map((r, i) => (
                <p key={i} style={{ margin: "2px 0" }}>Site {r.site}: {question.tans[i]} x 10 = {question.heights[i]}m</p>
              ))}
            </div>
          )}
        </div>
      )}

      {!submitted && (
        <div>
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>Select the total height gained:</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1rem" }}>
            {options.map(opt => {
              const isSel = selected === opt;
              return (
                <button key={opt} onClick={() => setSelected(opt)} style={{ background: isSel ? "#eff6ff" : "#ffffff", border: isSel ? "2px solid #185FA5" : "0.5px solid #d1d5db", borderRadius: "8px", padding: "12px", fontSize: "16px", fontWeight: "500", color: isSel ? "#185FA5" : "#1a1a2e", cursor: "pointer", textAlign: "center" }}>
                  {opt}m
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!submitted && isPractice && (
        <StepByStep
          label="Need help? Show step-by-step"
          content={
            <div>
              <p style={{ fontSize: "13px", color: "#065f46", marginBottom: "8px", lineHeight: 1.5 }}>For each site, multiply the tan value by 10. Then add all four results together.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "8px" }}>
                {question.readings.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "monospace", fontSize: "13px" }}>
                    <span style={{ background: "#1D9E75", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "500", flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ color: "#065f46" }}>Site {r.site}: {question.tans[i]} x 10 = <strong>{question.heights[i]}m</strong></span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#dcfce7", borderRadius: "6px", padding: "8px 10px", fontFamily: "monospace", fontSize: "13px", color: "#065f46" }}>
                Total: {question.heights.join(" + ")} = <strong>{question.answer}m</strong>
              </div>
            </div>
          }
        />
      )}

      {!submitted && <Calculator />}

      {!submitted && (
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => { if (selected !== null) setSubmitted(true); }} disabled={selected === null} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: selected !== null ? "#1a1a2e" : "#f3f4f6", color: selected !== null ? "#ffffff" : "#9ca3af", cursor: selected !== null ? "pointer" : "default", fontSize: "14px", fontWeight: "500" }}>
            Check answer
          </button>
          {!isPractice && (
            <button onClick={() => setShowHint(h => !h)} style={{ padding: "10px 14px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: "transparent", color: "#6b7280", cursor: "pointer", fontSize: "13px" }}>
              {showHint ? "Hide hint" : "Show hint"}
            </button>
          )}
        </div>
      )}

      {submitted && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1rem" }}>
            {options.map(opt => {
              let bg = "#ffffff";
              let border = "0.5px solid #d1d5db";
              let color = "#1a1a2e";
              if (opt === question.answer) { bg = "#ecfdf5"; border = "0.5px solid #a7f3d0"; color = "#065f46"; }
              else if (opt === selected) { bg = "#fef2f2"; border = "0.5px solid #fecaca"; color = "#991b1b"; }
              return (
                <div key={opt} style={{ background: bg, border, borderRadius: "8px", padding: "12px", fontSize: "16px", fontWeight: "500", color, textAlign: "center" }}>
                  {opt}m
                </div>
              );
            })}
          </div>
          <div style={{ background: isCorrect() ? "#ecfdf5" : "#fef2f2", border: `0.5px solid ${isCorrect() ? "#a7f3d0" : "#fecaca"}`, borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px", color: isCorrect() ? "#065f46" : "#991b1b" }}>
            {isCorrect() ? `Correct! Total height = ${question.answer}m.` : `Not quite - the answer is ${question.answer}m.`}
          </div>
          <button onClick={() => setShowWorked(w => !w)} style={{ width: "100%", marginBottom: "8px", padding: "8px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: "transparent", color: "#6b7280", cursor: "pointer", fontSize: "13px" }}>
            {showWorked ? "Hide" : "Show"} worked solution
          </button>
          {showWorked && (
            <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px" }}>
              {question.readings.map((r, i) => (
                <p key={i} style={{ fontFamily: "monospace", margin: "2px 0", color: "#1a1a2e" }}>Site {r.site}: tan({r.angle}) x 10 = {question.heights[i]}m</p>
              ))}
              <p style={{ fontFamily: "monospace", margin: "6px 0 8px", fontWeight: "500", color: "#1a1a2e" }}>Total: {question.heights.join(" + ")} = {question.answer}m</p>
              <p style={{ color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{question.explanation}</p>
            </div>
          )}
          <button onClick={() => onComplete(isCorrect())} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: "#1a1a2e", color: "#ffffff", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>
            {isPractice ? "Start the real question →" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

function pickRandom(arr, exclude = []) {
  const pool = arr.filter(q => !exclude.includes(q.id));
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function Clinometer({ onBack }) {
  const [phase, setPhase] = useState("intro");
  const [round, setRound] = useState(1);
  const [isPractice, setIsPractice] = useState(true);
  const [currentQ, setCurrentQ] = useState(null);
  const [score, setScore] = useState({ r1: 0, r2: 0, r3: 0 });
  const [attempts, setAttempts] = useState({ r1: 0, r2: 0, r3: 0 });
  const [usedIds, setUsedIds] = useState([]);
  const [roundComplete, setRoundComplete] = useState(false);

  const startRound = (r) => {
    const bank = r === 1 ? ROUND1_QUESTIONS : r === 2 ? ROUND2_QUESTIONS : ROUND3_QUESTIONS;
    const q = pickRandom(bank, usedIds);
    setCurrentQ(q);
    setIsPractice(true);
    setRound(r);
    setRoundComplete(false);
    setPhase("playing");
  };

  const handleComplete = (correct) => {
    const key = `r${round}`;
    if (!isPractice) {
      const newAttempts = attempts[key] + 1;
      setAttempts(a => ({ ...a, [key]: newAttempts }));
      if (correct) setScore(s => ({ ...s, [key]: s[key] + 1 }));
      if (newAttempts >= 2) {
        setRoundComplete(true);
      } else {
        const bank = round === 1 ? ROUND1_QUESTIONS : round === 2 ? ROUND2_QUESTIONS : ROUND3_QUESTIONS;
        const nextQ = pickRandom(bank, [...usedIds, currentQ.id]);
        if (nextQ) {
          setCurrentQ(nextQ);
          setUsedIds(u => [...u, currentQ.id]);
        } else {
          setRoundComplete(true);
        }
      }
    } else {
      setIsPractice(false);
      const bank = round === 1 ? ROUND1_QUESTIONS : round === 2 ? ROUND2_QUESTIONS : ROUND3_QUESTIONS;
      const nextQ = pickRandom(bank, [currentQ.id]);
      setCurrentQ(nextQ);
      setUsedIds(u => [...u, currentQ?.id].filter(Boolean));
    }
  };

  const roundInfo = [
    { num: 1, title: "Reading the clinometer", desc: "Identify the angle shown on the clinometer scale", color: "#1D9E75" },
    { num: 2, title: "Calculating height", desc: "Use tan(angle) x distance to find height gained", color: "#185FA5" },
    { num: 3, title: "Full beach profile", desc: "Calculate and sum heights across multiple transect sites", color: "#D85A30" },
  ];

  if (phase === "intro") {
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", paddingBottom: "2rem" }}>
        {onBack && (
          <button onClick={onBack} style={{ background: "transparent", border: "0.5px solid #d1d5db", borderRadius: "8px", padding: "6px 10px", fontSize: "13px", color: "#6b7280", cursor: "pointer", marginBottom: "1rem" }}>
            - Back to Maths Skills
          </button>
        )}
        <h2 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "6px" }}>Clinometer Beach Profiling</h2>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          A clinometer measures slope angles during fieldwork. Learn how to read one, calculate height gain, and build a full beach profile - all skills you need for the Section C fieldwork questions.
        </p>

        <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "10px" }}>WHAT IS A CLINOMETER?</p>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
            <img
              src="/images/clinometer.jpg"
              alt="A blue gun-shaped clinometer used in geography fieldwork"
              style={{ width: "120px", height: "90px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }}
            />
            <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
              This is the clinometer you will use on your fieldtrip. Hold it to your eye like a telescope and sight along the top toward a ranging pole held by your partner. The weighted ball-bearing inside hangs under gravity and rests against the scale - you read the angle it stops at.
            </p>
          </div>

          <div style={{ borderTop: "0.5px solid #e5e7eb", paddingTop: "12px", marginBottom: "12px" }}>
            <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "8px" }}>HOW IT WORKS IN THE FIELD</p>
            <img
              src="/images/beach-profiling-method.png"
              alt="Diagram showing two students using a clinometer and ranging pole to measure beach profile across four sites"
              style={{ width: "100%", borderRadius: "8px", display: "block", marginBottom: "8px" }}
            />
            <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
              One student holds the ranging pole vertically at the next site while the other sights through the clinometer at eye height. A tape measure along the ground keeps each interval consistent - usually 10 metres. The X marks show breaks of slope where the gradient noticeably changes.
            </p>
          </div>

          <div style={{ display: "flex", gap: "16px", alignItems: "center", borderTop: "0.5px solid #e5e7eb", paddingTop: "12px" }}>
            <ClinometerDiagram angle={20} showLabel={true} />
            <div>
              <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "6px" }}>HOW TO READ THE SCALE</p>
              <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
                0° = completely flat ground. 90° = a vertical cliff. Most beach slopes fall between 3° and 30°. The orange needle in the practice questions represents the ball-bearing in the real instrument.
              </p>
            </div>
          </div>
        </div>

        <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "10px" }}>Tap a round to jump straight to it, or start from the beginning:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1.5rem" }}>
          {roundInfo.map(r => (
            <button key={r.num} onClick={() => startRound(r.num)} style={{ display: "flex", gap: "12px", alignItems: "center", padding: "12px 14px", background: "#ffffff", border: "0.5px solid #e5e7eb", borderRadius: "8px", cursor: "pointer", textAlign: "left", width: "100%" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: r.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: "12px", fontWeight: "500" }}>{r.num}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "500", fontSize: "14px", margin: "0 0 2px", color: "#1a1a2e" }}>{r.title}</p>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>{r.desc}</p>
              </div>
              <span style={{ fontSize: "16px", color: "#9ca3af" }}>→</span>
            </button>
          ))}
        </div>

        <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "10px 14px", marginBottom: "1.5rem", fontSize: "13px", color: "#1d4ed8", lineHeight: 1.6 }}>
          Each round starts with a practice question with full hints. Then you get 2 real questions drawn from a bank of 5, so you may get different questions each time you play.
        </div>

        <button onClick={() => startRound(1)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "none", background: "#1D9E75", color: "#fff", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}>
          Start from Round 1 →
        </button>
      </div>
    );
  }

  if (phase === "playing" && currentQ) {
    const RoundComponent = round === 1 ? Round1 : round === 2 ? Round2 : Round3;
    const roundColors = ["#1D9E75", "#185FA5", "#D85A30"];
    const color = roundColors[round - 1];

    return (
      <div style={{ maxWidth: 560, margin: "0 auto", paddingBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
          <button onClick={() => setPhase("intro")} style={{ background: "transparent", border: "0.5px solid #d1d5db", borderRadius: "8px", padding: "6px 10px", fontSize: "13px", color: "#6b7280", cursor: "pointer", flexShrink: 0 }}>
            ← Back
          </button>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "11px", fontWeight: "500", flexShrink: 0 }}>{round}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>ROUND {round} - {["READING THE CLINOMETER", "CALCULATING HEIGHT", "FULL BEACH PROFILE"][round - 1]}</p>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{isPractice ? "Practice question" : `Question ${attempts[`r${round}`] + 1} of 2`}</p>
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280", flexShrink: 0 }}>
            {score[`r${round}`]}/{attempts[`r${round}`]} correct
          </div>
        </div>

        {roundComplete ? (
          <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
            <div style={{ fontSize: "48px", marginBottom: "1rem" }}>
              {score[`r${round}`] >= 2 ? "🎉" : "📚"}
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "6px" }}>
              Round {round} complete!
            </h3>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "1.5rem" }}>
              You got {score[`r${round}`]} out of 2 correct.
              {score[`r${round}`] === 2 ? " Perfect - great work!" : score[`r${round}`] === 1 ? " Good effort - try again for a perfect score!" : " Keep practising - it gets easier!"}
            </p>
            {round < 3 ? (
              <button onClick={() => startRound(round + 1)} style={{ padding: "12px 24px", borderRadius: "8px", border: "none", background: roundColors[round], color: "#fff", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
                Start Round {round + 1} →
              </button>
            ) : (
              <div>
                <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "16px", marginBottom: "1.5rem", textAlign: "left" }}>
                  <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "10px" }}>YOUR SCORES</p>
                  {[1, 2, 3].map(r => (
                    <div key={r} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: r < 3 ? "0.5px solid #e5e7eb" : "none" }}>
                      <span style={{ fontSize: "13px", color: "#6b7280" }}>Round {r}</span>
                      <span style={{ fontSize: "13px", fontWeight: "500", color: "#1a1a2e" }}>{score[`r${r}`]}/{attempts[`r${r}`]}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px", color: "#1d4ed8", lineHeight: 1.6, textAlign: "left" }}>
                  Exam tip: In your fieldwork answer, mention the clinometer by name, explain WHY you used it (to measure beach gradient), and describe HOW (sighting along it to a ranging pole at each transect site). This gets you full marks.
                </div>
                <button onClick={() => { setPhase("intro"); setScore({ r1: 0, r2: 0, r3: 0 }); setAttempts({ r1: 0, r2: 0, r3: 0 }); setUsedIds([]); }} style={{ padding: "10px 20px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: "transparent", color: "#6b7280", cursor: "pointer", fontSize: "13px" }}>
                  Play again
                </button>
              </div>
            )}
          </div>
        ) : (
          <RoundComponent key={currentQ.id + isPractice} question={currentQ} isPractice={isPractice} onComplete={handleComplete} />
        )}
      </div>
    );
  }

  return null;
}