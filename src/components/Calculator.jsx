import { useState } from "react";

export default function Calculator() {
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

  const pressOp = (nextOp) => {
    const current = parseFloat(display);
    if (op !== null && prev !== null && !fresh) {
      let result;
      if (op === "+") result = prev + current;
      else if (op === "-") result = prev - current;
      else if (op === "x") result = prev * current;
      else if (op === "/") result = current !== 0 ? prev / current : "Error";
      const rounded = typeof result === "number" ? parseFloat(result.toFixed(4)) : result;
      setDisplay(String(rounded));
      setPrev(typeof rounded === "number" ? rounded : current);
    } else {
      setPrev(current);
    }
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
    setPrev(typeof rounded === "number" ? rounded : null);
    setOp(null);
    setFresh(true);
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