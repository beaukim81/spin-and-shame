"use client";

export default function ChaosMode({
    chaosMode,
    players,
    feedback,
    isRolling,
    selectedChaosPlayer,
    setSelectedChaosPlayer,
    addPoint,
}) {

    if (!chaosMode) return null;

    return (

        <div className="grid grid-cols-2 gap-3 mt-6">

            {players.map((player, index) => (

                <button
                    key={index}

                    onClick={() => {

                        if (feedback || isRolling) return;

                        setSelectedChaosPlayer(index);

                        addPoint(index);

                    }}

                    className={`
            rounded-3xl
            p-5
            text-white
            font-black
            uppercase
            tracking-[2px]
            backdrop-blur-xl
            transition-all
            hover:scale-[1.02]
            active:scale-[0.98]
            border
            ${selectedChaosPlayer === index
                            ? "bg-green-500/40 border-green-300 shadow-[0_0_30px_rgba(74,222,128,0.8)] scale-[1.03]"
                            : "bg-purple-500/20 border-purple-400"
                        }
          `}
                >
                    {player}
                </button>

            ))}

        </div>

    );

}