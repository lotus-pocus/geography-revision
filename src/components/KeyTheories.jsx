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
  {
    id: 'dtm',
    emoji: '👶',
    name: 'Demographic Transition Model (DTM)',
    year: '1929',
    tagline: '"As countries develop, their birth and death rates change in a predictable pattern."',
    colour: '#0891b2',
    bg: '#f0f9ff',
    border: '#bae6fd',
    plainEnglish: `The Demographic Transition Model (DTM) was developed by Warren Thompson in 1929. It shows how birth rates and death rates change as a country develops economically. As countries get richer, death rates fall first (better healthcare), then birth rates fall too (education, women working). The result is that population grows in the middle stages, then stabilises. It links population change directly to development - so it's both a population model AND a development model.`,
    stages: [
      { n: '1', label: 'High Fluctuating', desc: 'High birth rate AND high death rate. Population stays low and unstable. E.g. pre-industrial societies. Few countries are here today.' },
      { n: '2', label: 'Early Expanding', desc: 'Death rate falls sharply (better sanitation, medicine, food). Birth rate stays high. Population grows FAST. E.g. many LICs like Mali.' },
      { n: '3', label: 'Late Expanding', desc: 'Birth rate begins to fall (women educated, contraception, less need for child labour). Death rate stays low. Growth slows. E.g. India, Brazil (NEEs).' },
      { n: '4', label: 'Low Fluctuating', desc: 'Both birth rate AND death rate are low. Population is large but stable. E.g. UK, USA, most HICs.' },
      { n: '5', label: 'Decline (not always shown)', desc: 'Birth rate drops BELOW death rate. Population shrinks. E.g. Japan, Germany. This stage was added later.' },
    ],
    criticism: 'The DTM was based on Western European history and assumes all countries follow the same path - similar to Rostow\'s flaw. Some countries (e.g. in sub-Saharan Africa) have stayed in Stage 2 longer than expected. It also doesn\'t account for migration, which can dramatically change population size.',
    examUse: 'Use the DTM when asked about population change, birth/death rates, or how development affects population. You might be given a graph and asked to identify the stage - look at whether birth rate, death rate, or both are high or low. Link it to development: Stage 2/3 = LIC/NEE, Stage 4 = HIC.',
  },
];

const COMPARISON = [
  { aspect: 'What it explains', rostow: 'How economies develop through stages', frank: 'Why rich countries keep poor countries poor', dtm: 'How birth/death rates change as countries develop' },
  { aspect: 'Attitude', rostow: 'Optimistic - all countries will develop', frank: 'Pessimistic - the system keeps LICs poor', dtm: 'Neutral - describes a pattern, not a cause' },
  { aspect: 'Who\'s to blame?', rostow: 'Nobody - it just takes time', frank: 'HICs - they exploit LICs deliberately', dtm: 'Nobody - it\'s a natural demographic process' },
  { aspect: 'Solution', rostow: 'Investment, industry, follow the West', frank: 'Break free from HIC control, trade with other LICs', dtm: 'Education, healthcare, women\'s rights speed up transition' },
  { aspect: 'Development type', rostow: 'Top-down (big projects, foreign investment)', frank: 'Bottom-up (local, community-led)', dtm: 'Not prescriptive - describes outcomes of development' },
  { aspect: 'Real world example', rostow: 'Narmada Dam (India) - large top-down project', frank: 'Malawi tariffs - exploited by global trade rules', dtm: 'India in Stage 3 (falling birth rate as it develops)' },
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
          <p className="key-theories-subtitle">These theories come up constantly in exams. Make sure you know all three and can compare them!</p>
        </div>
      </div>

      <div className="key-theories-cards">
        {THEORIES.map(t => <TheoryCard key={t.id} theory={t} />)}
      </div>

      <button className="theory-compare-btn" onClick={() => setShowComparison(o => !o)}>
        {showComparison ? '▲ Hide comparison' : '⚖️ Compare all three theories side by side'}
      </button>

      {showComparison && (
        <div className="theory-comparison">
          <h3 className="theory-comparison-title">Rostow vs Frank vs DTM at a glance</h3>
          <div className="theory-comparison-table theory-comparison-table--three">
            <div className="theory-comparison-row theory-comparison-row--header">
              <span></span>
              <span style={{ color: '#d97706' }}>📈 Rostow</span>
              <span style={{ color: '#9333ea' }}>🔗 Frank</span>
              <span style={{ color: '#0891b2' }}>👶 DTM</span>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} className="theory-comparison-row">
                <span className="theory-comparison-aspect">{row.aspect}</span>
                <span className="theory-comparison-cell">{row.rostow}</span>
                <span className="theory-comparison-cell">{row.frank}</span>
                <span className="theory-comparison-cell">{row.dtm}</span>
              </div>
            ))}
          </div>
          <div className="theory-memory-tip">
            <strong>💡 Memory tips:</strong> Rostow = hopeful ladder 🪜 (climb the steps and you'll get there). Frank = broken chain ⛓️ (HICs are holding LICs back). DTM = a graph with two lines 📉📈 (death rate drops first, then birth rate follows).
          </div>
        </div>
      )}
    </div>
  );
}

export default KeyTheories;