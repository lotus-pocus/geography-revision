import { useState } from 'react';
import TopicCard from './TopicCard';
import TopicDetail from './TopicDetail';

const SECTIONS = [
  { key: 'hazardous',     label: 'Hazardous Earth',        unit: 'Paper 1 — Global Geographical Issues' },
  { key: 'urbanisation',  label: 'Urbanising World',        unit: null },
  { key: 'development',   label: 'Global Development',      unit: null },
  { key: 'india',         label: 'India Case Study',        unit: null },
  { key: 'rivers',        label: 'Rivers',                  unit: 'Paper 2 — UK\'s Evolving Physical Landscape' },
  { key: 'coasts',        label: 'Coasts',                  unit: null },
];

function TopicsView({ allTopics, done, onMarkDone }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedTopic = selectedId
    ? allTopics.find((t) => t.id === selectedId)
    : null;

  if (selectedTopic) {
    return (
      <TopicDetail
        topic={selectedTopic}
        isDone={done.includes(selectedTopic.id)}
        onMarkDone={onMarkDone}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return (
    <div className="topics-view">
      {SECTIONS.map((section) => {
        const sectionTopics = allTopics.filter((t) => t.category === section.key);
        return (
          <div key={section.key} className="topic-section">
            {section.unit && (
              <p className="unit-label">{section.unit}</p>
            )}
            <h2 className="section-heading">{section.label}</h2>
            <div className="topic-grid">
              {sectionTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  isDone={done.includes(topic.id)}
                  onClick={setSelectedId}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TopicsView;