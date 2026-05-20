"use client";

export default function StartMenu({
  language,
  text,
  selectedMode,
  setSelectedMode,
  gameTime,
  setGameTime,
  competitiveMode,
  setCompetitiveMode,
  chaosMode,
  setChaosMode,
  players,
  setPlayers,
  setScores,
  setGameStarted,
  setCurrentPlayer,
  spinLetter,
  setTimer,
}) {

  return (
    <main className="min-h-screen bg-black text-white select-none touch-manipulation flex items-center justify-center p-[clamp(16px,4vw,40px)] overflow-y-auto relative">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b0764_0%,#000000_45%)] opacity-90" />

      <div className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[36px] p-[clamp(20px,4vw,40px)] shadow-[0_0_60px_rgba(168,85,247,0.15)]">

        <p className="text-sm uppercase tracking-[4px] text-white/80 font-black mb-4">
          {text[language].gameMode}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">

          <button
            onClick={() => setSelectedMode("family")}
            className={`rounded-3xl py-5 px-4 border backdrop-blur-xl transition-all duration-200 text-sm font-black tracking-[2px] uppercase hover:scale-[1.02] active:scale-[0.98] ${
              selectedMode === "family"
                ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_30px_rgba(251,146,60,0.25)]"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white"
            }`}
          >
            {language === "nl"
              ? "Familie / Gezin"
              : "Family / Household"}
          </button>

          <button
            onClick={() => setSelectedMode("friends")}
            className={`rounded-3xl py-5 px-4 border backdrop-blur-xl transition-all duration-200 text-sm font-black tracking-[2px] uppercase hover:scale-[1.02] active:scale-[0.98] ${
              selectedMode === "friends"
                ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_30px_rgba(251,146,60,0.25)]"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white"
            }`}
          >
            {language === "nl"
              ? "Vrienden / Collega's"
              : "Friends / Coworkers"}
          </button>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl mb-6">

          <p className="text-sm uppercase tracking-[4px] text-white/80 font-black mb-2">
            {language === "nl"
              ? "WIN CONDITIE"
              : "WIN CONDITION"}
          </p>

          <h3 className="text-white/70 font-medium text-base">
            {language === "nl"
              ? "Eerste speler met 10 punten wint"
              : "First player to 10 points wins"}
          </h3>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl mb-6">

          <p className="text-sm uppercase tracking-[4px] text-white/80 font-black mb-4">
            {text[language].timer}
          </p>

          <div className="grid grid-cols-4 gap-3">

            {[5, 10, 15, 20].map((time) => (

              <button
                key={time}
                onClick={() => setGameTime(time)}
                className={`rounded-3xl p-3 border backdrop-blur-xl transition-all duration-200 text-sm font-black tracking-[2px] uppercase hover:scale-[1.02] active:scale-[0.98] ${
                  gameTime === time
                    ? "bg-orange-500/20 border-orange-400 text-white shadow-[0_0_30px_rgba(251,146,60,0.25)]"
                    : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                }`}
              >
                {time}s
              </button>

            ))}

          </div>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl mb-6">

          <p className="text-sm uppercase tracking-[4px] text-white/80 font-black mb-4">
            {text[language].extraMode}
          </p>

          <button
            onClick={() => {

              setCompetitiveMode(!competitiveMode);

              if (!competitiveMode) {
                setChaosMode(false);
              }

            }}
            className={`w-full rounded-3xl p-5 border transition-all text-left ${
              competitiveMode
                ? "bg-purple-500/20 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.25)]"
                : "bg-white/5 border-white/10"
            }`}
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-white font-black tracking-[2px] uppercase text-lg">
                  {text[language].hardcoreMode}
                </h3>

                <p className="text-white/60 mt-1">
                  {text[language].hardcoreDescription}
                </p>

              </div>

              <div
                className={`w-5 h-5 rounded-full ${
                  competitiveMode
                    ? "bg-purple-400"
                    : "bg-white/20"
                }`}
              />

            </div>

          </button>

        </div>

      </div>

    </main>
  );

}