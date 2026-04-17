import { useState, useMemo } from 'react';

const FILTERS = [
  { id: 'all',         label: 'All' },
  { id: 'rivers',      label: 'Rivers' },
  { id: 'coasts',      label: 'Coasts' },
  { id: 'development', label: 'Development' },
  { id: 'india',       label: 'India' },
];

function Glossary({ allTopics }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const allTerms = useMemo(() => {
    const terms = [];
    allTopics.forEach((topic) => {
      topic.terms.forEach((t) => {
        terms.push({ ...t, category: topic.category });
      });
    });
    const seen = new Set();
    return terms.filter((t) => {
      if (seen.has(t.term)) return false;
      seen.add(t.term);
      return true;
    }).sort((a, b) => a.term.localeCompare(b.term));
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
        All key terms across both units — learn the definitions before your exam!
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
            <dd className="glossary-def">{t.def}</dd>
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