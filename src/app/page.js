"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export default function Home() {

  const letters = [
    "A", "A", "A",
    "B", "B",
    "C", "C",
    "D", "D",
    "E", "E", "E", "E",
    "F",
    "G", "G",
    "H", "H",
    "I", "I", "I",
    "J",
    "K", "K",
    "L", "L",
    "M", "M",
    "N", "N", "N",
    "O", "O", "O",
    "P", "P",
    "Q",
    "R", "R", "R",
    "S", "S", "S",
    "T", "T", "T",
    "U", "U",
    "V", "V",
    "W",
    "X",
    "Y",
    "Z"
  ];

  const [players, setPlayers] = useState([
    "",
    "",
    "",
    "",
  ]);

  const categories = [
    "Rare huisdieren",
    "Slechte namen voor een restaurant",
    "Dingen die je nooit tweedehands koopt",
    "Rare smaken chips",
    "Dingen die je niet moet gooien",
    "Dingen die je altijd te laat doet",
    "Dingen die moeilijk schoon te maken zijn",
    "Dingen die je doet als je je verveelt",
    "Rare dingen om cadeau te krijgen",
    "Iets in de keuken",
    "Een game",
    "Iets dat je online bestelt",
    "Iets dat plakt",
    "Een cocktail",
    "Iets dat je niet wil ruiken",
    "Iets op je bureau",
    "Iets dat je binge-watcht",
    "Een voertuig",
    "Iets dat kapot kan",
    "Iets in de badkamer",
    "Iets dat je niet wil laten vallen",
    "Muziekinstrument",
    "Iets dat je gebruikt in de ochtend",
    "Iets dat awkward is",
    "Fastfood",
    "Iets dat je verzamelt",
    "Iets dat geluid maakt",
    "Iets in je broekzak",
    "Iets dat je niet wil aanraken",
    "Iets op je telefoon",
    "Een bekend persoon",
    "Iets dat je kwijt raakt",
    "Iets dat je laat bezorgen",
    "Iets dat warm wordt",
    "Een Disney karakter",
    "Iets dat je gebruikt in de winter",
    "Iets dat gênant is",
    "Iets in de koelkast",
    "Iets dat je moet schoonmaken",
    "Iets dat je niet wil horen",
    "Iets dat je gebruikt tijdens sporten",
    "Een beroep",
    "Iets dat je gebruikt in bed",
    "Iets dat irritant is",
    "Iets dat je spaart",
    "Iets dat veel te duur is",
    "Iets dat je online koopt",
    "Iets in een rugzak",
    "Iets dat je openmaakt",
    "Iets dat koud is",
    "Iets dat AI kan maken",
    "Iets dat je bewaart",
    "Een kledingmerk",
    "Iets dat vies smaakt",
    "Iets dat je gebruikt op vakantie",
    "Iets dat trilt",
    "Iets dat je eet",
    "Iets dat je op Netflix kijkt",
    "Iets dat je niet in huis wil",
    "Iets dat je op een feestje ziet",
    "Iets dat zacht is",
    "Iets dat je niet wil delen",
    "Een schoonmaakmiddel",
    "Iets dat je meeneemt onderweg",
    "Iets dat je in de supermarkt koopt",
    "Iets dat scherp is",
    "Iets dat je drinkt",
    "Iets dat je niet wil verliezen",
    "Iets dat je gebruikt voor het slapen",
    "Iets dat viral kan gaan",
    "Iets dat je met ducttape kan fixen",
    "Iets dat je aanzet",
    "Iets dat verdacht ruikt",
    "Iets dat je gebruikt in de auto",
    "Iets dat lawaai maakt",
    "Iets dat je niet wil vinden onder je bed",
    "Iets dat glad is",
    "Iets dat je draagt",
    "Iets dat je niet op social media zet",
    "Iets dat je deelt met anderen",
    "Iets dat je gebruikt in de zomer",
    "Iets dat hard is",
    "Iets dat je oplaadt",
    "Iets dat iemand verzamelt",
    "Iets dat je niet wil schoonmaken",
    "Iets dat je openklapt",
    "Iets dat je op straat ziet",
    "Iets dat je gebruikt in de keuken",
    "Iets dat je weggooit",
    "Iets dat je in de supermarkt ziet",
    "Iets dat je niet wil breken",
    "Iets dat nat is",
    "Iets dat je in de wasmachine stopt",
    "Iets dat je liever niet uitlegt",
    "Iets dat je op kantoor ziet",
    "Iets dat je uitzet",
    "Iets dat je gebruikt in de auto",
    "Iets dat je dichtmaakt",
    "Iets dat je in een hotel vindt",
    "Iets dat je in de bioscoop koopt",
    "Iets dat iemand verzamelt",
    "Iets dat irritant veel geluid maakt",
    "Iets dat gecanceld moet worden",
    "Iets dat zwaar is",
    "Iets dat licht is",
    "Iets dat je op vakantie meeneemt",
    "Iets dat een kind leuk vindt",
    "Iets met een scherm",
  ];

  const [currentLetter, setCurrentLetter] = useState("S");
  const [displayLetter, setDisplayLetter] = useState("S");
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [timer, setTimer] = useState(10);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [competitiveMode, setCompetitiveMode] = useState(false);
  const correctSound = useRef(null);
  const wrongSound = useRef(null);
  const winSound = useRef(null);

  const x = useMotionValue(0);

  const background = useTransform(
    x,
    [-150, 0, 150],
    ["#ef4444", "#1A2440", "#22c55e"]
  );

  useEffect(() => {

    correctSound.current = new Audio("/sounds/correct.wav");
    wrongSound.current = new Audio("/sounds/wrong.wav");
    winSound.current = new Audio("/sounds/win.wav");

  }, []);

  useEffect(() => {

    if (
      !gameStarted ||
      winner ||
      showScoreboard ||
      isRolling
    ) return;

    if (timer <= 0) {
      handleTooLate();
      return;
    }

    const countdown = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);

  }, [timer, gameStarted, winner, showScoreboard]);

  function addPoint() {

    setFeedback("CORRECT!");

    correctSound.current?.play();

    const updatedScores = [...scores];

    updatedScores[currentPlayer] += 1;

    setScores(updatedScores);

    if (updatedScores[currentPlayer] >= 10) {

      winSound.current?.play();

      setWinner(players[currentPlayer]);

      return;
    }

    setTimeout(() => {
      setFeedback("");
    }, 600);

    const nextPlayer = currentPlayer + 1;

    if (nextPlayer >= players.length) {

      setShowScoreboard(true);

    } else {

      setCurrentPlayer(nextPlayer);

      setTimer(10);

      x.set(0);
    }
  }

  function handleTooLate() {

    setFeedback("TOO LATE!");

    wrongSound.current?.play();

    if (competitiveMode) {

      const updatedScores = [...scores];

      updatedScores[currentPlayer] -= 1;

      setScores(updatedScores);
    }

    setTimeout(() => {
      setFeedback("");
    }, 600);

    const nextPlayer = currentPlayer + 1;

    if (nextPlayer >= players.length) {

      setShowScoreboard(true);

    } else {

      setCurrentPlayer(nextPlayer);

      setTimer(10);

      x.set(0);
    }
  }

  function spinLetter() {

    if (isRolling) return;

    setIsRolling(true);

    const interval = setInterval(() => {

      const randomLetter =
        letters[
        Math.floor(Math.random() * letters.length)
        ];

      setDisplayLetter(randomLetter);

    }, 80);

    setTimeout(() => {

      clearInterval(interval);

      const finalLetter =
        letters[
        Math.floor(Math.random() * letters.length)
        ];

      const randomCategory =
        categories[
        Math.floor(Math.random() * categories.length)
        ];

      setDisplayLetter(finalLetter);

      setCurrentLetter(finalLetter);

      setCurrentCategory(randomCategory);

      setCurrentPlayer(0);

      setTimer(10);

      x.set(0);

      setIsRolling(false);

    }, 2000);
  }

  if (winner) {

    return (

      <main className="min-h-screen bg-[#0B1020] text-white flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-[#121A2F] rounded-[32px] p-8 shadow-2xl border border-pink-500/30 text-center">

          <p className="text-6xl mb-4">
            🏆
          </p>

          <h1 className="text-4xl font-bold text-white mb-4 tracking-wide">
            {winner} WINT!
          </h1>

          <div className="flex justify-center mb-4">

            <Image
              src="/logo.png"
              width={260}
              height={140}
              alt="Spin & Shame"
              priority
            />

          </div>

          <p className="text-gray-400 mb-8">
            Tijd voor een revanche 😄
          </p>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-black text-xl py-5 rounded-2xl"
          >
            SPEEL OPNIEUW
          </button>

        </div>

      </main>
    );
  }

  const highestScore = Math.max(...scores);

  const leadingPlayers = players.filter(
    (_, index) => scores[index] === highestScore
  );

  const leadersText = leadingPlayers.join(" & ");

  if (showScoreboard) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">

        <div className="w-full max-w-sm backdrop-blur-xl bg-white/5 border border-white/10 rounded-[36px] p-6">

          <div className="flex justify-center mb-4">

            <Image
              src="/logo.png"
              width={260}
              height={140}
              alt="Spin & Shame"
              priority
            />

          </div>

          <div className="mb-5 text-center">

            <p className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-transparent bg-clip-text text-xl font-bold tracking-wide">
              👑 {leadersText} LEAD
            </p>

            <p className="text-gray-400 text-sm mt-1">
              {highestScore} punten
            </p>

          </div>

          <div className="space-y-3">

            {players.map((player, index) => (

              <div
                key={player}
                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4"
              >

                <h2 className="text-xl font-semibold uppercase text-white">
                  {player}
                </h2>

                <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">
                  {scores[index]}
                </div>

              </div>

            ))}

          </div>

          <button
            onClick={() => {

              setShowScoreboard(false);

              setCurrentPlayer(0);

              setTimer(0);

              spinLetter();

            }}
            className="w-full mt-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-white font-black text-xl py-4 rounded-2xl"
          >
            VOLGENDE RONDE
          </button>

        </div>

      </main>
    );
  }

  if (!gameStarted) {

    return (

      <main className="min-h-screen bg-[#0B1020] text-white flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-[#121A2F] rounded-[32px] p-6 shadow-2xl border border-purple-500/20">

          <div className="flex justify-center mb-4">

            <Image
              src="/logo.png"
              width={260}
              height={140}
              alt="Spin & Shame"
              priority
            />

          </div>

          <p className="text-center text-gray-400 mb-8">
            Voeg spelers toe en start het spel.
          </p>

          <div className="space-y-4">

            {players.map((player, index) => (

              <input
                key={index}
                value={player}
                placeholder={`PLAYER ${index + 1}`}
                onChange={(e) => {

                  const updatedPlayers = [...players];

                  updatedPlayers[index] = e.target.value;

                  setPlayers(updatedPlayers);

                }}
                className="w-full bg-[#1A2440] border border-white/10 rounded-2xl px-4 py-3 text-white"
              />

            ))}

          </div>

          <div className="flex items-center justify-between bg-[#1A2440] border border-white/10 rounded-2xl p-4 mt-6">

            <div>

              <p className="text-white font-bold">
                Competitive Mode
              </p>

              <p className="text-gray-400 text-sm">
                Foute antwoorden = -1 punt
              </p>

            </div>

            <button
              onClick={() =>
                setCompetitiveMode(!competitiveMode)
              }
              className={`w-14 h-8 rounded-full transition-all ${competitiveMode
                ? "bg-green-500"
                : "bg-gray-600"
                }`}
            >

              <div
                className={`w-6 h-6 bg-white rounded-full mt-1 transition-all ${competitiveMode
                  ? "translate-x-7"
                  : "translate-x-1"
                  }`}
              />

            </button>

          </div>

          <button
            onClick={() => {

              const filteredPlayers = players.filter(
                (player) => player.trim() !== ""
              );

              setPlayers(filteredPlayers);

              setScores(
                new Array(filteredPlayers.length).fill(0)
              );

              setTimer(0);

              setGameStarted(true);

              spinLetter();

            }}
            className="w-full mt-6 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-black text-xl py-5 rounded-2xl"
          >
            START GAME
          </button>

        </div>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-3 relative overflow-y-auto">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b0764_0%,#000000_45%)] opacity-90" />

      <div className="relative z-10 w-full max-w-sm">

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[36px] p-4 shadow-[0_0_80px_rgba(168,85,247,0.15)]">

          <div className="mb-6">

            <div className="flex justify-center">

              <Image
                src="/logo.png"
                width={260}
                height={140}
                alt="Spin & Shame"
                priority
              />

            </div>

            <p className="text-center text-gray-400 mt-4 tracking-wide uppercase text-sm">
              Het partyspel met letters
            </p>

          </div>

          <div className="flex justify-center mb-4">

            <motion.div
              className="relative w-40 h-40 rounded-full"
            >

              <div className="absolute inset-0 rounded-full border-[5px] border-orange-400" />

              <div className="absolute inset-[22px] rounded-full bg-black flex items-center justify-center border border-white/10">

                <div className="text-center">

                  <p className="text-orange-400 text-xs font-bold mb-2 tracking-[3px] uppercase">
                    De letter is
                  </p>

                  <motion.h2
                    key={displayLetter}
                    initial={{
                      scale: 0.6,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    className="text-6xl font-black text-white"
                  >
                    {displayLetter}
                  </motion.h2>

                </div>

              </div>

            </motion.div>

          </div>

          <motion.div
            key={currentCategory}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white/5 border border-white/10 rounded-3xl p-4 mb-5"
          >

            <p className="text-orange-400 text-sm font-black tracking-widest mb-3">
              CATEGORIE
            </p>

            <h3 className="text-base font-medium leading-snug text-white/90">
              {currentCategory}
            </h3>

          </motion.div>

          <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3 px-2">

            <span className="text-red-400/70">
              ← Skip
            </span>

            <span className="text-green-400/70">
              +1 Point →
            </span>

          </div>

          {feedback && (

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className={`mb-4 text-center text-2xl font-black py-3 rounded-2xl ${feedback === "CORRECT!"
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
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
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