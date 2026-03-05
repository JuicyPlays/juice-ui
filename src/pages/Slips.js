import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { paths } from "../common/constants";
import NavBar from "./NavBar";
import Footer from "./Footer";
import MySelect from "./ReactSelect";
import SlipComponent from "../common/SlipComponent";
import { useAuthUser } from "react-auth-kit";

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
    const user = useAuthUser();

    const handleSportsbookChange = (selected) => {
        if (!selected) {
            setSportsbooks([]);
        } else if (Array.isArray(selected)) {
            setSportsbooks(selected.map((it) => it.value));
        } else {
            setSportsbooks([selected.value]);
        }
    };
    const handleSportsChange = (selected) => setSports(selected.map((it) => it.value));
    const handleStatChange = (selected) => setStats(selected.map((it) => it.value));
    const handleBaselineBookChange = (selected) => setBaselineBook(selected ? selected.value : "");

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
                    <h2 style={styles.title}>🚀 Slip Generator</h2>
                    <p style={styles.subtitle}>
                        Auto-generated, highly profitable parlays across any sportsbook ({totalPlays} profitable plays found)
                    </p>
                </div>
            </div>

            {/* Filter bar */}
            <div className="filter-bar" style={styles.filterBar}>
                <div style={styles.selectWrap}>
                    <div style={styles.dropdownLabel}>Sportsbook</div>
                    <MySelect
                        options={sportsbookOptions}
                        handleChanges={handleSportsbookChange}
                        label={"Sportsbook"}
                        defaultSelected={sportsbooks.length > 0 ? { value: sportsbooks[0], label: sportsbooks[0] === "prizepicks" ? "PrizePicks" : sportsbooks[0].charAt(0).toUpperCase() + sportsbooks[0].slice(1) } : null}
                        isMulti={false}
                    />
                </div>
                <div style={styles.selectWrap}>
                    <div style={styles.dropdownLabel}>Model</div>
                    <MySelect
                        options={baselineOptions}
                        handleChanges={handleBaselineBookChange}
                        label={"Baseline Model"}
                        defaultSelected={baselineBook ? { value: baselineBook, label: (baselineBook === "juice_ml" || baselineBook === "juiceml") ? "Juicy" : baselineBook === "prizepicks" ? "PrizePicks" : baselineBook.charAt(0).toUpperCase() + baselineBook.slice(1) } : null}
                        isMulti={false}
                    />
                </div>
                <div style={styles.selectWrap}>
                    <div style={styles.dropdownLabel}>Sport</div>
                    <MySelect
                        options={sportsOptions}
                        handleChanges={handleSportsChange}
                        label={"Sports"}
                    />
                </div>
                <div style={styles.selectWrap}>
                    <div style={styles.dropdownLabel}>Market</div>
                    <MySelect
                        options={statOptions}
                        handleChanges={handleStatChange}
                        label={"Stat"}
                    />
                </div>
                <button
                    className="btn-gradient"
                    onClick={handleClick}
                    disabled={buttonDisabled}
                    style={{ width: "100%" }}
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

class RenderSlips extends Component {
    render() {
        return (
            <>
                <NavBar />
                <Slips />
                <Footer />
            </>
        );
    }
}

export default RenderSlips;

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
        alignItems: "center",
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
