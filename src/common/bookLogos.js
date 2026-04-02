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
  prizepicks: { name: "PrizePicks", logo: "/logos/prizepicks.svg" },
  underdog: { name: "Underdog", logo: "/logos/underdog.svg" },
  parlayplay: { name: "ParlayPlay", logo: "/logos/parlayplay.svg" },
  dabble: { name: "Dabble", logo: "/logos/dabble.svg" },
  draftkings_pick6: { name: "Pick6", logo: "/logos/pick6.png" },
  sleeper: { name: "Sleeper", logo: "/logos/sleeper.jpg" },
  boom: { name: "BOOM", logo: "/logos/boom.webp" },
  betr: { name: "Betr", logo: "/logos/betr.png" },
  thunderpick: { name: "Thunderpick", logo: "/logos/thunderpick.jpeg" },
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
