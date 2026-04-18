const development = [
  {
    id: "d1",
    title: "Measuring Development",
    category: "development",
    points: [
      "Development = improving quality of life and standard of living.",
      "Countries are grouped by development level: HICs (High Income Countries), LICs (Low Income Countries), and NEEs (Newly Emerging Economies).",
      "Economic indicators: GDP per capita, GNI per capita.",
      "Social indicators: literacy rate, infant mortality rate, life expectancy, access to clean water.",
      "The Human Development Index (HDI) combines income, education, and life expectancy into one score (0–1).",
      "Limitations of HDI: averages hide inequality within a country; ignores environmental quality, freedom, happiness.",
    ],
    terms: [
      {
        term: "HIC",
        def: "High Income Country - a wealthy, developed nation (e.g. UK, USA, Germany). High HDI, high GNI per capita, good healthcare and education.",
      },
      {
        term: "LIC",
        def: "Low Income Country - a poor, less developed nation (e.g. Malawi, Chad, Afghanistan). Low HDI, low GNI per capita, limited access to services.",
      },
      {
        term: "NEE",
        def: "Newly Emerging Economy - a country rapidly developing from LIC to middle-income status (e.g. India, Brazil, China). Growing fast but still has significant inequality.",
      },
      {
        term: "GDP",
        def: "Gross Domestic Product - total value of goods and services produced in a country per year.",
      },
      {
        term: "GNI",
        def: "Gross National Income - GDP plus income from overseas. Better measure of wealth.",
      },
      {
        term: "HDI",
        def: "Human Development Index - composite measure (0–1) combining income, education, life expectancy.",
      },
      {
        term: "Infant mortality rate",
        def: "Number of children who die before age 1, per 1,000 live births - key development indicator.",
      },
    ],
    examTip:
      "HDI is the most important single measure - know its three components and why it's better than GDP alone (but still has limits). Always use the correct term - HIC not 'developed country', LIC not 'third world'.",
  },
  {
    id: "d2",
    title: "Development and Population",
    category: "development",
    points: [
      "The Demographic Transition Model (DTM) shows the relationship between birth rates, death rates and population as a country develops. It has 5 stages.",
      "Stage 1: High birth rate AND high death rate - population is low and stable. Pre-industrial societies, no access to medicine or clean water.",
      "Stage 2: Death rate falls rapidly (improvements in medicine, sanitation, food supply) but birth rate stays high - population grows fast. Most LICs are here.",
      "Stage 3: Birth rate begins to fall (access to contraception, family planning, women in education, desire for smaller families) - population still growing but more slowly.",
      "Stage 4: Both birth rate and death rate are low - population is high but stable. Most HICs are here.",
      "Stage 5: Birth rate drops below death rate - population may start to decline. Ageing population increases death rate slightly. Some European countries (e.g. Germany, Italy) are at Stage 5.",
      "The DTM does NOT show migration - only natural change (births and deaths).",
      "Natural increase = birth rate minus death rate. When birth rate > death rate, population grows.",
    ],
    terms: [
      {
        term: "DTM",
        def: "Demographic Transition Model - shows how birth rates, death rates and population change as a country develops through 5 stages.",
      },
      {
        term: "Birth rate",
        def: "Number of live births per 1,000 people per year.",
      },
      {
        term: "Death rate",
        def: "Number of deaths per 1,000 people per year.",
      },
      {
        term: "Natural increase",
        def: "Birth rate minus death rate - positive = population growing, negative = population declining.",
      },
      {
        term: "Natural decrease",
        def: "When death rate exceeds birth rate - population declines. Stage 5 of the DTM.",
      },
      {
        term: "Ageing population",
        def: "When a high proportion of the population is elderly - typical of Stage 4/5 HICs. Puts pressure on healthcare and pensions.",
      },
    ],
    images: [
      {
        src: "/images/DTM.png",
        caption:
          "The Demographic Transition Model across 5 stages. Stage 1: both birth rate (orange) and death rate (black) are high - population (red) is low. Stage 2: death rate falls sharply, birth rate stays high - population grows rapidly (blue shading = natural increase). Stage 3: birth rate begins to fall - population growth slows. Stage 4: both rates are low - population is high and stable. Stage 5: birth rate dips below death rate - natural decrease begins and population may decline.",
      },
    ],
    examTip:
      "Know all 5 stages and be able to say WHERE a country sits on the DTM - LICs are typically Stage 2, NEEs Stage 3, HICs Stage 4/5. Also be able to describe population pyramids - wide base tapering quickly = Stage 2 LIC. More rectangular = Stage 4 HIC.",
  },
  {
    id: "d3",
    title: "Causes of Global Inequalities",
    category: "development",
    points: [
      "Physical factors: landlocked countries lack trade access; arid/dry climates → poor harvests; natural hazards destroy infrastructure.",
      "Historical factors: colonialism - European countries extracted resources and wealth from colonies for centuries.",
      "Trade: HICs dominate global trade rules (WTO); LICs often export raw materials at low prices and import manufactured goods at high prices.",
      "Political instability: conflict diverts money from development; corruption means aid does not reach the poorest.",
      "Debt: many LICs borrowed money from the World Bank/IMF in the 1970s–80s - repayments drain government budgets.",
    ],
    terms: [
      {
        term: "Colonialism",
        def: "When powerful countries controlled and exploited other nations - major cause of inequality today.",
      },
      {
        term: "Terms of trade",
        def: "The ratio of export prices to import prices - often unfair for LICs.",
      },
      {
        term: "Debt cycle",
        def: "LICs borrow → struggle to repay → borrow more → cannot develop properly.",
      },
    ],
    examTip:
      "Think about PHYSICAL, HISTORICAL, and ECONOMIC causes - aim for one of each in a 6-mark answer.",
  },
  {
    id: "d4",
    title: "Consequences of Global Inequalities",
    category: "development",
    points: [
      "Lower life expectancy in LICs - preventable diseases kill millions (malaria, diarrhoea).",
      "Food insecurity: 800 million+ people face hunger - climate change worsening this.",
      "Education gap: 260 million children not in school globally - mostly girls in LICs.",
      "Conflict over resources (water, land) linked to poverty.",
      "Brain drain: skilled workers leave LICs for better wages in HICs → worsens development.",
    ],
    terms: [
      {
        term: "Brain drain",
        def: "Emigration of educated/skilled workers from LICs to HICs - removes human capital.",
      },
      {
        term: "Food insecurity",
        def: "Not having reliable access to sufficient, safe, nutritious food.",
      },
      {
        term: "Preventable disease",
        def: "Illness that could be avoided with clean water, vaccines, or basic healthcare.",
      },
    ],
    examTip:
      "Link consequences to causes - e.g. debt → less money for healthcare → higher infant mortality. Chains of cause and effect earn marks.",
  },
  {
    id: "d5",
    title: "Case Study: Malawi",
    category: "development",
    isCaseStudy: true,
    points: [
      "Malawi is a landlocked country in southern Africa - HDI rank 172 out of 189 countries.",
      "Population of 19.4 million but cannot support its rate of population growth - 51% live in relative poverty, 25% in extreme poverty (under $1.90/day).",
      "Only 35% of children aged 11 complete primary education - fewer doctors, engineers and teachers means development is severely limited.",
      "Physical isolation: landlocked with mountainous terrain - goods must travel by train to the port of Mozambique to be exported, adding cost and time. 85% of the population is rural with dirt roads as their only transport.",
      "Climate challenge: 80% of people rely on agriculture, but climate change brings reduced rainfall and longer heatwaves - causing crop failures and food shortages. Intensive farming also strips soils of nutrients.",
      "Trade inequality: Malawi exports tobacco, tea, coffee and sugar - but EU tariffs on processed goods are higher than raw materials. This forces Malawi to export cheap raw coffee beans instead of higher-value roasted coffee, limiting profits.",
      "Corruption rated 123 out of 180 countries - limits foreign investment and means aid does not always reach the poorest.",
      "Positives: stable government since 1964; economy growing at 4% per year; receives international support from the UK, World Bank, and NGOs such as Christian Aid and WaterAid.",
    ],
    terms: [
      {
        term: "Landlocked",
        def: "Surrounded by land with no sea access - goods must travel overland to reach ports, increasing trade costs.",
      },
      {
        term: "Subsistence farming",
        def: "Farming only enough food for personal survival - no surplus to sell.",
      },
      {
        term: "Tariff",
        def: "A tax on imported or exported goods - EU tariffs on processed goods force Malawi to export cheap raw materials instead of higher-value products.",
      },
      {
        term: "Extreme poverty",
        def: "Living on less than $1.90 per day - affects 25% of Malawi's population.",
      },
      {
        term: "Corruption",
        def: "Malawi rated 123/180 for corruption - bribery in courts limits investment and development.",
      },
    ],
    images: [
      {
        src: "/images/MalawiMap.jpg",
        caption:
          "Malawi is a landlocked country in southern Africa - completely surrounded by Zambia, Tanzania and Mozambique. Goods must travel by train to the port of Mozambique to reach international markets, adding significant cost and time to exports.",
      },
    ],
    note: "Why are tariffs imposed on Malawi? The EU charges higher tariffs on processed goods (like roasted coffee) than on raw materials (like raw coffee beans). This forces Malawi to export cheap raw materials rather than higher-value processed goods - so they make less profit from trade. It's a key example of how global trade rules keep LICs poor, and directly supports Frank's Dependency Theory.",
    examTip:
      "Malawi is the perfect contrast to India - use specific stats: HDI rank 172, 25% extreme poverty, 35% primary school completion. The tariff example is brilliant for showing how global trade rules keep LICs poor - link it to Frank's Dependency Theory.",
  },
  {
    id: "d6",
    title: "Rostow's Modernisation Theory",
    category: "development",
    points: [
      "Rostow (1960) argued ALL countries pass through 5 stages of development.",
      "Stage 1: Traditional society (farming). Stage 2: Pre-conditions for take-off (investment begins).",
      "Stage 3: Take-off (manufacturing grows rapidly - like UK in Industrial Revolution).",
      "Stage 4: Drive to maturity. Stage 5: Mass consumption (like USA today).",
      "Criticism: assumes Western model is the goal; ignores colonialism; not all countries follow the same path.",
    ],
    terms: [
      {
        term: "Modernisation theory",
        def: "Development theory arguing countries progress through universal stages - championed by Western economists.",
      },
      {
        term: "Take-off",
        def: "Rostow's Stage 3 - rapid industrialisation and economic growth.",
      },
    ],
    examTip:
      "The exam often asks you to evaluate development theories - always include criticism. Rostow ignores historical exploitation of LICs.",
  },
  {
    id: "d7",
    title: "Frank's Dependency Theory",
    category: "development",
    points: [
      "André Gunder Frank (1967): LICs are poor BECAUSE of HICs, not despite them.",
      '"Core" (HICs) exploits the "periphery" (LICs) through unfair trade, debt, and neo-colonialism.',
      "Resources and wealth flow from LICs to HICs through trade - LICs locked into exporting raw materials.",
      "Neo-colonialism: HICs still control LICs through debt repayments, trade rules, and multinational companies.",
      "Solution: LICs should trade with each other and develop independently.",
    ],
    terms: [
      {
        term: "Dependency theory",
        def: "Argues LICs cannot develop while exploited by HICs - wealth flows from poor to rich countries.",
      },
      {
        term: "Core-periphery",
        def: "Frank's model - wealthy 'core' countries exploit poorer 'periphery' countries.",
      },
      {
        term: "Neo-colonialism",
        def: "Modern form of control HICs exercise over LICs through economics rather than direct rule.",
      },
    ],
    examTip:
      "Frank CONTRASTS with Rostow - Rostow says LICs just need to follow HICs' path; Frank says HICs are blocking LICs' development.",
  },
  {
    id: "d8",
    title: "Development and Globalisation",
    category: "development",
    points: [
      "Globalisation = increasing connections between countries through trade, migration, communication, and culture.",
      "Transnational corporations (TNCs) operate across multiple countries - bring investment and jobs but take profits out.",
      "Trade blocs (EU, ASEAN) allow free trade between members - can exclude LICs.",
      "Internet and communications technology connect global markets but LICs have poor internet access.",
      "China and India have grown rapidly through globalisation - but inequality within these countries has increased too.",
    ],
    terms: [
      {
        term: "Globalisation",
        def: "The process by which the world is becoming increasingly interconnected.",
      },
      {
        term: "TNC",
        def: "Transnational corporation - a company that operates in multiple countries (e.g. Unilever, Apple).",
      },
      {
        term: "Trade bloc",
        def: "Group of countries that trade freely with each other (e.g. EU, ASEAN).",
      },
      {
        term: "FDI",
        def: "Foreign Direct Investment - money invested by a foreign company in a country.",
      },
    ],
    examTip:
      "For globalisation questions, think about WHO benefits - HICs and TNCs tend to benefit more than LIC workers and governments.",
  },
  {
    id: "d9",
    title: "Reducing Global Inequalities - Top-Down Development",
    category: "development",
    points: [
      "Top-down = large-scale projects imposed by governments/international organisations, often with little local involvement.",
      "Examples: large dams, motorways, industrial zones.",
      "Advantages: large scale, can boost the whole economy, attract foreign investment.",
      "Disadvantages: local communities not consulted; benefits often go to cities not rural poor; can create debt.",
      "World Bank and IMF loans often come with conditions that force LICs to cut public spending.",
    ],
    terms: [
      {
        term: "Top-down development",
        def: 'Large-scale, government-led projects - economic growth first, benefits expected to "trickle down".',
      },
      {
        term: "Trickle down",
        def: "The idea that economic growth at the top eventually benefits the poorest - often criticised as too slow.",
      },
    ],
    examTip:
      "Top-down vs bottom-up is a key theme. The exam will ask you to compare or evaluate these approaches.",
  },
  {
    id: "d10",
    title: "Reducing Global Inequalities - Bottom-Up Development",
    category: "development",
    points: [
      "Bottom-up = small-scale, community-led projects that directly involve local people.",
      "Examples: micro-finance (small loans to start a business), installing village water pumps, building local schools.",
      "Grameen Bank (Bangladesh): provides small loans to women to start businesses - transformed lives.",
      "Advantages: meets real local needs, empowers communities, sustainable.",
      "Disadvantages: small scale, slow, harder to fund, does not address large-scale structural problems.",
    ],
    terms: [
      {
        term: "Bottom-up development",
        def: "Small-scale projects that involve local communities in design and decision-making.",
      },
      {
        term: "Micro-finance",
        def: "Very small loans to poor people (especially women) to start or grow a business.",
      },
      {
        term: "NGO",
        def: "Non-governmental organisation - charities like Oxfam that run bottom-up projects.",
      },
    ],
    note: "Why are tariffs imposed on Malawi? The EU charges higher tariffs on processed goods (like roasted coffee) than on raw materials (like raw coffee beans). This forces Malawi to export cheap raw materials rather than higher-value processed goods - so they make less profit from trade. It's a key example of how global trade rules keep LICs poor, and directly supports Frank's Dependency Theory.",
    examTip:
      "Learn a specific bottom-up project by name - the Grameen Bank is perfect. Know where it is (Bangladesh), what it does, and why it works.",
  },
];

export default development;
