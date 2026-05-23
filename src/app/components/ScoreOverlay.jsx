"use client";

export default function ScoreOverlay({
    chaosMode,
    players,
    scores,
    language,
    setShowRoundScore,
    spinLetter,
    goToNextPlayer,
}) {

    return (

        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md rounded-[36px]">

            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[32px] p-6">

                <h2 className="text-white text-2xl font-black mb-6 text-center">
                    {chaosMode
                        ? "🔥 CHAOS SCOREBOARD"
                        : "🏆 TUSSENSTAND"}
                </h2>

                <div className="space-y-3">

                    {players.map((player, index) => {

                        if (!player || !player.trim()) return null;

                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4"
                            >

                                <span className="text-white font-bold uppercase">
                                    {player}
                                </span>

                                <span className="text-orange-400 text-2xl font-black">
                                    {scores[index]}
                                </span>

                            </div>

                        );

                    })}

                </div>

                <button
                    onClick={() => {

                        console.log("GA VERDER KLIK");
                        
                        setShowRoundScore(false);

                    }}
                    className="w-full mt-6 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-black text-lg py-4 rounded-2xl"
                >
                    {language === "nl"
                        ? "GA VERDER"
                        : "CONTINUE"}
                </button>

            </div>

        </div>

    );

}