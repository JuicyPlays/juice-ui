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

export function useJuicyPlaysData(userId) {
  const [data, setData] = useState([]);
  const [bookOptions, setBookOptions] = useState([]);
  const [baselineOptions, setBaselineOptions] = useState([]);
  const [sportsOptions, setSportsOptions] = useState([]);
  const [statOptions, setStatOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (filters) => {
    const { sportsbook, sports, stats, baselineBook } = filters;
    
    const queryParams = {
      sportsbook,
      sports,
      stats,
      baselineBook,
    };
    
    const headers = {
      "x-customer-id": "",
      "x-user-id": userId,
    };

    try {
      setLoading(true);
      const res = await axios.get(paths.getJuicyPlaysBasePath, {
        params: queryParams,
        headers,
      });

      setData(res.data.plays);
      setStatOptions(res.data.statTypes.map((v) => ({ value: v, label: v })));
      setSportsOptions(res.data.sports.map((v) => ({ value: v, label: v })));

      if (res.data.sportsbooks) {
        let books = [...res.data.sportsbooks];
        if (!books.includes("underdog")) books.push("underdog");
        if (!books.includes("prizepicks")) books.push("prizepicks");

        const targetBooks = books.filter(b => b.toLowerCase() !== "juice_ml" && b.toLowerCase() !== "juiceml");
        const mappedBooks = targetBooks.map((v) => ({
          value: v.toLowerCase(),
          label: bookDisplayName(v)
        }));
        setBookOptions(mappedBooks);

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
    data,
    bookOptions,
    baselineOptions,
    sportsOptions,
    statOptions,
    loading,
    fetchData,
  };
}
