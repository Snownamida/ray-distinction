import { useCallback, useEffect, useState } from "react";
import { IconCheck, IconFlame, IconRotateCcw, IconShare, IconTrophy, IconX } from "./icons.jsx";
import { getDict, rememberLang, resolveLang } from "./i18n";

// [code, label, chemin de la page statique] — voir vite.config.js (multi-pages)
const LANGS = [
    ["zh", "中", "/"],
    ["en", "EN", "/en/"],
    ["fr", "FR", "/fr/"],
];

const LangSwitch = ({ current }) => (
    <div className="flex justify-end gap-1 px-4 pt-2 z-10">
        {LANGS.map(([code, label, path]) => (
            <a
                key={code}
                href={path}
                onClick={(e) => {
                    e.preventDefault();
                    rememberLang(code);
                    window.location.href = path;
                }}
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full transition ${
                    current === code ? "bg-sky-600 text-white" : "text-sky-700 bg-white/70 hover:bg-white"
                }`}
            >
                {label}
            </a>
        ))}
    </div>
);

const SPECIES_IMAGES = {
    // skate_2 / skate_5 retirés : ce sont des poissons-guitare (fiddler ray,
    // Rhinopristiformes), pas de vrais skates (Rajidae) — voir l'audit.
    skate: ["skate_1.jpg", "skate_3.jpg", "skate_4.jpg", "skate_6.jpg", "skate_7.jpg", "skate_8.jpg", "skate_9.jpg", "skate_10.jpg", "skate_11.jpg", "skate_12.jpg"],
    stingray: ["stingray_1.jpg", "stingray_2.jpg", "stingray_3.jpg", "stingray_4.jpg", "stingray_5.jpg", "stingray_6.jpg", "stingray_7.jpg", "stingray_8.jpg", "stingray_9.jpg", "stingray_10.jpg"],
    eagleray: ["eagle_ray_1.jpg", "eagle_ray_2.jpg", "eagle_ray_3.jpg", "eagle_ray_4.jpg", "eagle_ray_5.jpg", "eagle_ray_6.jpg", "eagle_ray_7.jpg", "eagle_ray_8.jpg", "eagle_ray_9.jpg", "eagle_ray_10.jpg"],
};
const SPECIES_KEYS = Object.keys(SPECIES_IMAGES);
const BEST_KEY = "ray_best_streak";

// --- Modale de félicitations ---
const CelebrateModal = ({ show, t }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white border-b-8 border-yellow-400 rounded-3xl p-8 shadow-2xl transform flex flex-col items-center z-50" style={{ animation: "bounce-custom 1s infinite" }}>
                <div className="text-7xl mb-4 animate-pulse">🌟</div>
                <div className="text-4xl font-black text-yellow-600 tracking-wider">{t.celebrateBig}</div>
                <div className="text-lg text-gray-400 font-bold mt-2">{t.celebrateSmall}</div>
            </div>
        </div>
    );
};

export default function App() {
    const [t] = useState(() => getDict(resolveLang()));
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [gameState, setGameState] = useState("playing");
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [showZhengBang, setShowZhengBang] = useState(false);
    const [stats, setStats] = useState({ correct: 0, total: 0 });
    const [toast, setToast] = useState("");

    useEffect(() => {
        const saved = parseInt(localStorage.getItem(BEST_KEY) || "0", 10);
        if (!isNaN(saved)) setBestStreak(saved);
    }, []);

    const generateQuestion = useCallback(() => {
        const key = SPECIES_KEYS[Math.floor(Math.random() * SPECIES_KEYS.length)];
        const images = SPECIES_IMAGES[key];
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setCurrentQuestion({ correctId: key, imagePath: `/images/${randomImage}` });
        setSelectedOption(null);
        setGameState("playing");
        setShowZhengBang(false);
    }, []);

    useEffect(() => {
        generateQuestion();
    }, [generateQuestion]);

    const handleSelect = (id) => {
        if (gameState !== "playing") return;

        setSelectedOption(id);
        const isCorrect = id === currentQuestion.correctId;

        setStats((prev) => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));

        if (isCorrect) {
            setGameState("correct");
            setStreak((s) => {
                const next = s + 1;
                if (next > bestStreak) {
                    setBestStreak(next);
                    try {
                        localStorage.setItem(BEST_KEY, String(next));
                    } catch (e) {}
                }
                return next;
            });
            setShowZhengBang(true);

            try {
                const audio = new Audio("/audio/蒸蚌.wav");
                audio.play().catch((e) => console.error("Audio play failed", e));
            } catch (e) {
                console.error("Audio init failed", e);
            }

            setTimeout(() => setShowZhengBang(false), 2000);
        } else {
            setGameState("wrong");
            setStreak(0);
        }
    };

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2400);
    };

    const handleShare = async () => {
        const acc = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
        const text = t.shareText(stats.correct, stats.total, acc, bestStreak);
        const shareData = { title: t.shareTitle, text, url: t.siteUrl };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                return;
            }
        } catch (e) {
            /* annulé par l'utilisateur → repli sur la copie */
        }
        try {
            await navigator.clipboard.writeText(`${text}\n${t.siteUrl}`);
            showToast(t.copied);
        } catch (e) {
            showToast(t.copyFail);
        }
    };

    const getButtonStyle = (id) => {
        const baseStyle =
            "w-full p-4 rounded-2xl border-2 border-b-4 font-bold text-lg transition-all active:border-b-2 active:translate-y-0.5 mb-3 flex items-center justify-between cursor-pointer min-h-[56px]";

        if (gameState === "playing") {
            return `${baseStyle} bg-white border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100`;
        }
        if (id === currentQuestion.correctId) {
            return `${baseStyle} bg-green-100 border-green-500 text-green-700`;
        }
        if (id === selectedOption && gameState === "wrong") {
            return `${baseStyle} bg-red-100 border-red-500 text-red-700`;
        }
        return `${baseStyle} bg-white border-gray-100 text-gray-300 opacity-60`;
    };

    if (!currentQuestion) return null;

    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    const correct = t.species[currentQuestion.correctId];

    return (
        <div className="min-h-screen w-full font-sans max-w-md mx-auto border-x border-gray-200 shadow-2xl flex flex-col relative overflow-hidden bg-sky-50">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-sky-200 to-sky-50 -z-10 rounded-b-[3rem]"></div>

            <LangSwitch current={t.lang} />

            {/* Header */}
            <header className="px-4 pt-5 pb-3 flex items-center justify-between z-10" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}>
                <span className="text-xl font-black text-sky-900 tracking-tighter">{t.appTitle}</span>

                <div className="flex items-center space-x-2">
                    {streak > 0 && (
                        <div className="flex items-center bg-orange-100/70 px-2 py-1 rounded-full" style={{ animation: "bounce 1s infinite" }}>
                            <IconFlame className="text-orange-500 fill-orange-500" size={18} />
                            <span className="text-orange-600 font-black ml-0.5 text-base">{streak}</span>
                        </div>
                    )}
                    <div className="flex items-center text-amber-600 font-bold bg-white/60 px-2.5 py-1 rounded-full backdrop-blur-sm" title={t.bestTitle}>
                        <IconTrophy className="mr-1 w-4 h-4" />
                        {bestStreak}
                    </div>
                    <div className="flex items-center text-sky-700 font-bold bg-white/60 px-2.5 py-1 rounded-full backdrop-blur-sm" title={t.correctTitle}>
                        <IconCheck className="mr-1 w-4 h-4" />
                        {stats.correct}
                    </div>
                </div>
            </header>

            {/* Session score bar */}
            <div className="px-4 z-10">
                <div className="text-center text-xs text-sky-700/70 font-semibold">{t.scoreBar(stats.correct, stats.total, accuracy)}</div>
            </div>

            {/* Main */}
            <main className="flex-1 p-6 pt-4 flex flex-col items-center">
                <h1 className="text-lg font-bold text-sky-800 mb-3 text-center opacity-80">{t.question}</h1>

                <div className="w-full flex justify-center mb-6 min-w-0">
                    <div className="relative max-w-full bg-white/40 backdrop-blur-md rounded-[2rem] shadow-lg border-2 border-white/50 overflow-hidden ring-4 ring-sky-100/50">
                        <div className="p-2">
                            <img
                                src={currentQuestion.imagePath}
                                alt={t.imgAlt}
                                loading="eager"
                                className="max-w-full max-h-[50vh] w-auto h-auto object-contain rounded-[1.5rem] shadow-sm block"
                            />
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="w-full space-y-2 flex-1">
                    {SPECIES_KEYS.map((key) => (
                        <button key={key} onClick={() => handleSelect(key)} disabled={gameState !== "playing"} className={getButtonStyle(key)}>
                            <span>{t.species[key].simpleName}</span>
                            {gameState !== "playing" && key === currentQuestion.correctId && <IconCheck className="text-green-600 w-6 h-6" />}
                            {gameState !== "playing" && key === selectedOption && selectedOption !== currentQuestion.correctId && <IconX className="text-red-600 w-6 h-6" />}
                        </button>
                    ))}
                </div>

                {/* Ko-fi + hint */}
                <div className="mt-6 mb-2 text-center">
                    <a href="https://ko-fi.com/snownamida" target="_blank" rel="noopener noreferrer" className="text-xs text-sky-600/70 hover:text-sky-800 underline underline-offset-2">
                        {t.kofi}
                    </a>
                </div>
            </main>

            {/* Feedback Sheet */}
            <div
                className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto transition-transform duration-500 transform z-40 ${gameState === "playing" ? "translate-y-[110%]" : "translate-y-0"}`}
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            >
                <div
                    className={`p-6 pb-10 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] ${gameState === "correct" ? "bg-green-50 border-t-2 border-green-200" : "bg-red-50 border-t-2 border-red-200"}`}
                    style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
                >
                    <div className="flex flex-col mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className={`font-black text-2xl ${gameState === "correct" ? "text-green-600" : "text-red-600"}`}>
                                {gameState === "correct" ? t.correct : t.wrong}
                            </div>
                            <button
                                onClick={handleShare}
                                className="flex items-center text-sm font-bold text-sky-600 bg-white/70 hover:bg-white px-3 py-1.5 rounded-full border border-sky-100 transition"
                            >
                                <IconShare className="w-4 h-4 mr-1" /> {t.share}
                            </button>
                        </div>

                        <div className="bg-white/70 p-4 rounded-2xl border border-black/5">
                            <span className="font-black text-gray-900 block mb-1 text-lg">{t.why(correct.simpleName)}</span>
                            <span className="font-semibold text-sky-700 text-sm block mb-2">{correct.name}</span>
                            <p className="text-gray-700 font-medium leading-relaxed text-sm">{correct.desc}</p>
                        </div>
                    </div>

                    <button
                        onClick={generateQuestion}
                        className={`w-full py-4 rounded-xl font-black text-white text-lg tracking-wide shadow-lg transform transition active:scale-[0.98] flex items-center justify-center ${gameState === "correct" ? "bg-green-500 hover:bg-green-600 shadow-green-200" : "bg-red-500 hover:bg-red-600 shadow-red-200"}`}
                    >
                        {t.next} <IconRotateCcw className="ml-2 w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div className="fixed left-1/2 bottom-24 z-50 bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg" style={{ animation: "toast-in 0.25s ease-out" }}>
                    {toast}
                </div>
            )}

            <CelebrateModal show={showZhengBang} t={t} />
        </div>
    );
}
