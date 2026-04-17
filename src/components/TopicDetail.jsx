function TopicDetail({ topic, isDone, onMarkDone, onBack }) {
    return (
        <div className="topic-detail">
            <button className="back-btn" onClick={onBack}>
                ← Back to all topics
            </button>

            <div className="detail-card">
                <h2 className="detail-title">{topic.title}</h2>
                <p className="detail-subtitle">Key content for your exam</p>

                <section className="detail-section">
                    <h3 className="section-heading">What you need to know</h3>
                    <ul className="key-points">
                        {topic.points.map((point, i) => (
                            <li key={i} className="key-point">{point}</li>
                        ))}
                    </ul>
                </section>

                <section className="detail-section">
                    <h3 className="section-heading">Key terms to learn</h3>
                    <div className="terms-grid">
                        {topic.terms.map((item, i) => (
                            <div key={i} className="term-card">
                                <dt className="term-word">{item.term}</dt>
                                <dd className="term-def">{item.def}</dd>
                            </div>
                        ))}
                    </div>
                </section>

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

                <div className="exam-tip">
                    <span className="exam-tip-label">Exam tip</span>
                    <p>{topic.examTip}</p>
                </div>
                {topic.note && (
                    <div className="topic-note">
                        <span className="topic-note-label">Did you know?</span>
                        <p>{topic.note}</p>
                    </div>
                )}

                <div className="detail-actions">
                    {isDone ? (
                        <span className="done-confirmation">✓ Marked as done</span>
                    ) : (
                        <button className="btn-done" onClick={() => onMarkDone(topic.id)}>
                            Mark as done
                        </button>
                    )}
                    <button className="btn-secondary" onClick={onBack}>
                        Back to topics
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TopicDetail;