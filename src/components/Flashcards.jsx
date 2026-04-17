import { useState, useMemo } from 'react';

const CATEGORY_CONFIG = {
  hazardous:    { emoji: '🌋', label: 'Hazardous Earth', color: '#e11d48', bg: '#fff1f2' },
  urbanisation: { emoji: '🏙️', label: 'Urbanisation',    color: '#16a34a', bg: '#f0fdf4' },
  development:  { emoji: '🌍', label: 'Development',     color: '#d97706', bg: '#fffbeb' },
  india:        { emoji: '🇮🇳', label: 'India',           color: '#9333ea', bg: '#fdf4ff' },
  rivers:       { emoji: '🏞️', label: 'Rivers',          color: '#2563eb', bg: '#eff6ff' },
  coasts:       { emoji: '🌊', label: 'Coasts',          color: '#059669', bg: '#ecfdf5' },
};

const TERM_EMOJIS = {
  'Glaciation': '🧊', 'Till': '🪨', 'Waterfall': '💧', 'Meander': '〰️',
  'Ox-bow lake': '🌙', 'Floodplain': '🌾', 'Levée': '🏔️', 'Delta': '🔱',
  'Discharge': '📊', 'Lag time': '⏱️', 'Hydraulic action': '💥',
  'Abrasion': '⚙️', 'Attrition': '🪨', 'Storm hydrograph': '📈',
  'Longshore drift': '➡️', 'Spit': '🏖️', 'Stack': '🗿', 'Arch': '🌉',
  'Fetch': '🌬️', 'Constructive wave': '🏄', 'Destructive wave': '🌊',
  'Wave-cut platform': '🪨', 'Managed retreat': '🚶', 'Sea wall': '🧱',
  'Boulder clay': '🏔️', 'Storm surge': '🌊', 'Groyne': '🪵',
  'HDI': '📊', 'GDP': '💰', 'GNI': '💵', 'Colonialism': '🗺️',
  'Brain drain': '🧠', 'TNC': '🏢', 'Globalisation': '🌐',
  'Micro-finance': '💸', 'Dependency theory': '🔗', 'Modernisation theory': '📈',
  'NEE': '🚀', 'Dharavi': '🏘️', 'Caste system': '⚖️', 'Kerala': '🌴',
  'SEWA': '👩', 'Narmada Dam': '🏗️', 'Monsoon': '🌧️',
  'Tectonic plate': '🌍', 'Earthquake': '📳', 'Tsunami': '🌊',
  'Volcano': '🌋', 'Pyroclastic flow': '🔥', 'Richter scale': '📏',
  'Greenhouse effect': '🌡️', 'CO₂': '☁️', 'Sea level rise': '📈',
  'Coral bleaching': '🐠', 'Tipping point': '⚠️', 'Ice core': '🧊',
  'Tropical cyclone': '🌀', 'Storm surge (cyclone)': '🌊', 'Eye': '👁️',
  'Megacity': '🏙️', 'Urbanisation': '🏗️', 'Slum': '🏚️',
  'Rural-urban migration': '🚶', 'Push factor': '👋', 'Pull factor': '🧲',
  'Deindustrialisation': '🏭', 'Gini coefficient': '📊',
};

