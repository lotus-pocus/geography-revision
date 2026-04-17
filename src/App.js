import { useState } from 'react';
import rivers from './data/rivers';
import coasts from './data/coasts';
import development from './data/development';
import india from './data/india';
import hazardousEarth from './data/hazardousEarth';
import urbanisation from './data/urbanisation';
import Header from './components/Header';
import NavTabs from './components/NavTabs';
import TopicsView from './components/TopicsView';
import CaseStudies from './components/CaseStudies';
import Glossary from './components/Glossary';
import Quiz from './components/Quiz';
import Checklist from './components/Checklist';
import Flashcards from './components/Flashcards';
import './index.css';

const ALL_TOPICS = [...hazardousEarth, ...urbanisation, ...rivers, ...coasts, ...development, ...india];
const STORAGE_KEY = 'geo_done_v1';

function App() {
  const [activeTab, setActiveTab] = useState('topics');

  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const markDone = (id) => {
    setDone((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'topics':
        return <TopicsView allTopics={ALL_TOPICS} done={done} onMarkDone={markDone} />;
      case 'casestudies':
        return <CaseStudies allTopics={ALL_TOPICS} />;
      case 'glossary':
        return <Glossary allTopics={ALL_TOPICS} />;
        case 'flashcards':
          return <Flashcards allTopics={ALL_TOPICS} />;
      case 'quiz':
        return <Quiz />;
      case 'checklist':
        return <Checklist />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Header totalTopics={ALL_TOPICS.length} doneCount={done.length} />
      <main className="main-content">
        <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="tab-content">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}

export default App;