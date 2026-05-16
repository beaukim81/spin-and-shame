"use client";
              className={`mb-4 text-center text-2xl font-black py-3 rounded-2xl ${
                feedback === "CORRECT!"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {feedback}
            </motion.div>
          )}

          <motion.div
            drag="x"
            style={{
              x,
              backgroundColor: background,
            }}
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={0.8}
            whileDrag={{
              scale: 1.05,
              rotate: 5,
            }}
            onDragEnd={(event, info) => {

              if (!isRolling && info.offset.x > 100) {
                setTimeout(() => {
                  addPoint();
                }, 50);
              }

              if (!isRolling && info.offset.x < -100) {
                setTimeout(() => {
                  handleTooLate();
                }, 50);
              }

            }}
            className="rounded-3xl p-5 border border-white/10 cursor-grab active:cursor-grabbing backdrop-blur-xl"
          >

            <div className="flex items-center justify-between">

              <motion.div
                key={players[currentPlayer]}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
              >

                <p className="text-gray-300 text-sm uppercase tracking-widest">
                  Huidige speler
                </p>

                <h3 className="text-xl font-medium uppercase tracking-[1px] mt-1 text-white">
                  {players[currentPlayer]}
                </h3>

              </motion.div>

              <div className="w-20 h-20 rounded-full bg-black/40 border-[5px] border-orange-400 flex items-center justify-center">
                <span className="text-4xl font-black">
                  {timer}
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}