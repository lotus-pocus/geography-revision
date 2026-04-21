import { useState, useCallback } from 'react';

// ─── QUIZ 1 QUESTIONS (existing + tidied) ────────────────────────────────────
const QUIZ1_QUESTIONS = [
  {
    q: 'What is the term for the time between peak rainfall and peak river discharge on a storm hydrograph?',
    opts: ['Lag time', 'Peak discharge', 'Rising limb', 'Recession limb'],
    ans: 0,
    topic: 'Rivers',
    exp: 'Lag time is the gap between peak rainfall and peak discharge. A short lag time means fast run-off and higher flood risk - common in urban areas with impermeable surfaces.',
  },
  {
    q: 'Which type of wave has a strong swash, weak backwash, and builds up beaches?',
    opts: ['Destructive wave', 'Constructive wave', 'Tsunami', 'Storm surge'],
    ans: 1,
    topic: 'Coasts',
    exp: 'Constructive waves have low frequency and strong swash. They carry material up the beach and deposit it, building beaches and spits over time.',
  },
  {
    q: 'What erosion process involves rocks carried by a river scraping and wearing down the riverbed?',
    opts: ['Hydraulic action', 'Attrition', 'Abrasion', 'Corrosion'],
    ans: 2,
    topic: 'Rivers',
    exp: 'Abrasion is the sandpapering effect of sediment dragged along the riverbed. It deepens and widens river channels, especially in the middle and lower course.',
  },
  {
    q: 'What is the Human Development Index (HDI) a composite of?',
    opts: ['GDP, trade, and military strength', 'Income, education, and life expectancy', 'Population, area, and exports', 'Birth rate, death rate, and migration'],
    ans: 1,
    topic: 'Development',
    exp: 'HDI combines three measures: GNI per capita (income), mean years of schooling (education), and life expectancy at birth. It gives a broader picture than GDP alone.',
  },
  {
    q: 'What term describes the net movement of sediment along a coastline due to waves approaching at an angle?',
    opts: ['Saltation', 'Attrition', 'Longshore drift', 'Traction'],
    ans: 2,
    topic: 'Coasts',
    exp: 'Longshore drift occurs when waves approach at an angle. Swash carries sediment up at that angle; backwash pulls it straight back down, creating a zigzag net movement along the coast.',
  },
  {
    q: "In Frank's Dependency Theory, what does the 'core' represent?",
    opts: ['Rural farming communities', 'Poor developing countries', 'Wealthy industrialised countries', 'International aid organisations'],
    ans: 2,
    topic: 'Development',
    exp: "In Frank's model, the 'core' represents wealthy HICs that exploit the 'periphery' (poorer LICs) through unequal trade - keeping them dependent and underdeveloped.",
  },
  {
    q: "Which Indian city is known as 'India's Silicon Valley' due to its large IT sector?",
    opts: ['Mumbai', 'Delhi', 'Kolkata', 'Bangalore'],
    ans: 3,
    topic: 'India',
    exp: 'Bangalore (Bengaluru) is home to major IT companies like Infosys, Wipro, and TCS. It generates around 35% of India\'s total IT exports.',
  },
  {
    q: 'What landform is created when a meander neck is cut through during a flood, isolating the old bend?',
    opts: ['Floodplain', 'Ox-bow lake', 'Levée', 'Point bar'],
    ans: 1,
    topic: 'Rivers',
    exp: 'When a meander neck is breached during flooding, the old bend gets cut off and fills with still water - forming a crescent-shaped ox-bow lake.',
  },
  {
    q: 'What is the fastest eroding coastline in Europe, losing up to 2m per year?',
    opts: ['Dorset coast', 'Holderness coast (Yorkshire)', 'Norfolk coast', 'Cornish coast'],
    ans: 1,
    topic: 'Coasts',
    exp: 'The Holderness coast is made of soft boulder clay, has a long fetch from the North Sea, and very narrow beaches - making it erode up to 2m per year.',
  },
  {
    q: "In development, what does 'bottom-up' development prioritise?",
    opts: ['Large dams funded by governments', 'Local communities designing their own projects', 'Foreign investment from TNCs', 'World Bank loans for infrastructure'],
    ans: 1,
    topic: 'Development',
    exp: 'Bottom-up development involves local communities in the design and running of projects. Examples include micro-finance schemes and village water pumps - they meet real local needs.',
  },
  {
    q: 'What do you call the flat, rocky shelf left behind as a cliff retreats due to wave erosion?',
    opts: ['Floodplain', 'Wave-cut platform', 'Beach', 'Continental shelf'],
    ans: 1,
    topic: 'Coasts',
    exp: 'A wave-cut platform is the flat area of rock exposed at low tide at the base of a retreating cliff. It extends seaward as the cliff moves back over time.',
  },
  {
    q: "Rostow's Modernisation Theory argues that all countries must pass through how many stages?",
    opts: ['3', '4', '5', '7'],
    ans: 2,
    topic: 'Development',
    exp: 'Rostow identified 5 stages: Traditional society → Pre-conditions for take-off → Take-off → Drive to maturity → Mass consumption. Critics say it ignores colonialism.',
  },
  {
    q: 'Which river flooded catastrophically in Sheffield in June 2007?',
    opts: ['River Severn', 'River Thames', 'River Don', 'River Trent'],
    ans: 2,
    topic: 'Rivers',
    exp: "The River Don flooded after 90mm of rain fell in just 12 hours - a month's worth in a day. 1,500 homes were flooded and damage cost ~£50 million.",
  },
  {
    q: 'What is the name of the large top-down dam project built on the Narmada River in India?',
    opts: ['Hoover Dam', 'Three Gorges Dam', 'Sardar Sarovar Dam', 'Aswan High Dam'],
    ans: 2,
    topic: 'India',
    exp: 'The Sardar Sarovar Dam provides water for 20 million people and generates 1,450 MW of power - but displaced over 320,000 people from their homes.',
  },
  {
    q: 'What does SEWA stand for, and what does it do?',
    opts: ["State Economic Welfare Association - funds government projects", "Self Employed Women's Association - provides micro-loans to informal female workers", 'South East Water Authority - manages irrigation', 'Social Equality and Welfare Agency - distributes foreign aid'],
    ans: 1,
    topic: 'India',
    exp: "SEWA (Self Employed Women's Association) was founded in Ahmedabad in 1972. It provides micro-loans, legal support, and healthcare to India's informal female workforce - now with 2 million members.",
  },
];

