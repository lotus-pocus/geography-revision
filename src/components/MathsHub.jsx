import { useState } from "react";

const STORAGE_KEY = "maths_progress_v1";

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}

function saveProgress(key, score) {
  const p = loadProgress();
  p[key] = { score, completedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

const ACTIVITIES = [
  {
    id: "beach",
    title: "Beach Profiling",
    subtitle: "Clinometer & gradient calculations",
    topic: "Coastal Fieldwork",
    paper: "Paper 2 - Section C",
    color: "#059669",
    difficulty: "Medium",
    description: "Use a clinometer to measure beach slope angles and calculate height gained across a transect.",
  },
  {
    id: "percentage",
    title: "Percentage Change",
    subtitle: "Calculate % increase and decrease",
    topic: "UK Human Landscape / Development",
    paper: "Paper 2 - Section B",
    color: "#185FA5",
    difficulty: "Easy",
    description: "Calculate percentage change in population, FDI, development indicators and more.",
  },
  {
    id: "averages",
    title: "Mean, Median & Range",
    subtitle: "Analysing data sets",
    topic: "Fieldwork Data Analysis",
    paper: "Paper 2 - Section C",
    color: "#9333ea",
    difficulty: "Easy",
    description: "Find the mean, median and range of data collected during fieldwork investigations.",
  },
  {
    id: "spearman",
    title: "Spearman's Rank",
    subtitle: "Correlation between two variables",
    topic: "Fieldwork Correlation",
    paper: "Paper 2 - Section C",
    color: "#D85A30",
    difficulty: "Hard",
    description: "Test whether two sets of fieldwork data are correlated using Spearman's Rank formula.",
  },
];

function difficultyColor(d) {
  if (d === "Easy") return { bg: "#ecfdf5", color: "#065f46" };
  if (d === "Medium") return { bg: "#fffbeb", color: "#92400e" };
  return { bg: "#fef2f2", color: "#991b1b" };
}

function Hub({ onStart, progress }) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", paddingBottom: "2rem" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "6px" }}>Maths Skills</h2>
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "1.5rem", lineHeight: 1.6 }}>
        Geography Paper 2 requires a calculator and tests specific maths skills. Tap an activity to practise - each one shows which topic and paper section it relates to.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {ACTIVITIES.map(a => {
          const p = progress[a.id];
          const dc = difficultyColor(a.difficulty);
          return (
            <button key={a.id} onClick={() => onStart(a.id)} style={{ display: "flex", gap: "14px", alignItems: "center", padding: "14px", background: "#ffffff", border: "0.5px solid #e5e7eb", borderRadius: "12px", cursor: "pointer", textAlign: "left", width: "100%", borderLeft: `4px solid ${a.color}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px", flexWrap: "wrap" }}>
                  <span style={{ fontWeight: "500", fontSize: "15px", color: "#1a1a2e" }}>{a.title}</span>
                  <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "99px", background: dc.bg, color: dc.color, fontWeight: "500" }}>{a.difficulty}</span>
                  {p && <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "99px", background: "#ecfdf5", color: "#065f46", fontWeight: "500" }}>Best: {p.score}</span>}
                </div>
                <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 4px" }}>{a.subtitle}</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "11px", padding: "2px 8px", background: "#f3f4f6", borderRadius: "99px", color: "#374151" }}>{a.topic}</span>
                  <span style={{ fontSize: "11px", padding: "2px 8px", background: "#f3f4f6", borderRadius: "99px", color: "#374151" }}>{a.paper}</span>
                </div>
              </div>
              <span style={{ fontSize: "18px", color: "#9ca3af", flexShrink: 0 }}>→</span>
            </button>
          );
        })}
      </div>
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
    if (fresh) { setDisplay(val === "." ? "0." : val); setFresh(false); }
    else {
      if (val === "." && display.includes(".")) return;
      setDisplay(display === "0" && val !== "." ? val : display + val);
    }
  };
  const pressOp = (nextOp) => { setPrev(parseFloat(display)); setOp(nextOp); setFresh(true); };
  const equals = () => {
    if (op === null || prev === null) return;
    const curr = parseFloat(display);
    let result;
    if (op === "+") result = prev + curr;
    else if (op === "-") result = prev - curr;
    else if (op === "x") result = prev * curr;
    else if (op === "/") result = curr !== 0 ? prev / curr : "Error";
    setDisplay(String(typeof result === "number" ? parseFloat(result.toFixed(4)) : result));
    setPrev(null); setOp(null); setFresh(true);
  };
  const clear = () => { setDisplay("0"); setPrev(null); setOp(null); setFresh(true); };
  const btn = (label, onClick, bg = "#ffffff", color = "#1a1a2e") => (
    <button key={label} onClick={onClick} style={{ background: bg, color, border: "0.5px solid #e5e7eb", borderRadius: "6px", padding: "10px 0", fontSize: "15px", fontWeight: "500", cursor: "pointer", textAlign: "center" }}>{label}</button>
  );

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", padding: "8px 12px", background: "#f3f4f6", border: "0.5px solid #e5e7eb", borderRadius: open ? "8px 8px 0 0" : "8px", fontSize: "13px", color: "#6b7280", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>Calculator</span><span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ border: "0.5px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "10px", background: "#f9fafb" }}>
          <div style={{ background: "#1a1a2e", color: "#ffffff", borderRadius: "6px", padding: "10px 12px", marginBottom: "8px", fontSize: "20px", fontWeight: "500", textAlign: "right", fontFamily: "monospace", minHeight: "44px" }}>
            {op && <span style={{ fontSize: "12px", color: "#9ca3af", marginRight: "8px" }}>{prev} {op}</span>}
            {display}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
            {btn("C", clear, "#fef2f2", "#991b1b")}
            {btn("+/-", () => setDisplay(d => String(-parseFloat(d))), "#f3f4f6", "#374151")}
            {btn("%", () => setDisplay(d => String(parseFloat(d) / 100)), "#f3f4f6", "#374151")}
            {btn("/", () => pressOp("/"), "#185FA5", "#ffffff")}
            {btn("7", () => press("7"))}{btn("8", () => press("8"))}{btn("9", () => press("9"))}{btn("x", () => pressOp("x"), "#185FA5", "#ffffff")}
            {btn("4", () => press("4"))}{btn("5", () => press("5"))}{btn("6", () => press("6"))}{btn("-", () => pressOp("-"), "#185FA5", "#ffffff")}
            {btn("1", () => press("1"))}{btn("2", () => press("2"))}{btn("3", () => press("3"))}{btn("+", () => pressOp("+"), "#185FA5", "#ffffff")}
            <button onClick={() => press("0")} style={{ gridColumn: "span 2", background: "#ffffff", color: "#1a1a2e", border: "0.5px solid #e5e7eb", borderRadius: "6px", padding: "10px 0", fontSize: "15px", fontWeight: "500", cursor: "pointer", textAlign: "center" }}>0</button>
            {btn(".", () => press("."))}
            {btn("=", equals, "#1D9E75", "#ffffff")}
          </div>
        </div>
      )}
    </div>
  );
}

const PCT_QUESTIONS = [
  { id: "p1", context: "Urbanising World", scenario: "A city's population grew from 2,000,000 to 2,160,000 over 10 years.", oldVal: 2000000, newVal: 2160000, answer: 8, hint: "Formula: ((new - old) / old) x 100. So ((2,160,000 - 2,000,000) / 2,000,000) x 100", worked: "((2,160,000 - 2,000,000) / 2,000,000) x 100 = (160,000 / 2,000,000) x 100 = 0.08 x 100 = 8%", explanation: "The city grew by 8%. This is typical of re-urbanisation in UK cities where regeneration attracts people back to city centres." },
  { id: "p2", context: "UK Human Landscape - FDI", scenario: "Foreign Direct Investment into London rose from £416 billion to £661 billion between 2015 and 2019.", oldVal: 416, newVal: 661, answer: 58.9, hint: "Formula: ((new - old) / old) x 100. So ((661 - 416) / 416) x 100", worked: "((661 - 416) / 416) x 100 = (245 / 416) x 100 = 0.589 x 100 = 58.9%", explanation: "London's FDI grew by nearly 59% - far outpacing other UK regions, which reflects London's dominance as a global financial centre." },
  { id: "p3", context: "Global Development - Malawi", scenario: "Malawi's GDP per capita increased from $340 to $399 over 5 years.", oldVal: 340, newVal: 399, answer: 17.4, hint: "Formula: ((new - old) / old) x 100. So ((399 - 340) / 340) x 100", worked: "((399 - 340) / 340) x 100 = (59 / 340) x 100 = 0.1735 x 100 = 17.4%", explanation: "17.4% growth sounds impressive but from a very low base - Malawi remains one of the world's poorest countries despite this increase." },
  { id: "p4", context: "Coastal Change - Holderness", scenario: "The Holderness coastline eroded from 3.2km of cliff to 2.9km remaining over 20 years.", oldVal: 3.2, newVal: 2.9, answer: -9.4, hint: "This is a decrease! Formula: ((new - old) / old) x 100. ((2.9 - 3.2) / 3.2) x 100 gives a negative answer showing a decrease.", worked: "((2.9 - 3.2) / 3.2) x 100 = (-0.3 / 3.2) x 100 = -0.09375 x 100 = -9.4%", explanation: "-9.4% means the cliff decreased by 9.4% - a significant loss. Holderness loses up to 2 metres per year, the fastest eroding coast in Europe." },
  { id: "p5", context: "River Processes - Flooding", scenario: "River discharge increased from 45 cumecs to 312 cumecs during a storm event.", oldVal: 45, newVal: 312, answer: 593.3, hint: "Formula: ((new - old) / old) x 100. ((312 - 45) / 45) x 100", worked: "((312 - 45) / 45) x 100 = (267 / 45) x 100 = 5.933 x 100 = 593.3%", explanation: "A 593% increase! This dramatic rise in discharge is what causes flooding - the river channel cannot cope with this volume of water." },
];

const AVG_QUESTIONS = [
  {
    id: "a1", context: "Coastal Fieldwork", scenario: "You measured pebble sizes (cm) at 7 sites along a beach transect.",
    data: [4.2, 6.8, 3.1, 7.5, 5.9, 4.2, 6.1],
    mean: 5.4, median: 5.9, range: 4.4,
    hint_mean: "Add all values together, then divide by how many there are (7).",
    hint_median: "Put the values in order from smallest to largest, then find the middle one.",
    hint_range: "Subtract the smallest value from the largest.",
    worked_mean: "4.2 + 6.8 + 3.1 + 7.5 + 5.9 + 4.2 + 6.1 = 37.8. Then 37.8 / 7 = 5.4cm",
    worked_median: "Ordered: 3.1, 4.2, 4.2, 5.9, 6.1, 6.8, 7.5. Middle value (4th of 7) = 5.9cm",
    worked_range: "7.5 - 3.1 = 4.4cm",
    explanation: "Pebble size typically increases closer to the sea due to stronger wave energy depositing larger material."
  },
  {
    id: "a2", context: "UK Cities - Population Growth",
    scenario: "Population growth (%) in 6 UK cities: Sheffield 1.5, Newcastle 2.9, Liverpool 4.6, Leeds 8.1, Manchester 7.4, Bristol 10.4",
    data: [1.5, 2.9, 4.6, 8.1, 7.4, 10.4],
    mean: 5.8, median: 6.0, range: 8.9,
    hint_mean: "Add all 6 values together, then divide by 6.",
    hint_median: "Put in order, then average the two middle values (there are 6 values, so the median is between the 3rd and 4th).",
    hint_range: "Largest minus smallest.",
    worked_mean: "1.5 + 2.9 + 4.6 + 8.1 + 7.4 + 10.4 = 34.9. Then 34.9 / 6 = 5.8%",
    worked_median: "Ordered: 1.5, 2.9, 4.6, 7.4, 8.1, 10.4. Two middle values: 4.6 and 7.4. Average: (4.6 + 7.4) / 2 = 6.0%",
    worked_range: "10.4 - 1.5 = 8.9%",
    explanation: "Bristol grew fastest at 10.4%, Sheffield slowest at 1.5%. The large range (8.9%) shows significant inequality in UK city growth."
  },
  {
    id: "a3", context: "River Fieldwork",
    scenario: "You measured river velocity (m/s) at 5 points across a channel.",
    data: [0.3, 0.8, 1.2, 0.9, 0.4],
    mean: 0.7, median: 0.8, range: 0.9,
    hint_mean: "Add the 5 values together, divide by 5.",
    hint_median: "Order them smallest to largest, pick the middle (3rd) value.",
    hint_range: "Largest minus smallest.",
    worked_mean: "0.3 + 0.8 + 1.2 + 0.9 + 0.4 = 3.6. Then 3.6 / 5 = 0.72 rounded to 0.7 m/s",
    worked_median: "Ordered: 0.3, 0.4, 0.8, 0.9, 1.2. Middle value (3rd of 5) = 0.8 m/s",
    worked_range: "1.2 - 0.3 = 0.9 m/s",
    explanation: "Velocity is fastest in the centre of the channel and slower near the banks due to friction with the riverbed and banks."
  },
  {
    id: "a4", context: "Environmental Quality Survey - Urban Fieldwork",
    scenario: "Environmental quality scores (out of 20) from 5 urban survey sites.",
    data: [9, 15, 11, 18, 7],
    mean: 12.0, median: 11.0, range: 11.0,
    hint_mean: "Add all 5 scores together, divide by 5.",
    hint_median: "Order them, pick the middle value.",
    hint_range: "Highest minus lowest.",
    worked_mean: "9 + 15 + 11 + 18 + 7 = 60. Then 60 / 5 = 12.0",
    worked_median: "Ordered: 7, 9, 11, 15, 18. Middle value (3rd of 5) = 11",
    worked_range: "18 - 7 = 11",
    explanation: "A range of 11 shows significant variation between the best and worst areas. Inner city areas typically score lowest; rural-urban fringe highest."
  },
];

const SPR_QUESTIONS = [
  {
    id: "s1",
    context: "Coastal Fieldwork",
    scenario: "A student investigated whether distance from the sea affects pebble size on a beach. They collected data at 6 sites.",
    xLabel: "Distance from sea (m)",
    yLabel: "Mean pebble size (cm)",
    data: [
      { site: 1, x: 10, y: 8.2 },
      { site: 2, x: 20, y: 6.9 },
      { site: 3, x: 30, y: 5.1 },
      { site: 4, x: 40, y: 4.8 },
      { site: 5, x: 50, y: 3.2 },
      { site: 6, x: 60, y: 2.7 },
    ],
    rankX: [1, 2, 3, 4, 5, 6],
    rankY: [6, 5, 4, 3, 2, 1],
    d: [5, 3, 1, 1, 3, 5],
    d2: [25, 9, 1, 1, 9, 25],
    sumD2: 70,
    rs: -1.0,
    rsRounded: -1.0,
    interpretation: "A perfect negative correlation (-1.0). As distance from the sea increases, pebble size decreases. This supports the theory that wave energy sorts sediment by size.",
  },
  {
    id: "s2",
    context: "Urban Fieldwork",
    scenario: "Students investigated whether income deprivation affects environmental quality across 6 urban areas.",
    xLabel: "Income deprivation rank (1=least deprived)",
    yLabel: "Environmental quality score (/20)",
    data: [
      { site: 1, x: 1, y: 18 },
      { site: 2, x: 2, y: 15 },
      { site: 3, x: 3, y: 12 },
      { site: 4, x: 4, y: 10 },
      { site: 5, x: 5, y: 8 },
      { site: 6, x: 6, y: 5 },
    ],
    rankX: [1, 2, 3, 4, 5, 6],
    rankY: [1, 2, 3, 4, 5, 6],
    d: [0, 0, 0, 0, 0, 0],
    d2: [0, 0, 0, 0, 0, 0],
    sumD2: 0,
    rs: 1.0,
    rsRounded: 1.0,
    interpretation: "A perfect positive correlation (+1.0). As income deprivation increases, environmental quality decreases. Wealthier areas have better maintained environments.",
  },
  {
    id: "s3",
    context: "River Fieldwork",
    scenario: "Students measured river width and depth at 6 sites along a river to see if they are correlated.",
    xLabel: "River width (m)",
    yLabel: "River depth (m)",
    data: [
      { site: 1, x: 3.2, y: 0.4 },
      { site: 2, x: 5.8, y: 0.7 },
      { site: 3, x: 4.1, y: 0.5 },
      { site: 4, x: 8.3, y: 1.1 },
      { site: 5, x: 6.7, y: 0.9 },
      { site: 6, x: 7.4, y: 0.8 },
    ],
    rankX: [1, 3, 2, 6, 4, 5],
    rankY: [1, 3, 2, 6, 5, 4],
    d: [0, 0, 0, 0, 1, 1],
    d2: [0, 0, 0, 0, 1, 1],
    sumD2: 2,
    rs: 0.94,
    rsRounded: 0.94,
    interpretation: "A strong positive correlation (0.94). Wider rivers tend to also be deeper. This is expected as rivers grow in both width and depth from source to mouth.",
  },
];

function PercentageActivity({ onBack, onComplete }) {
  const [introSeen, setIntroSeen] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!introSeen) return (
    <div style={{ maxWidth: 560, margin: "0 auto", paddingBottom: "2rem" }}>
      <button onClick={onBack} style={{ background: "transparent", border: "0.5px solid #d1d5db", borderRadius: "8px", padding: "6px 10px", fontSize: "13px", color: "#6b7280", cursor: "pointer", marginBottom: "1rem" }}>
        - Back
      </button>
      <h2 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "6px" }}>Percentage Change</h2>
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "1.5rem", lineHeight: 1.6 }}>
        Read through this explainer before attempting the questions.
      </p>

      <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "8px" }}>WHAT IS PERCENTAGE CHANGE?</p>
        <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, marginBottom: "10px" }}>
          Percentage change tells you <strong>how much something has increased or decreased relative to what it started at</strong>. Rather than just saying "it went up by 50", percentage change puts that in context - a rise of 50 from a starting point of 100 is a 50% increase, but the same rise of 50 from 1000 is only a 5% increase.
        </p>
        <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
          A <strong>positive</strong> result means an increase. A <strong>negative</strong> result means a decrease - this is completely normal and you should include the minus sign in your answer.
        </p>
      </div>

      <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "10px" }}>WHERE DOES IT APPEAR IN YOUR EXAM?</p>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px" }}>
          <span style={{ background: "#185FA5", color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "11px", fontWeight: "500", flexShrink: 0, marginTop: "2px" }}>Paper 2</span>
          <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, margin: 0 }}>
            Section B - UK Human Landscape. Common in questions about FDI (Foreign Direct Investment), population growth and regional inequality.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <span style={{ background: "#185FA5", color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "11px", fontWeight: "500", flexShrink: 0, marginTop: "2px" }}>Both papers</span>
          <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, margin: 0 }}>
            Also appears in development indicators (HDI, GNI per capita changes), coastal erosion rates, river discharge changes and urban growth statistics.
          </p>
        </div>
      </div>

      <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "10px" }}>THE FORMULA - WHAT EACH PART MEANS</p>
        <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "12px", marginBottom: "12px", textAlign: "center" }}>
          <p style={{ fontFamily: "monospace", fontSize: "15px", color: "#ffffff", margin: 0 }}>% change = ((new - old) / old) x 100</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { symbol: "new", color: "#1D9E75", meaning: "The value you end up with - the more recent or final number." },
            { symbol: "old", color: "#D85A30", meaning: "The value you started with - the original or earlier number." },
            { symbol: "new - old", color: "#185FA5", meaning: "The actual change. If negative, it means a decrease." },
            { symbol: "/ old", color: "#9333ea", meaning: "Divide by the original value to make it relative (not just an absolute change)." },
            { symbol: "x 100", color: "#6b7280", meaning: "Multiply by 100 to convert from a decimal to a percentage." },
          ].map(item => (
            <div key={item.symbol} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ background: item.color, color: "#fff", borderRadius: "6px", padding: "2px 10px", fontSize: "12px", fontWeight: "500", fontFamily: "monospace", flexShrink: 0, minWidth: "80px", textAlign: "center" }}>{item.symbol}</span>
              <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.5, margin: 0 }}>{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "8px" }}>WORKED EXAMPLE</p>
        <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, marginBottom: "8px" }}>A city's population grew from 500,000 to 560,000. What is the percentage change?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[
            "Step 1: new - old = 560,000 - 500,000 = 60,000",
            "Step 2: divide by old = 60,000 / 500,000 = 0.12",
            "Step 3: multiply by 100 = 0.12 x 100 = 12%",
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <span style={{ background: "#185FA5", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "500", flexShrink: 0, marginTop: "1px" }}>{i + 1}</span>
              <p style={{ fontFamily: "monospace", fontSize: "13px", color: "#1a1a2e", margin: 0 }}>{s}</p>
            </div>
          ))}
        </div>
        <div style={{ background: "#ecfdf5", border: "0.5px solid #a7f3d0", borderRadius: "6px", padding: "8px 10px", marginTop: "8px", fontFamily: "monospace", fontSize: "13px", color: "#065f46", fontWeight: "500" }}>
          Answer: +12% (a positive increase)
        </div>
      </div>

      <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "12px 14px", marginBottom: "1.5rem", fontSize: "13px", color: "#1d4ed8", lineHeight: 1.6 }}>
        <strong>Exam tip:</strong> Always show your working. Write the formula first, then substitute the numbers. Even if your final answer is wrong you can still get method marks.
      </div>

      <button onClick={() => setIntroSeen(true)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "none", background: "#185FA5", color: "#fff", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}>
        I understand - start the questions →
      </button>
    </div>
  );

  const q = PCT_QUESTIONS[qIndex];

  const generateOptions = (answer) => {
    const isNeg = answer < 0;
    const abs = Math.abs(answer);
    const offsets = [-15.3, -7.1, 0, 8.4, 19.2];
    const raw = offsets.map(o => parseFloat((answer + o).toFixed(1)));
    const opts = [...new Set([...raw, answer])].sort((a, b) => a - b);
    return opts.slice(0, 4).includes(answer) ? opts.slice(0, 4) : [...opts.slice(0, 3), answer].sort((a, b) => a - b);
  };

  const options = generateOptions(q.answer);
  const isCorrect = selected === q.answer;

  const handleNext = () => {
    const newScore = score + (isCorrect ? 1 : 0);
    if (qIndex + 1 >= PCT_QUESTIONS.length) {
      setScore(newScore);
      saveProgress("percentage", `${newScore}/${PCT_QUESTIONS.length}`);
      onComplete(`${newScore}/${PCT_QUESTIONS.length}`);
      setDone(true);
    } else {
      setScore(newScore);
      setQIndex(i => i + 1);
      setSelected(null);
      setSubmitted(false);
      setShowHelp(false);
    }
  };

  if (done) return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", padding: "3rem 1rem" }}>
      <div style={{ fontSize: "64px", marginBottom: "1rem" }}>{score === PCT_QUESTIONS.length ? "🎉" : score >= PCT_QUESTIONS.length * 0.6 ? "⭐" : "📚"}</div>
      <h3 style={{ fontSize: "22px", fontWeight: "500", marginBottom: "8px" }}>Percentage Change complete!</h3>
      <div style={{ display: "inline-block", background: score === PCT_QUESTIONS.length ? "#ecfdf5" : score >= PCT_QUESTIONS.length * 0.6 ? "#fffbeb" : "#fef2f2", border: `0.5px solid ${score === PCT_QUESTIONS.length ? "#a7f3d0" : score >= PCT_QUESTIONS.length * 0.6 ? "#fde68a" : "#fecaca"}`, borderRadius: "99px", padding: "6px 20px", marginBottom: "1rem" }}>
        <span style={{ fontSize: "20px", fontWeight: "500", color: score === PCT_QUESTIONS.length ? "#065f46" : score >= PCT_QUESTIONS.length * 0.6 ? "#92400e" : "#991b1b" }}>{score}/{PCT_QUESTIONS.length} correct</span>
      </div>
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "2rem", lineHeight: 1.6 }}>
        {score === PCT_QUESTIONS.length ? "Perfect score - outstanding work!" : score >= PCT_QUESTIONS.length * 0.6 ? "Good effort - review the ones you missed and try again." : "Keep practising - go back to the explainer and try again."}
      </p>
      <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "12px 14px", marginBottom: "2rem", fontSize: "13px", color: "#1d4ed8", lineHeight: 1.6, textAlign: "left" }}>
        Exam tip: Always show your working for percentage change questions. Write out the formula first, then substitute the numbers. Even if your final answer is wrong you can still get method marks.
      </div>
      <button onClick={onBack} style={{ padding: "12px 32px", borderRadius: "8px", border: "none", background: "#185FA5", color: "#fff", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}>Back to Maths Skills</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", paddingBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
        <button onClick={onBack} style={{ background: "transparent", border: "0.5px solid #d1d5db", borderRadius: "8px", padding: "6px 10px", fontSize: "13px", color: "#6b7280", cursor: "pointer" }}>- Back</button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>PERCENTAGE CHANGE</p>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Question {qIndex + 1} of {PCT_QUESTIONS.length}</p>
        </div>
        <div style={{ fontSize: "12px", color: "#6b7280" }}>{score}/{qIndex} correct</div>
      </div>

      <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px", fontWeight: "500" }}>THE FORMULA</p>
        <p style={{ fontSize: "14px", fontFamily: "monospace", color: "#1a1a2e", margin: 0 }}>% change = ((new - old) / old) x 100</p>
      </div>

      <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "10px 12px", marginBottom: "6px" }}>
        <p style={{ fontSize: "11px", fontWeight: "500", color: "#185FA5", margin: "0 0 3px" }}>{q.context.toUpperCase()}</p>
      </div>
      <p style={{ fontSize: "14px", color: "#374151", marginBottom: "1rem", lineHeight: 1.6 }}>{q.scenario}</p>
      <p style={{ fontWeight: "500", fontSize: "14px", marginBottom: "12px", color: "#1a1a2e" }}>What is the percentage change?</p>

      {!submitted && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1rem" }}>
          {options.map(opt => {
            const isSel = selected === opt;
            return (
              <button key={opt} onClick={() => setSelected(opt)} style={{ background: isSel ? "#eff6ff" : "#ffffff", border: isSel ? "2px solid #185FA5" : "0.5px solid #d1d5db", borderRadius: "8px", padding: "12px", fontSize: "16px", fontWeight: "500", color: isSel ? "#185FA5" : "#1a1a2e", cursor: "pointer", textAlign: "center" }}>
                {opt}%
              </button>
            );
          })}
        </div>
      )}

      {submitted && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1rem" }}>
          {options.map(opt => {
            let bg = "#ffffff", border = "0.5px solid #d1d5db", color = "#1a1a2e";
            if (opt === q.answer) { bg = "#ecfdf5"; border = "0.5px solid #a7f3d0"; color = "#065f46"; }
            else if (opt === selected) { bg = "#fef2f2"; border = "0.5px solid #fecaca"; color = "#991b1b"; }
            return <div key={opt} style={{ background: bg, border, borderRadius: "8px", padding: "12px", fontSize: "16px", fontWeight: "500", color, textAlign: "center" }}>{opt}%</div>;
          })}
        </div>
      )}

      {!submitted && (
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => setShowHelp(h => !h)} style={{ width: "100%", padding: "8px 12px", background: "#f0fdf4", border: "0.5px solid #a7f3d0", borderRadius: showHelp ? "8px 8px 0 0" : "8px", fontSize: "13px", color: "#065f46", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", fontWeight: "500" }}>
            <span>Need help? Show step-by-step</span><span>{showHelp ? "▲" : "▼"}</span>
          </button>
          {showHelp && (
            <div style={{ background: "#f0fdf4", border: "0.5px solid #a7f3d0", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "12px 14px" }}>
              <p style={{ fontSize: "13px", color: "#065f46", marginBottom: "6px" }}>{q.hint}</p>
              <div style={{ background: "#dcfce7", borderRadius: "6px", padding: "8px 10px", fontFamily: "monospace", fontSize: "13px", color: "#065f46" }}>{q.worked}</div>
            </div>
          )}
        </div>
      )}

      <Calculator />

      {!submitted && (
        <button onClick={() => { if (selected !== null) setSubmitted(true); }} disabled={selected === null} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: selected !== null ? "#1a1a2e" : "#f3f4f6", color: selected !== null ? "#ffffff" : "#9ca3af", cursor: selected !== null ? "pointer" : "default", fontSize: "14px", fontWeight: "500", marginBottom: "1rem" }}>
          Check answer
        </button>
      )}

      {submitted && (
        <div>
          <div style={{ background: isCorrect ? "#ecfdf5" : "#fef2f2", border: `0.5px solid ${isCorrect ? "#a7f3d0" : "#fecaca"}`, borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px", color: isCorrect ? "#065f46" : "#991b1b" }}>
            {isCorrect ? "Correct!" : `Not quite - the answer is ${q.answer}%.`}
          </div>
          <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px" }}>
            <p style={{ fontFamily: "monospace", color: "#1a1a2e", marginBottom: "6px" }}>{q.worked}</p>
            <p style={{ color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{q.explanation}</p>
          </div>
          <button onClick={handleNext} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "none", background: "#185FA5", color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>
            {qIndex + 1 >= PCT_QUESTIONS.length ? "See results" : "Next question →"}
          </button>
        </div>
      )}
    </div>
  );
}

function AveragesActivity({ onBack, onComplete }) {
  const [introSeen, setIntroSeen] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [phase, setPhase] = useState("mean");
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQ, setTotalQ] = useState(0);
  const [done, setDone] = useState(false);

  if (!introSeen) return (
    <div style={{ maxWidth: 560, margin: "0 auto", paddingBottom: "2rem" }}>
      <button onClick={onBack} style={{ background: "transparent", border: "0.5px solid #d1d5db", borderRadius: "8px", padding: "6px 10px", fontSize: "13px", color: "#6b7280", cursor: "pointer", marginBottom: "1rem" }}>
        - Back
      </button>
      <h2 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "6px" }}>Mean, Median and Range</h2>
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "1.5rem", lineHeight: 1.6 }}>
        Read through this explainer before attempting the questions.
      </p>

      <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "8px" }}>WHAT ARE THESE AND WHY DO WE USE THEM?</p>
        <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, marginBottom: "10px" }}>
          When you collect data during fieldwork - like pebble sizes, environmental quality scores or population figures - you end up with a list of numbers. These three measures help you <strong>summarise and describe that data</strong> in a meaningful way.
        </p>
        <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
          Together they tell you the <strong>typical value</strong> (mean or median) and how <strong>spread out</strong> the data is (range). Examiners often ask you to calculate one or more of these from a table of fieldwork results.
        </p>
      </div>

      <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "10px" }}>WHERE DOES IT APPEAR IN YOUR EXAM?</p>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px" }}>
          <span style={{ background: "#9333ea", color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "11px", fontWeight: "500", flexShrink: 0, marginTop: "2px" }}>Paper 2</span>
          <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, margin: 0 }}>
            Section C - Fieldwork investigations. You may be asked to calculate mean, median or range from data you collected at fieldwork sites (coastal, river or urban).
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <span style={{ background: "#9333ea", color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "11px", fontWeight: "500", flexShrink: 0, marginTop: "2px" }}>Both papers</span>
          <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, margin: 0 }}>
            Also used to analyse development data, population statistics and climate figures across both papers.
          </p>
        </div>
      </div>

      <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "12px" }}>THE THREE MEASURES EXPLAINED</p>

        <div style={{ marginBottom: "14px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
            <span style={{ background: "#185FA5", color: "#fff", borderRadius: "6px", padding: "2px 10px", fontSize: "12px", fontWeight: "500" }}>Mean</span>
            <span style={{ fontSize: "12px", color: "#6b7280" }}>The average</span>
          </div>
          <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, margin: "0 0 4px 0" }}>Add all the values together, then divide by how many values there are.</p>
          <div style={{ background: "#eff6ff", borderRadius: "6px", padding: "6px 10px", fontFamily: "monospace", fontSize: "12px", color: "#185FA5" }}>
            e.g. data: 3, 5, 7, 9 - mean = (3+5+7+9) / 4 = 24 / 4 = 6
          </div>
        </div>

        <div style={{ marginBottom: "14px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
            <span style={{ background: "#9333ea", color: "#fff", borderRadius: "6px", padding: "2px 10px", fontSize: "12px", fontWeight: "500" }}>Median</span>
            <span style={{ fontSize: "12px", color: "#6b7280" }}>The middle value</span>
          </div>
          <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, margin: "0 0 4px 0" }}>Put the values in order from smallest to largest. The median is the middle value. If there are two middle values (even number of data points), add them together and divide by 2.</p>
          <div style={{ background: "#faf5ff", borderRadius: "6px", padding: "6px 10px", fontFamily: "monospace", fontSize: "12px", color: "#9333ea" }}>
            e.g. ordered: 3, 5, 7, 9, 11 - median = 7 (middle of 5 values)
          </div>
          <div style={{ background: "#faf5ff", borderRadius: "6px", padding: "6px 10px", fontFamily: "monospace", fontSize: "12px", color: "#9333ea", marginTop: "4px" }}>
            e.g. ordered: 3, 5, 7, 9 - median = (5+7) / 2 = 6 (average of 2 middle values)
          </div>
        </div>

        <div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
            <span style={{ background: "#D85A30", color: "#fff", borderRadius: "6px", padding: "2px 10px", fontSize: "12px", fontWeight: "500" }}>Range</span>
            <span style={{ fontSize: "12px", color: "#6b7280" }}>The spread</span>
          </div>
          <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, margin: "0 0 4px 0" }}>Subtract the smallest value from the largest. A large range means the data is very spread out; a small range means the values are similar to each other.</p>
          <div style={{ background: "#fef3ee", borderRadius: "6px", padding: "6px 10px", fontFamily: "monospace", fontSize: "12px", color: "#D85A30" }}>
            e.g. data: 3, 5, 7, 9, 11 - range = 11 - 3 = 8
          </div>
        </div>
      </div>

      <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "8px" }}>MEAN VS MEDIAN - WHICH TO USE?</p>
        <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
          The <strong>median</strong> is more reliable when your data contains extreme values (called outliers) that would distort the mean. For example, if most pebbles are 3-5cm but one is 20cm, the mean would be misleadingly high. The median would be unaffected. In the exam, if asked which is more appropriate, mention outliers.
        </p>
      </div>

      <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "12px 14px", marginBottom: "1.5rem", fontSize: "13px", color: "#1d4ed8", lineHeight: 1.6 }}>
        <strong>Exam tip:</strong> Each question in this activity asks you to calculate all three measures from the same dataset. In the exam, always show your working - write out the ordered list before identifying the median.
      </div>

      <button onClick={() => setIntroSeen(true)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "none", background: "#9333ea", color: "#fff", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}>
        I understand - start the questions →
      </button>
    </div>
  );

  const q = AVG_QUESTIONS[qIndex];
  const phases = ["mean", "median", "range"];
  const phaseIndex = phases.indexOf(phase);
  const currentAnswer = phase === "mean" ? q.mean : phase === "median" ? q.median : q.range;
  const currentHint = phase === "mean" ? q.hint_mean : phase === "median" ? q.hint_median : q.hint_range;
  const currentWorked = phase === "mean" ? q.worked_mean : phase === "median" ? q.worked_median : q.worked_range;
  const phaseLabel = phase === "mean" ? "Mean (average)" : phase === "median" ? "Median (middle value)" : "Range (spread)";
  const phaseColor = phase === "mean" ? "#185FA5" : phase === "median" ? "#9333ea" : "#D85A30";

  const generateOptions = (answer) => {
    const offsets = [-2.3, -1.1, 0, 1.4, 2.8];
    const raw = offsets.map(o => parseFloat((answer + o).toFixed(1)));
    const opts = [...new Set([...raw, answer])].filter(o => o > 0).sort((a, b) => a - b).slice(0, 4);
    return opts.includes(answer) ? opts : [...opts.slice(0, 3), answer].sort((a, b) => a - b);
  };

  const options = generateOptions(currentAnswer);
  const isCorrect = selected === currentAnswer;

  const handleNext = () => {
    const newScore = score + (isCorrect ? 1 : 0);
    const newTotal = totalQ + 1;
    const nextPhase = phases[phaseIndex + 1];

    if (!nextPhase) {
      if (qIndex + 1 >= AVG_QUESTIONS.length) {
        setScore(newScore);
        saveProgress("averages", `${newScore}/${AVG_QUESTIONS.length * 3}`);
        onComplete(`${newScore}/${AVG_QUESTIONS.length * 3}`);
        setDone(true);
      } else {
        setScore(newScore);
        setTotalQ(newTotal);
        setQIndex(i => i + 1);
        setPhase("mean");
        setSelected(null);
        setSubmitted(false);
        setShowHelp(false);
      }
    } else {
      setScore(newScore);
      setTotalQ(newTotal);
      setPhase(nextPhase);
      setSelected(null);
      setSubmitted(false);
      setShowHelp(false);
    }
  };

  if (done) return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", padding: "3rem 1rem" }}>
      <div style={{ fontSize: "64px", marginBottom: "1rem" }}>{score === AVG_QUESTIONS.length * 3 ? "🎉" : score >= AVG_QUESTIONS.length * 2 ? "⭐" : "📚"}</div>
      <h3 style={{ fontSize: "22px", fontWeight: "500", marginBottom: "8px" }}>Mean, Median & Range complete!</h3>
      <div style={{ display: "inline-block", background: score === AVG_QUESTIONS.length * 3 ? "#ecfdf5" : score >= AVG_QUESTIONS.length * 2 ? "#fffbeb" : "#fef2f2", border: `0.5px solid ${score === AVG_QUESTIONS.length * 3 ? "#a7f3d0" : score >= AVG_QUESTIONS.length * 2 ? "#fde68a" : "#fecaca"}`, borderRadius: "99px", padding: "6px 20px", marginBottom: "1rem" }}>
        <span style={{ fontSize: "20px", fontWeight: "500", color: score === AVG_QUESTIONS.length * 3 ? "#065f46" : score >= AVG_QUESTIONS.length * 2 ? "#92400e" : "#991b1b" }}>{score}/{AVG_QUESTIONS.length * 3} correct</span>
      </div>
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "2rem", lineHeight: 1.6 }}>
        {score === AVG_QUESTIONS.length * 3 ? "Perfect score - outstanding work!" : score >= AVG_QUESTIONS.length * 2 ? "Good effort - review the ones you missed and try again." : "Keep practising - go back to the explainer and try again."}
      </p>
      <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "12px 14px", marginBottom: "2rem", fontSize: "13px", color: "#1d4ed8", lineHeight: 1.6, textAlign: "left" }}>
        Exam tip: Always show which measure you are calculating. The median is more reliable when there are extreme values (outliers) in your data.
      </div>
      <button onClick={onBack} style={{ padding: "12px 32px", borderRadius: "8px", border: "none", background: "#9333ea", color: "#fff", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}>Back to Maths Skills</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", paddingBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
        <button onClick={onBack} style={{ background: "transparent", border: "0.5px solid #d1d5db", borderRadius: "8px", padding: "6px 10px", fontSize: "13px", color: "#6b7280", cursor: "pointer" }}>- Back</button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>MEAN, MEDIAN & RANGE</p>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Dataset {qIndex + 1} of {AVG_QUESTIONS.length} - {phaseLabel}</p>
        </div>
        <div style={{ fontSize: "12px", color: "#6b7280" }}>{score}/{totalQ} correct</div>
      </div>

      <div style={{ display: "flex", gap: "6px", marginBottom: "1rem" }}>
        {phases.map((p, i) => (
          <div key={p} style={{ flex: 1, height: "4px", borderRadius: "99px", background: i < phaseIndex ? "#1D9E75" : i === phaseIndex ? phaseColor : "#e5e7eb" }} />
        ))}
      </div>

      <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "10px 12px", marginBottom: "6px" }}>
        <p style={{ fontSize: "11px", fontWeight: "500", color: "#185FA5", margin: 0 }}>{q.context.toUpperCase()}</p>
      </div>
      <p style={{ fontSize: "14px", color: "#374151", marginBottom: "1rem", lineHeight: 1.6 }}>{q.scenario}</p>

      <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "10px 12px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "6px", fontWeight: "500" }}>YOUR DATA</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {q.data.map((v, i) => (
            <span key={i} style={{ background: "#ffffff", border: "0.5px solid #d1d5db", borderRadius: "6px", padding: "4px 10px", fontSize: "14px", fontWeight: "500", fontFamily: "monospace" }}>{v}</span>
          ))}
        </div>
      </div>

      <p style={{ fontWeight: "500", fontSize: "14px", marginBottom: "12px", color: phaseColor }}>Calculate the {phase}: {phaseLabel}</p>

      {!submitted && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1rem" }}>
          {options.map(opt => {
            const isSel = selected === opt;
            return (
              <button key={opt} onClick={() => setSelected(opt)} style={{ background: isSel ? "#eff6ff" : "#ffffff", border: isSel ? `2px solid ${phaseColor}` : "0.5px solid #d1d5db", borderRadius: "8px", padding: "12px", fontSize: "16px", fontWeight: "500", color: isSel ? phaseColor : "#1a1a2e", cursor: "pointer", textAlign: "center" }}>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {submitted && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1rem" }}>
          {options.map(opt => {
            let bg = "#ffffff", border = "0.5px solid #d1d5db", color = "#1a1a2e";
            if (opt === currentAnswer) { bg = "#ecfdf5"; border = "0.5px solid #a7f3d0"; color = "#065f46"; }
            else if (opt === selected) { bg = "#fef2f2"; border = "0.5px solid #fecaca"; color = "#991b1b"; }
            return <div key={opt} style={{ background: bg, border, borderRadius: "8px", padding: "12px", fontSize: "16px", fontWeight: "500", color, textAlign: "center" }}>{opt}</div>;
          })}
        </div>
      )}

      {!submitted && (
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => setShowHelp(h => !h)} style={{ width: "100%", padding: "8px 12px", background: "#f0fdf4", border: "0.5px solid #a7f3d0", borderRadius: showHelp ? "8px 8px 0 0" : "8px", fontSize: "13px", color: "#065f46", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", fontWeight: "500" }}>
            <span>Need help? Show step-by-step</span><span>{showHelp ? "▲" : "▼"}</span>
          </button>
          {showHelp && (
            <div style={{ background: "#f0fdf4", border: "0.5px solid #a7f3d0", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "12px 14px" }}>
              <p style={{ fontSize: "13px", color: "#065f46", marginBottom: "6px" }}>{currentHint}</p>
              <div style={{ background: "#dcfce7", borderRadius: "6px", padding: "8px 10px", fontFamily: "monospace", fontSize: "13px", color: "#065f46" }}>{currentWorked}</div>
            </div>
          )}
        </div>
      )}

      <Calculator />

      {!submitted && (
        <button onClick={() => { if (selected !== null) setSubmitted(true); }} disabled={selected === null} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: selected !== null ? "#1a1a2e" : "#f3f4f6", color: selected !== null ? "#ffffff" : "#9ca3af", cursor: selected !== null ? "pointer" : "default", fontSize: "14px", fontWeight: "500", marginBottom: "1rem" }}>
          Check answer
        </button>
      )}

      {submitted && (
        <div>
          <div style={{ background: isCorrect ? "#ecfdf5" : "#fef2f2", border: `0.5px solid ${isCorrect ? "#a7f3d0" : "#fecaca"}`, borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px", color: isCorrect ? "#065f46" : "#991b1b" }}>
            {isCorrect ? `Correct! The ${phase} is ${currentAnswer}.` : `Not quite - the ${phase} is ${currentAnswer}.`}
          </div>
          <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px" }}>
            <p style={{ fontFamily: "monospace", color: "#1a1a2e", marginBottom: "6px" }}>{currentWorked}</p>
            {phaseIndex === 2 && <p style={{ color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{q.explanation}</p>}
          </div>
          <button onClick={handleNext} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "none", background: phaseColor, color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>
            {phases[phaseIndex + 1] ? `Next: Calculate the ${phases[phaseIndex + 1]} →` : qIndex + 1 >= AVG_QUESTIONS.length ? "See results" : "Next dataset →"}
          </button>
        </div>
      )}
    </div>
  );
}

function SpearmanActivity({ onBack, onComplete }) {
  const [phase, setPhase] = useState("intro");
  const [qIndex, setQIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (phase === "intro") return (
    <div style={{ maxWidth: 560, margin: "0 auto", paddingBottom: "2rem" }}>
      <button onClick={onBack} style={{ background: "transparent", border: "0.5px solid #d1d5db", borderRadius: "8px", padding: "6px 10px", fontSize: "13px", color: "#6b7280", cursor: "pointer", marginBottom: "1rem" }}>
        - Back
      </button>
      <h2 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "6px" }}>Spearman's Rank Correlation</h2>
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "1.5rem", lineHeight: 1.6 }}>
        Before attempting the questions, read through this explainer carefully.
      </p>

      <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "8px" }}>WHAT IS SPEARMAN'S RANK?</p>
        <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, marginBottom: "10px" }}>
          Spearman's Rank is a statistical test that measures the <strong>strength and direction of the relationship</strong> between two sets of data. In geography, we use it to find out whether two variables are <strong>correlated</strong> - that is, whether one tends to increase or decrease as the other does.
        </p>
        <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
          For example: does pebble size decrease as you move further up the beach? Does environmental quality get worse in more deprived areas? Spearman's Rank gives you a number that tells you how strong that relationship is.
        </p>
      </div>

      <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "10px" }}>WHERE DOES IT APPEAR IN YOUR EXAM?</p>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px" }}>
          <span style={{ background: "#D85A30", color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "11px", fontWeight: "500", flexShrink: 0, marginTop: "2px" }}>Paper 2</span>
          <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, margin: 0 }}>
            Section C - Geographical Investigations (Fieldwork). You may be asked to calculate rs from fieldwork data, or to interpret a result someone else has calculated.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <span style={{ background: "#185FA5", color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "11px", fontWeight: "500", flexShrink: 0, marginTop: "2px" }}>Topics</span>
          <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, margin: 0 }}>
            Coastal fieldwork (pebble size vs distance), river fieldwork (width vs depth), urban fieldwork (deprivation vs environmental quality).
          </p>
        </div>
      </div>

      <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "10px" }}>THE FORMULA - WHAT EACH PART MEANS</p>
        <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "12px", marginBottom: "12px", textAlign: "center" }}>
          <p style={{ fontFamily: "monospace", fontSize: "15px", color: "#ffffff", margin: 0 }}>rs = 1 - (6 x sum of d2) / (n x (n2 - 1))</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { symbol: "rs", color: "#1D9E75", meaning: "The result - the correlation coefficient. Always between -1 and +1." },
            { symbol: "d", color: "#185FA5", meaning: "The difference between the rank of X and the rank of Y for each data pair." },
            { symbol: "d2", color: "#185FA5", meaning: "d squared (d multiplied by itself). This removes negative values." },
            { symbol: "sum of d2", color: "#D85A30", meaning: "Add up all the d2 values to get a single total." },
            { symbol: "n", color: "#9333ea", meaning: "The number of data pairs (e.g. 6 sites = n of 6)." },
            { symbol: "n2", color: "#9333ea", meaning: "n squared (n multiplied by itself). If n = 6, then n2 = 36." },
          ].map(item => (
            <div key={item.symbol} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ background: item.color, color: "#fff", borderRadius: "6px", padding: "2px 10px", fontSize: "12px", fontWeight: "500", fontFamily: "monospace", flexShrink: 0, minWidth: "80px", textAlign: "center" }}>{item.symbol}</span>
              <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.5, margin: 0 }}>{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "14px", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", marginBottom: "10px" }}>INTERPRETING THE RESULT</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[
            { range: "+1.0", label: "Perfect positive correlation", color: "#065f46", bg: "#ecfdf5" },
            { range: "+0.7 to +0.9", label: "Strong positive correlation", color: "#065f46", bg: "#d1fae5" },
            { range: "+0.4 to +0.6", label: "Moderate positive correlation", color: "#92400e", bg: "#fef3c7" },
            { range: "0", label: "No correlation", color: "#6b7280", bg: "#f3f4f6" },
            { range: "-0.4 to -0.6", label: "Moderate negative correlation", color: "#92400e", bg: "#fef3c7" },
            { range: "-0.7 to -0.9", label: "Strong negative correlation", color: "#991b1b", bg: "#fee2e2" },
            { range: "-1.0", label: "Perfect negative correlation", color: "#991b1b", bg: "#fecaca" },
          ].map(item => (
            <div key={item.range} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ background: item.bg, color: item.color, borderRadius: "6px", padding: "3px 8px", fontSize: "12px", fontWeight: "500", fontFamily: "monospace", flexShrink: 0, minWidth: "110px", textAlign: "center" }}>{item.range}</span>
              <p style={{ fontSize: "13px", color: "#374151", margin: 0 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "12px 14px", marginBottom: "1.5rem", fontSize: "13px", color: "#1d4ed8", lineHeight: 1.6 }}>
        <strong>Important:</strong> A positive rs means as one variable increases, the other increases too. A negative rs means as one increases, the other decreases. The closer to 1 or -1, the stronger the relationship.
      </div>

      <button onClick={() => setPhase("questions")} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "none", background: "#D85A30", color: "#fff", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}>
        I understand - start the questions →
      </button>
    </div>
  );

  const q = SPR_QUESTIONS[qIndex];
  const n = q.data.length;

  const steps = [
    { label: "Rank both variables", question: `What is the rank of the largest X value (${Math.max(...q.data.map(d => d.x))})?`, answer: 6, hint: "Rank from 1 (smallest) to 6 (largest). The largest value gets rank 6.", worked: `X values ordered: ${[...q.data].sort((a,b) => a.x - b.x).map(d => d.x).join(', ')}. Largest gets rank 6.` },
    { label: "Calculate d (difference in ranks)", question: "For site 1, what is d (rank X minus rank Y)?", answer: q.d[0], hint: `Rank X for site 1 = ${q.rankX[0]}, Rank Y for site 1 = ${q.rankY[0]}. d = Rank X - Rank Y`, worked: `d = ${q.rankX[0]} - ${q.rankY[0]} = ${q.d[0]}` },
    { label: "Calculate d squared", question: `What is d squared (d2) for site 1 where d = ${q.d[0]}?`, answer: q.d2[0], hint: `d2 = d x d = ${q.d[0]} x ${q.d[0]}`, worked: `${q.d[0]} x ${q.d[0]} = ${q.d2[0]}` },
    { label: "Sum all d squared values", question: "What is the sum of all d squared values (sum of d2)?", answer: q.sumD2, hint: `Add all d2 values together: ${q.d2.join(' + ')}`, worked: `${q.d2.join(' + ')} = ${q.sumD2}` },
    { label: "Apply the formula", question: `rs = 1 - (6 x ${q.sumD2}) / (${n} x (${n}2 - 1)). What is rs rounded to 2 decimal places?`, answer: q.rsRounded, hint: `rs = 1 - (6 x ${q.sumD2}) / (${n} x (${n * n} - 1)) = 1 - ${6 * q.sumD2} / ${n * (n * n - 1)}`, worked: `rs = 1 - ${6 * q.sumD2} / ${n * (n * n - 1)} = 1 - ${(6 * q.sumD2 / (n * (n * n - 1))).toFixed(4)} = ${q.rsRounded}` },
  ];

  const currentStep = steps[step];

  const generateOptions = (answer) => {
    if (answer === 6) return [1, 3, 4, 6];
    const offsets = [-0.3, -0.15, 0, 0.2];
    const raw = offsets.map(o => parseFloat((answer + o).toFixed(2)));
    const opts = [...new Set([...raw, answer])].sort((a, b) => a - b);
    return opts.slice(0, 4).includes(answer) ? opts.slice(0, 4) : [...opts.slice(0, 3), answer].sort((a, b) => a - b);
  };

  const options = generateOptions(currentStep.answer);
  const isCorrect = selected === currentStep.answer;

  const handleNext = () => {
    const newScore = score + (isCorrect ? 1 : 0);
    if (step + 1 >= steps.length) {
      if (qIndex + 1 >= SPR_QUESTIONS.length) {
        setScore(newScore);
        saveProgress("spearman", `${newScore}/${SPR_QUESTIONS.length * steps.length}`);
        onComplete(`${newScore}/${SPR_QUESTIONS.length * steps.length}`);
        setDone(true);
      } else {
        setScore(newScore);
        setQIndex(i => i + 1);
        setStep(0);
        setSelected(null);
        setSubmitted(false);
        setShowHelp(false);
      }
    } else {
      setScore(newScore);
      setStep(s => s + 1);
      setSelected(null);
      setSubmitted(false);
      setShowHelp(false);
    }
  };

  if (done) return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", padding: "3rem 1rem" }}>
      <div style={{ fontSize: "64px", marginBottom: "1rem" }}>{score === SPR_QUESTIONS.length * steps.length ? "🎉" : score >= SPR_QUESTIONS.length * 3 ? "⭐" : "📚"}</div>
      <h3 style={{ fontSize: "22px", fontWeight: "500", marginBottom: "8px" }}>Spearman's Rank complete!</h3>
      <div style={{ display: "inline-block", background: score === SPR_QUESTIONS.length * steps.length ? "#ecfdf5" : score >= SPR_QUESTIONS.length * 3 ? "#fffbeb" : "#fef2f2", border: `0.5px solid ${score === SPR_QUESTIONS.length * steps.length ? "#a7f3d0" : score >= SPR_QUESTIONS.length * 3 ? "#fde68a" : "#fecaca"}`, borderRadius: "99px", padding: "6px 20px", marginBottom: "1rem" }}>
        <span style={{ fontSize: "20px", fontWeight: "500", color: score === SPR_QUESTIONS.length * steps.length ? "#065f46" : score >= SPR_QUESTIONS.length * 3 ? "#92400e" : "#991b1b" }}>{score}/{SPR_QUESTIONS.length * steps.length} correct</span>
      </div>
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "2rem", lineHeight: 1.6 }}>
        {score === SPR_QUESTIONS.length * steps.length ? "Perfect score - outstanding work!" : score >= SPR_QUESTIONS.length * 3 ? "Good effort - review the ones you missed and try again." : "Keep practising - go back to the explainer and try again."}
      </p>
      <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "12px 14px", marginBottom: "2rem", fontSize: "13px", color: "#1d4ed8", lineHeight: 1.6, textAlign: "left" }}>
        <p style={{ fontWeight: "500", marginBottom: "6px" }}>Quick reminder - interpreting rs values:</p>
        <p style={{ margin: "2px 0" }}>+1.0 = perfect positive correlation</p>
        <p style={{ margin: "2px 0" }}>+0.7 to +0.9 = strong positive</p>
        <p style={{ margin: "2px 0" }}>0 = no correlation</p>
        <p style={{ margin: "2px 0" }}>-0.7 to -0.9 = strong negative</p>
        <p style={{ margin: "2px 0" }}>-1.0 = perfect negative correlation</p>
      </div>
      <button onClick={onBack} style={{ padding: "12px 32px", borderRadius: "8px", border: "none", background: "#D85A30", color: "#fff", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}>Back to Maths Skills</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", paddingBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
        <button onClick={onBack} style={{ background: "transparent", border: "0.5px solid #d1d5db", borderRadius: "8px", padding: "6px 10px", fontSize: "13px", color: "#6b7280", cursor: "pointer" }}>- Back</button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>SPEARMAN'S RANK</p>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Dataset {qIndex + 1} of {SPR_QUESTIONS.length} - Step {step + 1} of {steps.length}</p>
        </div>
        <div style={{ fontSize: "12px", color: "#6b7280" }}>{score} correct</div>
      </div>

      <div style={{ display: "flex", gap: "4px", marginBottom: "1rem" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ flex: 1, height: "4px", borderRadius: "99px", background: i < step ? "#1D9E75" : i === step ? "#D85A30" : "#e5e7eb" }} />
        ))}
      </div>

      <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "10px 12px", marginBottom: "1rem" }}>
        <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px", fontWeight: "500" }}>THE FORMULA</p>
        <p style={{ fontSize: "13px", fontFamily: "monospace", color: "#1a1a2e", margin: 0 }}>rs = 1 - (6 x sum of d2) / (n x (n2 - 1))</p>
        <p style={{ fontSize: "11px", color: "#9ca3af", margin: "4px 0 0" }}>where d = difference in ranks, n = number of data pairs</p>
      </div>

      <div style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: "8px", padding: "10px 12px", marginBottom: "8px" }}>
        <p style={{ fontSize: "11px", fontWeight: "500", color: "#185FA5", margin: "0 0 3px" }}>{q.context.toUpperCase()} - STEP {step + 1}: {currentStep.label.toUpperCase()}</p>
        <p style={{ fontSize: "13px", color: "#374151", margin: 0, lineHeight: 1.5 }}>{q.scenario}</p>
      </div>

      <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "10px", marginBottom: "1rem", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr>
              <th style={{ padding: "4px 6px", textAlign: "left", color: "#6b7280", fontWeight: "500" }}>Site</th>
              <th style={{ padding: "4px 6px", textAlign: "center", color: "#6b7280", fontWeight: "500" }}>{q.xLabel}</th>
              <th style={{ padding: "4px 6px", textAlign: "center", color: "#6b7280", fontWeight: "500" }}>{q.yLabel}</th>
              <th style={{ padding: "4px 6px", textAlign: "center", color: "#185FA5", fontWeight: "500" }}>Rank X</th>
              <th style={{ padding: "4px 6px", textAlign: "center", color: "#9333ea", fontWeight: "500" }}>Rank Y</th>
              <th style={{ padding: "4px 6px", textAlign: "center", color: "#D85A30", fontWeight: "500" }}>d</th>
              <th style={{ padding: "4px 6px", textAlign: "center", color: "#D85A30", fontWeight: "500" }}>d2</th>
            </tr>
          </thead>
          <tbody>
            {q.data.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                <td style={{ padding: "4px 6px", textAlign: "left", fontWeight: "500" }}>{row.site}</td>
                <td style={{ padding: "4px 6px", textAlign: "center" }}>{row.x}</td>
                <td style={{ padding: "4px 6px", textAlign: "center" }}>{row.y}</td>
                <td style={{ padding: "4px 6px", textAlign: "center", color: step >= 0 ? "#185FA5" : "#9ca3af" }}>{step >= 0 ? q.rankX[i] : "?"}</td>
                <td style={{ padding: "4px 6px", textAlign: "center", color: step >= 0 ? "#9333ea" : "#9ca3af" }}>{step >= 0 ? q.rankY[i] : "?"}</td>
                <td style={{ padding: "4px 6px", textAlign: "center", color: step >= 1 ? "#D85A30" : "#9ca3af" }}>{step >= 1 ? q.d[i] : "?"}</td>
                <td style={{ padding: "4px 6px", textAlign: "center", color: step >= 2 ? "#D85A30" : "#9ca3af" }}>{step >= 2 ? q.d2[i] : "?"}</td>
              </tr>
            ))}
            {step >= 3 && (
              <tr style={{ borderTop: "1px solid #d1d5db" }}>
                <td colSpan={6} style={{ padding: "4px 6px", textAlign: "right", fontWeight: "500", fontSize: "12px" }}>Sum of d2 =</td>
                <td style={{ padding: "4px 6px", textAlign: "center", fontWeight: "500", color: "#D85A30" }}>{q.sumD2}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p style={{ fontWeight: "500", fontSize: "14px", marginBottom: "12px", color: "#1a1a2e" }}>{currentStep.question}</p>

      {!submitted && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1rem" }}>
          {options.map(opt => {
            const isSel = selected === opt;
            return (
              <button key={opt} onClick={() => setSelected(opt)} style={{ background: isSel ? "#fef3ee" : "#ffffff", border: isSel ? "2px solid #D85A30" : "0.5px solid #d1d5db", borderRadius: "8px", padding: "12px", fontSize: "16px", fontWeight: "500", color: isSel ? "#D85A30" : "#1a1a2e", cursor: "pointer", textAlign: "center" }}>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {submitted && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "1rem" }}>
          {options.map(opt => {
            let bg = "#ffffff", border = "0.5px solid #d1d5db", color = "#1a1a2e";
            if (opt === currentStep.answer) { bg = "#ecfdf5"; border = "0.5px solid #a7f3d0"; color = "#065f46"; }
            else if (opt === selected) { bg = "#fef2f2"; border = "0.5px solid #fecaca"; color = "#991b1b"; }
            return <div key={opt} style={{ background: bg, border, borderRadius: "8px", padding: "12px", fontSize: "16px", fontWeight: "500", color, textAlign: "center" }}>{opt}</div>;
          })}
        </div>
      )}

      {!submitted && (
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => setShowHelp(h => !h)} style={{ width: "100%", padding: "8px 12px", background: "#f0fdf4", border: "0.5px solid #a7f3d0", borderRadius: showHelp ? "8px 8px 0 0" : "8px", fontSize: "13px", color: "#065f46", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", fontWeight: "500" }}>
            <span>Need help? Show step-by-step</span><span>{showHelp ? "▲" : "▼"}</span>
          </button>
          {showHelp && (
            <div style={{ background: "#f0fdf4", border: "0.5px solid #a7f3d0", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "12px 14px" }}>
              <p style={{ fontSize: "13px", color: "#065f46", marginBottom: "6px" }}>{currentStep.hint}</p>
              <div style={{ background: "#dcfce7", borderRadius: "6px", padding: "8px 10px", fontFamily: "monospace", fontSize: "13px", color: "#065f46" }}>{currentStep.worked}</div>
            </div>
          )}
        </div>
      )}

      <Calculator />

      {!submitted && (
        <button onClick={() => { if (selected !== null) setSubmitted(true); }} disabled={selected === null} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "0.5px solid #d1d5db", background: selected !== null ? "#1a1a2e" : "#f3f4f6", color: selected !== null ? "#ffffff" : "#9ca3af", cursor: selected !== null ? "pointer" : "default", fontSize: "14px", fontWeight: "500", marginBottom: "1rem" }}>
          Check answer
        </button>
      )}

      {submitted && (
        <div>
          <div style={{ background: isCorrect ? "#ecfdf5" : "#fef2f2", border: `0.5px solid ${isCorrect ? "#a7f3d0" : "#fecaca"}`, borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px", color: isCorrect ? "#065f46" : "#991b1b" }}>
            {isCorrect ? "Correct!" : `Not quite - the answer is ${currentStep.answer}.`}
          </div>
          <div style={{ background: "#f3f4f6", borderRadius: "8px", padding: "12px 14px", marginBottom: "1rem", fontSize: "13px" }}>
            <p style={{ fontFamily: "monospace", color: "#1a1a2e", marginBottom: "6px" }}>{currentStep.worked}</p>
            {step === steps.length - 1 && <p style={{ color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{q.interpretation}</p>}
          </div>
          <button onClick={handleNext} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "none", background: "#D85A30", color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>
            {step + 1 < steps.length ? `Next step →` : qIndex + 1 >= SPR_QUESTIONS.length ? "See results" : "Next dataset →"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function MathsHub({ onBeachProfile }) {
  const [active, setActive] = useState(null);
  const [progress, setProgress] = useState(loadProgress());
  const [mathsKey, setMathsKey] = useState(0);

  const handleComplete = (score) => {
    setProgress(loadProgress());
  };

  const handleBack = () => {
    setActive(null);
    setProgress(loadProgress());
  };

  if (active === "beach") return onBeachProfile();
  if (active === "percentage") return <PercentageActivity key={mathsKey} onBack={handleBack} onComplete={handleComplete} />;
  if (active === "averages") return <AveragesActivity key={mathsKey} onBack={handleBack} onComplete={handleComplete} />;
  if (active === "spearman") return <SpearmanActivity key={mathsKey} onBack={handleBack} onComplete={handleComplete} />;

  return <Hub onStart={(id) => { setMathsKey(k => k + 1); setActive(id); }} progress={progress} />;
}