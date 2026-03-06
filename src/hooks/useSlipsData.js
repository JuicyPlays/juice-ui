import { useState, useCallback } from "react";
import axios from "axios";
import { paths } from "../common/constants";

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

    const headers = { "x-user-id": userId };

    try {
      setLoading(true);
      const slipsRes = await axios.get(paths.getSlipsBasePath, {
        params: queryParams,
        headers,
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
          label: v.toLowerCase() === "prizepicks" ? "PrizePicks" : v.charAt(0).toUpperCase() + v.slice(1)
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
