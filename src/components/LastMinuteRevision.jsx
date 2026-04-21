import { useState } from 'react';

const SECTIONS = [
  {
    id: 'rivers',
    title: '🌊 Rivers & Flooding',
    color: '#185FA5',
    bg: '#eff6ff',
    border: '#bfdbfe',
    items: [
      { type: 'fact', text: 'Upper course: V-shaped valleys, waterfalls, interlocking spurs - high energy, lots of vertical erosion.' },
      { type: 'fact', text: 'Middle course: meanders, ox-bow lakes - lateral erosion widens the valley.' },
      { type: 'fact', text: 'Lower course: floodplains, levées, estuaries - deposition dominates.' },
      { type: 'fact', text: 'Erosion processes: hydraulic action, abrasion, attrition, corrosion (solution).' },
      { type: 'fact', text: 'Transportation: traction (rolling), saltation (bouncing), suspension (floating), solution (dissolved).' },
      { type: 'stat', label: 'Sheffield 2007', text: '90mm of rain in 12 hours (a month\'s worth). River Don flooded. 1,500 homes flooded. £50 million damage.' },
      { type: 'stat', label: 'Somerset 2013–14', text: 'Prolonged winter flooding. ~600 homes flooded. Rivers Tone and Parrett. Controversy over lack of dredging.' },
      { type: 'fact', text: 'Storm hydrograph: lag time = gap between peak rainfall and peak discharge. Short lag = fast run-off = higher flood risk.' },
      { type: 'fact', text: 'Hard engineering: dams, embankments, channel straightening. Expensive, can shift flooding downstream.' },
      { type: 'fact', text: 'Soft engineering: afforestation, flood plain zoning, washlands. Cheaper, more sustainable.' },
      { type: 'tip', text: '6-mark flood management question: always evaluate - give a benefit AND a limitation of each approach.' },
    ],
  },
  {
    id: 'coasts',
    title: '🏖️ Coasts',
    color: '#059669',
    bg: '#ecfdf5',
    border: '#a7f3d0',
    items: [
      { type: 'fact', text: 'Destructive waves: high frequency, strong backwash, weak swash - erode beaches.' },
      { type: 'fact', text: 'Constructive waves: low frequency, strong swash, weak backwash - build beaches.' },
      { type: 'fact', text: 'Coastal erosion: hydraulic action, abrasion, attrition, corrosion. Mass movement: slumping, rockfalls.' },
      { type: 'fact', text: 'Wave-cut notch → overhang collapses → cliff retreats → wave-cut platform extends.' },
      { type: 'fact', text: 'Longshore drift transports sediment along coast. Creates spits, bars, tombolos.' },
      { type: 'fact', text: 'Discordant coast: rock bands at right angles to sea → headlands and bays. Concordant: bands parallel → straight coast.' },
      { type: 'stat', label: 'Holderness', text: 'Fastest eroding coast in Europe. Up to 2m lost per year. Soft boulder clay. Long fetch from Scandinavia. 30+ villages lost to the sea historically.' },
      { type: 'stat', label: 'Mappleton', text: 'Rock armour and 2 groynes built in 1991. Cost £2 million. Saved the village but reduced sediment supply south - increased erosion at Great Cowden.' },
      { type: 'fact', text: 'Hard engineering: sea walls (£10,000/m), rock armour, groynes, offshore breakwaters.' },
      { type: 'fact', text: 'Soft engineering: beach nourishment, managed retreat (coastal realignment), dune stabilisation.' },
      { type: 'tip', text: 'Managed retreat: allow the sea to flood low-value land → creates salt marsh → natural buffer → cheaper and better for biodiversity.' },
      { type: 'tip', text: '"Evaluate coastal management" = mention cost, effectiveness, impact on neighbouring areas, and sustainability.' },
    ],
  },
  {
    id: 'development',
    title: '🌍 Development & Globalisation',
    color: '#9333ea',
    bg: '#faf5ff',
    border: '#d8b4fe',
    items: [
      { type: 'fact', text: 'Measuring development: GNI per capita, HDI (income + education + life expectancy), birth/death rates, literacy rate.' },
      { type: 'fact', text: "Rostow's 5 stages: Traditional society → Pre-conditions → Take-off → Drive to maturity → Mass consumption. Critics: ignores colonialism." },
      { type: 'fact', text: "Frank's Dependency Theory: core (HICs) exploits periphery (LICs) through unequal trade. LICs stay poor because of this relationship." },
      { type: 'fact', text: 'Top-down development: large-scale, government or international body funded (e.g. dams, motorways). Benefits many but can displace communities.' },
      { type: 'fact', text: 'Bottom-up development: community-led, small-scale, meets local needs (e.g. micro-finance, village water pumps). More sustainable.' },
      { type: 'stat', label: 'Malawi', text: 'GNI per capita ~$400. Life expectancy ~64 years. HDI ~0.50. One of the world\'s poorest countries. Relies heavily on subsistence farming.' },
      { type: 'fact', text: 'TNCs (Transnational Corporations) can bring jobs and investment but profits go overseas and wages may be low.' },
      { type: 'fact', text: 'Globalisation: increased interconnection of the world through trade, migration, communication, and investment.' },
      { type: 'tip', text: 'When evaluating top-down vs bottom-up: top-down = large scale benefit but can displace and ignore local needs. Bottom-up = sustainable but small scale.' },
    ],
  },
  {
    id: 'india',
    title: '🇮🇳 India Case Study',
    color: '#D85A30',
    bg: '#fff7ed',
    border: '#fed7aa',
    items: [
      { type: 'stat', label: 'Key facts', text: 'Population ~1.4 billion (world\'s most populous). GDP ~$3.5 trillion (5th largest). HDI ~0.633 (ranked ~130th). Median age ~28.' },
      { type: 'fact', text: 'India has huge regional inequality: Mumbai and Bangalore are wealthy; rural Bihar and Uttar Pradesh remain very poor.' },
      { type: 'fact', text: 'Globalisation in India: IT sector (Bangalore), manufacturing (textiles, cars), call centres - all driven by TNCs and outsourcing.' },
      { type: 'stat', label: 'IT sector', text: 'India\'s IT industry generates ~$200 billion/year and employs over 4 million people. Bangalore = "India\'s Silicon Valley".' },
      { type: 'fact', text: 'TNCs in India: Amazon, Google, Microsoft, Suzuki (Maruti), Vodafone. Bring investment and jobs but profits leave the country.' },
      { type: 'stat', label: 'Sardar Sarovar Dam (top-down)', text: 'On the Narmada River, Gujarat. Provides water for 20 million people. Generates 1,450 MW electricity. BUT displaced 320,000+ people, many tribal communities.' },
      { type: 'stat', label: 'SEWA (bottom-up)', text: 'Self Employed Women\'s Association. Founded Ahmedabad 1972. 2 million members. Provides micro-loans, legal support, healthcare for informal female workers.' },
      { type: 'fact', text: 'Inequalities within India: urban vs rural, gender gap (female literacy ~65% vs male ~82%), north vs south divide.' },
      { type: 'tip', text: 'India\'s future: growing middle class, space programme, nuclear power, climate challenges, water scarcity, pollution in cities (Delhi AQI regularly "hazardous").' },
    ],
  },
  {
    id: 'examtips',
    title: '✏️ Exam Technique',
    color: '#374151',
    bg: '#f9fafb',
    border: '#e5e7eb',
    items: [
      { type: 'tip', text: '2-mark questions: give a clear point + a brief supporting detail. No need for examples.' },
      { type: 'tip', text: '4-mark questions: two developed points, each with evidence or an example.' },
      { type: 'tip', text: '6-mark questions: structured answer - two or three points, each with case study detail, evaluated (advantages AND disadvantages or limits).' },
      { type: 'tip', text: '"Explain why…" = give a reason AND develop it with a consequence or mechanism.' },
      { type: 'tip', text: '"Evaluate…" or "Assess…" = you MUST give a balanced view - say what works AND what doesn\'t, then reach a conclusion.' },
      { type: 'tip', text: 'Use named places and statistics: "The Holderness coast erodes at up to 2m per year" is much stronger than "a coastline erodes quickly".' },
      { type: 'tip', text: 'For fieldwork questions: refer to your specific method, why you chose it, and any limitations (e.g. sample size, human error, weather).' },
      { type: 'tip', text: 'Maths questions: show every step. You can get method marks even if the final answer is wrong.' },
      { type: 'tip', text: 'Read the question carefully - "describe" (say what you see) is very different from "explain" (say why it happens).' },
    ],
  },
];

