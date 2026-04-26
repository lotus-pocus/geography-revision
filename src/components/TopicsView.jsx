import { useState } from 'react';
import TopicCard from './TopicCard';
import TopicDetail from './TopicDetail';
import KeyTheories from './KeyTheories';

const PAPERS = [
  { key: 'all',    label: 'All Papers', subtitle: null,                        disabled: false },
  { key: 'paper1', label: 'Paper 1',    subtitle: 'Global Geographical Issues', disabled: false },
  { key: 'paper2', label: 'Paper 2',    subtitle: 'UK Geographical Issues',     disabled: false },
  { key: 'paper3', label: 'Paper 3',    subtitle: 'People & Environment',       disabled: true  },
];

const SECTIONS = [
  { key: 'hazardous',    label: 'Hazardous Earth',   paper: 'paper1', unitLabel: 'Paper 1 - Global Geographical Issues' },
  { key: 'development',  label: 'Global Development', paper: 'paper1', unitLabel: null },
  { key: 'india',        label: 'India Case Study',   paper: 'paper1', unitLabel: null },
  { key: 'urbanisation', label: 'Urbanising World',   paper: 'paper1', unitLabel: null },
  { key: 'rivers',       label: 'Rivers',             paper: 'paper2', unitLabel: 'Paper 2 - UK Geographical Issues' },
  { key: 'coasts',       label: 'Coasts',             paper: 'paper2', unitLabel: null },
];

function TopicsView({ allTopics, done, onMarkDone, selectedId, onSelectId }) {
  const [activePaper, setActivePaper] = useState('all');

  const selectedTopic = selectedId
    ? allTopics.find((t) => t.id === selectedId)
    : null;

  if (selectedTopic) {
    return (
      <TopicDetail
        topic={selectedTopic}
        isDone={done.includes(selectedTopic.id)}
        onMarkDone={onMarkDone}
        onBack={() => onSelectId(null)}
      />
    );
  }

  const visibleSections = activePaper === 'all'
    ? SECTIONS
    : SECTIONS.filter((s) => s.paper === activePaper);

  const seenUnitLabels = new Set();

  return (
    <div className="topics-view">

      <div className="paper-filter">
        {PAPERS.map((paper) => (
          <button
            key={paper.key}
            className={[
              'paper-filter-btn',
              activePaper === paper.key ? 'paper-filter-btn--active' : '',
              paper.disabled ? 'paper-filter-btn--disabled' : '',
            ].join(' ')}
            onClick={() => !paper.disabled && setActivePaper(paper.key)}
            disabled={paper.disabled}
            title={paper.disabled ? 'Coming soon' : undefined}
          >
            <span className="paper-filter-label">{paper.label}</span>
            {paper.subtitle && (
              <span className="paper-filter-subtitle">{paper.subtitle}</span>
            )}
            {paper.disabled && (
              <span className="paper-filter-coming-soon">Coming soon</span>
            )}
          </button>
        ))}
      </div>

      <KeyTheories />

      {visibleSections.map((section) => {
        const sectionTopics = allTopics.filter((t) => t.category === section.key);
        const showUnitLabel = section.unitLabel && !seenUnitLabels.has(section.unitLabel);
        if (section.unitLabel) seenUnitLabels.add(section.unitLabel);

        return (
          <div key={section.key} className="topic-section">
            {showUnitLabel && (
              <p className="unit-label">{section.unitLabel}</p>
            )}
            <h2 className="section-heading">{section.label}</h2>
            <div className="topic-grid">
              {sectionTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  isDone={done.includes(topic.id)}
                  onClick={onSelectId}
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