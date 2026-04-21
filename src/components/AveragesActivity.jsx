import { useState } from "react";
import Calculator from "./Calculator";

const STORAGE_KEY = "maths_progress_v1";

function saveProgress(key, score) {
  try {
    const p = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    p[key] = { score, completedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {}
}

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

export default function AveragesActivity({ onBack, onComplete }) {
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