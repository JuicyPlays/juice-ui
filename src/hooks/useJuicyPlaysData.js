import { useState, useCallback } from "react";
import axios from "axios";
import { paths } from "../common/constants";

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
          label: v.toLowerCase() === "prizepicks" ? "PrizePicks" : v.charAt(0).toUpperCase() + v.slice(1)
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
