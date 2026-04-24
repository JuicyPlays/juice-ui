/**
 * Canonical sportsbook configuration.
 *
 * The UI treats this as the source of truth for which books exist in the
 * platform. The API may return a subset (only books with actual lines), but
 * the UI will always show every book listed here in the header / settings,
 * rendering "—" for books without data on a given row.
 *
 * To add a new sportsbook:
 *   1. Drop a logo into public/logos/
 *   2. Add an entry below
 */

export const BOOK_CONFIG = {
  prizepicks:      { name: "PrizePicks",  logo: "/logos/prizepicks.svg",      color: "#ff4ecd",  dash: null,       dot: "circle" },
  underdog:        { name: "Underdog",    logo: "/logos/underdog.svg",        color: "#ff9500",  dash: "6 4",       dot: "square" },
  parlayplay:      { name: "ParlayPlay",  logo: "/logos/parlayplay.svg",      color: "#fbbf24",  dash: "3 3",       dot: "diamond" },
  dabble:          { name: "Dabble",      logo: "/logos/dabble.svg",          color: "#f472b6",  dash: "6 2 2 2",   dot: "triangle" },
  draftkings_pick6:{ name: "Pick6",       logo: "/logos/pick6.png",           color: "#10b981",  dash: "2 4",       dot: "cross" },
  sleeper:         { name: "Sleeper",     logo: "/logos/sleeper.jpg",         color: "#7c3aed",  dash: "8 3 2 3",   dot: "star" },
  boom:            { name: "BOOM",        logo: "/logos/boom.webp",           color: "#ff6b35",  dash: "4 2",       dot: "hexagon" },
  betr:            { name: "Betr",        logo: "/logos/betr.png",            color: "#fb7185",  dash: "10 3",      dot: "plus" },
  thunderpick:     { name: "Thunderpick", logo: "/logos/thunderpick.jpeg",    color: "#06b6d4",  dash: "2 2 6 2",   dot: "circle" },
};

/** All integrated book keys in alphabetical order (excluding juice_ml). */
export const ALL_BOOK_KEYS = Object.keys(BOOK_CONFIG).sort();

/**
 * Return the display name for a sportsbook key.
 * Falls back to capitalizing the key if not found in config.
 */
export const bookDisplayName = (key) => {
  if (!key) return "";
  const lower = key.toLowerCase();
  if (lower === "juice_ml" || lower === "juiceml") return "Model";
  const cfg = BOOK_CONFIG[lower];
  if (cfg) return cfg.name;
  return key.charAt(0).toUpperCase() + key.slice(1);
};

/**
 * Return the logo path for a sportsbook key, or null if none.
 */
export const bookLogo = (key) => {
  if (!key) return null;
  const cfg = BOOK_CONFIG[key.toLowerCase()];
  return cfg ? cfg.logo : null;
};

/**
 * Return the brand color for a sportsbook key, or null if none.
 */
export const bookColor = (key) => {
  if (!key) return null;
  const cfg = BOOK_CONFIG[key.toLowerCase()];
  return cfg ? cfg.color : null;
};

/**
 * Return the stroke dash array for a sportsbook key, or null for solid.
 */
export const bookDash = (key) => {
  if (!key) return null;
  const cfg = BOOK_CONFIG[key.toLowerCase()];
  return cfg ? cfg.dash : null;
};

/**
 * Return the dot shape name for a sportsbook key, or 'circle' if none.
 */
export const bookDotShape = (key) => {
  if (!key) return "circle";
  const cfg = BOOK_CONFIG[key.toLowerCase()];
  return cfg ? cfg.dot : "circle";
};
