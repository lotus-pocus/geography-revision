import { useState, useCallback } from 'react';

const QUESTIONS = [
  {
    q: 'What is the term for the time between peak rainfall and peak river discharge on a storm hydrograph?',
    opts: ['Lag time', 'Peak discharge', 'Rising limb', 'Recession limb'],
    ans: 0,
    exp: 'Lag time is the gap between peak rainfall and peak discharge. A short lag time means fast run-off and higher flood risk — common in urban areas.',
  },
  {
    q: 'Which type of wave has a strong swash, weak backwash, and builds up beaches?',
    opts: ['Destructive wave', 'Constructive wave', 'Tsunami', 'Storm surge'],
    ans: 1,
    exp: 'Constructive waves have low frequency and strong swash — they carry material up the beach and deposit it, building beaches and spits.',
  },
  {
    q: 'What erosion process involves rocks carried by a river scraping and wearing down the riverbed?',
    opts: ['Hydraulic action', 'Attrition', 'Abrasion', 'Corrosion'],
    ans: 2,
    exp: 'Abrasion is the sandpapering effect of sediment being dragged along the riverbed. It deepens and widens river channels.',
  },
  {
    q: 'What is the Human Development Index (HDI) a composite of?',
    opts: ['GDP, trade, and military strength', 'Income, education, and life expectancy', 'Population, area, and exports', 'Birth rate, death rate, and migration'],
    ans: 1,
    exp: 'HDI combines three measures: GNI per capita (income), mean years of schooling (education), and life expectancy at birth.',
  },
  {
    q: 'What term describes the net movement of sediment along a coastline due to waves approaching at an angle?',
    opts: ['Saltation', 'Attrition', 'Longshore drift', 'Traction'],
    ans: 2,
    exp: 'Longshore drift occurs when waves approach at an angle — swash carries sediment up at that angle, backwash pulls it straight back, creating a zigzag net movement.',
  },
  {
    q: "In Frank's Dependency Theory, what does the 'core' represent?",
    opts: ['Rural farming communities', 'Poor developing countries', 'Wealthy industrialised countries', 'International aid organisations'],
    ans: 2,
    exp: "In Frank's model, the 'core' represents wealthy HICs that exploit the 'periphery' (poorer LICs) through trade and investment — keeping them dependent and underdeveloped.",
  },
  {
    q: "Which Indian city is known as 'India's Silicon Valley' due to its large IT sector?",
    opts: ['Mumbai', 'Delhi', 'Kolkata', 'Bangalore'],
    ans: 3,
    exp: 'Bangalore (now officially Bengaluru) is home to major IT companies like Infosys, Wipro, and TCS, and hosts many international tech company offices.',
  },
  {
    q: 'What landform is created when a meander neck is cut through during a flood, isolating the old bend?',
    opts: ['Floodplain', 'Ox-bow lake', 'Levée', 'Point bar'],
    ans: 1,
    exp: "When a meander neck is breached during flooding, the old meander bend gets cut off from the main channel and fills with still water — forming a crescent-shaped ox-bow lake.",
  },
  {
    q: 'What is the fastest eroding coastline in Europe, losing up to 2m per year?',
    opts: ['Dorset coast', 'Holderness coast (Yorkshire)', 'Norfolk coast', 'Cornish coast'],
    ans: 1,
    exp: 'The Holderness coast in East Yorkshire is made of soft boulder clay, has a long fetch from Scandinavia, and narrow beaches — making it the fastest eroding coast in Europe.',
  },
  {
    q: "In development, what does 'bottom-up' development prioritise?",
    opts: ['Large dams and motorways funded by governments', 'Local communities designing and leading their own projects', 'Foreign investment from TNCs', 'World Bank loans for infrastructure'],
    ans: 1,
    exp: 'Bottom-up development involves local communities in the design and running of projects. Examples include micro-finance schemes and village water pumps — they meet real local needs.',
  },
  {
    q: "What do you call the flat, rocky shelf left behind as a cliff retreats due to wave erosion?",
    opts: ['Floodplain', 'Wave-cut platform', 'Beach', 'Continental shelf'],
    ans: 1,
    exp: 'A wave-cut platform is the flat area of rock exposed at low tide at the base of a retreating cliff. It extends seaward as the cliff moves back over time.',
  },
  {
    q: "Rostow's Modernisation Theory argues that all countries must pass through how many stages?",
    opts: ['3', '4', '5', '7'],
    ans: 2,
    exp: 'Rostow identified 5 stages: Traditional society → Pre-conditions for take-off → Take-off → Drive to maturity → Mass consumption.',
  },
  {
    q: 'Which river flooded catastrophically in Sheffield in June 2007?',
    opts: ['River Severn', 'River Thames', 'River Don', 'River Trent'],
    ans: 2,
    exp: "The River Don (and River Sheaf) flooded after 90mm of rain fell in just 12 hours — a month's worth in a single day. 1,500 homes were flooded and damage cost ~£50 million.",
  },
  {
    q: 'What is the name of the large top-down dam project built on the Narmada River in India?',
    opts: ['Hoover Dam', 'Three Gorges Dam', 'Sardar Sarovar Dam', 'Aswan High Dam'],
    ans: 2,
    exp: 'The Sardar Sarovar Dam on the Narmada River in Gujarat provides water for 20 million people and generates 1,450 MW of power — but displaced 320,000+ people.',
  },
  {
    q: 'What does SEWA stand for, and what does it do?',
    opts: ['State Economic Welfare Association — funds government projects', 'Self Employed Women\'s Association — provides micro-loans and support to informal female workers', 'South East Water Authority — manages irrigation', 'Social Equality and Welfare Agency — distributes foreign aid'],
    ans: 1,
    exp: "SEWA (Self Employed Women's Association) was founded in Ahmedabad in 1972. It provides micro-loans, legal support, childcare, and healthcare to India's informal female workforce — now with 2 million members.",
  },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function Quiz() {
  const [questions, setQuestions] = useState(() => shuffle(QUESTIONS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];
  const isAnswered = selected !== null;
  const isCorrect = selected === current?.ans;

  const handleAnswer = (optIndex) => {
    if (isAnswered) return;
    setSelected(optIndex);
    if (optIndex === current.ans) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const handleRestart = useCallback(() => {
    setQuestions(shuffle(QUESTIONS));
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }, []);

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    let message = '';
    if (pct >= 80) message = 'Brilliant work — you really know this material!';
    else if (pct >= 60) message = 'Good effort — review the ones you missed and try again.';
    else message = "Keep revising — you'll get there! Try again after going through the topics.";

    return (
      <div className="quiz-view">
        <div className="quiz-finished">
          <h2 className="quiz-finished-title">Quiz complete!</h2>
          <p className="quiz-score">
            You scored <strong>{score}</strong> out of {questions.length}
          </p>
          <p className="quiz-percentage">{pct}%</p>
          <p className="quiz-message">{message}</p>
          <button className="btn-primary" onClick={handleRestart}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-view">
      <div className="quiz-meta">
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      <div className="quiz-card">
        <p className="quiz-question">{current.q}</p>

        <div className="quiz-options">
          {current.opts.map((opt, i) => {
            let optClass = 'quiz-opt';
            if (isAnswered) {
              if (i === current.ans) optClass += ' quiz-opt--correct';
              else if (i === selected) optClass += ' quiz-opt--wrong';
            }
            return (
              <button
                key={i}
                className={optClass}
                onClick={() => handleAnswer(i)}
                disabled={isAnswered}
              >
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
            {currentIndex + 1 >= questions.length ? 'See results' : 'Next question →'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;