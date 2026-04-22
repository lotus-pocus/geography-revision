import { useState, useMemo, useRef, useEffect } from 'react';

const CATEGORY_LABELS = {
  hazardous:    { label: 'Hazardous Earth',   color: '#e11d48', bg: '#fff1f2' },
  urbanisation: { label: 'Urbanising World',  color: '#16a34a', bg: '#f0fdf4' },
  development:  { label: 'Global Development',color: '#d97706', bg: '#fffbeb' },
  india:        { label: 'India Case Study',  color: '#9333ea', bg: '#fdf4ff' },
  rivers:       { label: 'Rivers',            color: '#2563eb', bg: '#eff6ff' },
  coasts:       { label: 'Coasts',            color: '#059669', bg: '#ecfdf5' },
};

function highlight(text, query) {
  if (!query || !text) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: '#fef08a', color: '#1a1a2e', borderRadius: '2px', padding: '0 2px' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function getSnippet(topic, query) {
  const q = query.toLowerCase();
  // Check points
  for (const point of topic.points || []) {
    if (point.toLowerCase().includes(q)) {
      return { source: 'Key point', text: point };
    }
  }
  // Check terms
  for (const term of topic.terms || []) {
    if (term.term.toLowerCase().includes(q) || term.def.toLowerCase().includes(q)) {
      return { source: 'Key term', text: `${term.term}: ${term.def}` };
    }
  }
  // Check examTip
  if (topic.examTip && topic.examTip.toLowerCase().includes(q)) {
    return { source: 'Exam tip', text: topic.examTip };
  }
  return null;
}

function scoreMatch(topic, query) {
  const q = query.toLowerCase();
  let score = 0;
  if (topic.title.toLowerCase().includes(q)) score += 10;
  for (const p of topic.points || []) if (p.toLowerCase().includes(q)) score += 3;
  for (const t of topic.terms || []) {
    if (t.term.toLowerCase().includes(q)) score += 5;
    if (t.def.toLowerCase().includes(q)) score += 2;
  }
  if (topic.examTip && topic.examTip.toLowerCase().includes(q)) score += 1;
  return score;
}

export default function Search({ allTopics, onSelectTopic }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus on mount
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const results = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    return allTopics
      .map(topic => ({ topic, score: scoreMatch(topic, q) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ topic }) => topic);
  }, [query, allTopics]);

  const q = query.trim();
  const showResults = q.length >= 2;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>

      {/* Header */}
      <p className="view-intro" style={{ marginBottom: '1rem' }}>
        Type anything — a topic, keyword, case study, or term. Results search across all titles, bullet points, key terms, and exam tips.
      </p>

      {/* Search input */}
      <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
        <span style={{
          position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
          fontSize: '16px', pointerEvents: 'none', opacity: 0.5
        }}>🔍</span>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="e.g. cow dung, meander, HDI, Holderness..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ paddingLeft: '38px', fontSize: '1rem', marginBottom: 0 }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px',
              color: '#9ca3af', padding: '4px', lineHeight: 1
            }}
          >✕</button>
        )}
      </div>

      {/* Results count */}
      {showResults && (
        <p className="results-count" style={{ marginBottom: '0.75rem' }}>
          {results.length === 0
            ? `No results for "${q}"`
            : `${results.length} result${results.length !== 1 ? 's' : ''} for "${q}"`
          }
        </p>
      )}

      {/* No results state */}
      {showResults && results.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '2.5rem 1rem',
          background: '#f9fafb', borderRadius: '14px', border: '1px solid #e5e7eb'
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤔</p>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6 }}>
            Nothing matched "<strong>{q}</strong>".<br />
            Try a different word — or check the spelling.
          </p>
        </div>
      )}

      {/* Results list */}
      {results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {results.map(topic => {
            const cat = CATEGORY_LABELS[topic.category] || { label: topic.category, color: '#6b7280', bg: '#f9fafb' };
            const snippet = getSnippet(topic, q);
            return (
              <button
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                style={{
                  width: '100%', textAlign: 'left', background: '#ffffff',
                  border: '1.5px solid #e5e7eb', borderRadius: '12px',
                  padding: '0.9rem 1rem', cursor: 'pointer',
                  transition: 'all 0.15s ease', display: 'flex',
                  flexDirection: 'column', gap: '6px',
                  borderTop: `3px solid ${cat.color}`,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                {/* Topic title + category badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: '600', padding: '2px 8px',
                    borderRadius: '99px', background: cat.bg, color: cat.color, flexShrink: 0
                  }}>
                    {cat.label}
                  </span>
                  {topic.isCaseStudy && (
                    <span style={{
                      fontSize: '0.7rem', background: '#fef3c7', color: '#92400e',
                      padding: '2px 8px', borderRadius: '99px', flexShrink: 0
                    }}>Case Study</span>
                  )}
                </div>

                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a2e', margin: 0, lineHeight: 1.4 }}>
                  {highlight(topic.title, q)}
                </p>

                {/* Matching snippet */}
                {snippet && (
                  <div style={{
                    background: '#f9fafb', borderRadius: '6px',
                    padding: '7px 10px', borderLeft: `2px solid ${cat.color}`
                  }}>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase',
                      letterSpacing: '0.05em', color: cat.color, display: 'block', marginBottom: '2px'
                    }}>{snippet.source}</span>
                    <p style={{ fontSize: '0.8rem', color: '#374151', margin: 0, lineHeight: 1.5 }}>
                      {highlight(snippet.text.length > 140 ? snippet.text.slice(0, 140) + '…' : snippet.text, q)}
                    </p>
                  </div>
                )}

                <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
                  Tap to open →
                </p>
              </button>
            );
          })}
        </div>
      )}

      {/* Empty / prompt state */}
      {!showResults && (
        <div style={{
          textAlign: 'center', padding: '2.5rem 1rem',
          background: '#f9fafb', borderRadius: '14px', border: '1px solid #e5e7eb'
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔎</p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.7, margin: '0 auto', maxWidth: '320px' }}>
            Search across <strong>all topics</strong>, key terms, case studies, and exam tips.<br /><br />
            <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
              Try: <em>biogas</em> · <em>longshore drift</em> · <em>Rostow</em> · <em>hydrograph</em> · <em>Malawi</em>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}