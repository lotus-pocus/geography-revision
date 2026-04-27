function References() {
  const sources = [
    {
      category: "📋 Curriculum & Exam Board",
      items: [
        {
          name: "Edexcel B GCSE Geography Specification",
          url: "https://qualifications.pearson.com/en/qualifications/edexcel-gcses/geography-b-2016.html",
          description:
            "The official specification this app is built around - Unit 1 (Global Geographical Issues) and Unit 2 (UK Geographical Issues).",
          type: "Specification",
        },
      ],
    },
    {
      category: "🌐 Educational Websites",
      items: [
        {
          name: "BBC Bitesize - GCSE Geography",
          url: "https://www.bbc.co.uk/bitesize/examspecs/zpgnyrd",
          description:
            "Used for explanations, diagrams, and images across Rivers, Coasts, Development, and Hazardous Earth topics.",
          type: "Website",
        },
        {
          name: "Internet Geography",
          url: "https://www.internetgeography.net",
          description:
            "Primary source for diagrams and case study material including coastal management at Mappleton, river landforms, hydrographs, atmospheric circulation, and development indicators.",
          type: "Website",
        },
        {
          name: "Geography All the Way",
          url: "https://www.geographyalltheway.com",
          description:
            "Reference source for Edexcel B topic structure and revision content.",
          type: "Website",
        },
      ],
    },
    {
      category: "🗺️ Images & Diagrams",
      items: [
        // ── RIVERS ──────────────────────────────────────────────────────────
        {
          name: "Waterfall formation diagram",
          url: "https://www.internetgeography.net/geotopics/landforms-in-the-upper-course-of-a-river/",
          description:
            "Four-stage diagram showing hard rock overhang, plunge pool undercutting, collapse, and gorge retreat. Source: Internet Geography (wp-content/uploads/2018/04/Formation-Of-A-Waterfall.png).",
          type: "Image",
        },
        {
          name: "Ox-bow lake formation diagram",
          url: "https://www.internetgeography.net/topics/landforms-in-the-middle-course-of-a-river/",
          description:
            "Three-stage diagram of meander development and ox-bow lake formation, showing lateral erosion, river cliff, and slip-off slope deposition. Source: Internet Geography (wp-content/uploads/2017/12/Formation-of-an-oxbow-lake.png).",
          type: "Image",
        },
        {
          name: "Storm hydrograph diagram",
          url: "https://www.internetgeography.net/edexcel-b-gcse-geography-revision/how-can-storm-hydrographs-and-lag-times-be-explained-by-physical-factors/",
          description:
            "Annotated storm hydrograph showing peak discharge, lag time, rising limb, and falling limb. Source: Internet Geography (wp-content/uploads/2016/03/storm-hydrograph2.jpg).",
          type: "Image",
        },
        {
          name: "Hydrograph factors diagram",
          url: "https://www.internetgeography.net/edexcel-b-gcse-geography-revision/how-can-storm-hydrographs-and-lag-times-be-explained-by-physical-factors/",
          description:
            "Side-by-side comparison of flashy and gentle hydrographs showing how drainage basin characteristics (rock type, vegetation, slope, urbanisation) affect hydrograph shape. Source: Internet Geography (Flashy-Hydrograph.png / gentle-hydrograph.png).",
          type: "Image",
        },
        {
          name: "Somerset Levels flood map (2014)",
          url: "https://www.internetgeography.net/geotopics/the-somerset-levels-flood-case-study/",
          description:
            "Map showing flooded areas across the Somerset Levels during the January 2014 floods, including the Rivers Tone and Parrett. Source: Internet Geography (wp-content/uploads/2023/07/Somerset-Levels-Flooding-2014.png). ⚠️ Note: the local copy of this image (SomersetFlood.png) is currently missing from the project — the image will not display.",
          type: "Image",
        },
        // ── COASTS ──────────────────────────────────────────────────────────
        {
          name: "Concordant and discordant coastlines — Dorset",
          url: "https://www.internetgeography.net/edexcel-b-gcse-geography-revision/landforms-of-coastal-erosion/",
          description:
            "Map of the Dorset coastline illustrating concordant and discordant geology, including Swanage Bay and Durlston Head. Source: Internet Geography (wp-content/uploads/2025/06/Dorset-Coast.jpg).",
          type: "Image",
        },
        {
          name: "Rock groynes at Mappleton",
          url: "https://www.internetgeography.net/geotopics/mappleton-case-study/",
          description:
            "Photograph of rock groynes at Mappleton, East Yorkshire, used to illustrate hard engineering coastal management. Source: Internet Geography Mappleton case study (exact image not confirmed via reverse search — marked as Internet Geography).",
          type: "Image",
        },
        {
          name: "Rock armour at Mappleton",
          url: "https://www.internetgeography.net/geotopics/mappleton-case-study/",
          description:
            "Photograph of rock armour (rip-rap) at Mappleton used to absorb wave energy and protect the cliff. Source: Internet Geography Mappleton case study (exact image not confirmed via reverse search — marked as Internet Geography).",
          type: "Image",
        },
        // ── DEVELOPMENT ─────────────────────────────────────────────────────
        {
          name: "Demographic Transition Model (DTM)",
          url: "https://www.internetgeography.net/development-population-change-and-the-demographic-transition-model/",
          description:
            "Diagram illustrating the five stages of the DTM — birth rates, death rates, and total population over time. Source: Internet Geography (wp-content/uploads/2016/03/demographic-transition-model.jpg).",
          type: "Image",
        },
        {
          name: "Malawi map",
          url: "https://www.internetgeography.net/edexcel-b-gcse-geography-revision/development-dynamics/",
          description:
            "Map locating Malawi as a landlocked LIC in southern Africa, surrounded by Zambia, Tanzania, and Mozambique. Likely source: Internet Geography Development Dynamics section. Original image source not confirmed via reverse image search.",
          type: "Image",
        },
        {
          name: "Biogas plant diagram",
          url: null,
          description:
            "Diagram showing how a biogas digester works — manure fed into an underground anaerobic chamber, methane piped to the home, slurry used as fertiliser. Used in the bottom-up / appropriate technology development section. ⚠️ Original source not identified via reverse image search.",
          type: "Image",
        },
        // ── HAZARDOUS EARTH ─────────────────────────────────────────────────
        {
          name: "Global atmospheric circulation diagram",
          url: "https://www.internetgeography.net/edexcel-b-gcse-geography-revision/what-is-global-atmospheric-circulation/",
          description:
            "Diagram showing Hadley, Ferrel, and Polar cells in both hemispheres, used in the Hazardous Earth / climate section. Source: Internet Geography (wp-content/uploads/2024/09/Global-atmospheric-circulation.jpg).",
          type: "Image",
        },
        {
          name: "Plate boundary types diagram",
          url: "https://www.internetgeography.net/edexcel-b-gcse-geography-revision/what-are-the-three-major-plate-boundaries/",
          description:
            "Cross-section diagram showing all three plate boundary types: convergent/subduction, divergent, and transform (conservative). Used in the Hazardous Earth tectonic section. Likely source: Internet Geography (exact image not confirmed via reverse image search).",
          type: "Image",
        },
        // ── INDIA ───────────────────────────────────────────────────────────
        {
          name: "India states income map",
          url: "https://www.internetgeography.net/edexcel-b-gcse-geography-revision/what-is-indias-context/",
          description:
            "Colour-coded map showing income levels by Indian state, highlighting the north–south development divide. Likely source: Internet Geography India context section (exact image not confirmed via reverse image search).",
          type: "Image",
        },
        {
          name: "Narmada River map",
          url: null,
          description:
            "Map showing the Narmada River running west across central India and the location of the Sardar Sarovar Dam in Gujarat. ⚠️ Original source not identified via reverse image search — likely compiled from maps of India resources.",
          type: "Image",
        },
        // ── FIELDWORK (Clinometer component) ────────────────────────────────
        {
          name: "Beach profiling method diagram",
          url: "https://www.internetgeography.net/fieldwork/coastal-fieldwork/coastal-fieldwork-techniques/",
          description:
            "Diagram showing two students using ranging poles and a clinometer to measure the angle and distance along a beach transect. Used in the Clinometer fieldwork section. Likely source: Internet Geography coastal fieldwork techniques (exact image not confirmed via reverse image search).",
          type: "Image",
        },
        {
          name: "Clinometer method diagram",
          url: "https://www.internetgeography.net/fieldwork/coastal-fieldwork/coastal-fieldwork-techniques/",
          description:
            "Step-by-step diagram showing how to use a clinometer to measure slope angle in the field. Used in the Clinometer fieldwork section. Likely source: Internet Geography coastal fieldwork techniques (exact image not confirmed via reverse image search).",
          type: "Image",
        },
        {
          name: "Clinometer photograph",
          url: null,
          description:
            "Photograph of a blue gun-shaped clinometer instrument used for measuring angles in fieldwork. Used in the Clinometer fieldwork section. ⚠️ Original source not identified via reverse image search — possibly from a geography equipment supplier (e.g. Geopacks) or a fieldwork guide.",
          type: "Image",
        },
      ],
    },
    {
      category: "🛠️ Built With",
      items: [
        {
          name: "React",
          url: "https://react.dev",
          description: "JavaScript library used to build the app interface.",
          type: "Technology",
        },
        {
          name: "Netlify",
          url: "https://netlify.com",
          description: "Hosting and deployment platform.",
          type: "Technology",
        },
        {
          name: "Google Analytics 4",
          url: "https://analytics.google.com",
          description:
            "Used to understand how the app is being used (anonymous, aggregate data only).",
          type: "Technology",
        },
      ],
    },
  ];

  const typeBadgeStyle = {
    Specification: { background: "#eff6ff", color: "#1d4ed8" },
    Website: { background: "#f0fdf4", color: "#15803d" },
    Image: { background: "#fdf4ff", color: "#7e22ce" },
    Technology: { background: "#fff7ed", color: "#c2410c" },
  };

  return (
    <div className="about-view">
      <h2 className="about-title" style={{ marginBottom: "0.25rem" }}>
        References & Sources
      </h2>
      <p className="view-intro" style={{ marginTop: 0 }}>
        All content, images, and diagrams used in this app - and the tools used
        to build it.
      </p>

      {sources.map((section) => (
        <div key={section.category} style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
            }}
          >
            {section.category}
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
          >
            {section.items.map((item) => {
              const badge = typeBadgeStyle[item.type] || {
                background: "#f3f4f6",
                color: "#374151",
              };
              return (
                <div
                  key={item.name}
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "0.85rem 1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                      marginBottom: "0.3rem",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: "var(--accent)",
                            textDecoration: "none",
                          }}
                        >
                          {item.name} ↗
                        </a>
                      ) : (
                        item.name
                      )}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "0.15rem 0.5rem",
                        borderRadius: "999px",
                        background: badge.background,
                        color: badge.color,
                      }}
                    >
                      {item.type}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.82rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="about-disclaimer" style={{ marginTop: "1.5rem" }}>
        <p className="about-disclaimer-title">📋 Note on image ownership</p>
        <p className="about-disclaimer-body">
          Content in this app has been informed by a range of educational sources including BBC Bitesize, Internet Geography, JK Geography, Study.com, Quizlet, and Edexcel published materials. All third-party content and images remain the property of their respective owners.
          If you believe your content has been used without appropriate credit, please get in touch and we'll update the attribution or remove it promptly.{" "}
          <a href="mailto:hello@gamoola.com">lotus@gamoola.com</a>.
        </p>
      </div>
    </div>
  );
}

export default References;