// ─── QUIZ 2 QUESTIONS ─────────────────────────────────────────────────────────
const QUIZ2_QUESTIONS = [
  {
    q: 'What type of rock forms concordant coastlines, where rock bands run parallel to the coast?',
    opts: ['Rock bands at right angles to the sea', 'Rock bands parallel to the sea', 'Completely uniform soft rock', 'Volcanic rock only'],
    ans: 1,
    topic: 'Coasts',
    exp: 'Concordant coasts have rock bands running parallel to the coast, giving a more uniform, straight shoreline. The Jurassic Coast in Dorset is an example of a discordant coastline where bands are at right angles.',
  },
  {
    q: 'During the Somerset Levels floods of 2013-14, approximately how many homes were flooded?',
    opts: ['Around 100', 'Around 600', 'Around 2,000', 'Around 10,000'],
    ans: 1,
    topic: 'Rivers',
    exp: 'Around 600 homes were flooded across the Somerset Levels in winter 2013-14. The area flooded for weeks due to a combination of heavy rainfall, flat land, and years of reduced dredging on the rivers Tone and Parrett.',
  },
  {
    q: 'What is a groyne, and why is it used in coastal management?',
    opts: ['A sea wall built parallel to the coast to absorb wave energy', 'A wooden or rock barrier built at right angles to the shore to trap sediment', 'A type of managed retreat policy', 'An offshore reef used to reduce wave height'],
    ans: 1,
    topic: 'Coasts',
    exp: 'Groynes are barriers built at right angles to the coast to interrupt longshore drift and build up beaches. Wider beaches absorb more wave energy, protecting the land behind.',
  },
  {
    q: 'Which process causes undercutting at the base of a cliff, eventually leading to cliff collapse?',
    opts: ['Attrition', 'Saltation', 'Hydraulic action', 'Freeze-thaw weathering'],
    ans: 2,
    topic: 'Coasts',
    exp: 'Hydraulic action at the base of cliffs compresses air into cracks, widening them over time. This undercuts the cliff, creating a wave-cut notch, and eventually the overhang collapses.',
  },
  {
    q: 'What is the name for the point on a storm hydrograph where river discharge is at its highest?',
    opts: ['Lag time', 'Base flow', 'Peak discharge', 'Bankfull discharge'],
    ans: 2,
    topic: 'Rivers',
    exp: "Peak discharge is the highest point on the rising limb of a hydrograph - the moment the river carries the most water. After this the recession limb shows discharge falling back towards base flow.",
  },
  {
    q: "Malawi's GNI per capita is approximately:",
    opts: ['$400', '$4,000', '$14,000', '$40,000'],
    ans: 0,
    topic: 'Development',
    exp: "Malawi's GNI per capita is around $400 - making it one of the world's poorest countries. It scores low on HDI due to low life expectancy (~64 years), limited education, and reliance on subsistence farming.",
  },
  {
    q: 'What does managed retreat (coastal realignment) involve?',
    opts: ['Building higher sea walls to protect all land', 'Allowing the sea to flood low-value land, creating natural habitats', 'Pumping sand onto beaches from offshore', 'Planting trees to stabilise cliff faces'],
    ans: 1,
    topic: 'Coasts',
    exp: 'Managed retreat involves deliberately allowing the sea to flood low-value land, typically creating salt marshes. These act as natural buffers absorbing wave energy. It is cheaper than hard engineering and improves biodiversity.',
  },
  {
    q: 'What is a levée, and how does it form naturally?',
    opts: ['A meander formed by erosion on the outer bank', 'A raised embankment of sediment deposited alongside a river during repeated floods', 'A flat area of land deposited by a river as it enters the sea', 'A type of waterfall found in the upper course'],
    ans: 1,
    topic: 'Rivers',
    exp: 'Levées form as a river floods and loses velocity, depositing the heaviest sediment closest to the channel. Over many floods these deposits build up into raised banks alongside the river.',
  },
  {
    q: "India's population is approximately:",
    opts: ['700 million', '1 billion', '1.4 billion', '2 billion'],
    ans: 2,
    topic: 'India',
    exp: "India's population is approximately 1.4 billion, making it the world's most populous country. It has a young population structure - a median age of around 28 - which supports economic growth.",
  },
  {
    q: 'What is the difference between a TNC and an MNC?',
    opts: ['There is no difference - the terms are interchangeable', 'TNCs operate in fewer than 5 countries; MNCs operate globally', 'TNCs are state-owned; MNCs are privately owned', 'TNCs only invest in HICs; MNCs invest anywhere'],
    ans: 0,
    topic: 'Development',
    exp: 'TNC (Transnational Corporation) and MNC (Multinational Corporation) are used interchangeably. Both describe companies that operate in multiple countries - like Nike, Apple, or Coca-Cola.',
  },
  {
    q: "What were the main causes of the Holderness cliff collapse at Mappleton?",
    opts: ['Hard granite cliffs undercut by tidal erosion', 'Soft boulder clay cliffs attacked by powerful waves with a long fetch', 'Volcanic activity destabilising the coastline', 'Excessive tourism eroding the cliff top'],
    ans: 1,
    topic: 'Coasts',
    exp: 'Holderness is made of soft glacial boulder clay, easily eroded by powerful North Sea waves with a fetch stretching to Scandinavia. The narrow beach provides little protection. Mappleton was defended with rock armour and groynes in 1991.',
  },
  {
    q: 'In river management, what is the purpose of afforestation in a river\'s upper catchment?',
    opts: ['To increase run-off speed and raise discharge', 'To intercept rainfall and increase lag time, reducing flood risk downstream', 'To straighten the river channel', 'To provide timber for flood barrier construction'],
    ans: 1,
    topic: 'Rivers',
    exp: 'Trees intercept rainfall - leaves catch water and roots absorb it - slowing the rate it reaches the river. This increases lag time and reduces peak discharge, lowering flood risk downstream.',
  },
  {
    q: "What is India's HDI ranking approximately?",
    opts: ['Top 10 globally', 'Around 50th', 'Around 130th', 'Bottom 10 globally'],
    ans: 2,
    topic: 'India',
    exp: "India ranks around 130th out of 193 countries on the HDI - classified as 'medium human development'. Despite rapid economic growth, inequality remains high: the Gini coefficient shows a large gap between rich and poor.",
  },
  {
    q: 'What is the difference between hard and soft engineering coastal defences?',
    opts: ['Hard engineering uses natural materials; soft uses concrete', 'Hard engineering uses artificial structures; soft works with natural processes', 'Hard engineering is always cheaper; soft is more expensive', 'There is no real difference in terms of effectiveness'],
    ans: 1,
    topic: 'Coasts',
    exp: 'Hard engineering (sea walls, rock armour, groynes) uses artificial structures to resist the sea. Soft engineering (beach nourishment, managed retreat, dune stabilisation) works with natural processes. Soft is generally cheaper and more sustainable long-term.',
  },
  {
    q: 'What does the Gini coefficient measure?',
    opts: ['The total GDP of a country', 'Income inequality within a country (0 = perfect equality, 1 = maximum inequality)', 'The rate of economic growth per year', 'The number of people living below the poverty line'],
    ans: 1,
    topic: 'Development',
    exp: 'The Gini coefficient measures income inequality. A score of 0 means everyone earns the same; 1 means one person earns everything. The UK scores around 0.35; India around 0.33 - but with huge urban-rural divides.',
  },
];

