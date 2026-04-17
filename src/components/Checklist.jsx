import { useState } from 'react';

const CHECKLIST_SECTIONS = [
  {
    title: 'Rivers — I can explain...',
    items: [
      'The four types of erosion (hydraulic action, abrasion, attrition, corrosion)',
      'How V-shaped valleys and waterfalls form in the upper course',
      'The difference between the upper, middle and lower course',
      'How meanders and ox-bow lakes form',
      'What a storm hydrograph shows and how to read lag time',
      'The causes and impacts of the Somerset floods (2014)',
      'The causes and impacts of the Sheffield floods (2007)',
      'Hard vs soft engineering approaches to flood management',
    ],
  },
  {
    title: 'Coasts — I can explain...',
    items: [
      'The difference between constructive and destructive waves',
      'Longshore drift and why it matters',
      'How caves, arches, stacks and stumps form (the sequence)',
      'What happened at Holderness and why it erodes so fast',
      'Concordant vs discordant coasts',
      'At least two hard AND two soft engineering strategies',
      'What managed retreat means and its pros and cons',
    ],
  },
  {
    title: 'Development Dynamics — I can explain...',
    items: [
      'At least three development indicators including HDI',
      'The three causes of global inequality (physical, historical, economic)',
      "Rostow's Modernisation Theory (5 stages) and one criticism",
      "Frank's Dependency Theory and how it differs from Rostow",
      'Top-down vs bottom-up development with one example each',
      'Key facts about Malawi as an LIC example',
      'What globalisation means and how TNCs affect LICs',
    ],
  },
  {
    title: 'India Case Study — I can explain...',
    items: [
      "India's basic statistics (population, HDI, GNI per capita)",
      'Why 1991 liberalisation was a turning point',
      "How Bangalore's IT sector has grown through globalisation",
      'The benefits AND costs of TNCs operating in India',
      'The Narmada Dam (top-down) — facts, benefits, and problems',
      'SEWA (bottom-up) — what it does and why it works',
      'Inequalities within India (Kerala vs Bihar, urban vs rural)',
      "India's future challenges (climate, inequality, pollution)",
    ],
  },
];

const STORAGE_KEY = 'geo_checklist_v1';

function Checklist() {
  const [ticked, setTicked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  });

  const toggle = (key) => {
    setTicked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const totalItems = CHECKLIST_SECTIONS.reduce((sum, s) => sum + s.items.length, 0);
  const tickedCount = Object.values(ticked).filter(Boolean).length;

  return (
    <div className="checklist-view">
      <p className="view-intro">
        Tick off each item as you feel confident. Use this to spot gaps before your exam!
      </p>
      <p className="checklist-progress">
        {tickedCount} of {totalItems} items ticked
      </p>

      {CHECKLIST_SECTIONS.map((section) => (
        <div key={section.title} className="checklist-section">
          <h3 className="checklist-section-title">{section.title}</h3>
          <ul className="checklist-items">
            {section.items.map((item, i) => {
              const key = `${section.title}-${i}`;
              const isTicked = !!ticked[key];
              return (
                <li
                  key={key}
                  className={`checklist-item ${isTicked ? 'checklist-item--ticked' : ''}`}
                  onClick={() => toggle(key)}
                >
                  <span className={`check-box ${isTicked ? 'check-box--ticked' : ''}`}>
                    {isTicked ? '✓' : ''}
                  </span>
                  <span className="check-text">{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Checklist;