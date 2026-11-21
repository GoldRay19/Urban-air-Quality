const profiles = {
  family: { label: "Whole household", sensitive: false },
  child: { label: "Young child", sensitive: true },
  senior: { label: "Older adult", sensitive: true },
  asthma: { label: "Respiratory sensitivity", sensitive: true },
  worker: { label: "Outdoor worker", sensitive: true },
  pregnant: { label: "Pregnancy", sensitive: true }
};

const rules = [
  ["AQI-01", a=>a.aqi>300, "Emergency exposure mode", "Avoid all non-essential outdoor activity and follow local emergency health guidance.", "Hazardous AQI requires the strongest exposure reduction.", "critical"],
  ["AQI-02", a=>a.aqi>200&&a.aqi<=300, "Create a clean-air day", "Move exercise, play and gatherings indoors; keep outdoor trips brief.", "Very unhealthy air can affect everyone.", "critical"],
  ["AQI-03", a=>a.aqi>150&&a.aqi<=200, "Switch workouts indoors", "Replace outdoor running or cycling with indoor activity.", "Strenuous exertion increases the amount of polluted air inhaled.", "high"],
  ["AQI-04", a=>a.aqi>100&&a.aqi<=150, "Protect sensitive household members", "Reduce prolonged outdoor exertion for children, older adults and people with respiratory conditions.", "Sensitive groups may experience effects at this level.", "high"],
  ["AQI-05", a=>a.aqi>50&&a.aqi<=100, "Choose lighter outdoor activity", "Consider shorter sessions if anyone is unusually sensitive.", "Moderate air quality can still bother unusually sensitive people.", "normal"],
  ["AQI-06", a=>a.aqi<=50, "Use the cleaner-air window", "Air the home when outdoor readings are low and keep checking conditions.", "Good periods can be useful for planned ventilation.", "positive"],
  ["AQI-07", a=>a.aqi>100, "Recheck before leaving", "Refresh the reading before school runs, errands or outdoor work.", "Air quality can change through the day.", "high"],
  ["AQI-08", a=>a.aqi>150, "Shorten roadside waiting", "Wait away from traffic queues and idling vehicles.", "Roadside concentrations can be higher than nearby background air.", "high"],
  ["AQI-09", a=>a.aqi>100, "Move children's play indoors", "Choose indoor games instead of playground time near busy roads.", "Children may inhale more air relative to body size during play.", "high"],
  ["AQI-10", a=>a.aqi>200, "Postpone non-essential errands", "Combine essential errands or reschedule them for a cleaner period.", "Reducing time outdoors lowers total exposure.", "critical"],
  ["PM-01", a=>a.pm25>150, "Prioritize particle filtration", "Run a correctly sized HEPA purifier in the room used most.", "The measured PM2.5 concentration is very elevated.", "critical"],
  ["PM-02", a=>a.pm25>55, "Use particle filtration", "Run a properly sized HEPA purifier and maintain its filter.", "Fine particles can remain suspended and enter deep into the lungs.", "high"],
  ["PM-03", a=>a.pm25>35, "Reduce indoor particle sources", "Avoid incense, candles, smoking and other indoor burning.", "Indoor sources can add to an already elevated particle burden.", "high"],
  ["PM-04", a=>a.pm25>12, "Check the purifier filter", "Inspect the filter indicator and follow the manufacturer's replacement schedule.", "Good filter maintenance supports effective particle removal.", "normal"],
  ["PM-05", a=>a.pm25>55, "Make one cleaner-air room", "Keep one room's doors and windows managed and run filtration there.", "A smaller protected space is easier to keep cleaner.", "high"],
  ["PM-06", a=>a.pm25>35, "Choose damp cleaning", "Use a damp cloth or wet mop instead of dry dusting or sweeping.", "Damp cleaning reduces resuspension of settled dust.", "normal"],
  ["PM-07", a=>a.pm25>55, "Avoid outdoor exercise peaks", "Move strenuous exercise to an indoor space with cleaner air.", "Breathing rate rises during exercise and increases inhaled particle dose.", "high"],
  ["PM-08", a=>a.pm25<=12, "Ventilate strategically", "If indoor air needs refreshing, consider a short ventilation period while outdoor PM2.5 is low.", "Ventilation is most useful when outdoor particle levels are lower.", "positive"],
  ["PM-09", a=>a.pm25>35, "Keep purifier airflow clear", "Leave space around purifier intake and outlet; avoid placing it behind furniture.", "Blocked airflow can reduce effective room circulation.", "normal"],
  ["PM-10", a=>a.pm25>55, "Avoid smoky cooking", "Use an outdoor-vented exhaust hood and choose lower-smoke cooking methods.", "Cooking can add substantial particles indoors.", "high"],
  ["HOME-01", a=>a.aqi>100, "Manage window timing", "Keep windows closed during polluted periods; ventilate when outdoor air improves.", "Outdoor air can quickly increase indoor particle levels.", "high"],
  ["HOME-02", a=>a.aqi<=100, "Refresh indoor air thoughtfully", "Use a brief ventilation period when outdoor conditions are acceptable.", "Fresh-air exchange can reduce indoor pollutant buildup.", "normal"],
  ["HOME-03", a=>true, "Keep indoor smoking at zero", "Do not smoke indoors; keep smoke away from doors and open windows.", "Second-hand smoke is a major avoidable indoor pollutant source.", "normal"],
  ["HOME-04", a=>true, "Control moisture and dampness", "Fix leaks and dry damp areas promptly; avoid creating mould-friendly conditions.", "Dampness can contribute to indoor air problems.", "normal"],
  ["HOME-05", a=>true, "Store household chemicals safely", "Close lids and use strong cleaning products with suitable ventilation.", "Volatile products can add indoor gases and irritants.", "normal"],
  ["HOME-06", a=>a.aqi>100, "Avoid incense and candles today", "Skip incense, dhoop, mosquito coils and candles indoors where possible.", "Combustion adds fine particles to indoor air.", "high"],
  ["HOME-07", a=>true, "Keep entry dust controlled", "Use a doormat and remove outdoor shoes near the entrance.", "Simple habits reduce tracked-in dust.", "positive"],
  ["HOME-08", a=>true, "Clean AC filters", "Check and clean or replace HVAC filters according to the manual.", "Dirty filters can restrict airflow and reduce system performance.", "normal"],
  ["HOME-09", a=>a.pm25>35, "Avoid dry sweeping", "Use a damp mop and microfiber cloth for floors and surfaces.", "Dry sweeping can lift settled particles back into the air.", "normal"],
  ["HOME-10", a=>true, "Keep ventilation outlets clear", "Do not block exhaust vents or purifier air paths.", "Airflow is essential for ventilation and filtration.", "positive"],
  ["FAM-01", a=>a.profile==="child"&&a.aqi>50, "Child-friendly indoor play", "Plan active games indoors and keep outdoor play shorter until readings improve.", "Children are a sensitive group for air pollution exposure.", "high"],
  ["FAM-02", a=>a.profile==="senior"&&a.aqi>50, "Older-adult activity adjustment", "Prefer gentle indoor movement and avoid long walks beside traffic.", "Older adults may be more vulnerable to polluted air.", "high"],
  ["FAM-03", a=>a.profile==="asthma"&&a.aqi>50, "Follow the personal asthma plan", "Keep prescribed medicines available and follow the clinician-provided action plan.", "Pollution may aggravate respiratory symptoms in some people.", "high"],
  ["FAM-04", a=>a.profile==="pregnant"&&a.aqi>100, "Pregnancy-aware exposure reduction", "Reduce prolonged outdoor exertion and choose cleaner indoor spaces.", "A cautious approach can reduce avoidable exposure.", "high"],
  ["FAM-05", a=>a.profile==="worker"&&a.aqi>100, "Outdoor shift protection", "Discuss task rotation, rest breaks and exposure controls with your workplace.", "Workplace exposure may continue even when leisure activity is reduced.", "high"],
  ["FAM-06", a=>a.profile==="family"&&a.aqi>100, "Household check-in", "Tell household members the current category and agree on an indoor activity plan.", "Shared routines make exposure reduction easier.", "normal"],
  ["FAM-07", a=>a.profile==="child"&&a.pm25>35, "Keep nursery and play spaces low-dust", "Damp-clean play surfaces and keep the purifier away from obstructions.", "Children spend time close to floors where dust can settle.", "high"],
  ["FAM-08", a=>a.profile==="senior"&&a.aqi>150, "Arrange essential trips carefully", "Ask whether a trip can be delayed or supported by another household member.", "Reducing unnecessary exposure can be especially helpful for sensitive people.", "high"],
  ["FAM-09", a=>a.profile==="asthma"&&a.aqi>100, "Watch for symptom changes", "If symptoms worsen, follow the prescribed action plan and seek medical help when needed.", "Personal symptoms matter; an AQI reading cannot replace clinical advice.", "high"],
  ["FAM-10", a=>a.profile==="worker"&&a.pm25>55, "Ask about workplace controls", "Use employer-provided exposure controls and suitable respiratory protection where required.", "Workplace safety measures should be selected for the actual task and hazard.", "high"],
  ["TRIP-01", a=>a.aqi>100, "Avoid congested corridors", "Choose quieter streets away from major traffic where practical.", "Near-road exposure can be higher than background levels.", "normal"],
  ["TRIP-02", a=>a.aqi>150, "Reduce time at bus stops", "Wait farther from idling buses and vehicle queues when safe.", "Exhaust emissions can accumulate near waiting areas.", "high"],
  ["TRIP-03", a=>a.aqi>100, "Combine short errands", "Group nearby tasks into one trip rather than making repeated journeys.", "Fewer outdoor journeys can reduce cumulative exposure time.", "normal"],
  ["TRIP-04", a=>a.aqi>150, "Rethink outdoor cycling", "Consider indoor exercise or public transport for essential travel.", "Cycling near traffic combines exertion with roadside exposure.", "high"],
  ["TRIP-05", a=>true, "Never idle unnecessarily", "Switch off a parked vehicle engine when safe and lawful.", "Idling adds emissions around homes and public spaces.", "positive"],
  ["TRIP-06", a=>a.aqi>100, "Plan a lower-exposure departure", "Check the latest reading immediately before departure instead of relying on yesterday's value.", "Current conditions can differ from earlier readings.", "normal"],
  ["TRIP-07", a=>a.aqi>200, "Avoid outdoor queues", "Use appointment slots or indoor waiting areas where available.", "Long waits can add avoidable exposure time.", "high"],
  ["TRIP-08", a=>true, "Keep distance from exhaust outlets", "Avoid standing directly behind buses, trucks and generators.", "Exhaust plumes are concentrated close to their source.", "normal"],
  ["TRIP-09", a=>a.profile==="worker"&&a.aqi>100, "Schedule recovery breaks", "Take breaks in a cleaner indoor area where your work setting allows.", "Breaks away from exposure can reduce total time in polluted air.", "high"],
  ["TRIP-10", a=>a.aqi>150, "Move outdoor exercise indoors", "Choose an indoor alternative rather than a roadside route.", "Exercise increases breathing rate and inhaled pollution dose.", "high"],
  ["DATA-01", a=>a.live, "Confirm the timestamp", "Check when the latest hourly reading was recorded before making a decision.", "Forecast-provider data is time-stamped and may not be instantaneous.", "normal"],
  ["DATA-02", a=>!a.live, "Treat demo values as examples", "Switch to live data before using the dashboard for a real-world decision.", "Illustrative values are not measurements of your location.", "high"],
  ["DATA-03", a=>a.aqi===null, "AQI unavailable", "Retry the data source or choose a supported city; do not infer safety from a blank value.", "Missing data is not evidence of clean air.", "high"],
  ["DATA-04", a=>a.pm25===null, "PM2.5 reading unavailable", "Use the overall AQI cautiously and retry later for pollutant detail.", "Pollutant-level coverage may vary by location and time.", "normal"],
  ["DATA-05", a=>a.aqi>100, "Compare time-aligned readings", "When comparing cities, check that both readings have similar timestamps.", "Different update times can make comparisons misleading.", "normal"],
  ["DATA-06", a=>true, "Use local public-health advisories", "Check official local guidance during severe pollution episodes.", "This assistant is informational and is not an official monitoring authority.", "normal"],
  ["ROUTINE-01", a=>a.aqi>100, "Move strenuous chores indoors", "Avoid vigorous outdoor cleaning, gardening or sports during elevated readings.", "Physical exertion increases inhalation.", "high"],
  ["ROUTINE-02", a=>a.aqi<=100, "Plan outdoor time flexibly", "Check again before long outdoor activities, especially for sensitive people.", "AQI can vary across the day.", "normal"],
  ["ROUTINE-03", a=>true, "Build a daily AQI check habit", "Check air quality in the morning and before longer outdoor plans.", "A quick check supports better timing decisions.", "positive"],
  ["ROUTINE-04", a=>a.aqi>150, "Protect school commute windows", "Discuss alternate timing or indoor waiting with the school when feasible.", "School travel can create repeated exposure at busy times.", "high"],
  ["ROUTINE-05", a=>true, "Keep a simple exposure diary", "Note symptoms, activity and AQI together to discuss patterns with a clinician if needed.", "A diary can help identify personal patterns without diagnosing them.", "normal"],
  ["ROUTINE-06", a=>a.pm25>35, "Avoid dust-generating DIY", "Postpone sanding, drilling and sweeping or use appropriate containment and extraction.", "These activities can create additional airborne particles.", "normal"],
  ["ROUTINE-07", a=>a.aqi>100, "Choose indoor community activities", "Prefer indoor sports, libraries or community spaces with suitable air management.", "You can maintain routines while reducing outdoor exposure.", "normal"],
  ["ROUTINE-08", a=>true, "Check purifier room sizing", "Match the purifier's clean-air delivery rate to the room size.", "Undersized devices may not clean room air effectively.", "normal"],
  ["ROUTINE-09", a=>a.aqi>200, "Prepare essentials in advance", "Keep needed items ready so severe-smog trips can be shortened.", "Planning reduces avoidable time outdoors.", "normal"],
  ["ROUTINE-10", a=>true, "Review the plan after each refresh", "Re-run recommendations when a new reading arrives or your household profile changes.", "Advice should reflect the latest available inputs.", "positive"]
];