function getEmoji(term) {
  return TERM_EMOJIS[term] || '📚';
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function Flashcards({ allTopics }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);

  const allCards = useMemo(() => {
    const cards = [];
    allTopics.forEach((topic) => {
      topic.terms.forEach((t) => {
        cards.push({ term: t.term, def: t.def, category: topic.category, topicTitle: topic.title });
      });
    });
    const seen = new Set();
    return cards.filter((c) => {
      if (seen.has(c.term)) return false;
      seen.add(c.term);
      return true;
    });
  }, [allTopics]);

  const [deck, setDeck] = useState(() => shuffle(allCards));

  const filteredDeck = useMemo(() => {
    if (activeFilter === 'all') return deck;
    return deck.filter((c) => c.category === activeFilter);
  }, [deck, activeFilter]);

  const current = filteredDeck[cardIndex] || null;
  const isFinished = cardIndex >= filteredDeck.length - 1 && flipped;
  const config = current ? (CATEGORY_CONFIG[current.category] || {}) : {};

  const handleFilter = (f) => {
    setActiveFilter(f);
    setCardIndex(0);
    setFlipped(false);
    setCorrect([]);
    setIncorrect([]);
  };

  const handleFlip = () => setFlipped((f) => !f);

  const handleResult = (knew) => {
    if (knew) setCorrect((c) => [...c, current.term]);
    else setIncorrect((c) => [...c, current.term]);
    setFlipped(false);
    setTimeout(() => setCardIndex((i) => Math.min(i + 1, filteredDeck.length - 1)), 150);
  };

  const handleRestart = () => {
    setDeck(shuffle(allCards));
    setCardIndex(0);
    setFlipped(false);
    setCorrect([]);
    setIncorrect([]);
    if (activeFilter !== 'all') setActiveFilter('all');
  };

  const totalSeen = correct.length + incorrect.length;
  const pct = totalSeen > 0 ? Math.round((correct.length / totalSeen) * 100) : null;

  if (!current) {
    return <div className="flashcards-view"><p className="view-intro">No cards for this category.</p></div>;
  }

  const emoji = getEmoji(current.term);

  return (
    <div className="flashcards-view">
      <p className="view-intro">
        Tap a card to flip it — then mark whether you knew it! 🎯 Great for phone revision.
      </p>

      <div className="fc-filter-row">
        <button
          className={`fc-cat-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilter('all')}
        >
          🗂️ All
        </button>
        {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
          <button
            key={key}
            className={`fc-cat-btn ${activeFilter === key ? 'active' : ''}`}
            style={activeFilter === key ? { background: cfg.bg, borderColor: cfg.color, color: cfg.color } : {}}
            onClick={() => handleFilter(key)}
          >
            {cfg.emoji} {cfg.label}
          </button>
        ))}
      </div>

      <div className="fc-progress-row">
        <div className="fc-progress-track">
          <div
            className="fc-progress-fill"
            style={{ width: `${((cardIndex) / filteredDeck.length) * 100}%` }}
          />
        </div>
        <span className="fc-count">{cardIndex + 1} / {filteredDeck.length}</span>
      </div>

      {totalSeen > 0 && (
        <div className="fc-score-row">
          <span className="fc-score-got">✅ {correct.length} knew it</span>
          <span className="fc-score-missed">❌ {incorrect.length} missed</span>
          {pct !== null && <span className="fc-score-pct">{pct}%</span>}
        </div>
      )}

      <div
        className={`fc-card ${flipped ? 'fc-card--flipped' : ''}`}
        onClick={handleFlip}
        style={{ '--card-color': config.color || '#1a1a2e', '--card-bg': config.bg || '#f9fafb' }}
      >
        <div className="fc-card-front">
          <div className="fc-card-emoji">{emoji}</div>
          <span className="fc-cat-tag">{config.emoji} {config.label}</span>
          <p className="fc-term">{current.term}</p>
          <p className="fc-topic-hint">{current.topicTitle}</p>
          <span className="fc-tap-hint">👆 Tap to reveal definition</span>
        </div>

        <div className="fc-card-back">
          <div className="fc-card-emoji">{emoji}</div>
          <p className="fc-def">{current.def}</p>
          <span className="fc-tap-hint">👆 Tap to see term again</span>
        </div>
      </div>

      {flipped && !isFinished && (
        <div className="fc-knew-row">
          <p className="fc-knew-label">Did you know it?</p>
          <div className="fc-knew-btns">
            <button className="fc-knew-btn fc-knew-btn--no" onClick={() => handleResult(false)}>
              ❌ Not quite
            </button>
            <button className="fc-knew-btn fc-knew-btn--yes" onClick={() => handleResult(true)}>
              ✅ Got it!
            </button>
          </div>
        </div>
      )}

      {isFinished && cardIndex === filteredDeck.length - 1 && (
        <div className="fc-finished">
          <p className="fc-finished-title">🎉 Round complete!</p>
          <p className="fc-finished-score">
            You knew <strong>{correct.length}</strong> out of {filteredDeck.length} — {pct}%
          </p>
          <p className="fc-finished-msg">
            {pct >= 80 ? '🌟 Amazing — you really know these!' :
             pct >= 60 ? '👍 Good effort — review the ones you missed.' :
             '📖 Keep going — every round you\'ll improve!'}
          </p>
          <button className="fc-restart-btn" onClick={handleRestart}>
            🔀 Shuffle and go again
          </button>
        </div>
      )}

      {!flipped && (
        <div className="fc-nav">
          <button className="fc-nav-btn" onClick={() => { setFlipped(false); setCardIndex(i => Math.max(i-1,0)); }} disabled={cardIndex === 0}>
            ← Back
          </button>
          <button className="fc-nav-btn fc-nav-btn--skip" onClick={() => { setFlipped(false); setCardIndex(i => Math.min(i+1, filteredDeck.length-1)); }} disabled={cardIndex >= filteredDeck.length - 1}>
            Skip →
          </button>
        </div>
      )}
    </div>
  );
}

export default Flashcards;