function Badge({ type }) {
  const styles = {
    fact: { bg: '#f3f4f6', color: '#374151', label: 'FACT' },
    stat: { bg: '#fef9c3', color: '#854d0e', label: 'STAT' },
    tip: { bg: '#dcfce7', color: '#14532d', label: 'TIP' },
  };
  const s = styles[type] || styles.fact;
  return (
    <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px', background: s.bg, color: s.color, flexShrink: 0, letterSpacing: '0.05em' }}>
      {s.label}
    </span>
  );
}

export default function LastMinuteRevision() {
  const [open, setOpen] = useState({ rivers: false, coasts: false, development: false, india: false, examtips: false });

  const toggle = (id) => setOpen(o => ({ ...o, [id]: !o[id] }));

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ background: '#fef2f2', border: '0.5px solid #fecaca', borderRadius: '12px', padding: '14px 16px', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '15px', fontWeight: '600', color: '#991b1b', margin: '0 0 4px' }}>⏰ Exam tomorrow - last minute revision</p>
        <p style={{ fontSize: '13px', color: '#7f1d1d', margin: 0, lineHeight: 1.6 }}>
          Key facts, case study statistics, and exam technique tips. Tap each section to expand. Focus on the <strong>STAT</strong> badges - examiners love specific numbers.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {SECTIONS.map(section => (
          <div key={section.id} style={{ border: `0.5px solid ${section.border}`, borderRadius: '12px', overflow: 'hidden' }}>
            <button
              onClick={() => toggle(section.id)}
              style={{ width: '100%', padding: '14px 16px', background: open[section.id] ? section.bg : '#ffffff', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span style={{ fontWeight: '600', fontSize: '15px', color: '#1a1a2e' }}>{section.title}</span>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>{open[section.id] ? '▲' : '▼'}</span>
            </button>

            {open[section.id] && (
              <div style={{ background: section.bg, borderTop: `0.5px solid ${section.border}`, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {section.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <Badge type={item.type} />
                    <div style={{ flex: 1 }}>
                      {item.label && <span style={{ fontSize: '12px', fontWeight: '700', color: section.color, display: 'block', marginBottom: '2px' }}>{item.label}</span>}
                      <p style={{ fontSize: '13px', color: '#1a1a2e', margin: 0, lineHeight: 1.6 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ background: '#1a1a2e', borderRadius: '12px', padding: '16px', marginTop: '1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '15px', fontWeight: '600', color: '#ffffff', margin: '0 0 6px' }}>You've got this 💪</p>
        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0, lineHeight: 1.6 }}>
          Read the question carefully. Use named places and real statistics. Show all working in maths questions. Good luck!
        </p>
      </div>
    </div>
  );
}