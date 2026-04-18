const hazardousEarth = [
  {
    id: 'h1',
    title: 'Global Circulation and Climate Zones',
    category: 'hazardous',
    points: [
      'The Earth has three main circulation cells in each hemisphere: Hadley Cell (0°-30°), Ferrel Cell (30°-60°), and Polar Cell (60°-90°).',
      'Hadley Cell (0°-30°): at the equator, intense solar heating causes warm air to rise - this creates low pressure and heavy rainfall (tropical rainforests). Air cools, spreads and sinks at 30° - creating high pressure and dry conditions (hot deserts like the Sahara).',
      'Ferrel Cell (30°-60°): air rises again at 60° and sinks at 30°. The UK sits in the Ferrel Cell - prevailing south-westerly winds bring rain from the Atlantic.',
      'Polar Cell (60°-90°): cold, dense air sinks at the poles and moves towards 60° where it meets warmer air and rises. Creates cold, dry polar climates.',
      'Red arrows on the diagram show warm air rising; blue arrows show cool air sinking.',
      'Temperatures are higher at the equator because the Sun\'s rays hit at a direct angle - more energy per m². At the poles, rays hit at an angle and spread over a larger area.',
      'Where air rises (0° and 60°) = low pressure = clouds and rainfall. Where air sinks (30° and 90°) = high pressure = dry conditions.',
    ],
    terms: [
      { term: 'Hadley Cell', def: 'Circulation cell between 0°-30° - warm air rises at equator (low pressure, rain), sinks at 30° (high pressure, desert).' },
      { term: 'Ferrel Cell', def: 'Circulation cell between 30°-60° - includes the UK. Brings unstable, rainy weather from the south-west.' },
      { term: 'Polar Cell', def: 'Circulation cell between 60°-90° - cold dense air sinks at the poles, creating cold dry polar climates.' },
      { term: 'Insolation', def: 'Incoming solar radiation - more intense at the equator than the poles due to the angle of the Sun.' },
      { term: 'Prevailing wind', def: 'The most common wind direction in an area - south-westerly in the UK, driven by the Ferrel Cell.' },
      { term: 'Low pressure', def: 'Where air rises - brings clouds and rainfall. Found at 0° (equator) and 60° latitude.' },
      { term: 'High pressure', def: 'Where air sinks - brings dry, clear conditions. Found at 30° (deserts) and 90° (poles).' },
    ],
    images: [
      { src: '/images/GlobalAtmosphericCirculation.png', caption: 'Global atmospheric circulation showing all three cells in both hemispheres. Red arrows = warm air rising (low pressure, rainfall). Blue arrows = cool air sinking (high pressure, dry). Hadley Cells sit between 0°-30° - air rises at the equator creating tropical rainforests, sinks at 30° creating hot deserts. Ferrel Cells sit between 30°-60° - the UK is in this zone. Polar Cells sit between 60°-90° creating cold polar climates.' },
    ],
    examTip: 'For "why are temperatures higher at the equator" - always mention the ANGLE of the Sun\'s rays, not just that it is closer. For "why is the Sahara a desert" - air sinks at 30° (high pressure) so no rainfall. For "why does the UK get rain" - it sits in the Ferrel Cell with rising air at 60° and south-westerly winds from the Atlantic.',
  },
  {
    id: "h2",
    title: "Natural Climate Change",
    category: "hazardous",
    points: [
      "The Earth's climate has always changed naturally - ice ages and warm periods have alternated over millions of years.",
      "Evidence for past climate change: ice cores (trapped air bubbles show past CO₂ levels), pollen records, tree rings, and historical records.",
      "Milankovitch cycles: changes in the Earth's orbit and tilt cause long-term climate change over thousands of years.",
      "Volcanic eruptions: ash and sulphur dioxide ejected into the atmosphere reflects sunlight - causes short-term cooling.",
      "Solar output variations: slight changes in the Sun's energy output affect global temperatures.",
    ],
    terms: [
      {
        term: "Ice core",
        def: "Cylinder of ice drilled from glaciers - contains trapped air bubbles showing past CO₂ levels and temperatures.",
      },
      {
        term: "Milankovitch cycles",
        def: "Long-term changes in Earth's orbit and axial tilt that drive ice ages over tens of thousands of years.",
      },
      {
        term: "Volcanic eruption (climate)",
        def: "Major eruptions release SO₂ and ash that reflect sunlight, causing short-term global cooling.",
      },
      {
        term: "Solar output",
        def: "The amount of energy produced by the Sun - small variations can affect Earth's temperature.",
      },
    ],
    examTip:
      "Volcanic eruptions COOL the climate short-term (ash reflects sunlight). Don't confuse this with human greenhouse gases which WARM the climate long-term.",
  },
  {
    id: "h3",
    title: "Human Causes of Climate Change",
    category: "hazardous",
    points: [
      "Burning fossil fuels (coal, oil, gas) releases CO₂ - the main greenhouse gas driving current warming.",
      "Deforestation removes trees that absorb CO₂ - also releases stored carbon when trees are burned or decay.",
      "Agriculture: cattle produce methane (a powerful greenhouse gas); rice paddies also release methane.",
      "Industry and cement production release large amounts of CO₂.",
      "Global CO₂ emissions have risen from ~5 billion tonnes in 1950 to ~37 billion tonnes today.",
    ],
    terms: [
      {
        term: "Greenhouse effect",
        def: "Natural process where gases trap heat in the atmosphere. Enhanced by human emissions, causing warming.",
      },
      {
        term: "CO₂",
        def: "Carbon dioxide - main greenhouse gas released by burning fossil fuels.",
      },
      {
        term: "Methane",
        def: "Powerful greenhouse gas released by cattle, rice paddies, and landfill - 25x more potent than CO₂.",
      },
      {
        term: "Deforestation",
        def: "Removing trees reduces carbon absorption and releases stored carbon - contributes to climate change.",
      },
    ],
    examTip:
      "When asked for evidence of climate change - use specific data. Global temperatures have risen ~1.2°C since 1850. Arctic sea ice extent has declined. Sea levels are rising ~3mm per year.",
  },
  {
    id: "h4",
    title: "Consequences of Climate Change",
    category: "hazardous",
    points: [
      "Rising sea levels (thermal expansion + melting ice) - threatens low-lying countries like Bangladesh and Pacific island nations.",
      "More frequent and intense extreme weather: stronger hurricanes, more droughts, more flooding.",
      "Melting glaciers and ice caps - reduces freshwater supplies for millions who depend on glacial meltwater.",
      "Ecosystem disruption: coral bleaching, species migration, changing seasons affecting food chains.",
      "Food insecurity: changing rainfall patterns and more droughts threaten crop yields, especially in Africa.",
      "Predicting exact consequences is difficult because: climate systems are complex, tipping points are uncertain, and human responses are unpredictable.",
    ],
    terms: [
      {
        term: "Sea level rise",
        def: "Caused by thermal expansion of oceans AND melting ice - currently ~3mm per year.",
      },
      {
        term: "Coral bleaching",
        def: "When ocean temperatures rise, corals expel algae and turn white - they die if temperatures stay high.",
      },
      {
        term: "Tipping point",
        def: "A threshold beyond which climate change becomes self-reinforcing and irreversible.",
      },
      {
        term: "Thermal expansion",
        def: "Water expands as it warms - a major cause of sea level rise even without melting ice.",
      },
    ],
    examTip:
      "The 8-mark question often asks you to EVALUATE whether consequences are difficult to predict. Argue both sides: YES (complex systems, unknown tipping points) but also NO (we can model temperature rises, sea level changes are measurable).",
  },
  {
    id: "h5",
    title: "Plate Tectonics",
    category: "hazardous",
    points: [
      "The Earth's crust is divided into large sections called tectonic plates that move slowly on the mantle.",
      "Convection currents in the mantle drive plate movement - hot material rises, spreads, cools, and sinks.",
      "Convergent boundary (subduction zone): plates move towards each other - the denser oceanic plate subducts under the lighter continental plate. Creates volcanoes, earthquakes, ocean trenches and mountain ranges.",
      "Divergent boundary: plates move apart - magma rises from the mantle to fill the gap, creating new crust. Creates volcanoes and rift valleys (e.g. Mid-Atlantic Ridge).",
      "Conservative boundary (also called Transform): plates slide past each other horizontally - no crust is created or destroyed but the friction causes major earthquakes (e.g. San Andreas Fault, California).",
      "Volcanoes form at convergent and divergent boundaries. They do NOT form at conservative boundaries - no magma is involved.",
      "Earthquakes can occur at ALL three boundary types but are most destructive at convergent and conservative boundaries.",
    ],
    terms: [
      {
        term: "Tectonic plate",
        def: "Large section of the Earth's crust that moves slowly on the mantle - driven by convection currents.",
      },
      {
        term: "Convergent boundary",
        def: "Plates move towards each other - denser oceanic plate subducts under continental plate, creating volcanoes, earthquakes and trenches.",
      },
      {
        term: "Divergent boundary",
        def: "Plates move apart - magma rises to fill the gap, creating new crust. Forms mid-ocean ridges and rift valleys.",
      },
      {
        term: "Conservative boundary",
        def: "Plates slide past each other horizontally (also called Transform) - no crust created or destroyed but major earthquakes occur.",
      },
      {
        term: "Subduction",
        def: "When a denser oceanic plate is forced under a lighter continental plate - the plate melts in the mantle, creating magma that rises to form volcanoes.",
      },
      {
        term: "Convection current",
        def: "Circular movement of heat in the mantle - hot rock rises, spreads, cools and sinks. This drives plate movement.",
      },
    ],
    images: [
      {
        src: "/images/ConvergentPlate.jpg",
        caption:
          'The three types of plate boundary. TOP - Convergent (subduction zone): the subducting plate is forced under the overriding plate, forming a trench at the surface and melting in the mantle below. MIDDLE - Divergent: two plates move apart, magma rises at the spreading centre to create new crust. BOTTOM - Transform (Conservative in UK Geography): two plates slide past each other horizontally. Note: UK Geography uses the term "Conservative" for what this diagram calls "Transform" - they mean exactly the same thing.',
      },
    ],
    examTip:
      "At convergent boundaries, earthquakes occur because the subducting plate gets stuck and then suddenly slips - releasing huge amounts of energy. Volcanoes only form at convergent and divergent boundaries, NOT conservative. Conservative = earthquakes only. This distinction is a common exam question.",
  },
  {
    id: "h6",
    title: "Volcanic Hazards",
    category: "hazardous",
    points: [
      "Volcanoes form at convergent boundaries (subduction melts rock, magma rises) and divergent boundaries (magma fills the gap).",
      "Primary hazards: lava flows, pyroclastic flows (fast-moving clouds of hot gas and ash - most deadly), volcanic bombs, ash falls.",
      "Secondary hazards: lahars (volcanic mudflows), tsunamis triggered by eruptions, acid rain from sulphur dioxide.",
      "Monitoring: seismometers detect earthquakes before eruptions; tiltmeters measure ground swelling; gas sensors detect rising SO₂.",
      "Long-term planning: exclusion zones, land-use planning (don't build on volcanic slopes), evacuation routes, public education.",
    ],
    terms: [
      {
        term: "Pyroclastic flow",
        def: "Deadly fast-moving cloud of hot gas, ash, and rock - the most dangerous volcanic hazard.",
      },
      {
        term: "Lahar",
        def: "Volcanic mudflow - ash mixed with water from rainfall or melting snow. Can travel far from the volcano.",
      },
      {
        term: "Seismometer",
        def: "Instrument that detects earthquakes - increased earthquake activity often precedes eruptions.",
      },
      {
        term: "Exclusion zone",
        def: "Area around a volcano where people are not allowed to live - reduces risk to life.",
      },
    ],
    examTip:
      "For long-term planning questions - monitoring (seismometers, tiltmeters) allows early warning and evacuation. Education means people know what to do. Land-use planning stops people living in high-risk areas.",
  },
  {
    id: "h7",
    title: "Earthquake Hazards",
    category: "hazardous",
    points: [
      "Earthquakes occur when tectonic plates suddenly slip - releasing energy as seismic waves.",
      "Most common at convergent and conservative boundaries where plates are locked together.",
      "Focus: the point underground where the earthquake starts. Epicentre: the point on the surface directly above.",
      "Measured on the Richter scale (logarithmic - each level is 10x more powerful than the previous).",
      "Primary hazards: ground shaking, building collapse, surface rupture.",
      "Secondary hazards: tsunamis (undersea earthquakes displace water), liquefaction (ground behaves like liquid), landslides, fires from broken gas pipes.",
    ],
    terms: [
      {
        term: "Focus",
        def: "The point underground where an earthquake originates.",
      },
      {
        term: "Epicentre",
        def: "The point on the Earth's surface directly above the focus - experiences strongest shaking.",
      },
      {
        term: "Richter scale",
        def: "Logarithmic scale measuring earthquake magnitude - each point is 10x more powerful.",
      },
      {
        term: "Tsunami",
        def: "Large ocean wave triggered by undersea earthquakes - highly destructive when it reaches shore.",
      },
      {
        term: "Liquefaction",
        def: "Waterlogged soil behaves like liquid during shaking - buildings sink or topple.",
      },
    ],
    examTip:
      "LICs suffer more deaths from earthquakes than HICs - not because earthquakes are stronger, but because of poorly built buildings, less effective emergency services, and less money for preparation and recovery.",
  },
  {
    id: "h8",
    title: "Tropical Cyclones (Hurricanes and Typhoons)",
    category: "hazardous",
    points: [
      "Tropical cyclones form over warm ocean water (above 26°C) between 5°–20° latitude.",
      "Warm water evaporates, rises, and condenses - releasing energy that powers the storm.",
      "Conditions needed: warm sea surface temperature, low wind shear (winds at different altitudes shouldn't vary much), enough rotation from the Coriolis effect.",
      "Most active between June and November in the North Atlantic (hurricane season) - peaks August–September when oceans are warmest.",
      "Hazards: strong winds, storm surge (sea pushed inland - most deadly), flooding from intense rainfall, tornadoes.",
      "Some countries are more vulnerable than others: LICs have poorer buildings, fewer early warning systems, less emergency services, and slower recovery.",
    ],
    terms: [
      {
        term: "Tropical cyclone",
        def: "Intense rotating storm system that forms over warm tropical oceans - called hurricane (Atlantic) or typhoon (Pacific).",
      },
      {
        term: "Storm surge",
        def: "The most deadly cyclone hazard - low pressure and winds push seawater inland, causing coastal flooding.",
      },
      {
        term: "Wind shear",
        def: "When winds at different heights blow at different speeds/directions - too much shear prevents cyclone formation.",
      },
      {
        term: "Coriolis effect",
        def: "The rotation of the Earth causes moving air to spiral - needed for cyclone rotation.",
      },
      {
        term: "Eye",
        def: "Calm centre of a cyclone - surrounded by the eyewall which has the most intense winds and rain.",
      },
    ],
    examTip:
      "Cyclone numbers vary during the year because they need warm sea surface temperatures - they peak in August/September when oceans are warmest after summer heating. Outside hurricane season, oceans are too cool.",
  },
];

export default hazardousEarth;
