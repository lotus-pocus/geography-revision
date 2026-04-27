function About() {
  return (
    <div className="about-view">
      <div className="about-hero">
        <img
          src="/images/lotus-pocus.png"
          alt="Lotus Pocus"
          className="about-hero-img"
          fetchpriority="high"
          loading="eager"
        />
        <h2 className="about-title">About this app</h2>
      </div>

      <div className="about-section">
        <p className="about-body">
          I built this to help my daughter revise for the upcoming Geography
          mock exam.
        </p>
        <p className="about-body">
          It covers her Edexcel B GCSE Geography topics: Development Dynamics,
          Rivers, and Coasts (also included is hazardous earth which I believe
          is not going to be in the exams as it has not yet been covered) with
          flashcards, quizzes, case studies, and key terms all in one place.
        </p>
        <p className="about-body">
          If you've found your way here and it's useful for your own revision,
          that's brilliant, please help yourself. Good luck in your exams. 🌟
        </p>
      </div>

      <div className="about-project">
        <p className="about-project-label">👨‍💻 Who made this?</p>
        <a
          href="https://www.gamoola.com/projects/vr-bioscience/"
          target="_blank"
          rel="noreferrer"
          className="about-project-link"
        >
          I work at Gamoola. We build things like this VR Bioscience app for
          Coventry University
          <span className="about-project-arrow">→</span>
        </a>
        <p className="about-project-desc">
          Gamoola is a small creative studio building interactive digital
          experiences for universities and businesses. This geography app is a
          personal project, not a commercial one.
        </p>
      </div>

      <div className="about-links">
        <a
          href="https://gamoola.com"
          target="_blank"
          rel="noreferrer"
          className="about-link about-link--primary"
        >
          🌐 gamoola.com
        </a>
        <a href="mailto:hello@gamoola.com" className="about-link">
          📧 lotus@gamoola.com
        </a>
      </div>

      <div className="about-disclaimer">
        <p className="about-disclaimer-title">📋 Disclaimer</p>
        <p className="about-disclaimer-body">
          This app was created for personal, non-commercial use to support one
          student's GCSE revision. Some images and diagrams used within this app
          are sourced from third-party educational websites including BBC
          Bitesize and Internet Geography, and remain the property of their
          respective owners. This app is not intended for commercial
          distribution or profit. If you are the owner of any content featured
          here and would like it removed, please get in touch at
          lotus@gamoola.com.
        </p>
      </div>

      <p className="about-footer-note">
        Built with ❤️ for Scarlett - good luck in your exams! 🌟
      </p>
    </div>
  );
}

export default About;
