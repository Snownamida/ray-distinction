import { useCallback, useEffect, useState } from "react";
import { IconCheck, IconFlame, IconRotateCcw, IconShare, IconTrophy, IconX } from "./icons.jsx";

const SITE_URL = "https://ray.snownamida.top/";

// --- 数据（依据公开海洋生物资料整理） ---
const SPECIES_DATA = {
    skate: {
        id: "skate",
        name: "鳐 (Skate)",
        simpleName: "鳐",
        desc: "身体多呈菱形或心形。尾巴较粗、多肉且无毒刺，尾部靠近末端通常有两个小背鳍——这是鳐最关键的识别点。背部常有棘刺，繁殖方式为卵生（产下方形卵鞘）。",
    },
    stingray: {
        id: "stingray",
        name: "魟 (Stingray)",
        simpleName: "魟",
        desc: "身体呈圆盘状或圆润的菱形，边缘平滑。尾巴细长如鞭，通常带一根有毒的尾刺，背鳍退化或缺失。为卵胎生，常伏在海底沙中。",
    },
    eagleray: {
        id: "eagleray",
        name: "鲼 (Eagle Ray)",
        simpleName: "鲼",
        desc: "头部与身体分界明显，口两侧有“头鳍（角状头叶）”。胸鳍尖长如鸟翼，在水层中“飞行”游动而非趴海底。多数鲼类尾部带毒刺。（近亲蝠鲼 manta 属另一科 Mobulidae，滤食浮游生物、无毒刺。）",
    },
};

const SPECIES_IMAGES = {
    // skate_2 / skate_5 retirés : ce sont des poissons-guitare (fiddler ray,
    // Rhinopristiformes), pas de vrais skates (Rajidae) — voir l'audit.
    skate: ["skate_1.jpg", "skate_3.jpg", "skate_4.jpg", "skate_6.jpg", "skate_7.jpg", "skate_8.jpg", "skate_9.jpg", "skate_10.jpg", "skate_11.jpg", "skate_12.jpg"],
    stingray: ["stingray_1.jpg", "stingray_2.jpg", "stingray_3.jpg", "stingray_4.jpg", "stingray_5.jpg", "stingray_6.jpg", "stingray_7.jpg", "stingray_8.jpg", "stingray_9.jpg", "stingray_10.jpg"],
    eagleray: ["eagle_ray_1.jpg", "eagle_ray_2.jpg", "eagle_ray_3.jpg", "eagle_ray_4.jpg", "eagle_ray_5.jpg", "eagle_ray_6.jpg", "eagle_ray_7.jpg", "eagle_ray_8.jpg", "eagle_ray_9.jpg", "eagle_ray_10.jpg"],
};

const BEST_KEY = "ray_best_streak";

// --- 蒸蚌弹窗 ---
const ZhengBangModal = ({ show }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white border-b-8 border-yellow-400 rounded-3xl p-8 shadow-2xl transform flex flex-col items-center z-50" style={{ animation: "bounce-custom 1s infinite" }}>
                <div className="text-7xl mb-4 animate-pulse">🌟</div>
                <div className="text-4xl font-black text-yellow-600 tracking-wider">蒸 蚌！</div>
                <div className="text-lg text-gray-400 font-bold mt-2">ZHEN BANG!</div>
            </div>
        </div>
    );
};

