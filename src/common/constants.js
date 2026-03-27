export const paths = {
  getJuicyPlaysBasePath: `${import.meta.env.VITE_JUICE_API_BASE_URL}/v1/juicy`,
  getRivalsBasePath: `${import.meta.env.VITE_JUICE_API_BASE_URL}/v1/rivals`,
  getSlipsBasePath: `${import.meta.env.VITE_JUICE_API_BASE_URL}/v1/slips`,
  getPropHistoryBasePath: `${import.meta.env.VITE_JUICE_API_BASE_URL}/v1/getPropHistory`,
  getLineShopperBasePath: `${import.meta.env.VITE_JUICE_API_BASE_URL}/v1/line-shopper`,
  createNewUserPath: `${import.meta.env.VITE_JUICE_API_BASE_URL}/v1/user/`,
  getUserPath: `${import.meta.env.VITE_JUICE_API_BASE_URL}/v1/user/`,
};

export const pages = [
  { title: "Juicy Screen", link: "juicy-screen" },
  { title: "EV Plays", link: "ev-plays" },
  { title: "Slip Generator", link: "slips" },
];

export const termsAndConditions = "Terms and Conditions";
export const termsAndConditionsPDF =
  "https://juicyplays.com/pdfs/JuicyPlaysTermsAndConditions.pdf";
