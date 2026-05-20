"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ScoreBoard({
  players,
  scores,
  currentPlayer,
  chaosMode,
}) {
  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-3 border border-white/10">
        <div className="flex flex-col gap-2">
          <AnimatePresence>
            {players.map((player, index) => {
              const isCurrentPlayer =
                index === currentPlayer;

              return (
                <motion.div
                  key={player}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: isCurrentPlayer ? 1.02 : 1,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className={`
                    flex items-center justify-between
                    rounded-2xl px-4 py-3
                    transition-all
                    ${
                      isCurrentPlayer
                        ? chaosMode
                          ? "bg-red-500/20 border border-red-400/40"
                          : "bg-white/15 border border-white/20"
                        : "bg-black/20"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        w-3 h-3 rounded-full
                        ${
                          isCurrentPlayer
                            ? chaosMode
                              ? "bg-red-400"
                              : "bg-green-400"
                            : "bg-white/30"
                        }
                      `}
                    />

                    <span
                      className={`
                        font-semibold tracking-wide
                        ${
                          isCurrentPlayer
                            ? "text-white"
                            : "text-white/70"
                        }
                      `}
                    >
                      {player}
                    </span>
                  </div>

                  <div
                    className={`
                      text-xl font-black
                      ${
                        chaosMode
                          ? "text-red-300"
                          : "text-green-300"
                      }
                    `}
                  >
                    {scores[index]}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}