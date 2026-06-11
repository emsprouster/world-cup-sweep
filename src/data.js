export const people = ["Em", "Mike", "Shannon", "Saxon"];

const groups = [
  { name: "A", teams: ["Mexico", "South Korea", "Czechia", "South Africa"] },
  { name: "B", teams: ["Canada", "Switzerland", "Qatar", "Bosnia-Herzegovina"] },
  { name: "C", teams: ["Brazil", "Morocco", "Scotland", "Haiti"] },
  { name: "D", teams: ["USA", "Australia", "Paraguay", "Türkiye"] },
  { name: "E", teams: ["Germany", "Ecuador", "Ivory Coast", "Curaçao"] },
  { name: "F", teams: ["Netherlands", "Japan", "Tunisia", "Sweden"] },
  { name: "G", teams: ["Belgium", "IR Iran", "Egypt", "New Zealand"] },
  { name: "H", teams: ["Spain", "Uruguay", "Saudi Arabia", "Cape Verde"] },
  { name: "I", teams: ["France", "Senegal", "Norway", "Iraq"] },
  { name: "J", teams: ["Argentina", "Algeria", "Austria", "Jordan"] },
  { name: "K", teams: ["Portugal", "Colombia", "Uzbekistan", "DR Congo"] },
  { name: "L", teams: ["England", "Croatia", "Ghana", "Panama"] },
];

const flags = {
  "Mexico": "🇲🇽", "South Korea": "🇰🇷", "Czechia": "🇨🇿", "South Africa": "🇿🇦",
  "Canada": "🇨🇦", "Switzerland": "🇨🇭", "Qatar": "🇶🇦", "Bosnia-Herzegovina": "🇧🇦",
  "Brazil": "🇧🇷", "Morocco": "🇲🇦", "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Haiti": "🇭🇹",
  "USA": "🇺🇸", "Australia": "🇦🇺", "Paraguay": "🇵🇾", "Türkiye": "🇹🇷",
  "Germany": "🇩🇪", "Ecuador": "🇪🇨", "Ivory Coast": "🇨🇮", "Curaçao": "🇨🇼",
  "Netherlands": "🇳🇱", "Japan": "🇯🇵", "Tunisia": "🇹🇳", "Sweden": "🇸🇪",
  "Belgium": "🇧🇪", "IR Iran": "🇮🇷", "Egypt": "🇪🇬", "New Zealand": "🇳🇿",
  "Spain": "🇪🇸", "Uruguay": "🇺🇾", "Saudi Arabia": "🇸🇦", "Cape Verde": "🇨🇻",
  "France": "🇫🇷", "Senegal": "🇸🇳", "Norway": "🇳🇴", "Iraq": "🇮🇶",
  "Argentina": "🇦🇷", "Algeria": "🇩🇿", "Austria": "🇦🇹", "Jordan": "🇯🇴",
  "Portugal": "🇵🇹", "Colombia": "🇨🇴", "Uzbekistan": "🇺🇿", "DR Congo": "🇨🇩",
  "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Croatia": "🇭🇷", "Ghana": "🇬🇭", "Panama": "🇵🇦",
};

// Seeded fixed draw — one team per group per person
// Generated once; order within each group maps to [Em, Mike, Shannon, Saxon]
const seededOrder = [
  [2, 0, 3, 1], // Group A
  [1, 3, 0, 2], // Group B
  [3, 1, 0, 2], // Group C
  [1, 3, 2, 0], // Group D
  [0, 2, 3, 1], // Group E
  [3, 0, 2, 1], // Group F
  [2, 0, 1, 3], // Group G
  [0, 3, 1, 2], // Group H
  [2, 1, 3, 0], // Group I
  [3, 0, 2, 1], // Group J
  [1, 2, 0, 3], // Group K
  [3, 1, 2, 0], // Group L
];

// assignments[personIndex] = array of { group, team, flag, key }
export const assignments = people.map((_, personIdx) =>
  groups.map((group, groupIdx) => {
    const teamName = group.teams[seededOrder[groupIdx][personIdx]];
    return {
      group: group.name,
      team: teamName,
      flag: flags[teamName],
      key: `${group.name}-${teamName}`,
    };
  })
);
