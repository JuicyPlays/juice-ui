import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { paths } from "../common/constants";
import NavBar from "./NavBar";
import Footer from "./Footer";
import FilterSelect from "../common/FilterSelect";
import BookieSettings from "../common/BookieSettings";
import SlipComponent from "../common/SlipComponent";
import { useAuthUser } from "react-auth-kit";

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

const Slips = () => {
    const [sportsbookOptions, setSportsbookOptions] = useState([]);
    const [baselineOptions, setBaselineOptions] = useState([]);
    const [sportsOptions, setSportsOptions] = useState([]);
    const [statOptions, setStatOptions] = useState([]);
    const [sportsbooks, setSportsbooks] = useState(["underdog"]);
    const [baselineBook, setBaselineBook] = useState("prizepicks");
    const [sports, setSports] = useState([]);
    const [stats, setStats] = useState([]);
    const [slipsData, setSlipsData] = useState([]);
    const [totalPlays, setTotalPlays] = useState(0);
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const user = useAuthUser();

    const handleSportsbookChange = (val) => setSportsbooks([val]);
    const handleBaselineBookChange = (val) => setBaselineBook(val);

    const handleToggleSport = (val) => setSports((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
    const handleToggleAllSports = (selectAll) => setSports(selectAll ? sportsOptions.map((o) => o.value) : []);

    const handleToggleStat = (val) => setStats((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
    const handleToggleAllStats = (selectAll) => setStats(selectAll ? statOptions.map((o) => o.value) : []);

    async function handleClick() {
        setLoading(true);
        setButtonDisabled(true);
        await fetchData();
        setLoading(false);
        setButtonDisabled(false);
    }

    async function fetchData() {
        const queryParams = {};
        if (sportsbooks.length > 0) queryParams.sportsbook = sportsbooks.join(",");
        if (sports.length > 0) queryParams.sports = sports.join(",");
        if (stats.length > 0) queryParams.stats = stats.join(",");
        if (baselineBook) queryParams.baselineBook = baselineBook;
        const headers = { "x-user-id": user().userId };
        try {
            const slipsRes = await axios.get(paths.getSlipsBasePath, {
                params: queryParams,
                headers,
            });
            setSlipsData(slipsRes.data.slips || []);
            setTotalPlays(slipsRes.data.totalProfitablePlays || 0);

            setStatOptions(slipsRes.data.statTypes?.map((v) => ({ value: v, label: v })) || []);
            setSportsOptions(slipsRes.data.sports?.map((v) => ({ value: v, label: v })) || []);

            if (isInitialLoad) {
                setStats(slipsRes.data.statTypes || []);
                setSports(slipsRes.data.sports || []);
                setIsInitialLoad(false);
            }

            if (slipsRes.data.sportsbooks) {
                let books = [...slipsRes.data.sportsbooks];
                if (!books.includes("underdog")) books.push("underdog");
                if (!books.includes("prizepicks")) books.push("prizepicks");

                const targetBooks = books.filter(b => b.toLowerCase() !== "juice_ml" && b.toLowerCase() !== "juiceml");
                const mappedBooks = targetBooks.map((v) => ({ value: v.toLowerCase(), label: v.toLowerCase() === "prizepicks" ? "PrizePicks" : v.charAt(0).toUpperCase() + v.slice(1) }));
                setSportsbookOptions(mappedBooks);

                const baselineOpts = [...mappedBooks, { value: "juice_ml", label: "Juicy" }];
                setBaselineOptions(baselineOpts);

                if (sportsbooks.length === 0 && mappedBooks.length > 0) {
                    setSportsbooks([mappedBooks[0].value]);
                    return fetchDataWithParams(mappedBooks[0].value);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchDataWithParams(defaultBook) {
        const queryParams = {};
        if (defaultBook) queryParams.sportsbook = defaultBook;
        if (sports.length > 0) queryParams.sports = sports.join(",");
        if (stats.length > 0) queryParams.stats = stats.join(",");
        if (baselineBook) queryParams.baselineBook = baselineBook;
        const headers = { "x-user-id": user().userId };
        try {
            const slipsRes = await axios.get(paths.getSlipsBasePath, {
                params: queryParams,
                headers,
            });
            setSlipsData(slipsRes.data.slips || []);
            setTotalPlays(slipsRes.data.totalProfitablePlays || 0);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleClick();
        // eslint-disable-next-line
    }, []);

    return (
        <div style={styles.page}>
            {/* Page header */}
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Slip Generator</h2>
                    <p style={styles.subtitle}>
                        Auto-generated, highly profitable parlays across any sportsbook ({totalPlays} profitable plays found)
                    </p>
                </div>
            </div>

            {/* Filter bar */}
            <div className="filter-bar" style={styles.filterBar}>
                <div style={styles.selectWrap}>
                    <div style={styles.dropdownLabel}>Sportsbook</div>
                    <BookieSettings
                        label="Sportsbook"
                        options={sportsbookOptions}
                        selectedBooks={sportsbooks.length > 0 ? [sportsbooks[0]] : []}
                        onToggleBook={handleSportsbookChange}
                        singleMode={true}
                    />
                </div>
                <div style={styles.selectWrap}>
                    <div style={styles.dropdownLabel}>Model</div>
                    <BookieSettings
                        label="Baseline"
                        options={baselineOptions}
                        selectedBooks={[baselineBook]}
                        onToggleBook={handleBaselineBookChange}
                        singleMode={true}
                    />
                </div>
                <div style={styles.selectWrap}>
                    <div style={styles.dropdownLabel}>Sport</div>
                    <FilterSelect
                        label="Sport"
                        options={sportsOptions}
                        selected={sports}
                        onToggle={handleToggleSport}
                        onToggleAll={handleToggleAllSports}
                    />
                </div>
                <div style={styles.selectWrap}>
                    <div style={styles.dropdownLabel}>Market</div>
                    <FilterSelect
                        label="Market"
                        options={statOptions}
                        selected={stats}
                        onToggle={handleToggleStat}
                        onToggleAll={handleToggleAllStats}
                    />
                </div>
                <button
                    className="btn-gradient"
                    onClick={handleClick}
                    disabled={buttonDisabled}
                    style={{ width: "100%", height: "40px" }}
                >
                    {loading ? (
                        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <CircularProgress size={14} style={{ color: "white" }} />
                            Generating…
                        </span>
                    ) : (
                        "↻  Generate Slips"
                    )}
                </button>
            </div>

            {/* Content */}
            <div style={styles.content}>
                <SlipComponent slips={slipsData} />
            </div>
        </div>
    );
};

export default function SlipsPage() {
    return (
        <>
            <NavBar />
            <Slips />
            <Footer />
        </>
    );
}

const styles = {
    page: {
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "32px 24px 80px",
        minHeight: "calc(100vh - 60px)",
    },
    header: {
        marginBottom: "20px",
    },
    title: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 800,
        fontSize: "24px",
        letterSpacing: "-0.4px",
        color: "var(--text-primary)",
        margin: "0 0 4px 0",
    },
    subtitle: {
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        color: "var(--text-muted)",
        margin: 0,
    },
    filterBar: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-end",
        gap: "12px",
        padding: "16px 20px",
        background: "rgba(19,19,43,0.7)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        backdropFilter: "blur(16px)",
        marginBottom: "20px",
    },
    selectWrap: {
        flex: "1 1 200px",
    },
    dropdownLabel: {
        fontSize: "12px",
        fontWeight: "600",
        marginBottom: "6px",
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    },
    content: {
        borderRadius: "14px",
    },
};
