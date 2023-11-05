export const paths = {
  getMiddlesBasePath:
    "https://juicyplays-api-d887c104909f.herokuapp.com/v1/middles",
  getRivalsBasePath:
    "https://juicyplays-api-d887c104909f.herokuapp.com/v1/rivals",
  getCorrelationBasePath:
    "https://juicyplays-api-d887c104909f.herokuapp.com/v1/correlation",
};

export const sportsBooksSelectValues = [
  "PRIZEPICKS",
  "UNDERDOG",
  // "PARLAYPLAY",
  // "HOTSTREAK",
];

export const sportsSelectValues = [
  "CBB",
  "CFB",
  "COD",
  "CSGO",
  "Dota2",
  "HALO",
  "LoL",
  "MMA",
  "NBA",
  "NBA1H",
  "NBA1Q",
  "NBA2H",
  "NBASZN",
  "NFL",
  "NHL",
  "PGA",
  "SOCCER",
  "TENNIS",
  "VAL",
  "WNBA",
  "MLB",
];

export const correlationSportValues = ["CSGO", "VAL", "NFL"];

export const marketsportsBooksSelectValues = [];

export const pages = [
  { title: "Fantasy Screen", link: "middles" },
  { title: "Correlation", link: "correlation" },
  { title: "Pricing", link: "pricing" },
];

export const termsAndConditions = "Terms and Conditions";
export const termsAndConditionsPDF =
  "http://localhost:3000/pdfs/JuicyPlaysTermsAndConditions.pdf";
