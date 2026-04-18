import { useState } from 'react';

const THEORIES = [
  {
    id: 'rostow',
    emoji: '📈',
    name: "Rostow's Modernisation Theory",
    year: '1960',
    tagline: '"Every country can develop, just follow our path."',
    colour: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    plainEnglish: `Walt Rostow was an American economist who believed that ALL countries develop in the same way by following the path that Western countries (like the USA and UK) had already taken. He said development is like a journey with 5 stages, and every country will eventually reach the final stage of wealth and mass consumption if they invest in industry and trade.`,
    stages: [
      { n: '1', label: 'Traditional Society', desc: 'Farming-based, little technology, subsistence living.' },
      { n: '2', label: 'Pre-conditions for Take-Off', desc: 'Investment begins, infrastructure starts to develop.' },
      { n: '3', label: 'Take-Off 🚀', desc: 'Rapid industrialisation. Like the UK Industrial Revolution.' },
      { n: '4', label: 'Drive to Maturity', desc: 'Economy diversifies, technology spreads.' },
      { n: '5', label: 'Mass Consumption', desc: 'High wages, consumer goods, welfare state. Like the USA today.' },
    ],
    criticism: 'Rostow assumes ALL countries follow the same path. It ignores the fact that Western countries got rich partly by exploiting poorer ones through colonialism. Not every country has followed these stages.',
    examUse: 'Use Rostow when asked about top-down development, modernisation, or why some economists think LICs just need investment and time to develop.',
  },
  {
    id: 'frank',
    emoji: '🔗',
    name: "Frank's Dependency Theory",
    year: '1967',
    tagline: '"You\'re not poor despite us, you\'re poor BECAUSE of us."',
    colour: '#9333ea',
    bg: '#fdf4ff',
    border: '#e9d5ff',
    plainEnglish: `André Gunder Frank was a German-American economist who completely disagreed with Rostow. He argued that rich countries (the "core") are only wealthy BECAUSE they exploit poor countries (the "periphery") through unfair trade, debt, and control. LICs can't just "follow the path" because the system is deliberately set up to keep them poor and dependent on HICs.`,
    stages: [
      { n: '🌍', label: 'The Core (HICs)', desc: 'Wealthy countries: USA, UK, Europe. Control global trade rules and finance.' },
      { n: '🌱', label: 'The Periphery (LICs)', desc: 'Poor countries. Forced to export cheap raw materials and import expensive manufactured goods.' },
      { n: '💸', label: 'The Flow of Wealth', desc: 'Money, resources and profits flow FROM the periphery TO the core, keeping LICs poor.' },
      { n: '⛓️', label: 'Neo-colonialism', desc: 'HICs still control LICs through debt, trade rules and TNCs. Even without direct rule.' },
    ],
    criticism: 'Frank\'s theory can seem too negative. It suggests LICs can never escape poverty without a complete break from the global system. Some countries (like South Korea, China) have developed rapidly within the global system.',
    examUse: 'Use Frank when asked about inequality, why trade keeps LICs poor, bottom-up development, or to criticise Rostow. The Malawi tariff example is perfect evidence for Frank\'s theory.',
  },
];

const COMPARISON = [
  { aspect: 'Attitude', rostow: 'Optimistic - all countries will develop', frank: 'Pessimistic - the system keeps LICs poor' },
  { aspect: 'Who\'s to blame?', rostow: 'Nobody - it just takes time', frank: 'HICs - they exploit LICs deliberately' },
  { aspect: 'Solution', rostow: 'Investment, industry, follow the West', frank: 'Break free from HIC control, trade with other LICs' },
  { aspect: 'Development type', rostow: 'Top-down (big projects, foreign investment)', frank: 'Bottom-up (local, community-led)' },
  { aspect: 'Real world example', rostow: 'Narmada Dam (India) large top-down project', frank: 'SEWA / Malawi tariffs - exploited by global trade rules' },
];

function TheoryCard({ theory }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="theory-card" style={{ '--theory-colour': theory.colour, '--theory-bg': theory.bg, '--theory-border': theory.border }}>
      <button className="theory-card-header" onClick={() => setOpen(o => !o)}>
        <div className="theory-header-left">
          <span className="theory-emoji">{theory.emoji}</span>
          <div>
            <p className="theory-name">{theory.name} <span className="theory-year">({theory.year})</span></p>
            <p className="theory-tagline">{theory.tagline}</p>
          </div>
        </div>
        <span className="theory-toggle">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="theory-body">
          <p className="theory-plain">{theory.plainEnglish}</p>

          <div className="theory-stages">
            {theory.stages.map((s, i) => (
              <div key={i} className="theory-stage">
                <span className="theory-stage-n">{s.n}</span>
                <div>
                  <p className="theory-stage-label">{s.label}</p>
                  <p className="theory-stage-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="theory-criticism">
            <span className="theory-criticism-label">⚠️ Criticism</span>
            <p>{theory.criticism}</p>
          </div>

          <div className="theory-exam-use">
            <span className="theory-exam-label">📝 When to use this in an exam</span>
            <p>{theory.examUse}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function KeyTheories() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="key-theories-banner">
      <div className="key-theories-header">
        <div>
          <h2 className="key-theories-title">📖 Key Theories to Know</h2>
          <p className="key-theories-subtitle">These two theories come up constantly in exams. Make sure you know both and can compare them!</p>
        </div>
      </div>

      <div className="key-theories-cards">
        {THEORIES.map(t => <TheoryCard key={t.id} theory={t} />)}
      </div>

      <button className="theory-compare-btn" onClick={() => setShowComparison(o => !o)}>
        {showComparison ? '▲ Hide comparison' : '⚖️ Compare Rostow vs Frank side by side'}
      </button>

      {showComparison && (
        <div className="theory-comparison">
          <h3 className="theory-comparison-title">Rostow vs Frank at a glance</h3>
          <div className="theory-comparison-table">
            <div className="theory-comparison-row theory-comparison-row--header">
              <span></span>
              <span style={{ color: '#d97706' }}>📈 Rostow</span>
              <span style={{ color: '#9333ea' }}>🔗 Frank</span>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} className="theory-comparison-row">
                <span className="theory-comparison-aspect">{row.aspect}</span>
                <span className="theory-comparison-cell">{row.rostow}</span>
                <span className="theory-comparison-cell">{row.frank}</span>
              </div>
            ))}
          </div>
          <div className="theory-memory-tip">
            <strong>💡 Memory tip:</strong> Rostow = hopeful ladder 🪜 (climb the steps and you'll get there). Frank = broken chain ⛓️ (HICs are holding LICs back).
          </div>
        </div>
      )}
    </div>
  );
}

export default KeyTheories;