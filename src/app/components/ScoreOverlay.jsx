"use client";

export default function ScoreOverlay({
    chaosMode,
    players,
    scores,
    language,
    setShowRoundScore,
    spinLetter,
    goToNextPlayer,
    letterRushMode,
    spinLetterRush,
}) {

    return (

        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md rounded-[36px]">

            <div className="w-full max-w-md bg-black/80 border border-white/20 rounded-[32px] p-6">

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
                                className="flex items-center justify-between bg-white/10 border border-white/20 rounded-2xl p-4"
                            >

                                <span className="text-white text-xl md:text-2xl font-black uppercase tracking-[1px]">
                                    {player}
                                </span>

                                <span className="text-orange-400 text-3xl font-black">
                                    {scores[index]}
                                </span>

                            </div>

                        );

                    })}

                </div>

                <button
                    onClick={() => {

                        setShowRoundScore(false);

                        goToNextPlayer();

                        if (letterRushMode) {

                            spinLetterRush();

                        } else {

                            spinLetter();

                        }

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