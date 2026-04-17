const tabs = [
  { id: 'topics',    label: 'All Topics' },
  { id: 'casestudies', label: 'Case Studies' },
  { id: 'flashcards',  label: 'Flashcards' },
  { id: 'glossary', label: 'Key Terms' },
  { id: 'quiz',     label: 'Quiz Me' },
  { id: 'checklist', label: 'Checklist' },
];

function NavTabs({ activeTab, onTabChange }) {
  return (
    <nav className="nav-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default NavTabs;