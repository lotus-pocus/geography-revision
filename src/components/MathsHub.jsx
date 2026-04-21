import { useState } from "react";
import PercentageActivity from "./PercentageActivity";
import AveragesActivity from "./AveragesActivity";
import SpearmanActivity from "./SpearmanActivity";

const STORAGE_KEY = "maths_progress_v1";

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
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
  },
  {
    id: "percentage",
    title: "Percentage Change",
    subtitle: "Calculate % increase and decrease",
    topic: "UK Human Landscape / Development",
    paper: "Paper 2 - Section B",
    color: "#185FA5",
    difficulty: "Easy",
  },
  {
    id: "averages",
    title: "Mean, Median & Range",
    subtitle: "Analysing data sets",
    topic: "Fieldwork Data Analysis",
    paper: "Paper 2 - Section C",
    color: "#9333ea",
    difficulty: "Easy",
  },
  {
    id: "spearman",
    title: "Spearman's Rank",
    subtitle: "Correlation between two variables",
    topic: "Fieldwork Correlation",
    paper: "Paper 2 - Section C",
    color: "#D85A30",
    difficulty: "Hard",
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

export default function MathsHub({ onBeachProfile }) {
  const [active, setActive] = useState(null);
  const [progress, setProgress] = useState(loadProgress());
  const [mathsKey, setMathsKey] = useState(0);

  const handleComplete = () => setProgress(loadProgress());

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