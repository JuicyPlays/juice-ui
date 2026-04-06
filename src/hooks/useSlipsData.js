import { useState, useCallback } from "react";
import axios from "axios";
import { paths } from "../common/constants";

const bookDisplayName = (key) => {
  if (!key) return "";
  const lower = key.toLowerCase();
  if (lower === "juice_ml") return "Juicy";
  if (lower === "prizepicks") return "PrizePicks";
  if (lower === "underdog") return "Underdog";
  if (lower === "sleeper") return "Sleeper";
  if (lower === "thunderpick") return "Thunderpick";
  if (lower === "parlayplay") return "ParlayPlay";
  if (lower === "betr") return "Betr";
  if (lower === "boom") return "BOOM";
  if (lower === "draftkings_pick6" || lower === "draftkings-pick6") return "DK Pick6";
  return key.charAt(0).toUpperCase() + key.slice(1);
};

export function useSlipsData(userId) {
  const [slipsData, setSlipsData] = useState([]);
  const [totalPlays, setTotalPlays] = useState(0);
  const [sportsbookOptions, setSportsbookOptions] = useState([]);
  const [baselineOptions, setBaselineOptions] = useState([]);
  const [sportsOptions, setSportsOptions] = useState([]);
  const [statOptions, setStatOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (filters) => {
    const { sportsbooks, sports, stats, baselineBook } = filters;
    
    const queryParams = {};
    if (sportsbooks?.length > 0) queryParams.sportsbook = sportsbooks.join(",");
    if (sports?.length > 0) queryParams.sports = sports.join(",");
    if (stats?.length > 0) queryParams.stats = stats.join(",");
    if (baselineBook) queryParams.baselineBook = baselineBook;

    try {
      setLoading(true);
      const slipsRes = await axios.get(paths.getSlipsBasePath, {
        params: queryParams,
      });

      setSlipsData(slipsRes.data.slips || []);
      setTotalPlays(slipsRes.data.totalProfitablePlays || 0);
      setStatOptions(slipsRes.data.statTypes?.map((v) => ({ value: v, label: v })) || []);
      setSportsOptions(slipsRes.data.sports?.map((v) => ({ value: v, label: v })) || []);

      if (slipsRes.data.sportsbooks) {
        let books = [...slipsRes.data.sportsbooks];
        if (!books.includes("underdog")) books.push("underdog");
        if (!books.includes("prizepicks")) books.push("prizepicks");

        const targetBooks = books.filter(b => b.toLowerCase() !== "juice_ml" && b.toLowerCase() !== "juiceml");
        const mappedBooks = targetBooks.map((v) => ({
          value: v.toLowerCase(),
          label: bookDisplayName(v)
        }));
        setSportsbookOptions(mappedBooks);

        const baselineOpts = [...mappedBooks, { value: "juice_ml", label: "Juicy" }];
        setBaselineOptions(baselineOpts);

        return mappedBooks;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    slipsData,
    totalPlays,
    sportsbookOptions,
    baselineOptions,
    sportsOptions,
    statOptions,
    loading,
    fetchData,
  };
}
