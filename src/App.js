import { useState } from "react";
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
import MathsHub from "./components/MathsHub";
import Clinometer from "./components/Clinometer";
import Search from "./components/Search";
import ToastNotification from "./components/ToastNotification";
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
  const [activeTab, setActiveTab] = useState("topics");
  const [showBeach, setShowBeach] = useState(false);
  const [quizKey, setQuizKey] = useState(0);

  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const [selectedId, setSelectedId] = useState(null);

  const markDone = (id) => {
    setDone((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleTabChange = (tab) => {
    if (tab === "quiz") setQuizKey(k => k + 1);
    setShowBeach(false);
    setSelectedId(null);
    setActiveTab(tab);
    if (typeof window.gtag === "function") {
      window.gtag("event", "tab_view", { tab_name: tab });
    }
  };

  const renderTab = () => {
    // Beach profiling is launched from within MathsHub — handled separately
    if (showBeach) {
      return <Clinometer onBack={() => setShowBeach(false)} />;
    }

    switch (activeTab) {
      case "topics":
        return (
          <TopicsView
            allTopics={ALL_TOPICS}
            done={done}
            onMarkDone={markDone}
            selectedId={selectedId}
            onSelectId={setSelectedId}
          />
        );
      case "casestudies":
        return <CaseStudies allTopics={ALL_TOPICS} />;
      case "glossary":
        return (
          <Glossary
            allTopics={ALL_TOPICS}
            onSelectTopic={(id) => {
              setSelectedId(id);
              setActiveTab("topics");
            }}
          />
        );
      case "flashcards":
        return <Flashcards allTopics={ALL_TOPICS} />;
      case "quiz":
        return <Quiz key={quizKey} />;
      case "checklist":
        return <Checklist />;
      case "maths":
        return <MathsHub onBeachProfile={() => setShowBeach(true)} />;
      case "search":
        return (
          <Search
            allTopics={ALL_TOPICS}
            onSelectTopic={(id) => {
              setSelectedId(id);
              setActiveTab("topics");
            }}
          />
        );
      case "about":
        return <About />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Header totalTopics={ALL_TOPICS.length} doneCount={done.length} />
      <ToastNotification />

      <main className="main-content">
        <NavTabs activeTab={activeTab} onTabChange={handleTabChange} />
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