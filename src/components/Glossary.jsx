import { useState, useMemo } from 'react';

const FILTERS = [
  { id: 'all',         label: 'All' },
  { id: 'rivers',      label: 'Rivers' },
  { id: 'coasts',      label: 'Coasts' },
  { id: 'development', label: 'Development' },
  { id: 'india',       label: 'India' },
];

const CATEGORY_COLORS = {
  rivers:       { color: '#2563eb', bg: '#eff6ff' },
  coasts:       { color: '#059669', bg: '#ecfdf5' },
  development:  { color: '#d97706', bg: '#fffbeb' },
  india:        { color: '#9333ea', bg: '#fdf4ff' },
  hazardous:    { color: '#e11d48', bg: '#fff1f2' },
  urbanisation: { color: '#16a34a', bg: '#f0fdf4' },
};

function Glossary({ allTopics, onSelectTopic }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const allTerms = useMemo(() => {
    const terms = [];
    allTopics.forEach((topic) => {
      topic.terms.forEach((t) => {
        terms.push({
          ...t,
          category: topic.category,
          topicId: topic.id,
          topicTitle: topic.title,
        });
      });
    });
    // Deduplicate by term name but keep ALL topic references
    const seen = new Map();
    terms.forEach((t) => {
      if (seen.has(t.term)) {
        // Add this topic as an additional source if not already listed
        const existing = seen.get(t.term);
        if (!existing.sources.find(s => s.topicId === t.topicId)) {
          existing.sources.push({ topicId: t.topicId, topicTitle: t.topicTitle, category: t.category });
        }
      } else {
        seen.set(t.term, {
          term: t.term,
          def: t.def,
          category: t.category,
          sources: [{ topicId: t.topicId, topicTitle: t.topicTitle, category: t.category }],
        });
      }
    });
    return Array.from(seen.values()).sort((a, b) => a.term.localeCompare(b.term));
  }, [allTopics]);

  const filtered = useMemo(() => {
    return allTerms.filter((t) => {
      const matchesFilter = activeFilter === 'all' || t.category === activeFilter;
      const matchesSearch =
        search.trim() === '' ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.def.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [allTerms, activeFilter, search]);

  return (
    <div className="glossary-view">
      <p className="view-intro">
        All key terms across both units - tap any topic chip to jump straight to that card.
      </p>

      <input
        className="search-input"
        type="text"
        placeholder="Search terms or definitions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-row">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="results-count">{filtered.length} terms</p>

      <dl className="glossary-list">
        {filtered.map((t, i) => (
          <div key={i} className={`glossary-item glossary-item--${t.category}`}>
            <dt className="glossary-term">{t.term}</dt>
            <dd className="glossary-def">
              {t.def}
              {onSelectTopic && t.sources.length > 0 && (
                <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {t.sources.map((src) => {
                    const col = CATEGORY_COLORS[src.category] || { color: '#6b7280', bg: '#f3f4f6' };
                    return (
                      <button
                        key={src.topicId}
                        onClick={() => onSelectTopic(src.topicId)}
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          padding: '2px 8px',
                          borderRadius: '99px',
                          border: `1px solid ${col.color}22`,
                          background: col.bg,
                          color: col.color,
                          cursor: 'pointer',
                          lineHeight: 1.6,
                          transition: 'opacity 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        → {src.topicTitle}
                      </button>
                    );
                  })}
                </div>
              )}
            </dd>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="empty-state">No terms match your search.</p>
        )}
      </dl>
    </div>
  );
}

export default Glossary;