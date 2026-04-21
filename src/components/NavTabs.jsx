const tabs = [
  { id: 'revision',    label: '⏰ Last Minute', highlight: true },
  { id: 'topics',      label: 'All Topics' },
  { id: 'casestudies', label: 'Case Studies' },
  { id: 'flashcards',  label: 'Flashcards' },
  { id: 'glossary',    label: 'Key Terms' },
  { id: 'quiz',        label: 'Quiz Me' },
  { id: 'checklist',   label: 'Checklist' },
  { id: 'maths',       label: 'Maths Skills' },
  { id: 'about',       label: 'About' },
];

function NavTabs({ activeTab, onTabChange }) {
  return (
    <nav className="nav-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          style={tab.highlight && activeTab !== tab.id ? {
            background: '#dc2626',
            color: '#ffffff',
            borderColor: '#dc2626',
            fontWeight: '700',
          } : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default NavTabs;