// ─── SHARED QUIZ COMPONENT ────────────────────────────────────────────────────
function QuizGame({ questions, quizNum, onBack }) {
  const [shuffled] = useState(() => [...questions].sort(() => Math.random() - 0.5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [key, setKey] = useState(0);

  const current = shuffled[currentIndex];
  const isAnswered = selected !== null;
  const isCorrect = selected === current?.ans;

  const handleAnswer = (optIndex) => {
    if (isAnswered) return;
    setSelected(optIndex);
    if (optIndex === current.ans) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= shuffled.length) setFinished(true);
    else { setCurrentIndex(i => i + 1); setSelected(null); }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setKey(k => k + 1);
  };

  const topicColor = (topic) => {
    if (topic === 'Rivers') return { bg: '#eff6ff', color: '#1d4ed8' };
    if (topic === 'Coasts') return { bg: '#ecfdf5', color: '#065f46' };
    if (topic === 'Development') return { bg: '#faf5ff', color: '#7e22ce' };
    if (topic === 'India') return { bg: '#fff7ed', color: '#c2410c' };
    return { bg: '#f3f4f6', color: '#374151' };
  };

  if (finished) {
    const pct = Math.round((score / shuffled.length) * 100);
    const emoji = pct >= 80 ? '🎉' : pct >= 60 ? '⭐' : '📚';
    const msg = pct >= 80 ? 'Brilliant - you really know this material!' : pct >= 60 ? 'Good effort - review the ones you missed and try again.' : "Keep revising - try again after going through the topics.";
    return (
      <div className="quiz-view">
        <div className="quiz-finished">
          <div style={{ fontSize: '64px', marginBottom: '0.5rem' }}>{emoji}</div>
          <h2 className="quiz-finished-title">Quiz {quizNum} complete!</h2>
          <p className="quiz-score">You scored <strong>{score}</strong> out of {shuffled.length}</p>
          <p className="quiz-percentage">{pct}%</p>
          <p className="quiz-message">{msg}</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
            <button className="btn-primary" onClick={handleRestart}>Try again</button>
            <button onClick={onBack} style={{ padding: '10px 20px', borderRadius: '8px', border: '0.5px solid #d1d5db', background: 'transparent', cursor: 'pointer', fontSize: '14px' }}>← Back to quizzes</button>
          </div>
        </div>
      </div>
    );
  }

  const tc = topicColor(current.topic);

  return (
    <div className="quiz-view" key={key}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: '0.5px solid #d1d5db', borderRadius: '8px', padding: '6px 10px', fontSize: '13px', color: '#6b7280', cursor: 'pointer' }}>← Back</button>
        <div style={{ flex: 1 }}>
          <div className="quiz-meta" style={{ margin: 0 }}>
            <span>Question {currentIndex + 1} of {shuffled.length}</span>
            <span>Score: {score}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
        {shuffled.map((_, i) => (
          <div key={i} style={{ flex: 1, height: '4px', borderRadius: '99px', background: i < currentIndex ? '#1D9E75' : i === currentIndex ? '#185FA5' : '#e5e7eb' }} />
        ))}
      </div>

      <div className="quiz-card">
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '99px', background: tc.bg, color: tc.color, fontWeight: '500' }}>{current.topic}</span>
        </div>
        <p className="quiz-question">{current.q}</p>

        <div className="quiz-options">
          {current.opts.map((opt, i) => {
            let optClass = 'quiz-opt';
            if (isAnswered) {
              if (i === current.ans) optClass += ' quiz-opt--correct';
              else if (i === selected) optClass += ' quiz-opt--wrong';
            }
            return (
              <button key={i} className={optClass} onClick={() => handleAnswer(i)} disabled={isAnswered}>
                {opt}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`quiz-feedback ${isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'}`}>
            <strong>{isCorrect ? 'Correct!' : 'Not quite.'}</strong> {current.exp}
          </div>
        )}

        {isAnswered && (
          <button className="btn-primary quiz-next-btn" onClick={handleNext}>
            {currentIndex + 1 >= shuffled.length ? 'See results' : 'Next question →'}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── QUIZ HUB ─────────────────────────────────────────────────────────────────
function QuizHub({ onSelect }) {
  const quizzes = [
    {
      id: 1,
      title: 'Quiz 1',
      subtitle: 'Rivers · Coasts · Development · India',
      questions: 15,
      color: '#185FA5',
      topics: ['Rivers', 'Coasts', 'Development', 'India'],
    },
    {
      id: 2,
      title: 'Quiz 2',
      subtitle: 'Coastal management · Flooding · Development · India',
      questions: 15,
      color: '#D85A30',
      topics: ['Coasts', 'Rivers', 'Development', 'India'],
    },
  ];

  const topicColor = (t) => {
    if (t === 'Rivers') return { bg: '#eff6ff', color: '#1d4ed8' };
    if (t === 'Coasts') return { bg: '#ecfdf5', color: '#065f46' };
    if (t === 'Development') return { bg: '#faf5ff', color: '#7e22ce' };
    if (t === 'India') return { bg: '#fff7ed', color: '#c2410c' };
    return { bg: '#f3f4f6', color: '#374151' };
  };

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', paddingBottom: '2rem' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '6px' }}>Quiz Me</h2>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Two quizzes of 15 questions each - questions are shuffled every time. Both cover the topics on your mock exam. Good luck!
      </p>

      <div style={{ background: '#fffbeb', border: '0.5px solid #fde68a', borderRadius: '10px', padding: '12px 14px', marginBottom: '1.5rem', fontSize: '13px', color: '#92400e', lineHeight: 1.6 }}>
        🎯 <strong>Exam tip:</strong> If you get one wrong, read the explanation carefully - the facts in each explanation are exactly the kind of detail that earns marks.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {quizzes.map(q => (
          <button key={q.id} onClick={() => onSelect(q.id)} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '16px', background: '#ffffff', border: '0.5px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', width: '100%', borderLeft: `4px solid ${q.color}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600', fontSize: '16px', color: '#1a1a2e' }}>{q.title}</span>
                <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '99px', background: '#f3f4f6', color: '#374151' }}>{q.questions} questions</span>
              </div>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 8px' }}>{q.subtitle}</p>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {q.topics.map(t => {
                  const tc = topicColor(t);
                  return <span key={t} style={{ fontSize: '11px', padding: '2px 7px', borderRadius: '99px', background: tc.bg, color: tc.color, fontWeight: '500' }}>{t}</span>;
                })}
              </div>
            </div>
            <span style={{ fontSize: '20px', color: '#9ca3af', flexShrink: 0 }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function Quiz() {
  const [active, setActive] = useState(null);

  if (active === 1) return <QuizGame questions={QUIZ1_QUESTIONS} quizNum={1} onBack={() => setActive(null)} />;
  if (active === 2) return <QuizGame questions={QUIZ2_QUESTIONS} quizNum={2} onBack={() => setActive(null)} />;

  return <QuizHub onSelect={setActive} />;
}