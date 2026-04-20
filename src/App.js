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
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [mathsKey, setMathsKey] = useState(0);
  const [clinometerKey, setClinometerKey] = useState(0);
  const [showClinometer, setShowClinometer] = useState(false);

  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedTopicId(null);
    if (tab === "maths") {
      setMathsKey(k => k + 1);
      setShowClinometer(false);
    }
  };

  const markDone = (id) => {
    setDone((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const launchClinometer = () => {
    setClinometerKey(k => k + 1);
    setShowClinometer(true);
    return null;
  };

  const renderTab = () => {
    switch (activeTab) {
      case "topics":
        return (
          <TopicsView
            allTopics={ALL_TOPICS}
            done={done}
            onMarkDone={markDone}
            selectedId={selectedTopicId}
            onSelectId={setSelectedTopicId}
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
      case "checklist":
        return <Checklist />;
      case "maths":
        if (showClinometer) {
          return <Clinometer key={clinometerKey} onBack={() => setShowClinometer(false)} />;
        }
        return <MathsHub key={mathsKey} onBeachProfile={launchClinometer} />;
      case "about":
        return <About />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Header totalTopics={ALL_TOPICS.length} doneCount={done.length} />
      <main className="main-content">
        <NavTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="tab-content">{renderTab()}</div>
      </main>
      <footer className="sticky-footer">
        Built with ❤️ by{" "}
        <a href="https://gamoola.com" target="_blank" rel="noreferrer">
          Gamoola
        </a>{" "}
        - interactive learning experiences for schools and businesses.
      </footer>
    </div>
  );
}

export default App;