export const RULE_COUNT = rules.length;
export const FEATURE_GROUPS = [
  { name: "Live intelligence", items: ["Hourly AQI and pollutant lookup","PM2.5 and PM10 monitoring","Ozone, NO₂, SO₂ and CO snapshot","US AQI category mapping","Reading timestamp and source label","Live/demo data distinction","Geolocation lookup","Eight Indian city presets","Manual refresh","Missing-data safeguards"] },
  { name: "Explainable rule engine", items: ["60+ deterministic decision rules","AQI severity triggers","PM2.5 concentration triggers","Profile-aware recommendations","Priority-ranked actions","Reason shown for every action","Indoor/outdoor action split","Travel exposure guidance","Data-quality warnings","Re-evaluation after refresh"] },
  { name: "Family protection", items: ["Whole-family profile","Child profile","Senior profile","Respiratory sensitivity profile","Pregnancy-aware guidance","Outdoor-worker guidance","School commute prompts","Indoor play suggestions","Symptom-awareness reminders","Household check-in plan"] },
  { name: "Cleaner indoor spaces", items: ["HEPA purifier guidance","Room sizing reminders","Filter maintenance prompts","Window timing guidance","Cleaner-air room plan","Cooking smoke reduction","Incense and candle reduction","Damp-dusting guidance","Moisture and mould prevention","Ventilation outlet checks"] },
  { name: "Mobility and routines", items: ["Low-traffic street tips","Bus-stop exposure tips","Errand consolidation","Outdoor cycling alternatives","Vehicle idling awareness","Departure-time rechecks","Outdoor queue reduction","Shift-break suggestions","Daily AQI habit","Exposure diary prompts"] },
  { name: "Personal tools", items: ["Saved places","City comparison","Local reading history","CSV export","PM2.5-to-AQI calculator","AQI scale explainer","Custom alert threshold","In-app alert indicators","Browser notification permission","Persistent indoor checklist"] }
];

export function evaluateAirPlan({ reading, profile = "family", threshold = 100, demo = false }) {
  const aqi = Number.isFinite(Number(reading?.aqi)) ? Number(reading.aqi) : null;
  const pm25 = Number.isFinite(Number(reading?.pm25)) ? Number(reading.pm25) : null;
  const input = { aqi, pm25, profile, threshold, live: !demo && reading?.source !== "Illustrative demo data" };
  const active = rules.filter(([, when]) => when(input)).map(([id,, title, action, reason, priority]) => ({ id, title, action, reason, priority }));
  const rank = { critical: 0, high: 1, normal: 2, positive: 3 };
  active.sort((a,b) => rank[a.priority] - rank[b.priority]);
  return { active, totalRules: RULE_COUNT, groups: FEATURE_GROUPS, score: aqi === null ? null : Math.max(0, Math.min(100, Math.round(100 - aqi / 5))), band: aqi === null ? "Unavailable" : aqi <= 50 ? "Good" : aqi <= 100 ? "Moderate" : aqi <= 150 ? "Sensitive groups" : aqi <= 200 ? "Unhealthy" : aqi <= 300 ? "Very unhealthy" : "Hazardous", thresholdReached: aqi !== null && aqi >= threshold };
}
