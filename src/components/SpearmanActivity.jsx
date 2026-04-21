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

export default function SpearmanActivity({ onBack, onComplete }) {
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
          <p style={{ fontFamily: "monospace", fontSize: "15px", color: "#ffffff", margin: 0 }}>rs = 1 - (6 × sum of d²) / (n × (n² - 1))</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { symbol: "rs", color: "#1D9E75", meaning: "The result - the correlation coefficient. Always between -1 and +1." },
            { symbol: "d", color: "#185FA5", meaning: "The difference between the rank of X and the rank of Y for each data pair." },
            { symbol: "d²", color: "#185FA5", meaning: "d² (d multiplied by itself). This removes negative values." },
            { symbol: "sum of d²", color: "#D85A30", meaning: "Add up all the d² values to get a single total." },
            { symbol: "n", color: "#9333ea", meaning: "The number of data pairs (e.g. 6 sites = n of 6)." },
            { symbol: "n²", color: "#9333ea", meaning: "n² (n multiplied by itself). If n = 6, then n² = 36." },
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
    { label: "Calculate d squared", question: `What is d² (d squared) for site 1 where d = ${q.d[0]}?`, answer: q.d2[0], hint: `d² = d x d = ${q.d[0]} x ${q.d[0]}`, worked: `${q.d[0]} x ${q.d[0]} = ${q.d2[0]}` },
    { label: "Sum all d squared values", question: "What is the sum of all d squared values (sum of d²)?", answer: q.sumD2, hint: `Add all d² values together: ${q.d2.join(' + ')}`, worked: `${q.d2.join(' + ')} = ${q.sumD2}` },
    { label: "Apply the formula", question: `rs = 1 - (6 × ${q.sumD2}) / (${n} × (${n}² - 1)). What is rs rounded to 2 decimal places?`, answer: q.rsRounded, hint: `⚠️ Watch out: n² means n × n (n squared), NOT the number ${n}2. Here n = ${n}, so n² = ${n} × ${n} = ${n*n}. So: rs = 1 - (6 x ${q.sumD2}) / (${n} x (${n*n} - 1)) = 1 - ${6 * q.sumD2} / ${n * (n * n - 1)}`, worked: `n² = ${n} × ${n} = ${n*n}. rs = 1 - ${6 * q.sumD2} / ${n * (n * n - 1)} = 1 - ${(6 * q.sumD2 / (n * (n * n - 1))).toFixed(4)} = ${q.rsRounded}` },
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
        <p style={{ fontSize: "13px", fontFamily: "monospace", color: "#1a1a2e", margin: 0 }}>rs = 1 - (6 × sum of d²) / (n × (n² - 1))</p>
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
              <th style={{ padding: "4px 6px", textAlign: "center", color: "#D85A30", fontWeight: "500" }}>d²</th>
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
                <td colSpan={6} style={{ padding: "4px 6px", textAlign: "right", fontWeight: "500", fontSize: "12px" }}>Sum of d² =</td>
                <td style={{ padding: "4px 6px", textAlign: "center", fontWeight: "500", color: "#D85A30" }}>{q.sumD2}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p style={{ fontWeight: "500", fontSize: "14px", marginBottom: "12px", color: "#1a1a2e" }}>{currentStep.question}</p>

      {step === 4 && (
        <div style={{ background: "#fffbeb", border: "0.5px solid #fde68a", borderRadius: "8px", padding: "10px 12px", marginBottom: "12px" }}>
          <p style={{ fontSize: "13px", color: "#92400e", margin: 0, lineHeight: 1.6 }}>
            ⚠️ <strong>Common mistake:</strong> In the formula, <strong>n²</strong> means <em>n × n</em> (n squared). If n = {n}, then n² = {n} × {n} = <strong>{n * n}</strong>. Do not read n² as a two-digit number like {`${n}2`} — it means n squared!
          </p>
        </div>
      )}

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