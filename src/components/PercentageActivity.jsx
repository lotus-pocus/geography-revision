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

const PCT_QUESTIONS = [
  { id: "p1", context: "Urbanising World", scenario: "A city's population grew from 2,000,000 to 2,160,000 over 10 years.", oldVal: 2000000, newVal: 2160000, answer: 8, hint: "Formula: ((new - old) / old) x 100. So ((2,160,000 - 2,000,000) / 2,000,000) x 100", worked: "((2,160,000 - 2,000,000) / 2,000,000) x 100 = (160,000 / 2,000,000) x 100 = 0.08 x 100 = 8%", explanation: "The city grew by 8%. This is typical of re-urbanisation in UK cities where regeneration attracts people back to city centres." },
  { id: "p2", context: "UK Human Landscape - FDI", scenario: "Foreign Direct Investment into London rose from £416 billion to £661 billion between 2015 and 2019.", oldVal: 416, newVal: 661, answer: 58.9, hint: "Formula: ((new - old) / old) x 100. So ((661 - 416) / 416) x 100", worked: "((661 - 416) / 416) x 100 = (245 / 416) x 100 = 0.589 x 100 = 58.9%", explanation: "London's FDI grew by nearly 59% - far outpacing other UK regions, which reflects London's dominance as a global financial centre." },
  { id: "p3", context: "Global Development - Malawi", scenario: "Malawi's GDP per capita increased from $340 to $399 over 5 years.", oldVal: 340, newVal: 399, answer: 17.4, hint: "Formula: ((new - old) / old) x 100. So ((399 - 340) / 340) x 100", worked: "((399 - 340) / 340) x 100 = (59 / 340) x 100 = 0.1735 x 100 = 17.4%", explanation: "17.4% growth sounds impressive but from a very low base - Malawi remains one of the world's poorest countries despite this increase." },
  { id: "p4", context: "Coastal Change - Holderness", scenario: "The Holderness coastline eroded from 3.2km of cliff to 2.9km remaining over 20 years.", oldVal: 3.2, newVal: 2.9, answer: -9.4, hint: "This is a decrease! Formula: ((new - old) / old) x 100. ((2.9 - 3.2) / 3.2) x 100 gives a negative answer showing a decrease.", worked: "((2.9 - 3.2) / 3.2) x 100 = (-0.3 / 3.2) x 100 = -0.09375 x 100 = -9.4%", explanation: "-9.4% means the cliff decreased by 9.4% - a significant loss. Holderness loses up to 2 metres per year, the fastest eroding coast in Europe." },
  { id: "p5", context: "River Processes - Flooding", scenario: "River discharge increased from 45 cumecs to 312 cumecs during a storm event.", oldVal: 45, newVal: 312, answer: 593.3, hint: "Formula: ((new - old) / old) x 100. ((312 - 45) / 45) x 100", worked: "((312 - 45) / 45) x 100 = (267 / 45) x 100 = 5.933 x 100 = 593.3%", explanation: "A 593% increase! This dramatic rise in discharge is what causes flooding - the river channel cannot cope with this volume of water." },
];

export default function PercentageActivity({ onBack, onComplete }) {
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