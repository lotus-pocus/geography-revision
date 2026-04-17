import { useState } from 'react';

const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'rivers', label: 'Rivers' },
    { id: 'coasts', label: 'Coasts' },
    { id: 'development', label: 'Development' },
    { id: 'india', label: 'India' },
];

function CaseStudies({ allTopics }) {
    const [activeFilter, setActiveFilter] = useState('all');

    const caseStudies = allTopics.filter((t) => t.isCaseStudy);

    const filtered = activeFilter === 'all'
        ? caseStudies
        : caseStudies.filter((t) => t.category === activeFilter);

    return (
        <div className="case-studies-view">
            <p className="view-intro">
                All the case studies you need to know — learn the specific facts and statistics!
            </p>

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

            <div className="cs-list">
                {filtered.map((topic) => (
                    <div key={topic.id} className={`cs-card cs-card--${topic.category}`}>
                        <div className="cs-card-header">
                            <span className={`cs-badge badge--${topic.category}`}>
                                {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}
                            </span>
                            <h3 className="cs-title">{topic.title}</h3>
                        </div>
                        <ul className="cs-facts">
                            {topic.points.map((point, i) => (
                                <li key={i} className="cs-fact">{point}</li>
                            ))}
                        </ul>
                        {topic.images && (
                            <div className="topic-images">
                                {topic.images.map((img, i) => (
                                    <div key={i} className="topic-image">
                                        <img src={img.src} alt={img.caption} />
                                        <p className="image-caption">{img.caption}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {topic.examTip && (
                            <div className="exam-tip">
                                <span className="exam-tip-label">Exam tip</span>
                                <p>{topic.examTip}</p>
                            </div>
                        )}
                        {topic.note && (
                            <div className="topic-note">
                                <span className="topic-note-label">Did you know?</span>
                                <p>{topic.note}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CaseStudies;