export default function App() {
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
        const keys = Object.keys(SPECIES_DATA);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const species = SPECIES_DATA[randomKey];
        const images = SPECIES_IMAGES[randomKey];
        const randomImage = images[Math.floor(Math.random() * images.length)];

        setCurrentQuestion({
            correctId: species.id,
            correctSpecies: species,
            imagePath: `./images/${randomImage}`,
        });
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
                const audio = new Audio("./audio/蒸蚌.wav");
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
        const text = `我在「鳐魟鲼分辨大挑战」答对了 ${stats.correct}/${stats.total} 题（准确率 ${acc}%），最高连击 ${bestStreak} 次！你也来分辨鳐、魟、鲼吧 🐟`;
        const shareData = { title: "鳐魟鲼分辨大挑战", text, url: SITE_URL };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                return;
            }
        } catch (e) {
            /* 用户取消或失败，退回复制 */
        }
        try {
            await navigator.clipboard.writeText(`${text}\n${SITE_URL}`);
            showToast("战绩已复制到剪贴板！");
        } catch (e) {
            showToast("复制失败，请手动分享 😢");
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

    return (
        <div className="min-h-screen w-full font-sans max-w-md mx-auto border-x border-gray-200 shadow-2xl flex flex-col relative overflow-hidden bg-sky-50">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-sky-200 to-sky-50 -z-10 rounded-b-[3rem]"></div>

            {/* Header */}
            <header className="px-4 pt-5 pb-3 flex items-center justify-between z-10" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}>
                <span className="text-xl font-black text-sky-900 tracking-tighter">鳐魟鲼分辨器</span>

                <div className="flex items-center space-x-2">
                    {streak > 0 && (
                        <div className="flex items-center bg-orange-100/70 px-2 py-1 rounded-full" style={{ animation: "bounce 1s infinite" }}>
                            <IconFlame className="text-orange-500 fill-orange-500" size={18} />
                            <span className="text-orange-600 font-black ml-0.5 text-base">{streak}</span>
                        </div>
                    )}
                    <div className="flex items-center text-amber-600 font-bold bg-white/60 px-2.5 py-1 rounded-full backdrop-blur-sm" title="历史最高连击">
                        <IconTrophy className="mr-1 w-4 h-4" />
                        {bestStreak}
                    </div>
                    <div className="flex items-center text-sky-700 font-bold bg-white/60 px-2.5 py-1 rounded-full backdrop-blur-sm" title="本次答对数">
                        <IconCheck className="mr-1 w-4 h-4" />
                        {stats.correct}
                    </div>
                </div>
            </header>

            {/* Session score bar */}
            <div className="px-4 z-10">
                <div className="text-center text-xs text-sky-700/70 font-semibold">
                    本次成绩 {stats.correct}/{stats.total} · 准确率 {accuracy}%
                </div>
            </div>

            {/* Main */}
            <main className="flex-1 p-6 pt-4 flex flex-col items-center">
                <h1 className="text-lg font-bold text-sky-800 mb-3 text-center opacity-80">观察体型和尾巴，这是哪一种？</h1>

                <div className="w-full flex justify-center mb-6 min-w-0">
                    <div className="relative max-w-full bg-white/40 backdrop-blur-md rounded-[2rem] shadow-lg border-2 border-white/50 overflow-hidden ring-4 ring-sky-100/50">
                        <div className="p-2">
                            <img
                                src={currentQuestion.imagePath}
                                alt="待分辨的鳐、魟或鲼"
                                loading="eager"
                                className="max-w-full max-h-[50vh] w-auto h-auto object-contain rounded-[1.5rem] shadow-sm block"
                            />
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="w-full space-y-2 flex-1">
                    {Object.values(SPECIES_DATA).map((species) => (
                        <button key={species.id} onClick={() => handleSelect(species.id)} disabled={gameState !== "playing"} className={getButtonStyle(species.id)}>
                            <span>{species.simpleName}</span>
                            {gameState !== "playing" && species.id === currentQuestion.correctId && <IconCheck className="text-green-600 w-6 h-6" />}
                            {gameState !== "playing" && species.id === selectedOption && selectedOption !== currentQuestion.correctId && <IconX className="text-red-600 w-6 h-6" />}
                        </button>
                    ))}
                </div>

                {/* Ko-fi + hint */}
                <div className="mt-6 mb-2 text-center">
                    <a href="https://ko-fi.com/snownamida" target="_blank" rel="noopener noreferrer" className="text-xs text-sky-600/70 hover:text-sky-800 underline underline-offset-2">
                        ☕ 请我喝咖啡
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
                                {gameState === "correct" ? "回答正确！" : "很遗憾，答错了"}
                            </div>
                            <button
                                onClick={handleShare}
                                className="flex items-center text-sm font-bold text-sky-600 bg-white/70 hover:bg-white px-3 py-1.5 rounded-full border border-sky-100 transition"
                            >
                                <IconShare className="w-4 h-4 mr-1" /> 晒战绩
                            </button>
                        </div>

                        <div className="bg-white/70 p-4 rounded-2xl border border-black/5">
                            <span className="font-black text-gray-900 block mb-1 text-lg">为什么是「{currentQuestion.correctSpecies.simpleName}」？</span>
                            <span className="font-semibold text-sky-700 text-sm block mb-2">{currentQuestion.correctSpecies.name}</span>
                            <p className="text-gray-700 font-medium leading-relaxed text-sm">{currentQuestion.correctSpecies.desc}</p>
                        </div>
                    </div>

                    <button
                        onClick={generateQuestion}
                        className={`w-full py-4 rounded-xl font-black text-white text-lg tracking-wide shadow-lg transform transition active:scale-[0.98] flex items-center justify-center ${gameState === "correct" ? "bg-green-500 hover:bg-green-600 shadow-green-200" : "bg-red-500 hover:bg-red-600 shadow-red-200"}`}
                    >
                        下一题 <IconRotateCcw className="ml-2 w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div className="fixed left-1/2 bottom-24 z-50 bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg" style={{ animation: "toast-in 0.25s ease-out" }}>
                    {toast}
                </div>
            )}

            <ZhengBangModal show={showZhengBang} />
        </div>
    );
}
