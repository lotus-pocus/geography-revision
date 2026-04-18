function Header({ totalTopics, doneCount }) {
  const percentage = totalTopics > 0 ? Math.round((doneCount / totalTopics) * 100) : 0;

  return (
    <header className="header">
      <div className="header-text">
        <h1>Scarlett's Geography Revision</h1>
        <p>Edexcel B: Development Dynamics &amp; UK Physical Landscapes</p>
      </div>
      <div className="progress-section">
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="progress-label">
          {doneCount} of {totalTopics} topics marked done ({percentage}%)
        </p>
      </div>
    </header>
  );
}

export default Header;