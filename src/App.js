import { useState, useEffect } from "react";
import rivers from "./data/rivers";
import coasts from "./data/coasts";
import development from "./data/development";
import india from "./data/india";
import hazardousEarth from "./data/hazardousEarth";
import urbanisation from "./data/urbanisation";
import Header from "./components/Header";
import NavTabs from "./components/NavTabs";
import TopicsView from "./components/TopicsView";
import CaseStudies from "./components/CaseStudies";
import Glossary from "./components/Glossary";
import Quiz from "./components/Quiz";
import Checklist from "./components/Checklist";
import Flashcards from "./components/Flashcards";
import LastMinuteRevision from "./components/LastMinuteRevision";
import "./index.css";
import About from "./components/About";

const ALL_TOPICS = [
  ...hazardousEarth,
  ...urbanisation,
  ...rivers,
  ...coasts,
  ...development,
  ...india,
];
const STORAGE_KEY = "geo_done_v1";

function App() {
  const [activeTab, setActiveTab] = useState("revision");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    // Slight delay so the page renders first, then slide up
    const showTimer = setTimeout(() => setToastVisible(true), 400);
    // Slide back down after 3s of being visible
    const hideTimer = setTimeout(() => setToastVisible(false), 2500);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
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
      case "topics":
        return (
          <TopicsView
            allTopics={ALL_TOPICS}
            done={done}
            onMarkDone={markDone}
          />
        );
      case "casestudies":
        return <CaseStudies allTopics={ALL_TOPICS} />;
      case "glossary":
        return <Glossary allTopics={ALL_TOPICS} />;
      case "flashcards":
        return <Flashcards allTopics={ALL_TOPICS} />;
      case "quiz":
        return <Quiz />;
      case "revision":
        return <LastMinuteRevision />;
      case "checklist":
        return <Checklist />;
      case "about":
        return <About />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Header totalTopics={ALL_TOPICS.length} doneCount={done.length} />

      {/* Toast slides up from bottom centre */}
      <div style={{
        position: 'fixed',
        bottom: toastVisible ? '400px' : '-140px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: '#dc2626',
        color: '#ffffff',
        padding: '16px 28px',
        borderRadius: '14px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
        fontSize: '16px',
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 1.6,
        whiteSpace: 'nowrap',
        transition: 'bottom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: 'none',
      }}>
        🎯 Last Minute Revision tab is now live!
        <br />
        <span style={{ fontWeight: '500', fontSize: '14px', opacity: 0.92 }}>Key facts, stats &amp; exam tips. Good luck everyone! 💪</span>
      </div>

      <main className="main-content">
        <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="tab-content">{renderTab()}</div>
      </main>
      <footer className="sticky-footer">
        Built with ❤️ by{" "}
        <a href="https://gamoola.com" target="_blank" rel="noreferrer">
          Gamoola
        </a>{" "}
        — interactive learning experiences for schools and businesses.
      </footer>
    </div>
  );
}

export default App;