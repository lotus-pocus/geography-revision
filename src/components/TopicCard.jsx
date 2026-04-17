const CATEGORY_LABELS = {
  rivers: 'Rivers',
  coasts: 'Coasts',
  development: 'Development',
  india: 'India',
  hazardous: 'Hazardous Earth',
  urbanisation: 'Urbanisation',
};

function TopicCard({ topic, isDone, onClick }) {
  return (
    <div
      className={`topic-card ${isDone ? 'topic-card--done' : ''} topic-card--${topic.category}`}
      onClick={() => onClick(topic.id)}
    >
      <span className={`card-badge badge--${topic.category}`}>
        {isDone ? '✓ Done' : CATEGORY_LABELS[topic.category]}
      </span>
      <p className="card-title">{topic.title}</p>
      {topic.isCaseStudy && (
        <span className="case-study-tag">Case Study</span>
      )}
    </div>
  );
}

export default TopicCard;